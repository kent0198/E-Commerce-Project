import React ,{memo}from 'react'

const Button = ({children, handleOnClick, style, fw}) => {
  return (
    <button
     type='button'
     className={style ? style :`px-2 py-2 rounded-md text-white bg-red-400 text-semibold `}
     onClick={()=>{handleOnClick && handleOnClick()}}
    >
     {children}   
    </button>
  )
}

export default memo(Button)