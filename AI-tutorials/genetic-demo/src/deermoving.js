const Deer = require('./deer.js');
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

module.exports = class DeerMoving {
  constructor(world){
    this.world = world;
    //console.log(hexlib);
    let h = new hexlib.Hex(world.Row, world.Col);
    this.hex = new hexlib.HexLibrary(h, new hexlib.PathFinder(h));
    //console.log(this.hex.neighbours(3, 4, 1));
  }
  nextTurn(){
    for(let i in this.world.deers){
      //this.world.deers[i].print();
      this.world.deers[i].energy -= Math.ceil(this.world.deers[i].mass/15);
      if(this.world.deers[i].isMoving){
        this.keepMoving(this.world.deers[i]);
      } else {
        let hexPoint = this.eatOrGo(this.world.deers[i]);
        //console.log(hexPoint);
        if(hexPoint.r == this.world.deers[i].r && hexPoint.c == this.world.deers[i].c) this.keepEat(this.world.deers[i]);
        else this.startMove(this.world.deers[i], hexPoint);
      }
    }
  }
  nextDay(){
    for(let i in this.world.deers) {
        this.checkAlive(this.world.deers[i]);
        if(this.world.deers[i].isMoving){
          this.world.deers[i].isMoving = false;
          this.world.deers[i].distanceToDestination = 0;
        }
    }
    this._removeDeath();
    this.bornNew();  
  }
  eatOrGo(deer){
    //console.log(this.world.food[deer.r][deer.c]);
    if(this.world.food[deer.r][deer.c] >= deer.herdSize) return HexPoint.create(deer.r, deer.c);
    else {
      let neighbours = this.hex.neighbours(deer.r, deer.c, 1);
      let max = this.world.food[deer.r][deer.c];
      let maxI = this._findMaxNeighbourFood(neighbours, deer, max);
      if(maxI < 0) return HexPoint.create(deer.r, deer.c);
      else return HexPoint.create(neighbours[maxI][0], neighbours[maxI][1]);
    }
    //console.log(neighbours);
    //return true;
  }
  ///TODO: fix to find free with max ???
  _findMaxNeighbourFood(ng, deer, startMax = 0){
    let max = startMax;
    if(startMax > 0) max = this.world.food[deer.r][deer.c];
    let maxI = -1;
    for(let i = 0; i < ng.length; i++){
      if(this.world.animalsArray[ng[i][0]][ng[i][1]].e) continue;
      else if(this.world.food[ng[i][0]][ng[i][1]] > max) {
        max = this.world.food[ng[i][0]][ng[i][1]];
        maxI = i;
      }
    }
    if(max < deer.herdSize/2) return Math.floor(Math.random()*ng.length);
    return maxI;
  }
  keepEat(deer){
    if(deer.mass*10 - deer.energy < 0) return;
    //console.log('keep eat');
    if(this.world.food[deer.r][deer.c] >= deer.herdSize) {
      this.world.food[deer.r][deer.c] -= deer.herdSize;
      deer.energy += 5;
    } else {
      let percentFood = this.world.food[deer.r][deer.c]/deer.herdSize;
      this.world.food[deer.r][deer.c] = 0;
      deer.energy += Math.round(5*percentFood);
    }
  }
  keepMoving(deer){
    deer.distanceToDestination -= deer.speed;
    deer.energy -= Math.ceil((deer.mass+deer.speed)/15);
    if(deer.distanceToDestination <= 0) {
      deer.isMoving = false;
      deer.distanceToDestination = 0;
    }
  }
  startMove(deer, hexPoint){
    //console.log('start move to (%d, %d)', hexPoint.r, hexPoint.c);
    deer.goFrom = HexPoint.create(deer.r, deer.c);
    //console.log(this.world.animalsArray[deer.r][deer.c]);
    this.world.animalsArray[deer.r][deer.c].e = false;
    deer.r = hexPoint.r;
    deer.c = hexPoint.c;
    this.world.animalsArray[hexPoint.r][hexPoint.c].e = true;
    this.world.animalsArray[hexPoint.r][hexPoint.c].t = 1;
    deer.isMoving = true;
    deer.distanceToDestination = 60;
  }
  checkAlive(deer){
    if(deer.energy < 0){
      let toDie = Math.ceil(deer.herdSize*0.1);
      deer.herdSize -= toDie;
      if(deer.children > 0) deer.children -= toDie;
      deer.energy = 0;
    }
  }
  _removeDeath(){
    let newArray = [];
    //console.log(this.world);
    for(let i = 0; i < this.world.deers.length; i++){
      if(this.world.deers[i].herdSize > 0) newArray.push(this.world.deers[i]); 
    }
    this.world.deers = newArray;
  }
  bornNew(){
    for(let i = 0; i < this.world.deers.length; i++){
      if(this.world.deers[i].children >  0){
        this.world.deers[i].timeToGrowUp--;
        if(this.world.deers[i].timeToGrowUp == 0){
          this.world.deers[i].children = 0;
        }
      } else if(this.world.deers[i].energy > 40){
        let newChildren = Math.ceil((Math.random()+2)*(Math.ceil(this.world.deers[i].herdSize/6.0)));
        this.world.deers[i].herdSize += newChildren;
        this.world.deers[i].children = newChildren;
        this.world.deers[i].timeToGrowUp = 10;
        if(this.world.deers[i].herdSize > 32){
          this.splitToNewHerd(this.world.deers[i]);
        }
      }
    }
  }
  splitToNewHerd(deer){
    //console.log('split herd');
    let neighbours = this.hex.neighbours(deer.r, deer.c, 1).filter((n) => {
      return (this.world.animalsArray[n[0]][n[1]].e == false && 
        this.world.worldTiles[n[0]][n[1]] != 'hi' &&
        this.world.worldTiles[n[0]][n[1]] != 'wd');
    });
    //console.log(neighbours);
    let maxI = this._findMaxNeighbourFood(neighbours, deer, 0);
    if(maxI > -1 && neighbours.length > 0){
      //deer.print();
      //console.log(neighbours);
      let newDeer = new Deer(neighbours[maxI][0], neighbours[maxI][1]);
      newDeer.herdSize = Math.floor(deer.herdSize/2);
      deer.herdSize = Math.ceil(deer.herdSize/2);
      newDeer.children = Math.floor(deer.children/2);
      deer.children = Math.ceil(deer.children/2);
      newDeer.timeToGrowUp = deer.timeToGrowUp;
      newDeer.energy = deer.energy;
      //heritage a mass and speed???
      newDeer.speed = deer.speed;
      newDeer.mass = deer.mass;
      newDeer.isMoving = true;
      newDeer.distanceToDestination = 60 - newDeer.speed;
      newDeer.goFrom = HexPoint.create(deer.r, deer.c);
      this.world.deers.push(newDeer);
    } else {
      console.log("lack of place to split herd");
    }
  }
  printAnimals(){
    for(let i = 0; i < this.world.deers.length; i++){
      this.world.deers[i].print();
    }
  }
  printInfo(){
    let numberOfDeers = 0;
    for(let i = 0; i < this.world.deers.length; i++){
      numberOfDeers += this.world.deers[i].herdSize;
    }
    console.log('Size of heards: %d, deers: ', this.world.deers.length, numberOfDeers);
  }
}
