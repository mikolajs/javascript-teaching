
const animalsConst = {
  'deer':{
    'speed':6,
    'weight':7,
    'eat':8,
    'dont':4
  }
}

const moveDir = {
  'e': [1, 0], 
  'w': [-1, 0],
  'ne': [0.5, 0.5],
  'nw': [-0.5, 0.5],
  'se': [-0.5, 0.5],
  'sw': [-0.5, -0.5]
  };

const anchorsIdleDeer = [[0.5, 0.5], [-1, 0.5], [1.8, 0.5], [0.9, -0.1], [-0.5, 0], [1.5, 1], [0, 1]];
const anchorsMoveDeer = [[0.5, 0.5], [-1, 0.5], [1.8, 0.5], [0.9, -0.1], [-0.5, 0], [1.5, 1], [0, 1]];


class Animal {
  constructor(name, row, col){
    this.name = name;
    this.number = 60;
    this.Row = row;
    this.Col = col; 
    this.center = new PlainPoint(0, 0);
    this.anchors = anchorsIdleDeer;
    this.move = false;
    //this.next = false; //if it is on new Hex but not on center
    this.dir = 'ne';
    this.moveDir = moveDir[this.dir];
    this.destination = new HexPoint(-1, -1);
    this.distance = 0;
    this.out = false;
    this.delta = 0.0; //temporary - change to creata move 
  }
  printAnimal(){
    console.log('%s on row %d col %d', this.name, this.Row, this.Col);
  }

  setCenter(point){
    this.center = point;
  }

  setAnimationSprite(animation){
    animation.anchor.set(0, 0);
    animation.x = this.center.x;
    animation.y = this.center.y;
    animation.scale.x = 0.5;
    animation.scale.y = 0.5;
    animation.animationSpeed = 0.1;
  }

  createAnimationHerd(resources, position){
    this.center = position;
    let nr = Math.ceil(this.number / 9);
    let sprites = [];
    for(let i = 0; i < nr; i++){
      let animation;
      if(!this.move) {
        animation = new PIXI.AnimatedSprite(resources['deer_i'].spritesheet.animations['idle']);
      } else {
        animation = new PIXI.AnimatedSprite(resources['deer_'+this.dir].spritesheet.animations['deer_'+this.dir]);
      }
      //this.anchors[i][0] + this.delta*this.moveDir[0], this.anchors[i][1] + this.delta*this.moveDir[1]
      animation.anchor.set(this.anchors[i][0] - this.delta*this.moveDir[0] , this.anchors[i][1] - this.delta*this.moveDir[1]);
      //console.log(animation.anchor);
      //console.log('delta %f, x %f y %f',this.delta, this.delta*this.moveDir[0], this.delta*this.moveDir[1]);
      animation.x = position.x;
      animation.y = position.y;
      animation.scale.x = 0.5;
      animation.scale.y = 0.5;
      animation.animationSpeed = 0.1;
      //console.log(animation);
      sprites.push(animation);
    }
    return sprites;
  }

  createMove(dir){
    this.move = true;
    this._countDirection();
    this.distance = 30;
    this.moveDir = moveDir[dir];
    this.out = true;
  }

  nextStep(time){
    let s = animalsConst[this.name];
    if(this.out){
      this.distance -= s*time;
      if(this.distance <= 0) {
        this.distance = -this.distance - 30;
        this.out = false;
        this.Row = this.destination.row;
        this.Col = this.destination.col;
      }
    } else {
      this.distance += s*time;
      if(this.distance >= 0){
        this.distance = 0;
        this.move = false;
        this.destination.row = -1;
        this.destination.col = -1;
      } 
    }
  }
  ////TODO: finish 
  _countDirection(){
    if(this.destination.row == -1 || this.destination.col == -1) return;
    if(this.destination.row == this.Row && this.destination.col > this.Col) this.dir = 'e';
    else if(this.destination.row == this.Row && this.destination.col < this.Col) this.dir = 'w';
    else if(this.Row % 2 == 0){ 
      if(this.destination.row == this.Row && this.destination.col > this.Col) this.dir = 'e';
      else if(this.destination.row == this.Row && this.destination.col > this.Col) this.dir = 'e';
      else if(this.destination.row == this.Row && this.destination.col > this.Col) this.dir = 'e';
      else  this.dir = 'e';
    } else {

    }
  }

}