import React, {useState} from 'react'
import {navigation} from '../ultils/contants'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const Navigation = () => {

  const [activeTab, setActiveTab] = useState(navigation[0].id)
  const navigate = useNavigate();

  const handleItemClick = (el) => {
    setTimeout(() => {
      navigate(el.path);
    }, 0);
  };
  return (
    <div>
      <div className='w-main py-2 border-y mb-6 text-sm flex items-center'>  
            {navigation.map((el)=>(
              <button
                key={el.id}
                onClick={()=>{setActiveTab(el.id);handleItemClick(el)}}
                className={`${
                  activeTab===el.id ? "text-gray-900" : "hover:text-gray-700"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-900 outline-2 outline-sky-300 transition focus-visible:outline
                `}
              >
                  {activeTab===el.id && (
                    <motion.div
                      layoutId='active-pill'
                      className='absolute inset-0 bg-sky-300'
                      style={{borderRadius:9999}}
                      transition={{duration:0.7}}
                    />
                  )}
                  <NavLink  to={el.path}  className='relative z-50'>{el.value}</NavLink>
              </button>
            ))}
      </div>
    </div>
  )
}

export default Navigation