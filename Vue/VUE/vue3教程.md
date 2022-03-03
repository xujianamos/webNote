# 1.应用 & 组件实例

## 1.1创建一个应用实例

每个 Vue 应用都是通过用 `createApp` 函数创建一个新的**应用实例**开始的：

```js
const app = Vue.createApp({
  /* 选项 */
})
```

该应用实例是用来在应用中注册“全局”组件的。我们会在后面的指南中详细讨论，简单的例子：

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

应用实例暴露的大多数方法都会返回该同一实例，允许链式：

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

## 1.2根组件

传递给 `createApp` 的选项用于配置**根组件**。当我们**挂载**应用时，该组件被用作渲染的起点。

一个应用需要被挂载到一个 DOM 元素中。例如，如果你想把一个 Vue 应用挂载到 `<div id="app"></div>`，应该传入 `#app`：

```js
const RootComponent = { 
  /* 选项 */ 
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

与大多数应用方法不同的是，`mount` 不返回应用本身。相反，它返回的是根组件实例。

## 1.3组件实例 property

在前面的指南中，我们认识了 `data` property。在 `data` 中定义的 property 是通过组件实例暴露的：

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

还有各种其他的组件选项，可以将用户定义的 property 添加到组件实例中，例如 `methods`，`props`，`computed`，`inject` 和 `setup`。我们将在后面的指南中深入讨论它们。组件实例的所有 property，无论如何定义，都可以在组件的模板中访问。

Vue 还通过组件实例暴露了一些内置 property，如 `$attrs` 和 `$emit`。这些 property 都有一个 `$` 前缀，以避免与用户定义的 property 名冲突。

## 1.4生命周期钩子

每个组件在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 [created](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#created) 钩子可以用来在一个实例被创建之后执行代码：

```js
Vue.createApp({
  data() {
    return { count: 1}
  },
  created() {
    // `this` 指向 vm 实例
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```

也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 [mounted](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#mounted)、[updated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#updated) 和 [unmounted](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#unmounted)。生命周期钩子的 `this` 上下文指向调用它的当前活动实例。

# 2.模板语法

## 2.1插值

### 2.1.1文本

数据绑定最常见的形式就是使用“Mustache” (双大括号) 语法的文本插值：

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应组件实例中 `msg` property 的值。无论何时，绑定的组件实例上 `msg` property 发生了改变，插值处的内容都会更新。

通过使用 [v-once 指令](https://v3.cn.vuejs.org/api/directives.html#v-once)，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

### 2.1.2原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用[`v-html` 指令](https://v3.cn.vuejs.org/api/directives.html#v-html)：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

这个 `span` 的内容将会被替换成为 `rawHtml` property 的值，直接作为 HTML——会忽略解析 property 值中的数据绑定。注意，你不能使用 `v-html` 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

### 2.1.3Attribute

Mustache 语法不能在 HTML attribute 中使用，然而，可以使用 [`v-bind` 指令](https://v3.cn.vuejs.org/api/directives.html#v-bind)：

```html
<div v-bind:id="dynamicId"></div>
```

如果绑定的值是 `null` 或 `undefined`，那么该 attribute 将不会被包含在渲染的元素上。

对于布尔 attribute (它们只要存在就意味着值为 `true`)，`v-bind` 工作起来略有不同，在这个例子中：

```html
<button v-bind:disabled="isButtonDisabled">按钮</button>
```

如果 `isButtonDisabled` 的值是 truthy[[1\]](https://v3.cn.vuejs.org/guide/template-syntax.html#footnote-1)，那么 `disabled` attribute 将被包含在内。如果该值是一个空字符串，它也会被包括在内，与 `<button disabled="">` 保持一致。对于其他 falsy[[2\]](https://v3.cn.vuejs.org/guide/template-syntax.html#footnote-2) 的值，该 attribute 将被省略。

### 2.1.4使用 JavaScript 表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在当前活动实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。

```html
<!--  这是语句，不是表达式：-->
{{ var a = 1 }}

<!-- 流程控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

## 2.2指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是**单个 JavaScript 表达式** (`v-for` 和 `v-on` 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。回顾我们在介绍中看到的例子：

```html
<p v-if="seen">现在你看到我了</p>
```

这里，`v-if` 指令将根据表达式 `seen` 的值的真假来插入/移除 `<p>` 元素。

### 2.2.1参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML attribute：

```html
<a v-bind:href="url"> ... </a>
```

在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` attribute 与表达式 `url` 的值绑定。

另一个例子是 `v-on` 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething"> ... </a>
```

在这里参数是监听的事件名。我们也会更详细地讨论事件处理。

### 2.2.2动态参数

也可以在指令参数中使用 JavaScript 表达式，方法是用方括号括起来：

```html
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的组件实例有一个 data property `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`

### 2.2.3修饰符

修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

在接下来对 [`v-on`](https://v3.cn.vuejs.org/guide/events.html#事件修饰符) 和 [`v-for`](https://v3.cn.vuejs.org/guide/forms.html#修饰符) 等功能的探索中，你会看到修饰符的其它例子。

## 3.缩写

`v-` 前缀作为一种视觉提示，用来识别模板中 Vue 特定的 attribute。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，v- 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue 管理所有模板的单页面应用程序 [(SPA - single page application)](https://en.wikipedia.org/wiki/Single-page_application) 时，`v-` 前缀也变得没那么重要了。因此，Vue 为 `v-bind` 和 `v-on` 这两个最常用的指令，提供了特定简写：

### 3.1`v-bind` 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url"> ... </a>

<!-- 缩写 -->
<a :href="url"> ... </a>

<!-- 动态参数的缩写 -->
<a :[key]="url"> ... </a>
```

### 3.2`v-on` 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething"> ... </a>

<!-- 缩写 -->
<a @click="doSomething"> ... </a>

<!-- 动态参数的缩写 -->
<a @[event]="doSomething"> ... </a>
```

它们看起来可能与普通的 HTML 略有不同，但 `:` 与 `@` 对于 attribute 名来说都是合法字符，在所有支持 Vue 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。

> 从下一页开始，我们将在示例中使用缩写，因为这是 Vue 开发者最常用的用法。

### 3.3注意事项

#### 3.3.1对动态参数值约定

动态参数预期会求出一个字符串，`null` 例外。这个特殊的 `null` 值可以用于显式地移除绑定。任何其它非字符串类型的值都将会触发一个警告。

#### 3.3.2对动态参数表达式约定

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用[计算属性](https://v3.cn.vuejs.org/guide/computed.html)替代这种复杂表达式。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

# 3.Data Property

组件的 `data` 选项是一个函数。Vue 会在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 `$data` 的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也会直接通过组件实例暴露出来：

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4

// 修改 vm.count 的值也会更新 $data.count
vm.count = 5
console.log(vm.$data.count) // => 5

// 反之亦然
vm.$data.count = 6
console.log(vm.count) // => 6
```

这些实例 property 仅在实例首次创建时被添加，所以你需要确保它们都在 `data` 函数返回的对象中。必要时，要对尚未提供所需值的 property 使用 `null`、`undefined` 或其他占位的值。

直接将不包含在 `data` 中的新 property 添加到组件实例是可行的。但由于该 property 不在背后的响应式 `$data` 对象内，所以 [Vue 的响应性系统](https://v3.cn.vuejs.org/guide/reactivity.html)不会自动跟踪它。

Vue 使用 `$` 前缀通过组件实例暴露自己的内置 API。它还为内部 property 保留 `_` 前缀。你应该避免使用这两个字符开头的顶级 `data` property 名称。

## 3.1方法

我们用 `methods` 选项向组件实例添加方法，它应该是一个包含所需方法的对象：

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` 指向该组件实例
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

Vue 自动为 `methods` 绑定 `this`，以便于它始终指向组件实例。这将确保方法在用作事件监听或回调时保持正确的 `this` 指向。在定义 `methods` 时应避免使用箭头函数，因为这会阻止 Vue 绑定恰当的 `this` 指向。

这些 `methods` 和组件实例的其它所有 property 一样可以在组件的模板中被访问。在模板中，它们通常被当做事件监听使用：

```html
<button @click="increment">Up vote</button>
```

在上面的例子中，点击 `<button>` 时，会调用 `increment` 方法。

也可以直接从模板中调用方法。就像下一章节即将看到的，通常换做[计算属性](https://v3.cn.vuejs.org/guide/computed.html)会更好。但是，在计算属性不可行的情况下，使用方法可能会很有用。你可以在模板支持 JavaScript 表达式的任何地方调用方法：

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

如果 `toTitleDate` 或 `formatDate` 访问了任何响应式数据，则将其作为渲染依赖项进行跟踪，就像直接在模板中使用过一样。

从模板调用的方法不应该有任何副作用，比如更改数据或触发异步进程。如果你想这么做，应该使用[生命周期钩子](https://v3.cn.vuejs.org/guide/instance.html#生命周期钩子)来替换。

## 3.2防抖和节流

Vue 没有内置支持防抖和节流，但可以使用 [Lodash](https://lodash.com/) 等库来实现。

如果某个组件仅使用一次，可以在 `methods` 中直接应用防抖：

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // 用 Lodash 的防抖函数
      click: _.debounce(function() {
        // ... 响应点击 ...
      }, 500)
    }
  }).mount('#app')
</script>
```

但是，这种方法对于可复用组件有潜在的问题，因为它们都共享相同的防抖函数。为了使组件实例彼此独立，可以在生命周期钩子的 `created` 里添加该防抖函数:

```js
app.component('save-button', {
  created() {
    // 使用 Lodash 实现防抖
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 响应点击 ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```

# 4.计算属性和侦听器

## 4.1计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如，有一个嵌套数组对象：

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
})
```

我们想根据 `author` 是否已经有一些书来显示不同的消息

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
</div>
```

此时，模板不再是简单的和声明性的。你必须先看一下它，然后才能意识到它执行的计算取决于 `author.books`。如果要在模板中多次包含此计算，则问题会变得更糟。

所以，对于任何包含响应式数据的复杂逻辑，你都应该使用**计算属性**。

### 4.1.1基本例子

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向 vm 实例
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}).mount('#computed-basics')
```

这里声明了一个计算属性 `publishedBooksMessage`。

尝试更改应用程序 `data` 中 `books` 数组的值，你将看到 `publishedBooksMessage` 如何相应地更改。

你可以像普通属性一样将数据绑定到模板中的计算属性。Vue 知道 `vm.publishedBookMessage` 依赖于 `vm.author.books`，因此当 `vm.author.books` 发生改变时，所有依赖 `vm.publishedBookMessage` 的绑定也会更新。而且最妙的是我们已经声明的方式创建了这个依赖关系：计算属性的 getter 函数没有副作用，它更易于测试和理解。

### 4.1.2计算属性缓存 vs 方法

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
<p>{{ calculateBooksMessage() }}</p>
```

```js
// 在组件中
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

我们可以将同样的函数定义为一个方法，而不是一个计算属性。从最终结果来说，这两种实现方式确实是完全相同的。然而，不同的是**计算属性将基于它们的响应依赖关系缓存**。计算属性只会在相关响应式依赖发生改变时重新求值。这就意味着只要 `author.books` 还没有发生改变，多次访问 `publishedBookMessage` 时计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将永远不会更新，因为 `Date.now ()` 不是响应式依赖：

```js
computed: {
  now() {
    return Date.now()
  }
}
```

相比之下，每当触发重新渲染时，调用方法将**始终**会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 `list`，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 `list`。如果没有缓存，我们将不可避免的多次执行 `list` 的 getter！如果你不希望有缓存，请用 `method` 来替代。

### 4.1.3计算属性的 Setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
// ...
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

## 4.2侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

例如：

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp({
    data() {
      return {
        question: '',
        answer: 'Questions usually contain a question mark. ;-)'
      }
    },
    watch: {
      // 每当 question 发生变化时，该函数将会执行
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
    methods: {
      getAnswer() {
        this.answer = 'Thinking...'
        axios
          .get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = 'Error! Could not reach the API. ' + error
          })
      }
    }
  }).mount('#watch-example')
</script>
```

在这个示例中，使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，并设置一个执行该操作的条件。这些都是计算属性无法做到的。

除了 watch 选项之外，你还可以使用命令式的 [vm.$watch API](https://v3.cn.vuejs.org/api/instance-methods.html#watch)。

### 4.2.1计算属性 vs 侦听器

Vue 提供了一种更通用的方式来观察和响应当前活动的实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，`watch` 很容易被滥用——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```html
<div id="demo">{{ fullName }}</div>
```



```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  watch: {
    firstName(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
}).mount('#demo')
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}).mount('#demo')
```

# 5.Class 与 Style 绑定

## 5.1绑定 HTML Class

### 5.1.1对象语法

我们可以传给 `:class` (`v-bind:class` 的简写) 一个对象，以动态地切换 class：

```html
<div :class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 class 存在与否将取决于 data property `isActive` 的 [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)。

你可以在对象中传入更多字段来动态切换多个 class。此外，`:class` 指令也可以与普通的 `class` attribute 共存。当有如下模板：

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下 data：

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

渲染的结果为：

```html
<div class="static active"></div>
```

当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，class 列表将变为 `"static active text-danger"`。

绑定的数据对象不必内联定义在模板里：

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://v3.cn.vuejs.org/guide/computed.html)。这是一个常用且强大的模式：

```html
<div :class="classObject"></div>
```



```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 5.1.2数组语法

我们可以把一个数组传给 `:class`，以应用一个 class 列表：

```html
<div :class="[activeClass, errorClass]"></div>
```



```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

渲染的结果为：

```html
<div class="active text-danger"></div>
```

如果你想根据条件切换列表中的 class，可以使用三元表达式：

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

这样写将始终添加 `errorClass`，但是只有在 `isActive` 为 truthy[[1\]](https://v3.cn.vuejs.org/guide/class-and-style.html#footnote-1) 时才添加 `activeClass`。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### 5.1.3在组件上使用

当你在带有单个根元素的自定义组件上使用 `class` attribute 时，这些 class 将被添加到该元素中。此元素上的现有 class 将不会被覆盖。

例如，如果你声明了这个组件：

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

然后在使用它的时候添加一些 class：

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

HTML 将被渲染为：

```html
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定 class 也同样适用：

```html
<my-component :class="{ active: isActive }"></my-component>
```

当 isActive 为 truthy[[1\]](https://v3.cn.vuejs.org/guide/class-and-style.html#footnote-1) 时，HTML 将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

如果你的组件有多个根元素，你需要定义哪些部分将接收这个 class。可以使用 `$attrs` 组件 property 执行此操作：

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```



```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})
```

## 5.2绑定内联样式

### 5.2.1对象语法

`:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```



```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<div :style="styleObject"></div>
```



```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

### 5.2.2数组语法

`:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 5.2.3自动添加前缀

在 `:style` 中使用需要一个 [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) (浏览器引擎前缀) 的 CSS property 时，Vue 将自动侦测并添加相应的前缀。Vue 是通过运行时检测来确定哪些样式的 property 是被当前浏览器支持的。如果浏览器不支持某个 property，Vue 会进行多次测试以找到支持它的前缀。

### 5.2.4多重值

可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。

# 6.条件渲染

## 6.1`v-if`

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

也可以用 `v-else` 添加一个“else 块”：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### 6.1.1在 `<template>` 元素上使用 `v-if` 条件渲染分组

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### 6.1.2`v-else`

你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

### 6.1.3`v-else-if`

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，并且可以连续使用：

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

与 `v-else` 的用法类似，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

## 6.2`v-show`

另一个用于条件性展示元素的选项是 `v-show` 指令。用法大致一样：

```html
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 `display` CSS property。

注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

## 6.3`v-if` vs `v-show`

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中，条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

# 7.列表渲染

## 7.1用 `v-for` 把一个数组映射为一组元素

我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 items 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

```html
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```



```js
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引。

```html
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```



```js
Vue.createApp({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-with-index')
```

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```

## 7.2在 `v-for` 里使用对象

你也可以用 `v-for` 来遍历一个对象的 property。

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```



```js
Vue.createApp({
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}).mount('#v-for-object')
```

你也可以提供第二个的参数为 property 名称 (也就是键名 key)：

```html
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>
```

还可以用第三个参数作为索引：

```html
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```

## 7.3显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

例如：

```html
<li v-for="n in evenNumbers" :key="n">{{ n }}</li>
```



```js
data() {
  return {
    numbers: [ 1, 2, 3, 4, 5 ]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0)
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套的 `v-for` 循环中) 你可以使用一个方法：

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)" :key="n">{{ n }}</li>
</ul>
```



```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

## 7.4在 `v-for` 里使用值的范围

`v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数。

```html
<div id="range" class="demo">
  <span v-for="n in 10" :key="n">{{ n }} </span>
</div>
```

## 7.5在 `<template>` 中使用 `v-for`

类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。比如：

```html
<ul>
  <template v-for="item in items" :key="item.msg">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## 7.6`v-for` 与 `v-if` 一同使用

> 注意:我们**不**推荐在同一元素上使用 `v-if` 和 `v-for`。

当它们处于同一节点，`v-if` 的优先级比 `v-for` 更高，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：

```html
<!-- 这将抛出一个错误，因为“todo” property 没有在实例上定义 -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

可以把 `v-for` 移动到 `<template>` 标签中来修正：

```html
<template v-for="todo in todos" :key="todo.name">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## 7.7在组件上使用 `v-for`

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for`：

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 props：

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。

下面是一个简单的 todo 列表的完整例子：

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</div>
```



```js
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>
  `,
  props: ['title'],
  emits: ['remove']
})

app.mount('#todo-list-example')
```

# 8.事件处理

## 8.1监听事件

我们可以使用 `v-on` 指令 (通常缩写为 `@` 符号) 来监听 DOM 事件，并在触发事件时执行一些 JavaScript。用法为 `v-on:click="methodName"` 或使用快捷方式 `@click="methodName"`

例如：

```html
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```



```js
Vue.createApp({
  data() {
    return {
      counter: 0
    }
  }
}).mount('#basic-event')
```

## 8.2事件处理方法

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

例如：

```html
<div id="event-with-method">
  <!-- `greet` 是在下面定义的方法名 -->
  <button @click="greet">Greet</button>
</div>
```



```js
Vue.createApp({
  data() {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    greet(event) {
      // `methods` 内部的 `this` 指向当前活动实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}).mount('#event-with-method')
```

## 8.3内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

```html
<div id="inline-handler">
  <button @click="say('hi')">Say hi</button>
  <button @click="say('what')">Say what</button>
</div>
```



```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```



```js
// ...
methods: {
  warn(message, event) {
    // 现在可以访问到原生事件
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## 8.4多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```html
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">
  Submit
</button>
```



```js
// ...
methods: {
  one(event) {
    // 第一个事件处理器逻辑...
  },
  two(event) {
   // 第二个事件处理器逻辑...
  }
}
```

## 8.5事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续冒泡 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `@click.prevent.self` 会阻止**元素本身及其子元素的点击的默认行为**，而 `@click.self.prevent` 只会阻止对元素自身的点击的默认行为。

```html
<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>
```

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的[组件事件](https://v3.cn.vuejs.org/guide/component-custom-events.html)上。如果你还没有阅读关于组件的文档，现在大可不必担心。

Vue 还对应 [`addEventListener` 中的 passive 选项](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)提供了 `.passive` 修饰符。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发，   -->
<!-- 而不会等待 `onScroll` 完成，                    -->
<!-- 以防止其中包含 `event.preventDefault()` 的情况  -->
<div @scroll.passive="onScroll">...</div>
```

这个 `.passive` 修饰符尤其能够提升移动端的性能。

## 8.6按键修饰符

在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许为 `v-on` 或者 `@` 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />
```

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

```html
<input @keyup.page-down="onPageDown" />
```

在上述示例中，处理函数只会在 `$event.key` 等于 `'PageDown'` 时被调用。

### 8.6.1按键别名

Vue 为最常用的键提供了别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## 8.7系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

例如：

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

> 请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。

### 8.7.1`.exact` 修饰符

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

### 8.7.2鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。

# 9.组件基础

## 9.1基本示例

这里有一个 Vue 组件的示例：

```js
// 创建一个Vue 应用
const app = Vue.createApp({})

// 定义一个名为 button-counter 的新全局组件
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
```

组件是带有名称的可复用实例，在这个例子中是 `<button-counter>`。我们可以把这个组件作为一个根实例中的自定义元素来使用：

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```



```js
app.mount('#components-demo')
```

因为组件是可复用的实例，所以它们与根实例接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。

## 9.2组件的复用

你可以将组件进行任意次数的复用：

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

## 9.3通过 Prop 向子组件传递数据

早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

Prop 是你可以在组件上注册的一些自定义 attribute。为了给博文组件传递一个标题，我们可以用 `props` 选项将其包含在该组件可接受的 prop 列表中：

```js
const app = Vue.createApp({})

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

当一个值被传递给一个 prop attribute 时，它就成为该组件实例中的一个 property。该 property 的值可以在模板中访问，就像任何其他组件 property 一样。

一个组件可以拥有任意数量的 prop，并且在默认情况下，无论任何值都可以传递给 prop。

```html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

然而在一个典型的应用中，你可能在 `data` 里有一个博文的数组：

```js
const App = {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}

const app = Vue.createApp(App)

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-posts-demo')
```

并想要为每篇博文渲染一个组件：

```html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

如上所示，你会发现我们可以使用 `v-bind` 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，是非常有用的。

## 9.4监听子组件事件

我们在开发 `<blog-post>` 组件时，它的一些功能可能需要与父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号。

在其父组件中，我们可以通过添加一个 `postFontSize` data property 来支持这个功能：

```js
const App = {
  data() {
    return {
      posts: [
        /* ... */
      ],
      postFontSize: 1
    }
  }
}
```

它可以在模板中用来控制所有博文的字号：

```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
    ></blog-post>
  </div>
</div>
```

现在我们在每篇博文正文之前添加一个按钮来放大字号：

```js
app.component('blog-post', {
  props: ['title'],
  template: `
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>
        Enlarge text
      </button>
    </div>
  `
})
```

问题是这个按钮不会做任何事：

```html
<button>
  Enlarge text
</button>
```

当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好组件实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理原生 DOM 事件一样通过 `v-on` 或 `@` 监听子组件实例的任意事件：

```html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

同时子组件可以通过调用内建的 [**$emit** 方法](https://v3.cn.vuejs.org/api/instance-methods.html#emit)并传入事件名称来触发一个事件：

```html
<button @click="$emit('enlargeText')">
  Enlarge text
</button>
```

多亏了 `@enlarge-text="postFontSize += 0.1"` 监听器，父级组件能够接收事件并更新 `postFontSize` 的值。

我们可以在组件的 `emits` 选项中列出已抛出的事件：

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlargeText']
})
```

这将允许我们检查组件抛出的所有事件，还可以选择[验证它们](https://v3.cn.vuejs.org/guide/component-custom-events.html#验证抛出的事件)。

### 9.4.1使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：

```html
<button @click="$emit('enlargeText', 0.1)">
  Enlarge text
</button>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

或者，如果这个事件处理函数是一个方法：

```html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

那么这个值将会作为第一个参数传入这个方法：

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 9.4.2在组件上使用 v-model

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```html
<input v-model="searchText" />
```

等价于：

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

当用在组件上时，`v-model` 则会这样：

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

> 请注意，我们在这里使用的是 `model-value`，因为我们使用的是 DOM 模板中的 kebab-case。

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `modelValue` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `update:modelValue` 事件抛出

写成代码之后是这样的：

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

在该组件中实现 `v-model` 的另一种方法是使用 `computed` property 的功能来定义 getter 和 setter。`get` 方法应返回 `modelValue` property，`set` 方法应该触发相应的事件。

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) { 
        this.$emit('update:modelValue', value)
      }
    }
  }
})
```

## 9.5通过插槽分发内容

和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

```html
<alert-box>
  Something bad happened.
</alert-box>
```

这可以通过使用 Vue 的自定义 `<slot>` 元素来实现：

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

如你所见，我们使用 `<slot>` 作为我们想要插入内容的占位符——就这么简单！

## 9.6动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：

上述内容可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现：

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component :is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括：

- 已注册组件的名字，或
- 一个组件选项对象

# 10.深入组件

## 10.1组件注册

### 10.1.1组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
const app = Vue.createApp({...})

app.component('my-component-name', {
  /* ... */
})
```

该组件名就是 `app.component` 的第一个参数，在上面的例子中，组件的名称是“my-component-name”。

对组件的命名可能与你打算在哪使用它有关。当直接在 DOM 中 (而不是在字符串模板或[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)中) 使用一个组件的时候，我们强烈推荐遵循 [W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)来给自定义标签命名：

1. 全部小写
2. 包含连字符 (及：即有多个单词与连字符符号连接)

这样会帮助我们避免与当前以及未来的 HTML 元素发生冲突。

### 10.1.2组件名大小写

在字符串模板或单文件组件中定义组件时，定义组件名的方式有两种：

- 使用 kebab-case

```js
app.component('my-component-name', {
  /* ... */
})
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你在引用这个自定义元素时也必须使用 kebab-case，例如 `<my-component-name>`。

- 使用 PascalCase

```js
app.component('MyComponentName', {
  /* ... */
})
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

### 10.1.3全局注册

到目前为止，我们只用过 `app.component` 来创建组件：

```js
Vue.createApp({...}).component('my-component-name', {
  // ... 选项 ...
})
```

这些组件是**全局注册**的。也就是说它们在注册之后可以用在任何新创建的组件实例的模板中。比如：

```js
const app = Vue.createApp({})

app.component('component-a', {
  /* ... */
})
app.component('component-b', {
  /* ... */
})
app.component('component-c', {
  /* ... */
})

app.mount('#app')
```



```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

在所有子组件中也是如此，也就是说这三个组件在*各自内部*也都可以相互使用。

### 10.1.4局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用其中一个组件了，它仍然会被包含在最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```js
const ComponentA = {
  /* ... */
}
const ComponentB = {
  /* ... */
}
const ComponentC = {
  /* ... */
}
```

然后在 `components` 选项中定义你想要使用的组件：

```js
const app = Vue.createApp({
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

注意**局部注册的组件在其子组件中不可用**。例如，如果你希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

```js
const ComponentA = {
  /* ... */
}

const ComponentB = {
  components: {
    'component-a': ComponentA
  }
  // ...
}
```

或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来像这样：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
  // ...
}
```

## 10.2Props

### 10.2.1Prop 类型

目前为止，我们只看到了以字符串数组形式列出的 prop：

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 或任何其他构造函数
}
```

### 10.2.2传递静态或动态的 Prop

目前为止，你已经知道了可以像这样给 prop 传入一个静态的值：

```html
<blog-post title="My journey with Vue"></blog-post>
```

你也知道 prop 可以通过 `v-bind` 或简写 `:` 动态赋值，例如：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post :title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post :title="post.title + ' by ' + post.author.name"></blog-post>
```

在上述两个示例中，我们传入的值都是字符串类型的，但实际上*任何*类型的值都可以传给一个 prop。

### 10.2.3传入一个数字

```html
<!-- 即便 `42` 是静态的，我们仍需通过 `v-bind` 来告诉 Vue     -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post :likes="post.likes"></blog-post>
```

### 10.2.4传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。          -->
<!-- 如果没有在 props 中把 is-published 的类型设置为 Boolean，
则这里的值为空字符串，而不是“true”。 -->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍需通过 `v-bind` 来告诉 Vue  -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。                                -->
<blog-post :is-published="post.isPublished"></blog-post>
```

### 10.2.5传入一个数组

```html
<!-- 即便数组是静态的，我们仍需通过 `v-bind` 来告诉 Vue        -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。                                -->
<blog-post :comment-ids="post.commentIds"></blog-post>
```

### 10.2.6传入一个对象

```html
<!-- 即便对象是静态的，我们仍需通过 `v-bind` 来告诉 Vue        -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。                                 -->
<blog-post :author="post.author"></blog-post>
```

### 10.2.7传入一个对象的所有 property

如果想要将一个对象的所有 property 都作为 prop 传入，可以使用不带参数的 `v-bind` (用 `v-bind` 代替 `:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

### 10.2.8单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data property 并将这个 prop 作为其初始值：

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

2. **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize() {
    return this.size.trim().toLowerCase()
  }
}
```

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身**将会**影响到父组件的状态，且 Vue 无法为此向你发出警告。作为一个通用规则，应该避免修改任何 prop，包括对象和数组，因为这种做法无视了单向数据绑定，且可能会导致意料之外的结果。

### 10.2.9Prop 验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个要求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证要求的对象，而不是一个字符串数组。例如：

```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 值会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组的默认值必须从一个工厂函数返回
      default() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator(value) {
        // 这个值必须与下列字符串中的其中一个相匹配
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组的默认值不同，这不是一个工厂函数——这是一个用作默认值的函数
      default() {
        return 'Default function'
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

### 10.2.10类型检查

`type` 可以是下列原生构造函数中的一个：

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

此外，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```js
app.component('blog-post', {
  props: {
    author: Person
  }
})
```

来验证 `author` prop 的值是否是通过 `new Person` 创建的。

### 10.2.11Prop 的大小写命名 (camelCase vs kebab-case)

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // 在 JavaScript 中使用 camelCase
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```



```html
<!-- 在 HTML 中使用 kebab-case -->
<blog-post post-title="hello!"></blog-post>
```

重申一次，如果你使用字符串模板，那么这个限制就不存在了。

## 10.3非 Prop 的 Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 [props](https://v3.cn.vuejs.org/guide/component-props.html) 或 [emits](https://v3.cn.vuejs.org/guide/component-custom-events.html#定义自定义事件) 定义的 attribute。常见的示例包括 `class`、`style` 和 `id` attribute。可以通过 `$attrs` property 访问那些 attribute。

### 10.3.1Attribute 继承

当组件返回单个根节点时，非 prop 的 attribute 将自动添加到根节点的 attribute 中。例如，在 date-picker 组件的实例中：

```js
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime-local" />
    </div>
  `
})
```

如果我们需要通过 `data-status` attribute 定义 `<date-picker>` 组件的状态，它将应用于根节点 (即 `div.date-picker`)。

```html
<!-- 具有非 prop 的 attribute 的 date-picker 组件-->
<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker" data-status="activated">
  <input type="datetime-local" />
</div>
```

同样的规则也适用于事件监听器：

```html
<date-picker @change="submitChange"></date-picker>
```



```js
app.component('date-picker', {
  created() {
    console.log(this.$attrs) // { onChange: () => {}  }
  }
})
```

当一个具有 `change` 事件的 HTML 元素作为 `date-picker` 的根元素时，这可能会有帮助。

```js
app.component('date-picker', {
  template: `
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
  `
})
```

在这种情况下，`change` 事件监听器将从父组件传递到子组件，它将在原生 `<select>` 的 `change` 事件上触发。我们不需要显式地从 `date-picker` 发出事件：

```html
<div id="date-picker" class="demo">
  <date-picker @change="showChange"></date-picker>
</div>
```



```js
const app = Vue.createApp({
  methods: {
    showChange(event) {
      console.log(event.target.value) // 将打印所选选项的值
    }
  }
})
```

### 10.3.2禁用 Attribute 继承

如果你**不**希望组件的根元素继承 attribute，可以在组件的选项中设置 `inheritAttrs: false`。

禁用 attribute 继承的常见场景是需要将 attribute 应用于根节点之外的其他元素。

通过将 `inheritAttrs` 选项设置为 `false`，你可以使用组件的 `$attrs` property 将 attribute 应用到其它元素上，该 property 包括组件 `props` 和 `emits` property 中未包含的所有属性 (例如，`class`、`style`、`v-on` 监听器等)。

使用[上一节](https://v3.cn.vuejs.org/guide/component-attrs.html#attribute-继承)中的 date-picker 组件示例，如果需要将所有非 prop 的 attribute 应用于 `input` 元素而不是根 `div` 元素，可以使用 `v-bind` 缩写来完成。

```js
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime-local" v-bind="$attrs" />
    </div>
  `
})
```

有了这个新配置，`data-status` attribute 将应用于 `input` 元素！

```html
<!-- date-picker 组件使用非 prop 的 attribute -->
<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker">
  <input type="datetime-local" data-status="activated" />
</div>
```

### 10.3.3多个根节点上的 Attribute 继承

与单个根节点组件不同，具有多个根节点的组件不具有自动 attribute [fallthrough (隐式贯穿)](https://en.wiktionary.org/wiki/fall-through#English) 行为。如果未显式绑定 `$attrs`，将发出运行时警告。

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```



```js
// 这将发出警告
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})

// 没有警告，$attrs 被传递到 <main> 元素
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```

## 10.4自定义事件

### 10.4.1事件名

与组件和 prop 一样，事件名提供了自动的大小写转换。如果在子组件中触发一个以 camelCase (驼峰式命名) 命名的事件，你将可以在父组件中添加一个 kebab-case (短横线分隔命名) 的监听器。

```js
this.$emit('myEvent')
```



```html
<my-component @my-event="doSomething"></my-component>
```

### 10.4.2定义自定义事件

可以通过 `emits` 选项在组件上定义发出的事件。

```js
app.component('custom-form', {
  emits: ['inFocus', 'submit']
})
```

当在 `emits` 选项中定义了原生事件 (如 `click`) 时，将使用组件中的事件**替代**原生事件侦听器。

> 建议定义所有发出的事件，以便更好地记录组件应该如何工作。

1. **验证抛出的事件**

与 prop 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，则可以对它进行验证。

要添加验证，请为事件分配一个函数，该函数接收传递给 `$emit` 调用的参数，并返回一个布尔值以指示事件是否有效。

```js
app.component('custom-form', {
  emits: {
    // 没有验证
    click: null,

    // 验证 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
})
```

### 10.4.3`v-model` 参数

默认情况下，组件上的 `v-model` 使用 `modelValue` 作为 prop 和 `update:modelValue` 作为事件。我们可以通过向 `v-model` 传递参数来修改这些名称：

```html
<my-component v-model:title="bookTitle"></my-component>
```

在本例中，子组件将需要一个 `title` prop 并发出 `update:title` 事件来进行同步：

```js
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```

### 10.4.4多个 `v-model` 绑定

正如我们之前在 [`v-model` 参数](https://v3.cn.vuejs.org/guide/component-custom-events.html#v-model-参数)中所学的那样，通过利用以特定 prop 和事件为目标的能力，我们现在可以在单个组件实例上创建多个 v-model 绑定。

每个 v-model 将同步到不同的 prop，而不需要在组件中添加额外的选项：

```html
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
```



```js
app.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName'],
  template: `
    <input 
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)">

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)">
  `
})
```

### 10.4.5处理 `v-model` 修饰符

当我们学习表单输入绑定时，我们看到 `v-model` 有[内置修饰符](https://v3.cn.vuejs.org/guide/forms.html#修饰符)——`.trim`、`.number` 和 `.lazy`。但是，在某些情况下，你可能还需要添加自己的自定义修饰符。

让我们创建一个示例自定义修饰符 `capitalize`，它将 `v-model` 绑定提供的字符串的第一个字母大写。

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop。

请注意，当组件的 `created` 生命周期钩子触发时，`modelModifiers` prop 会包含 `capitalize`，且其值为 `true`——因为 `capitalize` 被设置在了写为 `v-model.capitalize="myText"` 的 `v-model` 绑定上。

```html
<my-component v-model.capitalize="myText"></my-component>
```



```js
app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  template: `
    <input type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  `,
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
})
```

现在我们已经设置了 prop，我们可以检查 `modelModifiers` 对象键并编写一个处理器来更改发出的值。在下面的代码中，每当 `<input/>` 元素触发 `input` 事件时，我们都将字符串大写。

```html
<div id="app">
  <my-component v-model.capitalize="myText"></my-component>
  {{ myText }}
</div>
```



```js
const app = Vue.createApp({
  data() {
    return {
      myText: ''
    }
  }
})

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  },
  template: `<input
    type="text"
    :value="modelValue"
    @input="emitValue">`
})

app.mount('#app')
```

对于带参数的 `v-model` 绑定，生成的 prop 名称将为 `arg + "Modifiers"`：

```html
<my-component v-model:description.capitalize="myText"></my-component>
```



```js
app.component('my-component', {
  props: ['description', 'descriptionModifiers'],
  emits: ['update:description'],
  template: `
    <input type="text"
      :value="description"
      @input="$emit('update:description', $event.target.value)">
  `,
  created() {
    console.log(this.descriptionModifiers) // { capitalize: true }
  }
})
```











