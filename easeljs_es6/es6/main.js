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
    this.back.graphics.beginFill("#55cc44");
    this.back.graphics.drawRect(0, 0,this.w, this.h);
    this.stage.addChild(this.back);

  var  village = new createjs.Bitmap("files/village.png");
  village.x =  350;
  village.y =  350;
  this.stage.addChild(village);


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
