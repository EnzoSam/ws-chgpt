const { response } = require('express');
const IAModelService = require('../service/iamodel.service');

var controller = {
  getAll: function (req, res) {    
    IAModelService.getAll().
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  },
  get: function (req, res) {    

    console.log(req.params.id);
    IAModelService.get(req.params.id).
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
    IAModelService.save(req.body).
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
    IAModelService.update(req.body).
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

    IAModelService.deleteOne(req.params.id).
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
