import React,{memo} from 'react'

const Footer = () => {
  return (
    <div className='w-full'>
        <div className='h-[103px] w-full bg-main flex items-center justify-center'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-[20px] text-gray-100 '>SIGN UP TO NEWSLETTER</span>
                        <span className='text-[13px] text-gray-300 '>Subscribe now and recevie weekly newsletter </span>
                    </div>
                    <input className='p-4 rounded-l-full rounder-r-full flex-1 bd-[#F04646] outline-none text-gray-700 placeholder:text-sm'
                        type='text'
                        placeholder='Email address'
                    />
                </div>
        </div>
    </div>
  )
}

export default memo(Footer)