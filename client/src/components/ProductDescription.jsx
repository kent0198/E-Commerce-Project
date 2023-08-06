import React, { memo, useState, useCallback } from 'react'
import { productDesTab } from '../ultils/contantsProject'
import { VoteBar, Button, VoteOption } from './'
import { renderStarFromNumber } from '../ultils/helper'
import { apiRatings } from '../apis/product'
import { useDispatch,useSelector } from 'react-redux'
import {ShowModal} from '../store/app/appSlice'
import Swal from 'sweetalert2'
import path from '../ultils/path'
import { useNavigate } from 'react-router-dom'

const ProductDescription = ({ totalRatings, ratings ,nameProduct,pid,rerender}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isLoggedIn}=useSelector(state=>state.user)
  const [activedtab, setActivedtab] = useState(1)
 
 
  const handleVoteNow=()=>{
    if (!isLoggedIn){
      Swal.fire({
        text:'Login to vote',
        cancelButtonText:'Cancel',
        confirmButtonText:'Go login',
        title:'Oops!',
        showCancelButton:true,
      }).then((rs)=>{
        if(rs.isConfirmed) navigate(`/${path.LOGIN}`)
      })
    }else{
      dispatch(ShowModal({
        isShowModal:true, 
        modalChildren:<VoteOption 
        nameProduct={nameProduct}
        handleSubmitVoteOption={handleSubmitVoteOption}
      />
    }))
    }
  }

  const handleSubmitVoteOption=async ({comment, score})=>{
    if(!comment || !score ||!pid) return
      await apiRatings({
        star:score, 
        comment,
        pid
      })
      dispatch(ShowModal({isShowModal:false,modalChildren:null}))
      rerender()
  }
  return (
    <div >
     
      <div className='flex items-center gap-2 relative'>
        {productDesTab.map(el => (
          <span
            className={`p-2 px-4 cursor-pointer ${activedtab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
            key={el.id}
            onClick={() => setActivedtab(el.id)}
          >{el.name}</span>
        ))}
        <span
          className={`p-2 px-4 cursor-pointer ${activedtab === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
          key={5}
          onClick={() => setActivedtab(5)}
        >REVIEW</span>
      </div>
      <div className='w-full h-[300px] border p-4 text-sm text-gray-700'>
        {productDesTab.some(el => el.id === activedtab) && productDesTab.find(el => el.id === activedtab)?.content}
        {activedtab === 5 && <div className='flex flex-col p-4'>
          <div className='flex'>
          <div className='flex-4 border flex-col flex items-center justify-center border-gray-600 rounded-3xl'>
            <span className='font-semibold text-3xl text-gray-700'>{`${totalRatings}/5`}</span>
            <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            </span>
            <span className='text-sm'>{`${ratings?.length} reviewers`}</span>
          </div>
          <div className='flex-6 border p-4 flex flex-col gap-3'>
            {Array.from(Array(5).keys()).reverse().map(el => (
              <VoteBar
                key={el}
                number={el + 1}
                ratingTotal={ratings?.length}
                ratingCount={ratings?.filter(i=>i.star===el+1)?.length}
              />
            ))}
          </div>
          </div>
          <div className='p-4 flex flex-col items-center justify-center text-sm gap-2 '>
            <span>Do you want review this product ? </span>
            <Button 
                  handleOnClick={handleVoteNow}
                  >
                  Vote Now !
                  </Button>
          </div>
        </div>}


      </div>
    </div>
  )
}

export default memo(ProductDescription)