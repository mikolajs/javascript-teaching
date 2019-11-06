"use strict";
exports.__esModule = true;
var Help = /** @class */ (function () {
    function Help() {
    }
    Help.prototype.contructor = function () {
    };
    Help.prototype.mk = function () {
        window.document.getElementById("insert").innerHTML = "It works";
        console.log("MK from Help");
    };
    return Help;
}());
exports.Help = Help;
