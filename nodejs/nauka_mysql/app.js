const http = require('http');
const dt = require('./myfirstmodule');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'uczen',
  password: 'Qw3rtyzaq!',
  database: 'nodejs'
});
//con.connect();

let nameFile = 'datafile.txt';
/*
fs.appendFile(nameFile, ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});

fs.readFile(nameFile, 'utf8', (err, data) => {
  if (err) { console.log(err); return; }
  console.log(data);
})
*/
const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == '/script.js') {
    fs.readFile('script.js', 'utf8', (err, data) => {
      if (err) { console.log(err); return; }
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      return res.end();
    });
  } else if (req.url == '/loadfile') {
    fs.readFile(nameFile, 'utf8', (err, data) => {
      if (err) { console.log(err); return; }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(data);
      return res.end();
    });
  } else if (req.url == '/savefile') {
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
  } else if (req.url == '/slownik.html' || req.url == '/slownik') {
    fs.readFile('slownik.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else if (req.url == '/slownik.js') {
    fs.readFile('slownik.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      return res.end();
    });

  } else if(req.url == '/insert') { 
    let values = [];
    let data = '';
    req.on('data', (d) => {data += d});
    req.on('end', ()=> {
      console.log(data);
      let json = JSON.parse(data);
      values.push([json.eng, json.rus, json.pol]);
      console.log(values);
      //con.connect( (err) => {
        con.query('INSERT INTO dictionary (eng, rus, pol) VALUES ?', [values],
        (err, result) => {
          if(err) {
            console.log(err);
            res.writeHead(406, { 'Content-Type': 'text/plain' });
            res.write('err');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('ok');
          }
        });
     // });
    });
  } else if(req.url == '/getDict') { 
      //con.connect( (err) => {
       // if(err) {
       //   console.log('Second shake?');
       //   console.log(err);
      //  }
        con.query('SELECT eng, rus, pol FROM dictionary', (err, result, fields) => {
          let data = {};
          data.rows = [];
          //console.log(result);
          //console.log(fields);
          if(err) {
            console.log(err);
            res.writeHead(406, { 'Content-Type': 'text/json' });
            data.error = true;
            data.errorInfo = err.toString();
          } else {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            data.error = false;
            for(let rp of result){
              data.rows.push(rp);
            }
          }
          res.write(JSON.stringify(data));
          return res.end();
        });
   //   });
  } else {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
