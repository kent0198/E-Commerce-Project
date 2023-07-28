import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { styles } from "../../hoc/styles";
import { EarthCanvas } from "../../components/Canvas";
import { SectionWraper } from '../../ultils/SectionWrapper'
import { slideIn } from "../../ultils/motion";
import { InputField, Button } from '../../components'
import { apiLogin, apiResgister } from "../../apis/user";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import path from '../../ultils/path'


const Login = () => {
  const navigate =useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
    })
  }
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
  })
  const handleSubmit = useCallback(async () => {

    const { firstname, lastname, phone, ...data } = payload
    if (isRegister) {
      const response = await apiResgister(payload);
      if(response.success){
        Swal.fire('Congratulation', response.mes, 'success').then(() => {
          setIsRegister(false)
          resetPayload() 
        })
      }else{
        Swal.fire('Oops!',response.mes,'error')
      }
     
    } else {
      const rs = await apiLogin(data)
      if(rs.success){
            navigate(`/${path.HOME}`)
      }else  Swal.fire('Oops!',rs.mes,'error')
      
    }

  }, [payload, isRegister])
  return (
    <div
      className={` flex xl:flex-row flex-col-reverse gap-10 overflow-hidden bg-blue-300`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 px-8 rounded-2xl justify-center items-center text-center'
      >
        <h3 className={styles.sectionHeadText}>{isRegister ? 'Register' : 'Login'}</h3>
        <form
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col gap-5'>
            {isRegister &&
              <div className="flex items-center gap-2">
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey='firstname'
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey='lastname'
                />
              </div>
            }
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey='email'
            />
            {isRegister &&
              <InputField
                value={payload.phone}
                setValue={setPayload}
                nameKey='phone'
              />
            }
            <InputField
              value={payload.password}
              setValue={setPayload}
              nameKey='password'
            />
          </label>
          <Button
            name={isRegister ? ' Register ' : ' Login '}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2">
            {!isRegister &&
              <span className="text-gray-700 hover:underline">Forgot your accout ?</span>
            }
            {!isRegister &&
              <span onClick={() => setIsRegister(true)} className="text-gray-700 hover:underline">Create account ?</span>
            }
            {
              isRegister &&
              <span onClick={() => setIsRegister(false)} className="text-gray-700 hover:underline w-full text-center">Go Login ?</span>
            }
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default Login