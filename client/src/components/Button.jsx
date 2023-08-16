import React ,{memo}from 'react'
import clsx from 'clsx'
const Button = ({children, handleOnClick, style,type='button',buttonAdmin}) => {
  return (
    <button
     type={type}
     className={clsx('px-2 py-2 rounded-md text-white bg-red-400 text-semibold', buttonAdmin && 'flex justify-end  ml-40 my-5')}
     onClick={()=>{handleOnClick && handleOnClick()}}
    >
     {children}   
    </button>
  )
}

export default memo(Button)