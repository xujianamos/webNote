/*
 * @Author: xujian
 * @Date: 2020-03-03 10:47:42
 * @LastEditTime: 2020-03-03 11:32:16
 * @LastEditors: xujian
 * @Description: 用于存放后端提供接口
 * @FilePath: \http\api.js
 */
//1.第一种导出方式
//可以在 项目 /scr/http/ 下面创建 一个文件 api 然后在里 根据 项目模块 创建 接口文件 方便管理
import Goods from './api/goods.js'

export default {
  // 首页
  Index: {
    index: '/index/index'
  },

  // 个人中心
  Home: {
    UserInfo: '/user/info'
  },

  // 当然也可以用文件方式进行管理
  Goods: Goods
}
//2. 第二种导出方式
export const apiUrl = {
  login: '/api/login',
  loginOut: '/api/loginOut',
  qryPageConfig: '/test/qryPageConfig',
  setPageConfig: '/test/setPageConfig'
}
