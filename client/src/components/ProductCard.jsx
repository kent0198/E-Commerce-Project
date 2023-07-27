import React from 'react'
import { renderStarFromNumber } from "../ultils/helper"
import { formatMoney } from '../ultils/helper'

const ProductCard = ({ data }) => {
    return (       
            <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
                <div className='flex w-full border'>
                    <img src={data?.thumb || 'https://digital-world-2.myshopify.com/cdn/shop/products/x2_370x.jpg?v=1491404795'} alt='product' className='w-[110px] object-contain p-4 rounded-lg' />
                    <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                        <span className='line-clamp-1 lowercase text-sm'>{data?.slug?.toLowerCase()}</span>
                        <span className='flex justify-center'>{renderStarFromNumber(data?.totalRatings, 12)?.map((el, index)=>(
                            <span key={index}>{el}</span>
                        ))}</span>
                        <span>{`${formatMoney(data?.price)}VND`}</span>
                    </div>
                </div>
            </div>

    )
}

export default ProductCard