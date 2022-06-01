const http = require('http');
const fs = require('fs');
const z = require('./zycie');

//let zycie = z.Zycie();


const server = http.createServer((req, res) => {
//  console.log(req.url);
  if(req.url == '/'){
    res.write('OK');
    return res.end();
  } else if(req.url == '/tresc'){
    fs.readFile('tresc.txt', (err, tresc) => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
      res.write(tresc);
      return res.end();
    });
  // } else if(req.url == '/gra'){
  //   fs.readFile('gra.txt', 'utf-8', (err, plikgry) => {
  //     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
  //     zycie.pierwszePokolenie(plikgry);
  //     let wynik = "pokolenie 1\n";
  //     wynik += zycie.drukuj();
  //     for(let i = 2; i < 101; i++){
  //       wynik += "pokolenie " + i + "\n";
  //       zycie.nastepnePokolenie();
  //       wynik += zycie.drukuj();
  //     }
  //     console.log(wynik);
  //     res.write(wynik);
  //     return res.end();
  //   });
} else if(req.url == '/gra-pixi.html'){
    fs.readFile('gra-pixi.html', 'utf-8', (err, plik) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
      res.write(plik);
      return res.end();
    });
  } else if(req.url == '/pixi-legacy.min.js') {
    fs.readFile('pixi-legacy.min.js', (err, plik) => {
      res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(plik);
      return res.end();
    });
  } else if(req.url == '/zycie.js') {
    fs.readFile('zycie.js', (err, plik) => {
      res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(plik);
      return res.end();
    });
  } else if(req.url == '/gra.js') {
    fs.readFile('gra.js', (err, plik) => {
      res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(plik);
      return res.end();
    });
  } else if(req.url == '/E.png') {
    fs.readFile('E.png', (err, obraz) => {
      res.writeHead(200, {'Content-Type': 'img/png'});
      res.write(obraz);
      return res.end();
    });
  } else if(req.url == '/X.png') {
      fs.readFile('X.png', (err, obraz) => {
        res.writeHead(200, {'Content-Type': 'img/png'});
        res.write(obraz);
        return res.end();
      });
  } else {
    res.write("Błąd: " + req.url);
  }
});

server.listen(8888, 'localhost', () => {
  console.log('Serwer uruchomiono na http://localhost:8888' );
});
