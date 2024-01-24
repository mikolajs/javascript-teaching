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
    this.deers = world.animals;
    //console.log(hexlib);
    let h = new hexlib.Hex(world.Row, world.Col);
    this.hex = new hexlib.HexLibrary(h, new hexlib.PathFinder(h));
  }
  nextTurn(){
    for(let i in this.deers){
      this.deers[i].print();
      if(this.deers[i].isMoving){
        this.keepMoving(this.deers[i]);
      } else {
        let hexPoint = this.eatOrGo(this.deers[i]);
        if(hexPoint.r == this.deers[i].r && hexPoint.c == this.deers[i].c) this.keepEat(this.deers[i]);
        else this.startMove(this.deers[i], hexPoint);
      }
      this.checkAlive(this.deers[i]);
    }
  }
  eatOrGo(deer){
    console.log(this.world.food[deer.r][deer.c]);
    if(this.world.food[deer.r][deer.c] >= deer.herdSize) return HexPoint.create(deer.r, deer.c);
    else {
      let neighbours = this.hex.neighbours(deer.r, deer.r, 1);
      let max = this.world.food[deer.r][deer.c];
      let i = -1;
      let maxI = -1;
      for(let ng of neighbours){
        i++;
        if(this.world.food[ng[0]][ng[1]] > max) {
          max = this.world.food[ng[0]][ng[1]];
          maxI = i;
        }
      }
      if(maxI < 0) return HexPoint,create(deer.r, deer.c);
      else return neighbours[maxI];
    }
    //console.log(neighbours);
    //return true;
  }
  keepEat(deer){
    console.log('keep eat');
    if(this.world.food[deer.r][deer.c] >= deer.herdSize) {
      this.world.food[deer.r][deer.c] -= deer.herdSize;
      deer.energy += 10;
    } else {
      let percentFood = this.world.food[deer.r][deer.c]/deer.herdSize;
      this.world.food[deer.r][deer.c] = 0;
      deer.energy += Math.round(10*percentFood);
    }
  }
  keepMoving(deer){

  }
  startMove(deer){
    console.log('start move')
  }
  checkAlive(deer){
    deer.energy -= 1;
    if(deer.energy < 0){
      deer.herdSize -= 1;
      deer.energy = 0;
    }
  }
  bornNew(){
    for(let i = 0; i < this.deers.length; i++){
      if(this.deers[i].energy > 50){
        this.deers[i].herdSize += Math.ceil(Math.sqrt(this.deers[i].herdSize));
        if(this.deers[i].herdSize > 60){
          this.splitToNewHerd(deer);
        }
      }


    }
  }
  splitToNewHerd(deer){

  }
}