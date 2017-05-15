import {Boat } from './boat';
import {UBoat } from './uboat';
import {Plane } from './plane';

class Main {

  constructor(){
    this.stage = new createjs.Stage("demoCanvas");
    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    this.back = new createjs.Shape();
    this.time = 0;
    this.score = 0;
    this.started = true;
    this.uboat = new UBoat(this.w, this.h);
    this.boat = new Boat(this.w, this.h);
    this.plane = new Plane(this.w, this.h);
    this.text = new createjs.Text("Score: 0", "25px sans", "#ffffff");
    this.text.x = this.w - 140;
    this.text.y = this.h - 50;
    this.text.textBaseline = "alphabetic";
    this.init();
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("files/explodeboat.mp3", "eboat");
    createjs.Sound.registerSound("files/explodeuboat.mp3", "euboat");
    createjs.Sound.registerSound("files/boat.mp3", "boat");
    createjs.Sound.registerSound("files/torpedo.mp3", "torpedo");
    createjs.Sound.registerSound("files/barrel.mp3", "barrel");
    createjs.Sound.registerSound("files/uboat.mp3", "uboat");
    createjs.Sound.registerSound("files/plane.mp3", "plane");
    createjs.Sound.registerSound("files/bomb.mp3", "bomb");

    this.playInst = createjs.Sound.play("underwater");
    this.playInst.volume = 1;
    this.gameOver = false;
  }

  init() {
    //console.log("started init!");
    var bg = new createjs.Bitmap("files/background.png");
    this.back.graphics.beginStroke("black").beginFill("blue").beginBitmapStroke(bg);
    this.back.graphics.drawRect(0, 0,this.w, this.h);
    // this.stage.addChild(this.back);
    this.stage.addChild(bg);
    this.stage.addChild(this.uboat.image);
    this.stage.addChild(this.uboat.sprite);
    this.stage.addChild(this.boat.image);
    this.stage.addChild(this.boat.sprite);
    this.stage.addChild(this.uboat.torps[0].image);
    this.stage.addChild(this.uboat.torps[1].image);
    this.stage.addChild(this.uboat.torps[2].image);
    for(let i = 0; i < this.boat.bars.length; i++)
        this.stage.addChild(this.boat.bars[i].image);
    this.stage.addChild(this.plane.image);
    this.stage.addChild(this.plane.mine.image);
    this.stage.addChild(this.text);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick",
    this.handleTick.bind(this));
    this.stage.update();
  }

  checkColision(x1, y1, x2, y2, x3, y3, x4, y4){
    //console.log(x1 +", "+  x2 +", "+ y1 +", "+ y2 +", "+ x3 +", "+ x4 +", "+ y3 +", "+ y4);
      return (((x1 <= x3)&&(x2 > x3)) || (x1 >= x3) && (x1 <= x4)) &&
      (((y1 <= y3)&&(y2 > y3)) || (y1 >= y3) && (y1 <= y4));
  }

  handleTick(event) {

    if(this.gameOver){
      this.stage.update();
      //console.log("is Over");
    } else if (!event.paused ) {
      //console.log("TIK not paused");
      //wykrywanie trafienia torpedą
      if(this.boat.isGo){
        let x3 = this.boat.getX();
        let y3 = this.boat.getY();
        let x4 = x3 + this.boat.getWidth();
        let y4 = y3 + this.boat.getHeight();
        for(let i = 0; i < this.uboat.torps.length; i++){
          if(this.uboat.torps[i].isGo){
            let x1 = this.uboat.torps[i].getX();
            let y1 = this.uboat.torps[i].getY();
            let x2 = x1 + this.uboat.torps[i].getWidth();
            let y2 = y1 + this.uboat.torps[i].getHeight();

            if(this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)){
              this.boat.destroyed();
              this.score += 10;
            }
          }
        }
      }

    //trafienie ubota
    let x3 = this.uboat.getX();
    let y3 = this.uboat.getY();
    let x4 = x3 + this.uboat.getWidth();
    let y4 = y3 + this.uboat.getHeight();
    for(let i = 0; i < this.boat.bars.length; i++){
      if(this.boat.bars[i].isGo){
        let x1 = this.boat.bars[i].getX();
        let y1 = this.boat.bars[i].getY();
        let x2 = x1 + this.boat.bars[i].getWidth();
        let y2 = y1 + this.boat.bars[i].getHeight();

        if(this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)){
          this.mkGameOver();
          //console.log("bomb destroyed uboot");
        }
      }
    }
    if(this.plane.mine.isGo){
      let x1 = this.plane.mine.getX();
      let y1 = this.plane.mine.getY();
      let x2 = x1 + this.plane.mine.getWidth();
      let y2 = y1 + this.plane.mine.getHeight();
      if(this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)){
        this.mkGameOver();
        //console.log("mine hit ubot")
      }
    }

      this.text.text = "Score: " + (this.score - this.uboat.getNumberOfFires());
      this.boat.refresh(1);
      this.uboat.refresh(1);
      this.plane.refresh(1);
      this.stage.update();

    }
  }

  mkGameOver(){
    this.uboat.destroyed();
    let over = new createjs.Text("Game Over!", "60px sans bold", "#ffffff" );
    let s = over.getBounds();
    //console.log(s.width + " - " + s.height);
    over.x = Math.floor((this.w - s.width) / 2);
    over.y = Math.floor((this.h - s.height) / 2);
    this.stage.addChild(over);

    this.plane.mine.image.visible = false;
    for(let i = 0; i < this.boat.bars.length; i++){
      this.boat.bars[i].image.visible = false;
    }

    this.gameOver = true;
  }
}

var main = new Main();
