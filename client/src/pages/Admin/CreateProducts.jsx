import React,{useCallback, useEffect, useState} from 'react'
import { Button, InputForm , Select,MarkDownEditor} from '../../components'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { validate,getBase64 } from '../../ultils/helper'
import { toast } from 'react-toastify'


const CreateProducts = () => {
  const {categories}=useSelector(state=>state.app)

  const {handleSubmit,watch,register, formState:{errors}, reset}=useForm()

  const [preview, setPreview]=useState({
    thumb:null, 
    images:[]
  })
  const [payload, setpayload] = useState({
    description:''
  })
  const [invalidFields, setInvalidFields] = useState([])

  const changeValue=useCallback((e)=>{
      setpayload(e)
  },[payload])


  const handleCreateProduct=(data)=>{
    const invalids=validate(payload,setInvalidFields)
    if(invalids===0){
      if(data.category) data.category=categories?.find(el=>el._id===data.category)?.title
      const finalPayload={...data, ...payload}
      const formData=new FormData()
      for (let i of Object.entries(finalPayload))  formData.append(i[0], i[1])
    }
  }
   const handlePreview=async (file)=>{
    const base64Thumb=await getBase64(file)
    setPreview(prev=>({...prev ,thumb:base64Thumb}))
  } 

  const handlePreviewImages=async(files)=>{
    const imagesPreview=[]
    for( let file of files){
      if(file.type!=="image/png" &&  file.type!=="image/jpeg"){
        toast('File not supported')
        return
      }
      const base64=await getBase64(file)
      imagesPreview.push({
        name:file.name,
        path:base64
      })
    }
    if (imagesPreview.length > 0 ) setPreview(prev=>({...prev, images:imagesPreview}))
  }
  useEffect(()=>{
    handlePreview(watch('thumb')[0])
  },[watch('thumb')])


  useEffect(()=>{
    handlePreviewImages(watch('images'))
  },[watch('images')])

 
  return (
    <div className='w-full'>
        <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 text-gray-700 border-b'>
          <span className='pl-40'>Create New Product</span>
      </h1>
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
                  options={categories?.map(el=>({code:el._id, value:el.title}))}
                  id='category'
                  validate={{required:'Need fill this field'}}
                  style='flex-auto'
                  errors={errors}
                  fullWidth
                />
                <Select
                  label='Brand (Optional)'
                  options={categories?.find(el=>el?._id===watch('category'))?.brand?.map(el=>({code:el._id, value:el}))}
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
              />
              <div className='flex flex-col gap-2 mt-8'>
                <label className='font-semibold' htmlFor='thumb'>Upload thumb</label>
                <input 
                  type='file'   
                  id='thumb' 
                  {...register('thumb',{required:'Need fill'})}
                  validate={{required:'Need fill this field'}}
                  />
                  {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
              </div>
              {preview.thumb && <div className='my-4'>
                  <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain'/>
                </div>}
              <div className='flex flex-col gap-2 mt-8'>
                <label className='font-semibold' htmlFor='products'>Upload Imgage of product</label>
                <input 
                type='file' 
                id='products' 
                multiple
                {...register('images',{required:'Need fill'})}
                />
                 {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
              </div>
              {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap '>
                      {preview.images?.map((el, index)=>(
                        <img key={index} src={el.path} alt='Product' className='w-[200px] object-contain'/>
                      ))}
                </div>}
              <div className='mt-8'>
              <Button type='submit'>Create new product</Button>
              </div>
          </form>
      </div>
    </div>
  )
}

export default CreateProducts