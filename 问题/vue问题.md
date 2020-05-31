## 1.登录问题

### 1.1登录密码加密

加密算法：使用MD5进行加密

步骤;

1. 先下载md5

```
npm i js-md5 --save-dev
```

2. 按需引入(在需要进行密码加密的组件引入)

```js
import md5 from 'js-md5'

//使用
Pwd: md5(this.password)
```

3. 在`main.js`文件中引入，并将md5挂载到vue原型

```js
//导入md5
import md5 from 'js-md5'
//挂载到vue原型，在全部组件中可以通过this访问
vue.prototype.$md5 = md5

//使用
this.$md5('123456')
```

