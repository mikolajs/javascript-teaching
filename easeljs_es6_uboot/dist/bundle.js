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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barrel__ = __webpack_require__(6);


class Boat {
	constructor(canvSizeX, canvSizeY) {
		this.dx = 0.4;
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
		this.image = this.imgs[0];
		this.left = true;
		this.image.x = Math.floor(this.x);
		this.image.y = Math.floor(this.y);
		this.isGo = false;
		this.start = 0;
		this.blowAnimate = 0;
		this.isBlow = false;
		// this.printXY();
		this.bars = [];
		this.placesArray = [];
		for (let i = 0; i <= 8; i++) {
			this.bars[i] = new __WEBPACK_IMPORTED_MODULE_0__barrel__["a" /* Barrel */](i, this.cy);
		}
		this.barrelsPos = 0;
		//console.log("barrels: " + this.bars.length);
		this.dataAnim = {
			framerate: 20,
			images: ["files/boatblowanim.png"],
			frames: { width: 128, height: 45, count: 2 },
			animations: {
				blow: [0, 1, "blow", 0.05]
			}
		};
		this.spriteSheet = new createjs.SpriteSheet(this.dataAnim);
		this.sprite = new createjs.Sprite(this.spriteSheet, "blow");
		this.sprite.visible = false;
		this.mkStart();
	}

	refresh(time) {
		if (this.isGo) {
			if (this.left) {
				this.moveLeft();
				//console.log("this.x = " + this.x);
				if (this.barrelsPos < this.bars.length && this.x + this.sizeX / 2.0 < this.placesArray[this.barrelsPos]) {
					//console.log("about dorp left pos: " + this.x);
					this.bars[this.barrelsPos].drop(this.x + this.sizeX / 2, this.y);
					this.barrelsPos++;
				}
			} else {
				this.moveRight();
				//console.log("this.x = " + this.x);
				if (this.barrelsPos < this.bars.length && this.x + this.sizeX / 2.0 > this.placesArray[this.barrelsPos]) {
					//console.log("about dorp right pos: " + this.x);
					this.bars[this.barrelsPos].drop(this.x + this.sizeX / 2, this.y);
					this.barrelsPos++;
				}
			}
			if (this.x < -Math.floor(this.sizeX) || this.x > this.cx + Math.floor(this.sizeX / 2)) {
				this.start = 200;
				this.isGo = false;
			}
		} else {
			if (this.isBlow) {
				//console.log("blow time " + this.blowAnimate);
				if (this.blowAnimate > 0) {
					this.blowAnimate -= time;
				} else {
					this.isBlow = false;
					this.image.visible = false;
				}
			} else {
				if (this.start <= 0) this.mkStart();else {
					this.start -= time;
				}
			}
		}
		for (let i = 0; i < this.bars.length; i++) this.bars[i].refresh(time);
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
		this.dx = 2 * Math.random() + 1;
		this.image.visible = true;
		this.sprite.visible = false;
		this.playSound();
		if (Math.random() > 0.5) {
			this.left = true;
			this.image.image = this.imgs[0].image;
			//console.log("start left");
			this.x = this.cx;
		} else {
			this.left = false;
			this.image.image = this.imgs[1].image;
			//console.log("start right");
			this.x = -this.sizeX;
		}
		this.isGo = true;
		this.barrelsPos = 0;
		this._randomPlaces();
		if (this.left) {
			this.placesArray = this.placesArray.sort(function (k, m) {
				return m - k;
			});
		} else {
			this.placesArray = this.placesArray.sort(function (k, m) {
				return k - m;
			});
		}
		//console.log(this.placesArray + " is for left " + this.left);
	}

	destroyed() {
		this.blowAnimate = 300;
		this.playBlowSound();
		this.isBlow = true;
		this.isGo = false;
		this.image.visible = false;
		this.sprite.visible = true;
		this.sprite.x = this.image.x;
		this.sprite.y = this.image.y;
	}

	playBlowSound() {
		var instance = createjs.Sound.play("eboat");
		//instance.on("complete", this.handleComplete, this);
		instance.volume = 0.8;
	}

	playSound() {
		var instance = createjs.Sound.play("boat");
		instance.volume = 0.1;
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getWidth() {
		return this.image.image.width;
	}
	getHeight() {
		return this.image.image.height;
	}

	printXY() {
		console.log("XY: (" + this.x + " ; " + this.y + ")");
	}
	/// under work!
	_randomPlaces() {
		for (let i = 0; i < this.bars.length; i++) {
			this.placesArray[i] = 0;
		}
		let isUnique = false;
		for (let i = 0; i < this.bars.length; i++) {
			while (this.placesArray[i] == 0) {
				isUnique = true;
				let tmp = Math.floor(Math.random() * 18 + 1) * this.cx / 20;
				for (let j = 0; j < i; j++) {
					if (tmp == this.placesArray[j]) {
						isUnique = false;
						break;
					}
				}
				if (isUnique) this.placesArray[i] = tmp;
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Boat;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mine__ = __webpack_require__(3);


class Plane {
	constructor(canvSizeX, canvSizeY) {
		this.dx = 8;
		this.cx = canvSizeX;
		this.cy = canvSizeY;
		//size of uboat in pixels
		this.constStart = 1000;
		this.sizeX = 100;
		this.sizeY = 60;
		this.x = 0;
		this.y = 0;
		this.imgs = [];
		this.imgs[0] = new createjs.Bitmap("files/planeL.png");
		this.imgs[1] = new createjs.Bitmap("files/planeR.png");
		this.image = new createjs.Bitmap("");
		this.left = true;
		this.image.x = Math.floor(this.x);
		this.image.y = Math.floor(this.y);
		this.isGo = false;
		this.start = 500;
		this.mine = new __WEBPACK_IMPORTED_MODULE_0__mine__["a" /* Mine */](this.cy);
		this.place = 0;
		//this.mkStart();
	}

	refresh(time) {
		if (this.isGo) {
			if (this.left) {
				this.moveLeft();
				//console.log("this.x = " + this.x);
				if (this.place < this.x) {
					//console.log("about dorp left pos: " + this.x);
					this.mine.drop(this.x + this.sizeX / 2, this.y);
				}
			} else {
				this.moveRight();
				//console.log("this.x = " + this.x);
				if (this.place > this.x) {
					//console.log("about dorp right pos: " + this.x);
					this.mine.drop(this.x + this.sizeX / 2, this.y);
				}
			}
			if (this.x < -Math.floor(this.sizeX) || this.x > this.cx + Math.floor(this.sizeX / 2)) {
				this.start = this.constStart;
				this.isGo = false;
			}
		} else {
			if (this.start <= 0) {
				this.mkStart();
				if (this.constStart > 60) this.constStart -= 50;
			} else {
				this.start -= time;
			}
		}
		this.mine.refresh(time);
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
		this.image.visible = true;
		this.playSound();
		if (Math.random() > 0.5) {
			this.left = true;
			this.image.image = this.imgs[0].image;
			//console.log("start left");
			this.x = this.cx;
		} else {
			this.left = false;
			this.image.image = this.imgs[1].image;
			//console.log("start right");
			this.x = -this.sizeX;
		}
		this.isGo = true;
		this._randomPlace();
		//console.log(this.placesArray + " is for left " + this.left);
	}

	playSound() {
		var instance = createjs.Sound.play("plane");
		//instance.on("complete", this.handleComplete, this);
		instance.volume = 0.4;
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getWidth() {
		return this.image.image.width;
	}
	getHeight() {
		return this.image.image.height;
	}

	printXY() {
		console.log("XY: (" + this.x + " ; " + this.y + ")");
	}
	/// under work!
	_randomPlace() {
		this.place = Math.floor(Math.random() * 18 + 1) * this.cx / 20;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Plane;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__torpedo__ = __webpack_require__(4);



class UBoat {
  constructor(canvSizeX, canvSizeY) {
    this.dx = 5;
    this.cx = canvSizeX;
    this.cy = canvSizeY;
    this.fires = 0;
    //size of uboat in pixels
    this.sizeX = 128;
    this.sizeY = 80;
    this.x = Math.floor(this.cx / 2) - Math.floor(this.sizeX / 2);
    this.y = this.cy - Math.floor(1.5 * this.sizeY);
    document.onkeydown = this.keyActionDown.bind(this);
    document.onkeyup = this.keyActionUp.bind(this);
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
    this.isGo = false;
    this.dataAnim = {
      framerate: 20,
      images: ["files/uboatblowanim.png"],
      frames: { width: 128, height: 80, count: 2 },
      animations: {
        blow: [0, 1, "blow", 0.05]
      }
    };
    this.spriteSheet = new createjs.SpriteSheet(this.dataAnim);
    this.sprite = new createjs.Sprite(this.spriteSheet, "blow");
    this.sprite.visible = false;
    // this.printXY();
    // this.printCanvasSize();
  }
  moveLeft() {
    this.playSound();
    if (this.x >= this.dx) {
      this.x -= this.dx;
      this.image.x = this.x;
    }
  }
  moveRight() {
    this.playSound();
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
    //console.log("Torpedo fire");
    for (let i = 0; i < this.torps.length; i++) {
      if (!this.torps[i].isGo) {
        this.torps[i].launch(this.x + Math.floor(this.sizeX / 2), this.y);
        this.fires++;
        return;
      }
    }
  }

  refresh(time) {
    if (this.isGo) {
      if (this.left) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }

    for (let i = 0; i < this.torps.length; i++) this.torps[i].refresh(time);
  }

  keyActionDown(event) {
    switch (event.keyCode) {
      case 37:
        if (!this.left) {
          this.image.image = this.imgs[0].image;
          this.left = true;
          //console.log("LEFT");
        }
        this.isGo = true;
        break;
      case 38:
      case 32:
        this.fire();
        break;
      case 39:
        if (this.left) {
          this.image.image = this.imgs[1].image;
          this.left = false;
          //console.log("RIGHT");
        }
        this.isGo = true;
        break;
    }
  }

  keyActionUp(event) {
    switch (event.keyCode) {
      case 37:
        //console.log("KEY UP left");
        if (this.left) {
          //console.log("KEY UP L");
          this.isGo = false;
        }
        break;
      case 39:
        //console.log("KEY UP right");
        if (!this.left) {
          //console.log("KEY UP R");
          this.isGo = false;
        }
        break;
    }
  }

  destroyed() {
    this.image.visible = false;
    this.sprite.visible = true;
    this.playBlowSound();
    this.sprite.x = this.image.x;
    this.sprite.y = this.image.y;
    //console.log("destroyed, GAME OVER");
    document.onkeyup = null;
    document.onkeydown = null;
  }

  playBlowSound() {
    var instance = createjs.Sound.play("euboat");
    //instance.on("complete", this.handleComplete, this);
    instance.volume = 0.3;
  }

  playSound() {
    var instance = createjs.Sound.play("underwater");
    instance.volume = 0.9;
  }

  getNumberOfFires() {
    return this.fires;
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.image.image.width;
  }
  getHeight() {
    return this.image.image.height;
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Mine {
  constructor(cy) {
    this.x = 0;
    this.y = 0;
    this.cy = cy;
    this.image = new createjs.Bitmap("files/mine.png");
    this.image.visible = false;
    this.dy = 8;
    this.isGo = false;
    console.log(this.image.image.width + " x " + this.image.image.height);
  }

  drop(X, Y) {
    //console.log("s Barrel was droped! " + this.nr);
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    //console.log("e Barrel was droped! " + this.nr);
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.image.image.width;
  }
  getHeight() {
    return this.image.image.height;
  }

  refresh(time) {
    if (this.isGo) {
      this.y += this.dy;
      this.image.y = Math.floor(this.y);
      if (this.y > this.cy - 60) {
        this.image.visible = false;
        this.isGo = false;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mine;


/***/ }),
/* 4 */
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
    this.playSound();
    //console.log("Torpedo launched! " + this.nr);
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.image.image.width;
  }
  getHeight() {
    return this.image.image.height;
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
  playSound() {
    var instance = createjs.Sound.play("torpedo");
    //instance.on("complete", this.handleComplete, this);
    instance.volume = 0.3;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Torpedo;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boat__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uboat__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plane__ = __webpack_require__(1);




class Main {

  constructor() {
    this.stage = new createjs.Stage("demoCanvas");
    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    this.back = new createjs.Shape();
    this.time = 0;
    this.score = 0;
    this.started = true;
    this.uboat = new __WEBPACK_IMPORTED_MODULE_1__uboat__["a" /* UBoat */](this.w, this.h);
    this.boat = new __WEBPACK_IMPORTED_MODULE_0__boat__["a" /* Boat */](this.w, this.h);
    this.plane = new __WEBPACK_IMPORTED_MODULE_2__plane__["a" /* Plane */](this.w, this.h);
    this.text = new createjs.Text("Score: 0", "25px sans", "#ffffff");
    this.text.x = this.w - 140;
    this.text.y = this.h - 50;
    this.text.textBaseline = "alphabetic";
    this.init();
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("files/explodeboat.mp3", "eboat");
    createjs.Sound.registerSound("files/explodeuboat.mp3", "euboat");
    createjs.Sound.registerSound("files/boat.mp3", "boat");
    createjs.Sound.registerSound("files/torpedo.mp3", "torpedo");
    createjs.Sound.registerSound("files/barrel.mp3", "barrel");
    createjs.Sound.registerSound("files/uboat.mp3", "uboat");
    createjs.Sound.registerSound("files/plane.mp3", "plane");
    createjs.Sound.registerSound("files/bomb.mp3", "bomb");

    this.playInst = createjs.Sound.play("underwater");
    this.playInst.volume = 1;
    this.gameOver = false;
  }

  init() {
    //console.log("started init!");
    var bg = new createjs.Bitmap("files/background.png");
    this.back.graphics.beginStroke("black").beginFill("blue").beginBitmapStroke(bg);
    this.back.graphics.drawRect(0, 0, this.w, this.h);
    // this.stage.addChild(this.back);
    this.stage.addChild(bg);
    this.stage.addChild(this.uboat.image);
    this.stage.addChild(this.uboat.sprite);
    this.stage.addChild(this.boat.image);
    this.stage.addChild(this.boat.sprite);
    this.stage.addChild(this.uboat.torps[0].image);
    this.stage.addChild(this.uboat.torps[1].image);
    this.stage.addChild(this.uboat.torps[2].image);
    for (let i = 0; i < this.boat.bars.length; i++) this.stage.addChild(this.boat.bars[i].image);
    this.stage.addChild(this.plane.image);
    this.stage.addChild(this.plane.mine.image);
    this.stage.addChild(this.text);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
    this.stage.update();
  }

  checkColision(x1, y1, x2, y2, x3, y3, x4, y4) {
    //console.log(x1 +", "+  x2 +", "+ y1 +", "+ y2 +", "+ x3 +", "+ x4 +", "+ y3 +", "+ y4);
    return (x1 <= x3 && x2 > x3 || x1 >= x3 && x1 <= x4) && (y1 <= y3 && y2 > y3 || y1 >= y3 && y1 <= y4);
  }

  handleTick(event) {

    if (this.gameOver) {
      this.stage.update();
      //console.log("is Over");
    } else if (!event.paused) {
      //console.log("TIK not paused");
      //wykrywanie trafienia torpedą
      if (this.boat.isGo) {
        let x3 = this.boat.getX();
        let y3 = this.boat.getY();
        let x4 = x3 + this.boat.getWidth();
        let y4 = y3 + this.boat.getHeight();
        for (let i = 0; i < this.uboat.torps.length; i++) {
          if (this.uboat.torps[i].isGo) {
            let x1 = this.uboat.torps[i].getX();
            let y1 = this.uboat.torps[i].getY();
            let x2 = x1 + this.uboat.torps[i].getWidth();
            let y2 = y1 + this.uboat.torps[i].getHeight();

            if (this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)) {
              this.boat.destroyed();
              this.score += 10;
            }
          }
        }
      }

      //trafienie ubota
      let x3 = this.uboat.getX();
      let y3 = this.uboat.getY();
      let x4 = x3 + this.uboat.getWidth();
      let y4 = y3 + this.uboat.getHeight();
      for (let i = 0; i < this.boat.bars.length; i++) {
        if (this.boat.bars[i].isGo) {
          let x1 = this.boat.bars[i].getX();
          let y1 = this.boat.bars[i].getY();
          let x2 = x1 + this.boat.bars[i].getWidth();
          let y2 = y1 + this.boat.bars[i].getHeight();

          if (this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)) {
            this.mkGameOver();
            //console.log("bomb destroyed uboot");
          }
        }
      }
      if (this.plane.mine.isGo) {
        let x1 = this.plane.mine.getX();
        let y1 = this.plane.mine.getY();
        let x2 = x1 + this.plane.mine.getWidth();
        let y2 = y1 + this.plane.mine.getHeight();
        if (this.checkColision(x1, y1, x2, y2, x3, y3, x4, y4)) {
          this.mkGameOver();
          //console.log("mine hit ubot")
        }
      }

      this.text.text = "Score: " + (this.score - this.uboat.getNumberOfFires());
      this.boat.refresh(1);
      this.uboat.refresh(1);
      this.plane.refresh(1);
      this.stage.update();
    }
  }

  mkGameOver() {
    this.uboat.destroyed();
    let over = new createjs.Text("Game Over!", "60px sans bold", "#ffffff");
    let s = over.getBounds();
    //console.log(s.width + " - " + s.height);
    over.x = Math.floor((this.w - s.width) / 2);
    over.y = Math.floor((this.h - s.height) / 2);
    this.stage.addChild(over);

    this.plane.mine.image.visible = false;
    for (let i = 0; i < this.boat.bars.length; i++) {
      this.boat.bars[i].image.visible = false;
    }

    this.gameOver = true;
  }
}

var main = new Main();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Barrel {
  constructor(nr, cy) {
    this.nr = nr;
    this.x = 0;
    this.y = 0;
    this.cy = cy;
    this.image = new createjs.Bitmap("files/barrel.png");
    this.image.visible = false;
    this.dy = 3.2;
    this.isGo = false;
    // console.log(this.image.image.width + " x " + this.image.image.height);
  }

  drop(X, Y) {
    //console.log("s Barrel was droped! " + this.nr);
    this.x = X;
    this.y = Y;
    this.image.x = Math.floor(this.x);
    this.image.y = Math.floor(this.y);
    this.image.visible = true;
    this.isGo = true;
    this.playSound();
    //console.log("e Barrel was droped! " + this.nr);
  }

  playSound() {
    var instance = createjs.Sound.play("barrel");
    //instance.on("complete", this.handleComplete, this);
    instance.volume = 0.3;
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.image.image.width;
  }
  getHeight() {
    return this.image.image.height;
  }

  refresh(time) {
    if (this.isGo) {
      this.y += this.dy;
      this.image.y = Math.floor(this.y);
      if (this.y > this.cy - 60) {
        this.image.visible = false;
        this.isGo = false;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Barrel;


/***/ })
/******/ ]);