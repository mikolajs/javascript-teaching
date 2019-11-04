/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class Main {
stage : createjs.Stage
background : createjs.Shape
X : number
Y : number
constructor(){
  this.X = 1280
  this.Y = 800
  this.stage = new createjs.Stage("gameCanvas")
  this.background = new createjs.Shape();
  this.mkBackground();
  this.stage.update();
}

mkBackground(){
  this.background.graphics.beginFill("DeepSkyBlue").drawRect(0,0,this.X,this.Y);
  this.background.x = 0;
  this.background.y = 0;
  this.stage.addChild(this.background);
}
}
function init() {
 var main = new Main();
 }
