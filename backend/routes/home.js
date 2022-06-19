var express = require('express');
const product_controller = require('../controllers/productController');
var router = express.Router();
const upload = require('../middlewares/uploadImage');

/* GET home page. */
router.get('/', product_controller.get_product_list);
router.get('/product/', product_controller.get_single_product);
router.post('/product/add',upload.single("image"), product_controller.create_product);

module.exports = router;
