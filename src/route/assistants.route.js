
var express = require('express');
var AssistantController = require('../controller/assistants.controller');

var router = express.Router();

router.get("/", AssistantController.getAssistants); 
router.get("/:id", AssistantController.getAssistant);  
router.delete("/:id", AssistantController.delete);  
router.put("/", AssistantController.save);  
router.post("/", AssistantController.update);  

module.exports = router;
