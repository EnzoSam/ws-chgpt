var express = require("express"),
bodyParser = require("body-parser");
var axios = require('axios');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

axios.defaults.timeout = 60000;

var wsRoutes = require('./route/ws.route');
var chatGPTRoutes = require('./route/chatgpt.route');
var helpDeskRoutes = require('./route/helpDesk.route');
var tiketsRoutes = require('./route/tikets.route');
var assistantRoutes = require('./route/assistants.route');

app.use('/', wsRoutes);
app.use('/', chatGPTRoutes);
app.use('/api/help-desk/', helpDeskRoutes);
app.use('/api/tikets/', tiketsRoutes);
app.use('/api/assistant/', assistantRoutes);

module.exports = app;