class Rabbit {
  constructor(W, H, main){
    this.W = W;
    this.H = H;
    this.anim;
    const animatedRabbit =  PIXI.Assets.load('img/rabbit.json').then(
      (rabbitSheet) => {
        const frames = [];
        for(let i = 1; i <= 17; i++){
          frames.push(PIXI.Texture.from(`rabbit${i}.png`));
        }
        this.anim = new PIXI.AnimatedSprite(frames);
        this.anim.x = this.W/3;
      this.anim.y = this.H - 50;
      this.anim.anchor.set(0.5);
      this.anim.animationSpeed = 0.5;
      main.insertAnimation(this.anim);
      });
      
  }
  getAnimation() { return this.anim; }
}