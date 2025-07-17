const express = require('express');
const hostname = '192.168.0.218';
const port = 8989;
const fs = require('fs');


const app = express();
let nr = 1;


app.use('/', express.static('html', { index: 'index.html' }));
app.use('/js', express.static('js'));
app.get('/test', (req, res) => {
  //if (err) { console.log(err); return; }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("To jest test");
  return res.end();
});
app.post('/setImage', (req, res) => {
  let data = [];
  req.on('data', (d) => { data.push(Buffer.from(d, 'binary')); });
  req.on('end', () => {
    fs.writeFile("/home/ms/cameras/img_"+nr+".jpg", Buffer.concat(data), (err) => {
      if (err) { console.log(err); return; }
	  nr++;
	  //console.log(nr, data.length);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('ok');
      return res.end();
    });
  });
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server running at http://${hostname}:${port}/`);
});
