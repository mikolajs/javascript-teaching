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
    var bg = new createjs.Bitmap("files/background.png");
    var m = new createjs.Matrix2D();
    m.translate(this.w, this.y);
    m.scale(this.w/bg.width, this.h/bg.height);
    this.back.graphics.beginStroke("black").beginBitmapFill(bg, "no-repeat", m);
    this.back.graphics.drawRect(0, 0,this.w, this.h);
    this.stage.addChild(this.back);

  var  uboat = new createjs.Bitmap("files/uboatL.png");
  uboat.x =  450;
  uboat.y =  550;
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
