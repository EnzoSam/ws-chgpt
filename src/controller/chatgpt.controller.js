const { response } = require('express');
const ChatGPTController = require('../service/chatgpt.service');
const EmbeddingService = require('../service/embeddings.service');

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
  embed: async function (req, res) {
    
    await EmbeddingService.processEmbeddings().
    then(()=>
      {
        console.log('oooookk');
        res.status(200).send('ok');
      })
      .catch(error =>{
        console.log(error);
      });
  },
  pranaChat: async function (req, res) {
    
    let p = await EmbeddingService.getMostSimilarParagraph(req.params.text);
    let t = 'ni idea';
    if(p && p != undefined && p != null)
    {
      t = p.text;
    }

    res.status(200).send(t);
  }   
};

module.exports = controller;
