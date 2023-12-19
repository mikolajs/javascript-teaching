
class Snow {
  constructor(nr, W, H){
    this.nr = nr;
    this.W = W;
    this.H = H;
    this.img = PIXI.Sprite.from('img/snowflakesmall.png');
    this.container = new PIXI.Container();
    this.flakes = [];
    this._createFlakes();
  }

  move(delta){
    for(let i = 0; i < this.flakes.length; i++){
      let flake = this.flakes[i];
      flake.y += 1;
      if(flake.y > this.H) flake.y = 50;
      if(i % 2 == 0) flake.rotation += 0.01;
      else flake.rotation -= 0.01;
      //flake.x += (Math.random() - 0.5);
    }
  }

  getContainer(){
    return this.container;
  }

  _createFlakes(){
    for(let i = 0; i < this.nr; i++){
      let sprite = PIXI.Sprite.from(this.img.texture);
      sprite.anchor.set(0.5);
      sprite.x = Math.floor(Math.random()*this.W);
      sprite.y = Math.floor(Math.random()*(this.H-70)+70);
      sprite.rotation = Math.floor(Math.random()*2);
      this.flakes.push(sprite);
      this.container.addChild(sprite);
    }
  }
}