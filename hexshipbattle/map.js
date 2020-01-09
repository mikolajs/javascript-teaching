class HexMap {
    constructor(stage, X, Y, unitSize) {
        this.X = X;
        this.Y = Y;
        this.offset = 12;
        this.unitSize = unitSize;
        this.x = Math.floor(this.X / (this.unitSize * 10));
        this.y = Math.floor(Math.round(this.X / (this.unitSize * 5)));
        this.map = Array(this.x).fill(Array(this.y).fill(false));
        this.mineBitmap = new createjs.Bitmap("mine.png");
        this.mapBackground = new createjs.Shape();
        this.mapBackground.graphics.beginFill("#ccc").drawRect(0, 0, X, Y);
        this.mapBackground.x = 0;
        this.mapBackground.y = 0;
        stage.addChild(this.mapBackground);
    }
    setMine(x, y) {
        let pointPool = this.getPoolClicked(x, y);
        this.map[x][y] = true;
        let point = this.getCenterOfPoolInPixels(x, y);
        var newMine = this.mineBitmap.clone();
        newMine.x = point.x - 0.5 * this.mineBitmap.x;
        newMine.y = point.y + 0.5 * this.mineBitmap.y;
        this.mapBackground.stage.addChild(newMine);
    }
    getPoolClicked(x, y) {
        y -= this.offset;
        if (y % 2 == 0) {
            return new createjs.Point(25 + x * 50, 25 + y / 2 * 76 + this.offset);
        }
        else {
            return new createjs.Point(50 + x * 50, 64 + 76 * ((y - 1) / 2) + this.offset);
        }
    }
    drawHexGrid(background) {
        background.graphics.beginStroke("#ccf");
        background.graphics.setStrokeStyle(1);
        let pointX = 25;
        let pointY = 12;
        for (var i = 0; i < this.y; i++) {
            if (i % 2 == 0) {
                pointX = 25;
                pointY = i * (this.tileSize - 12) + this.offset;
            }
            else {
                pointX = this.tileSize;
                pointY = i * this.tileSize - 12 * i + this.offset;
            }
            for (var j = 0; j < this.x; j++) {
                background.graphics.moveTo(pointX, pointY);
                this.drawOneHex(background, pointX, pointY);
                if (i == 0)
                    this.drawOneHex(background, pointX, pointY);
                pointX += this.tileSize;
            }
        }
    }
    drawOneHexO(background, startX, startY) {
        var pointX = startX;
        var pointY = startY;
        pointX += 25;
        pointY += 12;
        background.graphics.lineTo(pointX, pointY);
        pointY += 25;
        background.graphics.lineTo(pointX, pointY);
        pointX -= 25;
        pointY += 12;
        background.graphics.lineTo(pointX, pointY);
        pointX -= 25;
        pointY -= 12;
        background.graphics.lineTo(pointX, pointY);
        pointY -= 25;
        background.graphics.lineTo(pointX, pointY);
        pointX += 25;
        pointY -= 12;
        background.graphics.lineTo(pointX, pointY);
    }
    drawHexGridO(background) {
        background.graphics.beginStroke("#acf");
        background.graphics.setStrokeStyle(1);
        let pointX = 25;
        let pointY = 5;
        for (var i = 0; i < this.y; i++) {
            if (i % 2 == 0) {
                pointX = 25;
                pointY = i * (this.tileSize - 5) + this.offset;
            }
            else {
                pointX = this.tileSize;
                pointY = i * this.tileSize - 12 * i + this.offset;
            }
            for (var j = 0; j < this.x; j++) {
                background.graphics.moveTo(pointX, pointY);
                this.drawOneHex(background, pointX, pointY);
                if (i == 0)
                    this.drawOneHex(background, pointX, pointY);
                pointX += this.tileSize;
            }
        }
    }
    drawOneHex(background, startX, startY) {
        const xx = 25;
        const yy = 5;
        var pointX = startX;
        var pointY = startY;
        pointX += xx;
        pointY += yy;
        background.graphics.lineTo(pointX, pointY);
        pointY += xx;
        background.graphics.lineTo(pointX, pointY);
        pointX -= xx;
        pointY += yy;
        background.graphics.lineTo(pointX, pointY);
        pointX -= xx;
        pointY -= yy;
        background.graphics.lineTo(pointX, pointY);
        pointY -= xx;
        background.graphics.lineTo(pointX, pointY);
        pointX += xx;
        pointY -= yy;
        background.graphics.lineTo(pointX, pointY);
    }
    getCenterOfPoolInPixels(x, y) {
        if (y % 2 == 0) {
            return new createjs.Point(25 + x * 50, 25 + y / 2 * 76 + this.offset);
        }
        else {
            return new createjs.Point(50 + x * 50, 64 + 76 * ((y - 1) / 2) + this.offset);
        }
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