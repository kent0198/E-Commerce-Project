import React,{memo,useEffect,useState} from 'react'
import icons from '../ultils/icons'
import {colors} from '../ultils/contants'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import path from '../ultils/path'
import { apiGetProducts } from '../apis/product'
import useDebounce from '../hooks/useDebounce'

const {AiOutlineDown}=icons

const SearchItem = ({name,activeClick,changeActiveFitler,type='checkbox'}) => {
  const navigate=useNavigate()
  const {category}=useParams()
  const [selected, setselected] = useState([])
  const [bestPrice, setbestPrice] = useState(null)
  const [price, setPrice]=useState({
    from:'',
    to:'',
  })
  
  const handleSelect=(e)=>{
    const alreadyEl=selected.find(el=>el===e.target.value)
    if(alreadyEl) setselected(prev=>prev.filter(el=>el!==e.target.value))
    else setselected(prev=>[...prev, e.target.value])
  }

  const fetcBestPriceProduct=async()=>{
    const response=await apiGetProducts({sort:'price',limit:1})
    if(response.success) setbestPrice(response?.products[0]?.price)
  }
  useEffect(()=>{
    if(selected.length>0){

      navigate({
        pathname:`/${category}`,
        search:createSearchParams({
          color:selected.join(',')
        }).toString()
      })
    }else{
      navigate(`/${category}`)
    }
  },[selected])
  useEffect(()=>{
        if(type==='input') fetcBestPriceProduct()
  },[type])
  const debouncePriceFrom=useDebounce(price.from,500)
  const debouncePriceTo=useDebounce(price.to,500)
  useEffect(()=>{
      const data={}
      if(Number(price.from)>0)data.from=price.from
      if(Number(price.to)>0)data.to=price.to 
      navigate({
        pathname:`/${category}`,
        search:createSearchParams(data).toString(),
      })
  } ,[debouncePriceFrom,debouncePriceTo])
  return (
    <>
    <div 
        className='p-3 text-gray-800 text-xs gap-6 relative border border-white flex justify-between items-center'
        onClick={()=>changeActiveFitler(name)}
        >
            <span className='capitalize'>{name}</span>
            <AiOutlineDown/>
            {activeClick===name && <div className='absolute z-10 top-[45px] rounded-md  left-0 w-fit p-4 bg-gray-400 min-w-[100px]'>
                {type === 'checkbox' && <div className=''>
                      <div className='p-4 items-center flex justify-center gap-8'>
                          <span>{`${selected.length} selected`}</span>
                          <span 
                            onClick={e=>{
                            e.stopPropagation()
                            setselected([])
                            }}
                            className='underline cursor-pointer hover:text-main'>Reset</span>
                      </div>
                      <div onClick={e=>e.stopPropagation()} className='flex flex-col gap-3 justify-center'>
                        {colors.map((el, index)=>(
                          <div key={index} className='flex items-center gap-4'>
                              <input 
                              type='checkbox'
                              id={el}
                              value={el}
                              onChange={handleSelect}
                              checked={selected.some(selectedItem=>selectedItem===el)}
                              className='form-checkbox'
                              />
                              <label htmlFor={el}>{el}</label>
                          </div>
                        ))}
                      </div>
                    </div>}

                  {type ==='input' && <div  onClick={e=>e.stopPropagation()}>
                  <div className='p-4 items-center flex justify-between gap-8 border-b'>
                    <span className='whitespace-nowrap'>{`The highest price is ${Number(bestPrice).toLocaleString()} VND`}</span>
                    <span
                    onClick={e=>{
                      e.stopPropagation()
                      setPrice({ from:'',
                      to:'',})
                    }}
                    className='underline cursor-pointer hover:text-main'
                    >
                        Reset
                    </span>
                  </div>
                  <div className='flex items-center p-2 gap-2'>
                      <div className='flex items-center gap-2'>
                          <label htmlFor='from'>From</label>
                          <input 
                            className='form-input' 
                            type='number' 
                            id='form'
                            value={price.from}
                            onChange={e=>setPrice(prev=>({...prev, from:e.target.value}))}
                            />
                      </div>
                      <div className='flex items-center gap-2'>
                          <label htmlFor='from'>To</label>
                          <input 
                          className='form-input' 
                          type='number' 
                          id='form'
                          value={price.to}
                          onChange={e=>setPrice(prev=>({...prev, to:e.target.value}))}
                          />
                      </div>
                  </div>
              </div>}
                
            </div> 
            }       
    </div>
    </>
  )
}

export default memo(SearchItem)