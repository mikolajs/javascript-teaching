

module.exports = class Deer {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.speed = 10;
    this.mass = 10;
    this.herdSize = 10;
    let add = Math.ceil(Math.random()*10);
    this.speed += add;
    this.mass += 10 - add;
    this.isMoving = false;
    this.id = 1;
    this.energy = 100;
    this.distanceToDestination = 0;
    this.goFrom;
  }  
  mutate(){
    let change = Math.floor(Math.random()*5) - 2;
    this.speed += change;
    this.mass -= change;
    if(this.speed < 10) {
      this.mass = 20;
      this.speed = 10;
    } else if(this.mass < 10){
      this.mass = 10;
      this.speed = 20;
    }
  }
  print(){
    console.log('Deer (%d, %d), size=%d, moving=%s, speed=%d, mass=%d, !%d', 
    this.r, this.c, this.herdSize, this.isMoving, this.speed, this.mass, this.energy);
  }
  test() {
    for(let i = 0; i <  20; i++){
    this.mutate();
    this.print();
    if(this.mass < 10) console.log('Error: mass');;
    if(this.mass > 20) console.log('Error: mass');;
    if(this.speed < 10) console.log('Error: speed');;
    if(this.speed> 20) console.log('Error: speed');;
    }
  }
}
