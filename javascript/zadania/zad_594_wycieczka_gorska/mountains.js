
class Mountains {
  constructor(array, W, H){
    this.array = array;
    this.w = W;
    this.h = H;
  }

  draw(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(90, 90, 90)';
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(this.array[0][0], this.h - this.array[0][1]);
    for(let i = 1; i < this.array.length; i++){
      ctx.lineTo(this.array[i][0], this.h - this.array[i][1]);
    }
    ctx.lineTo(this.w,this.h);
    ctx.lineTo(0,this.h);
    ctx.lineTo(0,this.h/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  }
  ropeway(k){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgb(200, 30, 30)';
    ctx.lineWidth = 5;
    ctx.moveTo(this.array[k][0], 300);
    ctx.lineTo(this.array[k][0], this.h - this.array[k][1]);
    ctx.stroke();
  }
}
