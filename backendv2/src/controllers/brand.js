const Brand=require('../models/brand')
const asyncHandler=require('express-async-handler')

const createCategory=asyncHandler(async(req, res)=>{
    const response=await Brand.create(req.body)
    return res.json({
        success:response ? true:false,
        createCategory:response ? response : "Cannot create new brand"
    })
})

const getCategory=asyncHandler(async(req, res)=>{
    const response  =await Brand.find()
    return res.json({
        success:response ? true:false,
        productCategory:response ? response : "Cannot get Brand"
    })
})

const updateCategory=asyncHandler(async(req, res)=>{
    const{bcid}=req.params
    const response=await Brand.findByIdAndUpdate(bcid, req.body, {new:true})
    return res.json({
        success:response ? true:false,
        updateCategory:response  ? response :"Can't update Brand"
    })

})

const deleteCategory=asyncHandler(async(req, res)=>{
    const {bcid}=req.params
    const response = await Brand.findByIdAndDelete(bcid,req.body,{new:true})
    return res.json({
        success:response ?true :false,
        deleteCategory:response ? response :"Can't delete Brand"
    })
})

module.exports={
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}