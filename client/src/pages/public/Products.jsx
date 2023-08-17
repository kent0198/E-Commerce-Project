import React, { useState, useEffect,useCallback } from 'react'
import { useParams, useSearchParams ,useNavigate, createSearchParams} from 'react-router-dom'
import { Breadcumb, Product ,SearchItem,InputSelect,Pagination} from '../../components'
import { apiGetProducts } from '../../apis/product'
import Masonry from 'react-masonry-css'
import {sorts} from '../../ultils/contantsProject'

const Products = () => {

  const navigate=useNavigate()
  const [products, setProducts] = useState(null)
  const [activeClick, setactiveClick] = useState(null)
  const [sort, setsort] = useState('')
  const { category } = useParams()  
  const [params]=useSearchParams()

  const fecthProductsByCategory = async (queries) => {
    const response = await apiGetProducts({...queries,category})
    if(response.success){
      setProducts(response)
    }
  }
  
  useEffect(() => {
   /*  let param=[]
    for (let i of params.entries()) param.push(i)
    const queries={}
    for (let i of params) queries[i[0]]=i[1] */
    let priceQuery={}
    const queries=Object.fromEntries([...params])
    if(queries.to && queries.from){
      priceQuery={
        $and:[
          {price:{gte:queries.from}},
          {price:{lte:queries.to}},
        ]
      }
      delete queries.price
    }
    if(queries.from){
      queries.price={gte:queries.from}
    }
    if(queries.to){
      queries.price={gte:queries.to}
    }
    delete queries.from
    delete queries.to
    fecthProductsByCategory({...priceQuery,...queries})
    window.scrollTo(0,0)
  }, [params])


  const changeActiveFitler=useCallback((name)=>{
      if(activeClick===name) setactiveClick(null)
      else setactiveClick(name)
  },[activeClick])

  const changeValue=useCallback((value)=>{
      setsort(value)
  },[sort])

  useEffect(()=>{ 
   if(sort){
    navigate({
      pathname:`/${category}`,
      search:createSearchParams({sort}).toString()
    })
   }
  },[sort])

  return (
    <div className='w-full'>
      <div className='h-[81px] flex justify-center items-center'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase py-5'>{category}</h3>
          <Breadcumb category={category} />
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
        <div className='w-4/5 flex-auto flex items-center gap-4'>
          <span  className='font-semibold text-sm'>Filter by</span>
          <div className='flex items-center gap-4'>
            <SearchItem
              name='Price'
              type='input'
              activeClick={activeClick}
              changeActiveFitler={changeActiveFitler}
            />
            <SearchItem
              name='Color'
              activeClick={activeClick}
              changeActiveFitler={changeActiveFitler}
            />
         </div>
        </div>
        <div className='w-1/5 flex flex-col gap-3'>
          <span className='font-semibold text-sm'>Sort by</span>
          <div className='w-full'>
              <InputSelect value={sort} options={sorts} changeValue={changeValue}/>
          </div>
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={4}
          className="my-masonry-grid flex "
          columnClassName="my-masonry-grid_column">
          {products?.products?.map(el=>(
              <Product
              key={el._id}
              pid={el.id}
              productData={el}
              normal={true}
              />
          ))}
        </Masonry>
      </div>
      <div className='w-main m-auto my-4 flex justify-end'>
            <Pagination totalCount={products?.counts}/>
      </div>
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Products