'use strict'

var express = require('express');
var app = express();
var data = require('./database');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/get', function(req, res){
  var act = req.query.t;
  if(act == "g") {
    data.getGroupsTest(db, res);
  }
  else {
    res.send('{"ERROR":"Brak danych"}');
  }
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
