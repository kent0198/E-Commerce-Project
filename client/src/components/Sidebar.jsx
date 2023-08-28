import React ,{useState,useEffect}from 'react'
import {createSlug} from '../ultils/helper'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import icons from '../ultils/icons'

const {MdOutlineDonutSmall}=icons

const Sidebar = () => {
  
  const {categories}=useSelector(state => state.app)
  
  
  return (
    <div  className='flex flex-col gap-1 rounded-lg'>
        {/*  <div className='group h-[50%] w-full bg-green-200'>
        <p className='peer/honda '>aaaaa</p>
        <p className='group-hover:bg-blue-300 peer/bmw '>aaaaa</p>
        <p className='peer-hover/honda:bg-[rgb(2,255,0)]/5 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] bg-gradient-to-r from-[rgba(2,0,36,1)] from-[5%] to-[rgba(9,121,97,1)] to-[50%]'>bbb</p>
        <p className='peer-hover/bmw:bg-green-100'>ccc</p>
      </div> */}
        <div className='flex gap-4 justify-start text-center p-4 bg-red-500 items-center text-white'>
            <MdOutlineDonutSmall color='white' size={20}/>
            <header className='font-semibold uppercase text-[16px] font-[600]'>ALL COLLECTIONS</header>
        </div>
        {categories?.map(el=>(
            <NavLink key={createSlug(el.title)} to={createSlug(el.title)} className={({isActive})=>isActive 
            ?'hover:ease-in ;' 
            :'p-3 font-medium text-gray-700 shadow-md border-t-3 border-orange-500 border-b-0 hover:shadow-xl hover:bg-gradient-to-r from-[#f0ebe3] from-[5%] to-[#efd1d9] to-[50%] uppercase'}>
                  {el?.title} 
            </NavLink>
        ))}
    </div>
  )
}

export default Sidebar