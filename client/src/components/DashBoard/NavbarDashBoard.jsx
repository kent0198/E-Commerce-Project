import React ,{useState}from 'react'
import IconDashBoard from './IconDashBoard'
import InputField from '../InputField'

const NavbarDashBoard = () => {
    const [value, setValue] = useState('')
  return (
    <div className='flex justify-between items-center py-7'>
        <div className='ml-4 text-base leading-6 font-roboto tracking-wide overflow-hidden truncate whitespace-no-wrap opacity-100 capitalize align-baseline no-underline text-gray-700 font-bold'>
            DashBoard
        </div>
        <div className='flex justify-center items-center gap-4'>
            <InputField placeholder="Search Here" nameKey="q" setValue={setValue} wi height />
            <IconDashBoard/>
        </div>
    </div>
  )
}

export default NavbarDashBoard