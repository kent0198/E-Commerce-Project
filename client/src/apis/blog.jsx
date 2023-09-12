import axios  from "./axios";

export const apigetBlogs=()=>axios({
    url:'/blog',
    method:'get',
})

export const apigetBlog=(bid)=>axios({
    url:'/blog/one/'+bid,
    method:'get',
})

