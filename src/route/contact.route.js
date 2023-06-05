
var express = require('express');
var ContactController = require('../controller/contact.controller');

var router = express.Router();

router.get("/", ContactController.getAll); 
router.get("/:id", ContactController.get);  
router.delete("/:id", ContactController.delete);  
router.put("/", ContactController.save);  
router.post("/", ContactController.update);  

module.exports = router;
