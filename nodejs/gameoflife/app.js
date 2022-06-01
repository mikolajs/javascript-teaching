const http = require('http');
//const life = require('./life');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

//A) 8
//B) 37 pokolenie: 2, 19 –> 4 sąsiadów
//C) 51 pokolenie, 8 komórek

let str = '';

function readGameFile(){
  fs.readFile('gra.txt', 'utf8', (err, data) => {
  //console.log(data);
    console.log("Red game text file");
    let aLife = life.Life();
    let generation = 1;
    aLife.setFirstDay(data);
    aLife.nextGeneration();
    generation = 2;
    console.log("B) w drugim pokoleniu komórek: " + aLife.getNumberOfLifes());
    while(generation < 37){
      aLife.nextGeneration();
      generation++;
    }
    console.log("A) ilość sąsiadów w 2 wierszu i 19 kolumnie w generacji 36");
    console.log(aLife.getLifeString());
    console.log('sąsiedzi: ' + aLife.getNumberOfNeighbours(1, 18));
    while(!aLife.ganerationNotChange()){
      aLife.nextGeneration();
      generation++;
    }
    console.log("C) to samo ułożenie w generacji: " + generation);
    console.log(aLife.getLifeString());
    console.log('sąsiedzi: ' + aLife.getNumberOfLifes());

    let str = aLife.getHistory();
    writeStateToFile(str);
  });
}

function writeStateToFile(str){
    fs.writeFile('result.txt', str, function (err) {
      if (err) throw err;
      console.log("Has been writen data");
    });
}


//readGameFile();


const server = http.createServer((req, res) => {
    console.log(req.url);
    const url = req.url;
    if(url == '/'){
      fs.readFile('tresc.txt', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/game.html') {
      fs.readFile('game.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/pixi-legacy.min.js'){
      fs.readFile('pixi-legacy.min.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/game.js'){
      fs.readFile('game.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/life.js'){
      fs.readFile('life.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/point.js') {
      fs.readFile('point.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/E.png' ){
      fs.readFile('E.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'img/png'});
      res.write(data);
      return res.end();
      });
    } else if(url == '/X.png'){
      fs.readFile('X.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'img/png'});
      res.write(data);
      return res.end();
      });
    } else if('/begin') {
      fs.readFile('gra.txt', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.write(data);
      return res.end();
      });
    } else {
      res.write("OK");
      return res.end();
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
