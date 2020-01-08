/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
/// <reference path="./map.ts" />
var Ship = /** @class */ (function () {
    function Ship(stage, map) {
        var _this = this;
        this.handleImage = function (evt) {
            console.log("Handle Ship Image");
            _this.shipBitmap.scaleX = 0.7;
            _this.shipBitmap.scaleY = 0.7;
            _this.sizeX = _this.shipBitmap.image.width * _this.shipBitmap.scaleX;
            _this.sizeY = _this.shipBitmap.image.height * _this.shipBitmap.scaleY;
            _this.setPosition(Math.floor(Math.random() * _this.map.x), Math.floor(Math.random() * _this.map.y));
        };
        this.map = map;
        this.shipBitmap = new createjs.Bitmap("ship.png");
        this.shipBitmap.image.onload = this.handleImage;
        stage.addChild(this.shipBitmap);
    }
    Ship.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        var point = this.map.getCenterOfPoolInPixels(x, y);
        this.shipBitmap.x = point.x - this.sizeX / 2;
        this.shipBitmap.y = point.y - this.sizeY / 2;
        // console.log(this.sizeX + ", " + this.sizeY + " size of ship");
        // console.log(this.shipBitmap.scale + " scale");
        // console.log("pool: " + this.x + ", " + this.y);
        // console.log(this.shipBitmap.x + "::" + this.shipBitmap.y + " px");
    };
    return Ship;
}());
