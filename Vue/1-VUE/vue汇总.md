## 1.vue实例

### 1.1创建一个Vue实例

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

### 1.2数据与方法

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



## 2.vue指令

指令是以`V-`开头的（使用指令需要`v-`开头，自定义指令时则不需要加前缀`v-`），并且都在==开始标签==属性中添加

### 2.1 	mustache语法

叫插值表达式，直接在标签内部使用。**插值表达式前后内容不会被替换**

```html
div>{{msg2}}</div>
```

缺点：网速慢会有==闪烁==问题

### 2.2	v-cloak

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

### 2.3	v-text

`v-text`会覆盖元素中原本的内容。但是==插值表达式==只会==替换==自己的这个==占位符==，不会把整个元素的内容清空 。

用于将数据解析成==文本格式==，包括`html`标签

```html
<!--中间内容会被替换掉-->
<h4 v-text="msg">=============</h4s>
```

### 2.4	v-html

将数据解析成==html格式==

存在安全问题

```html
<h4 v-html="msg">=============</h4>
```

### 2.5	v-once

该指令表示元素和组件==只渲染一次==，不会随着数据的改变而改变。

该指令后面不需要跟任何表达式.

### 2.6	v-pre

v-pre用于==跳过==这个元素和它子元素的==编译过程==，用于显示原本的Mustache语法。

### 2.7	v-bind

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

### 2.8	v-on

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

### 2.9	v-model

`v-bind` 只能实现数据的单向绑定（也就是将data中的数据渲染到页面上），从 M 自动绑定到 V， 无法实现数据的双向绑定（即不能从`V`到`M`的绑定)

使用  v-model 指令，可以实现`表单元素`和 `Model 中数据`的`双向数据绑定`

注意： **==v-model 只能运用在表单元素中==**

`input(radio, text, address, email....)select checkbox textarea`

#### 2.9.1	v-model原理

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

#### 2.9.2	v-model结合radio使用

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

#### 2.9.3	v-model结合**checkbox**使用

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

#### 2.9.4	v-model结合**select**使用

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

#### 2.9.5	v-model修饰符

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

### 2.10动态参数

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

## 3.计算属性和侦听器

对于任何复杂逻辑，你都应当使用**计算属性**。

1. 在 computed 中，可以定义一些属性，这些属性叫做【计算属性】， 计算属性的本质就是一个方法，只不过，我们在使用这些计算属性的时候，是把它们的名称，直接当作属性来使用的；并不会把计算属性当作方法去调用；
2. 注意1： 计算属性在引用的时候，一定不要加 `()` 去调用，直接把它当作普通属性去使用就好了；
3. 注意2： 只要计算属性，这个 function 内部，所用到的任何 data 中的数据发送了变化，就会立即重新计算这个计算属性的值
4. 注意3： 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果计算属性方法中，所有来的任何数据，都没有发生过变化，则不会重新对计算属性求值；

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

## 4.class和style绑定

## 5.条件渲染

## 6.列表渲染

## 7.事件处理

## 8.过滤器

## 9.自定义指令

## 10.生命周期

## 11.组件基础

## 12.组件高级

## 13.过渡动画

## 14.混入

## 15.渲染函数

## 16.单文件组件

## 17.TypeScrip支持

## 19.服务端渲染