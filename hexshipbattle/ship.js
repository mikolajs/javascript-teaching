class Ship {
    constructor(stage, map) {
        this.handleImage = (evt) => {
            console.log("Handle Ship Image");
            this.shipBitmap.scaleX = 0.7;
            this.shipBitmap.scaleY = 0.7;
            this.sizeX = this.shipBitmap.image.width * this.shipBitmap.scaleX;
            this.sizeY = this.shipBitmap.image.height * this.shipBitmap.scaleY;
            this.setPosition(Math.floor(Math.random() * this.map.x), Math.floor(Math.random() * this.map.y));
        };
        this.map = map;
        this.shipBitmap = new createjs.Bitmap("ship.png");
        this.shipBitmap.image.onload = this.handleImage;
        stage.addChild(this.shipBitmap);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        let point = this.map.getCenterOfPoolInPixels(x, y);
        this.shipBitmap.x = point.x - this.sizeX / 2;
        this.shipBitmap.y = point.y - this.sizeY / 2;
    }
}
//# sourceMappingURL=ship.js.map