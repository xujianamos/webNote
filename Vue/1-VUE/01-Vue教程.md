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

## 2.修饰符

### 2.1事件修饰符

#### 2.1.1`.stop`

阻止冒泡

```html
<div class="inner" @click="div1Handler">
 <input type="button" value="戳他" @click.stop="btnHandler">
</div>
```

#### 2.1.2 `.prevent`

阻止默认行为

```html
<a href="http://www.baidu.com" @click.prevent="linkClick">有问题，先去百度</a>
```

#### 2.1.3 `.capture`

实现捕获触发事件的机制：

```html
<div class="inner" @click.capture="div1Handler">
      <input type="button" value="戳他" @click="btnHandler">
</div> 
```

#### 2.1.4`.self`

实现只有点击当前元素时候，才会触发事件处理函数

```html
<div class="inner" @click.self="div1Handler">
      <input type="button" value="戳他" @click="btnHandler">
</div>
```

> `.stop` 和 `.self `的区别

`.self `只会阻止自己身上冒泡行为的触发，==并不会真正阻止冒泡的行为==

```html
<div class="outer" @click="div2Handler">
	<div class="inner" @click.stop="div1Handler">
	<input type="button" value="戳他" @click.stop="btnHandler">
</div>
</div>
<div class="outer" @click="div2Handler">
<div class="inner" @click.self="div1Handler">
<input type="button" value="戳他" @click="btnHandler">
</div>
</div>
```

#### 2.1.5 `.once`

只触发一次事件处理函数

```html
<a href="http://www.baidu.com" @click.prevent.once="linkClick">有问题，先去百度</a>
```

#### 2.1.6 `.native`



### 2.2按键修饰符

Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

#### 2.2.1内置修饰符

监听`enter`键

```javascript
@keyup.enter="add"
//enter键抬起时执行add方法，add方法由于没有传参，因此可以省略括号
```

常用的按键别名：

```javascript
.enter	.tab	.delete (捕获“删除”和“退格”键)	.esc	.space	.up	.down	.left	.right
```

#### 2.2.2自定义修饰符

通过全局 `config.keyCodes` 对象==自定义全局按键修饰符别名==

```js
//f2为自定义按键修饰符名称，可以随便取，但是最好注意语义化
//113为按键对应的键码（通过查表得知），此时按f2就代表按了键码值为113的键
Vue.config.keyCodes.f2 = 113

//使用方法与内置按键修饰符使用方法一样
@keyup.f2='add'
```

## 3.vue中的样式

3.1 `class`

使用方式：**需要使用`bind指令`绑定类名**

绑定`class`有两种方式：

- 对象语法

- 数组语法

#### 3.1.1对象语法

语法：

```bash
<h2 v-bind:class="{key1: value1, key2: value2}">{{message}}</h2>
# 由于类名是对象的键，因此可以省略引号
# 键值可以写变量（变量值也需要是Boolean值），也可以直接写Boolean值
<h2 v-bind:class="{类名1: true, 类名2: boolean}">{{message}}</h2>
```

用法介绍：

```bash
#用法一：直接通过{}绑定一个类
#此时isActive 是在data中定义变量，且这个变量的值是Boolean值
<h2 :class="{'active': isActive}">Hello World</h2>

#用法二：也可以通过判断，传入多个值
<h2 :class="{'active': isActive, 'line':isLine}">Hello World</h2>

#用法三：和普通的类同时存在，并不冲突
#注：如果isActive和isLine都为true，那么会有title/active/line三个类
<h2 class="title" :class="{'active': isActive, 'line': isLine}">Hello World</h2>

#用法四：如果过于复杂，可以放在一个methods或者computed中
#注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
#getClasses()是个方法，必须加括号进行调用
<h2 class="title" :class="getClasses()">{{message}}</h2>
methods:{
 getClasses: function () {
 #返回一个对象
   return {active: this.isActive, line: this.isLine}
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

### 3.2`动态绑定style`

在写CSS属性名的时候，比如`font-size`

- 我们可以使用==驼峰式== (camelCase) `fontSize` 

- 或短横线分隔 (kebab-case，记得用==单引号==括起来)`"font-size"` 

#### 3.2.1对象语法

style后面跟的是一个对象类型

- 对象的`key`是CSS==属性名称==

- 对象的`value`是==具体赋的值==，值可以来自于`data`中的属性

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

## 4.循环

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

- 注意：在遍历对象身上的键值对的时候， 除了 有 ` val  key ` ,在第三个位置还有一个索引

```
<p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
```

```
var vm = new Vue({
      el: '#app',
      data: {
        user: {
          id: 1,
          name: '托尼·屎大颗',
          gender: '男'
        }
      },
      methods: {}
    });
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

## 5.条件判断

### 5.1	v-if

v-if后面的条件为false时，对应的元素以及其子元素不会渲染

```html
 <h2 v-if="isShow">
    <div>abc</div>
    <div>abc</div>
  </h2>
  
data: {
      isShow: true
    }
```

### 5.2	v-else-if

```html
<h2 v-if="score>=90">优秀</h2>
  <h2 v-else-if="score>=80">良好</h2>
  <h2 v-else-if="score>=60">及格</h2>
  <h2 v-else>不及格</h2>
```

### 5.3	v-else

```html
<h2 v-if="isShow">
    <div>abc</div>
    <div>abc</div>
    <div>abc</div>
    <div>abc</div>
    <div>abc</div>
    {{message}}
  </h2>
  <h1 v-else>isShow为false时, 显示我</h1>
```

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

### 5.5	v-if与v-show的比较

v-show的用法和v-if非常相似，也用于决定一个元素是否渲染

v-if当条件为false时，压根不会有对应的元素在DOM中

v-show当条件为false时，仅仅是将元素的display属性设置为none而已。

使用选择：

- p当需要在显示与隐藏之间切片很频繁时，使用v-show
- p当只有一次切换时，通过使用v-if

## 6.计算属性

1. 在 computed 中，可以定义一些属性，这些属性叫做【计算属性】， 计算属性的本质就是一个方法，只不过，我们在使用这些计算属性的时候，是把它们的名称，直接当作属性来使用的；并不会把计算属性当作方法去调用；
2. 注意1： 计算属性在引用的时候，一定不要加 () 去调用，直接把它当作普通属性去使用就好了；
3. 注意2： 只要计算属性，这个 function 内部，所用到的任何 data 中的数据发送了变化，就会立即重新计算这个计算属性的值
4.  注意3： 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果计算属性方法中，所有来的任何数据，都没有发生过变化，则不会重新对计算属性求值；

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

### 6.1计算属性的`setter和getter`

每个计算属性都包含一个getter和一个setter

- 在上面的例子中，我们只是使用getter来读取。

- 在某些情况下，你也可以提供一个setter方法（不常用）

```js
computed: {
      // 计算属性一般是没有set方法, 只读属性.
      fullName: {
        set: function(newValue) {
          // console.log('-----', newValue);
          const names = newValue.split(' ');
          this.firstName = names[0];
          this.lastName = names[1];
        },
        get: function () {
          return this.firstName + ' ' + this.lastName
        }
      },
    }
```

### 6.2	`methods`和`computed`的对比

`computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；调用多次，只会执行一次

`methods`方法表示一个具体的操作，主要书写业务逻辑；每次调用都会执行函数

### 6.3侦听器

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

