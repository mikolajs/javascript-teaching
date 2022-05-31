
var dane = liczby.split("\n").map((e) => e.trim());
var przykladDane = przyklad.split("\n").map((e) => e.trim());

function potega(l){
  let p = 1;
  while(p <= l){
    if(l == p) return true;
    p *= 3;
  }
  return false;
}

function zadanie1(){
  let i = 0;
  for(l of dane){
    if(potega(l)) i++;
  }
  document.getElementById("zadanie1").innerHTML = i;
}

function zadanie2(){

  for(l of dane){
    let s = 0;
    let n = l;
    while(n > 0){
      s += silnia(n % 10);
      n = Math.floor(n / 10);
    }
    if(s == l) document.getElementById("zadanie2").innerHTML += (l + "<br>");l
 }
}

function silnia(n){
  let s = 1;
  for(let i = n; i > 1; i--){
    s *= i;
  }
  return s;
}

function zadanie3(){
  let mLen = 0;
  let mNwd = 1;
  let mBegin = 0;
  let length = 1;
  let tNwd;
  let beforeNwd = dane[0];
  for(let i = 1; i < dane.length; i++){
     tNwd = nwd(beforeNwd, dane[i]);
     if(tNwd == 1){
       if(length > mLen){
         mNwd = beforeNwd;
         mLen = length;
         mBegin = dane[i - length];
       }
       tNwd = nwd(dane[i-1],dane[i]);
       if(tNwd != 1) {
         length = 2;
       } else length = 1
     } else length++;
    beforeNwd = tNwd;
  }
  console.log("Nwd " + mNwd);
  console.log("Długość: " + mLen);
  console.log("początek: " + mBegin);
  document.getElementById("zadanie3").innerHTML =
  "Nwd: " + mNwd + " <br> Długość: " + mLen + " <br> początek " + mBegin;
}

function nwd(a, b){
  let t;
  while(a % b != 0){
    t = a % b;
    a = b;
    b = t;
  }
  return b;
}
