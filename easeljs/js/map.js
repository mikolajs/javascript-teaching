function Map(x,y) {
  this.maxGrass = 200;
  this.dividerGrass = 51;
  this.hexs = [];
  this.x = x;
  this.y = y;
  this.hexs[3] = new createjs.Bitmap("img/hex_full_grass.png");
  this.hexs[2] = new createjs.Bitmap("img/hex_semi1_grass.png");
  this.hexs[1] = new createjs.Bitmap("img/hex_semi2_grass.png");
  this.hexs[0] = new createjs.Bitmap("img/hex_no_grass.png");
  this.occupation = new Array(this.y);
  for(var i = 0; i < this.y; i++) {
    this.occupation[i] = new Array(this.x);
    for(var j = 0; j < this.x; j++){
      this.occupation[i][j] = false;
    }
  }

  this.grass = new Array(this.y);
  for(var i = 0; i < this.y; i++) {
    this.grass[i] = new Array(this.x);
    for(var j = 0; j < this.x; j++){
      this.grass[i][j] = this.maxGrass;
    }
  }
  this.tiles = new Array(this.y);
  for(var i = 0; i < this.y; i++) {
    this.tiles[i] = new Array(this.x);
    for(var j = 0; j < this.x; j++){
      this.tiles[i][j] = this.hexs[Math.floor(this.grass[i][j] / this.dividerGrass)].clone();
      this.tiles[i][j].name = "(" + i + "," + j + ")";

      this.tiles[i][j].on("click", function(evt) {
        document.getElementById('tileInfo').innerHTML =
        "HEX: " + evt.target.name + " stageX: " + evt.stageX + " stageY: " + evt.stageY;
      });
    }
  }

  this.grow = function() {
    for(var i = 0; i < this.y; i++) {
      for(var j = 0; j < this.x; j++){
        this.grass[i][j] += 10;
        if( this.grass[i][j] > this.maxGrass) this.grass[i][j] = this.maxGrass;
        this.tiles[i][j].image =
        this.hexs[Math.floor(this.grass[i][j] / this.dividerGrass)].image;
      }
    }
  };

  this.isClicked = function(event) {
    console.log("pool is clicked with grass: ");
  }

  this.fillCanvasWithMap = function(first) {
    //console.log(map);
    for(var i = 0; i < this.y; i++) {
      for(var j = 0; j < this.x; j++){
       //console.log("i " + i + " j " + j + " = " + map[i][j]);
      // if(j == this.x - 1 && i % 2 == 1) break;
       var h = this.tiles[i][j];
        h.y = i * 75;
        if(i % 2 == 0) {
          h.x = j * 100;
        } else {
          h.x = j * 100 + 50;
        }
        if(first) stage.addChild(h);
      }
    }
  };
  this.eatGrass = function(demand, point) {
    var amount = this.grass[point.y][point.x];
    if(amount > demand) {
      this.grass[point.y][point.x] -= demand;
    } else {
        this.grass[point.y][point.x] = 0;
    }
    this.tiles[point.y][point.x].image =
      this.hexs[Math.floor(this.grass[point.y][point.x] / this.dividerGrass)].image;
    return amount;
  };

  this.lookForGrass_old = function() {
    var maxP = new Point(3,3);
    var maxGrass = 0;
    var tmpAmount;
    var tmpPoint = new Point(0,0);
    for(var i = 0; i < 7; i++) {
      for(var j = 0; j < 8; j++) {
        tmpPoint.y = i;
        tmpPoint.x = j;
        tmpAmount = map.getAmountGrass(tmpPoint);
        if(maxGrass < tmpAmount && !map.isOccupied(tmpPoint) ) {
          maxGrass = tmpAmount;
          maxP.x = tmpPoint.x;
          maxP.y = tmpPoint.y;
          if(maxGrass > 380) {
            this.setOccupied(maxP);
            return maxP;
          }
        }
      }
    }
    this.setOccupied(maxP);
    return maxP;
  }
/*
 start w miejscu gdzie znajduje się owca. Szuka pola w określonym promieniu.
 gdy znajdzie wystarczającą ilość trawy zwraca ją, jeśli nie szuka
 maksymalną ilość trawy zwraca punkt i go zajmuje.
*/
  this.lookForGrass = function(point, need) {
    if(point == null) point = new Point(3,3);
    if(need == undefined) need = 80;
    var size = 4;

    var mPoint = new Point(point.x, point.y);
    var maxGrass = 0;
    var tmpAmount;
    var tmpPoint = new Point(0,0);
    for(var z = - size; z <= size; z += 1){
        for(var y = - size; y <= size; y += 1 ) {
          for(var x = -size; x <= size; x++){
            var c = point.x + x + Math.round((x - (z&1)) / 2);
            var r = point.y + z;
            if(c == point.x && r == point.y) continue;
            if(c < 0 || r < 0 || c > this.x -1 || r > this.y - 1) continue;
            tmpPoint.y = r;
            tmpPoint.x = c;
            tmpAmount = map.getAmountGrass(tmpPoint);
            if(maxGrass < tmpAmount && !map.isOccupied(tmpPoint) ) {
              maxGrass = tmpAmount;
              mPoint.x = tmpPoint.x;
              mPoint.y = tmpPoint.y;
              if(maxGrass > need) {
                this.setOccupied(mPoint);
                return mPoint;
              }
            }
          }
        }
      }
      this.setOccupied(mPoint);
      return mPoint;
  }

  this.getAmountGrass = function(point){
    return this.grass[point.y][point.x];
  };

  this.getPosition = function(x, y) {
    var X = x*100 + 50;
    if(y % 2 == 1) X += 50;
    return new Point(X ,y*75 + 50);
  };

  this.isOccupied = function(point){
    return this.occupation[point.y][point.x];
  }
  this.setOccupied = function(point){
    this.occupation[point.y][point.x] = true;
  }
  this.freeOccupied = function(point){
    this.occupation[point.y][point.x] = false;
  }
};

function Point(x, y)  {this.x =  x; this.y = y;};

