import React,{Fragment, memo} from 'react'
import icons from '../ultils/icons'
import withBase from '../hocs/withBase'
import { ShowModal, showCart } from '../store/app/appSlice'
import { useSelector } from 'react-redux'
import {formatPrice,formatMoney} from '../ultils/helper'
import Button from './Button'
import {toast} from 'react-toastify'
import { getCurrent } from '../store/user/asyncActions'
import { apiRemoveCart } from '../apis/user'
import path from '../ultils/path'



const {AiOutlineCloseCircle,ImBin}=icons

const Cart = ({dispatch,navigate}) => {
  const {current}=useSelector(state=>state.user)
  
  console.log(current)

  const removeCart=async(pid)=>{
    const response=await apiRemoveCart(pid)
    if(response.success){
      dispatch(getCurrent())
    }else{
      toast.error(response.mes)
    }
  }


  return (
    <div onClick={(e)=>e.stopPropagation()} className='w-[400px] grid h-screen overflow-y-auto bg-gray-900 grid-rows-10 text-white p-6'>
        <header className='row-span-1 h-full border-b border-gray-300 font-bold text-2xl flex justify-between items-center'>
            <span>Your Cart</span>
            <span onClick={()=>dispatch(showCart())}>
                <AiOutlineCloseCircle />
            </span>
        </header>
        <section className='row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
            {!current?.cart && <span className='text-xs italic'>Your cart is empty . </span>}
            {current?.cart && current?.cart?.map(el=>(
              <div key={el._id} className='flex justify-between items-center '>
                  <div className='flex gap-2'>
                    <img src={el?.product?.thumb}  alt='thumb' className='w-20 h-20 object-cover rounded-lg'/>
                    <div className='flex flex-col gap-2'>
                      <span className='font-bold text-[10px]'>{el?.product?.title}</span>
                      <span className='text-[10px]'>{el?.color}</span>
                      <span className='text-xs'>{formatMoney(el?.product?.price)+'vnđ'}</span>
                    </div>  
                  </div>
                    <span onClick={()=>removeCart(el?.product?._id)} className='h-8 w-8 rounded-full cursor-pointer  flex-col flex text-center justify-center items-center hover:bg-gray-700'><ImBin size={20}/></span>
              </div>
            ))}
        </section>
        <div className='row-span-3 h-full flex flex-col justify-between'>
              <div className='flex items-center my-4 justify-between pt-4 border-t'>
                <span>Subtotal:</span>
                <span>{formatMoney(current?.cart?.reduce((sum,el)=>sum+Number(el?.product?.price),0))+'vnđ'}</span>
              </div>
                <span className='text-center text-gray-700 italic text-xs '>Shipping , taxes, and discounts calculated at checkout</span>
              <Button handleOnClick={()=>{
                dispatch(showCart())
                navigate(`/${path.DETAIL_CART}`)
              }
              } style='rounded-none w-full py-3 '>Shopping Cart</Button>
        </div>
    </div>
  )
}

export default withBase(memo(Cart))