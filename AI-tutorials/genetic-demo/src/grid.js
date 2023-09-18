class Grid {
  constructor(unitSize, Row, Col, gridContainer){
    this.unitSize = unitSize;
    console.log("Unit Size: " + unitSize);
    this.gridContainer = gridContainer;
    this.col = Col; this.row = Row;
    this.drawHexGrid();
    //this.drawPointIndexes();
  }
  drawHexGrid() {
      this.gridContainer.removeChildren(0, this.gridContainer.children.length);
        let background = new PIXI.Graphics();
        background.lineStyle(1, 0x090909);
        background.zOrder = 1001;
        //background.beginFill(0x66CCFF);
        let pointCol = 0;
        let pointRow = 0;
        for (let i = 0; i < this.row; i++) {
            pointRow = (i * 5) * this.unitSize + 6;
            if (i % 2 == 0) {
                pointCol = 0;
            }
            else {
                pointCol = -this.unitSize * 5;
            }
            for (var j = 0; j < this.col; j++) {
                background.moveTo(pointCol, pointRow);
                this.drawOneHex(background, pointCol, pointRow);
                pointCol += this.unitSize * 10;
                if (i % 2 == 1 && j == this.x - 1) {
                    background.moveTo(pointCol, pointRow);
                    this.drawOneHex(background, pointCol, pointRow);
                }
            }
        }

        this.gridContainer.addChild(background);
    }
    drawOneHex(background, startCol, startRow) {
        //console.log("Draw from: " + startX + ", " + startY);
        let pointCol = startCol;
        let pointRow = startRow;
        pointRow += 4 * this.unitSize;
        background.lineTo(pointCol, pointRow);
        pointCol += 5 * this.unitSize;
        pointRow += this.unitSize;
        background.lineTo(pointCol, pointRow);
        pointCol += 5 * this.unitSize;
        pointRow -= this.unitSize;
        background.lineTo(pointCol, pointRow);
        pointRow -= 4 * this.unitSize;
        background.lineTo(pointCol, pointRow);
        pointCol -= 5 * this.unitSize;
        pointRow -= this.unitSize;
        background.lineTo(pointCol, pointRow);
        pointCol -= 5 * this.unitSize;
        pointRow += this.unitSize;
        background.lineTo(pointCol, pointRow);
    }

    drawPointIndexes(startRow, startCol){
      let style = new PIXI.TextStyle({"fill":"black", "fontSize":"12px"});
      for(let i = 0; i < this.col; i++){
        for(let j = 0; j < this.row; j++){
          let point = this.getCenterOfPoolInPixels(i, j);
          let t = new PIXI.Text((j+startRow) + "," + (i+startCol), style);
          t.anchor.set(0.5);
          t.position.set(point.x, point.y);
          this.gridContainer.addChild(t);
        }
      }
    }

    getPoolClicked(x, y) {
      ///// TODO: ERROR -> with Y
        let yP = Math.ceil((y - 0.16666666 * this.unitSize) / (5 * this.unitSize));
        if (yP % 2 == 1) {
            return new PIXI.Point(Math.ceil(x / (10 * this.unitSize)) - 1, yP);
        }
        else {
            if (x < 5 * this.unitSize)  return new PIXI.Point(11, yP);
            else return new PIXI.Point(
                  Math.ceil((x - 5 * this.unitSize) / (10 * this.unitSize))-1, yP);
        }
    }

    getCenterOfPoolInPixels(X, Y) {
        let x = X;
        let y = Y;
        if (y % 2 == 1) {
            return new PIXI.Point(
              (10 * x + 10) * this.unitSize, (5 * y + 3) * this.unitSize);
        }
        else {
            return new PIXI.Point(
              (10 * x + 5) * this.unitSize, (y * 5 + 3) * this.unitSize);
        }
    }
}
