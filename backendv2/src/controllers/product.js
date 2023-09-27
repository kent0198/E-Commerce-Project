const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const Product=require('../models/product')

const createProduct = asyncHandler(async (req, res) => {

    const {title,price,description, brand, category,color}=req.body
    const thumb=req?.files?.thumb[0]?.path
    const images=req.files?.images?.map(el=>el.path)
    if(!(title && price && description && category && brand && color)){
        throw new Error ('Missing inputs')
    }
    req.body.slug = slugify(req.body.title)
    if(thumb) req.body.thumb=thumb
    if(images) req.body.images=images
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        mes: newProduct ? 'Created' : 'Cannot create new product'
    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate({
        path:'ratings',
        populate:{
            path:'postedBy',
            select:'firstname lastname avatar',
        }
    })
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})



// Filtering, sorting & pagination(phan trang)

const getProducts = asyncHandler(async (req, res) => {

    const queries={...req.query}

    //Tach cac truong dac biet ra khoi query 
    
    const excludeFields=['limit','sort','page','fields']
    excludeFields.forEach(el=>delete queries[el])

    //Format lai cho dung vs cu phap cua mongodb
    let queryString= JSON.stringify(queries)
    queryString=queryString.replace(/\b(gte|gt|lt|lte)\b/g,matchEl=>`$${matchEl}`)
    const formatedQueries=JSON.parse(queryString)
    let colorQueryObject={}
    //Filltering
    if(queries?.title)  formatedQueries.title={$regex:queries.title,$options:'i'} //'i' bo qua viec tim kiem theo chu hoa hay thuong 
    if(queries?.category) formatedQueries.category={$regex:queries.category,$options:'i'}
    if(queries?.color){
        delete formatedQueries.color
        const colorArr=queries.color?.split(',')
        const colorQuery=colorArr.map(el=>({color:{$regex:el, $options:'i'}}))
        colorQueryObject={$or:colorQuery}
    } 

    let queryObject={}
    if(queries?.q){
        delete formatedQueries.q
        queryObject={
            $or:[
                {title:{$regex:queries.q,$options:'i'}},
                {category:{$regex:queries.q,$options:'i'}},
                {color:{$regex:queries.q,$options:'i'}},
            ]
        }
    }
    const qr={...colorQueryObject,...formatedQueries,...queryObject}
    let queryCommand=Product.find(qr) // sau khi  chay de day thi queryCommand van co o trong hang doi chu chua duoc chay
    

    //sortting  abc,def=>[adc,def]=>abc def
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join('')
        queryCommand=queryCommand.sort(sortBy)
    }

    //Fields limiting
    if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ')
        queryCommand=queryCommand.select(fields)
    }

    //Phan trang 
    //limit : Gioi han so lan lay ve trong 1 API
    //skip
    const page=+req.query.page || 1
    const limit=+req.query.limit ||process.env.LIMIT_PRODUCTS
    const skip=(page-1)*limit
    queryCommand.skip(skip).limit(limit)


    //Execute Query
    //So luong san pham thoa man dieu kien !== so luong san pham tra ve sau 1 lan goi API 
    queryCommand.then(async(respone)=>{ 
        try{
        const counts=await Product.find(qr).countDocuments()
        return res.status(200).json({
            success:respone ? true :false,
            counts,
            products:respone ?respone:"Can't get products"
        });
        } catch (err){
            throw new Error(err.message) 
        }
    });
})



const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})

const ratings=asyncHandler(async(req, res)=>{
    const {_id}=req.user
    const {star, comment,pid,updatedAt}=req.body
    if(!star ||!pid) throw new Error('Missing you')
    const ratingsProducts=await Product.findById(pid)
    const alreadyRating=ratingsProducts?.ratings?.find( el => el.postedBy.toString() === _id)
    if(alreadyRating){
        //update star and comment 
        await Product.updateOne({
            ratings:{$elemMatch:alreadyRating}
        },{
            $set:{"ratings.$.star":star,"ratings.$.comment":comment,"ratings.$.updatedAt":updatedAt}
        },{new:true})
    }else{
        //add star and comment 
        const respone= await Product.findByIdAndUpdate(pid, {
            $push:{ratings:{star,comment,postedBy:_id,updatedAt}}
        },{new:true})
    }
    //sum ratings
    const updatedProduct=await Product.findById(pid)

    const ratingCount=updatedProduct?.ratings.length

    const sumRatings=updatedProduct?.ratings.reduce((sum, el)=>sum+ +el.star,0)

    updatedProduct.totalRatings=Math.round(sumRatings*10/ratingCount )/10 

    await  updatedProduct.save()

    return res.status(200).json({
        status:true,
        updatedProduct,
    })
})
const updatedImageProduct=asyncHandler(async(req, res)=>{

    const {pid}=req.params
    if (!req.files) throw new Error('Missing inputs')
    const response=await Product.findByIdAndUpdate(pid, { $push : { images : { $each:req.files.map(el=>el.path)}}})
    return res.status(200).json({
        status:response ? true : false,
        updatedProducts:response?response:'Cannot upload images product'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    updatedImageProduct
}