import React ,{useState,useEffect}from 'react'
import {createSlug} from '../ultils/helper'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Sidebar = () => {
  
  const {categories}=useSelector(state => state.app)
  
  return (
    <div  className='flex flex-col border'>
        {categories?.map(el=>(
            <NavLink key={createSlug(el.title)} to={createSlug(el.title)} className={({isActive})=>isActive?'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main hover:ease-in' :'px-5 pt-[15px] pb-[14px] text-sm hover:text-main ease-in duration-300'}>
              {el.title} 
            </NavLink>
        ))}
    </div>
  )
}

export default Sidebar