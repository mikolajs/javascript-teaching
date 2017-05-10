import {Barrel} from './barrel'

export class Boat {
	constructor(canvSizeX, canvSizeY) {
	  this.dx = 0.9;
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
	  this.image = this.imgs[0];
	  this.left = true;
    this.image.x = this.x;
    this.image.y = this.y;
    this.isGo = false;
    this.start = 0;
	 // this.printXY();
	  this.bars = [];
	  for(let i = 1; i <= 5; i++){
		  this.bars[i] = new Barrel(i);
	  }
	 this.testPlaces();
  }

  refresh(time) {
      if(this.isGo) {
				this.barrels = 5;
				//drop barrels !!!!!!!!!!!!!
				//this.printXY();
         if(this.left) {
            this.moveLeft();
         } else {
            this.moveRight();
         }
				 if(this.x < - Math.floor(this.sizeX)
				 || this.x > this.cx + Math.floor(this.sizeX / 2)) {
					 this.start = 120;
					 this.isGo = false;
				 }
      } else if(this.start <= 0 ) this.mkStart();
			else { this.start -= time;}
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
		this.dx = 2*Math.random() + 0.5;
    if( Math.random() > 0.5) {
      this.left = true;
      this.image.image = this.imgs[0].image;
      this.x = this.cx;
   }
    else {
      this.left = false;
      this.image.image = this.imgs[1].image;
      this.x = - this.sizeX;
   }
   this.isGo = true;
 }
   printXY(){
	  console.log("XY: (" + this.x + " ; " + this.y + ")");
  }
/// under work!
	_randomPlaces() {
		var a = [0,0,0,0,0];
		let isUnique = false;
		for(let i = 0; i < 5; i++){
			while(a[i] == 0) {
				isUnique = true;
				let tmp = Math.floor(Math.random() * 9 + 1) * this.cx / 10 ;
				for(let j = 0; j < i; j++){
					if(tmp == a[j]) {
						isUnique = false;
						break;
					}
				}
				if(isUnique) a[i] = tmp;
			}
		}
			return a.sort(function(k,m){return k - m;});
  }
  testPlaces(){
		console.log(this._randomPlaces());
	}
}
