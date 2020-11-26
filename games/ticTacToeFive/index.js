var express = require('express');
var app = express();

app.use(express.static('html'));
app.use('/img', express.static('img'));
app.use('/lib',express.static('lib'));
app.use('/src', express.static('src'));


app.listen(3000, () => console.log("listen on port 3000"));
