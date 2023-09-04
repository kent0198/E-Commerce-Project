import React, { useState } from 'react'
import { Button, Loading } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from 'react-toastify'
import path from '../../ultils/path'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleResetPassword = async () => {
    setLoading(true);
    const response = await apiResetPassword({ password, token })
    if(confirmPassword !==password) {
     return  toast.info('ConfirmPassword not correct', { theme: 'colored' })
    }
    if (response.success){
      setLoading(false)
      toast.success(response.mes)
      navigate(`/${path.LOGIN}`)
    }else{
      toast.info(response.mes, { theme: 'colored' })
    }
  }
  return (
    <div className="w-full h-[416px] shadow-2xl">
      <div className='bg-blue-200 bg-opacity-40 flex justify-center flex-col gap-3 h-full'>
        <div className='flex p-2 justify-center gap-5 '>
          <label className='font-bold flex justify-start '>Email</label>
          <input
            type="text"
            id="email"
            className=' focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border rounded-sm '
            placeholder="Type here"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='flex p-2 justify-center gap-5'>
          <label className='font-bold '>Password</label>
          <input
            type="password"
            id="password"
            className=' focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border rounded-sm '
            placeholder="Type here"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='flex p-4 justify-center gap-5'>
          <label className='font-bold '>Confirm Password</label>
          <input
            type="password"
            id="password"
            className=' focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border rounded-sm '
            placeholder="Type here"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <Button
            children='Submit'
            handleOnClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword