
var express = require('express');
var BusinessController = require('../controller/business.controller');

var router = express.Router();

router.get("/", BusinessController.getAll); 
router.get("/:id", BusinessController.get);  
router.delete("/:id", BusinessController.delete);  
router.put("/", BusinessController.save);  
router.post("/", BusinessController.update);  

module.exports = router;
