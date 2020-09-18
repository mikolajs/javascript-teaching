class HexMap {
    constructor(stage, X, Y, unitSize) {
        this.X = X;
        this.Y = Y;
        this.offset = 12;
        this.unitSize = unitSize;
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
        let toCheck = new Array();
        let startP = this.findFirstFreePool();
        toCheck.push(startP);
        let checked = Array(this.x).fill(Array(this.y).fill(false));
        for (let i = 0; i < this.x; i++)
            for (let j = 0; j < this.y; j++)
                if (this.map[i][j])
                    checked[i][j] = true;
        let freePoolsArea = new Array();
        while (toCheck.length != 0) {
            let p = toCheck.pop();
            freePoolsArea.push(p);
            this.addFreeNeighbourPools(p, checked, toCheck);
        }
    }
    findFirstFreePool() {
        return new createjs.Point();
    }
    addFreeNeighbourPools(p, checked, toCheck) {
        let neighbourPoint;
        if (p.x > 0)
            neighbourPoint = new createjs.Point(p.x - 1, p.y);
        else
            neighbourPoint = new createjs.Point(this.x - 1, p.y);
        if (p.x < this.x - 1)
            neighbourPoint = new createjs.Point(p.x + 1, p.y);
        else
            neighbourPoint = new createjs.Point(this.x - 1, p.y);
        if (p.x < this.x - 1)
            neighbourPoint = new createjs.Point(p.x + 1, p.y);
        else
            neighbourPoint = new createjs.Point(this.x - 1, p.y);
        if (p.x < this.x) {
            let neighbourPoint = new createjs.Point(p.x, p.y);
            if (!checked[neighbourPoint.x][neighbourPoint.y]) {
                toCheck.push(neighbourPoint);
                checked[neighbourPoint.x][neighbourPoint.y];
            }
        }
        for (let a = -1; a < 2; a++)
            for (let b = -1; b < 2; b++)
                for (let c = -1; c < 2; c++)
                    if (a != b && b != c && a != c)
                        Lib.fromCubeToOddR(a, c);
    }
}
//# sourceMappingURL=map.js.map