var express = require("express"),
bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send(
    "Taquion IT"
  );
});

app.get("/webhook", function (req, res) {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == process.env.WHATSAPP_TOKEN
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", function (request, response) {
  console.log("Incoming webhook: " + JSON.stringify(request.body));
  response.sendStatus(200);
});



module.exports = app;