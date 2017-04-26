var stage, canvas;
var time = 0;
var maxHerd = 5, minHerd = 20, splitHerd;
var map;
var village;
var unitsMap;
var herdholder;
var resources = {wool: 0, meat: 0, milk: 0}

var day = 5;
var hour = 30; //frames
var days = 0;
var started = false;

function start(){
  maxHerd = parseInt(document.getElementById('numHerds').value);
  herdholder = new HerdHolder(50);
  herdholder.maxHerds = maxHerd;
  herdholder.manageHerd();
  herdholder.displayHerds();
  days = 0;
  started = true;
}

function init(){
    map = new Map(8,7);
    //canvas = document.getElementById("demoCanvas")
    stage = new createjs.Stage("demoCanvas");
    var w = stage.canvas.width;
    var h = stage.canvas.height;
    unitsMap = new UnitsMap(8,7);
    var back = new createjs.Shape();
    back.graphics.beginFill("#444444");
    back.graphics.drawRect(0, 0, w, h);
    stage.addChild(back);

  map.fillCanvasWithMap(true);
  village = new createjs.Bitmap("img/village.png");
  var p = map.getPosition(3,3);
  map.setOccupied(new Point(3,3));
  village.x = p.x - 50;
  village.y = p.y - 50;
  stage.addChild(village);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);
  stage.update();
}

function handleTick(event) {
  if (!event.paused && started) {
    if(days <= 30) {

      time += 1;
      if(time % hour == 0) {
        herdholder.mkEat();
        herdholder.displayHerds();
      }
      if(time == day*hour ){
        map.grow();
        map.fillCanvasWithMap(false);
        herdholder.manageHerd();
        updateResourcesInfo();
        time = 0;
        days++;
      }
      stage.update();
    }
    if(days == 31) {
      countScore();
    }
  }
}

function updateResourcesInfo() {
  var res = herdholder.getResources();
  document.getElementById('milk').innerHTML = res.milk;
  document.getElementById('meat').innerHTML = res.meat;
  document.getElementById('wool').innerHTML = res.wool;
  document.getElementById('sheep').innerHTML = res.count;
  document.getElementById('days').innerHTML = days;
}

function countScore(){
  var res = herdholder.getResources();
  var score = Math.round(res.milk*0.1 + res.wool*0.3 + res.meat*0.2);
  document.getElementById('score').innerHTML = 'Twój wynik to: '+ score;
  document.getElementById('score').style.display = "inline";
}
