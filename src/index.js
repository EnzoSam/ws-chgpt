const dotenv = require('dotenv');
const path = require('path');
var mongoose = require('mongoose');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });

var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>
      {
        app.listen(port, function () {
          console.log("Escuchando en puerto " + port);
        });
      }
  )
  .catch(error=> {
      console.log('Error al conectar mongodb');
  }
  )  