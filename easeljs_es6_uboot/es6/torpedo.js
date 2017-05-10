
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
    //console.log("Torpedo launched! " + this.nr);
  }

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

}
