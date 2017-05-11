

export class Barrel {
  constructor(nr, cy){
    this.nr = nr;
    this.x = 0;
    this.y = 0;
    this.cy = cy;
    this.image = new createjs.Bitmap("files/barrel.png");
    this.image.visible = false;
    this.dy = 3.2;
    this.isGo = false;
    console.log(this.image.image.width + " x " + this.image.image.height);
  }

  drop(X, Y){
    //console.log("s Barrel was droped! " + this.nr);
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    //console.log("e Barrel was droped! " + this.nr);
  }


  getX() { return this.x; }
  getY() { return this.y; }
  getWidth() {return this.image.image.width;}
  getHeight() {return this.image.image.height;}


  refresh(time){
    if(this.isGo){
      this.y += this.dy;
      this.image.y = Math.floor(this.y);
      if(this.y > (this.cy - 60) ) {
        this.image.visible = false;
        this.isGo = false;
      }
    }

  }
}
