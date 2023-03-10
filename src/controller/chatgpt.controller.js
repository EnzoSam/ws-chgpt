const { response } = require('express');
const ChatGPTController = require('../service/chatgpt.service');

var controller = {
  test: function (req, res) {
    return res.status(200).send({
      message: "ChatGPTController OK.",
    });
  },
  testChat: function (req, res) {
    
    let msge = req.params.message;
    ChatGPTController.chat(msge).
    then(response=>
      {
        console.log(response.data);
       // res.status(200).send(response.data.choices[0].text);
      })
      .catch(error =>{
        console.log(error);
      });
  },
};

module.exports = controller;
