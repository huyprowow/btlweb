var express = require('express');
var router = express.Router();
const accountController=require('../controllers/accountController');
const { protecting } = require('../middlewares/auth');
//const {authenticationToken}=require('../midllewares/auth_token_jwt');

/* GET users listing. */
router.get('/',accountController.get_account_list);
router.post("/signin",accountController.signin_account);
router.post("/signup",accountController.create_account);
// router.get("/email",accountController.get_email_by_userName);
// router.delete("/:id",accountController.delete_account);
// router.put("/:id",accountController.update_account);
module.exports = router;
