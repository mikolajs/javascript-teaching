
class TheWorld {

  constructor() {
    this.loaded = false;
    // this.sizeXY = 100;

    //console.log("size of map " + width + " of " + height);
    //this.loadTilesMockup2();
    //this.worldTiles[width][height];// form 0,0 as left top point
    //console.log("Size of map: " + this.sizeXY*this.sizeXY);
    //this.test();
    let preferences = {};
    preferences.woods = parseInt(document.getElementById('woods').value);
    console.log(document.getElementById('woods').value);
    console.log("WOODS " + preferences.woods);
    if(isNaN(preferences.woods.isNaD)) preferences.woods = 10;
    if (preferences.woods > 50) preferences.woods = 50;
    this.Row = 40;
    this.Col = 40;
    let generator = new MapGenerator(this.Row, this.Col, preferences);
    this.worldTiles = generator.getMap();
    this.plants = generator.getPlants();
    this.food = new Array(this.Row).fill(0).map(row => new Array(this.Col).fill(0));
    this.animals = [];
    this._fillFood();
    this._randomAnimals(10);
    this.loaded = true;
  }

  loadTiles() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (this.readyState == 4 && this.status == 200) {
        let jsonData = JSON.parse(xhr.responseText);
        this._createWorld(jsonData);
        this.loaded = true;
      }
    }
    xhr.open("GET", 'http://localhost:3030', true);
    xhr.send();
  }


  _randomAnimals(nr) {
    //temporary for deers
    while(nr > 0){
      let c = Math.floor(Math.random()*this.Col);
      let r = Math.floor(Math.random()*this.Row);
      if(this.plants[r][c] == 'gr' || this.plants[r][c] == 'wd') {
        this.animals.push(new Animal('deer', r, c));
        nr--;
      }
    }
    for(let a of this.animals) a.printAnimal();
  }

  _fillFood() {
    for (let i = 0; i < this.Row; i++) {
      for (let j = 0; j < this.Col; j++) {
        if (this.plants[i][j] == 'gr') {
          if (this.worldTiles[i][j] == 'st') this.food[i][j] = 120;
          else if (this.worldTiles[i][j] == 'hi') this.food[i][j] = 80;
          else this.food[i][j] == 100;
        }
        else if (this.plants[i][j] == 'wd') this.food[i][j] = 60;
      }
    }
  }

  _createObjects(jsonData) {
    this.worldObjects = new Array(this.Row);
    for (let i = 0; i < this.Row; i++) {
      this.worldObjects[i] = new Array(this.Col);
    }
    for (let i = 0; i < this.Col; i++) {
      for (let j = 0; j < this.Row; j++) this.worldObjects[i][j] = jsonData[i][j];
    }

  }



  _createWorld(jsonData) {
    //x rows, y cols
    this.Row = jsonData.length;
    this.Col = jsonData[0].length;
    //console.log("size of data: " + this.X + " " + this.Y);
    this.worldTiles = new Array(this.Col);
    //console.log(this.worldTiles.length);
    for (let i = 0; i < this.Col; i++) {
      this.worldTiles[i] = new Array(this.Row);
    }
    for (let i = 0; i < this.Col; i++) {
      for (let j = 0; j < this.Row; j++) this.worldTiles[i][j] = jsonData[i][j];
    }
    //for(let i in this.worldTiles)
    // for(let j in this.worldTiles[i]) console.log(this.worldTiles[i][j]);
    //console.log("_createWorld X " + this.X + " Y " + this.Y);
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
            if(this.food[i][j] > 80) this.food[i][j] == 100;
          } else if(this.arr[i][j] == 'st') {
            this.food[i][j] += 12;
            if(this.food[i][j] > 120) this.food[i][j] == 100;
          }
        }
      }
    }
  }


}
