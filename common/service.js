import Request from '@/js_sdk/luch-request/luch-request/index.js'
import {
  ACCESS_TOKEN
} from '@/common/constants.js'
import config from './config.js'
import tip from '@/common/tip.js';
// import api from '@/api/api.js';
// import store from '@/store/index.js';

let apiUrl = config.apiUrl;

const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync(ACCESS_TOKEN)
  } catch (e) {
    //TODO handle the exception
    console.log("getTokenStorage", token)
  }
  return token
}



const http = new Request()
/**
 * @description 修改全局默认配置
 * @param {Function}   
 */
http.setConfig((config) => {
  /* config 为默认全局配置*/
  config.baseURL = apiUrl; /* 根域名 */
  config.header = {
    ...config.header
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
    ...config.header,
    'X-Access-Token': getTokenStorage() // 演示拦截器header加参
  }
  // 演示custom 用处
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  // if (config.custom.loading) {
  //  uni.showLoading()
  // }
  /**
   /* 演示
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
      return Promise.reject(config)
    }
   **/
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})


http.interceptors.response.use((response) => {
  /* 对响应成功做点什么 可使用async await 做异步操作*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  console.log(response)
  return response
}, (response) => {
  /*  对响应错误做点什么 （statusCode !== 200）*/
  if (response) {
    let data = response.data
    const token = uni.getStorageSync(ACCESS_TOKEN)
    console.log("------token------", token)
    console.log(data)
    console.log("------异常响应------", data.status)
    switch (data.status) {
      case 403:
        tip.error('拒绝访问');
        break
      case 500:
        if (!token || data.message == "Token失效，请重新登录") {
          tip.alert('登录已过期')
          setTimeout(() => {
            // api.logout().then(res => {
            //   // uni.clearStorageSync()
            //   uni.removeStorage({
            //     key: 'Access-Token',
            //     success: function(res) {
            //       console.log('success');
            //     }
  	         //   });
            //   uni.redirectTo({
            //     url: '/pages/login/login'
            //   });
            // })
            // store.dispatch('Logout').then(() => {
            // 	uni.redirectTo({
            // 	    url: '/pages/login/login'
            // 	});
            // }) 
          }, 1000)
        }
        break
      case 404:
        break
      case 504:
        break
      case 401:
        if (token) {
          /* store.dispatch('Logout').then(() => {
             setTimeout(() => {
               window.location.reload()
             }, 1500)
           }) */
        }
        break
      default:
        tip.error({
          duration: 0,
          forbidClick: true,
          message: data.message
        });
        break
    }
  }
  console.log(response)
  return Promise.reject(response)
})


export {
  http
}