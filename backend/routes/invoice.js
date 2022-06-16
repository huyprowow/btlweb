var express = require('express');
const invoice_controller = require('../controllers/invoiceController.js');
var router = express.Router();

/*get invoice*/
router.get('/', invoice_controller.get_all_invoice);
router.post('/buy', invoice_controller.create_invoice);
router.delete('/delete/:id', invoice_controller.delete_invoice);

module.exports = router;
