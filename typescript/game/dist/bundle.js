!function(t){var e={};function i(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(1);!function(){function t(){var t=this;this.handleImageLoad=function(e){console.log("Read Bitmap"),t.mkBackground()},this.tick=function(e){t.stage.update(event)},this.X=1200,this.Y=800,this.stage=new createjs.Stage("gameCanvas"),this.background=new createjs.Shape,this.imageBackground=new Image,this.imageBackground.src="water.jpg",this.imageBackground.onload=this.handleImageLoad,this.handleImageLoad.bind(this),this.shipBitmap=new createjs.Bitmap("ship.png"),createjs.Ticker.addEventListener("tick",this.tick),this.map=new n.default(50),this.shipX=Math.floor(Math.random()*this.map.x),this.shipY=Math.floor(Math.random()*this.map.y),this.shipBitmap.x=50*this.shipX+25,this.shipBitmap.y=50*this.shipY+25,this.stage.addChild(this.shipBitmap),this.stage.update()}t.prototype.mkBackground=function(){this.background.graphics.beginBitmapFill(this.imageBackground,"repeat").drawRect(0,0,this.X,this.Y),this.background.x=0,this.background.y=0,this.stage.addChild(this.background),this.stage.update()}}()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.tileSize=t,this.x=24,this.y=16,this.map=new Array[this.x][this.y];for(var e=0;e<this.x;e++)for(var i=0;i<this.y;i++)this.map[e][i]=!1;this.mineBitmap=new createjs.Bitmap("mine.png")}return t.prototype.setMine=function(t,e,i){this.map[t][e]=!0;var n=this.mineBitmap.clone();n.x=t*this.tileSize+.5*this.tileSize,n.y=e*this.tileSize+.5*this.tileSize,i.addChild(n)},t}();e.default=n}]);