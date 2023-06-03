const { response } = require('express');
const BusinessService = require('../service/business.service');

var controller = {
  getAll: function (req, res) {    
    BusinessService.getAll().
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
    BusinessService.get(req.params.id).
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
    BusinessService.save(req.body).
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
    BusinessService.update(req.body).
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

    BusinessService.deleteOne(req.params.id).
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
