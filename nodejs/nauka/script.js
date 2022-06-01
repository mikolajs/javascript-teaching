function save(){
  let d = document.getElementById('dane').value;
  console.log(d);
  let req = new XMLHttpRequest();
  req.open('POST', 'http://127.0.0.1:3000/savefile', false);
  req.onreadystatechange = (e) => {
     if (req.readyState == 4) {
     if(req.status == 200)
      console.log('Zapisane!');
     else console.log(e);  
   }
  }
  req.send(d);
}

function load(){
  let req = new XMLHttpRequest();
  req.open('POST', 'http://127.0.0.1:3000/loadfile', false);
  req.onreadystatechange = (e) => {
     if (req.readyState == 4) {
     if(req.status == 200) {
	document.getElementById('dane').value = req.responseText;
        console.log('wczytane');
    } else console.log(e);  
   }
  }
  req.send('OK');
}
