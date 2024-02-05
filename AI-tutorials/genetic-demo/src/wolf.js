
module.exports = class Wolf {
  constructor(r, c) {
    this.speed = 10;
    this.mass = 5;
    let add = Math.ceil(Math.random()*10);
    this.speed += add;
    this.mass += 10 - add;
    this.energy = 100;
    this.herdSize = 12;
    this.children = 0;
    this.timeToGrowUp = 0;
    this.isMoving = false;
    this.isEating = false;
    this.toEatFood = 0;
    this.id = 2;
    this.r = r;
    this.c = c;
    this.distanceToDestination = 0;
    this.goFrom;
  }  
  mutate(){
    let change = Math.floor(Math.random()*5) - 2;
    this.speed += change;
    this.mass -= change;
    if(this.speed < 10) {
      this.mass = 15;
      this.speed = 10;
    } else if(this.mass < 5){
      this.mass = 5;
      this.speed = 20;
    }
  }
  print(){
    console.log('Wolf (%d, %d), size=%d (*%d), mov=%s, speed=%d, mass=%d, !%d', 
    this.r, this.c, this.herdSize, this.children, this.isMoving, this.speed, this.mass, this.energy);
  }
  test() {
    for(let i = 0; i <  20; i++){
    this.mutate();
    this.print();
    if(this.mass < 5) console.log('Error: mass');;
    if(this.mass > 15) console.log('Error: mass');;
    if(this.speed < 10) console.log('Error: speed');;
    if(this.speed> 20) console.log('Error: speed');;
    }
  }
}


