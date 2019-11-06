
class Ship {
  x;
  y;
  sizeX; sizeY;
  shipBitmap;
  constructor(stage, tileSize, x, y){
    this.sizeX = x;
    this.sizeY = y;
    this.x = Math.floor(Math.random()*this.sizeX);
    this.y = Math.floor(Math.random()*this.sizeY);
      this.shipBitmap = new createjs.Bitmap("ship.png");
      this.shipBitmap.x = 50*this.x + 25;
      this.shipBitmap.y = 50*this.y + 25;
      console.log(this.x + ":" + this.y);;
      stage.addChild(this.shipBitmap);
  }
}
