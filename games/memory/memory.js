$(document).ready(function (){
  $("#powitanie").show();
  $("#gra").hide();
  $("#koniec").hide();
  let tImie = window.location.href.split('=')[1];
  if(tImie){
    document.getElementById("imie").value = tImie;
  }

});
var size = 0;
var imie;
var images = ["cpu.png", "disk.png", "graphic.png", "keyboard.png", "mouse.png",
  "RAM.png", "electropen.png", "tablet.png", "monitor.png", "printer.png",
   "notebook.png", "cooler.png", "scanner.png", "joypad.png"];
var tab;
var klikniety;
var znalezione;
var faza = 0;
var punkty = 0;
var iloscRuchow = 0;
var blokuj = false;

function init(){
  let selectedSize = document.querySelector("input[name=sizeGame]:checked").value;
  let x = parseInt(selectedSize.split(",")[0]);
  let y = parseInt(selectedSize.split(",")[1]);
  size = x*y;
  let sectionGame = document.getElementById('gra');
  sectionGame.innerHTML = "";
  for(let i = 0; i < y; i++){
    let inner ="";
    for(let j = 0; j < x; j++){
       inner += '<img src="blank.png" id="i' + (i*x+j) +'" />';
    }
    sectionGame.innerHTML += '<div class="panel">' +inner+ '</div>';
  }
  let pixelSize = calcImgSize();
  console.log("pixels SIze: " + pixelSize);
  tab = (new Array(size)).fill(-1);
  klikniety = (new Array(size)).fill(false);
  znalezione = (new Array(size)).fill(0);

  $(".panel img").each(function (){
     this.style.width = pixelSize+"px";
     this.style.height = pixelSize+"px";
  });
  //define click on image
  $(".panel img").click(function (){
    let id = parseInt(this.id.substr(1));
    if(!blokuj && !klikniety[id] && faza < 2){
      blokuj = true;
     klikniety[id] = true;

    animacja(this, images[tab[id]]);
     iloscRuchow++;
     if(faza == 0) faza = 1;
     else faza = 2;
     if(faza == 2){
       faza = 0;
       setTimeout(sprawdz, 1500);
     }
   }
  });
}

function animacja(img, imgSrc){
  img.style.transition = "all 0.3s";
  img.style.transform = "rotateY(90deg)";
  setTimeout(function(){
    img.src = imgSrc;
    img.style.transition = "all 0.3s";
    img.style.transform = "rotateY(0deg)";
    if(faza == 1) blokuj = false;
  }, 500);
}

function start(){
  imie = document.getElementById("imie").value;
  $("#witaj").text("Witaj " + imie);
  $("#powitanie").fadeOut(1000, function(){
    $("#gra").fadeIn(1000);
  });
  init();
  losujObazki();
}

function losujObazki(){
  let arr = [];
  for(let i = 0; i < size/2; i++ ){
    arr.push(i);
    arr.push(i);
  }
  for(let i = 0; i < tab.length; i++){
    let index = Math.floor(Math.random()*arr.length);
    tab[i]= arr[index];
    arr.splice(index, 1);
  }
  console.log("rozmiar tab: " + tab.length);
  for(let im of tab){
    console.log(im + " " + images[im]);
  }
}


function sprawdz(){
  let arr = [-1,-1];
  let j = 0;
  for(let i in klikniety){
    if(klikniety[i]) {
      arr[j] = i;
      klikniety[i] = false;
      j++;
    }
  }
  if(tab[arr[0]] == tab[arr[1]]){
    punkty++;
    if(punkty == size/2){
      koniec();
    }
  } else {
    document.getElementById("i"+arr[0]).src = "blank.png";
    document.getElementById("i"+arr[1]).src = "blank.png";
  }
  blokuj = false;
}

function koniec(){
  $("#gra").hide(1000);
  $("#koniec").show();
  document.getElementById("iloscRuchow").innerHTML = iloscRuchow;
  document.getElementById("zwyciesca").innerHTML = imie;
}

function reload() {
  let i = window.location.href.split("=")[1];
  if(i != undefined) window.location.href = window.location.href;
  else window.location.href = window.location.href + "?i=" + imie;
}


function calcImgSize(){
  let s = 200;
   switch(size){
     case 8:
      s = 300;
      break;
      case 15:
      s = 200;
      break;
      case 28:
      s = 150;
      break;
      default:
      break;
   };
   return s;
}
