var express = require("express"),
bodyParser = require("body-parser");
var axios = require('axios');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

axios.defaults.timeout = 60000;

var wsRoutes = require('./route/ws.route');
var chatGPTRoutes = require('./route/chatgpt.route');

app.use('/', wsRoutes);
app.use('/', chatGPTRoutes);

module.exports = app;