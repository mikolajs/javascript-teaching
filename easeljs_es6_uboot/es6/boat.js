
export class Boat {
	constructor(canvSizeX, canvSizeY) {
	  this.dx = 0.1;
	  this.cx = canvSizeX;
	  this.cy = canvSizeY;
	  //size of uboat in pixels
	  this.sizeX = 128;
	  this.sizeY = 45;
	  this.x = 200;
	  this.y = Math.floor(0.73 * this.sizeY);
	  this.imgs = [];
	  this.imgs[0] = new createjs.Bitmap("files/boatL.png");
	  this.imgs[1] = new createjs.Bitmap("files/boatR.png");
	  this.image = new createjs.Bitmap("files/boatL.png");
	  this.left = true;
     this.image.x = this.x;
     this.image.y = this.y;	 
     this.isGo = false;
     this.start = 0; 
	 // this.printXY();
	 // this.printCanvasSize();
  }
  
  refresh(time) {
      if(this.isGo) {
         if(this.left) {
            this.moveLeft();
         } else {
            this.moveRight();
         }
      } else if(this.start <= 0 ) this.mkStart();

  }
  
  moveLeft(){
	 this.x -= this.dx;
    this.image.x = this.x;
  }
  moveRight() {
	  this.x += this.dx;
     this.image.x = this.x;
  }

  mkStart(){
    if( Math.random() > 0.5) {
      this.left = true;
      this.image.image = this.imgs[0];
      this.x = this.cx;
   }
    else {
      this.left = false;
      this.image.image = this.imgs[1];
      this.x = - this.sizeX;
   }
   this.isGo = true;
  }
}





