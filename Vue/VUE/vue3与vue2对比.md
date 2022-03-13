# 1.v-for 中的 Ref 数组

> 非兼容

在 Vue 2 中，在 `v-for` 中使用的 `ref` attribute 会用 ref 数组填充相应的 `$refs` property。当存在嵌套的 `v-for` 时，这种行为会变得不明确且效率低下。

在 Vue 3 中，此类用法将不再自动创建 `$ref` 数组。要从单个绑定获取多个 ref，请将 `ref` 绑定到一个更灵活的函数上 (这是一个新特性)：

```html
<div v-for="item in list" :ref="setItemRef"></div>
```

结合选项式 API:

```js
export default {
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}
```

结合组合式 API:

```js
import { onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let itemRefs = []
    const setItemRef = el => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      setItemRef
    }
  }
}
```

注意：

- `itemRefs` 不必是数组：它也可以是一个对象，其 ref 可以通过迭代的 key 被设置。
- 如有需要，`itemRefs` 也可以是响应式的，且可以被侦听。

# 2.异步组件

> 新增

- 新的 `defineAsyncComponent` 助手方法，用于显式地定义异步组件
- `component` 选项被重命名为 `loader`
- Loader 函数本身不再接收 `resolve` 和 `reject` 参数，且必须返回一个 Promise

以前，异步组件是通过将组件定义为返回 Promise 的函数来创建的，例如：

```js
const asyncModal = () => import('./Modal.vue')
```

或者，对于带有选项的更高阶的组件语法：

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

现在，在 Vue 3 中，由于函数式组件被定义为纯函数，因此异步组件需要通过将其包裹在新的 `defineAsyncComponent` 助手方法中来显式地定义：

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 不带选项的异步组件
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// 带选项的异步组件
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

> 注意
>
> Vue Router 支持一个类似的机制来异步加载路由组件，也就是俗称的*懒加载*。尽管类似，但是这个功能和 Vue 所支持的异步组件是不同的。当用 Vue Router 配置路由组件时，你**不**应该使用 `defineAsyncComponent`。

对 2.x 所做的另一个更改是，`component` 选项现在被重命名为 `loader`，以明确组件定义不能直接被提供。

```js
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

此外，与 2.x 不同，loader 函数不再接收 `resolve` 和 `reject` 参数，且必须始终返回 Promise。

```js
// 2.x 版本
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x 版本
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

# 3.attribute 强制行为

> 非兼容

# 4.`$attrs`包含`class`&`style`

> 非兼容

`$attrs` 现在包含了*所有*传递给组件的 attribute，包括 `class` 和 `style`。

## 2.x 行为

Vue 2 的虚拟 DOM 实现对 `class` 和 `style` attribute 有一些特殊处理。因此，与其它所有 attribute 不一样，它们*没有*被包含在 `$attrs` 中。

上述行为在使用 `inheritAttrs: false` 时会产生副作用：

- `$attrs` 中的 attribute 将不再被自动添加到根元素中，而是由开发者决定在哪添加。
- 但是 `class` 和 `style` 不属于 `$attrs`，它们仍然会被应用到组件的根元素中：

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

像这样使用时：

```html
<my-component id="my-id" class="my-class"></my-component>
```

……将生成以下 HTML：

```html
<label class="my-class">
  <input type="text" id="my-id" />
</label>
```

## 3.x 行为

`$attrs` 包含了*所有的* attribute，这使得把它们全部应用到另一个元素上变得更加容易了。现在上面的示例将生成以下 HTML：

```html
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

# 5.$children

> 移除

`$children` 实例 property 已从 Vue 3.0 中移除，不再支持。

## 2.x 语法

在 2.x 中，开发者可以使用 `this.$children` 访问当前实例的直接子组件：

```vue
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Change logo</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## [#](https://v3.cn.vuejs.org/guide/migration/children.html#_3-x-更新)3.x 更新

在 3.x 中，`$children` property 已被移除，且不再支持。如果你需要访问子组件实例，我们建议使用 [$refs](https://v3.cn.vuejs.org/guide/component-template-refs.html#模板引用)。

# 6.自定义指令



> 非兼容

指令的钩子函数已经被重命名，以更好地与组件的生命周期保持一致。

额外地，`expression` 字符串不再作为 `binding` 对象的一部分被传入。

## 2.x 语法

在 Vue 2 中，自定义指令通过使用下列钩子来创建，以对齐元素的生命周期，它们都是可选的：

- **bind** - 指令绑定到元素后调用。只调用一次。
- **inserted** - 元素插入父 DOM 后调用。
- **update** - 当元素更新，但子元素尚未更新时，将调用此钩子。
- **componentUpdated** - 一旦组件和子级被更新，就会调用这个钩子。
- **unbind** - 一旦指令被移除，就会调用这个钩子。也只调用一次。

下面是一个例子：

```html
<p v-highlight="'yellow'">以亮黄色高亮显示此文本</p>
```



```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

此处，在这个元素的初始设置中，通过给指令传递一个值来绑定样式，该值可以在应用中任意更改。

## 3.x 语法

然而，在 Vue 3 中，我们为自定义指令创建了一个更具凝聚力的 API。正如你所看到的，它们与我们的组件生命周期方法有很大的不同，即使钩子的目标事件十分相似。我们现在把它们统一起来了：

- **created** - 新增！在元素的 attribute 或事件监听器被应用之前调用。
- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
- update → 移除！该钩子与 `updated` 有太多相似之处，因此它是多余的。请改用 `updated`。
- componentUpdated → **updated**
- **beforeUnmount**：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
- unbind -> **unmounted**

最终的 API 如下：

```js
const MyDirective = {
  created(el, binding, vnode, prevVnode) {}, // 新增
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新增
  updated() {},
  beforeUnmount() {}, // 新增
  unmounted() {}
}
```

因此，API 可以这样使用，与前面的示例相同：

```html
<p v-highlight="'yellow'">以亮黄色高亮显示此文本</p>
```



```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

既然现在自定义指令的生命周期钩子与组件本身保持一致，那么它们就更容易被推理和记住了！

### 边界情况：访问组件实例

通常来说，建议在组件实例中保持所使用的指令的独立性。从自定义指令中访问组件实例，通常意味着该指令本身应该是一个组件。然而，在某些情况下这种用法是有意义的。

在 Vue 2 中，必须通过 `vnode` 参数访问组件实例：

```js
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

在 Vue 3 中，实例现在是 `binding` 参数的一部分：

```js
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

> 注意：有了[片段](https://v3.cn.vuejs.org/guide/migration/fragments.html#概览)的支持，组件可能会有多个根节点。当被应用于多根组件时，自定义指令将被忽略，并将抛出警告。

# 7.与自定义元素的互操作性

> 非兼容

- **非兼容**：检测并确定哪些标签应该被视为自定义元素的过程，现在会在模板编译期间执行，且应该通过编译器选项而不是运行时配置来配置。
- **非兼容**：特殊的 `is` attribute 的使用被严格限制在保留的 `<component>` 标签中。
- **新增**：为了支持 2.x 在原生元素上使用 `is` 的用例来处理原生 HTML 解析限制，我们用 `vue:` 前缀来解析一个 Vue 组件。

## 7.1自主定制元素

如果我们想要在 Vue 外部定义添加自定义元素 (例如使用 Web Components API)，则需要“指示”Vue 将其视为自定义元素。让我们以下面的模板为例。

```html
<plastic-button></plastic-button>
```

### 2.x 语法

在 Vue 2.x 中，通过 `Vue.config.ignoredElements` 将标签配置为自定义元素：

```js
// 这将使 Vue 忽略在其外部定义的自定义元素
// (例如：使用 Web Components API)

Vue.config.ignoredElements = ['plastic-button']
```

### 3.x 语法

**在 Vue 3.0 中，此检查在模板编译期间执行**。要指示编译器将 `<plastic-button>` 视为自定义元素：

- 如果使用构建步骤：给 Vue 模板编译器传入 `isCustomElement` 选项。如果使用了 `vue-loader`，则应通过 `vue-loader` 的 `compilerOptions` 选项传递：

```js
// webpack 中的配置
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader',
    options: {
      compilerOptions: {
        isCustomElement: tag => tag === 'plastic-button'
      }
    }
  }
  // ...
]
```

- 如果使用动态模板编译，请通过 `app.config.compilerOptions.isCustomElement` 传递：

```js
const app = Vue.createApp({})
app.config.compilerOptions.isCustomElement = tag => tag === 'plastic-button'
```

需要注意的是，运行时配置只会影响运行时的模板编译——它不会影响预编译的模板。

## 7.2定制内置元素

自定义元素规范提供了一种将自定义元素作为[自定义内置元素](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)的方法，方法是向内置元素添加 `is` attribute：

```html
<button is="plastic-button">点击我!</button>
```

在原生 attribute 于浏览器中普遍可用之前，Vue 对 `is` 这个特殊 attribute 的使用就已经在模拟其行为。但是，在 2.x 中，它将被解释为渲染一个名为 `plastic-button` 的 Vue 组件，这将阻碍上面所提到的自定义内置元素的原生用法。

在 3.0 中，我们将 Vue 对 `is` attribute 的特殊处理限制在了 `<component>` 标签中。

- 在保留的 `<component>` 标签上使用时，它的行为将与 2.x 中完全相同；

- 在普通组件上使用时，它的行为将类似于普通 attribute：

  ```html
  <foo is="bar" />
  ```

  - 2.x 的行为：渲染 `bar` 组件。
  - 3.x 的行为：渲染 `foo` 组件，并将 `is` attribute 传递给它。

- 在普通元素上使用时，它将作为 `is` attribute 传递给 `createElement` 调用，并作为原生 attribute 渲染。这支持了自定义内置元素的用法。

  ```html
  <button is="plastic-button">点击我！</button>
  ```

  - 2.x 的行为：渲染 `plastic-button` 组件。

  - 3.x 的行为：通过调用以下函数渲染原生的 button

    ```js
    document.createElement('button', { is: 'plastic-button' })
    ```

## 7.3使用 `vue:` 前缀来解决 DOM 内模板解析问题

> 提示：本节仅影响直接在页面的 HTML 中写入 Vue 模板的情况。 在 DOM 模板中使用时，模板受原生 HTML 解析规则的约束。一些 HTML 元素，例如 `<ul>`、`<ol>`、`<table>` 和 `<select>` 对它们内部可以出现的元素有限制，以及一些像 `<li>`、`<tr>`、和 `<option>` 只能出现在特定的其他元素中。

### 2.x 语法

在 Vue 2 中，我们建议在原生标签上使用 `is` attribute 来绕过这些限制：

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### 3.x 语法

随着 `is` 的行为发生变化，现在将元素解析为 Vue 组件需要添加一个 `vue:` 前缀：

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

# 8.Data 选项

- **非兼容**：组件选项 `data` 的声明不再接收纯 JavaScript `object`，而是接收一个 `function`。
- **非兼容**：当合并来自 mixin 或 extend 的多个 `data` 返回值时，合并操作现在是浅层次的而非深层次的 (只合并根级属性)。

## 8.1 2.x 语法

在 2.x 中，开发者可以通过 `object` 或者是 `function` 定义 `data` 选项。

例如：

```html
<!-- Object 声明 -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- Function 声明 -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

虽然这种做法对于具有共享状态的根实例提供了一些便利，但是由于其只可能存在于根实例上，因此变得混乱。

## 8.2 3.x 更新

在 3.x 中，`data` 选项已标准化为只接受返回 `object` 的 `function`。

使用上面的示例，代码只可能有一种实现：

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## 8.3 Mixin 合并行为变更

此外，当来自组件的 `data()` 及其 mixin 或 extends 基类被合并时，合并操作现在将被*浅层次*地执行：

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

在 Vue 2.x 中，生成的 `$data` 是：

```json
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
```

在 3.0 中，其结果将会是：

```json
{
  "user": {
    "id": 2
  }
}
```

# 9.`emits`选项

Vue 3 现在提供一个 `emits` 选项，和现有的 `props` 选项类似。这个选项可以用来定义一个组件可以向其父组件触发的事件。

## 9.1 2.x 的行为

在 Vue 2 中，你可以定义一个组件可接收的 prop，但是你无法声明它可以触发哪些事件：

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```

## 9.2 3.x 的行为

和 prop 类似，现在可以通过 `emits` 选项来定义组件可触发的事件：

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

该选项也可以接收一个对象，该对象允许开发者定义传入事件参数的验证器，和 `props` 定义里的验证器类似。

> 强烈建议使用 `emits` 记录每个组件所触发的所有事件。
>
> 这尤为重要，因为我们[移除了 `.native` 修饰符](https://v3.cn.vuejs.org/guide/migration/v-on-native-modifier-removed.html)。任何未在 `emits` 中声明的事件监听器都会被算入组件的 `$attrs`，并将默认绑定到组件的根节点上。

### 示例

对于向其父组件透传原生事件的组件来说，这会导致有两个事件被触发：

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // 不声明事件
}
</script>
```

当一个父级组件拥有 `click` 事件的监听器时：

```html
<my-button v-on:click="handleClick"></my-button>
```

该事件现在会被触发*两次*:

- 一次来自 `$emit()`。
- 另一次来自应用在根元素上的原生事件监听器。

现在你有两个选项：

1. 正确地声明 `click` 事件。当你真的在 `<my-button>` 的事件处理器上加入了一些逻辑时，这会很有用。
2. 移除透传的事件，因为现在父组件可以很容易地监听原生事件，而不需要添加 `.native`。适用于你只想透传这个事件。

# 10.事件 API

`$on`，`$off` 和 `$once` 实例方法已被移除，组件实例不再实现事件触发接口。

## 2.x 语法

在 2.x 中，Vue 实例可用于触发由事件触发器 API 通过指令式方式添加的处理函数 (`$on`，`$off` 和 `$once`)。这可以用于创建一个*事件总线*，以创建在整个应用中可用的全局事件监听器：

```js
// eventBus.js

const eventBus = new Vue()

export default eventBus
```



```js
// ChildComponent.vue
import eventBus from './eventBus'

export default {
  mounted() {
    // 添加 eventBus 监听器
    eventBus.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // 移除 eventBus 监听器
    eventBus.$off('custom-event')
  }
}
```

```js
// ParentComponent.vue
import eventBus from './eventBus'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventBus.$emit('custom-event') // 当 ChildComponent 已被挂载时，控制台中将显示一条消息
    }
  }
}
```

## 3.x 更新

我们从实例中完全移除了 `$on`、`$off` 和 `$once` 方法。`$emit` 仍然包含于现有的 API 中，因为它用于触发由父组件声明式添加的事件处理函数。



# 11.过滤器

从 Vue 3.0 开始，过滤器已移除，且不再支持。

## 2.x 语法

在 2.x 中，开发者可以使用过滤器来处理通用文本格式。

例如：

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>
```

虽然这看起来很方便，但它需要一个自定义语法，打破了大括号内的表达式“只是 JavaScript”的假设，这不仅有学习成本，而且有实现成本。

## 3.x 更新

在 3.x 中，过滤器已移除，且不再支持。取而代之的是，我们建议用方法调用或计算属性来替换它们。

以上面的案例为例，以下是一种实现方式。

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountInUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    computed: {
      accountInUSD() {
        return '$' + this.accountBalance
      }
    }
  }
</script>
```

### 全局过滤器

如果在应用中全局注册了过滤器，那么在每个组件中用计算属性或方法调用来替换它可能就没那么方便了。

取而代之的是，你可以通过[全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties)以让它能够被所有组件使用到：

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  }
}
```

然后，可以通过这个 `$filters` 对象修正所有的模板，就像这样：

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.currencyUSD(accountBalance) }}</p>
</template>
```

注意，这种方式只适用于方法，而不适用于计算属性，因为后者只有在单个组件的上下文中定义时才有意义。

# 12.片段

Vue 3 现在正式支持了多根节点的组件，也就是片段！

## 2.x 语法

在 2.x 中，由于不支持多根节点组件，当其被开发者意外地创建时会发出警告。结果是，为了修复这个问题，许多组件被包裹在了一个 `<div>` 中。

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## 3.x 语法

在 3.x 中，组件可以包含多个根节点！但是，这要求开发者显式定义 attribute 应该分布在哪里。

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

# 13.函数式组件

对变化的总体概述：

- 在 3.x 中，2.x 带来的函数式组件的性能提升可以忽略不计，因此我们建议只使用有状态的组件
- 函数式组件只能由接收 `props` 和 `context` (即：`slots`、`attrs`、`emit`) 的普通函数创建
- **非兼容**：`functional` attribute 已从单文件组件 (SFC) 的 `<template>` 中移除
- **非兼容**：`{ functional: true }` 选项已从通过函数创建的组件中移除

在 Vue 2 中，函数式组件主要有两个应用场景：

- 作为性能优化，因为它们的初始化速度比有状态组件快得多
- 返回多个根节点

然而，在 Vue 3 中，有状态组件的性能已经提高到它们之间的区别可以忽略不计的程度。此外，有状态组件现在也支持返回多个根节点。

因此，函数式组件剩下的唯一应用场景就是简单组件，比如创建动态标题的组件。否则，建议你像平常一样使用有状态组件。

## 2.x 语法

使用 `<dynamic-heading>` 组件，负责提供适当的标题 (即：`h1`、`h2`、`h3` 等等)，在 2.x 中，这可以通过单文件组件编写：

```js
// Vue 2 函数式组件示例
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

或者，对于喜欢在单文件组件中使用 `<template>` 的用户：

```vue
<!-- Vue 2 结合 <template> 的函数式组件示例 -->
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## 3.x 语法

### 通过函数创建组件

现在，在 Vue 3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 `{ functional: true }` 组件选项。

它们将接收两个参数：`props` 和 `context`。`context` 参数是一个对象，包含组件的 `attrs`、`slots` 和 `emit` property。

此外，`h` 现在是全局导入的，而不是在 `render` 函数中隐式提供。

以前面提到的 `<dynamic-heading>` 组件为例，下面是它现在的样子。

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### 单文件组件 (SFC)

在 3.x 中，有状态组件和函数式组件之间的性能差异已经大大减少，并且在大多数用例中是微不足道的。因此，在单文件组件上使用 `functional` 的开发者的迁移路径是删除该 attribute，并将 `props` 的所有引用重命名为 `$props`，以及将 `attrs` 重命名为 `$attrs`。

以之前的 `<dynamic-heading>` 为例，下面是它现在的样子。

 



 

 











```vue
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

1
2
3
4
5
6
7
8
9
10
11
12

主要的区别在于：

1. 从 `<template>` 中移除 `functional` attribute
2. `listeners` 现在作为 `$attrs` 的一部分传递，可以将其删除

## 