/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class Main {
  stage: createjs.Stage
  background: createjs.Shape
  X: number
  Y: number
  backImage : createjs.Bitmap
  image : Image
  constructor() {
    this.X = 1280
    this.Y = 800
    this.stage = new createjs.Stage("gameCanvas")
    this.background = new createjs.Shape();
    this.image = new Image();
    this.image.src = "water.jpg"
    this.image.onload = this.handleImageLoad
    this.handleImageLoad.bind(this)
    // this.mkBackground();
    this.stage.update();
    //this.tick.bind(this)
     //createjs.Ticker.addEventListener("tick", this.tick);
  }

  mkBackground() {
    this.background.graphics.beginFill("blue")
    this.background.graphics.beginBitmapFill(this.backImage.image, 'repeat-x').drawRect(0, 0, this.X, this.Y);
    this.background.x = 0;
    this.background.y = 0;
    //this.stage.addChild(this.backImage);
    // this.background.graphics.drawRect(0,0,1000,1000);
    this.stage.addChild(this.background);
    this.stage.update();
  }
  handleImageLoad = (event: Event) => {
   this.backImage = new createjs.Bitmap(event.target)
   console.log("Read Bitmap")
   this.mkBackground();

 }

 tick(even: Event){
   this.stage.update(event);
 }

}

function init() {
  var main = new Main();
}
