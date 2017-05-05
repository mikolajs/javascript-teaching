import {Boat } from './boat';
import {UBoat } from './uboat';

class Main {

  constructor(){
    this.stage = new createjs.Stage("demoCanvas");
    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    this.back = new createjs.Shape();
    this.time = 0;
    this.started = true;
    this.uboat = new UBoat(this.w, this.h);
    this.boat = new Boat(this.w, this.h);
    this.init();
  }


  init() {
    console.log("started init!");
    var bg = new createjs.Bitmap("files/background.png");
    this.back.graphics.beginStroke("black").beginFill("blue").beginBitmapStroke(bg);
    this.back.graphics.drawRect(0, 0,this.w, this.h);
    // this.stage.addChild(this.back);
    this.stage.addChild(bg);
    this.stage.addChild(this.uboat.image);
    this.stage.addChild(this.boat.image);
    this.stage.addChild(this.uboat.torps[0].image);
    this.stage.addChild(this.uboat.torps[1].image);
    this.stage.addChild(this.uboat.torps[2].image);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick",
    this.handleTick.bind(this));
    this.stage.update();
  }

  handleTick(event) {
    if (!event.paused ) {
      this.boat.refresh(1);
      this.uboat.refresh(1);
      this.stage.update();
    }
  }


}

var main = new Main();
