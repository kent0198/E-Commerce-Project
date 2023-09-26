import React, {useEffect, useState} from 'react'
import { apigetBlogs } from '../../apis/blog'
import { Breadcumb } from '../../components'
import withBase from '../../hocs/withBase'
import Masonry from 'react-masonry-css'
import {DetailBlog} from '../../components'

const Blog = ({location}) => {
  const [blogs, setBlogs] = useState(null)
  location=location.pathname

  const cleanPath = location.replace("/", '');

  const fecthBlogs = async () => {
    const response = await apigetBlogs()
    if(response.success){
      setBlogs(response)
    }
  }
  useEffect(()=>{
    fecthBlogs()
  },[])



  return (
    <div className='w-main h-full'>
        <div className='text-gray-800 mb-[10px] uppercase leading-[1.15] font-bold'>NEWS</div>
        <Breadcumb category={cleanPath}/>
        <div className='grid-rows-2 grid gap-4'>
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid flex "
          columnClassName="my-masonry-grid_column">
          {blogs?.getBlogs?.map(el=>(
              <DetailBlog
                key={el._id}
                bid={el.id}
                blogData={el}
                normal={true}
              />
          ))}
        </Masonry>
        </div>
    </div>
  )
}

export default withBase(Blog)