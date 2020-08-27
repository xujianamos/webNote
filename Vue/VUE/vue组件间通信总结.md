## 1.`props`和`$emit`

父组件通过`props`的方式向子组件传递数据，而子组件通过`$emit` 可以向父组件通信。

### 1.1 父组件向子组件传值

接下来我们通过一个例子，说明父组件如何向子组件传递值：在子组件`children.vue`中如何获取父组件`parent.vue`中的数据 。

父组件：`parent.vue`

```vue
//parent.vue父组件
<template>
  <div id="app">
    <children v-bind:nums="num"></children> //前者自定义名称便于子组件调用，后者要传递数据名
  </div>
</template>
<script>
import children from "./components/children"
export default {
  name: 'parent',
  data(){
    return{
      num:[1,2,3,4,5,6]
    }
  },
  components:{ children}
}
```

子组件：`children.vue`

```vue
// 子组件 children.vue
<template>
  <div>
    <span v-for="(item, index) in nums" :key="index">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: ['nums']
}
</script>
```

总结:

1.  `prop `只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 prop 只读，不可被修改，所有修改都会失效并警告。
2. **注：组件中的数据共有三种形式：data、props、computed**

### 1.2子组件向父组件传值（通过事件形式）

`$emit`绑定一个自定义事件, 当这个语句被执行时, 就会将参数arg传递给父组件,父组件通过v-on监听并接收参数。 

子组件：`children.vue`

```vue
// 子组件 children.vue
<template>
  <div>
    <!--1.给每个span绑定事件-->
    <span v-for="(item, index) in nums" :key="index" @click="itemClick(item)">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: ['nums'],
  methods:{
    //事件逻辑
    itemClick(index){
      //2.向父组件发出一个onItemClick事件，并将参数index通过第二个参数发送出去
       this.$emit('onItemClick', index)
    }
  }
}
</script>
```

父组件监听子组件发出的事件：

```vue
//parent.vue父组件
<template>
  <div id="app">
    <!--1.监听子组件的事件-->
    <children v-bind:nums="num"></children> 
  </div>
</template>
<script>
import children from "./components/children"
export default {
  name: 'parent',
  data(){
    return{
      num:[1,2,3,4,5,6]
    }
  },
  components:{ children}
}
```

