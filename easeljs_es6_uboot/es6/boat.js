import {Barrel} from './barrel'


export class Boat {
	constructor(canvSizeX, canvSizeY) {
	  this.dx = 0.4;
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
		this.imgBlow = new createjs.Bitmap("files/boatblow.png");
	  this.left = true;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.isGo = false;
    this.start = 0;
		this.blowAnimate = 0;
		this.isBlow = false;
	 // this.printXY();
	  this.bars = [];
		this.placesArray = [];
	  for(let i = 0; i <= 8; i++){
		  this.bars[i] = new Barrel(i, this.cy);
	  }
		this.barrelsPos = 0;
		console.log("barrels: " + this.bars.length);
		this.mkStart();
  }

  refresh(time) {
      if(this.isGo) {
         if(this.left) {
            this.moveLeft();
						//console.log("this.x = " + this.x);
					 if(this.barrelsPos < this.bars.length && (this.x + (this.sizeX / 2.0)) < this.placesArray[this.barrelsPos] ) {
						 //console.log("about dorp left pos: " + this.x);
						 this.bars[this.barrelsPos].drop(this.x + (this.sizeX / 2), this.y);
						 this.barrelsPos++;
					 }
         } else {
            this.moveRight();
						//console.log("this.x = " + this.x);
						if(this.barrelsPos < this.bars.length && (this.x + (this.sizeX / 2.0)) > this.placesArray[this.barrelsPos]) {
							//console.log("about dorp right pos: " + this.x);
							this.bars[this.barrelsPos].drop(this.x + (this.sizeX / 2), this.y);
							this.barrelsPos++;
						}
         }
				 if(this.x < - Math.floor(this.sizeX)
				 || this.x > this.cx + Math.floor(this.sizeX / 2)) {
					 this.start = 200;
					 this.isGo = false;
				 }
      } else {
				if(this.isBlow) {
					//console.log("blow time " + this.blowAnimate);
					if(this.blowAnimate > 0) {
				  	this.blowAnimate -= time;
					} else {
						this.isBlow = false;
						this.image.visible = false;
					}
				} else {
					if(this.start <= 0 ) this.mkStart();
			  	else { this.start -= time;}
				}

		  }
			for(let i = 0; i < this.bars.length; i++)
			 		this.bars[i].refresh(time);
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
		this.dx = 2*Math.random() + 1;
		this.image.visible = true;
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
	 this.barrelsPos = 0;
	 this._randomPlaces();
	 if(this.left){
		 this.placesArray = this.placesArray.sort(function(k,m){return m - k;})
	 } else {
		 this.placesArray = this.placesArray.sort(function(k,m){return k - m;})
	 }
	 //console.log(this.placesArray + " is for left " + this.left);
 }

 destroyed(){
	 this.blowAnimate = 300;
	 this.isBlow = true;
	 this.isGo = false;
	 this.image.image = this.imgBlow.image;
 }

  getX() { return this.x; }
  getY() { return this.y; }
  getWidth() {return this.image.image.width;}
  getHeight() {return this.image.image.height;}


	printXY(){
	  console.log("XY: (" + this.x + " ; " + this.y + ")");
  }
/// under work!
	_randomPlaces() {
		for(let i = 0; i < this.bars.length; i++){
			this.placesArray[i] = 0;
		}
		let isUnique = false;
		for(let i = 0; i < this.bars.length; i++){
			while(this.placesArray[i] == 0) {
				isUnique = true;
				let tmp = Math.floor(Math.random() * 18 + 1) * this.cx / 20 ;
				for(let j = 0; j < i; j++){
					if(tmp == this.placesArray[j]) {
						isUnique = false;
						break;
					}
				}
				if(isUnique) this.placesArray[i] = tmp;
			}
		}
  }
}
