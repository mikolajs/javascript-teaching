/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
/// <reference path="./map.ts" />

class Ship {
  x: number;
  y: number;
  map: HexMap;
  sizeX: number; sizeY: number;
  shipBitmap: createjs.Bitmap;

  constructor(stage: createjs.Stage, map: HexMap){
      this.map = map;
      this.shipBitmap = new createjs.Bitmap("ship.png");
      this.shipBitmap.image.onload = this.handleImage;
      stage.addChild(this.shipBitmap);
  }

  setPosition(x: number, y: number){
    this.x = x;
    this.y = y;
    let point = this.map.getCenterOfPoolInPixels(x, y);
    this.shipBitmap.x = point.x - this.sizeX/2;
    this.shipBitmap.y = point.y - this.sizeY/2;
    // console.log(this.sizeX + ", " + this.sizeY + " size of ship");
    // console.log(this.shipBitmap.scale + " scale");
    // console.log("pool: " + this.x + ", " + this.y);
    // console.log(this.shipBitmap.x + "::" + this.shipBitmap.y + " px");
  }

  handleImage = (evt: Event) => {
    console.log("Handle Ship Image");
    this.shipBitmap.scaleX = 0.7;
    this.shipBitmap.scaleY = 0.7;
    this.sizeX = this.shipBitmap.image.width*this.shipBitmap.scaleX;
    this.sizeY = this.shipBitmap.image.height*this.shipBitmap.scaleY;
    this.setPosition(Math.floor(Math.random()*this.map.x), Math.floor(Math.random()*this.map.y));
  }
}
