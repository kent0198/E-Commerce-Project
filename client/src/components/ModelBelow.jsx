import React,{useEffect, useState} from 'react'
import { apiGetProducts } from '../apis/product'
import {formatMoney} from '../ultils/helper'

const ModelBelow = () => {
  const [dealdaily, setDealDaily] =useState(null)
  const fetchDealDayly=async () => {
    const response = await apiGetProducts({limit:1,page:Math.round(Math.random()*10)})
    if (response?.success) {
    setDealDaily(response.products[0])
    }
  }
  useEffect(()=>{
    fetchDealDayly()
  },[])

  return (
    <div className='absolute flex w-full h-screen left-0 bottom-0 inset-0 items-end justify-start '>
            <div className='w-[300px] h-[150px] bg-gray-50 border shadow-md'>
                <h2 className='flex justify-center text-gray pt-3 font-medium'>OTHER CUSTOMERS ALSO VIEWED</h2>
                <div className='flex gap-3 pl-3 py-3'>
                  <img className='w-[80px] h-[80px] object-contain' src={dealdaily?.thumb} alt=""/>
                  <div className='flex flex-col gap-3'>
                    <h2 className='text-gray-800 font-medium'>{dealdaily?.title}</h2>
                    <div className='text-gray-600 font-normal'>{`${formatMoney(dealdaily?.price)}`}</div>
                  </div>
                </div>
            </div>
    </div>
  )
}


export default ModelBelow