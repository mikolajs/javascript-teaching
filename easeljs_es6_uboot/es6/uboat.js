
import {Torpedo } from './torpedo';

export class UBoat {
  constructor(canvSizeX, canvSizeY) {
	  this.dx = 5;
	  this.cx = canvSizeX;
	  this.cy = canvSizeY;
	  //size of uboat in pixels
	  this.sizeX = 128;
	  this.sizeY = 80;
	  this.x = Math.floor(this.cx / 2) - Math.floor(this.sizeX / 2);
	  this.y = this.cy - Math.floor(1.5 * this.sizeY);
	  document.onkeydown = this.keyAction.bind(this) ;
	  this.imgs = [];
	  this.imgs[0] = new createjs.Bitmap("files/uboatL.png");
	  this.imgs[1] = new createjs.Bitmap("files/uboatR.png");
	  this.image = new createjs.Bitmap("files/uboatL.png");
	  this.left = true;
    this.image.x = this.x;
    this.image.y = this.y;
    this.torps = [];
    this.torps[0] = new Torpedo(1);
    this.torps[1] = new Torpedo(2);
    this.torps[2] = new Torpedo(3);
	 // this.printXY();
	 // this.printCanvasSize();
  }
  moveLeft(){
	  if(this.x >=  this.dx) {
		  this.x -= this.dx;
		  this.image.x = this.x;
	  }
  }
  moveRight() {
	  if(this.x <= this.cx - this.sizeX - this.dx) {
		  this.x += this.dx;
		  this.image.x = this.x;
	  }
  }
  getX() {
	  return this.x;
  }
  getY() {
	  return this.y;
  }

  fire() {
	  console.log("Torpedo fire");
    for(let i = 0; i < this.torps.length; i++){
      if(!this.torps[i].isGo){
        this.torps[i].launch(this.x + Math.floor(this.sizeX / 2), this.y);
        return;
      }
    }
  }

  refresh(time){
    for(let i = 0; i < this.torps.length; i++)
      this.torps[i].refresh(time);
  }

  keyAction(event){
    switch(event.keyCode) {
	case 37:
		if(!this.left) {
			this.image.image = this.imgs[0].image;
			this.left = true;
		}
		this.moveLeft();
		//console.log("LEFT");
	        break;
	case 38:
		this.fire();
		break;
  case 39:
		if(this.left) {
			this.image.image = this.imgs[1].image;
			this.left = false;
		}
		this.moveRight();
		//console.log("RIGHT");
		break;
    }
  }
  printXY(){
	  console.log("XY: (" + this.x + " ; " + this.y + ")");
  }
  printCanvasSize() {
	  console.log("Canvas Size: (" + this.cx + " ; " + this.cy + ")");
  }
}
