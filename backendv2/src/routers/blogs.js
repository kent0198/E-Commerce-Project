const router=require('express').Router();
const ctrls = require('../controllers/blog') 
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader=require('../configs/cloudinary.config')

router.get('/',ctrls.getBlogs)
router.put('/likes/:bid',[verifyAccessToken],ctrls.likeBlog)
router.put('/dislikes/:bid',[verifyAccessToken],ctrls.dislikeBlog)
router.post('/',[verifyAccessToken, isAdmin],ctrls.createNewBlog)
router.put('/:bid',[verifyAccessToken, isAdmin],ctrls.updateBlog)
router.get('/one/:bid',ctrls.getBlog)
router.delete('/:bid',[verifyAccessToken, isAdmin],ctrls.deleteBlog)
router.put('/image/:bid',[verifyAccessToken, isAdmin],uploader.single('image'),ctrls.updatedImageBlog)
module.exports=router