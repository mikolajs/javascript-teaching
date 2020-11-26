const http = require('http');
const dt = require('./myfirstmodule');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');


fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
}); 

const server = http.createServer((req, res) => {
    fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

