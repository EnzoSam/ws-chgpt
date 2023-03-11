const { sendMessage, getTextMessageInput } = require("./whatsappHelper");

exports.test = async function() {
    console.log("WSService Ok");
};

exports.sendTextMessage = function(messageText, phoneNumber) {

    console.log(messageText);
    console.log('messageText ' + messageText + ' ' + phoneNumber);
    if(messageText === null || messageText === '')
    return;
    var data = getTextMessageInput(phoneNumber, messageText);
    console.log(data);
    sendMessage(data)
      .then(function (response) {

        console.log('enviadoooooo');
            console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        res.sendStatus(500);
        return;
      });
  
};

exports.getMessageTextFromWhebhookObject = function(whebhookObject) {

    if(!whebhookObject.entry)
        return null;
    
    if(!whebhookObject.entry[0].changes)
        return null;

    if(!whebhookObject.entry[0].changes[0].value)
        return null;

    if(!whebhookObject.entry[0].changes[0].value.messages)
        return null;        

    return  whebhookObject.entry[0].changes[0].value.messages[0].text;
};