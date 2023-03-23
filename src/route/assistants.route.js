
var express = require('express');
var AssistantController = require('../controller/assistants.controller');

var router = express.Router();

router.get("/", AssistantController.get);  
router.put("/", AssistantController.save);  
router.post("/", AssistantController.update);  

module.exports = router;