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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boat__ = __webpack_require__(2);
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
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
    this.stage.update();
  }

  handleTick(event) {
    if (!event.paused) {
      this.boat.refresh(1);
      this.stage.update();
    }
  }

}

var main = new Main();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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
		//not implemented
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

class Boat {
   constructor(canvSizeX, canvSizeY) {
      this.dx = 0.1;
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
      // this.printCanvasSize();
   }

   refresh(time) {
      if (this.isGo) {
         if (this.left) {
            this.moveLeft();
         } else {
            this.moveRight();
         }
      } else if (this.start <= 0) this.mkStart();
   }

   moveLeft() {
      this.x -= this.dx;
      this.image.x = this.x;
   }
   moveRight() {
      this.x += this.dx;
      this.image.x = this.x;
   }

   mkStart() {
      if (Math.random() > 0.5) {
         this.left = true;
         this.image.image = this.imgs[0];
         this.x = this.cx;
      } else {
         this.left = false;
         this.image.image = this.imgs[1];
         this.x = -this.sizeX;
      }
      this.isGo = true;
   }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Boat;


/***/ })
/******/ ]);