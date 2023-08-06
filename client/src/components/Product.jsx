import React ,{useState}from 'react'
import { formatMoney } from '../ultils/helper'
import lable from '../assets/lable.png'
import {renderStarFromNumber}  from "../ultils/helper"
import {SelectOption} from './index'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const {
  AiFillEye,
  AiOutlineMenu,
  AiOutlineHeart,
}=icons
const Product = ({productData , isNew}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  //details products/pid/title/
  return (
    <div className='w-full text-base '>
      <Link className='w-full border p-[15px] flex flex-col items-center relative '
          to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
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
            <SelectOption icon={<AiFillEye/>}/>
            <SelectOption icon={<AiOutlineMenu/>}/>
            <SelectOption icon={<AiOutlineHeart/>}/>
        </div>
        }
        <img src={productData?.thumb||'https://tse2.mm.bing.net/th?id=OIP.sMerUYr1YD9aHIEPsepiTgHaHa&pid=Api&P=0&h=180'}
          alt=""
           className='w-[234px] h-[234px] object-cover ml-8 border rounded-xl'
      />
      <img src={lable} alt="" className='absolute top-[20px] left-[200px] w-[100px] h-[40px] object-cover'/>
     {isNew ?  <span className='font-bold top-[18px] left-[232px] text-white absolute'>New</span> : 
      <span className='font-bold top-[18px] left-[220px] text-white absolute'>Trending</span> }
      </Link>
      <div className='flex flex-col gap-2 text-center '>
        <span className='line-clamp-1'>{productData?.title}</span>
        <span className='flex justify-center'>{renderStarFromNumber(productData?.totalRatings)}</span>
        <span>{`${formatMoney(productData?.price)}VND`}</span> 
      </div>
    </div>
  )
}

export default Product