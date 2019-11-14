
class Map {
  stage;
  x;
  y;
  tileSize;
  map;
  mapBackground;
  offset;

  constructor(stage, x, y, tileSize) {
    this.stage = stage;
    this.offset = 12;
    this.tileSize = tileSize;
    this.x = x;
    this.y = y;
    this.map = Array(this.x).fill().map(() => (Array(this.y).fill(false)));
    this.mineBitmap = new createjs.Bitmap("mine.png");
    // this.mineBackground =  new createjs.Shape();
    this.mapBackground = new createjs.Bitmap("empty.png");
    this.mapBackground.image.onload = this.handleLoadBackground;
    this.stage.addChild(this.mapBackground);
    this.stage.addChild(this.cirlceBackground);
  }

  setMine(x, y) {
    this.map[x][y] = true;
    var newMine = this.mineBitmap.clone();
    newMine.x = x*this.tileSize + 0.5*this.tileSize;
    newMine.y = y*this.tileSize + 0.5*this.tileSize;
    stage.addChild(newMine);
  }

  drawHexGrid(background){
    background.graphics.beginStroke("#ccf");
    background.graphics.setStrokeStyle(1);
    var pointX = 25; var pointY = 12;
    for(var i = 0; i < this.y; i++){
      if(i % 2 == 0) {
        pointX = 25; pointY = i*(this.tileSize -12) + this.offset;
      } else {
        pointX = this.tileSize;
        pointY = i*this.tileSize - 12*i + this.offset;
      }
    for(var j = 0; j < this.x; j++){
      background.graphics.moveTo(pointX,pointY);
      this.drawOneHex(background, pointX, pointY);
      if(i == 0) this.drawOneHex(background, pointX, pointY);
      pointX += this.tileSize;
      // console.log("draw at ("+pointX + ", " + pointY +")")
    }
  }
  }

  drawOneHex(background, startX, startY){
      var pointX = startX; var pointY = startY;
      pointX +=25; pointY += 12;
      background.graphics.lineTo(pointX,pointY);
      pointY += 25;
      background.graphics.lineTo(pointX,pointY);
      pointX -=25; pointY += 12;
      background.graphics.lineTo(pointX,pointY);
      pointX -=25; pointY -= 12;
      background.graphics.lineTo(pointX,pointY);
      pointY -= 25;
      background.graphics.lineTo(pointX,pointY);
      pointX +=25; pointY -= 12;
      background.graphics.lineTo(pointX,pointY);
  }

  getCenterOfPoolInPixels(x, y){
    if(y % 2 == 0) {
      return new createjs.Point(25+x*50, 25+y/2*76 + this.offset);
    } else {
      return new createjs.Point(50+x*50, 64+ 76*((y-1)/2) + this.offset);
    }
  }

  drawCircle(x, y){
    let point = this.getCenterOfPoolInPixels(x,y);
    console.log("draw circle: " + point.x + " " + point.y );
    let g = this.mapBackground.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("red");
    g.drawCircle(point.x,point.y,30);
  }

  handleImageLoad = (evt) => {
    console.log("load Image empty.png");
    this.mapBackground.graphics.beginBitmapFill(event.target, 'repeat').drawRect(0, 0, this.X, this.Y);
  }
}
