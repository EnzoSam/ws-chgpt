
var express = require('express');
var TiketsController = require('../controller/tikets.controller');

var router = express.Router();

router.get("/:state", TiketsController.getTikets);  
router.post("/:state", TiketsController.update);  

module.exports = router;