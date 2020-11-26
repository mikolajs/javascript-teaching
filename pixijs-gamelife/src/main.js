
class Main {
  constructor(){
   let type = "WebGL"
   if(!PIXI.utils.isWebGLSupported()){
     type = "canvas";
   }
   PIXI.utils.sayHello(type);
   this.X = 600;
   this.Y = 600;
   this.app = new PIXI.Application(
     {width: this.X, height: this.Y,  backgroundColor: 0xefefef, antialiasing: true});
   document.body.appendChild(this.app.view);
  }

  sizeElements(){
    let container = new PIXI.Container();
    // let eX = PIXI.Texture.from("img/X.png");
    // let eO = PIXI.Texture.from("img/O.png");
    // let eE = PIXI.Texture.from("img/E.png");
    // let img1 = PIXI.Sprite(eX);
    // let img2 = PIXI.Sprite(eO);
    // let img3 = PIXI.Sprite(eE);

    console.log("sizeElements 3 png" );
    var someImage = new Image();
    someImage.src = 'img/X_28.png';
    someImage.onload = function(){
      new PIXI.Texture(new PIXI.BaseTexture(someImage))
    }
    let img1 = PIXI.Sprite(someImage);
    container.addChild(img1);
    this.app.stage.addChild(container);
  }

  extra(){
    var dane = { "startX" : 90, "startY": 90 };
    //przestawnie po 20 wierszy i wysokości (pole mają 30 na 30)
    //przesuwanie od środka i po wpisanie x lub o przesuwasz pozycję.
    //nie można przwsuwać dane dalej niż 10 jeśli jest pustę.
    var arr = [
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "o", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ]
    //możesz dodać albo x albo o zależności od tego w kogo grasz pozycję.
    //przesuwani
    //val size = {200, 200}


  }


}
