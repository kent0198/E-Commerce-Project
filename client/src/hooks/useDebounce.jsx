import React,{useEffect, useState} from 'react'

const useDebounce = (value,ms) => {
    const [debounceValue, setdebounceValue] = useState('')
    useEffect(()=>{

       const setTimeOutId=setTimeout(()=>{
            setdebounceValue(value)
        },ms)
        return ()=>{
            clearTimeout(setTimeout)  
        }
    },[value,ms])

  return (
    debounceValue
  )
}

export default useDebounce