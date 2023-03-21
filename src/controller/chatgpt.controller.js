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
    then(data=>
      {
        console.log(data);
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
      });
  },
};

module.exports = controller;
