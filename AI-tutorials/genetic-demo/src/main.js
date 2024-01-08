

class Main {
  constructor() {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    this.X = 1232;
    this.Y = 608;
    this.unitSize = 6;
    this.app = new PIXI.Application(
      { width: this.X, height: this.Y, backgroundColor: 0x0a0a0a, antialiasing: true });
    document.body.appendChild(this.app.view);
    this.mapContainer = new PIXI.Container();
    this.gridContainer = new PIXI.Container();
    this.app.loader.add(
      [{ "name": "w", "url": "img/water_120x72.png" },
      { "name": 'h', "url": "img/hill_120x72.png" },
      { "name": "p", "url": "img/plain_120x72.png" },
      { "name": 'm', "url": "img/mountain_120x72.png" },
      { "name": "s", "url": "img/steppe_120x72.png" },
      { "name": "f", "url": "img/ford_120x72.png" },
      { "name": "u", "url": "img/humus_120x72.png" },
      { "name": 'oc', "url": "img/corn_120x72.png" },
      { "name": 'ov', "url": "img/village.png" },
      { "name": 'ol', "url": "img/forest_l.png" },
      { "name": 'om', "url": "img/forest_m.png" },
      { "name": 'os', "url": "img/forest_s.png" },
      { "name": 'oe', "url": "img/forest_e.png" },
      { "name": 'og', "url": "img/mine_new_c.png" },
      { "name": 'ow', "url": "img/grapes.png" },
      { "name": 'ua', "url": "img/arkebusers.png" },
      { "name": 'uc', "url": "img/cows.png" },
      { "name": 'us', "url": "img/ship.png" },
      { "name": 'bs', "url": "img/bisons_s.png" },
      { "name": 'bm', "url": "img/bisons_m.png" },
      { "name": 'bl', "url": "img/bisons_l.png" },
      { "name": 'ss', "url": "img/boar_s.png" },
      { "name": 'sm', "url": "img/boar_m.png" },
      { "name": 'sl', "url": "img/boar_l.png" }
      ]);
    this.app.loader.add(this._createDeer());
    let self = this;
    this.app.loader.load((loader, resources) => {
      self.setup(self, resources);
    });

    this.mouseRightStartX = 0;
    this.mouseRightStartY = 0;
    this.mouseDown = false;
  }

  onClick(event, grid) {
    let x = event.data.global.x;
    let y = event.data.global.y;
    console.log(x + ", " + y);
    console.log(grid.getPoolClicked(x, y));
  }

  setup(self, resources) {
    console.log("SETUP");
    document.addEventListener('contextmenu', event => event.preventDefault());
    self.grid = new Grid(self.unitSize, 20, 20, self.gridContainer);
    self.app.renderer.plugins.interaction.on('mouseup', (event) => {
      self.onClick(event, self.grid);
    });
    self.app.renderer.plugins.interaction.on('rightdown', (event) => {
      //console.log('right down');
      self.mouseRightStartX = event.data.global.x;
      self.mouseRightStartY = event.data.global.y;
      self.mouseDown = true;
      event.stopPropagation();

    });
    self.app.renderer.plugins.interaction.on('rightup', (event) => {
      //console.log('right up');
      if (self.mouseDown) {
        //console.log('down in: ' + self.mouseRightStartX + "," + self.mouseRightStartY);
        //console.log('up in: ' + event.data.global.x + ', ' + event.data.global.y);
        let poolX = Math.floor((self.mouseRightStartX - event.data.global.x) / (self.Y / 10));
        let poolY = Math.floor((self.mouseRightStartY - event.data.global.y) / (self.Y / 10));
        if (poolX != 0) {
          if (poolX > 0) self.mkScrollRight(self, poolX);
          else self.mkScrollLeft(self, -poolX);
        }
        if (poolY != 0) {
          if (poolY > 0) self.mkScrollDown(self, poolY);
          else self.mkScrollUp(self, -poolY);
        }
      }
      self.mouseDown = false;
      event.stopPropagation();

    });
    self.app.stage.addChild(self.mapContainer);
    self.app.stage.addChild(self.gridContainer);
    self.mapWorld = new MapWorld(self.grid, 20, 20, self.mapContainer, resources);
    //self.scrollCover(self);
  }



  mkScrollUp(self, step) { self.mapWorld.scrollUp(step); }
  mkScrollDown(self, step) { self.mapWorld.scrollDown(step); }
  mkScrollLeft(self, step) { self.mapWorld.scrollLeft(step); }
  mkScrollRight(self, step) { self.mapWorld.scrollRight(step); }


  _createDeer() {
    let d = [];
    d.push({ 'name': 'deer_e', 'url': 'img/deer/deer_e.json' });
    d.push({ 'name': 'deer_ne', 'url': 'img/deer/deer_ne.json' });
    d.push({ 'name': 'deer_nw', 'url': 'img/deer/deer_nw.json' });
    d.push({ 'name': 'deer_se', 'url': 'img/deer/deer_se.json' });
    d.push({ 'name': 'deer_sw', 'url': 'img/deer/deer_sw.json' });
    d.push({ 'name': 'deer_w', 'url': 'img/deer/deer_w.json' });
    d.push({'name':'deer_i', 'url': 'img/deer/deer_i.json'});
    return d;
  }


}
