import React,{useEffect} from 'react'
import clsx from 'clsx'
import { useSearchParams, useNavigate , useParams,createSearchParams,useLocation} from 'react-router-dom'

const PagiItem = ({ children }) => {
  const navigate=useNavigate()
  const [params]=useSearchParams()
  const location=useLocation()
 
  const  handlePagination=()=>{
    const queries=Object.fromEntries([...params])
    if(Number(children)) queries.page=children
    navigate({
        pathname:location.pathname,
        search:createSearchParams(queries).toString()
    })
  }
  return (
    <button 
    className={clsx('w-10 h-10 cursor-pointer flex rounded-3xl justify-center', !Number(children) && 'items-end',
    Number(children) && 'items-center  hover:rouded-full  hover:bg-gray-300',+params.get('page')===+children &&'rouded-full bg-gray-300')}
    onClick={handlePagination}
    type='button'
    disabled={!Number(children)}
    >
      {children}
    </button>
  )
}

export default PagiItem