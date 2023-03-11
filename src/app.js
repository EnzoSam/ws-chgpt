var express = require("express"),
bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var wsRoutes = require('./route/ws.route');

app.use('/', wsRoutes);

module.exports = app;