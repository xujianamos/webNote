## 1.单文件中使用私有组件

步骤：

1. 在组件的script中导入单文件组件

```js
<script>
import Addition from './components/Addition.vue'
import Subtraction from './components/Subtraction.vue'
</script>
```

2. 在默认导出中定义私有组件

```js
export default {
  data() {
    return {}
  },
  components: {
    'my-addition': Addition,
    'my-subtraction': Subtraction
  }
}
```

3. 在模板区域使用定义的组件

```js
<template>
  <div>
    <my-addition></my-addition>

    <p>---------------------------------</p>

    <my-subtraction></my-subtraction>
  </div>
</template>
```

