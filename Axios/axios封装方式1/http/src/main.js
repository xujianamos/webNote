/*
 * @Author: xujian
 * @Date: 2020-03-03 11:12:44
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 11:13:15
 * @Description: 项目 /scr/min.js 中添加代码
 * @FilePath: \http\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import api from './http/api'
import http from './http/http'

// axios 拦截器
import './http/axios'

// 对后端接口 进行全局注册
Vue.prototype.$api = api
// 对请求方式 进行全局注册
Vue.prototype.$http = http
