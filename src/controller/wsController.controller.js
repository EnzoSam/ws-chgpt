const WsController = require('../service/wsService.service');
const ChatGPTController = require('../service/chatgpt.service');

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
    try{

        let textMessage = WsController.getMessageTextFromWhebhookObject(request.body);
        if(textMessage === null  || textMessage === '')
          console.log(request.body);
        ChatGPTController.chat(textMessage).
        then(response=>
          {
            WsController.sendTextMessage(response.data.choices[0].text, "543751446485").then(data=>
              {
                console.log('enviado');
              }).catch(error)
              {
                console.log(error);
              }
          })
          .catch(error =>{
            console.log(error);
          });       
    }
    catch(ex)
    {
        console.log(ex);
    }


    response.sendStatus(200);
  }
};

module.exports = controller;
