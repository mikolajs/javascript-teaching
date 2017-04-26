
var units = [];


function Unit(obj, x, y) {
  this.obj = obj;
  this.x = x;
  this.y = y;
  this.setPosition = function() {
    var X = this.x*100 + 50;
    if(this.y % 2 == 1) X += 50;
    this.obj.setPosition(X ,this.y*75 + 50);
  };
  this.setPosition();
  this.setHex = function (point){
    this.x = point.x;
    this.y = point.y;
    //console.log("hex: " + this.x + ", " + this.y);
    this.setPosition();
  }
}


function UnitsMap(x, y){
  this.map = new Array(x);
  for(var i = 0; i < x; i++){
    this.map[i] = new Array(y);
  }

  this.setUnit = function(obj, point) {
    //village
    if(point.x == 4 && point.y == 3) return false;
    if(this.map[point.x][point.y] != null) {
      this.map[point.x][point.y] = obj;
      return true;
    } else {
      return false
    }
  }
}
