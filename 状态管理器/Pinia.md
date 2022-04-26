# 1.简介

Pinia 是一个 Vue 的存储库, 它能让你跨组件/页面共享状态。如果你熟悉组合式 API, 你大概会想到你已经能通过这样一个简单的例子来全局共享状态： `export const state = reactive({})`。 对于一个单页面应用（SPA）来说的确如此，但是如果这是一个服务端渲染（SSR）应用时，将使你的应用暴露在安全漏洞之中。

## 1.1基本示例

这就是使用pinia在API方面的样子。你可以从创建`store`开始:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

然后在组件中使用它：

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()
		// 修改count的值
    counter.count++
    // 批量修改
    counter.$patch({ count: counter.count + 1 })
    // 或者使用 action 来修改
    counter.increment()
  },
}
```

你甚至可以为更高级的使用情形用一个函数 (类似于一个组件中的 `setup()`) 来定义一个 Store :

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

如果您仍然不熟悉`setup()`Composition API，请不要担心，Pinia 还支持一组类似Vuex的map helpers。您以相同的方式定义存储，但随后使用`mapStores()`、`mapState()`或`mapActions()`：

```js
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

const useUserStore = defineStore('user', {
  // ...
})

export default {
  computed: {
    // 其它计算属性
    // ...
    // 允许访问 this.counterStore 和 this.userStore
    ...mapStores(useCounterStore, useUserStore)
    // 允许读取 this.count 和 this.double
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // 允许访问 this.increment()
    ...mapActions(useCounterStore, ['increment']),
  },
}
```

## 1.2一个更接近实际的例子

这是一个你使用Pinia时使用类型将会用到的更加完整的实例：

```js
import { defineStore } from 'pinia'

export const todos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 自动完成!  ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // 用自动完成调用其他getters ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // 任何数量的 arguments，返回一个promise或否 
    addTodo(text) {
      // 你可以直接改变状态
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## 1.3安装

```sh
yarn add pinia
# or with npm
npm install pinia
```

> 提示：如果您的应用使用 Vue 2，您还需要安装组合api: `@vue/composition-api`。
>

如果你使用的是Vue CLI,需要安装插件:

```sh
vue add vue-cli-plugin-pinia
```

创建一个 pinia（根存储）并将其传递给应用程序：

```js
import { createPinia } from 'pinia'

app.use(createPinia())
```

如果您使用的是 Vue 2，您还需要安装一个插件并在应用程序的根目录注入创建的插件：

```js
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

这也将添加devtools支持。在Vue3中，仍然不支持时间和编辑等一些功能，因为vue-devtools尚未公开必要的API，但devtools具有更多功能，并且整体开发人员体验要好得多。在Vue2中，Pinia使用Vuex的现有接口（因此不能与它一起使用）。

# 2.核心概念

## 2.1Store

在深入研究核心概念之前，我们需要知道一个store（存储）是使用 `defineStore()`定义的， 并且它需要一个 **唯一的** 名字，作为第一个参数传递：

```js
import { defineStore } from 'pinia'

// useStore 一切例如 useUser, useCart
// 第一个参数是应用程序中store的唯一id
export const useStore = defineStore('main', {
  // 其他选项...
})
```

这个名称，也称为id，是必要的，Pania使用它来将Store连接到devtools。将返回的函数命名为*use...*是可组合项之间的约定，以使其使用习惯。

我们定义一个`store`因为直到在`setup()`内部调用`useStore()`之前， store并不会被创建:

```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以返回整个存储实例，以便在模板中使用它
      store,
    }
  },
}
```

您可以根据需要定义任意数量的Store，并且应该在不同的文件中定义每个`store`以充分利用 pinia（例如自动允许您的包进行代码拆分和TypeScript推理）。

如果您还没有使用`setup`组件，您仍然可以将Pinia与map helpers一起使用。

实例化Store后，您可以直接在Store中访问定义在`state`、`getters`和`actions`中的任何属性。

> 请注意:`store`是一个用`reactive`包装的对象，这意味着没有必要在`getters`之后写入`.value`，但是像`setup`中的`props`一样，**我们不能对其进行解构**：

```js
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 这是行不通的，因为它破坏了响应性（reactivity）
    // 这和从`props`中破坏是一样的
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // will always be "eduardo"
      name,
      // will always be 2
      doubleCount,
      // this one will be reactive
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

为了从存储中提取属性同时保持其响应性，您需要使用`storeToRefs()`。 它将为每个响应属性创建引用。当您仅使用Store中的状态但不调用任何操作时，这很有用。请注意，您可以直接从Store中解构操作，因为它们也绑定到Store本身：

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` 和 `doubleCount` 是 reactive refs
    // 这也将为plugins(插件)添加的属性创建引用，但跳过任何动作或非反应(非ref/reactive)属性
    
    const { name, doubleCount } = storeToRefs(store)
    // the increment action can be just extracted
    const { increment } = store

    return {
      name,
      doubleCount
      increment,
    }
  },
})
```

## 2.2State

大多数时候，state是Store的中心部分。人们通常从定义代表他们的应用程序的状态开始。在Pinia中，状态被定义为返回初始状态的函数。这允许Pinia在服务器端和客户端工作。

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 推荐用于全类型推理的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

### 2.2.1访问`state`

默认情况下，您可以通过`store`实例访问状态来直接读取和写入状态：

```js
const store = useStore()

store.counter++
```

### 2.2.2重置状态

您可以通过调用store 上的方法将状态重置为其初始值：`$reset()`

```js
const store = useStore()

store.$reset()
```

1. 定义store

对于以下示例，您可以假设已创建以下Store：

```js
// ./src/stores/counterStore.js
import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  })
})
```

2. 在`setup()`使用

虽然 Composition API 并不适合所有人，但`setup()`钩子可以使在 Options API 中使用 Pinia 变得更容易。不需要额外的map功能！

```js
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    tripleCounter() {
      return this.counterStore.counter * 3
    },
  },
}
```

3. 在`setup()`外部使用

如果您没有使用 Composition API，而您正在使用`computed`, `methods`, ...，则可以使用`mapState()`帮助器将状态属性映射为只读计算属性：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 在组件内允许访问 this.counter 
    // 与从 store.counter 读取一样
    ...mapState(useCounterStore, ['counter'])
	// 通过对象进行映射
    ...mapState(useCounterStore, {
      // 重命名，与上面一样但是将注册它为 this.myOwnName
      myOwnName: 'counter',
      // 你也可以写一个函数来访问 store
      double: store => store.counter * 2,
      // 它也能访问 `this` ，但是它不会正确地标注类型...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

4. 可修改状态

如果您希望能够写入这些状态属性（例如，如果您有一个表单），您可以`mapWritableState()`改用。请注意，您不能传递类似 with 的函数`mapState()`：

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内部的 this.counter，并允许设置它
    // this.counter++
    // 从 store.counter 中读取也一样
    ...mapWritableState(useCounterStore, ['counter'])
    // 与上一样，但是将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'counter',
    }),
  },
}
```

### 2.2.3改变状态

除了直接用 `store.counter++` 改变 store 之外，您还可以调用该`$patch`方法。它允许您对部分`state`对象同时应用多个更改：

```js
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
})
```

但是，使用这种语法应用某些突变确实很难或成本很高：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。正因为如此，该`$patch`方法还接受一个函数来对这种难以用补丁对象应用的突变进行分组：

```js
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

这里的主要区别是`$patch()`允许您将多个更改分组到 devtools 中的一个条目中。请注意**，直接更改`state`并`$patch()`出现在 devtools 中**，并且可以穿越时间（在 Vue 3 中还没有）。

### 2.2.4更换`state`

您可以通过将 `store` 的`$state`属性设置为新对象来替换 `store` 的整个状态：

```js
store.$state = { counter: 666, name: 'Paimon' }
```

您也可以通过更改替换您的应用程序的整体状态`state`中的`pinia`实例。

```js
pinia.state.value = {}
```

### 2.2.5订阅状态

你可以通过`$subscribe()`store的方法观察状态及其变化，类似于Vuex的subscribe方法。`$subscribe()` 与常规相比使用的优点：`watch()`是订阅只会在 `patch` 后触发一次（例如，使用上面的函数版本时）。

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
})
```

默认情况下，状态订阅绑定到添加它们的组件（如果存储在组件的内部`setup()`）。意思是，当组件被卸载时，它们将被自动删除。如果要在组件卸载后保留它们，请`{ detached: true }`作为第二个参数传递,以从当前组件中分离状态订阅：

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // 该 subscription 将在组件卸载后保留
    someStore.$subscribe(callback, { detached: true })
    // ...
  },
}
```

查看实例上的整个状态：

```js
watch(
  pinia.state,
  (state) => {
    // 每当状态改变时，将整个状态保存到本地存储中
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

## 2.3Getters

Getter完全等同于Store状态的计算值。它们可以用 `defineStore()` 中的`getters`属性定义。其接收 `state` 作为第一个参数来使用箭头函数如：

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
})
```

大多数时候，getter只会依赖状态，但是，他们可能需要使用其他getter。因此，我们可以在定义常规函数时访问整个store实例，**但在 TypeScript 中需要定义返回类型的类型**。这是由于TypeScript中的一个已知限制，不影响用箭头函数定义的getter，也不影响不使用This的getter：

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 自动地推断返回值类型为一个数
    doubleCount(state) {
      return state.counter * 2
    },
    // 返回值类型 **必须** 被明确地指定
    doublePlusOne(): number {
      // 为整个存储（store）自动完成和类型注释 ✨
      return this.doubleCount + 1
    },
  },
})
```

然后你可以直接在store实例上访问getter：

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore()

    return { store }
  },
}
</script>
```

### 2.3.1访问其他 getter

与计算属性一样，您可以组合多个getter。通过 `this` 访问任何其他 `getter`。即使您不使用 TypeScript，您也可以使用[JSDoc](https://jsdoc.app/tags-returns.html)提示您的 IDE 类型：

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    //  因为我们没有使用 `this`，故类型将被自动推断
    doubleCount: (state) => state.counter * 2,
    // 这里我们需要自己添加类型 (在 JS 中使用JSDoc)。 我们也可以用它来制作getter文档。
    /**
     * 返回计数器值乘以二加一。
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

### 2.3.2将参数传递给 getter

`getter`只是在幕后计算的属性，因此不可能将任何参数传递给它们。但是，您可以从getter返回一个函数以接受任何参数：

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

并在组件中使用：

```vue
<script>
export default {
  setup() {
    const store = useStore()
    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

> 请注意:执行此操作时，**getter 不再缓存**，它们只是您调用的函数。但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高：

```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

### 2.3.3访问其他store的getters

要使用其他store的getter，可以直接在`getters`内部使用：

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

### 2.3.4与`setup()`一起使用

您可以直接访问任何getter作为store的属性（与state属性完全一样）：

```js
export default {
  setup() {
    const store = useStore()

    store.counter = 3
    store.doubleCount // 6
  },
}
```

### 2.3.5使用选项 API

对于以下示例，您可以假设已创建以下store：

```js
// ./src/stores/counterStore.js

import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCounter() {
      return this.counter * 2
    }
  }
})
```

1. 在`setup()`中使用

虽然 Composition API 并不适合所有人，但`setup()`钩子可以使在 Options API 中使用 Pinia 变得更容易。不需要额外的map辅助功能！

```js
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2
    },
  },
}
```

2. 在`setup()`外部使用

使用`mapState()`函数来映射 getter：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内部的 this.doubleCounter 
    // 与从 store.doubleCounter 中读取一样
    ...mapState(useCounterStore, ['doubleCount'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // 你也可以写一个函数以访问 store
      double: store => store.doubleCount,
    }),
  },
}
```

## 2.4Actions

actions相当于组件中的方法。它们可以使用`actions`in 属性进行定义，`defineStore()`并且**非常适合定义业务逻辑**：

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```

像getter一样，actions通过**完全输入（和自动完成✨）支持**访问整个store实例。**与它们不同的是，它可以是异步**的，您可以在它们内部进行任何 API 调用甚至其他操作！这是一个使用[Mande](https://github.com/posva/mande)的示例。请注意，您使用的库并不重要，只要您获得，您甚至可以使用本机函数（仅限浏览器）：

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})
```

你也可以完全自由地设置你想要的任何参数并返回任何东西。调用actions时，一切都会自动推断！

actions像方法一样被调用：

```js
export default defineComponent({
  setup() {
    const main = useMainStore()
    // 作为 store 的方法来调用 action
    main.randomizeCounter()

    return {}
  },
})
```

### 2.4.1访问其他store的actions

要使用另一个store，您可以直接在*action*内部使用它：

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

### 2.4.2与`setup()`一起使用

您可以直接调用任何操作作为 store 的方法：

```js
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter()
  },
}
```

### 2.4.3使用选项 API

对于以下示例，您可以假设已创建以下store：

```js
// ./src/stores/counterStore.js

import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
```

1. 在`setup()`中使用

虽然 Composition API 并不适合所有人，但`setup()`钩子可以使在 Options API 中使用 Pinia 变得更容易。不需要额外的map 辅助功能！

```js
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
}
```

2. 在`setup()`外部使用

如果您根本不想使用 Composition API，可以使用`mapActions()`帮助器将操作属性映射为组件中的方法：

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // 组件内部允许访问 this.increment() 
    // 就像从 store.increment() 调用一样
    ...mapActions(useCounterStore, ['increment'])
    // 与上面一样但是注册其为 this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```

### 2.4.4订阅actions

可以用观察actions及其结果`store.$onAction()`。传递给它的回调在操作本身之前执行。`after`处理承诺并允许您在操作解决后执行功能。以类似的方式，`onError`允许您在操作抛出或拒绝时执行函数。这些对于在运行时跟踪错误很有用，类似于[Vue 文档中的这个技巧](https://v3.vuejs.org/guide/tooling/deployment.html#tracking-runtime-errors)。

这是一个在运行操作之前和它们解决/拒绝之后记录的示例。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // 动作（action）名
    store, //存储实（store）例, 与 `someStore` 一样
    args, // 传入该动作的一组参数
    after, // 当 action 返回或者决定（resolves）后的钩子
    onError, // 当操作抛出或拒绝（rejects）时的钩子
  }) => {
    // 此特定操作调用的共享变量
    const startTime = Date.now()
    // 这将在执行`store action`之前触发
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    //这将在`action` 成功（succeeds） 且完全运行后触发
    // it waits for any returned promised
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 这将在`action`抛出错误或者返回一个拒绝的（rejects）`Promise`是触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动移除监听器
unsubscribe()
```

默认情况下，*actions订阅*绑定到添加它们的组件（如果商店位于组件的 内部`setup()`）。意思是，当组件被卸载时，它们将被自动删除。如果要在卸载组件后保留它们，请`true`作为第二个参数传递以将*action订阅*与当前组件*分离：*

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$onAction(callback, true)

    // ...
  },
}
```

## 2.5Plugins

由于低级 API，Pania 商店可以完全扩展。以下是您可以执行的操作列表：

- 向存储（store）添加新属性
- 定义存储时添加新选项
- 向存储添加新方法
- 包装现有方法
- 更改甚至取消操作
- [实现像本地存储](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)这样的副作用
- **仅适用**于特定存储

插件将添加到`pinia 实例`中。最简单的示例是通过返回对象向所有存储添加静态属性：`pinia.use()`

```js
import { createPinia } from 'pinia'

// 给每个安装该插件后创建的 存储（store） 添加一个命名为 `secret` 的属性
// 这可能在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将插件交给 pinia
pinia.use(SecretPiniaPlugin)

// 在另一个文件中
const store = useStore()
store.secret // 'the cake is a lie'
```

这对于添加全局对象（如路由器、模式或 toast 管理器）很有用。

### 2.5.1介紹

Pinia 插件是一个 **函数** ，options 返回要添加到存储（store）中的属性。它需要一个 options 参数，一个*上下文*：

```ts
export function myPiniaPlugin(context) {
  context.pinia   // 使用 `createPinia()` 创建 pinia 
  context.app     // 使用 `createApp()` 创建当前的 app (仅 Vue)
  context.store   // 当前扩展插件的存储
  context.options // 传递给 `defineStore()` 的被定义存储的 options 对象 
  // ...
}
```

然后，此函数传递`pinia.use()`的结果给 `pinia` ：

```ts
pinia.use(myPiniaPlugin)
```

插件只适用于**`pinia`传递到应用程序后创建的** 存储（store）中，否则它们将不会被应用。

### 2.5.2存储（store）拓展

您可以通过在插件中返回属性的对象来向每个存储添加属性：

```ts
pinia.use(() => ({ hello: 'world' }))
```

您也可以直接在 `store`上设置属性，**但如果可能，请使用返回的版本，以便 devtools 可以自动地跟踪它们**：

```ts
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

插件返回的任何属性都会被 devtools 自动跟踪，因此为了在 devtools 中可见，请确保**仅在要在 devtools 中**调试它时才将其添加到 dev 模式下：`hello``store._customProperties`

```ts
// 从上面的例子
pinia.use(({ store }) => {
  store.hello = 'world'
  // 确保你的 bundler 能处理它。 默认情况下，webpack 和 vite 应该这样做
  if (process.env.NODE_ENV === 'development') {
    // 添加你在存储（store）中设置的任何键（key）
    store._customProperties.add('hello')
  }
})
```

注意每个存储（store）都使用了[`reactive`](https://v3.vuejs.org/api/basic-reactivity.html#reactive) 进行包装，自动地包装任意`Ref (, , ...)`，包括了：`ref()` `computed()`。

```ts
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // 每个 store 都有自己的 `hello` 属性
  store.hello = ref('secret')
  // 它会自动解包装
  store.hello // 'secret'

  // 所有的 stores 共享值 `shared` 属性
  store.shared = sharedRef
  store.shared // 'shared'
})
```

这就是您可以访问所有计算属性的原因，而无需访问它们，以及为什么它们是响应式的`.value`。

#### 2.5.2.1添加新状态

如果要向存储添加新的状态属性或要在水化期间使用的属性，**则必须在两个位置添加它**：

- 因为在`store`中，所以你可以访问它`store.myState`
- 在`store.$state`上，因此它可以在devtools中使用，并在**SSR期间序列化**。

请注意，这允许您共享或属性：`ref``computed`

```ts
const globalSecret = ref('secret')
pinia.use(({ store }) => {
  // `secret` 被共享到所有的 stores 中
  store.$state.secret = globalSecret
  store.secret = globalSecret
  // 它会自动解包
  store.secret // 'secret'

  const hasError = ref(false)
  store.$state.hasError = hasError
  // this one must always be set
  store.hasError = toRef(store.$state, 'hasError')

  // in this case it's better not to return `hasError` since it
  // will be displayed in the `state` section in the devtools
  // anyway and if we return it, devtools will display it twice.
})
```

> **警告**
>
> 如果您使用的是**Vue 2**，Pinia 会受到与 Vue[相同的 `reactivity` 警告](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)。在创建新的状态属性时，您需要使用 from 和：`set` `@vue/composition-api` `secret` `hasError`
>
> ```ts
> import { set } from '@vue/composition-api'
> pinia.use(({ store }) => {
>  if (!store.$state.hasOwnProperty('hello')) {
>    const secretRef = ref('secret')
>    // If the data is meant to be used during SSR, you should
>    // set it on the `$state` property so it is serialized and
>    // picked up during hydration
>    set(store.$state, 'secret', secretRef)
>    // set it directly on the store too so you can access it
>    // both ways: `store.$state.secret` / `store.secret`
>    set(store, 'secret', secretRef)
>    store.secret // 'secret'
>  }
> })
> ```

### 2.5.3添加新的外部属性

在添加外部属性、来自其他库的类实例或只是非响应性内容时，在将对象传递到 pinia 之前，应先将其包装起来。下面是将路由器添加到每个存储（store）的示例：`markRaw()`

```ts
import { markRaw } from 'vue'
// 基于你的 router 在哪进行调整
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

### 2.5.4在插件内部调用`$subscribe`

您也可以在插件中使用[store.KaTeX parse error: Expected 'EOF', got '#' at position 60: …epts/state.html#̲subscribing-to-…onAction：](https://pinia.vuejs.org/core-concepts/actions.html#subscribing-to-actions)

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // react to store changes
  })
  store.$onAction(() => {
    // react to store actions
  })
})
```

### 2.5.5[添加新 options](https://blog.csdn.net/qq_28550263/article/details/120721160#2-5-5)

在定义存储时可以创建新 options，以便以后从插件中使用它们。例如，您可以创建一个 `debounce` 选项来取消对任何 动作(action) 的debounce：

```ts
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // 这在接下来将被一个插件读取
  debounce: {
    // debounce the action searchContacts by 300ms
    searchContacts: 300,
  },
})
```

然后，插件可以读取该选项以包装动作（action）并替换原始动作：

```ts
// 使用任何 debounce 库
import debounce from 'lodash/debunce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 我们正在用新的 动作（actions） 取代旧的动作
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

请注意，使用安装程序语法时，自定义选项将作为`第 3 个`参数传递：

```ts
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // 这将接下来被一个插件读取
    debounce: {
      // debounce the action searchContacts by 300ms
      searchContacts: 300,
    },
  }
)
```

### 2.5.6TypeScript

上面显示的所有内容都可以通过类型支持来完成，因此您永远不需要使用 `any` 或 `@ts-ignore`。

#### 2.5.6.1 插件（ plugins）类型注释

Pinia插件可以按如下方式注释类型：

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

#### 2.5.6.2 存储属性（store properties）类型注释

向存储区添加新属性时，还应扩展 `PiniaCustomProperties` 接口。

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 通过使用一个 setter 我们能允许 strings and refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // 您也可以定义更简单的值
    simpleNumber: number
  }
}
```

然后可以安全地编写和读取它：

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.number = Math.random()
  // @ts-expect-error: we haven't typed this correctly
  store.number = ref(Math.random())
})
PiniaCustomProperties`是允许您引用存储的属性的泛型类型。想象一下下面的示例，其中我们复制初始选项为（这仅适用于选项存储）：`$options
pinia.use(({ options }) => ({ $options: options }))
```

我们可以通过使用以下4种泛型类型来正确注释它的类型：`PiniaCustomProperties`

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

> **技巧**
>
> 在泛型中扩展类型时，它们的命名必须与源代码中的完全一样。`Id` 不能命名为 `id` 或 `I` ，`S` 不能命名为 `State`。以下是每个字母的含义:
>
> - `S`: `State`
> - `G`: `Getters`
> - `A`: `Actions`
> - `SS`: `Setup Store` / `Store`

#### 2.5.6.3 新状态（state）类型注释

当添加新的状态属性（`store` 和 `store.$state` ）时，您需要添加类型到`PiniaCustomStateProperties`来代替。与 `PiniaCustomProperties` 不同的是，它只接收 `State` 泛型：

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

#### 2.5.6.4 新 options 类型注释

在为 `defineStore()` 创建新 `option` 时，您应该扩展`DefineStoreOptionsBase`. 与 `PiniaCustomProperties` 不同的是，它只公开了两个泛型：`State` 和 `Store` 类型，以允许您限制可以定义的内容。例如，您可以使用动作（action）的名称：

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // 允许为 ms 的任意动作（actions）定义一个数
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

> 提示
>
> 还有一个类型用于从 Store 类型中提取`getter`。
> 您还可以 **仅** 通过分别扩展类型`DefineStoreOptions` 和 `DefineSetupStoreOptions` 来扩展`setup stores` 或 `option stores` 。

### 2.5.7 Nuxt.js

当[使用pinia与Nuxt一起](https://pinia.vuejs.org/ssr/nuxt.html)使用时，您必须首先创建一个[Nuxt插件](https://nuxtjs.org/docs/2.x/directory-structure/plugins)。这将为您提供对实例的访问权限：`pinia`

```ts
// plugins/myPiniaPlugin.js
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // 相应到存储（store）的改变
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ pinia }) {
  pinia.use(MyPiniaPlugin);
}
export default myPlugin
```

请注意，上面的示例使用了 `TypeScript`。如果您使用的是文件，则必须删除类型注释及其导入（import）。`PiniaPluginContext` `Plugin` `.js`



2.6在组件之外使用存储