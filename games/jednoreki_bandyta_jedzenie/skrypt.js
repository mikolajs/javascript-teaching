
class Gra {
  constructor(){
    this.koniec = false;
    this.lineIds = ['L1', 'L2', "L3"];
    this.line = [0,0,0];
    this.health = 80;
    document.getElementById('health').innerHTML = this.health;
    this.fruits = ['ananas.png', 'arbus.png', 'banan.png', 'brzoskwinia.png',
    'cytryna.png', 'granat.png', 'grejfrut.png', 'gruszka.png', 'jablko.png',
    'jezyna.png', 'kiwi.png', 'lemonka.png', 'malina.png', 'marakuja.png',
    'pomarancza.png', 'porzeczka.png', 'truskawka.png', 'winogrona.png',
    'wisnia.png'];
    this.vegetable = ['baklazan.png', 'cebula.png', 'groszek.png', 'kalafior.png',
  'kapusta.png', 'kukurydza.png', 'marchew.png', 'ogorek.png', 'papryka.png',
  'pieczarki.png', 'pomidor.png', 'rzodkiewka.png', 'szczypiorek.png', 'ziemniak.png'];
   this.proteins = ['kielbasa.png', 'kurczak.png', 'ser.png', 'wieprzowina.png',
   'wolowina.png'];
   this.sweets = ['batonik.png', 'chipsy.png', 'ciastka.png', 'ciasto.png',
  'cukierki.png', 'czekolada.png', 'lody.png', 'wafelek.png'];
    this.vegetablesSize = this.vegetable.length;
    this.fruitsSize = this.fruits.length;
    this.proteinsSize = this.proteins.length;
    console.log("OWOCE: " + this.fruitsSize);
    console.log("WARZYWA: " + this.vegetablesSize);
    console.log("BIAŁKO: " + this.proteinsSize);
    this.vegetable = this.vegetable.concat(this.sweets);
    this.proteins = this.proteins.concat(this.sweets);
    this.fruits = this.fruits.concat(this.sweets);
    console.log(this.vegetable.join(', '));
    this.canv = document.getElementById('canvas');
    this.ctx = this.canv.getContext('2d');
    this.losuj();
  }

  losuj(){
    if(this.koniec) return;
    this.line[0] = this.getRandom(this.vegetable.length);
    this.line[1] = this.getRandom(this.fruits.length);
    this.line[2] = this.getRandom(this.proteins.length);

    let h = -2;
    if(this.line[0] >= this.vegetablesSize) h *= 3;
    if(this.line[1] >= this.fruitsSize) h *= 3;
    if(this.line[2] >= this.proteinsSize) h *= 3;
    if(h == -2) h = 0;
    if(h == 0) this.health += 10;
    else this.health += h;
    this.wyswietl();
    if(this.health <= 0) this.koniec = true;
    if(this.koniec) setTimeout(() => { location.reload();}, 5000);
 }

  wyswietl(){
    document.getElementById(this.lineIds[0]).src = 'img/' +
        this.vegetable[this.line[0]];
    document.getElementById(this.lineIds[1]).src = 'img/' +
        this.fruits[this.line[1]];
    document.getElementById(this.lineIds[2]).src = 'img/' +
        this.proteins[this.line[2]];

    document.getElementById('health').innerHTML = this.health;
    if(this.health <= 0) {
      document.getElementById('endGame').innerHTML =
        "Nie przeżyłeś. Musisz się odżywać zdrowo!";
      this.koniec = true;
    } else if(this.health > 150) {
      document.getElementById('endGame').innerHTML =
        "Wygrałeś. Odżywiasz się zdrowo, będziesz żył długo i szczęśliwie!";
    }
    this.ctx.clearRect(0,0,this.canv.width, this.canv.height);
    let points = this.canv.height*this.health/100.0;
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(0, this.canv.height - points, this.canv.width, points);
  }

  getRandom(n){
      return Math.floor(Math.random()*n);
  }

}
