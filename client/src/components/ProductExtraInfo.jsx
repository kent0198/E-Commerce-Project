import React,{memo} from 'react'
import {productExtraInfomation} from '../ultils/contantsProject'

const ProductExtraInfo = ({data}) => {
  return (
    <div className='flex pb-10 '>
        <span className='border rounded-full w-10 h-10 bg-gray-500 flex justify-center text-center items-center text-white text-[20px]'>{data.icon}</span>
        <div className='flex flex-col pl-4'>
            <span className='overflow-hidden leading-[18px] capitalize  font-bold text-gray-700 flex text-center text-sm'>{data.title}</span>
            <span className='text-gray-600 text-xs '>{data.sub}</span>
        </div>
    </div>
  )
}

export default memo(ProductExtraInfo)