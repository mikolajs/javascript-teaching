
class Main {
  constructor() {
    this.step = 0;
    let type = 'WebGl';
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    this.app = new PIXI.Application({
      background: '#020137',
      with: 800,
      heigh: 600
    });
    document.body.appendChild(this.app.view);
    
    const spark = PIXI.Sprite.from('img/spark.png');
    
    this.setup();
    this.stars = new Stars(40, 800, 600);
    this.app.stage.addChild(this.stars.getContainer());
    this.snow = new Snow(50, 800, 600);
    this.app.stage.addChild(this.snow.getContainer());
  }

  setup(){
    
    this.app.ticker.add((delta) => {
      this.step++;
      if(this.step % 2 == 1) this.snow.move(delta);
      if(this.step % 10 == 0) this.stars.makeRotation(delta);
  });
  }

}





