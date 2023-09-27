import React,{useCallback, useEffect, useState} from 'react'
import {InputForm, Pagination} from '../../components'
import { useForm } from 'react-hook-form'
import { apiGetProducts } from '../../apis/product'
import moment from 'moment'
import { useSearchParams ,createSearchParams,useNavigate,useLocation} from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import UpdateProducts from './UpdateProducts'

const ManageProducts = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const [params]=useSearchParams()
  const {register, formState:{errors},handleSubmit,reset,watch}=useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editProduct, seteditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  
  const render=useCallback(()=>{
    setUpdate(!update)
  },[])

  const fecthProducts=async (params)=>{
    const response=await apiGetProducts({...params,limit:process.env.REACT_APP_PRODUCT_LIMIT})
    if(response.success) {
      setCounts(response.counts)
      setProducts(response.products)
    }
  }
  const queryDecounce=useDebounce(watch('q',900))
  useEffect(()=>{
      const searchParams=Object.fromEntries([...params])
      if(queryDecounce) searchParams.q=queryDecounce
      fecthProducts(searchParams)
  },[params,queryDecounce,update])

  return (
    <div className='w-full flex flex-col gap-4 relative pl-8' >
      {editProduct &&
        <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
        <UpdateProducts editProduct={editProduct} render={render}/>
    </div>
      }
      <div className='h-[69px] w-full'></div>
      <div className='p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0' >
            <h1 className='text-3xl font-bold tracking-tight'>Manage Products</h1>
      </div>
      <div className='flex  justify-end items-center px-4'>
          <form className='w-[45%]'>
            <InputForm 
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder='Search products by title, description,...'
            />
          </form>
      </div>
      <table className='table-auto'>
          <thead>
            <tr className='border bg-sky-900/50 text-white ml-5 '>
              <th className='text-center'>STT</th>
              <th className='text-center'>Order</th>
              <th className='text-center'>Thumb</th>
              <th className='text-center'>Title</th> 
              <th className='text-center'>Brand</th>
              <th className='text-center'>Category</th>
              <th className='text-center'>Price</th>
              <th className='text-center'>Quantity</th>
              <th className='text-center'>Sold</th>
              <th className='text-center '>Color</th>
              <th className='text-center'>Ratings</th>
              <th className='text-center'>UpdatedAt</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
              {products?.map((el,index)=>(
                <tr key={el._id} className='border-b' >
                    <td className='text-center'>{((+params.get('page') > 1 ? +params.get('page')-1:0)*process.env.REACT_APP_PRODUCT_LIMIT)+index+1}</td>
                    <td className='text-center'>
                      <img src={el.thumb} alt='thumb' className='w-12 h-12 object-cover'/>
                    </td>
                    <td className='text-center py-2'>{el.title}</td>
                    <td className='text-center py-2'>{el.brand}</td>
                    <td className='text-center py-2'>{el.category}</td>
                    <td className='text-center py-2'>{el.title}</td>
                    <td className='text-center py-2'>{el.price}</td>
                    <td className='text-center py-2'>{el.quantity}</td>
                    <td className='text-center py-2'>{el.sold}</td>
                    <td className='text-center py-2'>{el.color}</td>
                    <td className='text-center py-2'>{el.totalRatings}</td>
                    <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                    <td className='text-center py-2 text-sm'>
                        <span onClick={()=>seteditProduct(el)} className='text-blue-500 hover:underline cursor-pointer px-1 transition'>EDIT</span>
                        <span className='text-blue-500 hover:underline cursor-pointer px-1 transition'>DELETE</span>
                    </td>
                </tr>
              ))}
          </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts}/>
      </div>
    </div>
  )
}

export default ManageProducts