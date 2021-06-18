/*
 * @Author: xujian
 * @Date: 2020-03-03 10:57:58
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 11:11:56
 * @Description: 用于做 axios 拦截器
 * @FilePath: \http\axios.js
 */
import axios from 'axios'

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    return response
  },
  error => {
    // 请求失败
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          // 对400错误您的处理\
          break
        case 401:
          // 对 401 错误进行处理
          break
        default:
          // 如果以上都不是的处理
          return Promise.reject(error)
      }
    }
  }
)
