import React ,{memo,useEffect}from 'react'
import {Link}  from 'react-router-dom'
import path from '../ultils/path'
import { getCurrent } from '../store/user/asyncActions'
import {useDispatch,useSelector} from 'react-redux'
import icons from '../ultils/icons'
import { logout } from '../store/user/userSlice'

const {AiOutlineLogout}= icons
const TopHeader = () => {
    const dispatch = useDispatch()
    const {isLoggedIn,current}=useSelector(state=>state.user)

    useEffect(()=>{
      if(isLoggedIn) dispatch(getCurrent())
    },[dispatch,isLoggedIn])
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div  className='w-main  flex items-center justify-between text-xs text-white'>
            <span>ORDER ONLINE OR CALL US (+1800) 000 8080  </span>
            {isLoggedIn 
            ?
            <div className='flex text-center gap-3 justify-center '>
              <span>
                  {`Welcome, ${current?.lastname}${current?.firstname}`}
              </span>
              <span 
                  onClick={()=>dispatch(logout())}>
                  <AiOutlineLogout  fontSize={18}/>
                </span>              
              </div> 
            :
            <Link to={`/${path.LOGIN}`}>Sign In or Create Account  </Link>
            }
        </div>
    </div>
  )
}

export default memo(TopHeader)