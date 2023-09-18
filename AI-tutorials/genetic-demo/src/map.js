class MapWorld {
  constructor(grid, Rows, Cols, container, resources) {
    this.grid = grid;
    this.container = container;
    this.resources = resources;
    //let worldsMap = new WorldMap();
    //this.drawMap(worldsMap.worldTiles);
    this.worldData = new TheWorld();
    //this._animationTextures();
    while (!this.worldData.loaded) {
      console.log("waiting");
    }
    //X columns Y rows
    this.Col = this.worldData.Col;
    this.Row = this.worldData.Row;
    this.showCol = Cols; //size of showed tiles 
    this.showRow = Rows; //size of showed tiles
    //console.log(this.Col + " and " + this.Row);
    this.startCol = 0;
    this.startRow = 0;
    this.showIndexes = false;
    //console.log(this.deerTexture);
    this.drawMap();//chaange to drawMapTimeout
    //this.grid.drawHexGrid();
    let self = this;
    document.querySelector('#indexes').onclick = () =>{
      self.showIndexes = !self.showIndexes;
      self.drawMap();
    };
  }

  drawMapTimeout() {
    if (!this.worldData.loaded) {
      window.setTimeout(() => { this.drawMapTimeout(); }, 2000);
      console.log("waiting next 2 seconds");
      return;
    }
    this.drawMap();
  }

  //// TODO: Implement
  drawMap() {
    //// TODO: Change direction x and y (must be the same as in worldmap test())
    // console.log(resources);
    this.container.removeChildren(0, this.container.children.length);
    let startRow = this.startRow;
    let startCol = this.startCol;
    if(this.showIndexes) {
      this.grid.drawHexGrid();
      this.grid.drawPointIndexes(startRow, startCol);
    } else this.grid.drawHexGrid();
    /// TODO: must add delete sprite from containder before add new sprites
    //console.log('start row %d start col %d', startRow, startCol);
    let tile = '';
    //console.log(this.worldData.worldTiles.length);
    for (let i = 0; i < this.showRow; i++) {
      for (let j = 0; j < this.showCol; j++) {
        tile = this.worldData.worldTiles[startRow + i][startCol + j];
        //console.log(tile);
        const sprite = new PIXI.Sprite(this._getTileTexture(tile));
        sprite.anchor.set(0.5);
        sprite.scale.x = 0.5;
        sprite.scale.y = 0.5;
        const p = this.grid.getCenterOfPoolInPixels(j, i);
        sprite.x = p.x;
        sprite.y = p.y;
        this.container.addChild(sprite);
        //console.log("Title added at " + i + "," + j);
        //console.log(p);
        tile = this.worldData.plants[startRow + i][startCol + j];
        //console.log(tile);
        if (tile != '' && tile != 'gr') {
          const plantSprite = new PIXI.Sprite(this._getTileTexture(tile));
          plantSprite.anchor.set(0.5);
          plantSprite.scale.x = 0.5;
          plantSprite.scale.y = 0.5;
          plantSprite.x = p.x;
          plantSprite.y = p.y;
          this.container.addChild(plantSprite);

        }
        /*
        tile = this.worldData.worldObjects[startY + i][startX + j];
        if (tile == '') continue;
        console.log(tile + " w maps");
        const objSprite = new PIXI.Sprite(this._getTileTexture(tile));
        objSprite.anchor.set(0.5);
        objSprite.scale.x = 0.5;
        objSprite.scale.y = 0.5;
        objSprite.x = p.x;
        objSprite.y = p.y;
        this.container.addChild(objSprite);
        */
      }
    }
    for (let animal of this.worldData.animals) {
      if (animal.Col >= startCol && animal.Col < this.showCol + startCol &&
        animal.Row >= startRow && animal.Row < this.showRow + startRow) {
        const p = this.grid.getCenterOfPoolInPixels(animal.Col-startCol, animal.Row-startRow);
        //console.log(this.resources['deer_e']);
        //const animatedSprite = new PIXI.AnimatedSprite(this.resources['deer_i'].spritesheet.animations['idle']);
        //animal.setCenter(p);
        //animal.setAnimationSprite(animatedSprite);
        let allSprites = animal.createAnimationHerd(this.resources, p);
        //console.log('deers sprites %d', allSprites.length);
        for(let i in allSprites){
          this.container.addChild(allSprites[i]);
          allSprites[i].gotoAndPlay(i*2);
        }
      }
    }
  }

  drawGridIndexes(){
    this.grid.drawGridIndexes(this.startRow, this.startCol);
  }

  scrollUp(step) {
    if (step % 2 != 0) step++;
    //console.log('STEP: ' + step);
    if (this.startRow >= step) this.startRow -= step;
    else this.startRow = 0;
    this.drawMap();
  }

  scrollDown(step) {
    if (step % 2 != 0) step++;
    //console.log('STEP: ' + step);
    if (this.startRow <= this.Row - this.showRow - step) this.startRow += step;
    else this.startRow = this.Row - this.showRow;
    this.drawMap();
  }
  scrollLeft(step) {
    if (step % 2 != 0) step++;
    //console.log('STEP: ' + step);
    if (this.startCol >= step) this.startCol -= step;
    else this.startCol = 0;
    this.drawMap();
  }
  scrollRight(step) {
    if (step % 2 != 0) step++;
    //console.log('STEP: ' + step);
    if (this.startCol <= this.Col - this.showCol - step) this.startCol += step;
    else this.startCol = this.Col - this.showCol;
    this.drawMap();
  }

  _getTileTexture(tile) {
    if (tile == 'pl') return this.resources.p.texture;
    else if (tile == 'wd') return this.resources.w.texture;
    else if (tile == 'hi') return this.resources.h.texture;
    else if (tile == 'mo') return this.resources.m.texture;
    else if (tile == 'st') return this.resources.s.texture;
    else if (tile == 'fd') return this.resources.f.texture;
    else if (tile == 'hu') return this.resources.u.texture;
    else if (tile == 'ol') return this.resources.ol.texture;
    else if (tile == 'om') return this.resources.om.texture;
    else if (tile == 'os') return this.resources.os.texture;
    else if (tile == 'oe') return this.resources.oe.texture;
    else if (tile == 'oc') return this.resources.oc.texture;
    else if (tile == 'ov') return this.resources.ov.texture;
    else if (tile == 'og') return this.resources.og.texture;
    else if (tile == 'ua') return this.resources.ua.texture;
    else if (tile == 'us') return this.resources.us.texture;
    else if (tile == 'uc') return this.resources.uc.texture;
    else if (tile == 'ow') return this.resources.ow.texture;
    else if (tile == 'bl') return this.resources.bl.texture;
    else if (tile == 'bm') return this.resources.bm.texture;
    else if (tile == 'bs') return this.resources.bs.texture;
    else if (tile == 'dl') return this.resources.dl.texture;
    else if (tile == 'dm') return this.resources.dm.texture;
    else if (tile == 'ds') return this.resources.ds.texture;
    else if (tile == 'sl') return this.resources.sl.texture;
    else if (tile == 'sm') return this.resources.sm.texture;
    else if (tile == 'ss') return this.resources.ss.texture;
    else return this.resources.p.texture;

  }

  _twoCiphers(n) {
    if(n > 9) return n.toString();
    else return '0'+n.toString();
  }

  _animationTextures(){
    this.deerTexture = [];
    let dirs = ['e', 'ne', 'nw', 'se', 'sw', 'w'];

    for(let d of dirs){
        this.deerTexture[d] = [];
        let n = ('deer_' + d);
        console.log(n);
        this.deerTexture[d].push(this.resources[n.toString()].spritesheet);
        console.log(this.resources[n.toString()].spritesheet);
    }
  }


}
