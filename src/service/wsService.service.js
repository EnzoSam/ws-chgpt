var request = require('request');

exports.test = async function() {
    console.log("WSService Ok");
};

exports.sendTextMessage = function(messageText, phoneNumber) {

    let message = buildTextMessage(messageText,phoneNumber);
    request(builMessage(message), (error, response, body)=>
    {
        if(error)
        {
            console.log(error);
        }
        else if (response.statusCode == 200) {
            console.log(messageText + ' enviado a ' + phoneNumber);
            console.log(body);
        }
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


function buildHeaders() {
    let header = 
    {
        'Authorization': process.env.WHATSAPP_TOKEN,
        'Content-Type': 'application/json'
    }

    return header;
}

function buildTextMessage(messageText, phoneNumber)
{
    let message =
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": phoneNumber,
      "type": "text",
      "text": { 
        "preview_url": false,
        "body": messageText
        }
    };

    return message;
}

function buildUrlApi()
{
    let url ='https://graph.facebook.com/v16.0/' + 
    process.env.FROM_PHONE_NUMBER_ID + '/messages';

    return url;
}

function builMessage(message)
{
    let headers = buildHeaders();
    let url = buildUrlApi();    
    let options = {
        url: url,
        method: 'POST',
        headers: headers,
        body: message
    };

    return options;
}
