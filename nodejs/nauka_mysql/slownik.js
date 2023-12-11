function saveData(){
  let data = {};
  data.eng = document.getElementById('inEng').value;
  data.rus = document.getElementById('inRus').value;
  data.pol = document.getElementById('inPol').value;
  console.log(JSON.stringify(data));
  let req = new XMLHttpRequest();
  req.open('POST', 'http://localhost:3000/insert', true);
  req.onreadystatechange = (e) => {
     if (req.readyState == 4) {
     if(req.status == 200){
      console.log('Zapisane!');
      setTimeout(readData, 3000);
     }
     else console.log(e);  
   }
  }
  req.send(JSON.stringify(data));
}

function readData(){
  let req = new XMLHttpRequest();
  req.open('POST', 'http://localhost:3000/getDict', true);
  req.onreadystatechange = (e) => {
    if(req.readyState == 4){
      if(req.status == 200){
        let json = JSON.parse(req.responseText);
        if(json.error == true){
           console.log('Error reading Dictionary \n' + error.errorInfo);
        } else {
          insertRowsToTable(json.rows);
        }
      }
    }
  }
  req.send();
}

function insertRowsToTable(dataArray){
  let tableElem = document.getElementById('dictionaryTable');
  tableElem.innerHTML = '';
  let rows = '';
  for(let obj of dataArray){
    rows += '<tr><td>'+obj.eng+'</td><td>'+obj.rus+'</td><td>'+obj.pol+'</td></tr>';
  }
  tableElem.innerHTML = rows;
}