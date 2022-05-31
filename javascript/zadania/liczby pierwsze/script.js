var a = [];
var n = 0;

function licz(){
  a = new Array(1000000).fill(0);
  n = 0;
  var start = new Date();
  var p = parseInt(document.getElementById('pocz').value);
  var k = parseInt(document.getElementById('kon').value);
  console.log("zakres od " + p + " do " + k);
 var pierwsze = 0;
 if(p < 2) p = 2;
 wszystkiePierwsze(k);
 console.log("wyliczone pierwsze w tablicy " + n);
 //drukujPierwsze();
 var jest = true;
  for(var i = p; i < k; i++){
    jest = true;
    var s = Math.floor(Math.sqrt(i));
    for(var j = 0; j < n; j++) {
      if(a[j] > s) break;
      if(i % a[j] == 0) {
        jest = false;
        break;
      }
    }
    if(jest) pierwsze++;
  }
  var end = new Date();
  var time = new Date(end.getTime() - start.getTime());
  console.log("czas: " + time.getMinutes() + "m " +
  + time.getSeconds() + "s " +
  time.getMilliseconds() + "ms");
  //console.log(a.join(','));
  document.getElementById('wynik').innerHTML = pierwsze;

  return false;
}

function wszystkiePierwsze(max){
  var s = Math.floor(Math.sqrt(max));
  var s = max;
  var jest = true;
  for(var i = 2; i <= s; i++){
    jest = true;
    for(var j = 0; j < n; j++){
      if(i % a[j] == 0) {
        jest = false;
        break;
      }
    }
    if(jest) {
      a[n] = i;
      n++;
    }
  }
}

function drukujPierwsze(){
  for(var i = 0; i < n; i++)
    console.log(a[i]);
}

function pierwsza(liczba){
  var s = Math.floor(Math.sqrt(liczba));
  for(var i = 2; i <= s; i++ ) {
    if(liczba % i == 0) return false;
  }
  return true;
}
