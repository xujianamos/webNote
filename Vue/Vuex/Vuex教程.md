## 1.介绍

### 1.1简介

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

使用Vuex管理数据的好处：

1. 能够在`vuex`中集中管理共享的数据，便于开发和后期进行维护
2. 能够高效的实现组件之间的数据共享，提高开发效率
3. 存储在`vuex`中的数据是响应式的，当数据发生改变时，页面中的数据也会同步更新

> 注：一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中；对于组件中的私有数据，依旧存储在组件自身的 data 中即可。

### 1.2基本使用

每一个 Vuex 应用的核心就是 `store（仓库）`。`store`基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：

1. **Vuex 的状态存储是响应式的**。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. **你不能直接改变 store 中的状态**。改变 store 中的状态的唯一途径就是显式地`提交 (commit) mutation`。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

#### 1.2.1安装

```bash
npm install vuex --save
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 `Vuex`：

```js
//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

`Vuex` 依赖 `Promise`。如果你支持的浏览器并没有实现 `Promise (比如 IE)`，那么你可以使用一个 `polyfill` 的库，例如 `es6-promise`。

如果你喜欢使用诸如 `npm` 等包管理器，可以按照下列方式执行安装：

```bash
npm install es6-promise --save
```

#### 1.2.2使用

安装 Vuex 之后，让我们来创建一个 store。

在`store.js`文件中创建。创建过程直截了当——仅需要提供一个初始 `state `对象和一些 `mutation`：

```js
//store.js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  //store 中存放的就是全局共享的数据
	//项目中的所有组件都可以访问(原理是使用 Vue.use(Vuex) 进行了全局注册)
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

//必须向外暴露
export default store
```

在`main.js`文件导入

```js
//1.导入
import store from './store'
//2.挂载
new Vue({
  components: { App },
  router,
  //将store.js中暴露的对象挂载到vue实例上
	//将创建的共享数据对象，挂载到 Vue 实例中
	//所有的组件，就可以直接从 store 中获取全局的数据了
	//把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  //通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
  store,
  template: '<App/>',
}).$mount('#app')
```

现在，你可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

再次强调，我们通过提交 mutation 的方式，而非直接改变 `store.state.count`，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

> 由于 store 中的状态是响应式的，在组件中`调用 store中的状态` 简单到仅需要在计算属性中返回即可。`触发变化`也仅仅是`在组件的 methods 中提交 mutation`。

## 2.核心概念

### 2.1State

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个唯一数据源而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

> 存储在 Vuex 中的数据和 Vue 实例中的 `data` 遵循相同的规则

#### 2.1.1在 Vue 组件中获得 Vuex 状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态：

```js
// Home.vue组件
<template>
	<div>
    //在template区域可以省略this，直接通过$store.state.count获取
		<h3>当前最新的count值为：{{$store.state.count}}</h3>
		//调用计算属性
		<h4>{{count}}</h4>
	</div>
</template>
<script>
export default {
  name: 'Home',
  computed: {
//由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
//每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
    count () {
      return this.$store.state.count
    }
  }
}
</script>
```

每当 `store`仓库中的`state`对象中的`count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

#### 2.1.2`mapState` 辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // mapState是一个函数,返回一个对象。
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 this 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```js
//将全局数据，映射为当前组件的计算属性
//count为store中定义的数据属性名
//mapState函数接收一个数组，数组属性名为store中state数据的属性名
computed: {
	...mapState(['count'])
}
```

示例：

```js
<template>
  <div>
  //3. 在页面中直接写映射的数据名
		<h3>当前最新的count值为：{{ count }}</h3> 
  </div>
</template>
<script>
  //1. 导入mapState函数
import { mapState } from 'vuex'
export default {
  data() {return {}},
  computed: {
    //2. 映射
    ...mapState(['count']),
  },
  methods: {}
}
</script>
```

> 注意：尽量使用getter读取state中的数据。

#### 2.1.3对象展开运算符

`mapState` 函数**返回的是一个对象**。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了**对象展开运算符**，我们可以极大地简化写法：

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### 2.2Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如**对列表进行过滤并计数**：

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 store 中定义`getter`（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 `state` 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    //state作为第一个参数
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

Getter 接受 `getters`作为其第二个参数：

```js
const store = new Vuex.Store({
	state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    //state作为第一个参数
    fullname(state) {
      return state.name + '11111'
    },
    //getters作为第二个参数
    fullname2(state, getters) {
      return getters.fullname + '2222'
    }
  },
})
```

Getter 接受 `rootState`作为其第三个参数：

```js
const store = new Vuex.Store({
state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    //state作为第一个参数,
    fullname(state) {
      return state.name + '11111'
    },
    //getters作为第二个参数,
    fullname2(state, getters) {
      return getters.fullname + '2222'
    },
    //rootState为第三个参数,适用于模块化的操作
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
})
```

#### 2.2.1通过属性访问

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

```js
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

> 注意：getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

#### 2.2.2通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。**在你对 store 里的数组进行查询时非常有用**。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
  //等价于:
  getTodoById: function(state){
    return function(id){
      return state.todos.find(todo => todo.id === id)
    }
  }
}
```

在单文件组件中调用，同时传递参数进去

```js
//此时传递2给参数id
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

> 注意：getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

示例：

```js
 getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    more20stu(state) {
      return state.students.filter(s => s.age > 20)
    },
    more20stuLength(state, getters) {
      return getters.more20stu.length
    },
    moreAgeStu(state) {
      // return function (age) {
      //   return state.students.filter(s => s.age > age)
      // }
      return age => {
        return state.students.filter(s => s.age > age)
      }
    }
  },
```

调用：

```js
<h2>{{$store.getters.moreAgeStu(12)}}</h2>
```

#### 2.2.3`mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### 2.3Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    //形参state就是上面的state对象，可以直接通过 state.属性名 获取其中的数据
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

调用：在需要使用的组件中调用

```js
methods: {
	handle1() {
	// 触发 mutations 的第一种方式：通过this.$store.commit触发，括号中是函数名
  //add为store中定义的函数名
	this.$store.commit('increment')
	}
}
```

#### 2.3.1提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```js
// ...
mutations: {
  //n为基本类型
  increment (state, n) {
    state.count += n
  }
}
```

使用：普通方式提交

```js
this.$store.commit('increment', 10)//此时n就是单个值：10
/*
这种风格提交的方式时，mutation中的increment方法的第二个参数默认就是普通类型的值。
*
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
// ...
mutations: {
  //payload为复杂类型，可以为对象或者数组。
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

使用：特殊方式提交

```js
this.$store.commit('increment', {
  amount: 10
})

//或者
const stu={
  amount:10
}
this.$store.commit({
  type:'increment',//类型（mutation中的方法）
  stu,//后面可以传递多个值，在mutation中通过第二个参数对象取出
  stu1
})
/*
这种风格提交的方式时，mutation中的increment方法的第二个参数默认就是对象。
*/
```

#### 2.3.2对象风格的提交方式

提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### 2.3.3Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者
- 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：

```js
state.obj = { ...state.obj, newProp: 123 }
```

示例：

```js
const store = new Vuex.Store({
  state: {
    info: {
      name: 'kobe',
      age: 40,
      height: 1.98
    }
  },
  mutations: {
    updateInfo(state) {
      state.info.name = 'coderwhy'//此时修改的值是响应式的，因此在state中初始化了
      state.info['address'] = '洛杉矶'//此时新建的属性不具有响应式，因此其他使用此对象的信息组件不会有刷新
// Vue.set（需要修改的对象，属性名，属性值）
      Vue.set(state.info, 'address', '洛杉矶')//使用set实现新添加的属性具有响应式
      
      delete state.info.age//该方式做不到响应式
      //Vue.delete（删除的对象，属性名）
    Vue.delete(state.info, 'age')//此方式能做到响应式，引用此数据的界面会刷新
    }
  },
  )}
```

> 注：响应式就是数据发生变化时，界面跟着一起刷新

#### 2.3.4使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

组件中使用：

```js
import { SOME_MUTATION } from './mutation-types'
this.$store.commit(SOME_MUTATION)
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

#### 2.3.5Mutation 必须是同步函数

一条重要的原则就是要记住 **mutation 必须是同步函数**。为什么？请参考下面的例子：

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的.

#### 2.3.6在组件中提交 Mutation

你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    //1.先映射：数组方式
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    //对象方式：可以进行重命名
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    btnHandler1() {
	//2.再直接调用，也可以再页面上直接调用
  //<button @click="addN(3)">-N</button>
      this.add(),this.incrementBy()
    }
  }
}
```

在 Vuex 中，**mutation 都是同步事务**：在mutation中执行异步操作时，界面会刷新，但是devtools中不会记录此时修改的数据

### 2.4Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

让我们来注册一个简单的 action：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

**Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象**，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。当我们在之后介绍到 [Modules](https://vuex.vuejs.org/zh/guide/modules.html) 时，你就知道 context 对象为什么不是 store 实例本身了。

实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

#### 2.4.1分发 Action

Action 通过 `store.dispatch` 方法触发：

```js
this.$store.dispatch('increment')
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
this.$store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
this.$store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

注意我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）。

#### 2.4.2在组件中分发 Action

你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    //数组方式
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    //对象方式
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 2.4.3组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/)，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

示例：

```js
 actions: {
    // context: 上下文
    aUpdateInfo(context, payload) {
      setTimeout(() => {
        context.commit('updateInfo')
        console.log(payload.message);
        payload.success()//只要上面代码执行完成，就会调用传递进来的函数，告知外面执行成功
      }, 1000)
    },
      //另一种方式：使用promise
    aUpdateInfo1(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateInfo');
          console.log(payload);

          resolve('1111111')//调用resolve就会执行then
        }, 1000)
      })
    }
  },
```

在组件的`methods`中提交

```js
updateInfo() {
         this.$store.commit('updateInfo')
         this.$store.dispatch('aUpdateInfo', {
           message: '我是携带的信息',
           success: () => {//传递一个函数进去，以此来告知执行完成
             console.log('里面已经完成了');
           }
         })
  //另一种方式的提交：调用这个action时，返回的是一个promise对象
  /*
  *this.$store.dispatch('aUpdateInfo', '我是携带的信息')就相当于返回的一个promise对	*象
  */
        this.$store
          .dispatch('aUpdateInfo', '我是携带的信息')
          .then(res => {//通过then获取信息
            console.log('里面完成了提交');
            console.log(res);
          })
      }
```

### 2.5 Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a.属性名 // -> moduleA 的状态
store.state.b.属性名 // -> moduleB 的状态
```

示例：

```js
//moduleA.js
export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '11111'
    },
    fullname2(state, getters) {
      return getters.fullname + '2222'
    },
    //rootState代表的是根的数据
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
  actions: {
    //模块里的context代表的是局部的。也是触发的局部mutation。也可以访问rootGetters,rootState等。可以打印centext查看
    aUpdateName(context) {
      console.log(context);
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  }
}
```



#### 2.5.1模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

## 3.vuex文件夹组织结构

### 3.1结构图

```
-store
	--index.js
	--getters.js
	--mutations.js
	--mutations-type.js
	--actions.js
	-modules
		--moduleA.js
```

### 3.2文件内容

#### 3.2.1`index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
  counter: 1000,
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,

  modules: {
    a: moduleA
  }
})

// 3.导出store独享
export default store
```

3.2.2`getters.js`

```js
export default  {
  powerCounter(state) {
    return state.counter * state.counter
  },
  more20stu(state) {
    return state.students.filter(s => s.age > 20)
  },
  more20stuLength(state, getters) {
    return getters.more20stu.length
  },
  moreAgeStu(state) {
    // return function (age) {
    //   return state.students.filter(s => s.age > age)
    // }
    return age => {
      return state.students.filter(s => s.age > age)
    }
  }
}
```

3.2.3 `mutations.js`

```js
import {INCREMENT} from "./mutations-types";

export default {
  // 方法
  [INCREMENT](state) {
    state.counter++
  },
  decrement(state) {
    state.counter--
  },
  incrementCount(state, payload) {
    // console.log(count);
    state.counter += payload.count
  },
  addStudent(state, stu) {
    state.students.push(stu)
  },
  updateInfo(state) {
    state.info.name = 'coderwhy'

    // 错误的代码: 不能在这里进行异步操作
    // setTimeout(() => {
    //   state.info.name = 'coderwhy'
    // }, 1000)

    // state.info['address'] = '洛杉矶'

    // Vue.set(state.info, 'address', '洛杉矶')
    // 该方式做不到响应式

    // delete state.info.age
    // Vue.delete(state.info, 'age')
  }
}

```

3.2.4`mutations-type.js`

```js
export const INCREMENT = 'increment'
```

3.2.5`actions.js`

```js
export default {
  // context: 上下文
  // aUpdateInfo(context, payload) {
  //   setTimeout(() => {
  //     context.commit('updateInfo')
  //     console.log(payload.message);
  //     payload.success()
  //   }, 1000)
  // },
  aUpdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updateInfo');
        console.log(payload);

        resolve('1111111')
      }, 1000)
    })
  }
}

```

3.2.6`moduleA.js`

```js
export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '11111'
    },
    fullname2(state, getters) {
      return getters.fullname + '2222'
    },
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
  actions: {
    aUpdateName(context) {
      console.log(context);
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  }
}

```

