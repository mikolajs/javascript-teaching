var data = {
       framerate: 20,
       images: ["img/sheep_sprite.png"],
       frames: {width:24, height:24, count:8},
       animations: {
        go1: [0,0, "go1", 0.5],
        stay: [0, 7, "stay", 0.005]
       }
 };
var spriteSheet = new createjs.SpriteSheet(data);

function Sheep(nr) {
  this.posX = 0;
  this.posY = 0;
  this.eat = 2;
  this.food = this.eat*nr;
  this.count = nr;
  this.spriteLength = 0;
  this.sprites = [];


  this._setSpritesPositions = function(){
    var dy = [0,-20,-20,0,20,20,0];
    var dx = [0,-15,15,30,15,-15,-30];
    for(var i = 0; i < this.spriteLength; i++){
      this.sprites[i].currentFrame = i;
      this.sprites[i].x = this.posX + dx[i];
      this.sprites[i].y = this.posY + dy[i];
    }
  }

  this.displayStay = function(stage){
    var spritesNr = Math.ceil(this.count / 15 );
   //array length to slow update after push and pop!
    //console.log("sheeps imgs: " + spritesNr + " and length: " + this.sprites.length);
    if(spritesNr > this.spriteLength) {
      var n = spritesNr - this.spriteLength;
      for(var i = 0; i < n; i++){
        var spr = new createjs.Sprite(spriteSheet, "stay");
        this.sprites.push(spr);
        spr.gotoAndPlay("stay");
        stage.addChild(spr);
        this.spriteLength++;
      }
    } else {
      var n = this.spriteLength - spritesNr;
      for(var i = 0; i < n; i++){
        stage.removeChild(this.sprites.pop());
        this.spriteLength--;
      }
    }
    //console.log("after sheeps imgs: " + spritesNr + " and length: " + this.sprites.length);
    this._setSpritesPositions();
  };


  this.mkEat = function(amount){
    this.food += amount;
    if(this.food > this.eat*this.count)
      this.food = this.eat*this.count;
  };


  this.grow = function() {
    var maxEat = this.count*this.eat;
    var eatRate = this.food/maxEat;
    if(eatRate > 0.5 ) this.count = Math.round(this.count*(1+ eatRate*0.1));
    else this.count = Math.round(this.count*(1 -  0.5*(0.5 - eatRate)));
    this.food = 0;
    if(eatRate <= 0.5) return 0;
    else return Math.round(this.count*(2*eatRate - 1));
  };

  this.setPosition = function(x, y) {
    //console.log("sheep set position: " + x + ", " + y);
    this.posX = x - 12; this.posY = y - 12;};


  this.getDemand = function () {
    if(this.food >= this.maxFoodFactor*this.count) return 0;
    else if(this.maxFoodFactor*this.count - this.food < this.count )
      return (this.maxFoodFactor*this.count - this.food);
    else  return (this.count);
  };

  this.delSheep = function(){
    for(var i = 0; i < this.sprites.length; i++)
      stage.removeChild(this.sprites[i]);
  }
}
/*
siedem animacji z różną ilością owiec
*/
