import React, { useEffect, useState } from 'react'
import { Sidebar, Banner,BestSeller ,DealDaily, FeatureProducts,CustomSlider} from '../../components'
import { UseSelector, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import icons from '../../ultils/icons'
import {BlogPost} from '../../components'

const {MdKeyboardArrowRight}=icons

const Home = () => {
  const {newProducts}=useSelector(state=>state.products)
  const {categories}=useSelector(state=>state.app)
  const {isLoggedIn,current}=useSelector(state=>state.user)


  console.log({isLoggedIn, current})
 
  return (
    <>
    <div className='w-main flex'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto  '>
          <Sidebar/>
          <DealDaily/>
        </div>

        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto '>
          <Banner/>
          <BestSeller/>
        </div>
    </div>
    <div className='my-8'>
        <FeatureProducts/>
    </div>
    <div className='my-8 w-full'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
      <div className='w-full'>
        <CustomSlider
          products={newProducts}
        />
      </div>
    </div>
    <div className='my-8 w-full'>
         <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
          <div className='flex flex-wrap mt-4 '>
            {categories?.filter(el=>el.brand.length>0)?.map(el=>(
              <div key={el.id}
              className='w-1/3 flex-initial px-4 '
              >
                 <div className='border flex py-4'>
                    <img src={el.image} className='w-[144px] h-[130px] object-contain flex-1'/>
                    <div className='flex-1 text-gray-700'>
                      <h4 className='font-semibold uppercase'>{el.title}</h4>
                      <ul className='text-sm'>
                        {el?.brand?.map(el=>(
                          <span className='flex gap-2 items-center text-gray-500 hover:text-red-500'>
                            <MdKeyboardArrowRight size={13}/>
                            <li key={el}>{el}</li>
                          </span>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
            ))}
          </div>
    </div>

    <div>
      <BlogPost/>
    </div>
    <div className='w-full h-[500px]'> 

    </div>
    </>
  )
}

export default Home