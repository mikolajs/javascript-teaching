const Wolf = require('./wolf.js');
const hexlib = require('./hexlib.js');

class HexPoint {
  constructor(){
    this.r;
    this.c;
  }
  static create(R, C){
    let hp = new HexPoint();
    hp.r = R;
    hp.c = C;
    return hp;
  }
}

module.exports = class WolfMoving {
  constructor(world){
    this.world = world;
    //console.log(hexlib);
    let h = new hexlib.Hex(world.Row, world.Col);
    this.hex = new hexlib.HexLibrary(h, new hexlib.PathFinder(h));
    //console.log(this.hex.neighbours(3, 4, 1));
  }
  nextTurn(){
    for(let i in this.world.wolfs){
      //this.world.wolfs[i].print();
      this.world.wolfs[i].energy -= Math.ceil(this.world.wolfs[i].mass/15);
      if(this.world.wolfs[i].isMoving){
        this.keepMoving(this.world.wolfs[i]);
      } else if(this.world.wolfs[i].isEating) {
        this.keepEat(this.world.wolfs[i]);
      } else {
        let hexPoint = this.huntOrGo(this.world.wolfs[i]);
        //console.log(hexPoint);
        if(hexPoint.r == this.world.wolfs[i].r && hexPoint.c == this.world.wolfs[i].c) 
        this.startMove(this.world.wolfs[i], hexPoint);
      }
    }
  }
  nextDay(){
    for(let i in this.world.wolfs) {
        this.checkAlive(this.world.wolfs[i]);
        if(this.world.wolfs[i].isMoving){
          this.world.wolfs[i].isMoving = false;
          this.world.wolfs[i].distanceToDestination = 0;
        }
    }
    this._removeDeath();
    this.bornNew();  
  }
  huntOrGo(wolf){
    //console.log(this.world.food[wolf.r][wolf.c]);
    ///look for wolfs if no go anywere 
    let hexPoint = this._findDeerNeighbour(wolf.r, wolf.c);
    
    if(hexPoint.r != -1 && hexPoint.c != -1){
      let neighbours = this.hex.neighbours(wolf.r, wolf.c, 1).filter((n) => {
        return (this.world.animalsArray[n[0]][n[1]].e == false && 
          this.world.animalsArray[n[0]][n[1]].t == 1 &&
          this.world.worldTiles[n[0]][n[1]] != 'mo' &&
          this.world.worldTiles[n[0]][n[1]] != 'wd');
      });
      if(neighbours.length == 0) return;
      let random = Math.floor(Math.random()*neighbours.length);
      wolf.isMoving = true;
      wolf.distanceToDestination = 60;
      wolf.goFrom = HexPoint.create(neighbours[maxI][0], neighbours[maxI][1]);
    } else {
      ///this add hunter
    }
    //console.log(neighbours);
    //return true;
  }
  ///TODO: fix to find free with max ???
  _findDeerNeighbour(r, c){
    let neighbours = this.hex.neighbours(r, c, 1).filter((n) => {
      return (this.world.animalsArray[n[0]][n[1]] == true && 
        this.world.worldTiles[n[0]][n[1]] != 'hi' && 
        this.world.worldTiles[n[0]][n[1]] != 'wd');
    });
    if(neighbours.length == 0) return HexPoint.create(-1, -1);
  }
  keepEat(wolf){
    if(wolf.mass*10 - wolf.energy < 0) {
      wolf.isEating = false;
      wolf.toEatFood = 0;
      return;
    }
    //console.log('keep eat');
    if(wolf.toEatFood >= wolf.herdSize) {
      wolf.toEatFood -= wolf.herdSize;
      wolf.energy += 10;
    } else {
      let percentFood = wolf.toEatFood/wolf.herdSize;
      wolf.toEatFood = 0;
      wolf.isEating = false;
      wolf.energy += Math.round(10*percentFood);
    }
  }
  keepMoving(wolf){
    wolf.distanceToDestination -= wolf.speed;
    wolf.energy -= Math.ceil((wolf.mass+wolf.speed)/15);
    if(wolf.distanceToDestination <= 0) {
      wolf.isMoving = false;
      wolf.distanceToDestination = 0;
    }
  }
  startMove(wolf, hexPoint){
    //console.log('start move to (%d, %d)', hexPoint.r, hexPoint.c);
    wolf.goFrom = HexPoint.create(wolf.r, wolf.c);
    this.world.animalsArray[wolf.r][wolf.c].e = false;
    wolf.r = hexPoint.r;
    wolf.c = hexPoint.c;
    this.world.animalsArray[hexPoint.r][hexPoint.c].e = true;
    this.world.animalsArray[hexPoint.r][hexPoint.c].t = 2;
    wolf.isMoving = true;
    wolf.distanceToDestination = 60;
  }
  checkAlive(wolf){
    if(wolf.energy < 0){
      let toDie = Math.ceil(wolf.herdSize*0.1);
      wolf.herdSize -= toDie;
      if(wolf.children > 0) wolf.children -= toDie;
      wolf.energy = 0;
    }
  }
  _removeDeath(){
    let newArray = [];
    //console.log(this.world);
    for(let i = 0; i < this.world.wolfs.length; i++){
      if(this.world.wolfs[i].herdSize > 0) newArray.push(this.world.wolfs[i]); 
    }
    this.world.wolfs = newArray;
  }
  bornNew(){
    for(let i = 0; i < this.world.wolfs.length; i++){
      if(this.world.wolfs[i].children >  0){
        this.world.wolfs[i].timeToGrowUp--;
        if(this.world.wolfs[i].timeToGrowUp == 0){
          this.world.wolfs[i].children = 0;
        }
      } else if(this.world.wolfs[i].energy > 40){
        let newChildren = Math.ceil((Math.random()+2)*(Math.ceil(this.world.wolfs[i].herdSize/6.0)));
        this.world.wolfs[i].herdSize += newChildren;
        this.world.wolfs[i].children = newChildren;
        this.world.wolfs[i].timeToGrowUp = 10;
        if(this.world.wolfs[i].herdSize > 24){
          this.splitToNewHerd(this.world.wolfs[i]);
        }
      }
    }
  }
  splitToNewHerd(wolf){
    //console.log('split herd');
    let neighbours = this.hex.neighbours(wolf.r, wolf.c, 1).filter((n) => {
      return (this.world.animalsArray[n[0]][n[1]].e == false && 
        this.world.worldTiles[n[0]][n[1]] != 'mo' &&
        this.world.worldTiles[n[0]][n[1]] != 'wd' );
    });
    //console.log(neighbours);
    if(neighbours.length > 0){
      //wolf.print();
      //console.log(neighbours);
      let ng = neighbours[Math.floor(Math.random()*neighbours.length)];
      let newWolf = new Wolf(ng[0], ng[1]);
      newWolf.herdSize = Math.floor(wolf.herdSize/2);
      wolf.herdSize = Math.ceil(wolf.herdSize/2);
      newWolf.children = Math.floor(wolf.children/2);
      wolf.children = Math.ceil(wolf.children/2);
      newWolf.timeToGrowUp = wolf.timeToGrowUp;
      newWolf.energy = wolf.energy;
      //heritage a mass and speed???
      newWolf.speed = wolf.speed;
      newWolf.mass = wolf.mass;
      newWolf.isMoving = true;
      newWolf.isEating = false;
      newWolf.distanceToDestination = 60 - newWolf.speed;
      newWolf.goFrom = HexPoint.create(wolf.r, wolf.c);
      this.world.wolfs.push(newWolf);
    } else {
      console.log("lack of place to split herd");
    }
  }
  printAnimals(){
    for(let i = 0; i < this.world.wolfs.length; i++){
      this.world.wolfs[i].print();
    }
  }
  printInfo(){
    let numberOfWolfs = 0;
    for(let i = 0; i < this.world.wolfs.length; i++){
      numberOfWolfs += this.world.wolfs[i].herdSize;
    }
    console.log('Size of heards: %d, wolfs: ', this.world.wolfs.length, numberOfWolfs);
  }
}
