import React, { memo,useRef, useEffect,useState } from 'react'
import logo from '../assets/logo.png'
import {voteOptions} from '../ultils/contantsProject'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import {Button} from './'
const VoteOption = ({nameProduct,handleSubmitVoteOption}) => {
  const modalRef=useRef()
  const [chooseStart, setchooseStart] = useState(null)
  const [comment, setcomment] = useState('')
  

  useEffect(()=>{
      modalRef.current.scrollIntoView({block:'center',behavior:'smooth'})
     
  },[])

  
  return (
    <div onClick={e=>e.stopPropagation()} ref={modalRef} className='bg-white w-[500px]   h-[450px] flex flex-col gap-4 rounded-lg items-center pt-5 '>
        <img src={logo} alt='logo' className='w-[300px] my-8 object-contain'/>
        <h2 className='text-center text-medium text-lg'>{`Voting the product ${nameProduct}`}</h2>
        <textarea className='form-textarea w-[90%] text-sm placeholder:text-gray-500 'placeholder='Type something' value={comment} onChange={e=>setcomment(e.target.value)}></textarea>
        <div className='w-full flex flex-col gap-4 '>
          <p className='ml-6'>How do you like this products ? </p>
          <div className='flex justify-center gap-4 items-center'>
            {voteOptions.map(el=>(
              <div 
              className='w-[60px] h-[60px] flex items-center justify-center flex-col gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-2xl' 
              key={el.id}
              onClick={()=>setchooseStart(el.id)}
              >
                  {(Number(chooseStart)) && chooseStart >= el.id ? <AiFillStar color='orange'/> : <AiFillStar color='gray'/>}
                  <span>{el.text}</span>
              </div>
            ))}
          </div>
        </div>
        <Button className='mb-4 w-[50%]' handleOnClick={()=>handleSubmitVoteOption({comment,score:chooseStart})}>Submit</Button>
    </div>
  )
}

export default memo(VoteOption)