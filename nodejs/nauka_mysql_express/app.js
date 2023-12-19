const express = require('express');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'uczen',
  password: 'Qw3rtyzaq!',
  database: 'nodejs2'
});
//con.connect();

const app = express();

app.use('/', express.static('html', { index: 'slownik.html' }));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.get('/loadfile', (req, res) => {
  if (err) { console.log(err); return; }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(data);
  return res.end();
});
app.post('/savefile', (req, res) => {
  let data = '';
  req.on('data', (d) => { data += d; });
  req.on('end', () => {
    fs.writeFile(nameFile, data, (err) => {
      if (err) { console.log(err); return; }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('ok');
      return res.end();
    });
  });
});
app.post('/insert', (req, res) => {
  let values = [];
  let data = '';
  req.on('data', (d) => { data += d });
  req.on('end', () => {
    //console.log(data);
    let json = JSON.parse(data);
    values.push([json.eng, json.ros, json.pol]);
    //console.log(values);
    con.query('INSERT INTO dictionary (eng, rus, pol) VALUES ?', [values],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(406, { 'Content-Type': 'text/plain' });
          res.write('err');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('ok');
        }
        res.end();
      });
  });
});
app.get('/getDict', (req, res) => {

  con.query('SELECT eng, rus, pol FROM dictionary', (err, result, fields) => {
    let data = {};
    data.rows = [];
    if (err) {
      console.log(err);
      res.writeHead(406, { 'Content-Type': 'text/json' });
      data.error = true;
      data.errorInfo = err.toString();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json' });
      data.error = false;
      for (let rp of result) {
        data.rows.push(rp);
      }
    }
    res.write(JSON.stringify(data));
    return res.end();
  });
});

app.get('/delete', (req, res) => {

  let word = req.query.word;
  if(!word){
    console.log('Błąd zapytania GET');
    res.writeHead(406, { 'Content-Tyspe': 'text/plain' });
    return res.end();
  }
  con.query('DELETE FROM dictionary WHERE eng = ?', [word], (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(406, { 'Content-Tyspe': 'text/plain' });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
    }
    return res.end();
  });
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server running at http://${hostname}:${port}/`);
});
