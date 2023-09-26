import React from 'react'

const ItemDashBoard = ({data}) => {
  return (
    <div className=' px-2 w-[280px] h-[136px]  rounded-2xl shadow-xl border border-gray-300'>
        <div className='flex justify-between gap-10 pt-2'>
            <div className='w-[64px] h-[64px] flex justify-center items-center bg-rose-300 rounded-lg'>
                {data.icon}
            </div>
            <div className='mr-4'>
                <div className='text-gray-800 text-base'>{data.title}</div>
                <div className='text-gray-900 flex justify-end font-semibold text-lg'>{data.count}</div>
            </div>
        </div>
        <div className='text-base mt-8 text-gray-600'>
            {data.desc}
        </div>
    </div>
  )
}

export default ItemDashBoard