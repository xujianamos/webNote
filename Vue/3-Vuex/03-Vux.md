---
typora-copy-images-to: assets
---

## 1.Vuex概述

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。`Vuex`是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的==数据共享==。它采用==集中式存储==管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

使用Vuex管理数据的好处：

1. 能够在`vuex`中集中管理==共享的数据==，便于开发和后期进行维护
2. 能够高效的实现==组件之间的数据共享==，提高开发效率
3. 存储在`vuex`中的数据是==响应式==的，当数据发生改变时，页面中的数据也会同步更新

> 一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中；
>
> 对于组件中的私有数据，依旧存储在组件自身的 data 中即可。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 [store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。

## 2.基本使用

每一个 `Vuex` 应用的核心就是 `store`（仓库）。`store`基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。`Vuex `和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

注意：我们通过提交 mutation 的方式，而非直接改变 `store.state.count`，是因为我们想要更明确地追踪到状态的变化。

### 2.1命令行形式安装

步骤

1. 安装`vuex`依赖包

- 安装在==运行依赖==中

```js
npm i vuex --save
```

2. 导入`vuex`包，并注册`vuex`

- 在`src`根目录下的`store.js`文件中编写

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

3. 创建`store`对象

- 在`store.js`文件中编写

```js
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

现在，你可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

4. 将`store`对象挂载到`vue`实例中

- 在`main.js`（打包入口文件）中编写

```js
import Vue from 'vue'
import App from './App.vue'
//1.导入编写的store.js文件
import store from './store'
new Vue({
	el:'#app',
	render:h => h(app),
	router,
  //2.将store.js中暴露的对象挂载到vue实例上
//将创建的共享数据对象，挂载到 Vue 实例中
// 所有的组件，就可以直接从 store 中获取全局的数据了
// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store
//通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
})
```

### 2.2可视化安装

1. 打开终端，输入命令：vue ui
2. 在新建项目中的功能面板选中vuex（已有项目需在运行依赖安装）
3. 安装

## 3.核心语法

### 3.1State

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

`State `提供唯一的公共数据源，所有共享的数据都要统一放到 `Store` 的 `State` 中进行存储。  

- 语法：

```js
// 创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
	state: { count: 0 }
})
```

#### 3.1.1组件访问 `State` 中数据的第一种方式：  

```js
this.$store.state.全局数据名称
```

示例：

```js
<template>
	<div>
    //在template区域可以省略this，直接通过$store.state.count获取
		<h3>当前最新的count值为：{{$store.state.count}}</h3>
	</div>
</template>
<script>
 //由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
 //每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
  computed: {
    count () {
      return this.$store.state.count
    }
  }    
 </script>
```

#### 3.1.2组件访问 `State` 中数据的第二种方式：  

```js
// 1. 从 vuex 中按需导入 mapState 函数
//在组件的script中头部导入
import { mapState } from 'vuex'
```

通过刚才导入的 `mapState` 函数，将当前组件需要的全局数据，==映射==为当前组件的 `computed` 计算属性：  

```js
// 2. 将全局数据，映射为当前组件的计算属性
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

### 3.2Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
//调用
store.commit('increment')
```

`Mutation` 用于变更 `Store`中 的数据。  

- 只能通过 `mutation` 变更 `Store` 数据，不可以直接操作 `Store` 中的数据。 
- 只有 mutations 中定义的函数，才有权利修改 state 中的数据
- 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。
- 不要在 mutations 函数中，执行异步操作

#### 3.2.1触发 `mutations` 的第一种方式：

定义：在`store.js`中定义

```js
const store = new Vuex.Store({
	state: {count: 0},
  //定义
	mutations: {//对象中编写修改数据方法
  //add函数
  //形参state就是上面的state对象，可以直接通过 state.属性名 获取其中的数据
		add(state) {
			// 变更状态
			state.count++
		}
	}
})
```

调用：在需要使用的组件中调用

```js
methods: {
	handle1() {
	// 触发 mutations 的第一种方式：通过this.$store.commit触发，括号中是函数名
  //add为store中定义的函数名
	this.$store.commit('add')
	}
}
```

#### 3.2.2可以在触发 `mutations` 时传递参数：提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

定义：

```js
const store = new Vuex.Store({
	state: {count: 0},
	mutations: {
  //第一个形参为state对象，通过对象调用数据
	//第二个形参为调用组件传递过来的数据
		addN(state, step) {
		// 变更状态
		state.count += step
		}
	}
})
```

调用：

```js
methods: {
	handle2() {
		// 在调用 commit 函数，
		// 触发 mutations 时携带参数
		//第二个参数就是传的参数
		// commit 的作用，就是调用 某个 mutation 函数
		this.$store.commit('addN', 3)
	}
}
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

```
store.commit('increment', {
  amount: 10
})
```

#### 3.2.3触发 `mutations` 的第二种方式：

```js
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from 'vuex'
```

通过刚才导入的 `mapMutations` 函数，将需要的 `mutations` 函数，映射为当前组件的 `methods` 方法：  

```js
// 2. 将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
  //先映射
	...mapMutations(['add', 'addN'])
	btnHandler1() {
	//再直接调用，也可以再页面上直接调用
  //<button @click="addN(3)">-N</button>
      this.add()
    }
}
```

#### 3.2.4Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

* 使用 `Vue.set(obj, 'newProp', 123)`, 或者
* 以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

```
state.obj = { ...state.obj, newProp: 123 }
```

#### 3.2.5使用常量替代 Mutation 事件类型

这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

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

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做.

#### 3.2.6Mutation 必须是同步函数

一条重要的原则就是要记住 **mutation 必须是同步函数**。请参考下面的例子：

```
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的

### 3.3Action

Action 类似于 mutation，不同在于：

* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

`Action` 用于处理异步任务  

如果通过异步操作变更数据，必须通过 `Action`，而不能使用 `Mutation`，但是在 `Action` 中还是要通过触发`Mutation` 的方式间接变更数据  

定义：

```js
const store = new Vuex.Store({
// ...省略其他代码
	mutations: {
		add(state) {
       // 不要在 mutations 函数中，执行异步操作
      // setTimeout(() => {
      //   state.count++
      // }, 1000)
			state.count++
		}
	},
  // 定义 Action
	actions: {
		addAsync(context) {
			setTimeout(() => {
        // 在 actions 中，不能直接修改 state 中的数据；
        // 必须通过 context.commit() 触发某个 mutation 才行
				context.commit('add')
		}, 1000)
	}
}
})
```

使用：

#### 3.3.1触发`actions`  的第一种方式  

```js
methods: {
	handle() {
	// 触发 actions 的第一种方式
  //这里的 dispatch 函数，专门用来触发 action
		this.$store.dispatch('addAsync')
		}
}
```

#### 3.3.2触发 `actions` 异步任务时携带参数：  

定义：

```js
// 定义 Action
const store = new Vuex.Store({
	// ...省略其他代码
	mutations: {
		addN(state, step) {
			state.count += step
			}
	},
	actions: {
    //第二个形参就是传递过来的数据
			addNAsync(context, step) {
				setTimeout(() => {
          //这里的step形参传递给mutation中的函数
					context.commit('addN', step)
					}, 1000)
		}
	}
})
```

使用：

```js
// 触发 Action
	methods: {
		handle() {
			// 在调用 dispatch 函数，
			// 触发 actions 时携带参数
			this.$store.dispatch('addNAsync', 5)
		}
}
```

#### 3.3.3触发 actions 的第二种方式：`mapActions` 辅助函数

`mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
// 1. 从 vuex 中按需导入 mapActions 函数
import { mapActions } from 'vuex'
```

通过刚才导入的 `mapActions` 函数，将需要的 `actions` 函数，映射为当前组件的 `methods` 方法：  

```js
// 2. 将指定的 actions 函数，映射为当前组件的 methods 函数
methods: {
	...mapActions(['addASync', 'addNASync'])
}
```

示例：

```js
<template>
  <div>
  //页面上可以省略this调用
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(5)">-N Async</button>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    //映射
    //可以再methods定义的函数中通过this调用
    ...mapActions(['subAsync', 'subNAsync']),
  }
}
</script>
```



### 3.4Getter

`Getter` 用于对 `Store` 中的数据进行加工处理形成新的数据。  ==不会修改原数据，只起到包装的作用==

- `Getter` 可以对 `Store` 中已有的数据加工处理之后形成新的数据，类似 `Vue` 的计算属性。 可以认为是 store 的计算属性,getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
-  `Store` 中数据发生变化， `Getter` 的数据也会跟着变化。  

定义：

```js
// 定义 Getter
const store = new Vuex.Store({
	state: {count: 0},
	getters: {
		showNum: state => {
			return '当前最新的数量是【'+ state.count +'】 '
		}
	}
})
```

#### 3.4.1通过属性访问

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
this.$store.getters.名称
```

示例：

```js
<template>
  <div>
    <!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
//页面上直接调用
    <h3>{{$store.getters.showNum}}</h3>
  </div>
</template>
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的

#### 3.4.2通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果.

#### 3.4.3`mapGetters` 辅助函数

```js
//导入mapGetters函数
import { mapGetters } from 'vuex'
	computed: {
  //再computed计算属性中映射
	...mapGetters(['showNum'])
}
```

示例：

```js
<template>
  <div>
  //3.调用
    <h3>{{ showNum }}</h3>
  </div>
</template>

<script>
//1.导入
import {  mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    //2.映射
    ...mapGetters(['showNum'])
  },
}
</script>
```

### 3.5Module

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

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 3.5.1模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

#### 3.5.2命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。

##### 1.在带命名空间的模块内访问全局内容（Global Assets）

如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 2.在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

##### 3.带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

#### 3.5.3模块动态注册

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

#### 保留 state

在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 `preserveState` 选项将其归档：`store.registerModule('a', module, { preserveState: true })`。

当你设置 `preserveState: true` 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。

#### 3.5.4模块重用

有时我们可能需要创建一个模块的多个实例，例如：

* 创建多个 store，他们公用同一个模块 (例如当 `runInNewContext` 选项是 `false` 或 `'once'` 时，为了[在服务端渲染中避免有状态的单例](https://ssr.vuejs.org/en/structure.html#avoid-stateful-singletons))
* 在一个 store 中多次注册同一个模块

如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

```js
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```



## 4.总结

### 4.1定义总结

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  //1.定义数据
  state: { count: 0 },
  // 只有 mutations 中定义的函数，才有权利修改 state 中的数据
  mutations: {
    //形参state为上面的state对象，第一个形参永远都是state，第二个形参为外界传递过来的数据
    add(state) {
      // 不要在 mutations 函数中，执行异步操作
      // setTimeout(() => {
      //   state.count++
      // }, 1000)
      state.count++
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    }
  },
  actions: {
    //context相当于new出来的实例对象
    addAsync(context) {
      setTimeout(() => {
        // 在 actions 中，不能直接修改 state 中的数据；
        // 必须通过 context.commit() 触发某个 mutation 才行
        context.commit('add')
      }, 1000)
    },
    addNAsync(context, step) {
      setTimeout(() => {
        //commit是触发mutation中的函数
        context.commit('addN', step)
      }, 1000)
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  getters: {
    showNum(state) {
      return '当前最新的数量是【' + state.count + '】'
    }
  }
})
```

### 4.2调用总结

- 第一种

```js
<template>
  <div>
  <!--template区域可以省略this-->
   <!--访问state数据方式1-->
    <h3>当前最新的count值为：{{$store.state.count}}</h3>
    <h3>{{$store.getters.showNum}}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
    <button @click="btnHandler3">+1 Async</button>
    <button @click="btnHandler4">+N Async</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    btnHandler1() {
      this.$store.commit('add')
    },
    btnHandler2() {
      // commit 的作用，就是调用 某个 mutation 函数
      this.$store.commit('addN', 3)
    },
    // 异步地让 count 自增 +1
    btnHandler3() {
      // 这里的 dispatch 函数，专门用来触发 action
      this.$store.dispatch('addAsync')
    },
    btnHandler4() {
      this.$store.dispatch('addNAsync', 5)
    }
  }
}
</script>
```

- 第二种

```js
<template>
  <div>
  <!--将映射的数据直接调用-->
  <h3>当前最新的count值为：{{count}}</h3>
    <h3>{{ showNum }}</h3>
    <button @click="btnHandler1">-1</button>
    <button @click="subN(3)">-N</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(5)">-N Async</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    //将state中的全局数据声明进行映射为计算属性
    //count为全局数据名，在state中
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    //将函数映射为方法，相当于组件自己的methods方法
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNAsync']),
    btnHandler1() {
      this.sub()
    }
  }
}
</script>
```

##### 5.项目结构

```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

