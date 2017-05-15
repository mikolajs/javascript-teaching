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

app.get('/:id', function(req, res){
  var artId = req.param('id');
  if(artId) {
    data.getArticle(res);
  }
  else {
    res.redirect('/pliki/404.html');
  }
});

app.get('/save/:id', function(req, res){
 res.send('NOt implemented yet');
});


app.get('/del/:id', function(req, res){

 res.send('Not implemented yet');

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
