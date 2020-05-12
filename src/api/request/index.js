import axios from 'axios'

let Axios = axios.create({
    // baseURL: 'test.api', //服务器地址
    timeout: 1000, //超时设置
  });

  //请求拦截
  Axios.interceptors.request.use(req=>{
        let Token = 'im token' 
         if(Token){
            req.headers.Authorization = Token //向请求头添加token以鉴权
         }
        return req
  },err=>{
      return Promise.reject(err)
  })

  //响应拦截
  Axios.interceptors.response.use(res=>{
       
            return res
  })
  
 const http =  (url,{
                    method='get',
                    data={},
                    headers={"content-Type": "application/json;charset=UTF-8"}
                    }={}
                    ) =>{
                       
                    return new Promise((resolve,reject)=>{
                        Axios({
                                    method:method,
                                    url:url,
                                    data:data,
                                    headers:headers
                                }).then(res=>{
                                        if(res.status == 200){
                                            resolve(res.data)
                                        }else{
                                            reject(res)
                                        }
                                }).catch(err=>{
                                    reject(err)
                                })
                        })
  }
  export default http