import React,{Fragment, memo,useState} from 'react'
import logo from '../assets/logo.png'
import {adminSidebar} from '../ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../ultils/icons'

const {AiOutlineDown}=icons

const activedStyle='px-4 py-2 flex item-center gap-2 text-gray-800 text-sm text-center bg-gray-400'
const notactivedStyle='px-4 py-2 flex item-center gap-2 text-gray-800 text-sm text-center hover:bg-gray-600'

const AdminSideBar = () => {
  const [actived, setactived] = useState([])
  const handleShowTabs=(tabID)=>{
      if(actived.some(el=>el===tabID)) setactived(prev=>prev.filter(el=>el!==tabID))
      else setactived(prev=>[...prev, tabID])
  }
  return (
    <div className='bg-zinc-200 h-full text-gray-800'>
        <div className='flex flex-col justify-center items-center p-4 gap-2 text-center'>
          <img src={logo} alt='logo' className='w-full object-contain'/>
          <small>Admin Workspace</small>
        </div>
        <div>
          {adminSidebar.map(el=>(
            <Fragment key={el.id}>
                {el.type==='single' && 
                <NavLink to={el.path} className={({isActive})=>clsx(isActive && activedStyle, !isActive && notactivedStyle)}>
                    <span >{el.icon}</span>
                    <span>{el.text}</span>
                </NavLink>}
                  {el.type==='parent' && 
                <div onClick={()=>handleShowTabs(el.id)} className=' flex flex-col text-gray-950 text-sm cursor-none'>
                  <div className='flex items-center justify-between gap-2 px-4 py-2 text-center hover:bg-gray-400'>
                    <div className='flex items-center gap-2'>
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </div>
                    <AiOutlineDown/>
                  </div>
                  {
                    actived.some(id=>+id===+el.id) && <div className='flex flex-col '>
                    {el.submenu.map(item=>(
                        <NavLink 
                          key={item.text} 
                          to={item.path}
                          onClick={e=>e.stopPropagation()}
                          className={({isActive})=>clsx(isActive && activedStyle, !isActive && notactivedStyle,'pl-10')}
                          >
                          {item.text}
                        </NavLink>
                    ))}
                  </div>
                  }
                </div>}
            </Fragment>
          ))}
        </div>
    </div>
  )
}

export default memo(AdminSideBar)