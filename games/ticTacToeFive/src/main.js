

class Main {
 constructor(){
   let type = "WebGL"
   if(!PIXI.utils.isWebGLSupported()){
     type = "canvas";
   }
   PIXI.utils.sayHello(type);
   this.X = 1200;
   this.Y = 605 + this.X / 120;
   this.unitSize = this.X / 100;
   this.app = new PIXI.Application(
     {width: this.X, height: this.Y,  backgroundColor: 0xefefef, antialiasing: true});
   document.body.appendChild(this.app.view);
   this.mapContainer = new PIXI.Container();
   this.gridContainer = new PIXI.Container();
   this.app.loader.add(
        [{"name":"w", "url": "img/water_120x72.png"},
        {"name":'h', "url":"img/hill_120x72.png"},
        {"name":"p", "url":"img/plain_120x72.png"},
        {"name":'m', "url":"img/mountain_120x72.png"}
      ]);
      let self = this;
    this.app.loader.load((loader, resources) => {
      self.setup(self, resources);
    });


 }

 onClick(event, grid) {
    let x = event.data.global.x;
    let y = event.data.global.y;
    console.log( x + ", " + y);
    console.log(grid.getPoolClicked(x, y));
 }

 setup(self, resources){
   console.log("SETUP");
   self.app.stage.addChild(self.gridContainer);
    self.grid = new Grid(self.unitSize, 10, 10, self.gridContainer);
    self.app.renderer.plugins.interaction.on('pointerup', (event) => {
     self.onClick(event, self.grid);
    });

   self.app.stage.addChild(self.mapContainer);
   self.mapWorld = new MapWorld(self.grid, 10, 10, self.mapContainer, resources);
 }
}
