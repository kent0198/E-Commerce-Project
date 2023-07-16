const router = require('express').Router()
const ctrls = require('../controllers/productCategory')

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory)
router.get('/', ctrls.getCategory)
router.put('/:_id', [verifyAccessToken, isAdmin], ctrls.updateCategory)
router.delete('/:_id', [verifyAccessToken, isAdmin], ctrls.deleteCategory)


module.exports = router