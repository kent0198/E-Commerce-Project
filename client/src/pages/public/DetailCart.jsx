import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Breadcumb, Button, SelectQuantily} from '../../components'
import withBase from '../../hocs/withBase'
import { formatMoney } from '../../ultils/helper'
import path from '../../ultils/path'
import { useDispatch } from 'react-redux'
import { updateCartItemQuantity } from '../../store/user/userSlice'

const DetailCart = ({location}) => {

    const {current}=useSelector(state=>state.user)
    const dispatch = useDispatch()


    const [quantity, setQuantity] = useState(1)

    const handleQuantily=(itemId, number)=>{
      if(number > 1) 
        dispatch(updateCartItemQuantity({itemId: itemId, quantity: parseInt(number) ?? 1}))
    }
    
    const handleChangeQuantity=(itemId, currentQuantity, flag)=>{
      if(flag==='minus' && currentQuantity===1) return
      if (flag==='minus') dispatch(updateCartItemQuantity({itemId: itemId, quantity: parseInt(currentQuantity - 1)}))
      if (flag==='plus') dispatch(updateCartItemQuantity({itemId: itemId, quantity: parseInt(currentQuantity + 1)}))
    }

    location=location.pathname

    const cleanPath = location.replace(/^\//, '');
    const handleCheckOut = ()=>{

    }

  return (
    <div className='w-full'>
    <div className='flex justify-center items-center  h-[81px] w-full'>
      <div className='w-main'>
        <h3 className='text-3xl font-bold tracking-tight my-8 text-gray-700'>My Cart</h3>
        <Breadcumb category={cleanPath}/>
      </div>
    </div>
    <div className='w-main mx-auto font-bold my-8 border py-3 grid grid-cols-10 bg-gray-400'>
      <span className='col-span-5 w-full text-center'>Products</span>
      <span className='col-span-2 w-full text-center'>Quantity</span>
      <span className='col-span-3 w-full text-center'>Price</span>
    </div>
    {current?.cart?.map(el=>(
      <div key={el._id} className='w-main mx-auto font-bold my-8 border py-3 grid grid-cols-10 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] hover:shadow-[rgba(0,0,0,0.6)_0px_5px_15px] '>
        <span className='col-span-5 w-full text-center'>
          <div className='flex gap-4 pl-5'>
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
              quantily={el?.quantity || 1}
              handleQuantily={(value) => handleQuantily(el._id, value)}
              handleChangeQuantity={(flag) => handleChangeQuantity(el._id, el.quantity, flag)}
            />
          </div>
        </span>
      <span className='col-span-3 w-full h-full flex items-center justify-center'>
         <span className='text-sm'>{formatMoney(el?.product?.price)+'VND'}</span>
      </span>
      </div>
    ))}
    <div className='flex justify-end p-6 font-bold gap-2'>
        <span>Subtitle : </span>
        <span className='text-red-500'>{formatMoney(current?.cart?.reduce((sum, el)=>(+el?.product?.price)*(+el?.quantity)+sum,0))}</span>
    </div>
    <div className='flex justify-end text-center '>
        <Button children='Check out' handleOnClick={handleCheckOut}/>
    </div>
    <div className='h-5'>

    </div>
    </div>
  )
}

export default withBase(DetailCart)