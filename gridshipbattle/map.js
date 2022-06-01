class GridMap {
    constructor(stage, X, Y, unitSize) {
        this.X = X;
        this.Y = Y;
        this.unitSize = unitSize;
        this.col = Math.floor(this.X / (this.unitSize));
        this.row = Math.floor(Math.round(this.Y / (this.unitSize)));
        this.map = Array(this.row).fill(Array(this.col).fill(false));
        this.mineBitmap = new createjs.Bitmap("mine.png");
        console.log("Rows: " + this.row + " Cols: " + this.col);
        this.mapBackground = new createjs.Shape();
        this.mapBackground.graphics.beginFill("#ccc").drawRect(0, 0, X, Y);
        this.mapBackground.x = 0;
        this.mapBackground.y = 0;
        stage.addChild(this.mapBackground);
    }
    setMine(x, y) {
        console.log("Clicked at x: " + x + " y: " + y);
        let pointPool = this.getPoolClicked(x, y);
        this.map[pointPool.y][pointPool.x] = true;
        console.log("clicked: " + pointPool.x + "," + pointPool.y);
        let point = this.getCenterOfPoolInPixels(pointPool.x, pointPool.y);
        console.log("The center point y: " + point.x + " y: " + point.y);
        let newMine = this.mineBitmap.clone();
        newMine.x = point.x - this.mineBitmap.image.width / 2;
        newMine.y = point.y - this.mineBitmap.image.height / 2;
        this.mapBackground.stage.addChild(newMine);
    }
    getPoolClicked(x, y) {
        return new createjs.Point(Math.floor(x / this.unitSize), Math.floor(y / this.unitSize));
    }
    drawGrid(background) {
        background.graphics.beginStroke("#ccf");
        background.graphics.setStrokeStyle(1);
        let pointX = 0;
        let pointY = 0;
        for (let i = 0; i < this.row; i++) {
            pointX = 0;
            for (var j = 0; j < this.col; j++) {
                background.graphics.moveTo(pointX, pointY);
                this.drawOneGrid(background, pointX, pointY);
                pointX += this.unitSize;
            }
            pointY += this.unitSize;
        }
    }
    drawOneGrid(background, startX, startY) {
        var pointX = startX;
        var pointY = startY;
        pointX += this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointY += this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointX -= this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointY -= this.unitSize;
        background.graphics.lineTo(pointX, pointY);
    }
    getCenterOfPoolInPixels(col, row) {
        return new createjs.Point((col + 0.5) * this.unitSize, (row + 0.5) * this.unitSize);
    }
    drawCircle(row, col) {
        console.log("klik: " + row + " , " + col);
        let point = this.getCenterOfPoolInPixels(row, col);
        console.log("draw circle: " + point.x + " " + point.y);
        let g = this.mapBackground.graphics;
        g.setStrokeStyle(1);
        g.beginStroke("#ea0000");
        g.beginFill("red");
        g.drawCircle(point.x, point.y, 30);
        this.mapBackground.stage.update();
    }
}
//# sourceMappingURL=map.js.map