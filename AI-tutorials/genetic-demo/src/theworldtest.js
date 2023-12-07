const MapGenerator = require('./mapgeneratortest.js');
const Deer = require('./deer.js');
const Wolf = require('./wolf.js');

module.exports = class TheWorld {

  constructor() {
    let preferences = {};
    preferences.woods = 10;
    this.Row = 30;
    this.Col = 30;
    let generator = new MapGenerator(this.Row, this.Col, preferences);
    this.plants = generator.getPlants();
    this.worldTiles = generator.getMap();
    this.food = new Array(this.Row).fill(0).map(row => new Array(this.Col).fill(0));
    this.animals = [];
    this._fillFood();
    this._randomAnimals(10);
  }


  _randomAnimals(nr) {
    //temporary for deers
    while(nr > 0){
      let c = Math.floor(Math.random()*this.Col);
      let r = Math.floor(Math.random()*this.Row);
      if(this.plants[r][c] == 'gr' || this.plants[r][c] == 'wd') {
        this.animals.push(new Deer(r, c));
        nr--;
      }
    }
    //for(let a of this.animals) a.print();
  }

  _fillFood() {
    for (let i = 0; i < this.Row; i++) {
      for (let j = 0; j < this.Col; j++) {
        if (this.plants[i][j] == 'gr') {
          if (this.worldTiles[i][j] == 'st') this.food[i][j] = 120;
          else if (this.worldTiles[i][j] == 'hi') this.food[i][j] = 80;
          else this.food[i][j] = 100;
        } else if(this.plants[i][j].charAt(0) == 'o') this.food[i][j] = 60;
      }
    }
  }

  _growGrass() {
    for (let i in this.food) {
      for (let j in this.food[i]) {
        if (this.plants[i][j] == 'gr'){
          if(this.arr[i][j] == 'pl') {
            this.food[i][j] += 10;
            if(this.food[i][j] > 100) this.food[i][j] == 100;
          } else if(this.arr[i][j] == 'hi'){
            this.food[i][j] += 8;
            if(this.food[i][j] > 80) this.food[i][j] == 80;
          } else if(this.arr[i][j] == 'st') {
            this.food[i][j] += 12;
            if(this.food[i][j] > 120) this.food[i][j] == 120;
          }
        } else if (this.plants[i][j].charAt(0) == 'o') {
          this.food[i][j] += 8;
          if(this.food[i][j] > 60) this.food[i][j] = 60;
        }
      }
    }
  }

  printWorld(){
    let line = '';
    for (let i = 0; i < this.Row; i++) {
      line = '';
      for (let j = 0; j < this.Col; j++) {
          line += this.worldTiles[i][j] + ',';
          line += this._foodToSymbol(this.food[i][j]);
          let animalId = this._findIfAnimalIsHere(i, j);
          if(animalId < 0) line += '-';
          else line += '@';
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

  _findIfAnimalIsHere(r, c){
    for(let i = 0; i < this.animals.length; i++){
      
      if(this.animals[i].r == r && this.animals[i].c == c) {
        //console.log(this.animals[i]);
        return i;
      }
    }
    return -1;
  }

}
