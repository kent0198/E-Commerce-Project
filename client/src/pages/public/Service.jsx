import React from 'react'
import { memo } from 'react'
import withBase from '../../hocs/withBase'
import { Breadcumb } from '../../components'
import {services} from '../../ultils/contants'
import Masonry from 'react-masonry-css'
import {CardService} from '../../components'

const Service = ({location}) => {

  location=location.pathname
  const cleanPath = location.replace("/", '');
  return (
    <div className='w-main h-full'>
       <div className='text-gray-800 mb-[10px] uppercase leading-[1.15] font-bold'>SERVICES</div>
       <Breadcumb category={cleanPath}/>
        <div className='flex gap-4 py-3'>
            <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163' alt='not now'/>
            <div className='font-light text-base text-gray-800 optimize-legibility'>Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit. <br/>
            <br/>
              Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.<br/>
              <br/>
              Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.</div>
        </div>
        <div className='py-4'>
          <div className='flex justify-center font-semibold font-man text-2xl leading-7 text-gray-600 py-4'>We Offer Best Services</div>
           {/*  {services.map((el)=>(
              <div key={el.id} className='grid grid-cols-3'>
                <img src={el.img} alt='noname'/>
                <div>{el.title}</div>
                <div>{el.desc}</div>
              </div>
            ))} */}
             <Masonry
              breakpointCols={3}
              className="my-masonry-grid flex "
              columnClassName="my-masonry-grid_column">
              {services?.map(el=>(
              <CardService
               key={el._id}
               cardService={el}
               normal={true}
              />
          ))}
        </Masonry>
        </div>
    </div>
  )
}

export default memo(withBase(Service))