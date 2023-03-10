console.log("hola mundo")

var app = require('./app');
var port = process.env.PORT || 3999;

app.listen(port,()=>
{
    console.log("servidor corriendo ok")
})