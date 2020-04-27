/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class GridMap {
  row: number;
  col : number;
  X: number; Y: number;
  unitSize: number;
  freePools: number;
  map: Array<Array<boolean>>;
  mapBackground: createjs.Shape;
  imgEmpty: HTMLImageElement;
  mineBitmap: createjs.Bitmap;
  ship: Ship;

  constructor(stage: createjs.Stage, X: number, Y: number, unitSize: number, ship: Ship) {
    this.X = X;
    this.Y = Y;
    this.unitSize = unitSize;
    this.ship = ship;
    this.col = Math.floor(this.X/(this.unitSize));
    this.row = Math.floor(Math.round(this.Y/(this.unitSize)));
    this.map = Array<Array<boolean>>(this.row).fill(Array(this.col).fill(false));
    this.freePools = this.col*this.row;
    this.mineBitmap = new createjs.Bitmap("mine.png");
    console.log("Rows: " + this.row + " Cols: " + this.col);
    // this.mineBackground =  new createjs.Shape();
    this.mapBackground = new createjs.Shape();
    this.mapBackground.graphics.beginFill("#ccc").drawRect(0,0,X,Y);
    this.mapBackground.x = 0;
    this.mapBackground.y = 0;
    stage.addChild(this.mapBackground);
  }

  setMine(x: number, y: number):boolean {
    // console.log("Clicked at x: " + x + " y: " + y);
    let pointPool = this.getPoolClicked(x, y);
    if(this.map[pointPool.y][pointPool.x]) return false;
    this.map[pointPool.y][pointPool.x] = true;
    this.freePools--;
    // console.log("clicked: " + pointPool.x + "," + pointPool.y);
    this.placeMine(pointPool.x, pointPool.y);
    this.checkMinesCutting();
    return true;
  }

  placeMine(col: number, row: number){
    let point = this.getCenterOfPoolInPixels(col, row);
    // console.log("The center point y: " + point.x + " y: " + point.y);
    let newMine = this.mineBitmap.clone();
    newMine.x = point.x - this.mineBitmap.image.width/2;
    newMine.y = point.y - this.mineBitmap.image.height/2;
    this.mapBackground.stage.addChild(newMine);
  }

  //// TODO: implement properly
  getPoolClicked(x: number, y: number):createjs.Point {
      return new createjs.Point(
        Math.floor(x/this.unitSize), Math.floor(y/this.unitSize)
      );
  }

  drawGrid(background: createjs.Shape){
    background.graphics.beginStroke("#ccf");
    background.graphics.setStrokeStyle(1);
    let pointX = 0; let pointY = 0;
    for(let i = 0; i < this.row; i++){
      pointX = 0;
    for(var j = 0; j < this.col; j++){
      background.graphics.moveTo(pointX,pointY);
      this.drawOneGrid(background, pointX, pointY);
      // console.log("draw at ("+pointX + ", " + pointY +")")
      pointX += this.unitSize;
    }
    pointY += this.unitSize;
    }
  }

  drawOneGrid(background: createjs.Shape, startX: number, startY: number){
      var pointX = startX; var pointY = startY;
      pointX += this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointY += this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointX -= this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointY -= this.unitSize;
      background.graphics.lineTo(pointX,pointY);
  }

  getCenterOfPoolInPixels(col: number, row: number){
      return new createjs.Point((col+0.5)*this.unitSize, (row+0.5)*this.unitSize);
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

  checkMinesCutting(){
    let pools = Array<Array<boolean>>(this.row).fill(Array(this.col).fill(false));
    let toCheck = new Array<createjs.Point>();
    let rootPoint = new createjs.Point(this.ship.x, this.ship.y);
    pools[rootPoint.x][rootPoint.y] == true;


  }

  checkPoint(col: number, row: number, pools: Array<Array<boolean>>, tocheck: Array<createjs.Point>){

  }


}
