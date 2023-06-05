const { response } = require('express');
const ContactService = require('../service/contact.service');

var controller = {
  getAll: function (req, res) {    
    ContactService.getAll().
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
    ContactService.get(req.params.id).
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
    ContactService.save(req.body).
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
    ContactService.update(req.body).
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

    ContactService.deleteOne(req.params.id).
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
