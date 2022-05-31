var grosze = 0;

document.getElementById("dodaj").addEventListener("click", function(){
  var valStr = document.getElementById("kwota").value;
  valStr = valStr.replace(",", ".");
  if(walidacja(valStr)) {

    grosze += Math.round(parseFloat(valStr)*100);
    document.getElementById("info").innerHTML =  "";
    console.log(grosze);
    document.getElementById("suma").innerHTML = wyswietl();

  } else {
    document.getElementById("info").innerHTML =
      "Musi być kwota liczbowa w fomacie ddd,dd lub ddd.dd";
  }
});

function wyswietl(){
  var str =  Math.floor(grosze/100) +  ",";
  var gr = grosze % 100;
  if(gr < 10) str += "0" + gr;
  else str += gr;
  return str;
}

function walidacja(str){
  var r1 = /[^\d\.]/;
  var r2 = /^\d+[\.]\d{1,2}/;
  var r3 = /[^\D]/;
  if(r1.test(str)) return false;
  if(r2.test(str)) return true;
  if(r3.test(str)) return true;
  else return false;
}
