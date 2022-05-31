'use strict'

var express = require('express');
var app = express();
var data = require('./database');
var bodyParser = require('body-parser');


app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/get', function(req, res){
  var act = req.query.t;
  if(act == "g") {
    data.getGroups(res);
  } else if(act == "h") {
    if(req.query.id){
      data.getHosts( res, req.query.id);
    } else res.send('{"ERROR":"potrzebne ID"}');
  }
  else {
    res.send('{"ERROR":"Brak danych"}');
  }
});

app.get('/api/ins', function(req, res){
  var act = req.query.t;
  if(act == "g") {
    if(req.query.n) data.setGroup(res, req.query.n);
    else  res.send('{"ERROR":"potrzebna nazwa grupy"}');
  }
  else if(act == "h") {
    if(req.query.id && req.query.n && req.query.ip)
      data.setHost(res, req.query.id, req.query.n, req.query.ip);
    else res.send('{"ERROR":"potrzebne dane do wstawienia"}');
  }
  else res.send('{"ERROR":"Brak danych"}');
});

app.get('/api/alt', function(req, res){
  var act = req.query.t;
  if(act == 'g'){
    if(req.query.n && req.query.id){
      data.altGroup(res, req.query.id, req.query.n);
    }
    else res.json('"Error":"brak danych do zmiany"');
  }
});

app.get('/api/del', function(req, res){
  var act = req.query.t;
  if(act == 'g'){
    if(req.query.id){
      data.delGroup(res,  req.query.id);
    }
    else res.json('"Error":"brak id do usunięcia"');
  }
  else if(act == 'h'){
    if(req.query.id){
      data.delHost(res, req.query.id);
    }
    else res.json('"Error":"brak id do usunięcia"');
  }
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
