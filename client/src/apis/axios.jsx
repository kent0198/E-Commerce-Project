import axios from 'axios'


const instance=axios.create({

    baseURL :'http://localhost:5000/api'
    
});

instance.interceptors.request.use(function (config){
    return config;
},function(error){
    return Promise.reject(error);
})

instance.interceptors.response.use(function(response){

    return response.data;

}, function(error){

    return error.response.data;
    
})

export default instance;