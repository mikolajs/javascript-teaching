'use strict'

var express = require('express');
var app = express();
var data = require('./data');
var bodyParser = require('body-parser');

app.use(express.static('pliki'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/get', function(req, res){
  if(!req.query.w){
    res.send('{"w":"błąd parametru"}');
  } else {
    var word = req.query.w;
    data.getWord(res, word);
  }
});

app.post('/ins', function(req, res){
  var word = req.body.word;
  var definition = req.body.definition;
  console.log(" słowo: " + word + " def: " + definition);
  if(word && definition) {
    data.setWord(res, word, definition);
  } else res.send('"brak słowa lub definicji"');
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
