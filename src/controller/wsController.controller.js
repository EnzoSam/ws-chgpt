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
  notify:function (request, res) {
    try{
      
        let textMessage = WsController.getMessageTextFromWhebhookObject(request.body);
        if(textMessage === null  || textMessage === '')
        {
            //console.log(request.body);
        }
        else
        {
          ChatGPTController.chat(textMessage).
          then(response=>
            {
              let dest = WsController.getFromNumberTextFromWhebhookObject(request.body);
              WsController.sendTextMessage(response.data.choices[0].text, dest).then(()=>
                {
                  console.log('enviado');
                  res.sendStatus(200);
                }).catch(error=>
                {
                  console.log(error);
                  res.sendStatus(200);
                });
            })
            .catch(error =>{
              console.log(error);
              res.sendStatus(200);
          }); 
        }     
        
    }
    catch(ex)
    {
        console.log(ex);
        res.sendStatus(200);
    }    
  }
};

module.exports = controller;
