const Product=require('../models/product')
const productCaterogy = require('../models/productCaterogy')
const Blog=require('../models/blog')
const data=require('../../../data/ecommerce.json')
const dataCate=require('../../../data/brand_cate')
const dataBlog=require('../../../data/blog')
const slugify = require('slugify')
const asyncHandler=require('express-async-handler')


const fn =async(product)=>{
    await Product.create({
        title: product?.name,
        slug:slugify(product?.name)+Math.round(Math.random()*100)+'',
        description: product?.description,
        brand:product?.brand,
        price:Math.round(Number(product?.price?.match(/\d/g).join(''))/100),
        category:product?.category[1],
        quantity:Math.round(Math.random()*1000),
        sold:Math.round(Math.random()*100),
        images:product?.images,
        color:product?.variants?.find(el=>el.label==='Color')?.variants[0],
        thumb:product?.thumb,
        totalRatings:0,
    })
}

const insertProduct=asyncHandler(async(req, res)=>{
    const promises=[]
    for (let product of data) promises.push(fn(product))
    await Promise.all(promises)
    const response=await Brand.create(req.body)
    return res.json('Done')
})





const fn2=async(cate)=>{
    await productCaterogy.create({
        title:cate?.cate,
        brand:cate?.brand,
        image:cate?.image,
    })
}

const insertCategory=asyncHandler(async(req, res)=>{
    const promises=[]
    for (let cate of dataCate)  promises.push(fn2(cate))
    await Promise.all(promises)
    return res.json('Done')
})


const f3=async(blog)=>{
    await Blog.create({
        title:blog?.title,
        desc:blog?.desc,
        category:blog?.category,
        numberViews:blog?.numberViews,
        image:blog?.image,
        author:blog?.author,
    })
}
const insertBlog=asyncHandler(async(req, res)=>{
    const promises=[]
    for (let blog of dataBlog ) promises.push(f3(blog))
    await Promise.all(promises)
    return res.json('Done')
})

module.exports = {
    insertProduct,
    insertCategory,
    insertBlog,
}