const BlogCategory=require('../models/blogCategory')
const asyncHandler=require('express-async-handler')

const createCategory=asyncHandler(async(req, res)=>{
    const response=await BlogCategory.create(req.body)
    return res.json({
        success:response ? true:false,
        createCategory:response ? response : "Cannot create new blog-category"
    })
})

const getCategory=asyncHandler(async(req, res)=>{
    const response  =await BlogCategory.find().select('title _id')
    return res.json({
        success:response ? true:false,
        productCategory:response ? response : "Cannot get Blog Category"
    })
})

const updateCategory=asyncHandler(async(req, res)=>{
    const{bcid}=req.params
    const response=await BlogCategory.findByIdAndUpdate(_id, req.body, {new:true})
    return res.json({
        success:response ? true:false,
        updateCategory:response  ? response :"Can't update"
    })

})

const deleteCategory=asyncHandler(async(req, res)=>{
    const {bcid}=req.params
    const response = await BlogCategory.findByIdAndDelete(_id,req.body,{new:true})
    return res.json({
        success:response ?true :false,
        deleteCategory:response ? response :"Can't delete Blog-category"
    })
})

module.exports={
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}