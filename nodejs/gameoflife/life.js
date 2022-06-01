

//exports.Life = function() {
//  return new Life();
//}

class Life {
  constructor(){
    this.day = 1;
    this.rows = 12;
    this.cols = 20;
    this.generations = '';
    this.arr = Array(12).fill(0).map(a => Array(20).fill('.'));
    this.arrNext = Array(12).fill(0).map(a => Array(20).fill('.'));
  }

  setFirstDay(data){
    this.day = 1;
    let line = data.split('\n');
    for(let i = 0; i < 12; i++){
    //console.log(line[i]);
      for(let j = 0; j < 20; j++){
      //console.log(line[i][j]);
        if(line[i][j] == 'X') {
          this.arr[i][j] = 'X';
        //console.log('found X: ' + i + ', ' + j);
        } else this.arr[i][j] = '.';
      }
    }
    this.generations = this._makeString(this.arr);
  //console.log(this.generations);
  }

  getHistory(){
    return this.generations;
  }

  nextGeneration(){
    this.day += 1;
    //for(let i = 0; i < 12; i++) console.log(this.arr[i].join('').toString());
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        let n = this._howManyNeighbours(this.arr, i, j);
        if(this.arr[i][j] == 'X'){
          if(n != 2 && n != 3) this.arrNext[i][j] = '.';
          else this.arrNext[i][j] = 'X';
        } else {
          if(n == 3) this.arrNext[i][j] = 'X';
          else this.arrNext[i][j] = '.';
        }
      }
    }
    this.generations += this._makeString(this.arrNext);
    let tmpArr = this.arr;
    this.arr = this.arrNext;
    this.arrNext = tmpArr;
  }

  getNumberOfLifes(){
    let n = 0;
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(this.arr[i][j] == 'X') n++;
      }
    }
    return n;
  }

  getLifeString(){
    return this._makeString(this.arr);
  }

  getNumberOfNeighbours(row, col){
    return this._howManyNeighbours(this.arr, row, col);
  }

  ganerationNotChange(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(this.arr[i][j] != this.arrNext[i][j]) return false;
      }
    }
    return true;
  }

  _makeString(arr){
    let str = 'dzień: ' + this.day + "\n";
    for(let i = 0; i < 12; i++) str += arr[i].join('') + '\n';
    return str;
  }

  _howManyNeighbours(arr, row, col){
    let nr = 0;
    let R = 0;
    let C = 0;
    for(let r = -1; r <= 1; r++){
      for(let c = -1; c <= 1; c++){
        if(r == 0 && c == 0) continue;

        R = row + r;
        C = col + c;
        if(R == 12) R = 0;
        else if(R  == -1) R = 11;
        if(C == 20) C = 0;
        else if(C == -1) C = 19;
        if(arr[R][C] == 'X') nr += 1;

      }
    }
    // console.log('elem: ' + arr[row][col] + ' in: ' + row + ', ' + col + ' have neighbours '  + nr );
    return nr;
  }

}
