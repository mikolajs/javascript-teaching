import { Help } from "./Help";
class Main {
    constructor() {
        this.a = 2;
        this.h = new Help();
    }
    start() {
        this.h.mk();
    }
}
var main = new Main();
main.start();
console.log("Started");
