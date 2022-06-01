const mysql = require('mysql');

class Inserts {
  constructor(conData) {
    this.startSql = "INSERT INTO product "
    this.connectionData = conData;
  }

  insertProduct(data){
    let con = mysql.createConnection(this.connectionData);
    let sql = this.startSql;
    sql += '(weight, shortname, description, calorie, protein, carbohydrate, fat)';
    sql += ' values ( ?, ?, ?, ?, ?, ?, ?)';
    //let data = ;
      con.connect(function(err) {
        if (err) throw err;
        con.query(sql, data, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
  }
  
  test(){
      console.log("dziala");
  }

}
module.exports = {
  Inserts : Inserts
}
