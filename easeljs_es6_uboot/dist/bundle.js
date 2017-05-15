/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barrel__ = __webpack_require__(2);


class Boat {
	constructor(canvSizeX, canvSizeY) {
		this.dx = 0.9;
		this.cx = canvSizeX;
		this.cy = canvSizeY;
		//size of uboat in pixels
		this.sizeX = 128;
		this.sizeY = 45;
		this.x = 200;
		this.y = Math.floor(0.73 * this.sizeY);
		this.imgs = [];
		this.imgs[0] = new createjs.Bitmap("files/boatL.png");
		this.imgs[1] = new createjs.Bitmap("files/boatR.png");
		this.image = new createjs.Bitmap("files/boatL.png");
		this.left = true;
		this.image.x = this.x;
		this.image.y = this.y;
		this.isGo = false;
		this.start = 0;
		// this.printXY();
		this.bars = [];
		for (let i = 1; i <= 5; i++) {
			this.bars[i] = new __WEBPACK_IMPORTED_MODULE_0__barrel__["a" /* Barrel */](i);
		}
		// this.printCanvasSize();
	}

	refresh(time) {
		if (this.isGo) {
			//this.printXY();
			if (this.left) {
				this.moveLeft();
			} else {
				this.moveRight();
			}
			if (this.x < -Math.floor(this.sizeX) || this.x > this.cx + Math.floor(this.sizeX / 2)) {
				this.start = 120;
				this.isGo = false;
			}
		} else if (this.start <= 0) this.mkStart();else {
			this.start -= time;
		}
	}

	moveLeft() {
		this.x -= this.dx;
		this.image.x = Math.floor(this.x);
	}
	moveRight() {
		this.x += this.dx;
		this.image.x = Math.floor(this.x);
	}

	mkStart() {
		this.dx = 2 * Math.random() + 0.5;
		if (Math.random() > 0.5) {
			this.left = true;
			this.image.image = this.imgs[0].image;
			this.x = this.cx;
		} else {
			this.left = false;
			this.image.image = this.imgs[1].image;
			this.x = -this.sizeX;
		}
		this.isGo = true;
	}
	printXY() {
		console.log("XY: (" + this.x + " ; " + this.y + ")");
	}
	/// under work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	_randomPlaces() {
		var a = [0, 0, 0, 0, 0];
		let isUnique = false;
		for (let i = 0; i < 5; i++) {
			while (a[i]) {
				a[i] = Math.floor(Math.random() * 10 + 1);
			}
		}

		return a;
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Boat;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__torpedo__ = __webpack_require__(3);



class UBoat {
	constructor(canvSizeX, canvSizeY) {
		this.dx = 5;
		this.cx = canvSizeX;
		this.cy = canvSizeY;
		//size of uboat in pixels
		this.sizeX = 128;
		this.sizeY = 80;
		this.x = Math.floor(this.cx / 2) - Math.floor(this.sizeX / 2);
		this.y = this.cy - Math.floor(1.5 * this.sizeY);
		document.onkeydown = this.keyAction.bind(this);
		this.imgs = [];
		this.imgs[0] = new createjs.Bitmap("files/uboatL.png");
		this.imgs[1] = new createjs.Bitmap("files/uboatR.png");
		this.image = new createjs.Bitmap("files/uboatL.png");
		this.left = true;
		this.image.x = this.x;
		this.image.y = this.y;
		this.torps = [];
		this.torps[0] = new __WEBPACK_IMPORTED_MODULE_0__torpedo__["a" /* Torpedo */](1);
		this.torps[1] = new __WEBPACK_IMPORTED_MODULE_0__torpedo__["a" /* Torpedo */](2);
		this.torps[2] = new __WEBPACK_IMPORTED_MODULE_0__torpedo__["a" /* Torpedo */](3);
		// this.printXY();
		// this.printCanvasSize();
	}
	moveLeft() {
		if (this.x >= this.dx) {
			this.x -= this.dx;
			this.image.x = this.x;
		}
	}
	moveRight() {
		if (this.x <= this.cx - this.sizeX - this.dx) {
			this.x += this.dx;
			this.image.x = this.x;
		}
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}

	fire() {
		console.log("Torpedo fire");
		for (let i = 0; i < this.torps.length; i++) {
			if (!this.torps[i].isGo) {
				this.torps[i].launch(this.x + Math.floor(this.sizeX / 2), this.y);
				return;
			}
		}
	}

	refresh(time) {
		for (let i = 0; i < this.torps.length; i++) this.torps[i].refresh(time);
	}

	keyAction(event) {
		switch (event.keyCode) {
			case 37:
				if (!this.left) {
					this.image.image = this.imgs[0].image;
					this.left = true;
				}
				this.moveLeft();
				//console.log("LEFT");
				break;
			case 38:
				this.fire();
				break;
			case 39:
				if (this.left) {
					this.image.image = this.imgs[1].image;
					this.left = false;
				}
				this.moveRight();
				//console.log("RIGHT");
				break;
		}
	}
	printXY() {
		console.log("XY: (" + this.x + " ; " + this.y + ")");
	}
	printCanvasSize() {
		console.log("Canvas Size: (" + this.cx + " ; " + this.cy + ")");
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UBoat;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Barrel {
  constructor(nr) {
    this.nr = nr;
    this.x = 0;
    this.y = 0;
    this.image = new createjs.Bitmap("files/barrel.png");
    this.image.visible = false;
    this.dy = 1.5;
    this.isGo = false;
  }

  drop(X, Y) {
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    console.log("Barrel was droped! " + this.nr);
  }

  refresh(time) {
    if (this.isGo) {
      this.y += this.dy;
      this.image.y = Math.floor(this.y);
      if (this.y < 20) {
        this.image.visible = false;
        this.isGo = false;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Barrel;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Torpedo {
  constructor(nr) {
    this.nr = nr;
    this.x = 0;
    this.y = 0;
    this.image = new createjs.Bitmap("files/torpedo.png");
    this.image.visible = false;
    this.dy = 1.8;
    this.isGo = false;
  }

  launch(X, Y) {
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    console.log("Torpedo launched! " + this.nr);
  }

  refresh(time) {
    if (this.isGo) {
      this.y -= this.dy;
      this.image.y = Math.floor(this.y);
      if (this.y < 40) {
        this.image.visible = false;
        this.isGo = false;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Torpedo;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boat__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uboat__ = __webpack_require__(1);



class Main {

  constructor() {
    this.stage = new createjs.Stage("demoCanvas");
    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    this.back = new createjs.Shape();
    this.time = 0;
    this.started = true;
    this.uboat = new __WEBPACK_IMPORTED_MODULE_1__uboat__["a" /* UBoat */](this.w, this.h);
    this.boat = new __WEBPACK_IMPORTED_MODULE_0__boat__["a" /* Boat */](this.w, this.h);
    this.init();
  }

  init() {
    console.log("started init!");
    var bg = new createjs.Bitmap("files/background.png");
    this.back.graphics.beginStroke("black").beginFill("blue").beginBitmapStroke(bg);
    this.back.graphics.drawRect(0, 0, this.w, this.h);
    // this.stage.addChild(this.back);
    this.stage.addChild(bg);
    this.stage.addChild(this.uboat.image);
    this.stage.addChild(this.boat.image);
    this.stage.addChild(this.uboat.torps[0].image);
    this.stage.addChild(this.uboat.torps[1].image);
    this.stage.addChild(this.uboat.torps[2].image);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
    this.stage.update();
  }

  handleTick(event) {
    if (!event.paused) {
      this.boat.refresh(1);
      this.uboat.refresh(1);
      this.stage.update();
    }
  }

}

var main = new Main();

/***/ })
/******/ ]);