

class Main {
  stage;
  background;
  ship;
  X;
  Y;
  imageBackground;
  map;
  tileSize;
  constructor() {
    this.X = 1200;
    this.Y = 800;
    this.tileSize = 50;
    this.stage = new createjs.Stage("gameCanvas");
    this.background = new createjs.Shape();
    this.imageBackground = new Image();
    this.imageBackground.src = "water.jpg";
    this.imageBackground.onload = this.handleImageLoad;

    createjs.Ticker.addEventListener("tick", this.tick);

    this.map = new Map(this.X/this.tileSize, Math.round(0.85*this.X/this.tileSize), this.tileSize);
      console.log(this.map.x + "|" + this.map.y);

      this.stage.update();
  }

  mkBackground() {
    // this.background.graphics.beginFill("blue")
    this.background.graphics.beginBitmapFill(this.imageBackground, 'repeat').drawRect(0, 0, this.X, this.Y);
    this.background.x = 0;
    this.background.y = 0;
    //this.stage.addChild(this.backImage);
    // this.background.graphics.drawRect(0,0,1000,1000);
    this.stage.addChild(this.background);
    this.ship = new Ship(this.stage, this.map);
    this.ship.setPosition(10, 13);
    this.map.drawHexGrid(this.background);
    this.stage.update();
  }
  handleImageLoad  = (event) => {
   // this.backImage = new createjs.Bitmap(event.target)
   console.log("Read Bitmap");
   this.mkBackground();

 }

 tick = (even) => {
   this.stage.update(event);
   // console.log(1);
 }

}

function init() {
  var main = new Main();
}
