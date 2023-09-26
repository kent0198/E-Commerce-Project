import React from 'react'
import {Dashboard} from '../../ultils/contants'
import ItemDashBoard from './ItemDashBoard'

const NavbarBottomDashBoard = () => {
  return (
    <div className='flex justify-start items-center gap-2'>
        {Dashboard.map((el)=>(
            <ItemDashBoard key={el.id} data={el}/>
        ))}
    </div>
  )
}

export default NavbarBottomDashBoard