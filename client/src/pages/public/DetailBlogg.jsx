import React,{useState,useEffect} from 'react'
import withBase from '../../hocs/withBase'
import ReadMoreReact from 'read-more-react';
import { useParams } from 'react-router-dom'
import { apigetBlog } from '../../apis/blog'
import { Breadcumb } from '../../components'
import moment from 'moment'

const DetailBlogg = ({location}) => {


  const [blog, setblog] = useState(null)
  const {bid,title}=useParams()
  
  const fecthProductData = async () => {
    const response = await apigetBlog(bid)
    if (response.success) {
      setblog(response.rs)
      console.log(response)
    }
  }
  useEffect(()=>{
    fecthProductData()
  },[])
  return (
    <div className='w-main h-full'>
        <div className='font-medium uppercase '>{title}</div>
        <div className='text-sm font-normal text-gray-700 py-5'>
          <Breadcumb  category={title}/>
        </div>
        <div className='flex gap-3 text-sm text-gray-700 py-3 justify-end'>
          <span className='border-r-black'>Author : {blog?.author}</span>
          <span>{moment(blog?.createdAt).format('YYYY-MM-DD')}</span>
          <span>View : {blog?.numberViews}</span>
        </div>
        <div className='text-gray-700 text-sm '>
          <img className='w-full h-auto pb-4' src={blog?.image}/>
          <ReadMoreReact text={blog?.desc || 'hihi'}
                  min={80}
                  ideal={100}
                  max={200}
                  readMoreText={<span className="text-red-500 hover:text-red-900 translate-x-1">Read more → </span>}/>
        </div>
    </div>
  )
}

export default withBase(DetailBlogg)