const { response } = require('express');
const AssistantService = require('../service/assistant.service');

var controller = {
  getAssistants: function (req, res) {    
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
  getAssistant: function (req, res) {    

    console.log(req.params.id);
    AssistantService.getAssistant(req.params.id).
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
    AssistantService.saveAssistants(req.body).
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
  },
  delete: function (req, res) {    

    AssistantService.deleteOne(req.params.id).
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  },  
};

module.exports = controller;
