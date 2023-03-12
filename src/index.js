const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });

var app = require('./app');
var port = process.env.PORT || 3999;

app.listen(port, function () {
    console.log("Escuchando en puerto " + port);
  });