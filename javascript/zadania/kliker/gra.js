var animal = document.getElementById('animal');
var info = document.getElementById('info');
var score = 0;
var time = 0;
const jump = 25;
var maxTime = 2500;
var over = false;
var st = setTimeout(function () {
    over = true;
    info.innerHTML = "Koniec gry. Twój wynik: " + score;
}, maxTime);
info.innerHTML = score;
var cnv = document.getElementById("indicator");
var ctx = cnv.getContext("2d");

var inter = setInterval(function() {
   time += jump;
   if(time > maxTime) time = 0;;
   ctx.fillStyle = "#00FF00";
   ctx.fillRect(0,0,1000,10);
   ctx.fillStyle = "#FF0000";
   ctx.fillRect(0,0,(time * 1000.0)/maxTime, 1000,10);
}, jump);
function moveIt() {
    if(over) return;
    time = 0;
    if(score % 10) maxTime -= 20;
    info.innerHTML = ++score;
    var x = Math.floor(Math.random()*940);
    var y = Math.floor(Math.random()*440);
    animal.style.top = y + "px";
    animal.style.left = x + "px";
    clearTimeout(st);
    st = setTimeout(function () {
    over = true;
    info.innerHTML = score +  "Koniec gry. Przeładuj stronę by grać od nowa.";
    clearInterval(inter);
}, maxTime);
}


