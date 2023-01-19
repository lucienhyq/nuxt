import Vue from 'vue';
import {Message} from "element-ui";

// asyncData created 服务器请求接口封装

export default function ({store, redirect, req, app: {$axios}}) {
  
  $axios.onRequest(config => {
    console.log(config.url)
    
  });

  // response拦截器，数据返回后，可以先在这里进行判断
  $axios.interceptors.response.use(
    response => {
      console.log(response.data)
      if(response.data.result == 0){
        Message({
          type: 'error',
          message: '请登录',
          duration: 1000
        })
      }
      // 请求接口数据正常，返回数据
      return response.data
    },
    error => {
      if(error.response) {
        // console.log(error.response)
        // if (error.response.status == 404) {
        //   console.log('ddddddddddddddddddddd')
        //   // http状态404，请求API找不到，重定向到404页面
        //   redirect("/404?i="+ i)
        // } else {
        //   redirect("/error?i="+i+"&err=" + error.response.config.url + '&status' + error.response.status)
        // }
      }

      return Promise.reject(error.response)   // 返回接口返回的错误信息
    })
}
