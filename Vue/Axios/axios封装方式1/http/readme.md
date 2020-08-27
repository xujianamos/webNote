<!--
 * @Author: xujian
 * @Date: 2020-03-03 11:04:31
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 11:22:08
 * @Description: 在根目录下面 创建 vue.config.js 用户 请求代理配置
 * @FilePath: \http\readme.md
 -->
## 在根目录下面 创建 vue.config.js 用户 请求代理配置
代码如下：
```
// 后端请求地址 注意[他会根据你环境的不同从而获取的 env 文件不同]
const target = process.env.APP_API_URL;

module.exports = {
  devServer: {
    // 所有的接口请求代理
  proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
              '^api': ''
        }
      }
    }
  }
}
```
## 使用
项目 /src/views/index/index.vue 中我们对他进行使用

```
<template>
     <div>
     </div>
 </template>

<script>
  export default {
        name: "Index",
        mounted() {
            this.handle()
        },
        methods: {
            handle(){
                // 当然如果你需要带登录信息去请求这个接口 可以在 路由后面跟上 true 或者 false 来决定是否在请求的时候带登录信息
                // 我们这样进行封装 就对一个 请求封装好了。
               this.$http.get(this.$api.Index.index,true).then((result) => {
               })
            }
        }
    }
</script>

<style scoped>

</style>
```
## 在项目 /scr/min.js 中添加代码
```
import Vue from 'vue';
import App from './App.vue';
import api from './http/api';
import http from './http/http';

// axios 拦截器
import './http/axios'

// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.$http = http;
```