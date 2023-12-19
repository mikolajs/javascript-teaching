class Star{
  constructor(x, y, a){
    this.x = x;
    this.y = y;
    this.a = a;
  }
}

class Stars {
  constructor(nr, W, H){
    this.nr = nr;
    this.W = W;
    this.H = H;
    this.stars = [];
    this.img = PIXI.Sprite.from('img/star.png');
    this.container = new PIXI.Container();
    this._createStars();
  }

  _createStars(){
    for(let i = 0; i < this.nr; i++){
      let sprite = PIXI.Sprite.from(this.img.texture);
      sprite.anchor.set(0.5);
      sprite.x = Math.floor(Math.random()*this.W);
      sprite.y = Math.floor(Math.random()*(this.H/2-70)+50);
      sprite.rotation = Math.floor(Math.random()*3);
      this.stars.push(sprite);
      this.container.addChild(sprite);
    }
    let c = PIXI.Sprite.from('img/clouds.png');
    c.x = 0;
    c.y = 0;
    this.container.addChild(c);
  }

  getContainer(){
    return this.container;
  }
  makeRotation(delta){
    for(let i = 0; i < this.stars.length; i++){
      this.stars[i].rotation += delta*0.2;
    }
  }
}