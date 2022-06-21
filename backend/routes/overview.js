var express = require('express');
const overviewController = require('../controllers/overviewController.js');
var router = express.Router();

router.get("/", overviewController.get_overview);
module.exports = router;