

## 0.Vue实例

### 0.1创建一个Vue实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的：

```js
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 [MVVM 模型](https://zh.wikipedia.org/wiki/MVVM)，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个**选项对象**。

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

```
根实例
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。

### 0.2数据与方法

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的。也就是说如果你添加一个新的 property，比如：

```js
vm.b = 'hi'
```

那么对 `b` 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 `$`，以便与用户定义的 property 区分开来。例如：

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```



## 1.Vue指令

指令是以`V-`开头的（使用指令需要`v-`开头，自定义指令时则不需要加前缀`v-`），并且都在==开始标签==属性中添加

### 1.1 	mustache语法

叫插值表达式，直接在标签内部使用。**插值表达式前后内容不会被替换**

```html
div>{{msg2}}</div>
```

缺点：网速慢会有==闪烁==问题

### 1.2	v-cloak

放在开始标签内和插值表达式搭配使用，然后给这个属性定义样式。==解决插值表达式闪烁问题==

==原理==：没有请求到数据时，隐藏这个属性的标签，接收到数据时，就移除这个属性

```html
 <style>
   /*必须添加这条样式*/
    [v-cloak] {
       display: none; 
    }
</style>

<body> 
    <!-- 插值表达式前后内容不会被替换-->
		<p v-cloak>++++++++ {{ msg }} ----------</p>
</body>
```

### 1.3	v-text

`v-text`会覆盖元素中原本的内容。但是==插值表达式==只会==替换==自己的这个==占位符==，不会把整个元素的内容清空 。

用于将数据解析成==文本格式==，包括`html`标签

```html
<!--中间内容会被替换掉-->
<h4 v-text="msg">=============</h4s>
```

### 1.4	v-html

将数据解析成==html格式==

存在安全问题

```html
<h4 v-html="msg">=============</h4>
```

### 1.5	v-once

该指令表示元素和组件==只渲染一次==，不会随着数据的改变而改变。

该指令后面不需要跟任何表达式.

### 1.6	v-pre

v-pre用于==跳过==这个元素和它子元素的==编译过程==，用于显示原本的Mustache语法。

### 1.6	v-bind

用于==动态绑定属性==

简写 `:要绑定的属性`

v-bind 中，可以写合法的JS表达式

```html
<!--v-bind告诉浏览器mytitle是变量-->
<input type="button" value="按钮" v-bind:title="mytitle">

<!--v-bind告诉浏览器"mytitle + '123'"是表达式来解析-->
<!--123如果不加引号将会当作变量来解析-->
<input type="button" value="按钮" :title="mytitle + '123'">
<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

### 1.7	v-on

用于==绑定事件==,或者==监听某个事件==

简写：`@事件`

执行过程：监听到某个事件，就去调用相应的方法进行执行。

```html
<!--绑定的事件需要到 methods 属性中去找相应的方法-->
<input type="button" value="按钮" v-on:click="show">
<!--简写形式-->
<!--表示：监听到点击事件时，就去执行show方法-->
<input type="button" value="按钮" @click="show">
<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

- 如果该==方法不需要额外参数==，那么方法后的`()`可以不添加

```js
<!--1.事件调用的方法没有参数-->
//下面两行等价。
<button @click="btn1Click()">按钮1</button>
<button @click="btn1Click">按钮1</button>

methods: {
  //这个方法不需要接收相应的参数
	btn1Click() {
        console.log("btn1Click");
      }
}
```

- 如果==方法本身中有一个参数==，那么会默认将原生事件`event`参数传递进去

```html
<!--2.在事件定义时, 写方法时省略了小括号, 但是方法本身是需要一个参数的, 这个时候, Vue会默认将浏览器产生的event事件对象作为参数传入到方法-->
<button @click="btn2Click">按钮2</button>
methods:{
//该方法需要接收参数
 btn2Click(event) {
        console.log(event);
      }
}
```

- 如果需要同时传入某个参数，同时需要event时，可以通过`$event`传入事件

```html
<!--3.方法定义时, 我们需要event对象, 同时又需要其他参数-->
  <!-- 在调用方法时, 手动的获取到浏览器参数的event对象: $event-->
<button @click="btn3Click(abc, $event)">按钮3</button>

methods:{
//第二个参数为浏览器产生的事件对象
	btn3Click(abc, event) {
        console.log(abc, event);
      }
}
```

### 1.8	v-model

`v-bind` 只能实现数据的单向绑定（也就是将data中的数据渲染到页面上），从 M 自动绑定到 V， 无法实现数据的双向绑定（即不能从`V`到`M`的绑定)

使用  v-model 指令，可以实现`表单元素`和 `Model 中数据`的`双向数据绑定`

注意： **==v-model 只能运用在表单元素中==**

`input(radio, text, address, email....)select checkbox textarea`

#### 1.8.1	v-model原理

`v-model`其实是一个语法糖，它的背后本质上是包含两个操作：

1. `v-bind`绑定一个`value`属性

2. `v-on`指令给当前元素绑定`input`事件

```html
<input type="text" v-model="message">
<!--等同于-->
<input type="text" v-bind:value="message" v-on:input="message = $event.target.value">
<!--也可以通过下面方法获取输入框变化的值-->
<input type="text" :value="message" @input="valueChange">
methods: {
<!--此时event为浏览器产生的事件对象-->
      valueChange(event) {
        this.message = event.target.value;
      }
    }
```

#### 1.8.2	v-model结合radio使用

绑定的是`value`值

说明：

1. 表单类型`radio`元素只有在`name`相同时，才会产生互斥。但是使用`v-model`指令也会实现互斥

```html
<div id="app">
  <label for="male">
    <input type="radio" id="male" value="男" v-model="sex">男
  </label>
  <label for="female">
    <input type="radio" id="female" value="女" v-model="sex">女
  </label>
  <h2>您选择的性别是: {{sex}}</h2>
</div>
```

```js
const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      //给表单赋默认值
      sex: '女'
    }
  })
```

#### 1.8.3	v-model结合**checkbox**使用

复选框分为两种情况：单个勾选框和多个勾选框

- 单个勾选框：
  - `v-model`即为布尔值。
  - 此时`input`的`value`并不影响`v-model`的值。

  ```html
  <!--1.checkbox单选框-->
  <label for="agree"> 
     <input type="checkbox" id="agree" v-model="isAgree" />同意协议 
  </label>
  <button :disabled="!isAgree">下一步</button>
  ```
```
  
  ```js
  const app = new Vue({
          el: '#app',
          data: {
            isAgree: false, // 单选框
          }
        })
```

- 多个复选框：
  - 当是多个复选框时，因为可以选中多个，所以==对应的data中属性是一个数组==。
  - 当选中某一个时，就会将`input`的`value`添加到==数组==中。

  ```html
  <!--2.checkbox多选框-->
  <!--v-model绑定的是同一个数组-->
  <input type="checkbox" value="篮球" v-model="hobbies" />篮球 
  <input type="checkbox" value="足球" v-model="hobbies" />足球 
  <input type="checkbox" value="乒乓球" v-model="hobbies" />乒乓球
  <input type="checkbox" value="羽毛球" v-model="hobbies" />羽毛球
  <h2>您的爱好是: {{hobbies}}</h2>

  <!--表示hobbies数组中有的元素就会选中当前的元素-->
  <label v-for="item in originHobbies" :for="item"> 
    <!--因为v-model绑定的是hobbies数组-->
    <input type="checkbox" :value="item" :id="item" v-model="hobbies" />{{item}} </label>
  ```
  
  ```js
  const app = new Vue({
          el: '#app',
        data: {
            hobbies: [], // 多选框,
            originHobbies: ['篮球', '足球', '乒乓球', '羽毛球', '台球', '高尔夫球']
          }
        })
  ```
  

#### 1.8.4	v-model结合**select**使用

> 单选：只能选中一个值。

`v-model`绑定的是一个==值==。

当我们选中`option`中的一个时，会将它对应的`value`赋值到`fruit`中

```html
<!--1.选择一个-->
  <select name="abc" v-model="fruit">
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="榴莲">榴莲</option>
    <option value="葡萄">葡萄</option>
  </select>
```

```js
 const app = new Vue({
    el: '#app',
    data: {
      fruit: '香蕉',
    }
  })
```

> 多选：可以选中多个值。

`v-model`绑定的是一个==数组==。

当选中多个值时，就会将选中的`option`对应的`value`添加到数组`fruits`数组中

```html
 <!--2.选择多个-->
  <select name="abc" v-model="fruits" multiple>
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="榴莲">榴莲</option>
    <option value="葡萄">葡萄</option>
  </select>
```

```js
const app = new Vue({
    el: '#app',
    data: {
      fruits: []
    }
  })
```

#### 1.8.5	v-model修饰符

> lazy修饰符：

默认情况下，`v-model`默认是在`input`事件中同步输入框的数据的。

也就是说，一旦有数据发生改变对应的`data`中的数据就会自动发生改变。

`lazy`修饰符可以让数据在==失去焦点或者回车时才会更新==

```html
<!--1.修饰符: lazy-->
  <input type="text" v-model.lazy="message">
  <h2>{{message}}</h2>
```

> number修饰符：

默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当做字符串类型进行处理。

但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理。

`number`修饰符可以让在输入框中==输入的内容自动转成数字类型==

```html
<!--2.修饰符: number-->
  <input type="number" v-model.number="age">
  <h2>{{age}}-{{typeof age}}</h2>
```

> trim修饰符：

如果输入的内容首尾有很多空格，通常我们希望将其去除

`trim`修饰符可以==过滤内容左右两边的空格==

```html
<!--3.修饰符: trim-->
  <input type="text" v-model.trim="name">
  <h2>您输入的名字:{{name}}</h2>
```

### 1.9动态参数

可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```js
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 `data` property `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```js
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

> 对动态参数的值的约束

动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

> 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```js
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```js
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```



## 2.事件处理

### 2.1监听事件

可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

```js
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

### 2.2事件处理方法

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

```html
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```

### 2.3内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

```html
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

### 2.4事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

#### 2.4.1`.once`

```js
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的[组件事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)上。

#### 2.4.2`.passive`

ue 还对应 [`addEventListener` 中的 `passive` 选项](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)提供了 `.passive` 修饰符。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

这个 `.passive` 修饰符尤其能够提升移动端的性能。

> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

### 2.5按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

```html
<input v-on:keyup.page-down="onPageDown">
```

在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用。

## 3.Class 与 Style 绑定

### 3.1 `class`

使用方式：**需要使用`bind指令`绑定类名**

绑定`class`有两种方式：

- 对象语法

- 数组语法

#### 3.1.1对象语法

语法：

```html
<h2 v-bind:class="{key1: value1, key2: value2}">{{message}}</h2>
# 由于类名是对象的键，因此可以省略引号
# 键值可以写变量（变量值也需要是Boolean值），也可以直接写Boolean值
<h2 v-bind:class="{类名1: true, 类名2: boolean}">{{message}}</h2>
```

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 class 存在与否将取决于数据 property `isActive`

你可以在对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class attribute 共存。当有如下模板：

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下 data：

```js
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为：

```js
<div class="static active"></div>
```

当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，class 列表将变为 `"static active text-danger"`。

绑定的数据对象不必内联定义在模板里：

```js
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```js
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

#### 3.1.2数组语法

数组中可以写==变量==，也可以写==类名字符串==

用法介绍：

```bash
#用法一：直接通过[]绑定一个类
	#此时active是类名字符串
<h2 :class="['active']">Hello World</h2>
	#此时 active line都是在data中定义的变量，变量的值为类名字符串
<h2 :class="[active, line]">{{message}}</h2>
	data{
		active: 'aaaaaa',
    line: 'bbbbbbb'
	}
#用法二：也可以传入多个值,绑定多个类
<h2 :class=“[‘active’, 'line']">Hello World</h2>

#用法三：和普通的类同时存在，并不冲突
#注：会有title/active/line三个类
<h2 class="title" :class=“[‘active’, 'line']">Hello World</h2>

#用法四：如果过于复杂，可以放在一个methods或者computed中-->
#注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
# getClasses()是一个方法，必须加括号进行调用
<h2 class="title" :class="getClasses()">{{message}}</h2>
	methods: {
          getClasses: function() {
          #返回的是数组
            return [this.active, this.line]
          }
        }
#用法五：在数组中使用三元表达式，进行按需添加类
<h1 :class="['thin', 'italic', flag?'active':'']">这是一个很大很大的H1</h1>
#用法六：在数组中使用 对象来代替三元表达式，提高代码的可读性
<h1 :class="['thin', 'italic', {'active':flag} ]">这是一个很大很大的H1！</h1>
```

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```js
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```js
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy[[1\]](https://cn.vuejs.org/v2/guide/class-and-style.html#footnote-1) 时才添加 `activeClass`。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```js
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

#### 3.1.3用在组件上

当在一个自定义组件上使用 `class` property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

例如，如果你声明了这个组件：

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些 class：

```js
<my-component class="baz boo"></my-component>
```

HTML 将被渲染为：

```js
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定 class 也同样适用：

```html
<my-component v-bind:class="{ active: isActive }"></my-component>
```

当 `isActive` 为 true时，HTML 将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

### 3.2绑定内联样式

在写CSS属性名的时候，比如`font-size`

- 我们可以使用==驼峰式== (camelCase) `fontSize` 

- 或短横线分隔 (kebab-case，记得用==单引号==括起来)`"font-size"` 

#### 3.2.1对象语法

style后面跟的是一个对象类型

- 对象的`key`是CSS==属性名称==
- 对象的`value`是==具体赋的值==，值可以来自于`data`中的属性

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。



语法：

```html
<h2 :style="{key(属性名): value(属性值)}">{{message}}</h2>
```

用法示例：

```bash
# '50px'必须加上单引号, 否则是当做一个变量去解析
<h2 :style="{fontSize: '50px'}">{{message}}</h2>
# finalSize当成一个变量使用
<h2 :style="{fontSize: finalSize}">{{message}}</h2>
<h2 :style="{fontSize: finalSize + 'px', backgroundColor: finalColor}">{{message}}</h2>
# 可以是计算属性或方法
<h2 :style="getStyles()">{{message}}</h2>
```

```js
data: {
      message: '你好啊',
      finalSize: 100,
      finalColor: 'red',
    },
    methods: {
      getStyles: function () {
        return {fontSize: this.finalSize + 'px', backgroundColor: this.finalColor}
      }
    }
```

#### 3.2.2数组语法

用法示例

```bash
<h2 :style="[baseStyle, baseStyle1]">{{message}}</h2>

 data: {
      baseStyle: {backgroundColor: 'red'},
      baseStyle1: {fontSize: '100px'},
    }
```

## 4.列表渲染

我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引。

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```



### 4.1循环普通数组

```html
<p v-for="(item, i) in list">索引值：{{i}} --- 每一项：{{item}}</p>
```

```js
var vm = new Vue({
      el: '#app',
      data: {
        list: [1, 2, 3, 4, 5, 6]
      },
      methods: {}
    });
```

### 4.2循环数组对象

```
<p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
```

```
var vm = new Vue({
      el: '#app',
      data: {
        list: [
          { id: 1, name: 'zs1' },
          { id: 2, name: 'zs2' },
          { id: 3, name: 'zs3' },
          { id: 4, name: 'zs4' }
        ]
      },
      methods: {}
    });
```

### 4.3循环对象

你也可以用 `v-for` 来遍历一个对象的 property。

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

你也可以提供第二个的参数为 property 名称 (也就是键名)：

```html
<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>
```

还可以用第三个参数作为索引：

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```





### 4.4迭代数字

- in后面我们放过==普通数组==，==对象数组==，==对象==， 还可以放==数字==
- 注意：如果使用 v-for 迭代数字的话，前面的 count 值从 `1 `开始

```html
<p v-for="count in 10">这是第 {{ count }} 次循环</p>
```

### 4.5 v-for 循环中key 属性的使用

- 注意： `v-for` 循环的时候，`key `属性只能使用 `number类型`或`string类型`
- 注意： `key` 在使用的时候，必须使用 `v-bind `属性绑定的形式，指定 `key `的值
- 在组件中，使用`v-for`循环的时候，或者在一些特殊情况中，如果 `v-for` 有问题，必须在使用 `v-for `的同时，==指定 唯一的 字符串/数字 类型 :key 值==

### 4.6数组更新检测

#### 4.6.1变更方法

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 4.6.2替换数组

变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。当使用非变更方法时，可以用新数组替换旧数组：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 4.7显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个方法：

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

### 4.8在`<template>`上使用v-for

类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。比如：

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### 4.9在组件上使用`v-for`

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for`

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

> 当在组件上使用 `v-for` 时，`key` 现在是必须的。

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。

## 5.条件渲染

### 5.1	v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 真值的时候被渲染。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

也可以用 `v-else` 添加一个“else 块”：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

#### 5.1.1在`<template>`元素上使用`v-if`条件渲染分组

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

#### 5.1.2`v-else`

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

#### 5.1.3`v-else-if`

充当 `v-if` 的“else-if 块”，可以连续使用：

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

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

#### 5.1.4用 `key` 管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

现在，每次切换时，输入框都将被重新渲染。

注意，`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute。

### 5.2`v-show`

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```html
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property `display`。

> 注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

### 5.3`v-if` vs `v-show`

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

### 5.4用户登录切换的案例

html：

```html
<div id="app">
  <span v-if="isUser">
    <label for="username">用户账号</label>
    <input type="text" id="username" placeholder="用户账号">
  </span>
  
  <span v-else>
    <label for="email">用户邮箱</label>
    <input type="text" id="email" placeholder="用户邮箱">
  </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>
```

js：

```js
const app = new Vue({
    el: '#app',
    data: {
      isUser: true
    }
  })
```

存在的问题：

```bash
#问题：
	如果我们在有输入内容的情况下，切换了类型，我们会发现文字依然显示之前的输入的内容。
	但是按道理讲，我们应该切换到另外一个input元素中了。
	在另一个input元素中，我们并没有输入内容。
#问题解答：
	这是因为Vue在进行DOM渲染时，出于性能考虑，会尽可能的复用已经存在的元素，而不是重新创建新的元素。
	在上面的案例中，Vue内部会发现原来的input元素不再使用，直接作为else中的input来使用了。
#解决方案：
	如果我们不希望Vue出现类似重复利用的问题，可以给对应的input添加key
	并且我们需要保证key的不同
```

修改后源码：

```html
<div id="app">
  <span v-if="isUser">
    <label for="username">用户账号</label>
    <input type="text" id="username" placeholder="用户账号" key="username">
  </span>
  <span v-else>
    <label for="email">用户邮箱</label>
    <input type="text" id="email" placeholder="用户邮箱" key="email">
  </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>
```

## 6.计算属性和侦听器

对于任何复杂逻辑，你都应当使用**计算属性**。

1. 在 computed 中，可以定义一些属性，这些属性叫做【计算属性】， 计算属性的本质就是一个方法，只不过，我们在使用这些计算属性的时候，是把它们的名称，直接当作属性来使用的；并不会把计算属性当作方法去调用；
2. 注意1： 计算属性在引用的时候，一定不要加 `()` 去调用，直接把它当作普通属性去使用就好了；
3. 注意2： 只要计算属性，这个 function 内部，所用到的任何 data 中的数据发送了变化，就会立即重新计算这个计算属性的值
4.  注意3： 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果计算属性方法中，所有来的任何数据，都没有发生过变化，则不会重新对计算属性求值；

### 6.1基础用法

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```



```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

这里我们声明了一个计算属性 `reversedMessage`。我们提供的函数将用作 property `vm.reversedMessage` 的 getter 函数：

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

`vm.reversedMessage` 的值始终取决于 `vm.message` 的值。

你可以像绑定普通 property 一样在模板中绑定计算属性。Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

```js
computed: {
  	//简单操作
      fullName: function () {
        return this.firstName + ' ' + this.lastName
      },
     //复杂操作
       totalPrice: function () {
        let result = 0
        for (let i=0; i < this.books.length; i++) {
          result += this.books[i].price
        }
        return result
      }
    }
```

> 注：计算属性在最后必须返回一个值

### 6.2计算属性缓存VS方法

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```



```js
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

### 6.3计算属性VS侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### 6.4计算属性的 setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

### 6.5侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```

```js
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

在这个示例中，使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## 7.过滤器

Vue允许你自定义过滤器，**可被用作一些常见的文本格式化**。过滤器可以用在两个地方：==差值和 `v-bind` 表达式==。过滤器应该被==添加==在JavaScript 表达式的==尾部==，由==管道符==指示；

注：==过滤器中必须要有返回值==

- 过滤器调用格式 ：

```js
{{ name | 过滤器的名称1 | 过滤器的名称2 }}
```

- 过滤器的定义语法：

```javascript
//1. 全局过滤器
Vue.filter('过滤器的名称', function(){
  
})
// 过滤器中的 function ，第一个参数已经被规定死了，永远都是过滤器管道符前面传递过来的数据
Vue.filter('过滤器的名称', function (data) {
  return data + '123'
}) 

//2. 私有过滤器
//在vm中添加属性 filters，与 methods 平级
filters：{
  过滤器名称1：处理函数1，
  过滤器名称2：处理函数2，
}
```

### 7.1 全局过滤器

在`vue实例`的外部创建全局过滤器，也可以从单独的过滤器js文件导入指定过滤器。

过滤器处理函数参数：

- 第一个参数为过滤器前面传递过来的数据
- 后面数据为过滤器调用时传递的数据

==注意==：

- 编写每个过滤器实现单一的功能
- 过滤器处理函数中必须使用`return`返回处理后的值

```javascript
<div id="app">
  <!--可以指定多个过滤器，每个过滤器实现单一的功能-->
  <p>{{ msg | msgFormat('疯狂+1', '123') | test }}</p>
</div>

<script>
		//1. 定义一个 Vue 全局的过滤器，名字叫做msgFormat
    Vue.filter('msgFormat', function (msg, arg, arg2) {
			// 字符串的replace方法，第一个参数，除了可写一个字符串之外，还可以定义一个正则表达式
      return msg.replace(/单纯/g, arg + arg2)
    })

		//2. 定义一个 Vue 全局的过滤器，名字叫做test
    Vue.filter('test', function (msg) {
      return msg + '========'
    })

		// 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人'
      },
      methods: {}
    });
  </script>
```

### 7.2 私有过滤器（局部）

在`vm`中添加属性`filters`，以对象形式添加多个过滤器。

**注**： 过滤器调用的时候，采用的是==就近原则==，如果==私有==过滤器和==全局==过滤器名称一致了，这时候优先调用==私有==过滤器

> 使用ES6中的字符串新方法 来填充字符串

```javascript
String.prototype.padStart(maxLength, fillString='')
String.prototype.padEnd(maxLength, fillString='')
/*
	1.调用时，直接使用： 字符串.padStart() 或 字符串.padEnd()
	2.这两个是字符串对象身上的方法。
	3.参数说明：
		maxLength：填充后最大的长度
		fillString=''：使用此字符串填充空位
*/
```

#### 7.2.1案例：实现日期时间的格式化（私有过滤器）

日期时间可以定义为==全局过滤器==，可以供多出调用。

```javascript
filters: { // 定义私有过滤器,过滤器有两个条件:【过滤器名称 和 处理函数】
        dateFormat: function (dateStr, pattern = '') {
          //dateStr为需要格式化的日期，也就是管道符前面的数据
          // 根据给定的时间字符串，得到特定的时间
          var dt = new Date(dateStr)
          //   yyyy-mm-dd
          //获取年
          var y = dt.getFullYear()
          //获取月
          //使用tostring方法转换为字符串
          var m = (dt.getMonth() + 1).toString().padStart(2, '0')
          //获取日
          //使用+‘’可以实现字符串的转换
          var d = (dt.getDate()+'').padStart(2, '0')
					//判断是否只传了年月日和小时分钟秒
          //pattern = ''是？
          if (pattern.toLowerCase() === 'yyyy-mm-dd') {
            return `${y}-${m}-${d}`
          } else {
            var hh = (dt.getHours()+'').padStart(2, '0')
            var mm = (dt.getMinutes()+'').padStart(2, '0')
            var ss = dt.getSeconds().toString().padStart(2, '0')
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
          }
        }
      }
```

## 8.自定义指令

`Vue`中所有的指令，在调用的时候，都以 `v- `开头

语法：

```vue
//定义全局的指令
Vue.directive()
```

- ==参数1== ： **指令的名称**。注意：在定义的时候，指令的名称前面不需要加`v-`前缀, 但是在调用的时候，必须在指令名称前加上`v-`前缀来进行调用。
- ==参数2==： **是一个对象**，这个对象身上，有一些指令**相关的函数**，这些函数可以在特定的阶段，执行相关的操作

### 8.1全局指令

```js
Vue.directive('focus', {
      bind: function (el) { 
// 每当指令绑定到元素上的时候，会立即执行这个bind函数，只执行一次
// 注意： 在每个函数中，第一个参数永远是el:表示被绑定了指令的那个元素，这个el参数是一个原生的JS对象
// 在元素刚绑定了指令的时候，还没有插入到DOM中去，这时候调用focus方法没有作用。因为:一个元素，只有插入DOM之后，才能获取焦点（严格来说，这时候才能使用行为相关的方法）
// el.focus()
      },
      inserted: function (el) {  // inserted 表示元素插入到DOM中的时候，会执行inserted函数【触发1次】
        el.focus()
        // 和JS行为有关的操作，最好在 inserted 中去执行
      },
      updated: function (el) {  // 当VNode更新的时候，会执行updated， 可能会触发多次
      }
    })
```

自定义一个 设置字体颜色的 指令

```js
//使用：和内置指令使用一样
v-color="'green'"
/*
	区别：
	v-color="'green'"：此时green是颜色值
	v-color="green"：此时green是个变量，需要到data中去查找
*/
```

```js
Vue.directive('color', {
// 样式：只要通过指令绑定给了元素，不管这个元素有没有被插入到页面中去，这个元素肯定有了一个内联的样式
// 将来元素肯定会显示到页面中，这时候，浏览器的渲染引擎必然会解析样式，应用给这个元素
    bind: function (el, binding) {
        // el.style.color = 'red'
        // console.log(binding.name)
        // 和样式相关的操作，一般都可以在 bind 执行
        // console.log(binding.value)		//输出计算后的值
        // console.log(binding.expression)		//原样输出
        el.style.color = binding.value
      }
    })
```

自定义==行为指令==和==样式指令==的区别：

- 行为指令需要将内存中的元素渲染到DOM才能生效，在内存中不能生效，和JS行为有关的操作，最好在 `inserted` 中去执行，放置JS行为不生效
- 样式指令不用关心元素是否插入到`dom`中去，和样式相关的操作，一般都可以在 `bind` 执行

### 8.2私有指令

在`vm`中添加属性

```js
 directives: { // 自定义私有指令
        'fontweight': { // 设置字体粗细的
          bind: function (el, binding) {
            el.style.fontWeight = binding.value
          }
        },
        'fontsize': function (el, binding) { // 注意：这个 function 等同于把代码写到了 bind 和 update 中去
          el.style.fontSize = parseInt(binding.value) + 'px'
        }
      }
```







## 9.生命周期

```js
// 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {//初始化数据
        msg: 'ok'
      },
      methods: {//定义方法
        show() {
          console.log('执行了show方法')
        }
      },
//1. 这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
      beforeCreate() { 
        // console.log(this.msg)
        // this.show()
        // 注意：在beforeCreate生命周期函数执行的时候，data和methods中的数据都还没有没初始化
      },
//2. 这是遇到的第2个生命周期函数
      created() { 
        // console.log(this.msg)
        // this.show()
        //  在created中，data和methods都已经被初始化好了！
        // 如果要调用methods中的方法，或者操作data中的数据，最早，只能在created中操作
      },
//3. 这是遇到的第3个生命周期函数，表示模板已经在内存中编辑完成了，但是尚未把模板渲染到页面中
      beforeMount() { 
        // console.log(document.getElementById('h3').innerText)
        // 在beforeMount执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
      },
//4. 这是遇到的第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
      mounted() { 
        // console.log(document.getElementById('h3').innerText)
        // 注意：mounted是实例创建期间的最后一个生命周期函数，当执行完mounted就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例就静静的躺在我们的内存中，一动不动
      },
// 接下来的是运行中的两个事件
//5. 这时候，表示我们的界面还没有被更新【数据被更新了吗？  数据肯定被更新了】
      beforeUpdate() { 
        /* console.log('界面上元素的内容：' + document.getElementById('h3').innerText)
        console.log('data 中的 msg 数据是：' + this.msg) */
        // 得出结论： 当执行beforeUpdate的时候，页面中的显示的数据还是旧的，此时data数据是最新的，页面尚未和最新的数据保持同步
      },
//6. updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
      updated() {
        console.log('界面上元素的内容：' + document.getElementById('h3').innerText)
        console.log('data 中的 msg 数据是：' + this.msg)        
      }
    });
```



## 10.组件化

### 10.1创建组件的方式

#### 10.1.1方式1：

```js
<div id="app">
    <!-- 如果要使用组件，直接把组件的名称，以 HTML 标签的形式，引入到页面中即可 -->
    <mycom1></mycom1>
</div>
<script>
// 第一步：使用 Vue.extend 来创建全局的Vue组件  
    	var com1 = Vue.extend({
    	template: '<h3>这是使用 Vue.extend创建的组件</h3>' 
    		// 通过 template 属性，指定了组件要展示的HTML结构
    	})
    
// 第二步：使用 Vue.component('组件的名称', 创建出来的组件模板对象)注册为全局组件
    Vue.component('myCom1', com1)   
// 注：如果使用 Vue.component 定义全局组件的时候，组件名称使用了驼峰命名，则在引用组件的时候，需要把大写的驼峰改为小写的字母，同时，两个单词之前使用 - 链接；    
// 如果不使用驼峰,则直接拿名称来使用即可;
   Vue.component('mycom1', com1)
      
    // Vue.component：
      //第一个参数:组件的名称,将来在引用组件的时候,就是一个标签形式来引入它的
     // 第二个参数: Vue.extend创建的组件,其中template就是组件将来要展示的HTML内容
      
      //上面两步的简写形式：
    Vue.component('mycom1', Vue.extend({
      template: '<h3>这是使用 Vue.extend 创建的组件</h3>'
    }))
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
```

#### 10.1.2方式2：

```js
<div id="app">
    <!-- 还是使用标签形式,引入自己的组件 -->
    <mycom2></mycom2>
</div>
<script>
    // 注意:不论是哪种方式创建出来的组件,组件的template属性指向的模板内容,必须有且只能有唯一的一个根元素
    //第一个参数：组件的名称,将来在引用组件的时候,就是一个标签形式来引入它的
    //第二个参数：组件模板对象
    Vue.component('mycom2', {
      template: '<div><h3>这是直接使用 Vue.component 创建出来的组件</h3><span>123</span></div>'
    })
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```



#### 10.1.3方式3：

```js
<div id="app">
    <mycom3></mycom3>
<!--login是私有组件，只能用于app2-->
    <!-- <login></login> -->
</div>

  <div id="app2">
    <mycom3></mycom3>
    <login></login>
  </div>

  <!-- 在被控制的#app外面,使用template元素,定义组件的HTML模板结构 -->
  <template id="tmpl">
    <div>
      <h1>这是通过 template 元素,在外部定义的组件结构,这个方式有代码的提示和高亮</h1>
      <h4>好用,不错!</h4>
    </div>
  </template>

  <template id="tmpl2">
    <h1>这是私有的 login 组件</h1>
  </template>

  <script>
    Vue.component('mycom3', {
      template: '#tmpl'
    })

    // 创建 Vue 实例，得到 ViewModel
		//控制app的实列
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
		//控制app2的实例
    var vm2 = new Vue({
      el: '#app2',
      data: {},
      methods: {},
      filters: {},
      directives: {},
      components: { //定义实例内部私有组件
        login: {
          template: '#tmpl2'
        }
      },
		//生命周期函数
      beforeCreate() { },
      created() { },
      beforeMount() { },
      mounted() { },
      beforeUpdate() { },
      updated() { },
      beforeDestroy() { },
      destroyed() { }
    })
  </script>
```

#### 10.1.4创建组件的方式：字面量语法

```js
<div id="app">
    <!-- <mylogin></mylogin> -->
<login></login>
</div>
<script>
    // 1.定义组件的时候，如果要定义全局的组件， Vue.component('组件的名称', {})
    // 2.通过对象字面量的形式， 定义了一个组件模板对象
    var login = {
      template: '<h1>1234</h1>'
    }
    // 通过Vue.component把组件模板对象，注册为一个全局的Vue组件，同时：为这个组件起了一个名称，可以让我们通过标签形式，在页面中直接引入这个组件
    // Vue.component('mylogin', login)

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        // '组件的名称': 组件的模板对象
        // 'mylogin': login
        //简写形式，解析时，属性（组件名称）为login，模板对象也为login
        login
      }
    });
</script>
```



### 10.2组件中的data和methods

```js
<div id="app">
    <mycom1></mycom1>
</div>
<script>
  /*
     1. 组件可以有自己的 data 数据
   	 2. 组件的 data 和 实例的 data 有点不一样,实例中的 data 可以为一个对象,但是组件中的 data 必须是一个方法
     3. 组件中的 data 除了必须为一个方法之外,这个方法内部,还必须返回一个对象才行;
     4. 组件中的data 数据,使用方式和实例中的 data 使用方式完全一样!!!
  */
    Vue.component('mycom1', {
  		//组件中的模板
      template: '<h1>这是全局组件 --- {{msg}}</h1>',
  		//组件中的数据
      data: function () {
        return {
          msg: '这是组件的中data定义的数据'
        }
      },
  		//组件中的方法
  		methods:{}
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```

#### 10.2.1必须在data中返回对象的原因:

原因是在于Vue让每个组件对象都返回一个新的对象，因为如果是同一个对象的，组件在多次使用后会相互影响。

```js
<div id="app">
    <counter></counter>
    <hr>
    <counter></counter>
    <hr>
    <counter></counter>
</div>

  <template id="tmpl">
    <div>
      <input type="button" value="+1" @click="increment">
      <h3>{{count}}</h3>
    </div>
  </template>

<script>
//这个数据是共享的，在页面上引用的三个会同时变化，因为是对象，所以指向同一个地址，数据修改的是同一个对象
    var dataObj = { count: 0 }

    // 这是一个计数器的组件, 身上有个按钮,每当点击按钮,让 data 中的 count 值 +1
    Vue.component('counter', {
      template: '#tmpl',
      data: function () {
        // return dataObj
//每次引用都会返回此数据，保证页面上每个引用互不影响
        return { count: 0 }
      },
      methods: {
        increment() {
          this.count++
        }
      }
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```

### 10.3组件的切换

#### 10.3.1两个组件的切换

```js
<div id="app">
    <a href="" @click.prevent="flag=true">登录</a>
    <a href="" @click.prevent="flag=false">注册</a>
//当flag为true时显示登陆，当flag为false时显示注册。
    <login v-if="flag"></login>
    <register v-else="flag"></register>
</div>
<script>
    Vue.component('login', {
      template: '<h3>登录组件</h3>'
    })

    Vue.component('register', {
      template: '<h3>注册组件</h3>'
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false
      },
      methods: {}
    });
</script>
```

#### 10.3.2多组件切换

```js
<div id="app">
  //通过赋值展示对应的组件
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>

    <!-- Vue提供了 component ,来展示对应名称的组件 -->
    <!-- component 是一个占位符。:is 属性,可以用来指定要展示的组件的名称 -->
      <!--属性绑定后的当作变量解析，如果是组件名称字符串，需要在加单引号-->
    <component :is="comName"></component>

    <!-- 总结:当前学习了几个 Vue 提供的标签：-->
    <!-- component,  template,  transition,  transitionGroup  -->

  </div>

  <script>
    // 组件名称是字符串
    Vue.component('login', {
      template: '<h3>登录组件</h3>'
    })

    Vue.component('register', {
      template: '<h3>注册组件</h3>'
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        comName: 'login' // 当前 component 中的 :is 绑定的组件的名称
      },
      methods: {}
    });
  </script>
```

### 10.4组件通信

#### 10.4.1父组件向子组件传值

```js
<div id="app">
    <!--第一步： 父组件可以在引用子组件的时候，通过属性绑定（v-bind:）的形式, 把需要传递给子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用 -->
      //com1是父组件引用
      //parentmsg为自定义属性，将msg数据传递给子组件
    <com1 :parentmsg="msg"></com1>
</div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '123 啊-父组件中的数据'
      },
      methods: {},
      components: {//这是子组件，无法访问vm中data的数据
        // 结论：经过演示发现,子组件中，默认无法访问到父组件中的 data 上的数据和 methods 中的方法
        com1: {
          data() { // 注意： 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如：子组件通过Ajax ，请求回来的数据，都可以放到 data 身上；
            // data 上的数据，都是可读可写的；
            return {
              title: '123',
              content: 'qqq'
            }
          },
          //在子组件定义了后使用传递过来的数据使用方式：与父组件使用方式一样
          template: '<h1 @click="change">这是子组件 --- {{ parentmsg }}</h1>',
          // 注意： 组件中的所有 props 中的数据，都是通过父组件传递给子组件的
          // props 中的数据，都是只读的，无法重新赋值
          props: ['parentmsg'], // 第二步：把父组件传递过来的 parentmsg 属性，先在 props 数组中，定义一下，这样，才能使用这个数据
          directives: {},
          filters: {},
          components: {},
          methods: {
            change() {
              this.parentmsg = '被修改了'
            }
          }
        }
      }
    });
  </script>
```

#### 10.4.2子组件向父组件传递方法（参数）

```js
<body>

<!--父组件模板-->
<div id="app">
  <!-- 父组件监听子组件抛出的自定义事件item-click，监听到时就执行父组件的 cpnClick方法-->
  <cpn @item-click="cpnClick"></cpn>
</div>

<!--子组件模板-->
<template id="cpn">
  <div>
    <!-- @为监听某个事件，此时监听子组件的click事件，当监听到click事件时，执行 btnClick(item)方法-->
    <button v-for="item in categories"
            @click="btnClick(item)">
      {{item.name}}
    </button>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>

  // 子组件
  const cpn = {
    template: '#cpn',
    data() {
      return {
        categories: [
          {id: 'aaa', name: '热门推荐'},
          {id: 'bbb', name: '手机数码'},
          {id: 'ccc', name: '家用家电'},
          {id: 'ddd', name: '电脑办公'},
        ]
      }
    },
    methods: {
      btnClick(item) {
        // 发射事件: 自定义事件
        //1.子组件向外抛出一个自定义事件 item-click ,第二个参数为向外传递的参数
        this.$emit('item-click', item)
      }
    }
  }

  // 父组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn
    },
    methods: {
      cpnClick(item) {
        console.log('cpnClick', item);
      }
    }
  })
</script>

</body>
```

#### 10.4.3组件通信案例

```js
<body>

<div id="app">
  <cpn :number1="num1"
       :number2="num2"
       @num1change="num1change"
       @num2change="num2change"/>
</div>

<template id="cpn">
  <div>
    <h2>props:{{number1}}</h2>
    <h2>data:{{dnumber1}}</h2>
    <!--<input type="text" v-model="dnumber1">-->
    <input type="text" :value="dnumber1" @input="num1Input">
    <h2>props:{{number2}}</h2>
    <h2>data:{{dnumber2}}</h2>
    <!--<input type="text" v-model="dnumber2">-->
    <input type="text" :value="dnumber2" @input="num2Input">
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      num1: 1,
      num2: 0
    },
    methods: {
      num1change(value) {
        this.num1 = parseFloat(value)
      },
      num2change(value) {
        this.num2 = parseFloat(value)
      }
    },
    components: {
      cpn: {
        template: '#cpn',
        props: {
          number1: Number,
          number2: Number
        },
        data() {
          return {
            dnumber1: this.number1,
            dnumber2: this.number2
          }
        },
        methods: {
          num1Input(event) {
            // 1.将input中的value赋值到dnumber中
            this.dnumber1 = event.target.value;

            // 2.为了让父组件可以修改值, 发出一个事件
            this.$emit('num1change', this.dnumber1)

            // 3.同时修饰dnumber2的值
            this.dnumber2 = this.dnumber1 * 100;
            this.$emit('num2change', this.dnumber2);
          },
          num2Input(event) {
            this.dnumber2 = event.target.value;
            this.$emit('num2change', this.dnumber2)

            // 同时修饰dnumber2的值
            this.dnumber1 = this.dnumber2 / 100;
            this.$emit('num1change', this.dnumber1);
          }
        }
      }
    }
  })
</script>
</body>
```

实现方式2：

```js
<body>

<div id="app">
  <cpn :number1="num1"
       :number2="num2"
       @num1change="num1change"
       @num2change="num2change"/>
</div>

<template id="cpn">
  <div>
    <h2>props:{{number1}}</h2>
    <h2>data:{{dnumber1}}</h2>
    <input type="text" v-model="dnumber1">
    <h2>props:{{number2}}</h2>
    <h2>data:{{dnumber2}}</h2>
    <input type="text" v-model="dnumber2">
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      num1: 1,
      num2: 0
    },
    methods: {
      num1change(value) {
        this.num1 = parseFloat(value)
      },
      num2change(value) {
        this.num2 = parseFloat(value)
      }
    },
    components: {
      cpn: {
        template: '#cpn',
        props: {
          number1: Number,
          number2: Number,
          name: ''
        },
        data() {
          return {
            dnumber1: this.number1,
            dnumber2: this.number2
          }
        },
        watch: {
          dnumber1(newValue) {
            this.dnumber2 = newValue * 100;
            this.$emit('num1change', newValue);
          },
          dnumber2(newValue) {
            this.number1 = newValue / 100;
            this.$emit('num2change', newValue);
          }
        }
      }
    }
  })
</script>
</body>
```

### 10.5父子组件的访问

#### 10.5.1父组件访问子组件

使用`$children`或`$refs reference`(引用)

`this.$children`是一个数组类型，它包含所有子组件对象。

`$children`的缺陷：

- 通过`$children`访问子组件时，是一个数组类型，访问其中的子组件必须通过索引值。

- 但是当子组件过多，我们需要拿到其中一个时，往往不能确定它的索引值，甚至还可能会发生变化。

- 有时候，我们想明确获取其中一个特定的组件，这个时候就可以使用$refs

`$refs`的使用：

- `$refs`和`ref`指令通常是一起使用的。

- 首先，我们通过`ref`给某一个子组件绑定一个特定的ID。

- 其次，通过this.$refs.ID就可以访问到该组件了。

#### 10.5.2子组件访问父组件

子组件访问父组件：使用`$parent`

注意事项：

- 尽管在Vue开发中，我们允许通过$parent来访问父组件，但是在真实开发中尽量不要这样做。
- 子组件应该尽量避免直接访问父组件的数据，因为这样耦合度太高了。
- 如果我们将子组件放在另外一个组件之内，很可能该父组件没有对应的属性，往往会引起问题。
- 另外，更不好做的是通过$parent直接修改父组件的状态，那么父组件中的状态将变得飘忽不定，很不利于我的调试和维护。

### 10.6非父子组件通信

刚才我们讨论的都是父子组件间的通信，那如果是非父子关系呢?

非父子组件关系包括多个层级的组件，也包括兄弟组件的关系。

在Vue1.x的时候，可以通过`$dispatch`和`$broadcast`完成

`$dispatch`用于向上级派发事件

`$broadcast`用于向下级广播事件

但是在Vue2.x都被取消了

在Vue2.x中，有一种方案是通过**中央事件总线**，也就是一个中介来完成。

但是这种方案和直接使用`Vuex`的状态管理方案还是逊色很多。

并且`Vuex`提供了更多好用的功能，所以这里我们暂且不讨论这种方案，后续我们专门学习`Vuex`的状态管理。

## 11.插槽

如何封装合适呢？抽取共性，保留不同。

- 最好的封装方式就是将共性抽取到组件中，将不同暴露为插槽。

- 一旦我们预留了插槽，就可以让使用者根据自己的需求，决定插槽中插入什么内容。

- 是搜索框，还是文字，还是菜单。由调用者自己来决定。

### 11.1slot基本使用

`<slot>`中的内容表示，如果没有在该组件中插入任何其他内容，就默认显示该内容

```js
<!--
1.插槽的基本使用 <slot></slot>
2.插槽的默认值 <slot>button</slot>
3.如果有多个值, 同时放入到组件进行替换时, 一起作为替换元素
-->
<div id="app">
  <cpn></cpn>
  <cpn><span>哈哈哈</span></cpn>
  <cpn><i>呵呵呵</i></cpn>
  <cpn>
    <i>呵呵呵</i>
    <div>我是div元素</div>
    <p>我是p元素</p>
  </cpn>
</div>
<template id="cpn">
  <div>
    <h2>我是组件</h2>
    <p>我是组件, 哈哈哈</p>
    <slot><button>按钮</button></slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn'
      }
    }
  })
</script>
```

### 11.2具名插槽slot

当子组件的功能复杂时，子组件的插槽可能并非是一个。

- 比如我们封装一个导航栏的子组件，可能就需要三个插槽，分别代表左边、中间、右边。

- 那么，外面在给插槽插入内容时，如何区分插入的是哪一个呢？

- 这个时候，我们就需要给插槽起一个名字

如何使用具名插槽呢？

- 非常简单，只要给slot元素一个name属性即可

```js
<slot name='myslot'></slot>
```

示例

```js
<div id="app">
  <cpn><span slot="center">标题</span></cpn>
  <cpn><button slot="left">返回</button></cpn>
</div>
<template id="cpn">
  <div>
    <slot name="left"><span>左边</span></slot>
    <slot name="center"><span>中间</span></slot>
    <slot name="right"><span>右边</span></slot>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn'
      }
    }
  })
</script>
```

### 11.3作用域插槽



```js
<div id="app">
  <cpn></cpn>

  <cpn>
    <!--目的是获取子组件中的pLanguages-->
    <template slot-scope="slot">
      <!--<span v-for="item in slot.data"> - {{item}}</span>-->
      <span>{{slot.data.join(' - ')}}</span>
    </template>
  </cpn>

  <cpn>
    <!--目的是获取子组件中的pLanguages-->
    <template slot-scope="slot">
      <!--<span v-for="item in slot.data">{{item}} * </span>-->
      <span>{{slot.data.join(' * ')}}</span>
    </template>
  </cpn>
  <!--<cpn></cpn>-->
</div>

<template id="cpn">
  <div>
    <slot :data="pLanguages">
      <ul>
        <li v-for="item in pLanguages">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            pLanguages: ['JavaScript', 'C++', 'Java', 'C#', 'Python', 'Go', 'Swift']
          }
        }
      }
    }
  })
</script>
```

## 12.前端模块化

### 12.1全局变量同名问题

使用匿名函数解决重名问题

```js
(function () {
  var flag = false
})()
```

### 12.2使用模块作为出口

我们可以使用将需要暴露到外面的变量，使用一个模块作为出口

步骤：

- 非常简单，在匿名函数内部，定义一个对象。
- 给对象添加各种需要暴露到外面的属性和方法(不需要暴露的直接定义即可)。
- 最后将这个对象返回，并且在外面使用了一个MoudleA接受。

使用：

- 我们只需要使用属于自己模块的属性和方法即可

常见的模块化规范：

CommonJS、AMD、CMD，也有ES6的Modules

```js
var moduleA = (function () {
  // 导出的对象
  var obj = {}

  // 小明
  var name = '小明'
  var age = 22

  function sum(num1, num2) {
    return num1 + num2
  }

  var flag = true

  if (flag) {
    console.log(sum(10, 20));
  }

  obj.flag = flag;
  obj.sum = sum;

  return obj
})()
```

使用

```js
;(function () {
  // 1.想使用flag
  if (moduleA.flag) {
    console.log('小明是天才, 哈哈哈');
  }

  // 2.使用sum函数
  console.log(moduleA.sum(40, 50));
})()

```

## 13.vue-cli脚手架

### 13.1划分目录结构

```js
public	//放置静态资源
	--index.html		//静态网页
	--favicon.ico		//静态网页所需要的图标
/*开发资源文件夹*/
src		
	/*1.放置图片 样式 字体图标 等资源*/
	--assets	
		--css		//全局样式
    	--normalize.css//css初始化
			--base.css//项目全局样式，需要引入normalize.css
		--fonts	//字体图标
		--image	//图片文件
    
  /*2.放置公共组件*/
	--components	
		--common  //放置封装好的组件，其他项目也可以使用的组件
    	--tabbar//导航组件
    --content //放置当前项目的一些公共组件，与业务相关
	/*3.放置视图相关组件*/
	--views 
  	--home	//首页视图
    --category//
	/*4.放置路由*/
  --router
  	--index.js
		--routes.js
  /*5.共享数据*/
  --store
  /*6.放置网络请求相关*/
  --network
  /*7.放置工具方法类*/
  --common(utils)
		--const.js//放置公共常量
    --utils.js//放置公共方法
		--mixin.js//放置混入相关
	/*8.第三方组件的封装*/
	--plugins	
		--element.js		//ui插件
	--App.vue		//组件入口文件,也叫根组件
	--main.js		//打包入口/项目入口文件
```

## 14.组件基础

### 14.1基本实例

这里有一个 Vue 组件的示例：

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `<button-counter>`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

### 14.2组件的复用

你可以将组件进行任意次数的复用：

```js
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

#### 14.2.1`data`必须是一个函数

当我们定义这个 `<button-counter>` 组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：

```js
data: {
  count: 0
}
```

取而代之的是，**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

如果 Vue 没有这条规则，点击一个按钮就可能会像如下代码一样影响到*其它所有实例*：

### 14.3组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。至此，我们的组件都只是通过 `Vue.component` 全局注册的：

```js
Vue.component('my-component-name', {
  // ... options ...
})
```

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

### 14.4通过 Prop 向子组件传递数据

早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 prop 列表中：

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义 attribute 传递进来：

```html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

然而在一个典型的应用中，你可能在 `data` 里有一个博文的数组：

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

并想要为每篇博文渲染一个组件：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

如上所示，你会发现我们可以使用 `v-bind` 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，比如[从一个 API 获取博文列表](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-component-blog-post-example)的时候，是非常有用的。

### 14.5单个根元素

当构建一个 `<blog-post>` 组件时，你的模板最终会包含的东西远不止一个标题：

```html
<h3>{{ title }}</h3>
```

最最起码，你会包含这篇博文的正文：

```html
<h3>{{ title }}</h3>
<div v-html="content"></div>
```

然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 **every component must have a single root element (每个组件必须只有一个根元素)**。你可以将模板的内容包裹在一个父元素内，来修复这个问题，例如：

```html
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```

所以是时候重构一下这个 `<blog-post>` 组件了，让它变成接受一个单独的 `post` prop：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```

现在，不论何时为 `post` 对象添加一个新的 property，它都会自动地在 `<blog-post>` 内可用。

### 14.6监听子组件事件

在我们开发 `<blog-post>` 组件时，它的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号。

在其父组件中，我们可以通过添加一个 `postFontSize` 数据 property 来支持这个功能：

```js
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
```

它可以在模板中用来控制所有博文的字号：

```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
```

现在我们在每篇博文正文之前添加一个按钮来放大字号：

```html
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
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

当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好 Vue 实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理 native DOM 事件一样通过 `v-on` 监听子组件实例的任意事件：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```

同时子组件可以通过调用内建的 [**`$emit`** 方法](https://cn.vuejs.org/v2/api/#vm-emit)并传入事件名称来触发一个事件：

```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

有了这个 `v-on:enlarge-text="postFontSize += 0.1"` 监听器，父级组件就会接收该事件并更新 `postFontSize` 的值。

#### 14.6.1使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>

```

或者，如果这个事件处理函数是一个方法：

```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

那么这个值将会作为第一个参数传入这个方法：

```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

#### 14.6.2在组件上使用V-mode1

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```html
<input v-model="searchText">
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model` 则会这样：

```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

### 14.7通过插槽分发内容

和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

```html
<alert-box>
  Something bad happened.
</alert-box>
```

幸好，Vue 自定义的 `<slot>` 元素让这变得非常简单：

```html
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

如你所见，我们只要在需要的地方加入插槽就行了——就这么简单！

### 14.8动态组件

### 14.9组件注册

#### 14.9.1组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
Vue.component('my-component-name', { /* ... */ })
```

该组件名就是 `Vue.component` 的第一个参数。

你给予组件的名字可能依赖于你打算拿它来做什么。当直接在 DOM 中使用一个组件 (而不是在字符串模板或[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)) 的时候，我们强烈推荐遵循 [W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

定义组件名的方式有两种：

> 使用 kebab-case

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

> 使用 PascalCase

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

#### 14.9.2全局注册

到目前为止，我们只用过 `Vue.component` 来创建组件：

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

这些组件是**全局注册的**。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (`new Vue`) 的模板中。比如：

```js
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })

```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

在所有子组件中也是如此，也就是说这三个组件*在各自内部*也都可以相互使用。

#### 14.9.3局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```

然后在 `components` 选项中定义你想要使用的组件：

```js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

注意**局部注册的组件在其子组件中\*不可用\***。例如，如果你希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

```js
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

注意在 ES2015+ 中，在对象中放一个类似 `ComponentA` 的变量名其实是 `ComponentA: ComponentA` 的缩写，即这个变量名同时是：

- 用在模板中的自定义元素的名称
- 包含了这个组件选项的变量名

#### 14.9.4模块系统

> 在模块系统中局部注册

如果你还在阅读，说明你使用了诸如 Babel 和 webpack 的模块系统。在这些情况下，我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。

然后你需要在局部注册之前导入每个你想使用的组件。例如，在一个假设的 `ComponentB.js` 或 `ComponentB.vue` 文件中：

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```

现在 `ComponentA` 和 `ComponentC` 都可以在 `ComponentB` 的模板中使用了。

> 基础组件的自动化全局注册

可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)，它们会在各个组件中被频繁的用到。

所以会导致很多组件里都会有一个包含基础组件的长列表：

```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

而只是用于模板中的一小部分：

```js
<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>
```

如果你恰好使用了 webpack (或在内部使用了 webpack 的 [Vue CLI 3+](https://github.com/vuejs/vue-cli))，那么就可以使用 `require.context` 只全局注册这些非常通用的基础组件。这里有一份可以让你在应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

记住**全局注册的行为必须在根 Vue 实例 (通过 `new Vue`) 创建之前发生**。

### 14.10prop

#### 14.10.1Prop 的大小写（camelCase vs kebab-case）

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

重申一次，如果你使用字符串模板，那么这个限制就不存在了。

#### 14.10.2Prop类型

到这里，我们只看到了以字符串数组形式列出的 prop：

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
  contactsPromise: Promise // or any other constructor
}
```

#### 14.10.3传递静态或动态Prop

像这样，你已经知道了可以像这样给 prop 传入一个静态的值：

```html
<blog-post title="My journey with Vue"></blog-post>
```

你也知道 prop 可以通过 `v-bind` 动态赋值，例如：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```

在上述两个示例中，我们传入的值都是字符串类型的，但实际上*任何*类型的值都可以传给一个 prop。

> 传入一个数字

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

> 传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

> 传入一个数组

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

> 传入一个对象

```html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```

> 传入一个对象的所有 property

如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

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
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

#### 14.10.4单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

   ```js
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```

2. **这个 prop 以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

#### 14.10.5prop验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
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
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

> 注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。

`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

额外的，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```js
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

来验证 `author` prop 的值是否是通过 `new Person` 创建的。

#### 14.10.6非Prop的Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

例如，想象一下你通过一个 Bootstrap 插件使用了一个第三方的 `<bootstrap-date-input>` 组件，这个插件需要在其 `<input>` 上用到一个 `data-date-picker` attribute。我们可以将这个 attribute 添加到你的组件实例上：

```html
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```

然后这个 `data-date-picker="activated"` attribute 就会自动添加到 `<bootstrap-date-input>` 的根元素上。

> 替换/合并已有的Attribute

想象一下 `<bootstrap-date-input>` 的模板是这样的：

```html
<input type="date" class="form-control">
```

为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：

```html
<bootstrap-date-input
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>
```

在这种情况下，我们定义了两个不同的 `class` 的值：

- `form-control`，这是在组件的模板内设置好的
- `date-picker-theme-dark`，这是从组件的父级传入的

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 `type="text"` 就会替换掉 `type="date"` 并把它破坏！庆幸的是，`class` 和 `style` attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：`form-control date-picker-theme-dark`。

> 禁用Attribute 继承

如果你**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```js
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

这尤其适合配合实例的 `$attrs` property 使用，该 property 包含了传递给一个组件的 attribute 名和 attribute 值，例如：

```js
{
  required: true,
  placeholder: 'Enter your username'
}
```

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)的时候是常会用到的：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：

```js
<base-input
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>
```

### 14.11自定义事件

#### 14.11.1事件名

不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个 camelCase 名字的事件：

```
this.$emit('myEvent')
```

则监听这个名字的 kebab-case 版本是不会有任何效果的：

```
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```

不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent` 不可能被监听到。

因此，我们推荐你**始终使用 kebab-case 的事件名**。

#### 14.11.2自定义组件的v-mode1

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用 `v-model` 的时候：

```
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的 `lovingVue` 的值将会传入这个名为 `checked` 的 prop。同时当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的 property 将会被更新。

>  注意你仍然需要在组件的 `props` 选项里声明 `checked` 这个 prop。

#### 14.11.3将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```
<base-input v-on:focus.native="onFocus"></base-input>
```

在有的时候这是很有用的，不过在你尝试监听一个类似 `<input>` 的非常特定的元素时，这并不是个好主意。比如上述 `<base-input>` 组件可能做了如下重构，所以根元素实际上是一个 `<label>` 元素：

```
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

这时，父级的 `.native` 监听器将静默失败。它不会产生任何报错，但是 `onFocus` 处理函数不会如你预期地被调用。

为了解决这个问题，Vue 提供了一个 `$listeners` property，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：

```
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```

有了这个 `$listeners` property，你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 `<input>` 的你希望它也可以配合 `v-model` 工作的组件来说，为这些监听器创建一个类似下述 `inputListeners` 的计算属性通常是非常有用的：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

现在 `<base-input>` 组件是一个**完全透明的包裹器**了，也就是说它可以完全像一个普通的 `<input>` 元素一样使用了：所有跟它相同的 attribute 和监听器都可以工作，不必再使用 `.native` 监听器。

14.11.4`.sync` 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```js
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```js
<text-document v-bind:title.sync="doc.title"></text-document>
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。