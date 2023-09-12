import React from 'react'

const CardService = ({cardService}) => {

  return (
    <div className='flex'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <img className='w-[80px] h-[80px] text-gray-800' src={cardService.img}/>
            <div className='text-base text-gray-800 font-semibold'>{cardService.title}</div>
            <div className='text-xs text-gray-700 font-medium text-center'>{cardService.desc}</div>
        </div>
    </div>
  )
}

export default CardService