
class Ship {
  x;
  y;
  map;
  sizeX; sizeY;
  shipBitmap;

  constructor(stage, map){
      this.map = map;
      this.shipBitmap = new createjs.Bitmap("ship.png");
      this.shipBitmap.image.onload = this.handleImage;
      stage.addChild(this.shipBitmap);
  }

  setPosition(x, y){
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

  handleImage = (evt) => {
    console.log("Handle Ship Image");
    this.shipBitmap.scale = 0.7;
    this.sizeX = this.shipBitmap.image.width*this.shipBitmap.scale;
    this.sizeY = this.shipBitmap.image.height*this.shipBitmap.scale;
    this.setPosition(Math.floor(Math.random()*this.map.x), Math.floor(Math.random()*this.map.y));
  }
}
