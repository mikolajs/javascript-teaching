class Game {

constructor(){
this.play = false;
this.etap = 0;
this.anim = 100;
this.obroty = [0,0,0,0,0];
this.kostkiOczka = [1,1,1,1,1];
this.blocked = [false, false, false, false, false];
this.rules = new Rules(this.kostkiOczka);
this.player = new Player();
this.suma = 0;
this.gameOver = false;
this.kostkiImg = [
  document.getElementById("kostka1"),
  document.getElementById("kostka2"),
  document.getElementById("kostka3"),
  document.getElementById("kostka4"),
  document.getElementById("kostka5")
];

}

recheck(elem){
  if(this.gameOver) return;
  if(this.etap != 0 && this.etap < 3){
    let i = parseInt(elem.id.substr(6,1))-1;
    if(this.blocked[i]) {
      this.blocked[i] = false;
      this.kostkiImg[i].style = "width:100px;height:100px;";
    }  else {
      this.blocked[i] = true;
      this.kostkiImg[i].style = "width:90px;height:90px;";
    }
  }
}

losuj(){
  if(this.gameOver) return;
  if(!this.play && this.etap < 3) {
    for(let i in this.obroty){
      if(!this.blocked[i]) this.obroty[i] = Math.ceil(12*Math.random())+ 6;
    }

    this.play = true;
    this.rzut(this);
  }
}

pokazKostki(){
    for(let i in this.kostkiOczka){
      if(!this.blocked[i]) this.kostkiImg[i].src = "kostka" + this.kostkiOczka[i] + ".png";
    }
}

rzut(self){
  let sumaObrotow = 0;
  for(let i in self.kostkiOczka){
    if(self.obroty[i] > 0){
      sumaObrotow += self.obroty[i];
      self.obroty[i]--;
      self.kostkiOczka[i] = self.kostkiOczka[i] % 6 + 1;
    }
  }
  self.pokazKostki();
  if(sumaObrotow > 0)  setTimeout( self.rzut, self.anim, self);
  else {
    self.play = false;
     self.etap++;
     self.addPhase();
     if(self.etap > 2) {
       self.czysc();
       document.getElementById("reka").src="rzut-pause.png";
     }
  }
}

czysc(){
  for(let i in this.blocked){
    this.blocked[i] = false;
    this.kostkiImg[i].style = "width:100px;height:100px;";
  }
}

addPhase(){
      if(this.gameOver) {
        document.getElementById("gameInfo").innerHTML = "koniec gry";
        document.getElementById("reka").src="rzut-pause.png";
      } else {
  switch (this.etap) {
    case 0:
      document.getElementById("gameInfo").innerHTML = "pierwszy rzut";
      break;
    case 1:
      document.getElementById("gameInfo").innerHTML = "drugi rzut, zaznacz kostki, którymi nie rzucasz";
      break;
    case 2:
      document.getElementById("gameInfo").innerHTML = "trzeci rzut, zaznacz kostki, którymi nie rzucasz";
      break;
    default:
      document.getElementById("gameInfo").innerHTML = "wybierz co punktować";
  }
}
}

checkEyes(i){
  let p = this.rules.checkEyes(parseInt(i));
  if(this.player.options[i-1]&& this.etap != 0){
    this.czysc();
    this.etap = 0;
    this.addPhase();
    document.getElementById("reka").src="rzut.png";
    document.getElementById("e"+i).innerHTML = p;
    this.player.points += p;
    document.getElementById("s1").innerHTML = this.player.points;
    document.getElementById("btn"+i).className = "btn btn-gray";
    this.player.options[i-1] = false;
    this.player.moves -= 1;
    if(this.player.moves == 0) this.gameOver = true;
  }
}

checkExtra(c){
  if(this.etap == 0) return;
  let p = 0;
  let i = -1;
  let can = false;
  if(c == '3') {
    if(this.player.options[6]){
      p = this.rules.checkThree();
      i = 6;
    }
  } else if(c == '4') {
    if(this.player.options[7]){
      p = this.rules.checkFour();
      i = 7;
    }
  } else if(c == '5') {
    if(this.player.options[8]){
      p = this.rules.checkFive();
      i = 8;
    }
  } else if(c == 's') {
    if(this.player.options[9]){
      p = this.rules.checkSmallStrit();
      i = 9;
    }
  } else if(c == 'S') {
    if(this.player.options[10]){
      p = this.rules.checkBigStrit();
      i = 10;
    }
  } else if(c == 'f') {
    if(this.player.options[11]){
      p = this.rules.checkFull();
      i = 11;
    }
  } else if(c == '0') {
    if(this.player.options[12]){
      p = this.rules.checkSum();
      i = 12;
    }
  }

  if(i != -1){
    this.player.points += p;
    this.player.moves -= 1;
    this.player.options[i] = false;
    document.getElementById("x" + c).innerHTML = p;
    document.getElementById("btnx" + c).className = "btn btn-gray";
    if(this.player.moves == 0) this.gameOver = true;
    this.czysc();
    this.etap = 0;
    this.addPhase();
    document.getElementById("reka").src="rzut.png";

  }
}

}
