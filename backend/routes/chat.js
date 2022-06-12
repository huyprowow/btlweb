var express = require('express');
var router = express.Router();
const chatController = require('../controllers/chatController');
const { protecting } = require('../middlewares/auth');

/* GET users listing. */
router.get("/",protecting,chatController.get_chat);
router.post("/",protecting,chatController.create_chat);
module.exports = router;