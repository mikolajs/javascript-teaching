/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class GridMap {
  X: number;
  Y: number;
  rows: number; cols: number;
  unitSize: number;
  map: Array<Array<boolean>>;
  mapBackground: createjs.Shape;
  offset: number;
  imgEmpty: HTMLImageElement;
  mineBitmap: createjs.Bitmap

  constructor(stage: createjs.Stage, X: number, Y: number, unitSize: number) {
    this.X = X;
    this.Y = Y;
    this.offset = 12;
    this.unitSize = unitSize;
    this.rows = Math.floor(this.X/(this.unitSize));
    this.cols = Math.floor(Math.round(this.Y/(this.unitSize)));
    this.map = Array<Array<boolean>>(this.rows).fill(Array(this.cols).fill(false));
    this.mineBitmap = new createjs.Bitmap("mine.png");
    // this.mineBackground =  new createjs.Shape();
    this.mapBackground = new createjs.Shape();
    this.mapBackground.graphics.beginFill("#ccc").drawRect(0,0,X,Y);
    this.mapBackground.x = 0;
    this.mapBackground.y = 0;
    stage.addChild(this.mapBackground);
  }
/// @param x, y - pixels clicked on canvas
  setMine(x: number, y: number) {
    let pointPool = this.getPoolClicked(x, y);
    this.map[pointPool.x][pointPool.y] = true;
    let point = this.getCenterOfPoolInPixels(x,y);
    var newMine = this.mineBitmap.clone();
    newMine.x = point.x - 0.5*this.mineBitmap.x;
    newMine.y = point.y + 0.5*this.mineBitmap.y;
    this.mapBackground.stage.addChild(newMine);
  }

  getPoolClicked(x: number, y: number):createjs.Point {
      return new createjs.Point(Math.floor(x/this.unitSize), Math.floor(y/this.unitSize));
  }

  drawGrid(background: createjs.Shape){
    background.graphics.beginStroke("#ccf");
    background.graphics.setStrokeStyle(1);
    let pointX = 0; let pointY = 0;
    for(let i = 0; i < this.rows; i++){
    for(let j = 0; j < this.cols; j++){
      background.graphics.moveTo(pointX,pointY);
      this.drawOneGrid(background, pointX, pointY);
      pointX += this.unitSize;
      // console.log("draw at ("+pointX + ", " + pointY +")")
    }
    pointY += this.unitSize;
  }
  }

  drawOneGrid(background: createjs.Shape, startX: number, startY: number){
    const xx = 25;
    const yy = 5;
      let pointX = startX; let pointY = startY;
      pointX +=xx; pointY += yy;
      background.graphics.lineTo(pointX,pointY);
      pointY += xx;
      background.graphics.lineTo(pointX,pointY);
      pointX -= xx; pointY += yy;
      background.graphics.lineTo(pointX,pointY);
      pointX -=xx; pointY -= yy;
      background.graphics.lineTo(pointX,pointY);
      pointY -= xx;
      background.graphics.lineTo(pointX,pointY);
      pointX += xx; pointY -= yy;
      background.graphics.lineTo(pointX,pointY);
  }


  getCenterOfPoolInPixels(x: number, y: number){
    if(y % 2 == 0) {
      return new createjs.Point(25+x*50, 25+y/2*76 + this.offset);
    } else {
      return new createjs.Point(50+x*50, 64+ 76*((y-1)/2) + this.offset);
    }
  }

  drawCircle(row: number, col: number){
    console.log("klik: " + row + " , " + col);
    let point = this.getCenterOfPoolInPixels(row,col);
    console.log("draw circle: " + point.x + " " + point.y );
    let g = this.mapBackground.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#ea0000");
    g.beginFill("red");
    g.drawCircle(point.x,point.y, 30);
    this.mapBackground.stage.update();
  }
}
