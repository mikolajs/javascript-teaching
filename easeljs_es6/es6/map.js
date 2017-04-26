
class Map {
  constructor(x, y) {
    const this.maxGrass = 200;
    this.dividerSheep = 51;
    this.hexs = [];
    this.x = x;
    this.y = y;
    this.hexs[3] = new createjs.Bitmap("files/hex_full_grass.png");
    this.hexs[2] = new createjs.Bitmap("files/hex_semi1_grass.png");
    this.hexs[1] = new createjs.Bitmap("files/hex_semi2_grass.png");
    this.hexs[0] = new createjs.Bitmap("files/hex_no_grass.png");
    this.occupation = new Array(this.y);
    for(let i = 0; i < this.x, i++){
      this.occupation[i] = new Array(this.x);
      for(let j = 0; j < this.x; j++){
        this.occupation[i][j] = false;
      }
    }
  }

}
