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
  map: GridMap;
  mapUnitSize: number;
  constructor() {
    this.X = 1250;
    this.Y = 750;
    this.mapUnitSize = 50;
    this.stage = new createjs.Stage("gameCanvas");
    this.background = new createjs.Shape();
    this.imageBackground = new Image();
    this.imageBackground.src = "water.jpg";
    this.imageBackground.onload = this.handleImageLoad;

    createjs.Ticker.addEventListener("tick", this.tick);

      //console.log(this.map.x + "|" + this.map.y);
      // this.stage.addEventListener("")
      this.stage.on("stagemouseup", (evt: createjs.MouseEvent) => {
        console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
        this.map.setMine(evt.stageX,evt.stageY);
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
    this.map = new GridMap(this.stage, this.X, this.Y, this.mapUnitSize, this.ship);
    this.map.drawGrid(this.background);
    this.stage.update();
  }
  handleImageLoad  = (event: Event) => {
   // this.backImage = new createjs.Bitmap(event.target)
   console.log("Read Bitmap");
   this.mkBackground();

 }

 tick = (even:any) => {
   this.stage.update(event);
   // console.log(1);
 }

}
var main:Main;
function init() {
  main = new Main();
}
