
export class Torpedo {

  constructor(nr){
    this.nr = nr;
    this.x = 0;
    this.y = 0;
    this.image = new createjs.Bitmap("files/torpedo.png");
    this.image.visible = false;
    this.dy = 1.8;
    this.isGo = false;
  }

  launch(X, Y){
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    this.playSound();
    //console.log("Torpedo launched! " + this.nr);
  }

  getX() { return this.x; }
  getY() { return this.y; }
  getWidth() {return this.image.image.width;}
  getHeight() {return this.image.image.height;}

  refresh(time){
    if(this.isGo){
      this.y -= this.dy;
      this.image.y = Math.floor(this.y);
      if(this.y < 40 ) {
        this.image.visible = false;
        this.isGo = false;
      }
    }
  }
  playSound() {
 		 var instance = createjs.Sound.play("torpedo");
 		 //instance.on("complete", this.handleComplete, this);
 		 instance.volume = 0.3;
  }

}
