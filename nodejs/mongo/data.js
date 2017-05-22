'use strict'

var mongo = require('mongodb').MongoClient;
var db;
var colArticle = 'articles';
var conStr = "mongodb://localhost:27017/nodemongo";
var ObjectId = require('mongodb').ObjectID;


exports.getArticle = function(res, id) {
  mongo.connect(conStr, function(err, db){
    if(err) {
      console.log("Connectin error " + err.toString());
      return;
    }
    var col = db.collection(colArticle);
    col.findOne( {'_id':  ObjectId.createFromHexString(id) }, function(err, item){
      if(err) {
        db.close();
        res.send("Błąd. Nie znaleziono, żadnego artykułu");
      } else {
        db.close();
        if(item) console.log(id + " : " + item.title);
        res.send(JSON.stringify(item)); //TODO change to produce json
      }
    });
  });
};

exports.getAllArticles = function(res){
  mongo.connect(conStr, function(err, db){
    if(err) {
      console.log("Connectin error " + err.toString());
      return;
    }
    var col = db.collection(colArticle);
    col.find({}).toArray(function(err, items){
      if(err) {
        db.close();
        res.send("{'Ans': 'NO'}");
      } else {
        db.close();
        console.log("Items " + items);
        res.send(JSON.stringify(items)); //TODO change to produce json
      }
    });
  });
};

exports.delArticle = function(res, id){
  mongo.connect(conStr, function(err, db){
    if(err) {
      console.log("Connectin error " + e.toString());
      return;
    }
    var col = db.collection(colArticle);
    col.deleteOne({_id: ObjectId(id)}, function(err, r){
      if(err == null){
        res.send("{'Ans': 'OK'}");
      } else {
        console.log("Delete error " + err.toString());
        res.send("{'Ans': 'NO'}");
      }
      db.close();
    });
  });
}

exports.saveArticle = function(res, id, body){
  mongo.connect(conStr, function(err, db){
    if(err) {
      console.log("Connectin error " + e.toString());
      return;
    }
    var col = db.collection(colArticle);
    col.updateOne({'_id': ObjectId(id)}, { $set: {'title': title, 'body': body }},
      function(err, result){
        if(err == null) {
          console.log("Inserted no errors. Changed: " + result.result.n);
          res.send("{'Ans': 'NO'}");
        } else {
            res.send("{'Ans': 'OK'}");
        }
        db.close();
    });
  });
}
