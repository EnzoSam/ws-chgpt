const ChatGPTController = require('../service/chatgpt.service');

var controller = {
  test: function (req, res) {
    return res.status(200).send({
      message: "ChatGPTController OK.",
    });
  },

};

module.exports = controller;
