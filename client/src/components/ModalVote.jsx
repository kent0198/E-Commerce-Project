import React from 'react'
import { useDispatch } from 'react-redux'
import {ShowModal} from '../store/app/appSlice'

const ModalVote = ({children}) => {
  
  const dispatch=useDispatch()

  return (
    <div 
    onClick={()=>dispatch(ShowModal({isShowModal:false, modalChildren:null}))} 
    className='absolute inset-0 z-50 bg-overplay flex items-center justify-center'
    >
      {children}
    </div>
  )
}

export default ModalVote