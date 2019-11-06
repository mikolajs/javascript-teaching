/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

import Map from  "./map"

class Main {
  stage: createjs.Stage
  background: createjs.Shape
  shipBitmap: createjs.Bitmap
  X: number
  Y: number
  shipX : number
  shipY : number
 imageBackground : HTMLImageElement
 map : Map
  constructor() {
    this.X = 1200
    this.Y = 800
    this.stage = new createjs.Stage("gameCanvas")
    this.background = new createjs.Shape();
    this.imageBackground = new Image();
    this.imageBackground.src = "water.jpg"
    this.imageBackground.onload = this.handleImageLoad
    this.handleImageLoad.bind(this)
    this.shipBitmap = new createjs.Bitmap("ship.png")


    createjs.Ticker.addEventListener("tick", this.tick);
    this.map = new Map(50)
    this.shipX = Math.floor(Math.random()*this.map.x)
    this.shipY = Math.floor(Math.random()*this.map.y)
    this.shipBitmap.x = 50*this.shipX + 25
    this.shipBitmap.y = 50*this.shipY + 25
    this.stage.addChild(this.shipBitmap)
      this.stage.update()
  }

  mkBackground() {
    // this.background.graphics.beginFill("blue")
    this.background.graphics.beginBitmapFill(this.imageBackground, 'repeat').drawRect(0, 0, this.X, this.Y);
    this.background.x = 0;
    this.background.y = 0;
    //this.stage.addChild(this.backImage);
    // this.background.graphics.drawRect(0,0,1000,1000);
    this.stage.addChild(this.background);
    this.stage.update();
  }
  handleImageLoad = (event: Event) => {
   // this.backImage = new createjs.Bitmap(event.target)
   console.log("Read Bitmap")
   this.mkBackground()

 }

 tick = (even: Event) => {
   this.stage.update(event)
 }

}

function init() {
  var main = new Main();
}
