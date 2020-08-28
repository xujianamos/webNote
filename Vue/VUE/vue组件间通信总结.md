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

## 2.`$children` 和 `$parent`

通过`$parent`和`$children`就可以访问组件的实例。使用后可以直接调用组件的方法或访问数据。

父组件：

```vue
<script>
import ComA from './test/comA.vue'
export default {
  name: 'HelloWorld',
  components: { ComA },
  data() {
    return {
      msg: 'Welcome'
    }
  },

  methods: {
    //改变子组件值
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = 'this is new value'
    }
  }
}
</script>
```

子组件:

```vue
<script>
export default {
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    //获取父组件的值为
    parentVal(){
      return this.$parent.msg;
    }
  }
}
</script>
```

注意：

1. 如在`#app`上拿`$parent`得到的是`new Vue()`的实例，在这实例上再拿`$parent`得到的是`undefined`，而在最底层的子组件拿`$children`是个空数组。
2. 要注意得到`$parent`和`$children`的值不一样，`$children` 的值是数组，而`$parent`是个对象。
3. 上面两种方式用于父子组件之间的通信， 而使用props进行父子组件通信更加普遍; 二者皆不能用于非父子组件之间的通信。

## 3.`provide`和`inject`

祖先组件中通过`provide`来提供变量，然后在子孙组件中通过`inject`来注入变量。 

`provide / inject `API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

组件结构:

```
App.vue
└─ Home.vue
   └─ TabControl.vue
```

`App.vue`组件:

```js
<script>
  import Home from '../components/Home.vue'
  export default {
    name: "App",
    //父组件提供变量
    provide: {
      value: "祖先组件"
    },
    components:{
      Home
    }
  }
</script>
```

`Home.vue`组件：

```vue
<script>
  import TabControl from '../components/TabControl.vue'
  export default {
    name: "Home",
    //子组件注入父组件提供的变量
    inject: ['value'],
    data() {
      return {
        num: this.value
      }
    },
    components: {
      TabControl
    }
  }
</script>
```

`TabControl.vue`组件

```vue
<script>
  export default {
    name: "TabControl",
    //子组件注入祖先组件提供的变量
    inject: ['value'],
    data() {
      return {
        val: this.value
      }
    }
  }
</script>
```

可以看到，在 `App.vue` 里，我们设置了一个 `provide: value`，值为祖先组件，它的作用就是将 `value` 这个变量提供给它的**所有子组件**。而在子孙组件 `Home.vue` 和`TabControl.vue`中，通过 `inject` 注入了从 祖先组件`App`中提供的 `value`变量，那么在组件`Home`和`TabControl`中，就可以直接通过 `this.value`访问这个变量了，它的值也是祖先组件。

需要注意的是：**provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的**

所以，上面` App.vue` 的 `value`如果改变了， `Home.vue` 和`TabControl.vue`中 `this.value`是不会改变的，仍然是祖先组件。

> provide与inject 怎么实现数据响应式

## 4.`ref` 与`refs`

`ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据

子组件：

```vue
export default {
  name:'Home',
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}
```

父组件:

```vue
<template>
  <!--1.ref为子组件实例-->
  <Home ref="homeRef"></Home>
</template>
<script>
    import Home from '../components/Home.vue'
  export default {
    name:'App',
    mounted () {
      //2.通过this.$refs.homeRef拿到子组件实例，就可以调用子组件数据和方法
      const homeRef = this.$refs.homeRef;
      console.log(homeRef.name);  // Vue.js
      homeRef.sayHello();  // hello
    }
    components:{
      Home
    }
  }
</script>
```

## 5.事件总线`eventBus`

`eventBus` 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

#### 1. 初始化

首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.

```js
// event-bus.js

import Vue from 'vue'
export const EventBus = new Vue()
```

#### 2. 发送事件

假设你有两个组件: `home` 和 `login`, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:

```vue
<template>
  <div>
    <home></home>
    <login></login>
  </div>
</template>

<script>
import home from './home.vue'
import login from './login.vue'
export default {
  components: { home, login }
}
</script>
```

`login.vue`组件中发送事件：

```vue
<template>
  <div>
    <button @click="login">登录</button>    
  </div>
</template>

<script>
  //1.导入事件总线
import {EventBus} from './event-bus.js'
export default {
  data(){
    return{
      userInfo:{
        username:'',
        age:20
      }
    }
  },
  methods:{
    login(){
      //2.向事件总线中注入事件
      EventBus.$emit('login', this.userInfo)
    }
  }
}
</script>
```

#### 3. 在`home.vue`接收事件

```vue
<script>
  //1.导入事件总线
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      username:''
    }
  },

  mounted() {
    //2.监听事件总线
    EventBus.$on('login', params => {
      this.username =  params.username;
    })
  }
}
</script>
```

这样就实现了在组件`login.vue`中点击登录按钮, 在`home.vue`中利用传递来的	`userInfo` 展示用户信息。

#### 4. 移除事件监听者

如果想移除事件的监听, 可以像下面这样操作:

```js
import { eventBus } from 'event-bus.js'
EventBus.$off('login', {})
```

## 6.Vuex



## 7.`localStorage` 与`sessionStorage`

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。 通过`window.localStorage.getItem(key)`获取数据 通过`window.localStorage.setItem(key,value)`存储数据。

由于`localStorage` 与 `sessionStorage`只支持字符串，所以需要用JSON转换：

```js
JSON.stringify(state.subscribeList);   // array -> string
JSON.parse(window.localStorage.getItem("subscribeList"));    // string -> array 
```

`vuex `是 vue 的状态管理器，存储的数据是响应式的，但是并不会保存起来，刷新之后就回到了初始状态。**具体做法应该在`vuex`里数据改变的时候把数据拷贝一份保存到`localStorage`里面，刷新之后，如果`localStorage`里有保存的数据，取出来再替换`store`里的`state`。**

```js
let defaultCity = "上海"

try {   // 用户关闭了本地存储功能，此时在外层加个try...catch
  if (!defaultCity){
    defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
  }
}catch(e){}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      try {
      window.localStorage.setItem('defaultCity', JSON.stringify(state.city));
      // 数据改变的时候把数据拷贝一份保存到localStorage里面
      } catch (e) {}
    }
  }
})
```

## 8.`$attrs`与 `$listeners`

现在我们来讨论一种情况， 我们一开始给出的组件关系图中A组件与D组件是隔代关系， 那它们之前进行通信有哪些方式呢？

1. 使用`props`绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
2. 使用`eventBus`,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
3. 使用Vuex来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.

在`vue2.4`中，为了解决该需求，引入了`$attrs` 和`$listeners` ， 新增了`inheritAttrs` 选项。

`$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。

`$listeners`：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

根组件：

```vue
<template>
  <div>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>
```

组件：

```vue
// childCom1.vue
<template class="border">
  <div>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>

```

组件

```vue
// childCom2.vue
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String
  },
  created() {
    console.log(this.$attrs); // { "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>
```

组件

```vue
// childCom3.vue
<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  }
};
</script>
```

简单来说：`$attrs`与`$listeners` 是两个对象，`$attrs` 里存放的是父组件中绑定的非 Props 属性，`$listeners`里存放的是父组件中绑定的非原生事件。