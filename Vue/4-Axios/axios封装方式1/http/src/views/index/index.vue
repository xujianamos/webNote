<!--
 * @Author: xujian
 * @Date: 2020-03-03 11:14:08
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 11:14:24
 * @Description: 请输入文件描述
 * @FilePath: \http\views\index\index.vue
 -->
 <template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Index",
  mounted () {
    this.handle()
  },
  methods: {
    handle () {
      // 当然如果你需要带登录信息去请求这个接口 可以在 路由后面跟上 true 或者 false 来决定是否在请求的时候带登录信息
      // 我们这样进行封装 就对一个 请求封装好了。
      this.$http.get(this.$api.Index.index, true).then((result) => {
      })
    }
  }
}
</script>

<style scoped>
</style>

