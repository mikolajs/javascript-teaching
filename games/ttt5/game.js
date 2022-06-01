
class Game {
  //TODO:
  // 1. wrong answer from serwer after make move
  // 2. player2 not listen for move player1 ???
  constructor(){
   let type = "WebGL"
   if(!PIXI.utils.isWebGLSupported()){ type = "canvas" }
   PIXI.utils.sayHello(type);
   this.X = 600; //col
   this.Y = 600; //row
   this.app = new PIXI.Application({
     width: this.X, height: this.Y,  backgroundColor: 0xefefef,
       antialias: false,  transparent: false});
   document.getElementById('gameBoard').appendChild(this.app.view);
   //info about elements - now empty
   this.pools = new Array(60).fill(0).map(x => Array(60).fill('.'));
   this.visibleBoard = Array(400).fill("");
   this.container = new PIXI.Container();
   this.tX = PIXI.Texture.from("./X.png");
   this.tO = PIXI.Texture.from("./O.png");
   this.tE = PIXI.Texture.from("./E.png");
   this.tX_R = PIXI.Texture.from("./X_R.png");
   this.tO_R = PIXI.Texture.from("./O_R.png");
   //console.log("tekstury 3 i pól: " + this.pools.length*this.pools[0].length);
   this.timeToEnd = 20; //not use now
   this.startRow = 20;
   this.startCol = 20;
   this.lastX = new Point(-1, -1);
   this.lastO = new Point(-1, -1);
   this.app.stage.addChild(this.container);
   this.cookie = this._getCookie();
   this.connection = new Connection(this);
   this.started = false;
   this.yourTurn = false;
   this.yourSign = '';
   this.opositSing = '';
   this.turn = 0;
   this.miniMap = new MiniMap(this.pools);
   this._rewriteBoard();
   this.addToGame();
   setTimeout(() => this.checkRoom(), 5000);
  }

  _rewriteBoard(){
    //this._test();
    this.container.removeChildren(0,this.container.children.length);
    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        let e = i*20+j;
        if(this.pools[i+this.startRow][j+this.startCol] == 'x') {
          if(this.lastX.row == i+ this.startRow && this.lastX.col == j+ this.startCol)
            this.visibleBoard[e] = new PIXI.Sprite(this.tX_R);
          else this.visibleBoard[e] = new PIXI.Sprite(this.tX);
        } else if(this.pools[i+this.startRow][j+this.startCol] == 'o'){
          if(this.lastO.row == i+ this.startRow && this.lastO.col == j+ this.startCol)
          this.visibleBoard[e] =  new PIXI.Sprite(this.tO_R);
          else this.visibleBoard[e] =  new PIXI.Sprite(this.tO);
        } else {
            this.visibleBoard[e] =  new PIXI.Sprite(this.tE);
            this.visibleBoard[e].on('click', () => {
              this.mkMove(i + this.startRow, j + this.startCol);
            });
        }
        this.visibleBoard[e].x = j*30;
        this.visibleBoard[e].y = i*30;
        this.visibleBoard[e].interactive = true;
        this.visibleBoard[e].buttonMode = true;
        this.container.addChild(this.visibleBoard[e]);
      }
    }
    this.miniMap.setStartPosition(this.startRow, this.startCol);
  }

  _getCookie(){
    let c = document.cookie;
    if(c.split('=')[0] == 'gameplayer')  return c.split('=')[1];
    else {
      console.log('Wrong cookie: ' + c.split('=')[0]);
      return "";
    }
  }
  //repeat before gamer not connect
  addToGame(){ this.connection.addToGame();  }

  addedGame(json){
    console.log("addedGame: " + JSON.stringify(json));
    if(json.add == "NO") {
      if(json.error == "not logged") {
        console.log("Nie jesteś zalogowany!!!");
        return;
      }
      else if(json.error == "alredy in") console.log("Jesteś już w grze");
    }
      this.checkRoom();
  }

  checkRoom() { this.connection.checkRoom(); }

  checkedRoom(json){
    console.log("checkedRoom: " + JSON.stringify(json));
    if(json.check == 'NO' || json.roomInfo.player1.code == '' || json.roomInfo.player2.code == ''
    || json.move.game == "NO") {
      setTimeout(() => {
      this.checkRoom();}, 5000);
      return;
    }
    //set sign
    if(this.yourSign == ''){
      if(json.roomInfo.player1.code == this.cookie) {
        this.yourSign = 'o';
        this.opositSing = 'x';
        this.yourTurn = true;
      } else if(json.roomInfo.player2.code == this.cookie) {
        this.yourSign = 'x';
        this.opositSing = 'o';
      } else console.log("Nie możesz grać. To nie Twoja gra.");
      this._refreshPlayersInfo(json);
    }

    // add moove if not exists (even if lost insert!)
    if(json.move.lastuser != '' && json.move.lastuser != this.cookie){
      if(json.move.col == -1 || json.move.row == -1){
        console.log("Nie ma jeszcze ruchu");
      } else {
        if(this.pools[json.move.row][json.move.col] == '.' && json.move.turn == this.turn){
          let s;
          if(this.cookie == json.move.lastuser) s = this.yourSign;
          else s = this.opositSing;
          this._addMove(json.move.row, json.move.col, s);
        }
      }
    }

    if(json.move.turn > this.turn){
          document.getElementById('whoMove').innerHTML = 'Przeciwnik wygrał grę';
          this._refreshPlayersInfo(json);
          setTimeout(() => {this._makeNextGame();}, 10000);
    } else if(json.move.nextuser == this.cookie){
      document.getElementById('whoMove').innerHTML = 'Twój ruch';
      this.yourTurn = true;
    } else {
      document.getElementById('whoMove').innerHTML = 'Czekaj na ruch gracza...';
      setTimeout(() => {this.checkRoom();}, 5000);
    }
  }


  sendMove(r, c){this.connection.sendMove(r, c);}

  sentMoveCompleted(json, r, c){
    console.log("sentMoveCompleted" + json.add);
    if(json.add == 'OK'){ ///how json ???????????????!!!
      if(json.info == 'won'){
        document.getElementById('whoMove').innerHTML = 'Koniec partii...';
        this._growMyPoints();
        setTimeout(() => { this._makeNextGame(); }, 10000);
        return;
      } else {
        document.getElementById('whoMove').innerHTML = 'Czekaj na ruch gracza...';
        this.checkRoom();
        this.yourTurn = false;
      }
    } else {
      document.getElementById('whoMove').innerHTML = 'Błąd przesłania ruchu';
      // setTimeout(() => this.sendMove(r, c), 1000);
    }
  }

///change to write only on pools and adding only lastX, lastY _rewriteBoard make rest
  mkMove(r, c){
    if(this.pools[r][c] != '.') return;
    console.log("clicked move on: " + r + ", " + c);
    if(this.yourTurn){
      this._addMove(r, c, this.yourSign);
        //this._timesToEnd(3, false); //// TODO: implement function
      this.yourTurn = false;
      //document.getElementById('whoMove').innerHTML = 'Wysyłanie ruchu';
      this.sendMove(r, c);
    }
  }

  _addMove(r, c, sign){
      let s = r*20+c;
      if(this.pools[r][c] == '.') {
        if(sign == 'x') {
          this.lastX.row = r;
          this.lastX.col = c;
          this.pools[r][c] = sign;
        } else {
          this.lastO.row = r;
          this.lastO.col = c;
          this.pools[r][c] = sign;
        }
      }
     this._rewriteBoard();
  }

  _refreshPlayersInfo(json){
    document.getElementById('player1Name').innerHTML = json.roomInfo.player1.name;
    document.getElementById('player2Name').innerHTML = json.roomInfo.player2.name;
    if(this.yourSign == 'o'){
      document.getElementById('player1Who').innerHTML = "Ty:";
      document.getElementById('player2Who').innerHTML = "Gracz:";
    } else {
      document.getElementById('player2Who').innerHTML = "Ty:";
      document.getElementById('player1Who').innerHTML = "Gracz:";
    }
    document.getElementById('player1Points').innerHTML = json.roomInfo.player1.points;
    document.getElementById('player2Points').innerHTML = json.roomInfo.player2.points;
  }

  _growMyPoints(){
    if(this.yourSign == 'o') {
      document.getElementById('player1Points').innerHTML =
        parseInt(document.getElementById('player1Points').innerHTML) + 1;
    } else {
      document.getElementById('player2Points').innerHTML =
        parseInt(document.getElementById('player2Points').innerHTML) + 1;
    }
  }

  _makeNextGame(){
    console.log("Next game");
    this.turn += 1;
    for(let i = 0; i < 60; i++)
      for(let j = 0; j < 60; j++) this.pools[i][j] = '.';
    this.startRow = 20;
    this.startCol = 20;
    this._rewriteBoard();
    this.checkRoom();
  }

  scrollUp(){
    if(this.startRow >= 5) {
      this.startRow -= 5;
      this._rewriteBoard();
      this.miniMap.setStartPosition(this.startRow, this.startCol);
    }
  }
  scrollDown(){
    if(this.startRow <= 35) {
      this.startRow += 5;
      this._rewriteBoard();
      this.miniMap.setStartPosition(this.startRow, this.startCol);
    }
  }
  scrollRight(){
    if(this.startCol <= 35) {
      this.startCol += 5;
      this._rewriteBoard();
      this.miniMap.setStartPosition(this.startRow, this.startCol);
    }
  }
  scrollLeft(){
    if(this.startCol >= 5) {
      this.startCol -= 5;
      this._rewriteBoard();
      this.miniMap.setStartPosition(this.startRow, this.startCol);
    }
  }

  _test(){
    for(let i = 0; i < 60; i++){
        console.log(this.pools[i].join(''));
    }
  }

}
