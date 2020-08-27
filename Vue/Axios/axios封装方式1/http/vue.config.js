/*
 * @Author: xujian
 * @Date: 2020-03-03 11:16:01
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 11:33:09
 * @Description: 代理配置
 * @FilePath: \http\vue.config.js
 */

// 后端请求地址 注意[他会根据你环境的不同从而获取的 env 文件不同]
const target = process.env.APP_API_URL

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
      },
      '/default': {
        target: 'http://10.59.81.31:8088',
        changeOrigin: true,
        pathRewrite: { '^/default': '' }
      }
    }
  }
}
