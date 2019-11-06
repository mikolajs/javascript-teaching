"use strict";
exports.__esModule = true;
var Help_1 = require("./Help");
var Main = /** @class */ (function () {
    function Main() {
        this.a = 2;
        this.h = new Help_1.Help();
    }
    Main.prototype.start = function () {
        this.h.mk();
    };
    return Main;
}());
var main = new Main();
main.start();
console.log("Started");
