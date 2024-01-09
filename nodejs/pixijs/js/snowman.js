class Snowman {
  constructor(W, H, main){
    this.W = W;
    this.H = H;
    this.anim;
    this.main = main;
    this.animateSnowman = false;
    const animatedRabbit =  PIXI.Assets.load('img/snowman.json').then(
      (rabbitSheet) => {
        const frames = [];
        for(let i = 1; i <= 5; i++){
          frames.push(PIXI.Texture.from(`snowman${i}.png`));
        }
        this.anim = new PIXI.AnimatedSprite(frames);
        this.anim.x = this.W - 200;
      this.anim.y = this.H - 50;
      this.anim.anchor.set(0, 1);
      this.anim.animationSpeed = 0.01;
      main.insertAnimation(this.anim);
      this.anim.eventMode = 'static';
      this.anim.cursor = 'pointer';
      //let self = this;
      this.anim.on('pointerdown', () =>{
        if(this.animateSnowman == false){
          this.animateSnowman = true;
        }
      }); 
      });
      
  }
  getAnimation() { return this.anim; }
}