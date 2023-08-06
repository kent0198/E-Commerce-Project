import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../apis/product'
import {ProductCard} from './'
import feature1 from '../assets/feature1.png'
import feature2 from '../assets/feature2.png'
import feature3 from '../assets/feature3.png'
import feature4 from '../assets/feature4.png'

const FeatureProducts = () => {

  const [featureProduct , setFeatureProduct]=useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({limit:9, totalRatings:1})
    if(response?.success) setFeatureProduct(response.products)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div className='w-full '>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURED PRODUCTS</h3>
        <div className='flex flex-wrap mt-[15px]'>
          {featureProduct?.map(el=>(
            <ProductCard key={el._id} data={el} />
            ))}
        </div>
        <div className='flex gap-10'>
              <img src={feature1}/>
              <div className='flex flex-col '>
              <img src={feature2}/>
              <img src={feature3} className='pt-11'/>
              </div>
              <img src={feature4} className='object-contain'/>
        </div>
    </div>
  )
}

export default FeatureProducts