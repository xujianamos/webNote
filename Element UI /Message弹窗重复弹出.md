# 1.message使用

在 Vue 中使用 element 的 message 组件

- 在 Vue 文件中使用

```js
this.$message({
  message: "提示信息",
  type: "success"
})
```

- 在 js 文件中使用

```js
import ElementUI from 'element-ui';

ElementUI.Message({
  message: '提示信息',
  type: 'warning'
});
```

# 2.解决消息弹窗重复显示

```js
// message.js
/**
 * @Description: 重写message挂载，实现 Class 的私有属性
 * @param { String } options => 消息内容
 * @param { Boolean } single => 是否只显示一个
 */
import { Message } from 'element-ui';

const showMessage = Symbol('showMessage');

class DonMessage {
  success (options, single = false) {
    this[showMessage]('success', options, single);
  }
  warning (options, single = false) {
    this[showMessage]('warning', options, single);
  }
  info (options, single = false) {
    this[showMessage]('info', options, single);
  }
  error (options, single = true) {
    this[showMessage]('error', options, single);
  }

  [showMessage] (type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message--error').length === 0) {
        Message[type](options);
      }
    } else {
      Message[type](options);
    }
  }
}

// 默认导出 私有 Message 组件
export default new DonMessage();
```

在有需要的地方引入

```js
import DonMessage from '@/message' 
```

- js 文件中直接使用

```js
DonMessage.warning('请登录') 
```

- 挂载到vue原型上

```js
// main.js 
Vue.prototype.$message = DonMessage 
```

- vue文件中调用

```js
this.$message.warning("请登录")
```

> 最简单的方法就是每次显示前取消掉之前所有弹出消息。