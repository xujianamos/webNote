<!--
 * @Author: xujian
 * @Date: 2020-03-03 12:48:05
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 12:49:23
 * @Description: api使用
 * @FilePath: \axios封装方式2\view\index.vue
 -->
 <script>
export default {
  methods: {
    onLoad (id) {
      this.$api.article.articleDetail(id, {
        api: 123
      }).then(res => {
        // 执行某些操作      
      })
    }
  }
}
 </script>
