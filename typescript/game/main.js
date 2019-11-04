/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
var Main = /** @class */ (function () {
    function Main() {
        this.X = 1280;
        this.Y = 800;
        this.stage = new createjs.Stage("gameCanvas");
        this.background = new createjs.Shape();
        this.mkBackground();
        this.stage.update();
    }
    Main.prototype.mkBackground = function () {
        this.background.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, this.X, this.Y);
        this.background.x = 0;
        this.background.y = 0;
        this.stage.addChild(this.background);
    };
    return Main;
}());
function init() {
    var main = new Main();
}
