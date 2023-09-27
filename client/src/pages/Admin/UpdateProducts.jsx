import React, { memo, useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, InputForm, MarkDownEditor, Select } from '../../components'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { validate,getBase64 } from '../../ultils/helper'
import { apiCreatePropduct } from '../../apis/product'

const UpdateProducts = ({ editProduct, render }) => {

  const {categories}=useSelector(state=>state.app)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const [payload, setpayload] = useState({
    description: ''
  })
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })

  useEffect(()=>{
    reset({
      title:editProduct?.title || '',
      price:editProduct?.price || '',
      quantity:editProduct?.quantity || '',
      color:editProduct?.color||''
    })
    setpayload({description:typeof editProduct?.description==='object'? editProduct?.description?.join(','):editProduct?.description})
    setPreview({
      thumb:editProduct?.thumb || '',
      images:editProduct?.images|| []
    })
  },[editProduct])
 

  const [invalidFields, setInvalidFields] = useState([])

  const changeValue = useCallback((e) => {
    setpayload(e)
  }, [payload])

  const handlePreview = async (file) => {
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({ ...prev, thumb: base64Thumb }))
  }


  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0) {
      if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
      const finalPayload = { ...data, ...payload }
      const formData = new FormData()
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
      if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append('images', image)
      }
      const response = await apiCreatePropduct(formData)
      if (response.success) {
        toast.success(response.mes)
        reset()
        setpayload({
          thumb: '',
          image: [],
        })
      }
    }
  }

  const handlePreviewImages = async (files) => {
    const imagesPreview = []
    if(files!==undefined && files!==null){
      for( let file of files){
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast('File not supported')
        return
      }
      const base64 = await getBase64(file)
      imagesPreview.push({
        name: file.name,
        path: base64
      })
    }
  }
    if (imagesPreview.length > 0) setPreview(prev => ({ ...prev, images: imagesPreview }))
  }

  useEffect(() => {
    if(watch('thumb')){
      handlePreview(watch('thumb')[0])
    }
  }, [watch('thumb')])


  useEffect(() => {
    handlePreviewImages(watch('images'))
  }, [watch('images')])


  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div className='h-[69px] w-full'></div>
      <div className='p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Update Product</h1>
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label='Name Product'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required: 'Need fill this field'
            }}
            fullWidth
            placeholder='Name of new Product'
          />
          <div className='w-full my-6 flex gap-4'>
            <InputForm
              label='Price'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required: 'Need fill this field'
              }}
              placeholder='Price of new Product'
              style='flex-auto'
            />
            <InputForm
              label='Quantity'
              register={register}
              errors={errors}
              id='quantity'
              validate={{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              placeholder='Quantity of new Product'
            />
            <InputForm
              label='Color'
              register={register}
              errors={errors}
              id='color'
              validate={{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              placeholder='Color of new Product'
            />
          </div>
          <div className='w-full my-6 flex gap-4'>
            <Select
              label='Category'
              register={register}
              options={categories?.map(el => ({ code: el.title, value: el.title }))}
              id='category'
              validate={{ required: 'Need fill this field' }}
              style='flex-auto'
              errors={errors}
              fullWidth
            />
            <Select
              label='Brand (Optional)'
              options={categories?.find(el => el?.title?.toLowerCase() === watch('category')?.toLowerCase())?.brand?.map(el => ({ code: el._id, value: el }))}
              register={register}
              id='brand'
              style='flex-auto'
              errors={errors}
              fullWidth
            />
          </div>
          <MarkDownEditor
            name='description'
            changeValue={changeValue}
            label='Description'
            invadField={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload?.description}
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' htmlFor='thumb'>Upload thumb</label>
            <input
              type='file'
              id='thumb'
              {...register('thumb', { required: 'Need fill' })}
              validate={{ required: 'Need fill this field' }}
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>
          {preview.thumb && <div className='my-4'>
            <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain' />
          </div>}
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' htmlFor='products'>Upload Imgage of product</label>
            <input
              type='file'
              id='products'
              multiple
              {...register('images', { required: 'Need fill' })}
            />
            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          </div>
          {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap '>
            {preview.images?.map((el, index) => (
              <img key={index} src={el} alt='Product' className='w-[200px] object-contain' />
            ))}
          </div>}
          <div className='mt-8'>
            <Button type='submit'>Update product</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(UpdateProducts)