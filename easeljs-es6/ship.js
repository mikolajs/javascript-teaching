
class Ship {
  x;
  y;
  map;
  sizeX; sizeY;
  shipBitmap;

  constructor(stage, map){
      this.map = map;
      this.shipBitmap = new createjs.Bitmap("ship.png");
      this.shipBitmap.scale = 0.7;
      this.x = 0; this.y = 0;
      this.sizeX = this.shipBitmap.image.width*this.shipBitmap.scale;
      this.sizeY = this.shipBitmap.image.height*this.shipBitmap.scale;
      stage.addChild(this.shipBitmap);
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
    let point = this.map.getCenterOfPoolInPixels(x, y);
    this.shipBitmap.x = point.x - this.sizeX/2;
    this.shipBitmap.y = point.y - this.sizeY/2;
    console.log(this.x + ":" + this.y);
    console.log(this.shipBitmap.x + "::" + this.shipBitmap.y + " px");
  }
}
