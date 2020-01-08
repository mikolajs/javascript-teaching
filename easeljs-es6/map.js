/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
var Map = /** @class */ (function () {
    function Map(stage, X, Y, tileSize) {
        var _this = this;
        this.X = X;
        this.Y = Y;
        this.offset = 12;
        this.tileSize = tileSize;
        this.x = Math.floor(this.X / this.tileSize);
        this.y = Math.floor(Math.round(0.85 * this.X / this.tileSize));
        this.map = Array(this.x).fill().map(function () { return (Array(_this.y).fill(false)); });
        this.mineBitmap = new createjs.Bitmap("mine.png");
        // this.mineBackground =  new createjs.Shape();
        this.mapBackground = new createjs.Shape();
        this.mapBackground.graphics.beginFill("#ccc").drawRect(0, 0, X, Y);
        this.mapBackground.x = 0;
        this.mapBackground.y = 0;
        stage.addChild(this.mapBackground);
    }
    Map.prototype.setMine = function (x, y) {
        this.map[x][y] = true;
        var newMine = this.mineBitmap.clone();
        newMine.x = x * this.tileSize + 0.5 * this.tileSize;
        newMine.y = y * this.tileSize + 0.5 * this.tileSize;
        this.mapBackground.stage.addChild(newMine);
    };
    Map.prototype.drawHexGrid = function (background) {
        background.graphics.beginStroke("#ccf");
        background.graphics.setStrokeStyle(1);
        var pointX = 25;
        var pointY = 12;
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
                // console.log("draw at ("+pointX + ", " + pointY +")")
            }
        }
    };
    Map.prototype.drawOneHex = function (background, startX, startY) {
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
    };
    Map.prototype.getCenterOfPoolInPixels = function (x, y) {
        if (y % 2 == 0) {
            return new createjs.Point(25 + x * 50, 25 + y / 2 * 76 + this.offset);
        }
        else {
            return new createjs.Point(50 + x * 50, 64 + 76 * ((y - 1) / 2) + this.offset);
        }
    };
    Map.prototype.drawCircle = function (x, y) {
        var point = this.getCenterOfPoolInPixels(x, y);
        console.log("draw circle: " + point.x + " " + point.y);
        var g = this.mapBackground.graphics;
        g.setStrokeStyle(1);
        g.beginStroke("#ea0000");
        g.beginFill("red");
        g.drawCircle(point.x, point.y, 30);
        this.setMine(5, 5);
        this.mapBackground.stage.update();
    };
    return Map;
}());
