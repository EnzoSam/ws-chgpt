
var express = require('express');
var MessageController = require('../controller/message.controller');

var router = express.Router();

router.get("/", MessageController.getAll); 
router.get("/:id", MessageController.get);  
router.get("contact-messages/:id", MessageController.getContactMessages);  
router.delete("/:id", MessageController.delete);  
router.put("/", MessageController.save);  
router.post("/", MessageController.update);  

module.exports = router;
