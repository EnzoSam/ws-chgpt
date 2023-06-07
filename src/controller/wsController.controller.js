const WsService = require("../service/wsService.service");
const ChatGPTController = require("../service/chatgpt.service");
const TiketService = require("../service/tiket.service");
const EmbeddingService = require('../service/embeddings.service');
const MessageService = require('../service/message.service');

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
  processMessage: function (request, res) {
    try {
      let textMessage = WsService.getMessageTextFromWhebhookObject(
        request.body
      );
      if (textMessage === null || textMessage === "") {
        console.log("no se pudo procesar el mensaje");
        res.sendStatus(200);
      } else {
        wID = WsService.getFromNumberTextFromWhebhookObject(request.body);
        wName = WsService.getProfileNameFromWhebhookObject(request.body);
        console.log("wID " + wID);
        console.log("wName " + wName);
        if (wID && wID != null && wID != "")
          TiketService.verifyTiket(wID, wName, textMessage);

        res.sendStatus(200);
      }
    } catch (ex) {
      console.log(ex);
      res.sendStatus(200);
    }
  },
  processMessagePrana: async function (request, res) {
    try {
      let textMessage = WsService.getMessageTextFromWhebhookObject(
        request.body
      );
      if (textMessage === null || textMessage === "") {
        console.log("no se pudo procesar el mensaje");
        console.log(request.body);
        res.sendStatus(200);
      } else {
        wID = WsService.getFromNumberTextFromWhebhookObject(request.body);
        wName = WsService.getProfileNameFromWhebhookObject(request.body);
        if (wID && wID != null && wID != "")
        {


              console.log('toket verificado ' + textMessage);
              let p = await EmbeddingService.getMostSimilarParagraph(textMessage);
              console.log('paso embedding ');
              console.log(p);
              let t = 'ni idea';
              if(p && p != undefined && p != null)
              {
                t = p.text;
              }

              ChatGPTController.resolveChat(textMessage, t).then(data=>
                {
                  WsService.sendTextMessage(data, wID)
                  .then(() => {
                    console.log("enviado");
                    
                    res.sendStatus(200);
                  })
                  .catch((error) => {
                    console.log(error);
                    res.sendStatus(200);
                  });  
                });
          }                
      }
    } catch (ex) {
      console.log(ex);
      res.sendStatus(200);
    }
  },
  notify: function (request, res) {
    try {
      let textMessage = WsService.getMessageTextFromWhebhookObject(
        request.body
      );
      if (textMessage === null || textMessage === "") {
        //console.log(request.body);
      } else {
        wID = WsService.getFromNumberTextFromWhebhookObject(request.body);
        wName = WsService.getProfileNameFromWhebhookObject(request.body);
        TiketService.verifyTiket(wID, wName, textMessage);
        ChatGPTController.chat(textMessage)
          .then((response) => {
            let dest = WsService.getFromNumberTextFromWhebhookObject(
              request.body
            );
            WsService.sendTextMessage(response, dest)
              .then(() => {
                console.log("enviado");
                res.sendStatus(200);
              })
              .catch((error) => {
                console.log(error);
                res.sendStatus(200);
              });
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(200);
          });
      }
    } catch (ex) {
      console.log(ex);
      res.sendStatus(200);
    }
  },
};

module.exports = controller;
