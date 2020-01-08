/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
/// <reference path="./map.ts" />
/// <reference path="./ship.ts" />


class Main {
  stage: createjs.Stage;
  background: createjs.Shape;
  ship: Ship;
  X: number;
  Y: number;
  imageBackground: HTMLImageElement;
  map: Map;
  tileSize: number;
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

    this.map = new Map(this.stage, this.X, this.Y, this.tileSize);
      console.log(this.map.x + "|" + this.map.y);
      // this.stage.addEventListener("")
      this.stage.on("stagemouseup", (evt: Event) => {
        console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
        this.map.drawCircle(5,5);
      });

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
    this.map.drawHexGrid(this.background);
    this.stage.update();
  }
  handleImageLoad  = (event: Event) => {
   // this.backImage = new createjs.Bitmap(event.target)
   console.log("Read Bitmap");
   this.mkBackground();

 }

 tick = (even) => {
   this.stage.update(event);
   // console.log(1);
 }

}
var main;
function init() {
  main = new Main();
}
