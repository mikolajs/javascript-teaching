/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class HexMap {
  x: number;
  y: number;
  X: number; Y: number;
  unitSize: number;
  map: Array<Array<boolean>>;
  mapBackground: createjs.Shape;
  offset: number;
  imgEmpty: HTMLImageElement;
  mineBitmap: createjs.Bitmap;
  ship: Ship;

  constructor(stage: createjs.Stage, X: number, Y: number, unitSize: number, ship:Ship) {
    this.X = X;
    this.Y = Y;
    this.offset = 12;
    this.unitSize = unitSize
    this.ship = ship;
    this.x = Math.floor(this.X/(this.unitSize*10));
    this.y = this.x;
    this.map = Array<Array<boolean>>(this.x).fill(Array(this.y).fill(false));
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
    let p = this.getPoolClicked(x, y);
    // console.log("setMine pool " + p.x + ", " + p.y + " clicked");
    this.map[p.x-1][p.y-1] = true;
    this.checkDeathPools();
    let point = this.getCenterOfPoolInPixels(p.x, p.y);
    // console.log("setMine center of mine to set " + point.x + ", " + point.y);
    var newMine = this.mineBitmap.clone();
    // console.log("bitmap mine: " +  this.mineBitmap.x + ",  " + this.mineBitmap.y);
    newMine.x = point.x - 0.5*this.mineBitmap.getBounds().width;
    newMine.y = point.y - 0.5*this.mineBitmap.getBounds().height;
    this.mapBackground.stage.addChild(newMine);
  }

  getPoolClicked(x: number, y: number):createjs.Point {
    let yP = Math.ceil((y-0.16666666*this.unitSize)/(5*this.unitSize));

    if(yP % 2 == 1) {
      return new createjs.Point(Math.ceil(x/(10*this.unitSize)), yP);
    } else {
      if(x < 5*this.unitSize) return new createjs.Point(12, yP);
      else return new createjs.Point(Math.ceil((x-5*this.unitSize)/(10*this.unitSize)), yP);
    }
  }

  drawHexGrid(background: createjs.Shape){
    background.graphics.beginStroke("#ddd");
    background.graphics.setStrokeStyle(1);
    let pointX = 0; let pointY = 0;
    for(let i = 0; i < this.y; i++){
      pointY = (i*5+1)*this.unitSize;
      if(i % 2 == 0) {
        pointX = 0;
      } else {
        pointX = -this.unitSize*5;
      }
      for(var j = 0; j < this.x; j++){
        background.graphics.moveTo(pointX,pointY);
        this.drawOneHex(background, pointX, pointY);
        //if(i == 0) this.drawOneHex(background, pointX, pointY);
        pointX += this.unitSize*10;
        if(i %2 == 1 && j == this.x -1) {
        background.graphics.moveTo(pointX,pointY);
        this.drawOneHex(background, pointX, pointY);
        }
        // console.log("draw at ("+pointX + ", " + pointY +")")
      }
    }
  }

  drawOneHex(background: createjs.Shape, startX: number, startY: number){

      let pointX = startX; let pointY = startY;
       pointY += 4*this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointX += 5*this.unitSize; pointY += this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointX += 5*this.unitSize; pointY -= this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointY -= 4*this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointX -= 5*this.unitSize; pointY -= this.unitSize;
      background.graphics.lineTo(pointX,pointY);
      pointX -= 5*this.unitSize; pointY += this.unitSize;
      background.graphics.lineTo(pointX,pointY);
  }


  getCenterOfPoolInPixels(x: number, y: number){
    if(y % 2 == 1) {
      return new createjs.Point((10*x-5)*this.unitSize, (5*y-2)*this.unitSize);
    } else {
      return new createjs.Point(10*x*this.unitSize,(y*5 -2)*this.unitSize );
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

  private checkDeathPools(){
      let startP = this.findFirstFreePool();
      let checked = new Array<createjs.Point>();
      let toCheck = new Array<createjs.Point>();
      this.addFreeNeighbourPools(startP, checked, toCheck);

  }
  private findFirstFreePool():createjs.Point {
     return new createjs.Point();
  }

  private addFreeNeighbourPools(point:createjs.Point, checked:Array<createjs.Point>, toCheck: Array<createjs.Point>){
      if(point.x < this.x) {
        let neighbourPoint = new createjs.Point(point.x+1, point.y);
        if(this.checkIfAddToCheck(neighbourPoint, checked, toCheck)) toCheck.push(neighbourPoint) ;
      }
  }

  private checkIfAddToCheck(point: createjs.Point, checked:Array<createjs.Point>, toCheck:Array<createjs.Point>):boolean{
    for(let i in checked){
      if(checked[i].x == point.x && checked[i].y == point.y) return true;
    }
    return false;
    for(let i in toCheck){
      ///TODO:RETHINK!!!!!!!!!
    }
  }
}
