import React,{memo} from 'react'

const CountDown = ({number, unit}) => {
  return (
    <div className='w-[30%] h-[60px] border-2 border-slate-400 flex flex-col justify-center items-center rounded-full'>
      <span className='text-[14px] text-gray-800'>{number}</span>
      <span className='text-[14px] text-gray-800'>{unit}</span>
    </div>
  )
}

export default memo(CountDown)