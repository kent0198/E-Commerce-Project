const router = require('express').Router()
const ctrls = require('../controllers/product')
const uploader=require('../configs/cloudinary.config')

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin],ctrls.createProduct)
router.get('/', ctrls.getProducts)
router.put('/ratings', verifyAccessToken,ctrls.ratings)
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get('/:pid', ctrls.getProduct)
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin],uploader.array('images',10), ctrls.updatedImageProduct)


module.exports = router