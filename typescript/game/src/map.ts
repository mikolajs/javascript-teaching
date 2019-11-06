/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />
class Map {
  x: number
  y: number
  tileSize : number
  map: boolean[][]
  mineBitmap: createjs.Bitmap


  constructor(tileSize: number) {
    this.tileSize = tileSize
    this.x = 24
    this.y = 16
    this.map = new Array[this.x][this.y]
    for (let i = 0; i < this.x; i++)
      for (let j = 0; j < this.y; j++)
        this.map[i][j] = false;

    this.mineBitmap = new createjs.Bitmap("mine.png")
  }

  setMine(x: number, y: number, stage: createjs.Stage) {
    this.map[x][y] = true
    var newMine = this.mineBitmap.clone()
    newMine.x = x*this.tileSize + 0.5*this.tileSize
    newMine.y = y*this.tileSize + 0.5*this.tileSize
    stage.addChild(newMine)
  }
}

export default Map
