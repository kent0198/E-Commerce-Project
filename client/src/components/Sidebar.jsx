import React ,{useState,useEffect}from 'react'
import {createSlug} from '../ultils/helper'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Sidebar = () => {
  
  const {categories}=useSelector(state => state.app)
  
  return (
    <div  className='flex flex-col border-2 border-sky-200  rounded-lg'>
        {categories?.map(el=>(
            <NavLink key={createSlug(el.title)} to={createSlug(el.title)} className={({isActive})=>isActive?' text-white px-5 pt-[15px] pb-[14px] text-sm  hover:ease-in border-2 border-sky-200' :'px-5 pt-[15px] pb-[14px] text-sm hover:text-white ease-in duration-300 hover:bg-gray-500 '}>
                  {el.title} 
            </NavLink>
        ))}
    </div>
  )
}

export default Sidebar