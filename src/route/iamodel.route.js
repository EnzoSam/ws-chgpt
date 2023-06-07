
var express = require('express');
var IAModelController = require('../controller/iamodel.controller');

var router = express.Router();

router.get("/", IAModelController.getAll); 
router.get("/:id", IAModelController.get);  
router.delete("/:id", IAModelController.delete);  
router.put("/", IAModelController.save);  
router.post("/", IAModelController.update);  

module.exports = router;
