import React, { useState, useEffect, useCallback } from 'react'
import { apiGetUsers,apiUpdateUser,apiDeleteUser } from '../../apis/user'
import { roles,blockStatus } from '../../ultils/contants'
import moment from 'moment'
import { InputField, Pagination, InputForm, Select,Button } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import clsx from 'clsx'

const ManageUser = () => {
  const { handleSubmit, register, formState: { errors } ,reset} = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    phone: '',
    status: ''
  })
  const [users, setusers] = useState(null)
  const [counts, setcounts] = useState()
  const [edit, setedit] = useState(null)
  const [update, setupdate] = useState(false)
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_PRODUCT_LIMIT })
    if (response.success) {
      setusers(response.users)
      setcounts(response.counts)
    }
  }

  const render=useCallback(()=>{
      setupdate(!update)
  },[update])

  const [params] = useSearchParams()
  const [queries, setQueries] = useState({
    q: ''
  })
  const queriesDebounce = useDebounce(queries.q, 800)
  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries) 
  }, [queriesDebounce, params,update])


  const handleUpdate=async (data)=>{
  
    console.log(data)
   const response=await apiUpdateUser(data, edit._id)
    if(response.success){
      setedit(null)
      render()
      toast.success(response.mes)
    }else{
      toast.error(response.mes)
    }
  }

  const hanldeDeleteUser=(uid)=>{
      Swal.fire({
        title:'Are you want delete user',
        showCancelButton:true
      }).then(async(result)=>{
          if(result.isConfirmed){
            const response = await apiDeleteUser(uid)
            if(response.success){
              render()
              toast.success(response.mes)
            }else{
              toast.error(response.mes)
            }
          }
      })
     
  }
  
  return (
    <div className={clsx('w-full', edit && 'pl-16')}>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 text-gray-700 border-b'>
        <span className='pl-40'>Manage User</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <InputField
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            search
            placeholder='Search name or mail user'
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
         {edit && <Button buttonAdmin type='submit' >Update</Button>}
        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-gray-700 text-[13px] border broder-gray-500  text-center text-white'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Email address</th>
              <th className='px-4 py-2'>Fisrtname</th>
              <th className='px-4 py-2'>Lastname</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Create At</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((el, index) => (
                <tr className='border broder-gray-500 ' key={el._id}>
                  <td className='py-2 px-5'>{index + 1}</td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ?
                      <InputForm
                        register={register}
                        errors={errors}
                        fullWidth
                        defaultValue={edit?.email}
                        id={'email'}
                        validate={
                          {
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }
                        }
                      />
                      : <span>{el.email}</span>}
                  </td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ?
                      <InputForm
                        register={register}
                        errors={errors}
                        fullWidth
                        id={'firstname'}
                        defaultValue={edit?.firstname}
                        validate={{ required: 'Require fill' }}
                      />
                      : <span>{el.firstname}</span>}
                  </td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ?
                      <InputForm
                        register={register}
                        errors={errors}
                        fullWidth
                        defaultValue={edit?.lastname}
                        id={'lastname'}
                        validate={{ required: true }}
                      />
                      : <span>{el.lastname}</span>}
                  </td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ?
                       <Select 
                       register={register}
                       errors={errors}
                       fullWidth
                       defaultValue={+el.role}
                       id={'role'}
                       validate={{ required: true }}
                       options={roles}
                       />  
                       : <span>{roles.find(role => +role.code === +el.role)?.value}</span>}
                  </td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ?
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={edit?.phone}
                        id={'phone'}
                        validate={{ required: true }}
                      />
                      : <span>{el.phone}</span>}
                  </td>
                  <td className='py-2 px-5'>
                    {edit?._id === el._id ? 
                    <Select 
                    register={register}
                    errors={errors}
                    fullWidth
                    defaultValue={edit?.isBlocked}
                    id={'status'}
                    validate={{ required: true }}
                    options={blockStatus}
                    /> 
                    : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>}
                  </td>
                  <td className='py-2 px-5'>{moment(el.createdAt).format('DD/MM/YY')}</td>
                  <td>
                   {edit?._id === el._id ?  <span onClick={() => setedit(null)} className='px-2 text-orange-600 hover:underline cursor-auto border mr-2'>Back</span>
                   : <span onClick={() => setedit(el)} className='px-2 text-orange-600 hover:underline cursor-auto border mr-2'>Edit</span>}
                    <span onClick={()=>hanldeDeleteUser(el._id)}className='px-2 text-orange-600 hover:underline cursor-auto border'>Delete</span>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        </form>
        <div className='flex w-full text-left'>
          <Pagination
            totalCount={counts}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageUser