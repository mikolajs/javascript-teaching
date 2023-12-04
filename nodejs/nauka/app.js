const http = require('http');
const dt = require('./myfirstmodule');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "uczen",
  password: "qwerty"
});

let nameFile = 'datafile.txt';

fs.appendFile(nameFile, ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
}); 

fs.readFile(nameFile, 'utf8', (err, data) => {
  if(err) {console.log(err);return;}
  console.log(data);
})

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url == '/script.js'){
      fs.readFile('script.js', 'utf8', (err, data) => {
	if(err) { console.log(err);return;}
	res.writeHead(200, {'Content-Type' : 'text/javascript'});
	res.write(data);
	return res.end();
      });
    } else if(req.url == '/loadfile'){
     fs.readFile(nameFile, 'utf8', (err, data) => {
	if(err) { console.log(err);return;}
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.write(data);
	return res.end();
     });
    } else if(req.url == '/savefile'){
      let data = '';
      req.on('data', (d) => {  data += d; }); 
      req.on('end', () => {
        fs.writeFile(nameFile, data, (err) => {
	  if(err) { console.log(err);return;}
	  res.writeHead(200, {'Content-Type' : 'text/plain'});
	  res.write('ok');
	  return res.end();
        });
      });
    } else {
      fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
      });
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

