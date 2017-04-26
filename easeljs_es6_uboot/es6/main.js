class Main {

constructor(){
  this.stage = new createjs.Stage("demoCanvas");
  this.w = this.stage.canvas.width;
  this.h = this.stage.canvas.height;
  this.back = new createjs.Shape();
  this.time = 0;
  this.started = true;
  this.init();
}


init() {
console.log("started init!");
    this.back.graphics.beginFill("#3344cc");
    this.back.graphics.drawRect(0, 0,this.w, this.h);
    this.stage.addChild(this.back);

  var  uboat = new createjs.Bitmap("files/boat.png");
  uboat.x =  350;
  uboat.y =  350;
  this.stage.addChild(uboat);


  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick",
    this.handleTick.bind(this));
  this.stage.update();
}

handleTick(event) {
  if (!event.paused ) {
      this.stage.update();
    }
}


}

var main = new Main();
