import React ,{memo}from 'react'

const SelectQuantily = ({quantily, handleQuantily,handleChangeQuantity}) => {
  return (
    <div className='flex items-center pt-5'>
        <span onClick={()=>handleChangeQuantity('minus')} className='p-2 border-r border-gray-800 pr-5'>-</span>
        <input
          className='py-2 px-4 outline-none w-[100px] text-black text-center flex justify-center'
          type='text'
          value={quantily}
          onChange={e=>handleQuantily(e.target.value)}
        />
        <span onClick={()=>handleChangeQuantity('plus')} className='p-2 border-l border-gray-800 pl-5'>+</span>
    </div>
  )
}

export default memo(SelectQuantily)