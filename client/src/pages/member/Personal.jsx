import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Button } from '../../components'
import { useSelector } from 'react-redux'
import moment from 'moment'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import avatar from '../../assets/avatar.png'
import { apiUpdateCurrent } from '../../apis/user'
import { useDispatch } from 'react-redux'
import { getCurrent } from '../../store/user/asyncActions'
import {toast} from 'react-toastify'

const Personal = () => {
  const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm()
  const {current}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
      reset({
        firstname:current?.firstname,
        lastname:current?.lastname,
        phone:current?.phone,
        email:current?.email,
      })
  },[])

  const handleUpdateInfor=async(data)=>{
      const response=await apiUpdateCurrent(data)
      console.log(response)
      if(response.success) 
        dispatch(getCurrent())
        toast.success(response.mes)
    
  }

  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-300'>
        Personal
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        <InputForm
          label='First Name'
          register={register}
          errors={errors}
          id='firstname'
          validate={{required:'Need fill this field'}}
        />
         <InputForm
          label='Last Name'
          register={register}
          errors={errors}
          id='lastname'
          validate={{required:'Need fill this field'}}
        />
         <InputForm
          label='Email address'
          register={register}
          errors={errors}
          id='email'
          validate={{
            required:'Need fill this field',
            pattern:{
              value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message:'Email invalid'
            }
          }}
        />
        <InputForm
          label='Phone' 
          register={register}
          errors={errors}
          id='phone'
          validate={{required:'Need fill this field'}}
        />
        <div className='flex items-center gap-2'>
            <span className='font-medium'>Account status : </span>
            <span>{current?.isBlocked ? 'Blocked' : 'Actived' }</span>
        </div>
        <div className='flex items-center gap-2'>
            <span className='font-medium'>Role : </span>
            <span>{+current?.role===1945 ? 'Admin' : 'User' }</span>
        </div>
        <div className='flex items-center gap-2'>
            <span className='font-medium'>Create At : </span>
            <span>{moment(current?.createdAt).format('DD/MM/YY') }</span>
        </div>
        <div className='flex flex-col gap-2'>
            <span className='font-medium'>Profile image</span>
            <label htmlFor='file'>
                <img src={current?.avatar || avatar} alt='avatar' className='w-20 h-20 object-cover rounded-full ml-8'/>
            </label>
            <input type='file' id='file'   hidden/>
        </div>
        {
          isDirty && <Button type='submit'>Update Information</Button>
        }
      </form>
    </div>
  )
}

export default Personal