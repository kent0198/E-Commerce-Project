import React,{useState} from 'react'
import { Button, Loading } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import {toast} from 'react-toastify'
import path from '../../ultils/path'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate()
    const {token}=useParams()
    const [loading, setLoading]=useState(false)

    const [password, setPassword] =useState('')
    const handleResetPassword=async ()=>{
        setLoading(true);
        const response=await apiResetPassword({password, token})
        if(response.success){
            setLoading(false)
            toast.success(response.mes)
            navigate(`/${path.LOGIN}`)
         }else{
             toast.info(response.mes,{theme:'colored'})
         }
    }
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-overplay z-50 flex justify-center py-8 z-50">
    <div className="flex  flex-col gap-4 ">
      <label htmlFor="email">Enter your new password</label>
      <input 
        type="text" 
        id="email" 
        className="w-[800px] pb-2 border-b outline-none placeholder:text-sm " 
        placeholder="Type here"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
    </div>
    <div className="flex items-center justify-end gap-10">
      {loading && <Loading/>}
      <Button
        name='Submit'
        handleOnClick={handleResetPassword}
      />
   
    </div>
  </div>
  )
}

export default ResetPassword