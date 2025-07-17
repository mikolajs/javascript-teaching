const express = require('express');
const hostname = 'localhost';
const port = 8989;
const fs = require('fs');
const app = express();

app.post('/set-temperature', (req, res) => {
  let data = '';
  req.on('data', (d) => { data += d });
  req.on('end', () => {
    let json = JSON.parse(data);
    console.log((new Date).toLocaleTimeString('pl-PL'));
    console.log(json.station);
    console.log(json.data);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('ok');
    res.end();
  });
});


app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server running at http://${hostname}:${port}/`);
});
