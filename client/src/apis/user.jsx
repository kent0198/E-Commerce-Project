import axios  from "./axios";

export const apiResgister=(data)=>axios({
    url:'/user/register',
    method:'post',
    data
})

export const apiLogin=(data)=>axios({
    url:'/user/login',
    method:'post',
    data
})