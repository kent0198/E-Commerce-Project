import React, {useEffect, useRef} from 'react'
import slide from '../assets/slide.png'
import lottie from 'lottie-web'

const Banner = () => {

  const container= useRef(null)

  useEffect(()=>{
    lottie.loadAnimation({
      container:container.current,
      renderer:'svg',
      loop:true,
      autoplay:true,
      controls:true,
      direction:-1,
      animationData:require('./Canvas/hamter.json')
    },[]) 
  })
  return (
    <div className='w-full '>
        <div className='h-16' ref={container}></div>
    </div>
  )
}

export default Banner