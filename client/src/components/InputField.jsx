import React,{useState} from 'react'
import clsx from 'clsx'

const InputField = ({value,setValue,nameKey, type, invalidFields, setInvalidFieds, style,fullWidth,placeholder}) => {


  return (
    <div className={clsx('w-full relative mb-2',fullWidth && 'w-full')}>
        <input
            type={type||'text'}
            className={clsx('px-4 py-2 rounded-sm border w-full',style)}
            placeholder={placeholder || nameKey?.slice(0,1).toUpperCase()+nameKey?.slice(1)}
            value={value}
            onChange={e=>setValue(prev=>({...prev,[nameKey]:e.target.value}))}
            onFocus={()=> setInvalidFieds && setInvalidFieds([])}
        />
       {invalidFields?.some(el=>el.name===nameKey) &&  
       
       <small className='text-main text-[14px] italic flex justify-start'>{invalidFields.find(el=>el.name===nameKey)?.mes}</small>}
    </div>
  )
}

//[{name:password, mes:Require}]

export default InputField