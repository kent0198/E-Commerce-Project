import React from 'react'
import Moment from 'react-moment';
import ReadMoreReact from 'read-more-react';
import moment from 'moment';
import withBase from '../hocs/withBase';

const DetailBlog = ({bid, blogData,navigate}) => {

  return (
    <div className='py-3' 
    onClick={()=>navigate(`/${bid}/${blogData?.title}`)}
    >
        <img className='w-full h-auto object-contain' src={blogData?.image} alt='No image'/>
        <div className='text-gray-800 uppercase font-medium py-5'>{blogData?.title}</div>
        <div className='flex gap-3 font-man text-gray-600 text-xs'>
            <div className='font-man text-gray-600 text-xs'>{blogData?.author} : </div>
            <div>{moment(blogData?.createdAt).format('YYYY-MM-DD')}</div>
        </div>
        <ReadMoreReact text={blogData?.desc}
                min={80}
                ideal={100}
                max={200}
                readMoreText={<span className="text-red-500 hover:text-red-900 translate-x-1">Read more → </span>}/>
    </div>
  )
}

export default withBase(DetailBlog)