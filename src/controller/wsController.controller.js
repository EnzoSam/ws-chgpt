const WsController = require('../service/wsService.service');

var controller = {
  test: function (req, res) {
    return res.status(200).send({
      message: "WSController OK.",
    });
  },
  verify: function (req, res) {
    if (
      req.query["hub.mode"] == "subscribe" &&
      req.query["hub.verify_token"] == process.env.VERIFY_TOKEN
    ) {
      res.send(req.query["hub.challenge"]);
    } else {
      res.sendStatus(400);
    }
  },
  notify:function (request, response) {
    console.log("Incoming webhook: " + JSON.stringify(request.body));

    try{

        let textMessage = WsController.getMessageTextFromWhebhookObject(request.body);
        WsController.sendTextMessage(textMessage,"5493751446485");
    }
    catch(ex)
    {
        console.log(ex);
    }


    response.sendStatus(200);
  }
};

module.exports = controller;
