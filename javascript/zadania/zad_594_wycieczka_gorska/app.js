
class Main {
  constructor(){
    this.w = 1200;
    this.h = 300;
    this.mkPeaksOfMountains();
    this._test();
    this.mountains = new Mountains(this.array, this.w, this.h);
  }

  draw(){ this.mountains.draw();}

  mkPeaksOfMountains(){
    this.array = [];
    let i = 1;
    let H = this.h/2;
    let W = 0;
    this.array.push([W,H]);
    for(i = 1;i < 100;i++){
      if(W >= this.w) break;
      const r = Math.floor(Math.random()*100);
      if(i % 2 == 1) H = 150 + r;
      else H = 150 - r;
      W += Math.abs(this.array[i-1][1] - H);
      if(W > this.w){
        const d = W - this.w;
        if(i % 2 == 1) H -= d;else H += d;
        W = this.w;
      }
      this.array.push([W, H]);
    }
  }

  A(){
    let way = 0;
    for(let i = 1; i < this.array.length; i++){
      let x = Math.abs(this.array[i][0] - this.array[i-1][0]);
      let y = Math.abs(this.array[i][1] - this.array[i-1][1]);
      way += Math.sqrt(x*x + y*y);
    }
    document.getElementById('way').innerHTML = Math.round(way*10) + " m";
  }

  B(){
    let maxH = 0;
    let k = 0
    for(let i = 1; i < this.array.length -1; i++){
        let h = this.array[i-1][1] + this.array[i][1] + this.array[i+1][1];
        let w = ((this.array[i+1][0] - this.array[i-1][0])/Math.cos(Math.PI/4))*20;
        console.log("i: " + i + " Suma wysokości: " + h + " długość: " + w);
        if(w <= 7000 && maxH < h)   {
          maxH = h;
          k = i;
        }
    }
    document.getElementById('maxH').innerHTML = Math.round(maxH) + " m";
    this.mountains.ropeway(k);
  }

  _test(){
    for(let a of this.array){
      console.log(a[0] + ", " + a[1]);
    }
    console.log("Cosinus 45°: " + Math.cos(Math.PI/4));
    console.log("Droga: " + (this.w/Math.cos(Math.PI/4))*10);
  }

}
