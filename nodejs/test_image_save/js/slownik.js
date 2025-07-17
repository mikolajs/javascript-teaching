function wczytaj(){
  console.log('wczytuje');
  let xmlR = new XMLHttpRequest();
  xmlR.open('GET', 'http://localhost:3000/getDict', true);
  xmlR.onreadystatechange = (e) => {
    if(xmlR.readyState == 4){
      if(xmlR.status == 200){
        odswiez(JSON.parse(xmlR.responseText));
      }  else console.log('błąd');
    }
  }
  xmlR.send();
}

function odswiez(json){
  console.log(json.rows);
  let tbody = document.getElementById('zawartosc');
  tbody.innerHTML = '';
  for(let row of json.rows){
    let str = '<tr><td>';
    str += row.eng;
    str += '</td><td>';
    str += row.pol;
    str += '</td><td>';
    str += row.rus;
    str += '</td><td><span onclick="usun(this);">X</span></td></tr>';
    tbody.innerHTML += str;
  }
}

function dodaj(){
  console.log('dodaje');
  let dane = {};
  dane.eng = document.getElementById('eng').value;
  dane.pol = document.getElementById('pol').value;
  dane.ros = document.getElementById('rus').value;
  let xmlR = new XMLHttpRequest();
  xmlR.open('POST', 'http://localhost:3000/insert', true);
  xmlR.onreadystatechange = (e) => {
    if(xmlR.readyState == 4){
      if(xmlR.status == 200){
        setTimeout(wczytaj, 3000);
      }  else console.log('błąd');
    }
  }
  xmlR.send(JSON.stringify(dane));
}

function usun(elem){
  let tr = elem.parentElement.parentElement;
  let word = tr.firstChild.innerHTML;
  if(window.confirm('Usunąć element '+ word + '?')){
    console.log('Usuwam');
    let xmlR = new XMLHttpRequest();
    xmlR.open('GET', 'http://localhost:3000/delete?word='+word, true);
    xmlR.onreadystatechange = (e) => {
      if(xmlR.readyState == 4){
        if(xmlR.status == 200){
          console.log('usuwam linię');
          tr.parentElement.removeChild(tr);
        }  else console.log('błąd');
      }
    }
    xmlR.send();
  } 
}
