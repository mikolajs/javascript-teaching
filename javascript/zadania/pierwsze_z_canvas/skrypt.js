
function oblicz(){
  const maksimum = parseInt(document.getElementById('liczba').value);
  let liczba = maksimum;
  //console.log(maksimum);
  if(isNaN(maksimum)) {
    document.getElementById('wynik2').innerHTML = "Musi być liczba";
    return;
  }
  let liczby = [2];
  //plainPierwsze(liczba, liczby);
  pierwszeTab(liczba, liczby);


  pokazWykres(maksimum, liczby);
  document.getElementById('wynik2').innerHTML = 'Do tej wartości mieści się ' +
  liczby.length + ' liczb pierwszych\n';

}

function pierwsza(n){
  //console.log(n + ' ' + Math.sqrt(n));
  for(let i = 2; i <= Math.sqrt(n); i++){
    if(n % i == 0) return false;
  }
  return true;
}

function plainPierwsze(liczba, liczby){
  for(let i = 3; i < liczba; i += 2){
    if(pierwsza(i)) liczby.push(i);
  }
}

function pierwszeTab(maks, liczby){
  let n = 0; let p = true;
  for(let i = 3; i <= maks; i++){
    n = 0;
    p = true;
    while (liczby[n]*liczby[n] <= i) {
      if(i % liczby[n] == 0) {
        p = false;
        break;
      }
      n++;
    }
    if(p) liczby.push(i);
  }

}

function pokazWykres(liczba, liczby){
  let tablica = new Array(10);
  let kolory = ['blue', 'green', 'red', 'black', 'orange', 'purple', 'yellow',
  'tomato', 'cyan', 'DarkBlue'];
  for(let i = 0; i < 10; i++) tablica[i] = 0;

  let delta = liczba/10.0;
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let zakres = delta;
  console.log("Odstęp: " + zakres);
  let n = 0;
  for(let i = 0; i < 10; i++){
    //onsole.log(liczby[n]);
    while(liczby[n] < zakres){
        tablica[i]++;
        n++;
    }
    zakres += delta;
  }

  const szerokosc = canvas.width/10;
  const maks = Math.max(...tablica);
  const jednostka = canvas.height/maks;
  for(let i in tablica) {
    ctx.fillStyle = '#' + kolor();
    console.log(i + ": " + tablica[i]);
    let w = tablica[i]*jednostka;
    ctx.fillRect(szerokosc*i, canvas.height-w, szerokosc, w);
  }
}

function kolor(){
  let col = Math.floor(Math.random()*(256*256*256));
  let str = col.toString(16);
  console.log(str);
  return str;
}
