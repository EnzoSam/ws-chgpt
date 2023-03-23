const { response } = require('express');
const AssistantService = require('../service/assistant.service');

var controller = {
  get: function (req, res) {    
    AssistantService.getAssistants().
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  },
  save: function (req, res) {    
    AssistantService.save(req.body).
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  },  
  update: function (req, res) {    
    AssistantService.update(req.body).
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  }  
};

module.exports = controller;
