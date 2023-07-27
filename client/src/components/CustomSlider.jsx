import React,{memo} from 'react'
import Slider from 'react-slick'
import {Product} from './'

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    lazyLoad: true,
    slidesToScroll: 1
  };


const CustomSlider = ({products, activedTab}) => {
  return (
    <>
        {products && <Slider {...settings}>
         {products?.map((el,index)=>(
             <Product 
             key={index} 
             productData={el} 
             isNew={activedTab===1?false:true}
             pid={el.id}
             />
             ))}
         </Slider>}
    </>
  )
}

export default memo(CustomSlider)