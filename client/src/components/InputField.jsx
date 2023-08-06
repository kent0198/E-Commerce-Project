import React,{useState} from 'react'

const InputField = ({value,setValue,nameKey, type, invalidFields, setInvalidFieds}) => {

  const [focus, setFocus]=useState(false)

  return (
    <div className='w-full relative mb-2 '>
        <input
            type={type||'text'}
            className='px-4 py-2 rounded-sm border w-full'
            placeholder={nameKey?.slice(0,1).toUpperCase()+nameKey?.slice(1)}
            value={value}
            onChange={e=>setValue(prev=>({...prev,[nameKey]:e.target.value}))}
            onFocus={()=>setInvalidFieds([])}
        />
       {invalidFields?.some(el=>el.name===nameKey) &&  
       
       <small className='text-main text-[14px] italic flex justify-start'>{invalidFields.find(el=>el.name===nameKey)?.mes}</small>}
    </div>
  )
}

//[{name:password, mes:Require}]

export default InputField