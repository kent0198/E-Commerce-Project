import React, { memo,useRef, useEffect,useState } from 'react'
import {Button,InputField} from './'
import {apiForgotPassword} from '../apis/user'
import {toast} from 'react-toastify'
import { useDispatch } from "react-redux";
import {ShowModal} from '../store/app/appSlice'

const ForgotPasswordModel = () => {

  const dispatch=useDispatch()
  const [email, setEmail] = useState("")
  
  const handleForgotPassword =async()=>{
    const response=await apiForgotPassword({email})
    if(response.success){
       toast.success(response.mes)
       dispatch(ShowModal({
        isShowModal:false, 
        modalChildren:null
    }))
       
    }else{
        toast.info(response.mes,{theme:'colored'})
    }
}
  const modalRef=useRef()
  useEffect(()=>{
    modalRef.current.scrollIntoView({block:'center',behavior:'smooth'})
},[])

  return (
    <div onClick={e=>e.stopPropagation()} ref={modalRef} className='bg-white w-[400px]   h-[200px] flex flex-col gap-4 rounded-lg items-center pt-5 '>
        <h2 className='text-center text-gray-800 font-bold '>Please enter your email here</h2>
        <input type='text' className=' bg-gray-200 text-gray-900 h-7 rounded-lg w-64 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' placeholder='Email@gmail.com' value={email}    onChange={e=>setEmail(e.target.value)} />
        <div className='flex justify-between gap-10 '>
            <Button className='mt-10 w-20' handleOnClick={handleForgotPassword}>Submit</Button>
        </div>
    </div>
  )
}


export default ForgotPasswordModel