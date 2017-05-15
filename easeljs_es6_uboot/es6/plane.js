import {Mine} from './mine';


export class Plane {
	constructor(canvSizeX, canvSizeY) {
	  this.dx = 8;
	  this.cx = canvSizeX;
	  this.cy = canvSizeY;
	  //size of uboat in pixels
		this.constStart = 1000;
	  this.sizeX = 100;
	  this.sizeY = 60;
	  this.x = 0;
	  this.y = 0;
	  this.imgs = [];
	  this.imgs[0] = new createjs.Bitmap("files/planeL.png");
	  this.imgs[1] = new createjs.Bitmap("files/planeR.png");
	  this.image = new createjs.Bitmap("");
	  this.left = true;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.isGo = false;
    this.start = 500;
	  this.mine = new Mine(this.cy);
		this.place = 0;
		//this.mkStart();
  }

  refresh(time) {
      if(this.isGo) {
         if(this.left) {
            this.moveLeft();
						//console.log("this.x = " + this.x);
					 if(this.place < this.x) {
						 //console.log("about dorp left pos: " + this.x);
						 this.mine.drop(this.x + (this.sizeX / 2), this.y);
					 }
         } else {
            this.moveRight();
						//console.log("this.x = " + this.x);
						if(this.place > this.x) {
							//console.log("about dorp right pos: " + this.x);
							this.mine.drop(this.x + (this.sizeX / 2), this.y);
						}
         }
				 if(this.x < - Math.floor(this.sizeX)
				 || this.x > this.cx + Math.floor(this.sizeX / 2)) {
					 this.start = this.constStart;
					 this.isGo = false;
				 }
      } else {
					if(this.start <= 0 ) {
						this.mkStart();
						if(this.constStart > 60) this.constStart -=  50;
			  	} else { this.start -= time;}
		  }
			this.mine.refresh(time);
  }

  moveLeft(){
	 this.x -= this.dx;
    this.image.x = Math.floor(this.x);
  }
  moveRight() {
	  this.x += this.dx;
     this.image.x = Math.floor(this.x);
  }

  mkStart(){
		this.image.visible = true;
		this.playSound();
    if( Math.random() > 0.5) {
      this.left = true;
      this.image.image = this.imgs[0].image;
			//console.log("start left");
      this.x = this.cx;
   }
    else {
      this.left = false;
      this.image.image = this.imgs[1].image;
			//console.log("start right");
      this.x = - this.sizeX;
   }
   this.isGo = true;
	 this._randomPlace();
	 //console.log(this.placesArray + " is for left " + this.left);
 }

 playSound() {
		 var instance = createjs.Sound.play("plane");
		 //instance.on("complete", this.handleComplete, this);
		 instance.volume = 0.4;
 }

  getX() { return this.x; }
  getY() { return this.y; }
  getWidth() {return this.image.image.width;}
  getHeight() {return this.image.image.height;}


	printXY(){
	  console.log("XY: (" + this.x + " ; " + this.y + ")");
  }
/// under work!
	_randomPlace() {
				this.place = Math.floor(Math.random() * 18 + 1) * this.cx / 20 ;
  }
}
