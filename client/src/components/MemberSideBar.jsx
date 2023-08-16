import React,{Fragment, memo,useState} from 'react'
import logo from '../assets/logo.png'
import {memberSideBar} from '../ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../ultils/icons'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'

const {AiOutlineDown}=icons

const activedStyle='px-4 py-2 flex item-center gap-2 text-gray-800 text-sm text-center bg-gray-400'
const notactivedStyle='px-4 py-2 flex item-center gap-2 text-gray-800 text-sm text-center hover:bg-gray-600'

const MemberSideBar = () => {
  const {current}=useSelector(state=>state.user)


  return (
    <div className='bg-zinc-200 h-full text-gray-800 w-[250px]'>
        <div className='flex flex-col justify-center items-center p-4 gap-2 text-center'>
          <img src={current?.avatar || avatar} alt='logo' className='w-20 h-20 object-contain'/>
          <small>{`${current?.lastname} ${current?.firstname}`}</small>
        </div>
        <div>
          {memberSideBar.map(el=>(
            <Fragment key={el.id}>
                {el.type==='single' && 
                <NavLink to={el.path} className={({isActive})=>clsx(isActive && activedStyle, !isActive && notactivedStyle)}>
                    <span >{el.icon}</span>
                    <span>{el.text}</span>
                </NavLink>}
            </Fragment>
          ))}
        </div>
    </div>
  )
}

export default memo(MemberSideBar)