import React ,{useState}from 'react'
import { formatMoney } from '../ultils/helper'
import lable from '../assets/lable.png'
import {renderStarFromNumber}  from "../ultils/helper"
import {SelectOption} from './index'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import withBase from '../hocs/withBase'

const {
  AiFillEye,
  AiOutlineMenu,
  AiOutlineHeart,
}=icons
const Product = ({productData , isNew,navigate}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  //details products/pid/title/

  const handleClickOptions=(e, flag)=>{
    e.stopPropagation()
    if(flag==='MENU') navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
    if(flag==='QUICK_VIEW') console.log('QUICK_VIEW')
    if(flag==='WISHLIST') console.log('WISHLIST')
  }

  return (
    <div className='w-full text-base '>
      <div className='w-full border p-[15px] flex flex-col items-center relative '
          onClick={()=>navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
          onMouseEnter={e=>{
            e.stopPropagation()
            setIsShowOption(true)
          }}
          onMouseLeave={e=>{
            e.stopPropagation()
            setIsShowOption(false)
          }}
      >
        {isShowOption &&
        <div className='absolute bottom-[20px] flex justify-center left-[40px] right-0 gap-1 animate-slide-top'>
             <span onClick={(e)=>handleClickOptions(e,'QUICK_VIEW')}>
                <SelectOption icon={<AiFillEye/>}/>
            </span>
            <span onClick={(e)=>handleClickOptions(e,'MENU')}>
                <SelectOption icon={<AiOutlineMenu/>}/>
            </span>
            <span onClick={(e)=>handleClickOptions(e,'WISHLIST')}>
                <SelectOption icon={<AiOutlineHeart/>}/>
            </span>
        </div>
        }
        <img src={productData?.thumb||'https://tse2.mm.bing.net/th?id=OIP.sMerUYr1YD9aHIEPsepiTgHaHa&pid=Api&P=0&h=180'}
          alt=""
           className='w-[234px] h-[234px] object-cover ml-8 border rounded-xl'
      />
      <img src={lable} alt="" className='absolute top-[20px] left-[200px] w-[100px] h-[40px] object-cover'/>
     {isNew ?  <span className='font-bold top-[18px] left-[232px] text-white absolute'>New</span> : 
      <span className='font-bold top-[18px] left-[220px] text-white absolute'>Trending</span> }
      </div>
      <div className='flex flex-col gap-2 text-center '>
        <span className='line-clamp-1'>{productData?.title}</span>
        <span className='flex justify-center'>{renderStarFromNumber(productData?.totalRatings)}</span>
        <span>{`${formatMoney(productData?.price)}VND`}</span> 
      </div>
    </div>
  )
}

export default withBase(Product)