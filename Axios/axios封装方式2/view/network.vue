<!--
 * @Author: xujian
 * @Date: 2020-03-03 12:48:59
 * @LastEditors: xujian
 * @LastEditTime: 2020-03-03 12:48:59
 * @Description: 断网处理
 * @FilePath: \axios封装方式2\view\network.vue
 -->
 <template>
  <div id="app">
    <div v-if="!network">
      <h3>我没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState(['network'])
  },
  methods: {
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh () {
      this.$router.replace('/refresh')
    }
  }
}
</script>
