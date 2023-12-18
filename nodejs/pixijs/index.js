var express = require('express');
var app = express();

app.use(express.static('./'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
//app.use('/img/deer', express.static('img/deer'));


app.listen(3000, () => console.log("listen on port http://localhost:3000"));