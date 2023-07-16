const ProductCategory=require('../models/productCaterogy')
const asyncHandler=require('express-async-handler')

const createCategory=asyncHandler(async(req, res)=>{
    const response=await ProductCategory.create(req.body)
    return res.json({
        success:response ? true:false,
        createCategory:response ? response : "Cannot create new product-category"
    })
})

const getCategory=asyncHandler(async(req, res)=>{
    const response  =await ProductCategory.find().select('title _id')
    return res.json({
        success:response ? true:false,
        productCategory:response ? response : "Cannot get Category"
    })
})

const updateCategory=asyncHandler(async(req, res)=>{
    const{_id}=req.params
    const response=await ProductCategory.findByIdAndUpdate(_id, req.body, {new:true})
    return res.json({
        success:response ? true:false,
        updateCategory:response  ? response :"Can't update"
    })

})

const deleteCategory=asyncHandler(async(req, res)=>{
    const {_id}=req.params
    const response = await ProductCategory.findByIdAndDelete(_id,req.body,{new:true})
    return res.json({
        success:response ?true :false,
        deleteCategory:response ? response :"Can't delete product-category"
    })
})

module.exports={
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}