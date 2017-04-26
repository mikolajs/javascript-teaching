'use strict'

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dane.sqlite3');

exports.getGroups = function(res) {
  var run = db.all("SELECT id, name FROM GroupHosts", function(err, rows) {
      console.log(JSON.stringify(rows));
      res.json(rows);
  });
}

exports.getHosts = function(res, id) {
  var stmt = db.prepare("SELECT id, name, ip, ghid FROM Hosts where ghid = ?");
  stmt.all(id, function(err, rows){
    console.log(JSON.stringify(rows));
    res.json(rows)
  });
}

exports.setGroup = function(res, gName) {
  var stmt = db.prepare("INSERT INTO GroupHosts (name) VALUES (?)");
  stmt.run(gName, function(err, row){
    console.log(JSON.stringify(row));
    if(err) res.json({Ans:"NO"});
    else res.json({Ans:"OK"});
  });
}

exports.setHost = function(res, groupId, hostName, hostIp) {
  var stmt = db.prepare("INSERT INTO Hosts (name, ip, ghid) VALUES (?, ?, ?)");
  stmt.run([hostName, hostIp, groupId], function(err, rows){
    console.log(JSON.stringify(rows));
    if(err) res.json({Ans:"NO"});
    else res.json({Ans:"OK"});
});
}

exports.altGroup = function(res, id, name) {
  var stmt = db.prepare("UPDATE GroupHosts set name = ? WHERE id = ?");
  stmt.run([name, id], function(err, rows){
    console.log(JSON.stringify(rows));
    if(err) res.json({Ans:"NO"});
    else res.json({Ans:"OK"});
  });
}

exports.delGroup = function(res, id) {
  var stmt1 = db.prepare("select * From Hosts WHERE ghid = ?");
  stmt1.all(id, function(err, rows){
    console.log("delete group: " + err + ' length: ' + rows.length);
    if(rows.length > 0)
      res.json({Ans:"CANT"});
    else  {
      var stmt2 = db.prepare("Delete From GroupHosts WHERE id = ?");
      stmt2.run(id, function(err, rows){
      if(err) res.json({Ans:"NO"});
      else res.json({Ans:"OK"});
      });
    }
  });
}

exports.delHost = function(res, id) {
      var stmt = db.prepare("Delete From Hosts WHERE id = ?");
      stmt.run(id, function(err, rows){
        console.log(JSON.stringify(rows));
        if(err) res.json({Ans:"NO"});
        else res.json({Ans:"OK"});
      });

}
