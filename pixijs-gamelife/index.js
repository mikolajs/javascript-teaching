const express = require('express');
var app = express();

var path = require('path');

app.use('/', express.static('src'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.listen(3000, () => console.log("listen on port 3000"));
