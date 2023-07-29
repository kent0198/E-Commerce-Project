import React ,{memo}from 'react'

const Button = ({name, handleOnClick, style, iconsBefore, iconAfter,fw}) => {
  return (
    <button
     type='button'
     className={style ? style :`px-2 py-2 rounded-md text-white bg-red-400 text-semibold ${fw ? 'w-full':'w-fit'}`}
     onClick={()=>{handleOnClick && handleOnClick()}}
    >
        {iconsBefore}
        <span>{name}</span>
        {iconAfter}
    </button>
  )
}

export default Button