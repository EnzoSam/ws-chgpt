
var express = require('express');
var TiketsController = require('../controller/tikets.controller');

var router = express.Router();

router.get("/:state", TiketsController.getTikets);
router.get("/", TiketsController.getTikets);
router.get("/detail/:id", TiketsController.getTiket);
router.post("/", TiketsController.update);  
router.post("/assignation", TiketsController.assignAssistant);  


module.exports = router;