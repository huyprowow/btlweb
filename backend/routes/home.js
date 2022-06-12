var express = require('express');
const product_controller = require('../controllers/productController');
var router = express.Router();


/* GET home page. */
router.get('/', product_controller.get_product_list);
router.get('/product/:id', product_controller.get_single_product);

module.exports = router;
