const { sendMessage, getTextMessageInput } = require("./whatsappHelper");
const EmbeddingService = require("../service/embeddings.service");
const ChatGPTService = require("../service/chatgpt.service");
const ContactService = require("../service/contact.service");
const MessageService = require("../service/message.service");
const GPTConstants = require("../constants/gpt.constant");

exports.test = async function () {
  console.log("WSService Ok");
};

module.exports.getProfileNameFromWhebhookObject = getProfileNameFromWhebhookObject;
module.exports.getMessageTextFromWhebhookObject = getMessageTextFromWhebhookObject;
module.exports.sendTextMessage = sendTextMessage;
module.exports.getFromNumberTextFromWhebhookObject =getFromNumberTextFromWhebhookObject;
module.exports.processMessagePrana = processMessagePrana;

function sendTextMessage (messageText, phoneNumber) {
  let promise = new Promise((resolve, reject) => {
    try {
      console.log(messageText);
      if (messageText === null || messageText === "") {
        resolve();
      } else {
        var data = getTextMessageInput(phoneNumber, messageText);
        sendMessage(data)
          .then(function (response) {
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      }
    } catch (ex) {
      reject(ex);
    }
  });

  return promise;
};

function getMessageTextFromWhebhookObject (whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages[0].text) return null;

  return whebhookObject.entry[0].changes[0].value.messages[0].text.body;
};

function getFromNumberTextFromWhebhookObject(whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages) return null;

  return whebhookObject.entry[0].changes[0].value.messages[0].from;
};

function getProfileNameFromWhebhookObject (whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (
    !whebhookObject.entry[0].changes[0].value.contacts ||
    whebhookObject.entry[0].changes[0].value.contacts.length === 0
  )
    return null;

  if (!whebhookObject.entry[0].changes[0].value.contacts[0].profile)
    return null;

  if (!whebhookObject.entry[0].changes[0].value.contacts[0].profile.name)
    return null;

  return whebhookObject.entry[0].changes[0].value.contacts[0].profile.name;
};

function getMessageIDFromWhebhookObject (whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages[0].id) return null;

  return whebhookObject.entry[0].changes[0].value.messages[0].id;
};

function processMessagePrana(whatsappObject) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let textMessage = getMessageTextFromWhebhookObject(whatsappObject);
      if (textMessage === null || textMessage === "") {
        console.log("no se pudo procesar el mensaje");
        reject({ code: 200, message: "No se pudo procesar el mensaje." });
        return;
      }

      let wID = getFromNumberTextFromWhebhookObject(whatsappObject);
      let wName = getProfileNameFromWhebhookObject(whatsappObject);
      let wMessageID = getMessageIDFromWhebhookObject(whatsappObject);

      if (!wID || (wID == null && wID === "")) {
        reject({ code: 200, message: "No se pudo obtener el contacto." });
        return;
      }

      ContactService.verifyContact(wID, wName)
        .then((contact) => {
          ContactService.verifyContact(
            process.env.WHATSAPP_SENDER_NUMBER,
            process.env.WHATSAPP_SENDER_NAME
          )
            .then((contactSender) => {
              MessageService.saveMessage(
                textMessage,
                contact,
                contactSender,
                GPTConstants.roles.user,
                wMessageID,                
              )
                .then((messageSaved) => {
                  EmbeddingService.getMostSimilarText(textMessage)
                    .then((similarTextData) => {
                      sendTextMessage(similarTextData, wID)
                        .then(() => {

                          MessageService.saveMessage
                          (similarTextData, contactSender,
                            contact,GPTConstants.roles.assistant,'').then
                            (messageAssistantSaved=>
                              {
                                resolve();
                                return;
                              }
                              ).catch(error=>
                                {
                                  reject({
                                    code: 500,
                                    message: "Error al guardar mensaje asistente.",
                                  });
                                  return;
                                })

                          
                        })
                        .catch(error);
                      {
                        reject(error);
                        return;
                      }
                    })
                    .catch((err) => {
                      reject({
                        code: 500,
                        message: "Error al procesar embbedings.",
                      });
                      return;
                    });
                })
                .catch((error) => {
                  reject({
                    code: 500,
                    message: "No se pudo procesar el mensaje.",
                  });
                  return;
                });
            })
            .catch((error) => {
              reject({
                code: 500,
                message: "No se pudo procesar el contacto.",
              });
              return;
            });
        })
        .catch((error) => {
          reject({ code: 500, message: "No se pudo procesar el contacto." });
          return;
        });
    } catch (exc) {
      reject({ code: 500, message: "Error al procesar mensaje." });
      return;
    }
  });
  return prommise;
}
