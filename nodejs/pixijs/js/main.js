
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

    const ground = PIXI.Sprite.from('img/ground.png');
    ground.x = 0;
    ground.y = 600;
    ground.anchor.set(0, 1);
    this.app.stage.addChild(ground);

    const tree = PIXI.Sprite.from('img/tree.png');
    tree.x = 400;
    tree.y = 600;
    tree.anchor.set(0.5, 1);
    this.app.stage.addChild(tree);
    
    this.setup();
    this.stars = new Stars(40, 800, 600);
    this.app.stage.addChild(this.stars.getContainer());
    this.snow = new Snow(50, 800, 600);
    this.app.stage.addChild(this.snow.getContainer());
    this.rabbit = new Rabbit(800, 600, this);
    this.moveRabbit = false;
    this.snowmantime = 0;
    this.snowman = new Snowman(800, 600, this);
    this.app.stage.eventMode = 'static';
    this.app.stage.cursor = 'pointer';
    //let self = this;
    this.app.stage.on('pointerdown', () =>{
      if(this.moveRabbit == false){
        this.rabbit.setZero();
        this.moveRabbit = true;
      }
    }); 
  }

  insertAnimation(anim){
    this.app.stage.addChild(anim);
    anim.play();
  }

  setup(){
    
    this.app.ticker.add((delta) => {
      this.step++;
      if(this.step % 2 == 1) this.snow.move(delta);
      if(this.step % 10 == 0) this.stars.makeRotation(delta);
      if(this.moveRabbit) this.rabbit.move(delta);
      if(this.snowman.animateSnowman) {
        this.snowman.anim.play();
      } else {
        this.snowmantime += delta;
        if(this.snowmantime > 10000){
          this.snowman.animateSnowman = false;
          this.snowman.anim.stop();

        }
      }
    });
  }

}

