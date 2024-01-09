class Rabbit {
  constructor(W, H, main){
    this.W = W;
    this.H = H;
    this.anim;
    this.main = main;
    const animatedRabbit =  PIXI.Assets.load('img/rabbit.json').then(
      (rabbitSheet) => {
        const frames = [];
        for(let i = 1; i <= 17; i++){
          frames.push(PIXI.Texture.from(`rabbit${i}.png`));
        }
        this.anim = new PIXI.AnimatedSprite(frames);
        this.anim.x = -120;
      this.anim.y = this.H;
      this.anim.anchor.set(0, 1);
      this.anim.animationSpeed = 0.5;
      main.insertAnimation(this.anim);
      });
      
  }
  getAnimation() { return this.anim; }
  move(delta){
    if(this.anim.x < 900){
      this.anim.x += 5;
    } else {
      this.main.moveRabbit = false;
    }
  }
  setZero(){
    this.anim.x = -120;
    this.anim.y = this.H;
  }
}