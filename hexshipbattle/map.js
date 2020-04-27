class HexMap {
    constructor(stage, X, Y, unitSize, ship) {
        this.X = X;
        this.Y = Y;
        this.offset = 12;
        this.unitSize = unitSize;
        this.ship = ship;
        this.x = Math.floor(this.X / (this.unitSize * 10));
        this.y = this.x;
        this.map = Array(this.x).fill(Array(this.y).fill(false));
        this.mineBitmap = new createjs.Bitmap("mine.png");
        this.mapBackground = new createjs.Shape();
        this.mapBackground.graphics.beginFill("#ccc").drawRect(0, 0, X, Y);
        this.mapBackground.x = 0;
        this.mapBackground.y = 0;
        stage.addChild(this.mapBackground);
    }
    setMine(x, y) {
        let p = this.getPoolClicked(x, y);
        this.map[p.x - 1][p.y - 1] = true;
        this.checkDeathPools();
        let point = this.getCenterOfPoolInPixels(p.x, p.y);
        var newMine = this.mineBitmap.clone();
        newMine.x = point.x - 0.5 * this.mineBitmap.getBounds().width;
        newMine.y = point.y - 0.5 * this.mineBitmap.getBounds().height;
        this.mapBackground.stage.addChild(newMine);
    }
    getPoolClicked(x, y) {
        let yP = Math.ceil((y - 0.16666666 * this.unitSize) / (5 * this.unitSize));
        if (yP % 2 == 1) {
            return new createjs.Point(Math.ceil(x / (10 * this.unitSize)), yP);
        }
        else {
            if (x < 5 * this.unitSize)
                return new createjs.Point(12, yP);
            else
                return new createjs.Point(Math.ceil((x - 5 * this.unitSize) / (10 * this.unitSize)), yP);
        }
    }
    drawHexGrid(background) {
        background.graphics.beginStroke("#ddd");
        background.graphics.setStrokeStyle(1);
        let pointX = 0;
        let pointY = 0;
        for (let i = 0; i < this.y; i++) {
            pointY = (i * 5 + 1) * this.unitSize;
            if (i % 2 == 0) {
                pointX = 0;
            }
            else {
                pointX = -this.unitSize * 5;
            }
            for (var j = 0; j < this.x; j++) {
                background.graphics.moveTo(pointX, pointY);
                this.drawOneHex(background, pointX, pointY);
                pointX += this.unitSize * 10;
                if (i % 2 == 1 && j == this.x - 1) {
                    background.graphics.moveTo(pointX, pointY);
                    this.drawOneHex(background, pointX, pointY);
                }
            }
        }
    }
    drawOneHex(background, startX, startY) {
        let pointX = startX;
        let pointY = startY;
        pointY += 4 * this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointX += 5 * this.unitSize;
        pointY += this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointX += 5 * this.unitSize;
        pointY -= this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointY -= 4 * this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointX -= 5 * this.unitSize;
        pointY -= this.unitSize;
        background.graphics.lineTo(pointX, pointY);
        pointX -= 5 * this.unitSize;
        pointY += this.unitSize;
        background.graphics.lineTo(pointX, pointY);
    }
    getCenterOfPoolInPixels(x, y) {
        if (y % 2 == 1) {
            return new createjs.Point((10 * x - 5) * this.unitSize, (5 * y - 2) * this.unitSize);
        }
        else {
            return new createjs.Point(10 * x * this.unitSize, (y * 5 - 2) * this.unitSize);
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
    checkDeathPools() {
        let startP = this.findFirstFreePool();
        let checked = new Array();
        let toCheck = new Array();
        this.addFreeNeighbourPools(startP, checked, toCheck);
    }
    findFirstFreePool() {
        return new createjs.Point();
    }
    addFreeNeighbourPools(point, checked, toCheck) {
        if (point.x < this.x) {
            let neighbourPoint = new createjs.Point(point.x + 1, point.y);
            if (this.checkIfAddToCheck(neighbourPoint, checked, toCheck))
                toCheck.push(neighbourPoint);
        }
    }
    checkIfAddToCheck(point, checked, toCheck) {
        for (let i in checked) {
            if (checked[i].x == point.x && checked[i].y == point.y)
                return true;
        }
        return false;
        for (let i in toCheck) {
        }
    }
}
//# sourceMappingURL=map.js.map