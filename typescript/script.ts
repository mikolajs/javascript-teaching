class Lotto {
  zest : number;
  losy : number;
  constructor(){
    this.refresh();
  }
  refresh() {
    this.zest = parseInt((<HTMLInputElement>document.getElementById('zestaw')).value) ;
    this.losy = parseInt((<HTMLInputElement>document.getElementById('losy')).value);
    var szansa = this.silnia(this.zest, this.losy)/
    this.silnia(this.zest - this.losy,0) ;
    document.getElementById('szansa').innerHTML = "Szansa wylosowania: 1 do "
    + szansa.toFixed(0);
  }
  silnia(N: number, K : number) : number {
    var s = 1;
    while(N > K) {
      s *= N;
      N--;
    }
    return s;
  }
}
var lotto : Lotto = new Lotto();
