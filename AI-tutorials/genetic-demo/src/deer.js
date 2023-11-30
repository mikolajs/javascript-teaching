

module.exports = class Deer {
  constructor() {
    this.speed = 10;
    this.mass = 10;
    let add = Math.ceil(Math.random()*10);
    this.speed += add;
    this.mass += 10 - add;
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
    console.log('Deer speed %d and mass %d', this.speed, this.mass);
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
