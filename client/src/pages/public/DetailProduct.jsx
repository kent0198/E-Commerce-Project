import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { apigetProduct } from '../../apis/product'
import { Breadcumb, Button, SelectQuantily, ProductExtraInfo, ProductDescription, CustomSlider } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStarFromNumber } from '../../ultils/helper'
import { productExtraInfomation } from '../../ultils/contantsProject'
import { apiGetProducts } from '../../apis'
import { getCurrent } from '../../store/user/asyncActions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import path from '../../ultils/path'
import { apiUpdateCart } from '../../apis/user'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import DOMPurify from 'dompurify'

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  lazyLoad: true,
  slidesToScroll: 1
};


const DetailProduct = ({ isQuickView }) => {

  const { current } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pid, title, category } = useParams()
  const [product, setProduct] = useState(null)
  const [quantily, setQuantity] = useState(1)
  const [relatedProduct, setRelatedProduct] = useState(null)
  const [currentImage, setcurrentImage] = useState(null)
  const [updateProduct, setupdateProduct] = useState(false)

  const fecthProductData = async () => {
    const response = await apigetProduct(pid)
    if (response.success) {
      setProduct(response.productData)
      setcurrentImage(response?.productData?.thumb)
    }
  }
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category })
    if (response.success) {
      setRelatedProduct(response.products)
    }
  }
  const handleAddToCart = async () => {
    if (!current) {
      return Swal.fire({
        title: 'Almost...',
        text: 'Please login first!',
        icon: 'info',
        cancelButtonText: 'Not now!',
        showCancelButton: true,
        confirmButtonText: 'Go login page '
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
      })
    }
    const response = await apiUpdateCart({
      pid: product._id,
      color: product.color || 'BLACK',
      quantity: quantily
    })

    if (response.success) {
      toast.success(response.mes)
      dispatch(getCurrent())
      console.log(response)
    } else {
      toast.error(response.mes)
    }
  }
  useEffect(() => {
    if (pid) {
      fecthProductData()
      fetchProducts()
    }
    window.scrollTo(0, 0)
  }, [pid])
  useEffect(() => {
    if (pid) fecthProductData()
  }, [updateProduct])
  const rerender = useCallback(() => {
    setupdateProduct(!updateProduct)
  }, [updateProduct])

  const handleQuantily = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return
    } else {
      setQuantity(number)
    }
  }, [quantily])
  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantily === 1) return
    if (flag === 'minus') setQuantity(prev => +prev - 1)
    if (flag === 'plus') setQuantity(prev => +prev + 1)
  }, [quantily])

  const handleClickImage = (e, el) => {
    e.stopPropagation()
    setcurrentImage(el)
  }

  return (
    <div className='flex justify-start text-left flex-col relative'>
      {
        !isQuickView && <div>
          <h3 className='font-bold mb-5'>{title}</h3>
          <Breadcumb title={title} category={category} />
        </div>
      }
      <div className='w-main m-auto mt-8 flex'>
        <div className='flex-4 flex flex-col gap-4 w-2/5 '>
          <div className='h-[470px] w-[470px]'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: currentImage,
              },
              largeImage: {
                src: currentImage,
                width: 800,
                height: 800
              }
            }} />
          </div>
          <div className='flex flex-col text-center w-[458px]'>
            <Slider {...settings}>
              {product?.images?.map(el => (
                <img src={el} alt='sub-product' className='h-[143px] w-[143px] border object-cover cursor-pointer' onClick={e => handleClickImage(e, el)} />
              ))}
            </Slider>
          </div>
        </div>
        <div className='border-red-300 flex-4 w-2/5 flex flex-col gap-4 '>
          <div className='flex items-center justify-between flex-col'>
            <h2 className='text-[30px] font-semibold text-gray-800 '>{`${formatMoney(formatPrice(product?.price))}VNĐ`}</h2>
            <span className='text-sm text-gray-700'>{`Warehouse : ${product?.quantity}`}</span>
            <div className='flex items-center my-4 gap-2'>
              {renderStarFromNumber(product?.totalRatings)?.map(el => (<span key={el}>{el}</span>))}
              <div className='text-sm text-gray-600'>{`(Sold : ${product?.sold})`}</div>
            </div>
            <ul className='list-item text-sm text-gray-500 pl-5'>
              {product?.description?.lenght > 1 && product?.description?.map(el => (<li className='list-disc' key={el}>{el}</li>))}
              {product?.description?.lenght ===1 && <div className='text-sm line-clamp-[10]' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product?.description[0])}} ></div>}
            </ul>
            <div className='flex flex-col gap-8'>
              <SelectQuantily quantily={quantily} handleQuantily={handleQuantily} handleChangeQuantity={handleChangeQuantity} />
              <Button fw handleOnClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        {!isQuickView && <div className='border border-grenn-300 flex-2 w-1/5 gap-10'>
          {productExtraInfomation.map(el => (
            <ProductExtraInfo key={el.id} data={el} />
          ))}
        </div>}
      </div>
      {!isQuickView && <div className='w-main m-auto mt-8'>
        <ProductDescription
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>}
      {!isQuickView && <>
        <div className='w-main mt-10'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMER ALSO LIKED</h3>
          <CustomSlider products={relatedProduct} />
        </div>
        <div className='h-[200px] w-full'></div>
      </>
      }
    </div>
  )
}

export default DetailProduct