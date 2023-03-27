const { response } = require('express');
const TiketService = require('../service/tiket.service');

var controller = {
  getTikets: function (req, res) {    
    let state = req.params.state;
    TiketService.getTikets(undefined, undefined, state).
    then(data=>
      {
        res.status(200).send(data);
      })
      .catch(error =>{
        console.log(error);
        res.status(500).send(error);
      });
  },
  getTiket: function (req, res) {    
    let id = req.params.id;
    TiketService.getTiket(id).
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
    TiketService.updateTiket(req.body).
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
