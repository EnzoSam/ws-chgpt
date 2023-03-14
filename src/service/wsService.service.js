const { sendMessage, getTextMessageInput } = require("./whatsappHelper");

exports.test = async function () {
  console.log("WSService Ok");
};

exports.sendTextMessage = function (messageText, phoneNumber) {
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

exports.getMessageTextFromWhebhookObject = function (whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages[0].text) return null;

  return whebhookObject.entry[0].changes[0].value.messages[0].text.body;
};

exports.getFromNumberTextFromWhebhookObject = function (whebhookObject) {
  if (!whebhookObject.entry) return null;

  if (!whebhookObject.entry[0].changes) return null;

  if (!whebhookObject.entry[0].changes[0].value) return null;

  if (!whebhookObject.entry[0].changes[0].value.messages) return null;

  return whebhookObject.entry[0].changes[0].value.messages[0].from;
};
