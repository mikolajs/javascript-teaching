
class Main {
  constructor() {
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
    const flake = PIXI.Sprite.from('img/snowflakesmall.png');
    //const flake = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
    this.setup(flake);
  }

  setup(flake){
    flake.anchor.set(0.5);
    flake.x = 400;
    flake.y = 0;
    this.app.stage.addChild(flake);
    this.app.ticker.add((delta) => {
      flake.y += 1;
      flake.x += (Math.random() - 0.5);
  });
  }

}





