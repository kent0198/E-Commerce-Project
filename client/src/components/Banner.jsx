import React from 'react'
import slide from '../assets/slide.png'
const Banner = () => {
  return (
    <div className='w-full'>
        <img src={slide} alt='banner' className='h-[400px] object-cover w-full rounded-lg'/>
    </div>
  )
}

export default Banner