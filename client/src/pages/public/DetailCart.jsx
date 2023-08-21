import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Breadcumb, SelectQuantily} from '../../components'
import withBase from '../../hocs/withBase'
import { formatMoney } from '../../ultils/helper'

const DetailCart = ({location}) => {

    const {current}=useSelector(state=>state.user)
    const [quantity, setQuantity] = useState(1)

    const handleQuantily=(number)=>{
      if(+number < 1) 
        setQuantity(number)
    }
    const handleChangeQuantity=(flag)=>{
      if(flag==='minus' &&quantity===1) return
      if (flag==='minus') setQuantity(prev=>+prev-1)
      if (flag==='plus') setQuantity(prev=>+prev+1)
    }
  return (
    <div className='w-full'>
    <div className='flex justify-center items-center  h-[81px] w-full'>
      <div className='w-main'>
        <h3 className='text-3xl font-bold tracking-tight my-8 text-gray-700'>My Cart</h3>
        <Breadcumb category={location?.pathname}/>
      </div>
    </div>
    <div className='w-main mx-auto font-bold my-8 border py-3 grid grid-cols-10'>
      <span className='col-span-5 w-full text-center'>Products</span>
      <span className='col-span-2 w-full text-center'>Quantity</span>
      <span className='col-span-3 w-full text-center'>Price</span>
    </div>
    {current?.cart?.map(el=>(
      <div key={el._id} className='w-main mx-auto font-bold my-8 border py-3 grid grid-cols-10'>
        <span className='col-span-5 w-full text-center'>
          <div className='flex gap-2'>
              <img src={el?.product?.thumb} alt='thumb' className='w-28 h-28 object-cover'/>
              <div  className='flex flex-col items-start gap-1'>
                  <span className='text-sm text-main'>{el?.product?.title}</span>
                  <span className='text-[10px]'>{el.color}</span>
                  <span className='text-sm'>{formatMoney(el?.product?.price)+'VND'}</span>
              </div>
          </div>
        </span>
        <span className='col-span-2 w-full text-center flex justify-center'>
          <div className='flex items-center h-full'>
            <SelectQuantily
              quantily={quantity}
              handleQuantily={handleQuantily}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
        </span>
      <span className='col-span-3 w-full h-full flex items-center justify-center'>
         <span className='text-sm'>{formatMoney(el?.product?.price)+'VND'}</span>
      </span>
      </div>
    ))}
    </div>
  )
}

export default withBase(DetailCart)