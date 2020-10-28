## 1.vue实例

### 1.1创建一个Vue实例

每个 Vue 应用都是通过用**`Vue` 构造函数**创建一个新的 **Vue 实例**开始的：

```js
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 **MVVM 模型**，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个**选项对象**。

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

```js
根实例
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

> 所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。

### 1.2数据与方法

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 `property `加入到 Vue 的**响应式系统**中。当这些 `property` 的值发生改变时，视图将会产生**响应**，即匹配更新为新的值。

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

当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 `data` 中的 `property` 才是**响应式**的。也就是说如果你添加一个新的 `property`，比如：

```js
vm.b = 'hi'
```

那么对 `b` 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

```js
data: {
  newTodoText: '',//将来是字符串
  visitCount: 0,//将来是数值
  hideCompletedTodos: false,//将来是布尔值
  todos: [],//将来是数组
  error: null//将来是对象
}
```

除了数据 property，Vue 实例还暴露了一些有用的**实例 property 与方法**。它们都有前缀 `$`，以便与用户定义的 property 区分开来。例如：

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

### 1.3实例生命周期钩子

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 `created` 钩子可以用来在一个实例被创建之后执行代码：

```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。

> 不要在选项 property 或回调上使用**箭头函数**，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

## 2.vue指令

指令是以`V-`开头的（使用指令需要`v-`开头，自定义指令时则不需要加前缀`v-`），并且都在==开始标签==属性中添加。

### 2.1 mustache语法

叫插值表达式，用于文本插值，直接在标签内部使用。**插值表达式前后内容不会被替换**

```html
div>{{msg}}</div>
```

无论何时，绑定的数据对象`msg` property 发生了改变，插值处的内容都会更新。

缺点：网速慢会有==闪烁==问题

通过使用 `v-once `指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

### 2.2v-cloak

放在开始标签内和插值表达式搭配使用，然后给这个属性定义样式。==解决插值表达式闪烁问题==

==原理==：没有请求到数据时，隐藏这个属性的标签，接收到数据时，就移除这个属性。

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

### 2.3v-text

`v-text`会覆盖元素中原本的内容。但是==插值表达式==只会==替换==自己的这个==占位符==，不会把整个元素的内容清空 。

用于将数据解析成==文本格式==，包括`html`标签

```html
<!--中间内容会被替换掉-->
<h4 v-text="msg">=============</h4s>
```

### 2.4v-html

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` 指令。

存在安全问题。

```html
<h4 v-html="msg">=============</h4>
```

### 2.5v-once

该指令表示元素和组件==只渲染一次==，不会随着数据的改变而改变。

该指令后面不需要跟任何表达式。

### 2.6v-pre

`v-pre`用于==跳过==这个元素和它子元素的==编译过程==，用于显示原本的Mustache语法。

### 2.7v-bind

用于==动态绑定HTML属性==

简写 `:要绑定的属性`

v-bind 中，可以写合法的JS表达式，因为是动态计算所绑定的值。

```html
<!--v-bind告诉浏览器mytitle是变量-->
<input  v-bind:title="mytitle">

<!--v-bind告诉浏览器"mytitle + '123'"是表达式来解析-->
<!--123如果不加引号将会当作变量来解析-->
<input  :title="mytitle + '123'">

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

- 参数：

指令能够接收一个**参数**，在指令名称之后**以冒号表示**。例如，`v-bind` 指令可以用于响应式地更新 HTML attribute：

```html
<a v-bind:href="url">...</a>
```

在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` attribute 与表达式 `url` 的值绑定。

### 2.8v-on

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

- 如果该方法不需要额外参数，那么方法后的`()`可以不添加

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

- 如果方法本身中有一个参数，那么会默认将原生事件`event`参数传递进去

```js
<!--
2.在事件定义时, 写方法时省略了小括号, 但是方法本身是需要一个参数的, 这个时候, Vue会默认将浏览器产生的event事件对象作为参数传入到方法
-->
<button @click="btn2Click">按钮2</button>
methods:{
//该方法需要接收参数
//此时event为传递过来的原生事件
 btn2Click(event) {
        console.log(event);
      }
}
```

- 如果需要传入某个参数，同时需要`event`时，可以通过`$event`传入事件

```js
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

- 动态参数

你可以使用动态参数为一个动态的事件名绑定处理函数：

```js
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

### 2.9v-model

`v-bind` 只能实现数据的单向绑定（也就是将data中的数据渲染到页面上），从 M 自动绑定到 V， 无法实现数据的双向绑定（即不能从`V`到`M`的绑定)

使用  `v-model` 指令，可以实现`表单元素`和 `Model 中数据`的`双向数据绑定`

> 注意： **==v-model 只能运用在表单元素中==**

`input(radio, text, address, email....)select checkbox textarea`

#### 2.9.1v-model原理

`v-model`其实是一个语法糖，它的背后本质上是包含两个操作：

1. `v-bind`绑定一个`value`属性（M=>V）

2. `v-on`指令给当前元素绑定`input`事件(V=>M)

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

#### 2.9.2v-model结合radio使用

绑定的是`value`值。

说明：

1. 表单类型`radio`元素只有在`name`相同时，才会产生互斥。但是使用`v-model`指令也会实现互斥。

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

#### 2.9.3v-model结合**checkbox**使用

复选框分为两种情况：单个勾选框和多个勾选框

- 单个勾选框：

  - `v-model`即为布尔值。
  - 此时`input`的`value`并不影响`v-model`的值。


```HTML
<!--1.checkbox单选框-->
<label for="agree"> 
   <input type="checkbox" id="agree" v-model="isAgree" />同意协议 
</label>
<!--使用：属性绑定，让isAgree为一个动态计算的变量值，而不是固定的字符串值“isAgree” -->
<button :disabled="!isAgree">下一步</button>
```

```JS
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
<!--因为v-model绑定的是hobbies数组-->
<label v-for="item in originHobbies" :for="item"> 
<input type="checkbox" :value="item" :id="item" v-model="hobbies" />{{item}} 
</label>
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

#### 2.9.4v-model结合**select**使用

- **单选：只能选中一个值**

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

- **多选：可以选中多个值**

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

#### 2.9.5v-model修饰符

- `lazy`修饰符：

默认情况下，`v-model`默认是在`input`事件中同步输入框的数据。

也就是说，一旦有数据发生改变，对应的`data`中的数据就会自动发生改变。

`lazy`修饰符可以让数据在==失去焦点或者回车时才会更新==

```html
<!--1.修饰符: lazy-->
<input type="text" v-model.lazy="message">
<h2>{{message}}</h2>
```

- `number`修饰符：

默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当做字符串类型进行处理。

但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理。

`number`修饰符可以让在输入框中==输入的内容自动转成数字类型==

```html
<!--2.修饰符: number-->
<input type="number" v-model.number="age">
<h2>{{age}}-{{typeof age}}</h2>
```

- `trim`修饰符：

如果输入的内容首尾有很多空格，通常我们希望将其去除

`trim`修饰符可以==过滤内容左右两边的空格==

```html
<!--3.修饰符: trim-->
<input type="text" v-model.trim="name">
<h2>您输入的名字:{{name}}</h2>
```

### 2.10动态参数

可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
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

- 对动态参数值的约束

**动态参数预期会求出一个字符串，异常情况下值为 `null`**。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

- 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

> 变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

## 3.计算属性和侦听器

对于任何复杂逻辑，你都应当使用**计算属性**。

1. 在 `computed` 中，可以定义一些属性，这些属性叫做【计算属性】， 计算属性的本质就是一个方法，只不过，我们在使用这些计算属性的时候，是把它们的名称，直接当作属性来使用的；并不会把计算属性当作方法去调用；
2. 注意1： 计算属性在引用的时候，一定不要加 `()` 去调用，直接把它当作普通属性去使用就好了；
3. 注意2： 只要计算属性，这个 function 内部，所用到的任何 data 中的数据发生了变化，就会立即重新计算这个计算属性的值；
4. 注意3： 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果计算属性方法中，所使用的任何数据，都没有发生过变化，则不会重新对计算属性求值；

### 3.1基础用法

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
      //计算属性必须要有返回值
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

> **注：计算属性在最后必须返回一个值**

### 3.2计算属性缓存VS方法

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
<!--在插值表达式中调用方法，需要加()调用-->
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

### 3.3计算属性VS侦听属性

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

### 3.4计算属性的 setter

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

### 3.5侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时**执行异步**或开销较大的操作时，这个方式是最有用的。

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
    // 如果 question 发生改变，这个函数就会运行
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

## 4.class和style绑定

### 4.1 class

使用方式：**需要使用`bind指令`绑定类名**

绑定`class`有两种方式：

- 对象语法

- 数组语法

#### 4.1.1对象语法

语法：

```html
<h2 v-bind:class="{key1: value1, key2: value2}">{{message}}</h2>
<!--由于类名是对象的键，因此可以省略引号-->
<!--键值可以写变量（变量值也需要是Boolean值），也可以直接写Boolean值-->
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

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的**计算属性**。这是一个常用且强大的模式：

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
    //必须返回对象
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

#### 4.1.2数组语法

数组中可以写==变量==，也可以写==类名字符串==

用法介绍：

```html
<!--用法一：直接通过[]绑定一个类-->
	<!--此时active是类名字符串-->
<h2 :class="['active']">Hello World</h2>
	<!--此时 active line都是在data中定义的变量，变量的值为类名字符串-->
<h2 :class="[active, line]">{{message}}</h2>
	data{
		active: 'aaaaaa',
    line: 'bbbbbbb'
	}
<!--用法二：也可以传入多个值,绑定多个类-->
<h2 :class="[‘active’, 'line']">Hello World</h2>
                               
<!--用法三：和普通的类同时存在，并不冲突-->
<!--注：会有title/active/line三个类-->
<h2 class="title" :class="[‘active’, 'line']">Hello World</h2>

<!--用法四：如果过于复杂，可以放在一个methods或者computed中-->
<!--注：classes是一个计算属性-->
<h2 class="title" :class="classes">Hello World</h2>
<!--getClasses()是一个方法，必须加括号进行调用-->
<h2 class="title" :class="getClasses()">{{message}}</h2>
	methods: {
          getClasses: function() {
          //返回的是数组
            return [this.active, this.line]
          }
        }
<!--用法五：在数组中使用三元表达式，进行按需添加类-->
<h1 :class="['thin', 'italic', flag?'active':'']">这是一个很大很大的H1</h1>
<!--用法六：在数组中使用 对象来代替三元表达式，提高代码的可读性-->
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

#### 4.1.3用在组件上

当在一个自定义组件上使用 `class` property 时，==这些 class 将被添加到该组件的**根元素**上面==。这个元素上已经存在的 class 不会被覆盖。

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

### 4.2 style

在写CSS属性名的时候，比如`font-size`

- 我们可以使用==驼峰式== (camelCase) `fontSize` 

- 或短横线分隔 (kebab-case，记得用==单引号==括起来)`"font-size"` 

#### 4.2.1对象语法

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

- 语法： 

```html
<h2 :style="{key(属性名): value(属性值)}">{{message}}</h2>
```

- 用法示例：

```html
<!--'50px'必须加上单引号, 否则是当做一个变量去解析-->
<h2 :style="{fontSize: '50px'}">{{message}}</h2>
<!--finalSize当成一个变量使用-->
<h2 :style="{fontSize: finalSize}">{{message}}</h2>
<h2 :style="{fontSize: finalSize + 'px', backgroundColor: finalColor}">{{message}}</h2>
<!--可以是计算属性或方法-->
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

#### 4.2.2数组语法

`v-bind:style` 的数组语法可以将多个**样式对象**应用到同一个元素上：

```html
<h2 :style="[baseStyle, baseStyle1]">{{message}}</h2>
```

```js
data: {
	//样式对象
      baseStyle: {backgroundColor: 'red'},
      baseStyle1: {fontSize: '100px'},
}
```

当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS property 时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

## 5.条件渲染

### 5.1v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `true`的时候被渲染。

```html
<!--只有awesome变量值为true时，这段话才被渲染-->
<h1 v-if="awesome">Vue is awesome!</h1>
```

也可以用 `v-else` 添加一个`else 块`：

```html
<!--awesome为true时显示v-if代码块，为false时显示v-else代码块-->
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

#### 5.1.1在`<template>`元素上使用`v-if`条件渲染分组

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<!--ok为true时将渲染template包裹的内部元素，否则就不渲染-->
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

#### 5.1.2`v-else`

你可以使用 `v-else` 指令来表示 `v-if` 的`else 块`：

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

充当 `v-if` 的`else-if 块`，可以连续使用：

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

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉（也就是input输入的内容不会随着切换而清空）——仅仅是替换了它的 `placeholder`。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达**这两个元素是完全独立的，不要复用它们**。只需添加一个具有唯一值的 `key` attribute 即可：

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

注意：`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute。

> **如果需要复用元素，则不加`key`值，如果不需要复用元素，则添加唯一的`key`值。**

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

- 存在的问题：

如果我们在有输入内容的情况下，切换了类型，我们会发现文字依然显示之前的输入的内容。但是按道理讲，我们应该切换到另外一个input元素中了。在另一个input元素中，我们并没有输入内容。

- 问题解答：

这是因为Vue在进行DOM渲染时，出于性能考虑，会尽可能的复用已经存在的元素，而不是重新创建新的元素。在上面的案例中，Vue内部会发现原来的input元素不再使用，直接作为else中的input来使用了。

- 解决方案：

如果我们不希望Vue出现类似重复利用的问题，可以给对应的input添加key并且我们需要保证key的不同

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

## 6.列表渲染

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

### 6.1循环普通数组

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

### 6.2循环数组对象

```html
<p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
```

```js
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

### 6.3循环对象

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

### 6.4迭代数字

- in后面我们放过==普通数组==，==对象数组==，==对象==， 还可以放==数字==
- 注意：如果使用 v-for 迭代数字的话，前面的 count 值从 `1 `开始

```html
<p v-for="count in 10">这是第 {{ count }} 次循环</p>
```

### 6.5 v-for 循环中key 属性的使用

- 注意： `v-for` 循环的时候，`key `属性只能使用 `number类型`或`string类型`
- 注意： `key` 在使用的时候，必须使用 `v-bind `属性绑定的形式，指定 `key `的值
- 在组件中，使用`v-for`循环的时候，或者在一些特殊情况中，如果 `v-for` 有问题，必须在使用 `v-for `的同时，==指定 唯一的 字符串/数字 类型 :key 值==

### 6.6数组更新检测

#### 6.6.1变更方法

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 6.6.2替换数组

变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。==当使用非变更方法时，可以用新数组替换旧数组==：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 6.7显示过滤/排序后的结果

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

### 6.8在`<template>`上使用v-for

类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。比如：

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### 6.9在组件上使用`v-for`

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for`

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

> **当在组件上使用 `v-for` 时，`key` 现在是必须的。**

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 `prop`：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。

## 7.事件处理

### 7.1监听事件

可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

```html
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

### 7.2事件处理方法

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

### 7.3内联处理器中的方法

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

### 7.4事件修饰符

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

#### 7.4.1`.once`

```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上。

#### 7.4.2`.passive`

vue 还对应 [`addEventListener` 中的 `passive` 选项提供了 `.passive` 修饰符。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

这个 `.passive` 修饰符尤其能够提升移动端的性能。

> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

### 7.5按键修饰符

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

## 8.过滤器

Vue允许你自定义过滤器，**可被用作一些常见的文本格式化**。过滤器可以用在两个地方：==插值和 `v-bind` 表达式==。过滤器应该被==添加==在JavaScript 表达式的==尾部==，由==管道符==指示；

注：==过滤器中必须要有返回值==

- 过滤器调用格式 ：

```html
<!--插值表达式中调用-->
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

### 8.1 全局过滤器

在`vue实例`的外部创建全局过滤器，也可以从单独的过滤器js文件导入指定过滤器。

过滤器处理函数参数：

- 第一个参数为过滤器前面传递过来的数据
- 后面数据为过滤器调用时传递的数据

==注意==：

- 编写每个过滤器实现单一的功能
- 过滤器处理函数中必须使用`return`返回处理后的值

```html
<div id="app">
  <!--可以指定多个过滤器，每个过滤器实现单一的功能-->
  <p>{{ msg | msgFormat('疯狂+1', '123') | test }}</p>
</div>
```

```javascript
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

### 8.2 私有过滤器（局部）

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

#### 8.2.1案例：实现日期时间的格式化（私有过滤器）

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

## 9.自定义指令

`Vue`中所有的指令，在调用的时候，都以 `v- `开头

语法：

```js
//定义全局的指令
Vue.directive()
```

- ==参数1== ： **指令的名称**。注意：在定义的时候，指令的名称前面不需要加`v-`前缀, 但是在调用的时候，必须在指令名称前加上`v-`前缀来进行调用。
- ==参数2==： **是一个对象**，这个对象身上，有一些指令**相关的函数**，这些函数可以在特定的阶段，执行相关的操作

### 9.1全局指令

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

### 9.2私有指令

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

## 10.生命周期



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

## 11.组件基础

### 11.1基本实例

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

### 11.2组件的复用

你可以将组件进行任意次数的复用：

```js
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的**新实例**被创建。

> `data`必须是一个函数

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

如果 Vue 没有这条规则，点击一个按钮就可能会影响到其它所有实例。

### 11.3组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。至此，我们的组件都只是通过 `Vue.component` 全局注册的：

```js
Vue.component('my-component-name', {
  // ... options ...
})
```

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

### 11.4通过 Prop 向子组件传递数据

早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

`Prop `是你可以在组件上注册的一些自定义 `attribute`。**当一个值传递给一个` prop attribute` 的时候，它就变成了那个组件实例的一个 `property`**。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 prop 列表中：

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

**一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop**。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义 attribute 传递进来：

```html
<!--此时传递的title为字符串类型-->
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

如上所示，你会发现我们可以使用 `v-bind` 来**动态传递 prop**。这在你一开始不清楚要渲染的具体内容，比如从一个 API 获取博文列表的时候，是非常有用的。

### 11.5单个根元素

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

看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。**为每个相关的信息定义一个 `prop `会变得很麻烦**：

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

### 11.6监听子组件事件

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

```js
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

同时子组件可以通过调用内建的 **`$emit`** 方法并传入事件名称来触发一个事件：

```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

有了这个 `v-on:enlarge-text="postFontSize += 0.1"` 监听器，父级组件就会接收该事件并更新 `postFontSize` 的值。

#### 11.6.1使用事件抛出一个值

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

#### 11.6.2在组件上使用V-mode1

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

### 11.7通过插槽分发内容

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

### 11.8动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：

可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现：

```js
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字
- 一个组件的选项对象

## 12.组件高级

### 12.1组件注册

#### 12.1.1组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
Vue.component('my-component-name', { /* ... */ })
```

该组件名就是 `Vue.component` 的第一个参数。

你给予组件的名字可能依赖于你打算拿它来做什么。**当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)**。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

定义组件名的方式有两种：

> 1. 使用短横线分隔命名

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 短横线分隔命名定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

> 2. 使用驼峰命名

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用驼峰命名(首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。

注意：尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有短横线分隔命名是有效的。

#### 12.1.2全局注册

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

在所有子组件中也是如此，也就是说这三个组件在各自内部也都可以相互使用。

#### 12.1.3局部注册

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

对于 `components` 对象中的每个 property 来说，其 `property `名就是自定义元素的名字，其 `property `值就是这个组件的选项对象。

注意：**局部注册的组件在其子组件中不可用**。例如，如果你希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

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

#### 12.1.4模块系统

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

可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为**基础组件**，它们会在各个组件中被频繁的用到。

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

如果你恰好使用了 webpack，那么就可以使用 `require.context` 只全局注册这些非常通用的基础组件。这里有一份可以让你在应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

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

### 12.2prop

#### 12.2.1Prop 的大小写（camelCase vs kebab-case）

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

重申一次，如果你使用==字符串模板==，那么这个限制就不存在了。

#### 12.2.2Prop类型

到这里，我们只看到了以==字符串数组==形式列出的 prop：

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
  contactsPromise: Promise 
}
```

#### 12.2.3传递静态或动态Prop

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

在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。

**1.传入一个数字**

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

**2.传入一个布尔值**

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

**3.传入一个数组**

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

**4.传入一个对象**

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

**5.传入一个对象的所有 property**

**如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)**。例如，对于一个给定的对象 `post`：

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

#### 12.2.4单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。**这意味着你不应该在一个子组件内部改变 prop**。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

**1.这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
  return {
    //使用prop指定初始值
    counter: this.initialCounter
  }
}
```

**2.这个 prop 以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

> 注意：在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

#### 12.2.5prop验证

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

> **注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。**

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

#### 12.2.6非Prop的Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。**这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上**。

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

如果你**不**希望组件的根元素继承 `attribute`，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

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

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写基础组件的时候是常会用到的：

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

> 注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：

```js
<base-input
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>
```

### 12.3自定义事件

#### 12.3.1事件名

不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个 camelCase 名字的事件：

```js
this.$emit('myEvent')
```

则监听这个名字的 kebab-case 版本是不会有任何效果的：

```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```

不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent` 不可能被监听到。

因此，我们推荐你**始终使用 kebab-case 的事件名**。

#### 12.3.2自定义组件的v-mode1

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于不同的目的。`model` 选项可以用来避免这样的冲突：

```js
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

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的 `lovingVue` 的值将会传入这个名为 `checked` 的 prop。同时当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的 property 将会被更新。

>  **注意：你仍然需要在组件的 `props` 选项里声明 `checked` 这个 prop。**

#### 12.3.3将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

在有的时候这是很有用的，不过在你尝试监听一个类似 `<input>` 的非常特定的元素时，这并不是个好主意。比如上述 `<base-input>` 组件可能做了如下重构，所以根元素实际上是一个 `<label>` 元素：

```html
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

为了解决这个问题，Vue 提供了一个 `$listeners` property，**它是一个对象**，里面包含了作用在这个组件上的所有监听器。例如：

```js
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

#### 12.3.4`.sync` 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

> 注意：带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```html
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

> 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

### 12.4插槽

#### 12.4.1插槽内容

Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 Web Components 规范草案，将 `<slot>` 元素作为承载分发内容的出口。

它允许你像这样合成组件：

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

然后你在 `<navigation-link>` 的模板中可能会写为：

```html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML：

```html
<navigation-link url="/profile">
  <!-- 添加一个 Font Awesome 图标 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

甚至其它的组件：

```html
<navigation-link url="/profile">
  <!-- 添加一个图标的组件 -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>
```

如果 `<navigation-link>` 的 `template` 中**没有**包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

#### 12.4.2编译作用域

当你想在一个插槽中使用数据时，例如：

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而**不能**访问 `<navigation-link>` 的作用域。例如 `url` 是访问不到的：

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
  _传递给_ <navigation-link> 的而不是
  在 <navigation-link> 组件*内部*定义的。
  -->
</navigation-link>
```

作为一条规则，请记住：

> **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的**。

#### 12.4.3后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个 `<submit-button>` 组件中：

```html
<button type="submit">
  <slot></slot>
</button>
```

我们可能希望这个 `<button>` 内绝大多数情况下都渲染文本`Submit`。为了将`Submit`作为后备内容，我们可以将它放在 `<slot>` 标签内：

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

现在当我在一个父级组件中使用 `<submit-button>` 并且不提供任何插槽内容时：

```html
<submit-button></submit-button>
```

后备内容`Submit`将会被渲染：

```html
<button type="submit">
  Submit
</button>
```

但是如果我们提供内容：

```html
<submit-button>
  Save
</submit-button>
```

则这个提供的内容将会被渲染从而取代后备内容：

```html
<button type="submit">
  Save
</button>
```

#### 12.4.4具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的 `<base-layout>` 组件：

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

对于这样的情况，`<slot>` 元素有一个特殊的 attribute：`name`。这个 attribute 可以用来定义额外的插槽：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字`default`。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。

然而，如果你希望更明确一些，仍然可以在一个 `<template>` 中包裹默认插槽的内容：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

任何一种写法都会渲染出：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

> 注意 **`v-slot` 只能添加在 `<template>` 上**

#### 12.4.5作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `<current-user>` 组件：

```html
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

我们可能想换掉备用内容，用名而非姓来显示。如下：

```html
<current-user>
  {{ user.firstName }}
</current-user>
```

然而上述代码不会正常工作，因为只有 `<current-user>` 组件可以访问到 `user` 而我们提供的内容是在父级渲染的。

为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` 作为 `<slot>` 元素的一个 attribute 绑定上去：

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

绑定在 `<slot>` 元素上的 attribute 被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字：

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 `slotProps`，但你也可以使用任意你喜欢的名字。

**1.独占默认插槽的缩写语法**

在上述情况下，当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

> 注意：默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确：

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽，请始终为*所有的*插槽使用完整的基于 `<template>` 的语法：

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

**2.解构插槽 Prop**

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：

```js
function (slotProps) {
  // 插槽内容
}
```

这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop，如下：

```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 `user` 重命名为 `person`：

```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

#### 12.4.6动态插槽名

动态指令参数也可以用在 `v-slot` 上，来定义动态的插槽名：

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### 12.4.7具名插槽的缩写

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

**然而，和其它指令一样，该缩写只在其有参数的时候才可用**。这意味着以下语法是无效的：

```html
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```html
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

#### 12.4.8其它示例

**插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。**这在设计封装数据逻辑同时允许父级组件自定义部分布局的可复用组件时是最有用的。

例如，我们要实现一个 `<todo-list>` 组件，它是一个列表且包含布局和过滤逻辑：

```html
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

我们可以将每个 todo 作为父级组件的插槽，以此通过父级组件对其进行控制，然后将 `todo` 作为一个插槽 prop 进行绑定：

```html
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```

现在当我们使用 `<todo-list>` 组件的时候，我们可以选择为 todo 定义一个不一样的 `<template>` 作为替代方案，并且可以从子组件获取数据：

```html
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
```

### 12.5动态组件 & 异步组件

#### 12.5.1在动态组件上使用 keep-alive

我们之前曾经在一个多标签的界面中使用 `is` attribute 来切换不同的组件：

```html
<component v-bind:is="currentTabComponent"></component>
```

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题

你会注意到，如果你选择了一篇文章，切换到 *Archive* 标签，然后再切换回 *Posts*，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 `currentTabComponent` 实例。

重新创建动态组件的行为通常是非常有用的，但是在这个案例中，我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将其动态组件包裹起来。

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

> 注意这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

#### 12.5.2异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，**Vue 允许你以一个工厂函数的方式定义你的组件**，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如：

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

如你所见，这个工厂函数会收到一个 `resolve` 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。你也可以调用 `reject(reason)` 来表示加载失败。这里的 `setTimeout` 是为了演示用的，如何获取组件取决于你自己。一个推荐的做法是将异步组件和 **webpack 的 code-splitting **功能一起配合使用：

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

你也可以在工厂函数中返回一个 `Promise`，所以把 webpack 2 和 ES2015 语法加在一起，我们可以这样使用动态导入：

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

当使用==局部注册==的时候，你也可以直接提供一个返回 `Promise` 的函数：

```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

**处理加载状态**

这里的异步组件工厂函数也可以返回一个如下格式的对象：

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### 12.6处理边界情况

#### 12.6.1访问元素 & 组件

**1.访问根实例**

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问。例如，在这个根实例中：

```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

```js
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 `Vuex`来管理应用的状态。

**2.访问父级组件实例**

和 `$root` 类似，`$parent` property 可以用来**从一个子组件访问父组件的实例**。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。

在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。

另外在一些*可能*适当的时候，你需要特别地共享一些组件库。举个例子，在和 JavaScript API 进行交互而不渲染 HTML 的抽象组件内，诸如这些假设性的 Google 地图组件一样：

```html
<google-map>
  <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
</google-map>
```

这个 `<google-map>` 组件可以定义一个 `map` property，所有的子组件都需要访问它。在这种情况下 `<google-map-markers>` 可能想要通过类似 `this.$parent.getMap` 的方式访问那个地图，以便为其添加一组标记。

请留意，尽管如此，通过这种模式构建出来的那个组件的内部仍然是容易出现问题的。比如，设想一下我们添加一个新的 `<google-map-region>` 组件，当 `<google-map-markers>` 在其内部出现的时候，只会渲染那个区域内的标记：

```html
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>
```

那么在 `<google-map-markers>` 内部你可能发现自己需要一些类似这样的 hack：

```js
var map = this.$parent.map || this.$parent.$parent.map
```

很快它就会失控。这也是我们针对需要向任意更深层级的组件提供上下文信息时推荐**依赖注入**的原因。

**3.访问子组件实例或子元素**

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用。例如：

```html
<base-input ref="usernameInput"></base-input>
```

现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```js
this.$refs.usernameInput
```

来访问这个 `<base-input>` 实例，以便不时之需。比如程序化地从一个父级组件聚焦这个输入框。在刚才那个例子中，该 `<base-input>` 组件也可以使用一个类似的 `ref` 提供对内部这个指定元素的访问，例如：

```html
<input ref="input">
```

甚至可以通过其父级组件定义方法：

```js
methods: {
  // 用来从父级组件聚焦输入框
  focus: function () {
    this.$refs.input.focus()
  }
}
```

这样就允许父级组件通过下面的代码聚焦 `<base-input>` 里的输入框：

```js
this.$refs.usernameInput.focus()
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 `ref `将会是一个包含了对应数据源的这些子组件的数组。

`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

**4.依赖注入**

在此之前，在我们描述**访问父级组件实例**的时候，展示过一个类似这样的例子：

```html
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>
```

在这个组件里，所有 `<google-map>` 的后代都需要访问一个 `getMap` 方法，以便知道要跟哪个地图进行交互。不幸的是，使用 `$parent` property 无法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：`provide` 和 `inject`。

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法。在这个例子中，就是 `<google-map>` 内部的 `getMap` 方法：

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的 property：

```js
inject: ['getMap']
```

相比 `$parent` 来说，这个用法可以让我们在*任意*后代组件中访问 `getMap`，而不需要暴露整个 `<google-map>` 实例。这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 `props` 一样。

实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：

- 祖先组件不需要知道哪些后代组件使用它提供的 property
- 后代组件不需要知道被注入的 property 来自哪里

然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的 property 是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 `$root`做这件事都是不够好的。如果你想要共享的这个 property 是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 `Vuex`这样真正的状态管理方案了。

#### 12.6.2程序化的事件侦听器

现在，你已经知道了 `$emit` 的用法，它可以被 `v-on` 侦听，但是 Vue 实例同时在其事件接口中提供了其它的方法。我们可以：

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

你通常不会用到这些，但是当你需要在一个组件实例上手动侦听事件时，它们是派得上用场的。它们也可以用于代码组织工具。例如，你可能经常看到这种集成一个第三方库的模式：

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

这里有两个潜在的问题：

- 它需要在这个组件实例中保存这个 `picker`，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。

你应该通过一个程序化的侦听器解决这两个问题：

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

使用了这个策略，我甚至可以让多个输入框元素同时使用不同的 Pikaday，每个新的实例都程序化地在后期清理它自己：

```js
mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```

#### 12.6.3循环引用

**1.递归组件**

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事：

```js
name: 'unique-name-of-my-component'
```

当你使用 `Vue.component` 全局注册一个组件时，这个全局的 ID 会自动设置为该组件的 `name` 选项。

```js
Vue.component('unique-name-of-my-component', {
  // ...
})
```

稍有不慎，递归组件就可能导致无限循环：

```js
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

类似上述的组件将会导致“max stack size exceeded”错误，所以请确保递归调用是条件性的 (例如使用一个最终会得到 `false` 的 `v-if`)。

**2.组件之间的循环引用**

假设你需要构建一个文件目录树，像访达或资源管理器那样的。你可能有一个 `<tree-folder>` 组件，模板是这样的：

```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```

还有一个 `<tree-folder-contents>` 组件，模板是这样的：

```html
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```

当你仔细观察的时候，你会发现这些组件在渲染树中互为对方的后代*和*祖先——一个悖论！当通过 `Vue.component` 全局注册组件的时候，这个悖论会被自动解开。如果你是这样做的，那么你可以跳过这里。

然而，如果你使用一个*模块系统*依赖/导入组件，例如通过 webpack 或 Browserify，你会遇到一个错误：

```bash
Failed to mount component: template or render function not defined.
```

为了解释这里发生了什么，我们先把两个组件称为 A 和 B。模块系统发现它需要 A，但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，我们需要给模块系统一个点，在那里“A *反正*是需要 B 的，但是我们不需要先解析 B。”

在我们的例子中，把 `<tree-folder>` 组件设为了那个点。我们知道那个产生悖论的子组件是 `<tree-folder-contents>` 组件，所以我们会等到生命周期钩子 `beforeCreate` 时去注册它：

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```

或者，在本地注册组件的时候，你可以使用 webpack 的异步 `import`：

```js
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

这样问题就解决了！

## 13.过渡动画

### 13.1 使用过渡类名实现动画

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

```javascript
/*************************CSS************************/
<style>
/* v-enter 【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入 */
/* v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态，此时元素动画已经结束了 */
.v-enter,
.v-leave-to {
      opacity: 0;
      transform: translateX(150px);
}

/* v-enter-active 【入场动画的时间段】 */
/* v-leave-active 【离场动画的时间段】 */
.v-enter-active,
.v-leave-active{
      transition: all 0.8s ease;
    }
</style>
/*************************HTML************************/
<div id="app">
    <input type="button" value="toggle" @click="flag=!flag">
    <!-- 需求：点击按钮，让h3显示，再点击，让h3隐藏-->
    <!-- 1. 使用transition元素，把需要被动画控制的元素，包裹起来-->
    <!-- transition元素，是Vue官方提供的-->
    <transition>
      <h3 v-if="flag">这是一个H3</h3>
    </transition>
</div>
/*************************JS************************/
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false//初始化
      },
      methods: {}
    });
  </script>
```

### 13.2  修改v-前缀

- 区分不同组之间的动画样式
- 自定义前缀：使用`transition`的`name`属性值

```javascript
/*************************CSS************************/
<style>
	  /* 禁用x轴滚动条 */
	  html,body{
		  height: 100%;
		  width: 100%;
		  overflow-x: hidden;
	  }
    /* v-enter 【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入 */
    /* v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态，此时，元素 动画已经结束了 */
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateX(150px);
    }
    /* v-enter-active 【入场动画的时间段】 */
    /* v-leave-active 【离场动画的时间段】 */
    .v-enter-active,
    .v-leave-active{
      transition: all 0.8s ease;
    }
	
	/* 自定义前缀：使用transition的name属性值*/
    .my-enter,
    .my-leave-to {
      opacity: 0;
      transform: translateY(70px);
    }
    .my-enter-active,
    .my-leave-active{
      transition: all 0.8s ease;
    }
  </style>
/*************************HTML************************/
<body>
  <div id="app">
    <input type="button" value="toggle" @click="flag=!flag">
    <!-- 需求： 点击按钮，让h3显示，再点击，让h3隐藏 -->
    <!-- 1. 使用transition元素，把需要被动画控制的元素，包裹起来 -->
    <!-- transition元素，是 Vue 官方提供的 -->
    <transition>
      <h3 v-if="flag">这是一个H3</h3>
    </transition>
    <hr>
    <input type="button" value="toggle2" @click="flag2=!flag2">
    <!-- 自定义动画 ：只需将前缀-->
    <transition name="my">
      <h6 v-if="flag2">这是一个H6</h6>
    </transition>
  </div>
/*************************JS************************/
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false,
        flag2: false
      },
      methods: {}
    });
  </script>
```

### 13.3 使用第三方动画库

- 使用方法：

  1. 引入第三方类库文件（`<link rel="stylesheet" href="./lib/animate.css">`）

  2. 在transition开始标签中对开始类和结束类添加动画

     `<transition enter-active-class="bounceIn" leave-active-class="bounceOut" >`

```javascript
/**************1.引入第三方库**************/
<link rel="stylesheet" href="./lib/animate.css">
  <!-- 入场类名：bounceIn    离场类名：bounceOut -->
/**************2.添加类名**************/
<div id="app">
<input type="button" value="toggle" @click="flag=!flag">
<!-- 需求： 点击按钮让h3显示，再点击让h3隐藏 -->
  <!--注意：必须在时间段中添加类名：animated，不添加时，动画不会有效果-->
  
<!--方式1：在时间段中添加animated类-->
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <h3 v-if="flag">这是一个H3</h3>
</transition> 

<!--方式2：在动画内容上添加animated类-->
<!-- 使用 :duration="毫秒值" 来统一设置入场和离场时候的动画时长 -->
<transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="200">
      <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition> 

<!-- 方式3：使用:duration="{ enter: 200, leave: 400 }"对象来分别设置入场的时长和离场的时长  -->
    <transition 
    enter-active-class="bounceIn" 
    leave-active-class="bounceOut" 
    :duration="{ enter: 200, leave: 400 }">
      <h3 v-if="flag" class="animated">这是一个H3</h3>
    </transition> 
  </div>
/*************************JS************************/
  <script>
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

### 13.4 使用钩子函数实现动画

-  可以在属性中声明 JavaScript 钩子 

```javascript
<transition
//进入中动画的生命周期函数
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
//离开时动画的生命周期函数
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
</transition>
//方法需要在methods中去声明
```

> 示例：模拟购物车效果

```javascript
/*************************CSS************************/
<style>
  /****小球样式***/
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
    }
  </style>
/*************************HTML************************/
 <div id="app">
    <input type="button" value="快到碗里来" @click="flag=!flag">
    <!-- 1. 使用 transition 元素把小球包裹起来 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>
  </div>
/*************************JS************************/
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false
      },
      methods: {
        // 注意： 动画钩子函数的第一个参数：el，表示：要执行动画的那个DOM元素，是个原生的 JS DOM对象
        // 大家可以认为 ，el是通过 document.getElementById('') 方式获取到的原生JS DOM对象
        beforeEnter(el){
          // beforeEnter 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter中，设置元素开始动画之前的起始样式
          // 设置小球开始动画之前的起始位置。也就是让小球位置还原
          el.style.transform = "translate(0, 0)"
        },
        enter(el, done){
          // 这句话，没有实际的作用，但是，如果不写，出不来动画效果；
          // 可以认为el.offsetWidth会强制动画刷新
          el.offsetWidth
          // enter 表示动画 开始之后的样式，这里可以设置小球完成动画之后的结束状态
          el.style.transform = "translate(150px, 450px)"
          el.style.transition = 'all 1s ease'
          // 这里的done，起始就是afterEnter这个函数，也就是说：done是afterEnter函数的引用
          done()
        },
        afterEnter(el){
          // 动画完成之后，会调用afterEnter
          // console.log('ok')
          this.flag = !this.flag
        }
      }
    });
  </script>
```

### 13.5 案例-列表动画

```javascript
/*************************CSS************************/
<style>
  /******列表移入样式******/
    li {
      border: 1px dashed #999;
      margin: 5px;
      line-height: 35px;
      padding-left: 5px;
      font-size: 12px;
      width: 100%;
    }
/******鼠标移入列表样式******/
    li:hover {
      background-color: hotpink;
      transition: all 0.8s ease;
    }
/******进入之前和离开之后样式******/
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateY(80px);
    }
/******进入时和离开时样式******/
    .v-enter-active,
    .v-leave-active {
      transition: all 0.6s ease;
    }
/* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
    .v-move {
      transition: all 0.6s ease;
    }
    .v-leave-active{
      position: absolute;
    }
  </style>
/*************************HTML************************/
<div id="app">
    <div>
      <label>
        Id:
        <input type="text" v-model="id">
      </label>
      <label>
        Name:
        <input type="text" v-model="name">
      </label>
      <input type="button" value="添加" @click="add">
    </div>
    <!-- <ul> -->
      <!-- 在实现列表过渡的时候，如果需要过渡的元素，是通过 v-for 循环渲染出来的，不能使用 transition 包裹，需要使用 transitionGroup -->
      <!-- 如果要为 v-for 循环创建的元素设置动画，必须为每一个 元素 设置 :key 属性 -->
      <!-- 给transition-group添加 appear 属性，实现页面刚展示出来时候，入场时候的效果-->
      <!-- 通过为 transition-group 元素，设置 tag 属性，指定 transition-group 渲染为指定的元素，如果不指定 tag 属性，默认渲染为 span 标签 -->
      <transition-group appear tag="ul">
        <li v-for="(item, i) in list" :key="item.id" @click="del(i)">
          {{item.id}} --- {{item.name}}
        </li>
      </transition-group>
    <!-- </ul> -->
  </div>
/*************************JS************************/
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        id: '',
        name: '',
        list: [
          { id: 1, name: '赵高' },
          { id: 2, name: '秦桧' },
          { id: 3, name: '严嵩' },
          { id: 4, name: '魏忠贤' }
        ]
      },
      methods: {
        add() {
          this.list.push({ id: this.id, name: this.name })
          this.id = this.name = ''
        },
        del(i) {
          this.list.splice(i, 1)
        }
      }
    });
```

## 14.混入

### 14.1基础

混入 (`mixin`) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。**一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项**。

例子：

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 14.2选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

比如，**数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先**。

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

> **同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。**

```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

> 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

注意：`Vue.extend()` 也使用同样的策略进行合并。

### 14.3全局混入

混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入。

### 14.4自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

对于多数值为对象的选项，可以使用与 `methods` 相同的合并策略：

```js
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

可以在 [Vuex](https://github.com/vuejs/vuex) 1.x 的混入策略里找到一个更高级的例子：

```js
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```

## 15.渲染函数







## 16.单文件组件

## 17.TypeScrip支持

## 19.服务端渲染