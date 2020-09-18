class Main {
    constructor() {
        this.handleImageLoad = (event) => {
            console.log("Read Bitmap");
            this.mkBackground();
            this.map.drawHexGrid(this.background);
        };
        this.tick = (even) => {
            this.stage.update(event);
        };
        this.X = 1200;
        this.Y = 600 + this.X / 120;
        this.mapUnitSize = 10;
        this.stage = new createjs.Stage("gameCanvas");
        this.background = new createjs.Shape();
        this.imageBackground = new Image();
        this.imageBackground.src = "water.jpg";
        this.imageBackground.onload = this.handleImageLoad;
        createjs.Ticker.addEventListener("tick", this.tick);
        this.map = new HexMap(this.stage, this.X, this.Y, this.mapUnitSize);
        this.stage.on("stagemouseup", (evt) => {
            console.log("the canvas was clicked at " + evt.stageX + "," + evt.stageY);
            this.map.setMine(evt.stageX, evt.stageY);
        });
        this.stage.update();
    }
    mkBackground() {
        this.background.graphics.beginBitmapFill(this.imageBackground, 'repeat').drawRect(0, 0, this.X, this.Y);
        this.background.x = 0;
        this.background.y = 0;
        this.stage.addChild(this.background);
        this.ship = new Ship(this.stage, this.map);
        this.map.drawHexGrid(this.background);
        this.stage.update();
    }
}
var main;
function init() {
    main = new Main();
}
//# sourceMappingURL=main.js.map