import React from 'react'
import icons from '../ultils/icons'

const {AiOutlineCloseCircle}=icons

const Cart = () => {
  return (
    <div className='w-[400px] max-h-screen overflow-y-auto bg-gray-900 text-white p-6'>
        <header className='p-4 border-b border-gray-300 font-bold text-2xl flex justify-between items-center'>
            <span>Your Cart</span>
            <AiOutlineCloseCircle />
        </header>
    </div>
  )
}

export default Cart