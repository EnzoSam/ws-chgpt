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
var businessRoutes = require('./route/business.route');
var contactRoutes = require('./route/contact.route');
var iaModelRoutes = require('./route/iamodel.route');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE,PATCH');
     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
     if (req.method === "OPTIONS") {
         return res.status(200).end();
     }
     next();
 });

app.use('/', wsRoutes);
app.use('/', chatGPTRoutes);
app.use('/api/help-desk/', helpDeskRoutes);
app.use('/api/tiket/', tiketsRoutes);
app.use('/api/assistant/', assistantRoutes);
app.use('/api/business/', businessRoutes);
app.use('/api/contact/', contactRoutes);
app.use('/api/iamodel/', iaModelRoutes);

module.exports = app;