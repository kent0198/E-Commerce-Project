import React, {useState} from 'react'
import {navigation} from '../ultils/contants'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";


const Navigation = () => {

  const [activeTab, setActiveTab] = useState(navigation[0].id)
  return (
   /*  <div className='w-main h-[48px] py-2 border-y mb-6 text-sm flex items-center'>
          {navigation.map(el=>(
            <NavLink to={el.path} 
                     key={el.id} 
                     className={({isActive})=>isActive?'pr-12 hover:text-main text-main':'pr-12 hover:text-main'}
            >
              {el.value}
            </NavLink>
          ))}
    </div>   */
    <div>
      <div className='w-main py-2 border-y mb-6 text-sm flex items-center '>
            {navigation.map((el)=>(
              <button
                key={el.id}
                onClick={()=>setActiveTab(el.id)}
                className={`${
                  activeTab===el.id ? "text-gray-900" : "hover:text-gray-700"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-900 outline-2 outline-sky-400 transition focus-visible:outline
                `}
              >
                  {activeTab===el.id && (
                    <motion.div
                      layoutId='active-pill'
                      className='absolute inset-0 bg-sky-400'
                      style={{borderRadius:9999}}
                      transition={{duration:0.3}}
                    />
                  )}
                  <NavLink to={el.path} className='relative z-10'>{el.value}</NavLink>
              </button>
            ))}
      </div>
    </div>
  )
}

export default Navigation