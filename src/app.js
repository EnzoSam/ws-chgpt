var express = require("express"),
bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var wsRoutes = require('./route/ws.route');
var chatGPTRoutes = require('./route/chatgpt.route');

app.use('/', wsRoutes);
app.use('/', chatGPTRoutes);

module.exports = app;