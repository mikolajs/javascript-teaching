const inserts = require('./inserts');
const Inserts = inserts.Inserts;
const selects = require('./selects');
const Selects = selects.Selects;

let connectionData = {
  host: "localhost",
  user: "user",
  password: "qwerty",
  database: "dieta"
};

let insert = new Inserts(connectionData);
insert.test();
//insert.insertProduct([100, 'masło', 'masło mleczne', 550, 1, 2, 90]);

let select = new Selects(connectionData);
select.getAllProducts();
select.getProduct(1);
