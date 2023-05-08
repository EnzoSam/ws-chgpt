
var express = require('express');
var ChatGPTController = require('../controller/chatgpt.controller');

var router = express.Router();

router.get("/chat/:message", ChatGPTController.testChat); 
router.get("/embed", ChatGPTController.embed); 
router.get("/prana-chat/:text", ChatGPTController.pranaChat); 

module.exports = router;