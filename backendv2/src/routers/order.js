const router=require('express').Router();
const ctrls = require('../controllers/order') 
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')


router.post('/',[verifyAccessToken],ctrls.createNewOrder)
router.put('/status/:oid',[verifyAccessToken,isAdmin],ctrls.updateStatus)

module.exports=router