const hexlib = require('./hexlib.js');

class HexPoint {
  constructor(){
    this.r;
    this.c;
  }
}

module.exports = class DeerMoving {
  constructor(world){
    this.world = world;
    this.deers = world.animals;
    console.log(hexlib);
    let h = new hexlib.Hex(world.Row, world.Col);
    this.hex = new hexlib.HexLibrary(h, new hexlib.PathFinder(h));
  }
  nextTurn(){
    for(let i in this.deers){
      if(this.deers[i].isMoving){
        this.keepMoving(this.deers[i]);
      } else {
        let hexPoint = this.eatOrGo(this.deers[i]);
        if(hexPoint.r == this.deers[i].r && hexPoint.c == this.deers[i].c) this.keepEat(this.deers[i]);
        else this.startMove(this.deers[i], hexPoint);
      }
      this.checkEatEffect(this.deers[i]);
    }
  }
  eatOrGo(deer){
    let neighbours = this.hex.neighbours(this.deers[i].r, this.deers[i].r, 1);
    console.log(neighbours);
   // if(this.world[deer.r][deer.c].food)
    return true;
  }
  eatStrategy(deer, neighbours){


  }
  keepMoving(deer){

  }
  startMove(deer){

  }
  checkEatEffect(deer){

  }
}