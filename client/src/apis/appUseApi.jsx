import axios from './axios'

export const apiGetCategories=()=>axios({
     url:'/prodcategory/',
     method:'get'
})


export const apiGetProducts=(params)=>axios({
     url:'/product/',
     method:'get',
     params
 })