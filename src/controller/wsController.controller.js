const WsService = require("../service/wsService.service");
const ChatGPTController = require("../service/chatgpt.service");
const TiketService = require("../service/tiket.service");
const EmbeddingService = require('../service/embeddings.service');

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
  processMessagePrana: function (request, res) {
    console.log('procesando mensaje');
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
        {
          TiketService.verifyTiket(wID, wName, textMessage).then(()=>
            {
              EmbeddingService.getMostSimilarParagraph(textMessage).then
              (()=>
                {
                  let t = 'ni idea';
                  if(p && p != undefined && p != null)
                  {
                    t = p.text;
                  }

                  WsService.sendTextMessage(t, wID)
                  .then(() => {
                    console.log("enviado");
                  })
                  .catch((error) => {
                    console.log(error);
                  });                  
                })

            });
          }

        res.sendStatus(200);
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
