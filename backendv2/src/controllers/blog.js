const Blog=require('../models/blog')
const asyncHandler=require('express-async-handler')

const createNewBlog=asyncHandler(async(req, res)=>{
    const {title, desc,category}=req.body
    if(!title || !desc || !category) throw new Error('Missing input') 
    const response=await Blog.create(req.body)
    return res.json({
        success:response ? true:false,
        createBlog:response ? response : "Cannot create new blog-category"
    })
})

const updateBlog=asyncHandler(async(req, res)=>{
    const {bid}=req.params
    if (Object.keys(req.body).length===0)  throw new Error('Missing input') 
    const response=await Blog.findByIdAndUpdate(bid, req.body, {new:true})
    return res.json({
        success:response ? true:false,
        updateBlog:response ? response : "Cannot update blog-category"
    })
})

const getBlogs=asyncHandler(async(req, res)=>{
    const response=await Blog.find()
    return res.json({
        success:response ? true:false,
        getBlogs:response ? response : "Cannot get blog-category"
    })
})


//LIKE AND DISLIKE 
//$pull : dung de xoa $push : dung de them 
const likeBlog=asyncHandler(async(req, res)=>{
    const{ _id }=req.user
    const { bid }=req.params

    if(!bid) throw new Error('Missing input')
    const blog= await Blog.findById(bid)
    const alreadyDislike=blog?.disLikes?.find(el=>el.toString()===_id)
    if (alreadyDislike){
        const response= await Blog.findByIdAndUpdate(bid,{$pull:{dislikes:_id}},{new:true})
        return res.json({
            success:response?true:false,
            rs:response
        })
    }
    const isLike=blog?.likes?.find(el=>el.toString()===_id)
    if(isLike){
        const response= await Blog.findByIdAndUpdate(bid, {$pull:{likes:_id}},{new:true})
        return res.json({
            success:response?true:false,
            rs:response ? response:"Can't not ...."
        })
    }else{
        const response=await Blog.findByIdAndUpdate(bid,{$push:{likes:_id}, isLike:true},{new:true})
        return res.json({
            success:response?true:false,
            rs:response ? response:"Can't not ...."
        })
    }
})
 

const dislikeBlog=asyncHandler(async(req, res)=>{
    const{ _id }=req.user
    const { bid }=req.params

    if(!bid) throw new Error('Missing input')
    const blog= await Blog.findById(bid)
    const alreadyLike=blog?.likes?.find(el=>el.toString()===_id)
    if (alreadyLike){
        const response= await Blog.findByIdAndUpdate(bid,{$pull:{likes:_id}},{new:true})
        return res.json({
            success : response ? true : false,
            rs:response
        })
    }
    const isDisLike=blog?.dislikes?.find(el=>el.toString()===_id)
    if(isDisLike){
        const response= await Blog.findByIdAndUpdate(bid, {$pull:{dislikes:_id}},{new:true})
        return res.json({
            success : response ? true : false,
            rs:response 
        })
    }else{
        const response=await Blog.findByIdAndUpdate(bid,{$push:{dislikes:_id}, isLike:true},{new:true})
        return res.json({
            success : response ? true : false,
            rs:response 
        })
    }
})
 

/* const excludedFields='-refreshToken -password -role -createdAt -updatedAt' */
const getBlog=asyncHandler(async(req, res)=>{
    const {bid}=req.params
    const blog=await Blog.findByIdAndUpdate(bid,{$inc:{numberViews:1}},{new:true}).populate('likes','firstname lastname').populate('dislikes','firstname lastname')
    return res.json({
        success: blog ?true :false,
        rs:blog
    })
})

const deleteBlog=asyncHandler(async(req, res)=>{
    const {bid}=req.params
    const blog=await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ?true :false,
        deleteBlog:blog ||'Something went wrong'
    })
})

const updatedImageBlog=asyncHandler(async(req, res)=>{

    const {bid}=req.params
    if (!req.file) throw new Error('Missing inputs')
    const response=await Blog.findByIdAndUpdate(bid, {image:req.file.path },{new:true})
    return res.status(200).json({
        status:response ? true : false,
        updateBlog:response?response:'Cannot upload images Blog'
    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    updatedImageBlog
}