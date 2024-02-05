const MapGenerator = require('./mapgeneratortest.js');
const Deer = require('./deer.js');
const Wolf = require('./wolf.js');

class AnimalType {
  constructor(exist, t){
    this.e = exist;
    this.t = t;
  }
}

module.exports = class TheWorld {

  constructor() {
    let preferences = {};
    preferences.woods = 10;
    this.Row = 30;
    this.Col = 30;
    let generator = new MapGenerator(this.Row, this.Col, preferences);
    this.deers = [];
    this.wolfs = [];
    this.plants = generator.getPlants();
    this.worldTiles = generator.getMap();
    this.animalsArray = new Array(this.Row).fill(0).map(row => 
      new Array(this.Col).fill(new AnimalType(false, 0)));
    this.food = new Array(this.Row).fill(0).map(row => new Array(this.Col).fill(0));
    this._fillFood();
    this._randomAnimals(10);
  }


  _randomAnimals(nr) {
    //temporary for deers
    while(nr > 0){
      let c = Math.floor(Math.random()*this.Col);
      let r = Math.floor(Math.random()*this.Row);
      if(this.animalsArray[r][c].e == false && 
        (this.worldTiles[r][c] == 'pl' || this.worldTiles[r][c] == 'st' 
        || this.worldTiles[r][c] == 'hi')) {
        this.deers.push(new Deer(r, c));
        this.animalsArray[r][c].e = true;
        this.animalsArray[r][c].t = 1;
        nr--;
      }
    }
    nr = 3;
    while(nr > 0){
      let c = Math.floor(Math.random()*this.Col);
      let r = Math.floor(Math.random()*this.Row);
      if(this.animalsArray[r][c].e == false && 
        (this.worldTiles[r][c] == 'pl' || this.worldTiles[r][c] == 'st' 
        || this.worldTiles[r][c] == 'hi')) {
        this.wolfs.push(new Wolf(r, c));
        this.animalsArray[r][c].e = true;
        this.animalsArray[r][c].t = 2;
        nr--;
      }
    }
    //for(let a of this.deers) a.print();
  }

  _fillFood() {
    for (let i = 0; i < this.Row; i++) {
      for (let j = 0; j < this.Col; j++) {
        if (this.plants[i][j] == 'gr') {
          if (this.worldTiles[i][j] == 'st') this.food[i][j] = 120;
          else if (this.worldTiles[i][j] == 'hi') this.food[i][j] = 100;
          else this.food[i][j] = 100;
        } else if(this.plants[i][j].charAt(0) == 'o') this.food[i][j] = 60;
      }
    }
  }

  _growGrass() {
    for (let i in this.food) {
      for (let j in this.food[i]) {
        if (this.plants[i][j] == 'gr'){
          if(this.worldTiles[i][j] == 'pl') {
            this.food[i][j] += 10;
            if(this.food[i][j] > 100) this.food[i][j] = 100;
          } else if(this.worldTiles[i][j] == 'hi'){
            this.food[i][j] += 8;
            if(this.food[i][j] > 80) this.food[i][j] = 80;
          } else if(this.worldTiles[i][j] == 'st') {
            this.food[i][j] += 12;
            if(this.food[i][j] > 120) this.food[i][j] = 120;
          }
        } else if (this.plants[i][j].charAt(0) == 'o') {
          this.food[i][j] += 8;
          if(this.food[i][j] > 60) this.food[i][j] = 60;
        }
      }
    }
  }

growPlants(){
  this._growGrass();
}

  printWorld(){
    let line = '';
    for (let i = 0; i < this.Row; i++) {
      line = '';
      for (let j = 0; j < this.Col; j++) {
          line += this.worldTiles[i][j] + ',';
          line += this._foodToSymbol(this.food[i][j]);
          if(this.animalsArray[i][j].e){
            let animalId = this._findKindAnimalIsHere(i, j);
            if(animalId < 0) line += '-';
            else if(animalId == 1) line += '@';
            else line += '$';
          } else line += '-';
          if(j < this.Col -1) line += '|';
      }
      console.log(line);
    }
    //console.log(this.animals);
  }

  _foodToSymbol(food){
    let nr = Math.round(food/8);
    if(nr < 10) return nr.toString();
    else return String.fromCharCode(55+nr);
  }

  _findKindAnimalIsHere(r, c){
    for(let i = 0; i < this.deers.length; i++){
      if(this.deers[i].r == r && this.deers[i].c == c) {
        return this.deers[i].id;
      }
    }
    for(let i = 0; i < this.wolfs.length; i++){
      if(this.wolfs[i].r == r && this.wolfs[i].c == c) {
        return this.wolfs[i].id;
      }
    }
    return -1;
  }
  countGrass(){
    let grassAmount = 0;
    for (let i in this.food) {
      for (let j in this.food[i]) {
        grassAmount += this.food[i][j];
      }
    }
    console.log('grass amount: %d', grassAmount);
  }

}
