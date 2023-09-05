import React, { Fragment, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useSelector, useDispatch } from 'react-redux'
import { clearMessage, logout } from '../store/user/userSlice'
import {showCart} from '../store/app/appSlice'
import withBase from '../hocs/withBase'



const { BsFillTelephoneFill, MdEmail, PiHandbagDuotone, FaUserCircle ,TfiViewListAlt} = icons
const Header = ({dispatch}) => {
  const { current } = useSelector(state => state.user)
  const [isShowOption, setisShowOption] = useState(false)
  useEffect(()=>{
      const handleClickOutOption=(e)=>{
        const profile=document.getElementById('profile')
        if(!profile?.contains(e.target)) setisShowOption(false)
      }
      document.addEventListener('click', handleClickOutOption)
      return ()=>{
        document.removeEventListener('click', handleClickOutOption)
      }
  },[])
  const handleDispatch=()=>{
   dispatch(showCart({singal:true}))
  }
  return (
    <div className=' w-main h-[110px] py-[35px]  flex justify-between'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt='logo' className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px] '>

        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <BsFillTelephoneFill color='red' />
            <span className='font-semibold' >(+1800) 000 8808 </span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex gap-4 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold' >SUPPORT@TADATHEMES.COM </span>
          </span>
          <span>Online Support 24/7 </span>
        </div>
        {current && <Fragment>
          <div 
            onClick={handleDispatch}
            className='flex cursor-pointer items-center justify-center gap-2  px-6 border-r'>
            <PiHandbagDuotone color='red' size={30} />
            <span>{current?.cart?.length || 0} item(s)</span>
          </div>
          <div className='flex cursor-pointer items-center justify-center gap-2  px-1 relative bg-gray-200 border border-gray-300 rounded-lg transition-shadow duration-200 ease-in-out hover:shadow-md'
            onClick={(e)=>{
              setisShowOption(prev=>!prev)}
            }
            id='profile'
          >
            <FaUserCircle size={24} style={{color:'gray'}}/>
            <TfiViewListAlt size={20} style={{color:'gray'}}/>
          {isShowOption &&   <div onClick={e=>e.stopPropagation()} className='absolute top-full left-0 flex-col flex bg-gray-100 min-w-[200px] border py-2'>
                  <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                        Personal
                  </Link>
                    {+current.role===1945 && <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                          Admin workSpace
                        </Link>}
                  <span onClick={()=>dispatch(logout())} className='p-2 w-full hover:bg-sky-100'>Logout</span>
            </div>}
          </div>
        </Fragment>}
      </div>
    </div>
  )
}

export default withBase(Header)