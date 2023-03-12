
var express = require('express');
var ChatGPTController = require('../controller/chatgpt.controller');

var router = express.Router();

router.get("/chat/:message", ChatGPTController.testChat); 

module.exports = router;