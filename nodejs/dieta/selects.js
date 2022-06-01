const mysql = require('mysql');

class Selects {
  constructor(conData) {
    this.connectionData = conData;
  }

  getAllProducts(){
      let con = mysql.createConnection(this.connectionData);
      let sql = 'SELECT * FROM product;';
      //let data = ;
        con.connect(function(err) {
          if (err) throw err;
          con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            //console.log(fields);
          });
        });
  }

  getProduct(id){
    let con = mysql.createConnection(this.connectionData);
    let sql = 'SELECT * FROM product WHERE id = ?;';
    //let data = ;
      con.connect(function(err) {
        if (err) throw err;
        con.query(sql, [id], function (err, result, fields) {
          if (err) throw err;
          console.log(result[0]);
          console.log(fields.map((f) => f.name));
          return result;
        });
      });
  }
}

module.exports = {
  Selects : Selects
}
