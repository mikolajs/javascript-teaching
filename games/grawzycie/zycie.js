
// exports.Zycie = function(){
//   return new Zycie();
// }

class Zycie {
  constructor() {
    this.pokolenie = 1;
    this.rzedy = 12;
    this.kolumny = 20;
    this.tab1 = Array(this.rzedy).fill(0).map(a => Array(this.kolumny).fill('.'));
    this.tab2 = Array(this.rzedy).fill(0).map(a => Array(this.kolumny).fill('.'));
  }
  pierwszePokolenie(dane){
    let linia = dane.split('\n');
    for(let i = 0; i < this.rzedy; i++){
      for(let j = 0; j < this.kolumny; j++){
        if(linia[i][j] == 'X') this.tab1[i][j] = 'X';
        else this.tab1[i][j] = '.';
      }
    }
  }
  nastepnePokolenie(){
    for(let i = 0; i < this.rzedy; i++){
      for(let j = 0; j < this.kolumny; j++){
        let n = this._ileSasiadow(i, j);
        if(this.tab1[i][j] == 'X'){
          //console.log("sąsiedzi " + i + "," + j + " ilość: " + n);
          if(n != 2 && n != 3) this.tab2[i][j] = '.';
          else this.tab2[i][j] = 'X';
        } else {
          if(n == 3) this.tab2[i][j] = 'X';
          else this.tab2[i][j] = '.';
        }
      }
    }
    let tab = this.tab1;
    this.tab1 = this.tab2;
    this.tab2 = tab;
  }
  _ileSasiadow(r, k){
    let liczba = 0;
    let R = 0;
    let K = 0;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(i == 0 &&  j == 0) continue;
        R = r + i;
        K = k + j;
        if(R == 12) R = 0;
        else if(R == -1) R = 11;
        if(K == 20) K = 0;
        else if(K == -1) K = 19;
        if(this.tab1[R][K] == 'X') liczba++;
      }
    }
    return liczba;
  }

  drukuj(){
    let str = '';
    for(let i = 0; i < this.rzedy; i++) {
      str += this.tab1[i].join('') + '\n';
    }
    return str;
  }
}
