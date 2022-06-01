
class Game {
  constructor(){
    this.rows = 12;
    this.cols = 20;
    this.generation = 0;
    this.xHttp = new XMLHttpRequest();
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){ type = "canvas" }
    PIXI.utils.sayHello(type);
    this.app = new PIXI.Application({
     width: this.cols*30, height: this.rows*30,  backgroundColor: 0x33ef33,
       antialias: false,  transparent: false});
   document.getElementById('gamePools').appendChild(this.app.view);
   this.X = PIXI.Texture.from("./X.png");
   this.E = PIXI.Texture.from("./E.png");
   this.pools = Array(240).fill("");
   this.container = new PIXI.Container();
   this.app.stage.addChild(this.container);
   this._loadBeginPool();
  }

  backToBegin(){
    this._loadBeginPool();
  }

  mkNewGeneration(){
    this.lifes.nextGeneration();
    document.getElementById('lifes').innerHTML = this.lifes.getNumberOfLifes();
    this.generation++;
    document.getElementById('generation').value = this.generation;
    let str = this.lifes.getLifeString().split('\n').slice(1).join('\n');
    //console.log(str);
    this._fillPools(str);
  }

  mkRandomStart(){
    //let num = Math.floor(Math.random()*10) + 6;
    let num = parseInt(document.getElementById('howmany').value);
    let arr = [];
    let newArr = [];
    for(let r = 3; r <= 8; r++){
      for(let c = 7; c <= 12; c++){
        arr.push(new Point(r, c));
      }
    }
    for(let i = 0; i < num; i++){
      let rand = Math.floor(Math.random()*arr.length);
      let removed = arr.splice(rand, 1);
      newArr.push(removed[0]);
    }
    let str = '';
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        str += '.';
      }
      str += '\n';
    }
    for(let p of newArr){
      let e = p.r*(this.cols+1) + p.c;
      //console.log(e);
      str = str.substring(0, e) + 'X' + str.substring(e + 1);
    }
    this._fillPools(str);
    this.lifes.setFirstDay(str);
    this.generation = 1;
    document.getElementById('lifes').innerHTML = this.lifes.getNumberOfLifes();
    document.getElementById('generation').value = this.generation;
  }

  _fillPools(data){
    this.container.removeChildren(0,this.container.children.length);
    let arr = data.split('\n');
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        let e = i*this.cols+j;
        if(arr[i][j] == 'X') this.pools[e] = new PIXI.Sprite(this.X);
        else this.pools[e] = new PIXI.Sprite(this.E);
        this.pools[e].x = j*30;
        this.pools[e].y = i*30;
        this.container.addChild(this.pools[e]);
      }
    }
  }

  _loadBeginPool(){
    let url = window.location.protocol + "//" + window.location.host + "/begin";
    var self = this;
    this.xHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("get response: " + url);
        //console.log(this.responseText);
        self._insertBeginPool(this.responseText);
      }
    }
    this.xHttp.open("GET", url, true);
    this.xHttp.send();

  }

  _insertBeginPool(data){
    this.lifes = new Life();
    this.lifes.setFirstDay(data);
    //this.lifes.getLifeString();
    this.generation = 1;
    document.getElementById('generation').value = this.generation;
    this._fillPools(data);
  }

}
