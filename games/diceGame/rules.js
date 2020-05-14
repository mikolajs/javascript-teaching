
class Rules {
  constructor(dices){
    this.dices = dices;
    this.numbers = [0,0,0,0,0,0];
  }
  checkEyes(n){
    let sum = 0;
    for(let i in this.dices){
      if(this.dices[i] == n) {
        sum += this.dices[i];
      }
      //  console.log("i = " + i + " dic: " + this.dices[i] + " , sum = " + sum);
    }
    return sum;
  }
  //// TODO: implement methods for extra checks

  checkSum(){
    let sum = 0;
    for(let i in this.dices){
      sum += this.dices[i];
    }
    return sum;
  }

  checkThree(){
    this._count();
    for(let i in this.numbers){
      if(this.numbers[i] >= 3) return this.checkSum();
    }
    return 0;
  }

  checkFour(){
    this._count();
    for(let i in this.numbers){
      if(this.numbers[i] >= 4) return this.checkSum();
    }
    return 0;
  }

  checkFive(){
    this._count();
    for(let i in this.numbers){
      if(this.numbers[i] >= 5) return 50;
      }
    return 0;
  }

  checkFull(){
    this._count();
    let zeros = 0;
    for(let i in this.numbers){
      if(this.numbers[i] == 0) zeros++;
    }
    if(zeros == 4) return 25;
    return 0;
  }
  checkBigStrit(){
    let s = this.lengthStrit();
    if(s >= 5) return 40;
    else return 0;
  }
  checkSmallStrit(){
    let s = this.lengthStrit();
    if(s >= 4) return 30;
    else return 0;
  }

  lengthStrit(){
    this._count();
    let l = 1;
    let m = 1;
    for(let i = 1; i < this.numbers.length; i++){
      if(this.numbers[i] > 0) {
        l++;
        if(l > m) m = l;
      } else l = 1;
    }
    return m;
  }

  _count(){
    for(let i in this.numbers) this.numbers[i] = 0;
    for(let i in this.dices) this.numbers[this.dices[i] - 1]++;
  }

}
