class Gra {
  constructor(){
    this.zycie = new Zycie();
    let type = 'WebGL';
    this.kol = 20;
    this.wier = 12;
    this.pokolenie = 1;
    document.getElementById('pokolenie').value = 1;
    if(!PIXI.utils.isWebGLSupported()){type = 'canvas';}
    PIXI.utils.sayHello(type);
    this.app = new PIXI.Application({
      width: this.kol*30, height: this.wier*30, backgroundColor: 0x33ef33
    });
    document.getElementById('lewa').appendChild(this.app.view);
    this.X = PIXI.Texture.from('./X.png');
    this.E = PIXI.Texture.from('./E.png');
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.plansza = new Array(240).fill('.');
    this.planszaDuszki = new Array(240).fill('');
    this._wyswietl();
  }
  start(){
    this._wyswietl();
    this.pokolenie = 1;
    for(let i = 0; i < 240; i++) this.plansza[i] = '.';
    document.getElementById('pokolenie').value = 1;
  }
  nastepne(){
    if(this.pokolenie == 1){
      this.zycie.pierwszePokolenie(this._przeslij());
    }
    this.pokolenie++;
    this.zycie.nastepnePokolenie();
    document.getElementById('pokolenie').value = this.pokolenie;
    let str = this.zycie.drukuj();
    this._odswiez(str);
  }
  _wyswietl(){
    this.container.removeChildren(0, this.container.children.length);
    for(let i = 0; i < this.wier; i++){
      for(let j = 0; j < this.kol; j++){
        let e = i*this.kol + j;
        let sprite = new PIXI.Sprite(this.E);
        sprite.x = 1+j*30;
        sprite.y = 1+i*30;
        sprite.on('click', () => {
            if(this.pokolenie == 1) this._zmien(e);
        });
        sprite.interactive = true;
        sprite.buttonMode = true;
        this.planszaDuszki[e] = sprite;

        this.container.addChild(sprite);
      }
    }
  }
  _zmien(e){
    if(this.plansza[e] == '.'){
      this.plansza[e] = 'X';
      this.planszaDuszki[e].texture = this.X;
    } else {
      this.plansza[e] = '.';
      this.planszaDuszki[e].texture = this.E;
    }
  }
  _przeslij(){
    let str = '';
    for(let i = 0; i < 240; i++){
      if(i != 0 && i % this.kol == 0) str += '\n';
      str += this.plansza[i];
    }
    return str;
  }
  _odswiez(str){
    let linie = str.split('\n');
    for(let i = 0; i < this.kol; i++){
      for(let j = 0; j < this.wier; j++){
        let e = j*this.kol+i;
        if(linie[j][i] != this.plansza[e]){
          this._zmien(e);
        }
      }
    }
  }
}
