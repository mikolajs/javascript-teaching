function saveData(){
  let data = {};
  data.eng = document.getElementById('inEng').value;
  data.rus = document.getElementById('inRus').value;
  data.pol = document.getElementById('inPol').value;
  console.log(JSON.stringify(data));
  let req = new XMLHttpRequest();
  req.open('POST', 'http://127.0.0.1:3000/insert', false);
  req.onreadystatechange = (e) => {
     if (req.readyState == 4) {
     if(req.status == 200)
      console.log('Zapisane!');
     else console.log(e);  
   }
  }
  req.send(JSON.stringify(data));
}