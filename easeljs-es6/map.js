
class Map {
  x;
  y;
  tileSize;
  map;
  mineBitmap;

  constructor(x, y, tileSize) {
    this.tileSize = tileSize;
    this.x = x;
    this.y = y;
    this.map = Array(this.x).fill().map(() => (Array(this.y).fill(false)));
    this.mineBitmap = new createjs.Bitmap("mine.png");
  }

  setMine(x, y, stage) {
    this.map[x][y] = true;
    var newMine = this.mineBitmap.clone();
    newMine.x = x*this.tileSize + 0.5*this.tileSize;
    newMine.y = y*this.tileSize + 0.5*this.tileSize;
    stage.addChild(newMine);
  }
}
