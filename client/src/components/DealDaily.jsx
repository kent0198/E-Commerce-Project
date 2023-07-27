import React,{useEffect,useState} from 'react'
import icons from '../ultils/icons'
import { apiGetProducts } from '../apis/product'
import {formatMoney} from '../ultils/helper'
import {renderStarFromNumber}  from "../ultils/helper"
import {CountDown} from './'


const {AiFillStar,AiOutlineMenu}=icons
let idInterval
const DealDaily = () => {
    const [dealdaily, setDealDaily] =useState(null)

    const [hour, setHour]=useState(0)
    const [minute, setMinute]=useState(0)
    const [second, setSecond]=useState(0)
    const [expireTime, setExpireTime] = useState(false)
    
    const fetchDealDayly=async () => {
        const response = await apiGetProducts({limit:1,page:Math.round(Math.random()*10),totalRatings:5})
        if (response.success) {
        setDealDaily(response.products[0])
        const h=29-new Date().getHours()
        const m=60-new Date().getMinutes
        const s=60-new Date().getSeconds
        setHour(h)
        setMinute(m)
        setSecond(s)
        }else{
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }
 /*    useEffect(()=>{
        fetchDealDayly()
    },[])
      */
     useEffect(()=>{
            clearInterval(idInterval)
            fetchDealDayly()
           
     },[expireTime])

    useEffect(()=>{
           idInterval= setInterval(()=>{
            if(second>0) setSecond(prev=>prev-1)
            else{
                if (minute>0 ){
                    setMinute(prev=>prev-1)
                    setSecond(59)
                }else{
                    if(hour>0){
                        setHour(prev=>prev-1)
                        setMinute(59)
                        setSecond(59)
                    }else{
                        setExpireTime(!expireTime)
                    }
                }
            }
        },1000)
        return ()=>{
            clearInterval(idInterval)
        }
    },[second,minute,hour,expireTime])

  return (
    <div className='border-red-200 flex-auto w-full shadow-slate-50  '>
        <div className='flex items-center justify-between p-4 w-full'>
            <span className='flex-1 text-red-400 justify-center'><AiFillStar  size={20}/></span>
            <span className='flex-8 font-semibold text-[18px] justify-center text-center text-gray-700'>DEAL DAILY</span>
            <span className='flex-1 '></span>
        </div>
        <div className='w-full flex flex-col items-center pt-8 px-4 gap-2 border-red-300 '>
          <img src={dealdaily?.thumb||'https://tse2.mm.bing.net/th?id=OIP.sMerUYr1YD9aHIEPsepiTgHaHa&pid=Api&P=0&h=180'}
          alt=""
           className='w-full object-contain rounded-lg'
           />
          <span className='line-clamp-1'>{dealdaily?.title}</span>
          <span className='flex h-4'>{renderStarFromNumber(dealdaily?.totalRatings,20)}</span>  
          <span>{`${formatMoney(dealdaily?.price)}VND`}</span>
        </div>
        <div className='px-4 py-4'>
            <div className='flex justify-center text-center gap-2'>
                    <CountDown unit={'Hours'} number={hour}/>
                    <CountDown unit={'Minute'} number={minute}/>
                    <CountDown unit={'Seconds'} number={second}/>
            </div>
            <button
                type='button'
                className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2 rounded-md mt-8 '
            >
                <AiOutlineMenu/>
                <span>OPTION</span>
            </button>
        </div>
    </div>
  )
}

export default DealDaily