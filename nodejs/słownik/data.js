'use strict'

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dane.sqlite3');
var select = "Select definition From headwords where word = (?)";
var insert = "Insert into headwords (word, definition) values ((?), (?))";

exports.getWord = function(res, w) {
  var stmt = db.prepare(select);
  stmt.all(w, function(err, rows) {
      console.log(JSON.stringify(rows));
      res.json(rows);
  });
}

exports.setWord = function(res, w, d) {
  var stmt = db.prepare(insert);
  stmt.all(w, d, function(err, rows){
    console.log(JSON.stringify(rows));
    res.redirect('/form.html');
  });
}
