import React from 'react'
import icons from '../../ultils/icons'

const {BiUserCircle}=icons
const IconDashBoard = () => {
  return (
    <div className='flex justify-center  gap-2 pr-3 pt-3'>
        <BiUserCircle size={20} color='gray' className='hover:shadow-lg transition'/>
        <BiUserCircle size={20} color='gray' className='hover:shadow-lg transition'/>
        <BiUserCircle size={20} color='gray' className='hover:shadow-lg transition'/>
    </div>
  )
}

export default IconDashBoard