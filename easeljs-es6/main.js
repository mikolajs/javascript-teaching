/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class Main {
  X;
  Y;
  map;
  constructor() {
    this.X = 1280
    this.Y = 800
    this.map = new Map();
  }

  mkBackground() {
     alert("HEJ");
     this.map.start();
  }
}

function init() {
  var main = new Main();
  main.mkBackground();
}
