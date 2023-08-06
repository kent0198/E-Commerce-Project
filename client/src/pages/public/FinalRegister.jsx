import React,{useEffect} from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'

const FinalRegister = () => {

    const {status}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(status==='failed') Swal.fire('Oop!','Register not success','error').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
        if(status==='success') Swal.fire('Congratudation!','Register success , please Login','success').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
    },[])
    return (
        <Navigate to={`/${path.LOGIN}`} state={{status}}/>
    )
}

export default FinalRegister