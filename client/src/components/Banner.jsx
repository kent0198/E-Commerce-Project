import React, {useEffect, useRef} from 'react'
import lottie from 'lottie-web'

const Banner = () => {

  const container= useRef(null)
  const container2= useRef(null)
  const container3= useRef(null)
  const container4= useRef(null)

  useEffect(()=>{
    lottie.loadAnimation({
      container:container.current,
      renderer:'svg',
      loop:true,
      autoplay:true,
      controls:true,
      direction:-1,
      animationData:require('./Canvas/hamter.json'),
    },[]) 
  }, [])

  useEffect(()=>{
    lottie.loadAnimation({
      container:container3.current,
      renderer:'svg',
      loop:true,
      autoplay:true,
      controls:true,
      direction:-1,
      animationData:require('./Canvas/hamter.json'),
    },[]) 
  }, [])

  useEffect(()=>{
    lottie.loadAnimation({
      container:container2.current,
      renderer:'svg',
      loop:true,
      autoplay:true,
      controls:true,
      direction:-1,
      animationData:require('./Canvas/hello.json'),
    },[]) 
  }, [])

  useEffect(()=>{
    lottie.loadAnimation({
      container:container4.current,
      renderer:'svg',
      loop:true,
      autoplay:true,
      controls:true,
      direction:-1,
      animationData:require('./Canvas/hello3.json'),
    },[]) 
  }, [])

  return (
    <div className='w-full'>
      <div>
      <div className='h-52' ref={container4}></div>
      </div>
    <div className='flex gap-9 justify-center'>
        <div className='h-52' ref={container}></div>
        <div className='h-52' ref={container2}></div>
        <div className='h-52' ref={container3}></div>
    </div>
    </div>
  )
}

export default Banner