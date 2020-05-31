## 1.初始化

1. 导入Vue的包

```js
<script src="./lib/vue-2.4.0.js"></script>
```

2. 创建一个Vue的实例

示例：

```javascript
<body>
  //1. Vue实例所控制的这个元素区域，就是我们的V
  // 将来 new 的 Vue 实例，会控制这个元素中的所有内容
  <div id="app">
    <p>{{ msg }}</p>
	</div>
<script>
// 2. 创建一个Vue的实例
// 当我们导入包之后，在浏览器的内存中，就多了一个 Vue 的构造函数,需要使用new关键字实列化
// 注意：我们new出来的这个 vm 对象，就是我们 MVVM 中的 VM 调度者
var vm = new Vue({
// 表示：当前我们new的这个Vue实例，要控制页面上的哪个区域      
  el: '#app',  
// 这里的data就是 MVVM 中的 M，专门用来保存每个页面的数据
data: { // data属性中存放的是el中要用到的数据
        msg: '欢迎学习Vue' 
//通过Vue提供的指令，很方便的就能把数据渲染到页面上，程序员不再手动操作DOM元素了【前端的Vue之类的框架，不提倡我们去手动操作DOM元素了】
      }
   })
</script>
```

## 2.基本指令

指令是以`V-`开头的（使用指令需要`v-`开头，自定义指令时则不需要加前缀`v-`），并且都在==开始标签==属性中添加

### 2.1	`{{}}`

叫插值表达式，直接在标签内部使用。**插值表达式前后内容不会被替换**

```html
div>{{msg2}}</div>
```

缺点：网速慢会有==闪烁==问题

### 2.2     `v-cloak`

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

### 2.3	`v-text`

- 默认 `v-text` 是没有闪烁问题的 。

- `v-text`会覆盖元素中原本的内容。但是==插值表达式==只会==替换==自己的这个==占位符==，不会把整个元素的内容清空 。

- 用于将数据解析成文本格式，包括html标签

```html
<!--中间内容会被替换掉-->
<h4 v-text="msg">=============</h4>
```

### 2.4 	`v-html`

- 将数据解析成html格式
- 存在安全问题

```html
<h4 v-html="msg">=============</h4>
```

### 2.5	`v-bind`

- 用于==绑定属性==
- 简写 `:要绑定的属性`
- v-bind 中，可以写合法的JS表达式

```html
<!--v-bind告诉浏览器mytitle是变量-->
<input type="button" value="按钮" v-bind:title="mytitle">

<!--v-bind告诉浏览器"mytitle + '123'"是表达式来解析-->
<!--123如果不加引号将会当作变量来解析-->
<input type="button" value="按钮" :title="mytitle + '123'">
```

### 2.6	 `v-on`

- 用于==绑定事件==
- 简写：`@事件`

```html
<!--绑定的事件需要到 methods 属性中去找相应的方法-->
<input type="button" value="按钮" v-on:click="show">
<!--简写形式-->
<input type="button" value="按钮" @click="show">
```

```js
 var vm = new Vue({
      el: '#app',
      data: {
        msg: '123',
      },
      methods: { //是对象。这个 methods属性中定义了当前Vue实例所有可用的方法
        show: function () {//定义show方法
          alert('Hello')
        }
      }
})
```

### 2.7   `v-model`

- `v-bind` 只能实现数据的单向绑定，从 M 自动绑定到 V， 无法实现数据的双向绑定（即不能从`V`到`M`的绑定)

- 使用  v-model 指令，可以实现`表单元素`和 `Model 中数据`的`双向数据绑定`

- 注意： **==v-model 只能运用在表单元素中==**
- `input(radio, text, address, email....)select checkbox textarea`

```html
<input type="text"  v-model="msg">
```

### 2.8综合案例：跑马灯

步骤：

1. 导入Vue包

2. 创建一个要控制的区域

3. 给按钮绑定一个点击事件 

4.  在按钮的事件处理函数中，写相关的业务逻辑代码：拿到`msg`字符串，然后调用字符串的`substring `来进行字符串的截取操作，把第一个字符截取出来，放到最后一个位置上即可；

5. 为了实现点击下按钮，自动截取的功能，需要把第 4步骤中的代码，放到一个定时器中去；



```javascript
<!-- 2. 创建一个要控制的区域 -->
<div id="app">
    <input type="button" value="开始" @click="lang">
    <input type="button" value="暂停" @click="stop">
    <h4>{{ msg }}</h4>
</div>

var vm = new Vue({
  el: '#app',
  data: {
  	msg: '猥琐发育，别浪~~！',
  	intervalId: null // 在data上定义定时器Id，也叫初始化。需要使用的变量都需要再data中进行初始化
  },
  methods: {
    lang() {//lang：function() 简写为：lang()
           //判断是否有开启定时器。解决多次点击会加速显示问题    
          if (this.intervalId != null) return;
		//=>为箭头函数,让this指向外部
          this.intervalId = setInterval(() => {
             // 获取到头的第一个字符     
            var start = this.msg.substring(0, 1)
            // 获取到后面的所有字符
            var end = this.msg.substring(1)
            // 重新拼接得到新的字符串，并赋值给 this.msg
            this.msg = end + start
          }, 400)
// 注意： VM实例，会监听自己身上data中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data上同步到页面中去；【好处：程序员只需要关心数据，不需要考虑如何重新渲染DOM页面】
        },
        stop() { // 停止定时器
          clearInterval(this.intervalId)
          // 每当清除了定时器之后，需要重新把 intervalId 置为 null
          this.intervalId = null;
        }
      }
    })
```

注意：在VM实例中，如果想要获取`data`上的数据，或者想要调用`methods`中的方法，必须通过`this.数据属性名`或 `this.方法名`来进行访问，这里的`this`，就表示我们`new`出来的`VM`实例对象

## 3.事件修饰符

### 3.1 	`.stop`

阻止冒泡

```html
<div class="inner" @click="div1Handler">
 <input type="button" value="戳他" @click.stop="btnHandler">
</div>
```

### 3.2	`.prevent`

阻止默认行为

```HTML
<a href="http://www.baidu.com" @click.prevent="linkClick">有问题，先去百度</a>
```

### 3.3	`.capture`

实现捕获触发事件的机制：

```html
<div class="inner" @click.capture="div1Handler">
      <input type="button" value="戳他" @click="btnHandler">
</div> 
```

### 3.4	`.self`

实现只有点击当前元素时候，才会触发事件处理函数

```html
<div class="inner" @click.self="div1Handler">
      <input type="button" value="戳他" @click="btnHandler">
</div>
```

> .stop 和 .self 的区别

- `.self `只会阻止自己身上冒泡行为的触发，并不会真正阻止冒泡的行为

```html
<div class="outer" @click="div2Handler">
	<div class="inner" @click.stop="div1Handler">
	<input type="button" value="戳他" @click.stop="btnHandler">
</div>
</div>
```

```html
<div class="outer" @click="div2Handler">
<div class="inner" @click.self="div1Handler">
<input type="button" value="戳他" @click="btnHandler">
</div>
</div>
```

### 3.5	`.once`

- 只触发一次事件处理函数

```html
<a href="http://www.baidu.com" @click.prevent.once="linkClick">有问题，先去百度</a>
```

## 4.vue中的样式

### 4.1 `class`

使用方式：**需要使用`bind指令`绑定类名**

> 1. 直接传递一个数组

- 注意： 这里的 class 需要使用  `v-bind `做数据绑定

```html
<!--thin和italic写在样式文件中-->
.thin {
      font-weight: 200;
    }
.italic {
      font-style: italic;
    }

<h1 :class="['thin', 'italic']">这是一个很大很大的H1</h1>
```

> 2. 在数组中使用三元表达式

```html
<h1 :class="['thin', 'italic', flag?'active':'']">这是一个很大很大的H1</h1>
```

> 3. 在数组中使用 对象来代替三元表达式，提高代码的可读性

```html
<h1 :class="['thin', 'italic', {'active':flag} ]">这是一个很大很大的H1，大到你无法想象！！！</h1>
```

> 4. 将对象写入data中

在为 `class `使用 `v-bind `绑定对象的时候，==对象的属性是类名==，由于对象的属性可带引号，也可不带引号，所以这里我没写引号；==属性的值是一个标识符==

```html
<h1 :class="classObj">这是一个很大很大的H1，大到你无法想象！！！</h1>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        flag: true,
//对象的属性是类名，由于对象的属性可带引号，也可不带引号，所以这里我没写引号；
        classObj: { red: true, thin: true, italic: false, active: false }
      },
      methods: {}
    });
```

### 4.2	`style`

- `styleObj1, styleObj2` 是变量名，因此不必带引号

```html
 <h1 :style="styleObj1">这是一个h1</h1>
 <h1 :style="[ styleObj1, styleObj2 ]">这是一个h1</h1>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        styleObj1: { color: 'red', 'font-weight': 200 },//对象里面直接写样式
        styleObj2: { 'font-style': 'italic' }
      },
      methods: {}
    });
```

## 5.`v-for`指令

### 5.1 循环普通数组

```html
<p v-for="(item, i) in list">索引值：{{i}} --- 每一项：{{item}}</p>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        list: [1, 2, 3, 4, 5, 6]
      },
      methods: {}
    });
```

### 5.2 循环数组对象

```html
<p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
```

```javascript
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

### 5.3 循环对象

- 注意：在遍历对象身上的键值对的时候， 除了 有 ` val  key ` ,在第三个位置还有一个索引

  ```html
  <p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
  ```

  ```javascript
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

### 5.4 迭代数字

- in后面我们放过==普通数组==，==对象数组==，==对象==， 还可以放==数字==
- 注意：如果使用 v-for 迭代数字的话，前面的 count 值从 `1 `开始

```html
<p v-for="count in 10">这是第 {{ count }} 次循环</p>
```

### 5.5 v-for 循环中key 属性的使用

- 注意： `v-for` 循环的时候，`key `属性只能使用 `number类型`或`string类型`

- 注意： `key` 在使用的时候，必须使用 `v-bind `属性绑定的形式，指定 `key `的值

- 在组件中，使用`v-for`循环的时候，或者在一些特殊情况中，如果 `v-for` 有问题，必须在使用 `v-for `的同时，==指定 唯一的 字符串/数字 类型 :key 值==

```html
<div id="app">
    <div>
      <label>Id:
        <input type="text" v-model="id">
      </label>

      <label>Name:
        <input type="text" v-model="name">
      </label>

      <input type="button" value="添加" @click="add">
    </div>
  <!--:key="item.id"使数据建立关联，如果不使用，当选中一个复选框时，再添加数据，之前选中的数据会被替换（也就是只会选中索引值，加了就会指定唯一的id值）-->
    <p v-for="item in list" :key="item.id">
      <input type="checkbox">{{item.id}} --- {{item.name}}
    </p>
  </div>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        id: '',
        name: '',
        list: [
          { id: 1, name: '李斯' },
          { id: 2, name: '嬴政' },
          { id: 3, name: '赵高' },
          { id: 4, name: '韩非' },
          { id: 5, name: '荀子' }
        ]
      },
      methods: {
        add() { // 添加方法
          this.list.unshift({ id: this.id, name: this.name })
        }
      }
    });
```

## 6. v-if和v-show的使用

特点：

- `v-if` 的特点：每次都会重新==删除==或==创建==元素
- `v-show` 的特点： 每次不会重新进行DOM的删除和创建操作，只是切换了元素的 `display:none` 样式 

缺点：

- `v-if` 有较高的切换性能消耗
- `v-show` 有较高的初始渲染消耗

使用场景：

- 如果元素涉及到频繁的切换，最好不要使用 `v-if,` 而是推荐使用 `v-show` 
- 如果元素可能永远也不会被显示出来被用户看到，则推荐使用 `v-if` 

```html
 <input type="button" value="toggle" @click="flag=!flag">
 <h3 v-if="flag">这是用v-if控制的元素</h3>
 <h3 v-show="flag">这是用v-show控制的元素</h3>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        flag: false//初始化
      },
      methods: {
        /* toggle() {
          this.flag = !this.flag
        } */
      }
    });
```

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

## 8.按键修饰符

Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

### 8.1 内置修饰符

监听`enter`键

```javascript
@keyup.enter="add"
//enter键抬起时执行add方法，add方法由于没有传参，因此可以省略括号
```

常用的按键别名：

```javascript
.enter	.tab	.delete (捕获“删除”和“退格”键)	.esc	.space	.up	.down	.left	.right
```

### 8.2 自定义修饰符

通过全局 `config.keyCodes` 对象==自定义全局按键修饰符别名==

```javascript
//f2为自定义按键修饰符名称，可以随便取，但是最好注意语义化
//113为按键对应的键码（通过查表得知），此时按f2就代表按了键码值为113的键
Vue.config.keyCodes.f2 = 113

//使用方法与内置按键修饰符使用方法一样
@keyup.f2='add'
```

## 9.自定义指令

 `Vue`中所有的指令，在调用的时候，都以 `v- `开头

语法：

```vue
//定义全局的指令
Vue.directive()
```

- ==参数1== ： **指令的名称**。注意：在定义的时候，指令的名称前面不需要加`v-`前缀, 但是在调用的时候，必须在指令名称前加上`v-`前缀来进行调用。

- ==参数2==： **是一个对象**，这个对象身上，有一些指令**相关的函数**，这些函数可以在特定的阶段，执行相关的操作

### 9.1全局指令

> 1. 使用方法

```javascript
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

> 2. 自定义一个 设置字体颜色的 指令

- 使用指令

```javascript
//使用：和内置指令使用一样
v-color="'green'"
/*
	区别：
	v-color="'green'"：此时green是颜色值
	v-color="green"：此时green是个变量，需要到data中去查找
*/
```

- 创建全局指令

```javascript
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

- 在`vm`中添加属性

```javascript
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

### 9.3钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

> 钩子函数的参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
- `binding`：一个对象，包含以下属性：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

注： 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。 

## 10.vue生命周期函数



<img src="E:%5CwebNote%5CVue%5C01-Vue%E5%9F%BA%E7%A1%80.assets%5Cvue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png" alt="vue生命周期" style="zoom:150%;" />

```javascript
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

## 11.数据请求

- `vue-resource` 实现 `get`, `post`, `jsonp`请求

- 除了 `vue-resource` 之外，还可以使用 `axios` 的第三方包实现数据的请求。

- 直接在页面中，通过`script`标签，引入 `vue-resource` 的脚本文件；

- 注意：引用的先后顺序是：先引用 `Vue` 的脚本文件，再引用 `vue-resource` 的脚本文件；

### 11.1  发送get请求

- 定义：
- 语法：在methods中定义getInfo方法
- 注意：

```javascript
getInfo() { // 发起get请求
          //  当发起get请求之后， 通过 .then 来设置成功的回调函数
          this.$http.get('http://vue.studyit.io/api/getlunbo').then(function (result) {
            // 通过 result.body 拿到服务器返回的成功的数据
            console.log(result.body)
})
}
```

### 11.2	发送post请求

- 定义：
- 语法：在methods中定义postInfo方法
- 注意：

```javascript
postInfo() { // 发起 post 请求   application/x-wwww-form-urlencoded
          //  手动发起的 Post 请求，默认没有表单格式，所以有的服务器处理不了
          //  通过 post 方法的第三个参数， { emulateJSON: true } 设置提交的内容类型为普通表单数据格式
          this.$http.post('http://vue.studyit.io/api/post', {}, { emulateJSON: true }).then(result => {
     console.log(result.body)
})
}
```

### 11.3	发送JSONP请求

- 语法：在methods中定义jsonpInfo(方法

```javascript
jsonpInfo() { // 发起JSONP 请求
    this.$http.jsonp('http://vue.studyit.io/api/jsonp').then(result => {
    console.log(result.body)
})
}
```

> JSONP的实现原理

- 由于浏览器的安全性限制，不允许`AJAX`访问 协议不同、域名不同、端口号不同的 数据接口，浏览器认为这种访问不安全；
- 可以通过动态创建`script`标签的形式，把`script`标签的`src`属性，指向数据接口的地址，因为`script`标签不存在跨域限制，这种数据获取方式，称作`JSONP`（注意：根据`JSONP`的实现原理，知晓，`JSONP`只支持`Get`请求）；
- 具体实现过程：

  1. 先在客户端定义一个回调方法，预定义对数据的操作；
  2. 再把这个回调方法的名称，通过URL传参的形式，提交到服务器的数据接口；
  3. 服务器数据接口组织好要发送给客户端的数据，再拿着客户端传递过来的回调方法名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
  4. 客户端拿到服务器返回的字符串之后，当作Script脚本去解析执行，这样就能够拿到JSONP的数据了；

### 11.4案例

>  品牌列表案例-改进

- html代码

```html
<div id="app">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">添加品牌</h3>
      </div>
      <div class="panel-body form-inline">
        <label>
          Name:
          <input type="text" v-model="name" class="form-control">
        </label>

        <input type="button" value="添加" @click="add" class="btn btn-primary">
      </div>
    </div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Ctime</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.ctime}}</td>
          <td>
            <a href="" @click.prevent="del(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
```

- 使用数据库的数据

  ```javascript
  // 如果我们通过全局配置了请求的数据接口根域名，则在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则不会启用根路径做拼接；
      Vue.http.options.root = 'http://vue.studyit.io/';
      // 全局启用 emulateJSON 选项
      Vue.http.options.emulateJSON = true;
  
      // 创建 Vue 实例，得到 ViewModel
      var vm = new Vue({
        el: '#app',
        data: {
          name: '',
          list: [ // 存放所有品牌列表的数组
          ]
        },
        created() { // 当 vm 实例 的 data 和 methods 初始化完毕后，vm实例会自动执行created 这个生命周期函数
          this.getAllList()
        },
        methods: {
          getAllList() { // 获取所有的品牌列表 
            // 分析：
            // 1. 由于已经导入了 Vue-resource这个包，所以可以直接通过 this.$http 来发起数据请求
            // 2. 根据接口API文档知道：获取列表的时候，应该发起一个 get 请求
            // 3. this.$http.get('url').then(function(result){})
            // 4. 当通过 then 指定回调函数之后，在回调函数中，可以拿到数据服务器返回的 result
            // 5. 先判断 result.status 是否等于0，如果等于0，就成功了，可以把 result.message 赋值给 this.list; 如果不等于0，可以弹框提醒，获取数据失败！
  
            this.$http.get('api/getprodlist').then(result => {
              // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
              var result = result.body
              if (result.status === 0) {
                // 成功了
                this.list = result.message
              } else {
                // 失败了
                alert('获取数据失败！')
              }
            })
          },
          add() {  // 添加品牌列表到后台服务器
            // 分析：
            // 1. 经过查看数据API接口发现：要发送一个 Post 请求，  this.$http.post
            // 2. this.$http.post() 中接收三个参数：
            //   2.1 第一个参数： 要请求的URL地址
            //   2.2 第二个参数： 要提交给服务器的数据 ，要以对象形式提交给服务器 { name: this.name }
            //   3.3 第三个参数： 是一个配置对象，要以哪种表单数据类型提交过去， { emulateJSON: true }, 以普通表单格式，将数据提交给服务器 application/x-www-form-urlencoded
            // 3. 在 post 方法中，使用 .then 来设置成功的回调函数，如果想要拿到成功的结果，需要 result.body
  
            /* this.$http.post('api/addproduct', { name: this.name }, { emulateJSON: true }).then(result => {
              if (result.body.status === 0) {
                // 成功了！
                // 添加完成后，只需要手动再调用一下getAllList 就能刷新品牌列表了
                this.getAllList()
                // 清空 name 
                this.name = ''
              } else {
                // 失败了
                alert('添加失败！')
              }
            }) */
  // 全局启用 emulateJSON 选项时，此时就不需要设置第三个参数
            this.$http.post('api/addproduct', { name: this.name }).then(result => {
              if (result.body.status === 0) {
                // 成功了！
                // 添加完成后，只需要手动，再调用一下 getAllList 就能刷新品牌列表了
                this.getAllList()
                // 清空 name 
                this.name = ''
              } else {
                // 失败了
                alert('添加失败！')
              }
            })
          },
          del(id) { // 删除品牌
            this.$http.get('api/delproduct/' + id).then(result => {
              if (result.body.status === 0) {
                // 删除成功
                this.getAllList()
              } else {
                alert('删除失败！')
              }
            })
          }
        }
      });
  ```

## 12.vue中动画

### 12.1 使用过渡类名实现动画

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

![1571633006937](%E8%BF%87%E6%B8%A1%E7%B1%BB%E5%90%8D.png)

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

### 12.2  修改v-前缀

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

### 12.3 使用第三方动画库

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

### 12.4 使用钩子函数实现动画

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

### 12.5 案例-列表动画

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

## 13.VUE组件

- 什么是组件： 组件的出现，就是==为了拆分Vue实例的代码量的==，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；
- 组件化和模块化的不同：
   - **模块化**： 是从==代码逻辑==的角度进行划分的；方便代码分层开发，==保证每个功能模块的职能单一==；
   - **组件化**： 是从==UI界面==的角度进行划分的；前端的组件化，==方便UI组件的重用==；

### 13.1创建组件的方式

> 1. 方式1

```javascript
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

> 2. 方式2：

```javascript
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

> 3. 方式3：推荐

```javascript
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

### 13.2 组件中的data和methods

```javascript
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

> 必须在data中返回对象的原因:

- ```javascript
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

### 13.3 组件切换

> 1. 方式1：两个组件的切换

```javascript
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

> 2. 方式2：多组件切换

```javascript
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

### 13.4 使用组件切换动画

```javascript
/**********************CSS*******************/
<style>
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateX(150px);
    }
    .v-enter-active,
    .v-leave-active {
      transition: all 0.5s ease;
    }
  </style>
/**********************HTML*******************/
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <!-- 通过 mode 属性,设置组件切换时候的模式 -->
    <transition mode="out-in">
      <component :is="comName"></component>
    </transition>
  </div>
/**********************JS*******************/
  <script>
    // 组件名称是 字符串
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

### 13.5 复习

>  小球动画原理

```javascript
<div id="app">
    <input type="button" value="加入购物车" @click="flag=!flag">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false
      },
      methods: {
        beforeEnter(el){
          el.style.transform = 'translate(0, 0)'
        },
        enter(el, done){
          el.offsetWidth
          el.style.transform = 'translate(150px, 450px)'
          el.style.transition = 'all 1s ease'
          done()
        },
        afterEnter(el){
          // 这句话， 第一个功能，是控制小球的显示与隐藏
          // 第二个功能： 直接跳过后半场动画，让 flag 标识符 直接变为 false
          // 当第二次再点击 按钮的时候， flag  =false变为true（前半程动画）
          this.flag = !this.flag
          // el.style.opacity = 0.5//小球不会消失，再次点击才消失，在点击才执行动画

          // Vue 把一个完整的动画，使用钩子函数，拆分为了两部分：
          // 我们使用 flag 标识符，来表示动画的切换；
          // 刚以开始，flag = false 变为true（上半场动画）  变为false（后半程动画）
        } 
      }
    });
  </script>
```

> 定义组件的方式

```javascript
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

### 13.6 组件之间的传值

> 1. 父组件向子组件传值

```javascript
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

> 2. 父组件向子组件传递方法

```javascript
<div id="app">
    <!-- 第一步：父组件向子组件传递方法，使用的是事件绑定机制v-on, 当我们自定义了一个事件属性之后，那么子组件就能够通过某些方式，来调用 传递进去的这个方法了 -->
      //自定义的事件属性func，引用叫func，传递的方法是show，在实例vm中找，先查找data中，data中没有就去methods中找
    <com2 @func="show"></com2>
  </div>

  <template id="tmpl">
    <div>
      <h1>这是 子组件</h1>
      <input type="button" value="这是子组件中的按钮 - 点击它，触发 父组件传递过来的 func 方法" @click="myclick">
    </div>
  </template>

  <script>
    // 定义了一个字面量类型的组件模板对象
    var com2 = {
      template: '#tmpl', // 通过指定了一个Id, 表示说:要去加载这个指定Id的 template 元素中的内容，当作组件的HTML结构
      data() {
        return {
          sonmsg: { name: '小头儿子', age: 6 }
        }
      },
      methods: {
        myclick() {
          // 第二步：当点击子组件的按钮的时候，如何 拿到 父组件传递过来的 func 方法，并调用这个方法？？？
          //  emit 英文原意： 是触发，调用、发射的意思
          //从第二个参数开始都可以传参
          // this.$emit('func', 123, 456)
          //将子组件的数据this.sonmsg以参数形式传递给父组件方法
          this.$emit('func', this.sonmsg)
        }
      }
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        datamsgFormSon: null
      },
      methods: {
        show(data) {//调用时传递参数
          // console.log('调用了父组件身上的 show 方法: --- ' + data)
          // console.log(data);
          //将子组件传递的参数保存在父组件身上（data中）
          this.datamsgFormSon = data
        }
      },
      components: {
        com2
        // com2: com2
      }
    });
  </script>
```

### 13.7组件案例

```javascript
<div id="app">
   <cmt-box @func="loadComments"></cmt-box>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in list" :key="item.id">
        <span class="badge">评论人： {{ item.user }}</span>
        {{ item.content }}
      </li>
    </ul>
  </div>

  <template id="tmpl">
    <div>
      <div class="form-group">
        <label>评论人：</label>
        <input type="text" class="form-control" v-model="user">
      </div>
      <div class="form-group">
        <label>评论内容：</label>
        <textarea class="form-control" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
      </div>
    </div>
  </template>

  <script>
    var commentBox = {
      data() {
        return {
          user: '',
          content: ''
        }
      },
      template: '#tmpl',
      methods: {
        postComment() { // 发表评论的方法
          // 分析：发表评论的业务逻辑
          // 1. 评论数据存到哪里去？？？   存放到了 localStorage 中  localStorage.setItem('cmts', '')
          // 2. 先组织出一个最新的评论数据对象
          // 3. 想办法，把 第二步中，得到的评论对象，保存到 localStorage 中：
          //  3.1 localStorage 只支持存放字符串数据， 要先调用 JSON.stringify 
          //  3.2 在保存 最新的 评论数据之前，要先从 localStorage 获取到之前的评论数据（string）， 转换为 一个  数组对象， 然后，把最新的评论， push 到这个数组
          //  3.3 如果获取到的 localStorage 中的 评论字符串，为空不存在， 则  可以 返回一个 '[]'  让 JSON.parse 去转换
          //  3.4  把 最新的  评论列表数组，再次调用 JSON.stringify 转为  数组字符串，然后调用 localStorage.setItem()

          var comment = { id: Date.now(), user: this.user, content: this.content }

          // 从 localStorage 中获取所有的评论
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          list.unshift(comment)
          // 重新保存最新的 评论数据
          localStorage.setItem('cmts', JSON.stringify(list))

          this.user = this.content = ''

          // this.loadComments() // 这个不能实现实时刷新
          //实现评论的实时刷新，触发父组件的方法
          this.$emit('func')
        }
      }
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        list: [
          { id: Date.now(), user: '李白', content: '天生我材必有用' },
          { id: Date.now(), user: '江小白', content: '劝君更尽一杯酒' },
          { id: Date.now(), user: '小马', content: '我姓马， 风吹草低见牛羊的马' }
        ]
      },
      beforeCreate(){ // 注意：这里不能调用 loadComments 方法，因为在执行这个钩子函数的时候，data 和 methods 都还没有被初始化好

      },
      created(){
        this.loadComments()
      },
      methods: {
        loadComments() { // 从本地的 localStorage 中，加载评论列表
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          this.list = list
        }
      },
      components: {
        'cmt-box': commentBox
      }
    });
  </script>
```

### 13.8 `ref`获取`DOM`元素和组件

- `ref`是DOM元素的引用

```javascript
<div id="app">
    <input type="button" value="获取元素" @click="getElement" ref="mybtn">
    <h3 id="myh3" ref="myh3">哈哈哈， 今天天气太好了！！！</h3>
    <hr>
      //使用ref引用组件
    <login ref="mylogin"></login>
  </div>
  <script>
    var login = {
      template: '<h1>登录组件</h1>',
      data() {
        return {
          msg: 'son msg'
        }
      },
      methods: {
        show() {
          console.log('调用了子组件的方法')
        }
      }
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getElement() {
          //操作dom，不推荐
          // console.log(document.getElementById('myh3').innerText)

          //  ref  是 英文单词 【reference】   值类型 和 引用类型  referenceError
           console.log(this.$refs.myh3.innerText)//输出哈哈哈， 今天天气太好了！！！
					
          //访问子组件数据
           console.log(this.$refs.mylogin.msg)//输出son msg
          //访问子组件方法
          this.$refs.mylogin.show()
        }
      },
      components: {
        login
      }
    });
  </script>
```

### 13.9 组件的综合运用

```javascript
<div id="app">
    <com1 v-bind:parentmsg="msg" @func="getMsgFormSon"></com1>
  </div>
  <template id="tmpl">
    <div>
      <h1>这是子元素 --- {{ parentmsg }}</h1>
      <input type="button" value="向父组件传递消息" @click="sendMsg">
    </div>
  </template>
  <script>
    var com1 = {
      template: '#tmpl',
      data() {
        return {
          msg: '做一个孝顺的孩子，给爸爸一些钱去挥霍吧！'
        }
      },
      props: ['parentmsg'],
      methods: {
        sendMsg() {
          this.$emit('func', this.msg)
        }
      }
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '这是父组件中的数据，爸爸有100块钱，my son, 你要不',
        msgFormSon: ''
      },
      methods: {
        getMsgFormSon(data) {
          this.msgFormSon = data
          console.log(this.msgFormSon)
        }
      },
      components: {
        com1
      }
    });
  </script>
```

## 14.路由

- 路由的本质就是一种对应关系，比如说我们在url地址中输入我们要访问的url地址之后，浏览器要去请求这个url地址对应的资源。那么url地址和真实的资源之间就有一种对应的关系，就是路由。

1. **后端路由：**对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

2. **前端路由：**对于单页面应用程序来说，主要通过`URL`中的`hash(#号后面的)`来实现不同页面之间的切换。同时，`hash`有一个特点：`HTTP`请求中不会包含`hash`相关的内容；所以，单页面程序中的页面跳转主要用`hash`实现；不会请求后端，只在当前页面切换。

3. 在单页面应用程序中，这种通过`hash`改变来切换页面的方式，称作前端路由（区别于后端路由）；

4. 前端路由是基于hash值的变化进行实现的（比如点击页面中的菜单或者按钮改变URL的hash值，根据hash值的变化来控制组件的切换

   - 核心实现依靠一个事件，即监听hash值变化的事件

```js
window.onhashchange = function(){
    //location.hash可以获取到最新的hash值
    location.hash
}
```

- 示例：

```js
<body>
        <!-- 被 vue 实例控制的 div 区域 -->
        <div id="app">
        <!-- 切换组件的超链接 -->
 // <!--当我们点击这些超链接的时候，就会改变url地址中的hash值，当hash值被改变时，就会触发onhashchange事件，在触发onhashchange事件的时候，我们根据hash值来让不同的组件进行显示：-->
        <a href="#/zhuye">主页</a> 
        <a href="#/keji">科技</a> 
        <a href="#/caijing">财经</a>
        <a href="#/yule">娱乐</a>
        <!-- 根据 :is 属性指定的组件名称，把对应的组件渲染到 component 标签所在的位置 -->
        <!-- 可以把 component 标签当做是【组件的占位符】 -->
        <component :is="comName"></component>
        </div>
<script>
        // #region 定义需要被切换的 4 个组件
        // 主页组件
        const zhuye = {
            template: '<h1>主页信息</h1>'
        }

        // 科技组件
        const keji = {
            template: '<h1>科技信息</h1>'
        }

        // 财经组件
        const caijing = {
            template: '<h1>财经信息</h1>'
        }

        // 娱乐组件
        const yule = {
            template: '<h1>娱乐信息</h1>'
        }
        // #endregion

        // #region vue 实例对象
        const vm = new Vue({
            el: '#app',
            data: {
            	comName: 'zhuye'
            },
            // 注册私有组件
            components: {
            zhuye,
            keji,
            caijing,
            yule
            }
        })
        // #endregion

        // 监听 window 的 onhashchange 事件，根据获取到的最新的 hash 值，切换要显示的组件的名称
        window.onhashchange = function() {
            // 通过 location.hash 获取到最新的 hash 值
            console.log(location.hash);
            switch(location.hash.slice(1)){//获取的hash值默认带有#号，因此需要截取操作
            case '/zhuye':
                vm.comName = 'zhuye'
            break
            case '/keji':
                vm.comName = 'keji'
            break
            case '/caijing':
                vm.comName = 'caijing'
            break
            case '/yule':
                vm.comName = 'yule'
            break
            }
        }
</script>
```

### 14.1 路由的基本使用

步骤：

1. 导入js文件

```javascript
<script src="lib/vue_2.5.22.js"></script>
<script src="lib/vue-router_3.0.2.js"></script>
```

2. 添加路由链接:`<router-link>`是路由中提供的标签，默认会被渲染为`a`标签，`to`属性默认被渲染为`href`属性，`to`属性的值会被渲染为`#`开头的`hash`地址

```js
<router-link to="/user">User</router-link>
<router-link to="/login">Login</router-link>
```

3. 添加路由填充位（路由占位符）

```javascript
<router-view></router-view>
```

4. 定义路由组件

```javascript
var User = { template:"<div>This is User</div>" }
var Login = { template:"<div>This is Login</div>" }
```

5. 配置路由规则并创建路由实例

```javascript
var myRouter = new VueRouter({
    //routes是路由规则数组
    routes:[
        //每一个路由规则都是一个对象，对象中至少包含 path 和 component 两个属性
        //path 表示:路由匹配的hash地址，component 表示路由规则对应要展示的组件对象
        {path:"/user",component:User},
        {path:"/login",component:Login}
    ]
})
```

6. 将路由挂载到Vue实例中

```js
new Vue({
    el:"#app",
    //通过router属性挂载路由对象
    router:myRouter
})
```

- 完整示例

```javascript
 //1.导入js文件
<script src="./lib/vue-2.4.0.js"></script>
<script src="./lib/vue-router-3.0.1.js"></script>
  <style>
	  //修改默认样式
    //router-link-active默认的激活类，是当前展示的a链接上的类名
    //myactive自己配置的激活类
    .router-link-active,
    .myactive {
      color: red;
      font-weight: 800;
      font-style: italic;
      font-size: 80px;
      text-decoration: underline;
      background-color: green;
    }
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateX(140px);
    }
    .v-enter-active,
    .v-leave-active {
      transition: all 0.5s ease;
    }
  </style>
</head>
<body>
  <div id="app">
    //使用a标签实现地址栏的修改
    <!-- <a href="#/login">登录</a> -->
    <!-- <a href="#/register">注册</a> -->
//2. 添加路由链接 使用router-link实现地址栏的修改
    <!-- router-link 默认渲染为一个a 标签 ，如果需要渲染成其他标签，需要添加tag属性，属性值填写要渲染成的标签名，不管渲染成什么类型的标签，都可以被点击-->
    <router-link to="/login" tag="span">登录</router-link>
    <router-link to="/register">注册</router-link>

<!-- router-view是 vue-router 提供的元素，专门用来当作占位符的，将来路由规则匹配到的组件，就会展示到这个 router-view 中去 -->
    <!-- 所以： 我们可以把 router-view 认为是一个占位符 -->
    <transition mode="out-in">
//3.添加路由占位符(最后路由展示的组件就会在占位符的位置显示)
      <router-view></router-view>
    </transition>
  </div>
  <script>
// 4. 定义路由组件组件的模板对象
    var login = {
      template: '<h1>登录组件</h1>'
    }
    var register = {
      template: '<h1>注册组件</h1>'
    }

	//这种方式只能在页面上引用,不能在路由中使用
    /*
    	Vue.component('login', {
       	template: '<h1>登录组件</h1>'
     	}) 
     */

    // 创建一个路由对象， 当导入 vue-router 包之后，在 window 全局对象中，就有了一个路由的构造函数，叫做 VueRouter
    // 在 new 路由对象的时候，可以为构造函数，传递一个配置对象
 //5.配置路由规则并创建路由实例
    var routerObj = new VueRouter({
      // route // 这个配置对象中的 route 表示 【路由匹配规则】 的意思
      routes: [ // 路由匹配规则 
        // 每个路由规则，都是一个对象，这个规则对象身上有两个必须的属性：
        //  属性1 是 path， 表示监听哪个路由链接地址；
        //  属性2 是 component， 表示如果路由是前面匹配到的 path ，则展示 component 属性对应的那个组件
        // 注意： component 的属性值，必须是一个组件的模板对象， 不能是组件的引用名称；
        // { path: '/', component: login },//默认展示login组件,不推荐
        { path: '/', redirect: '/login' }, // redirect是重定向的意思，在这里是实现手动修改hash值。这里的 redirect 和 Node 中的 redirect 完全是两码事.这个也是默认显示login组件
        { path: '/login', component: login },
        { path: '/register', component: register }
      ],
      linkActiveClass: 'myactive'//修改默认样式，配置自定义激活类
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      //6.将路由挂载到Vue实例中
      router: routerObj // 将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件
    });
  </script>
```

### 14.2路由规则中定义参数1

```javascript
<div id="app">
    <!-- 如果在路由中，使用查询字符串，给路由传递参数，则不需要修改路由规则的path属性 -->
    <router-link to="/login?id=10&name=zs">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>
  <script>
    var login = {
      //使用传递过来的数据，再template中可以省略this
      //this.$route.query.id与$route.query.id相等
      template: '<h1>登录 --- {{ $route.query.id }} --- {{ $route.query.name }}</h1>',
      data(){
        return {
          msg: '123'
        }
      },
      created(){ // 组件的生命周期钩子函数
        // console.log(this.$route)
         console.log(this.$route.query.id)//拿到路径传递过来的数据
      }
    }
    var register = {
      template: '<h1>注册</h1>'
    }
    var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
      ]
    })
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      // router: router
	  //简写形式
      router
    });
  </script>
```

### 14.3路由规则传参方式2

```javascript
<div id="app">
    <!-- 如果在路由中，使用 查询字符串，给路由传递参数，则 不需要修改 路由规则的 path 属性 -->
    <router-link to="/login/12/ls">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
  </div>
  <script>
    var login = {
      template: '<h1>登录 --- {{ $route.params.id }} --- {{ $route.params.name }}</h1>',
      data(){
        return {
          msg: '123'
        }
      },
      created(){ // 组件的生命周期钩子函数
        console.log(this.$route.params.id)
      }
    }
    var register = {
      template: '<h1>注册</h1>'
    }

    var router = new VueRouter({
      routes: [
        //:id表示第一个值当作id值解析。：name表示第二个值当作name解析
        { path: '/login/:id/:name', component: login },
        { path: '/register', component: register }
      ]
    })
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      // router: router
      router
    });
  </script>
```

### 14.4嵌套路由

- 当我们进行路由的时候显示的组件中还有新的子级路由链接以及内容。
- 嵌套路由最关键的代码在于理解子级路由的概念：
  - 比如我们有一个`/login`的路由，那么`/login`下面还可以添加子级路由，如:`/login/account     /login/phone`

```javascript
<div id="app">
    <router-link to="/account">Account</router-link>
    <router-view></router-view>
  </div>
//组件中的模板代码里面包含了子级路由链接以及子级路由的占位符
  <template id="tmpl">
    <div>
      <h1>这是 Account 组件</h1>
      <router-link to="/account/login">登录</router-link>
      <router-link to="/account/register">注册</router-link>
 <!-- 子路由组件将会在router-view中显示 -->
      <router-view></router-view>
    </div>
  </template>
  <script>
    // 组件的模板对象
    var account = {
      template: '#tmpl'
    }
 //定义两个子级路由组件
    var login = {
      template: '<h3>登录</h3>'
    }

    var register = {
      template: '<h3>注册</h3>'
    }

    var router = new VueRouter({
      routes: [
        {
          path: '/account',
          component: account,
          // 使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
          children: [
            { path: 'login', component: login },
            { path: 'register', component: register }
          ]
        }
        // { path: '/account/login', component: login },
        // { path: '/account/register', component: register }
      ]
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router
    });
  </script>
```

### 14.5命名视图（多视图，一个页面同时展示多个组件）

```javascript
/***************样式**************/
<style>
    html,
    body {
      margin: 0;
      padding: 0;
    }

    .header {
      background-color: orange;
      height: 80px;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 16px;
    }

    .container {
      display: flex;
      height: 600px;
    }

    .left {
      background-color: lightgreen;
      flex: 2;
    }

    .main {
      background-color: lightpink;
      flex: 8;
    }
  </style>
  /****************视图区域**********************/
  <div id="app">
    //一个组件放置一个坑，也就是一个router-view
    //没用指定name属性，放置默认的组件
    <router-view></router-view>
    <div class="container">
      //name前面不加冒号时永远是字符串（就是普通属性名对应属性值的），加属性绑定机制时，才考虑属性值是变量还是普通值。:name="left"中left是变量,:name="'left'"中left是值。
      //有name属性的，放置name属性值那个组件
      <router-view name="left"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
  <script>
    var header = {
      template: '<h1 class="header">Header头部区域</h1>'
    }

    var leftBox = {
      template: '<h1 class="left">Left侧边栏区域</h1>'
    }

    var mainBox = {
      template: '<h1 class="main">mainBox主体区域</h1>'
    }
    // 创建路由对象
    var router = new VueRouter({
      routes: [
        /* { path: '/', component: header },
        { path: '/left', component: leftBox },
        { path: '/main', component: mainBox } */
        {
          path: '/', components: {//实现一个页面放置多个组件。
            'default': header,//默认放置的组件
            'left': leftBox,
            'main': mainBox
          }
        }
      ]
    })
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router
    });
  </script>
```

### 14.6 路由复习

```javascript
<div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <!-- 容器 -->
    <router-view></router-view>
  </div>
  <script>
    // 2. 创建子组件
    var login = {
      template: '<h3>这是登录子组件，这个组件是 奔波霸 开发的。</h3>'
    }

    var register = {
      template: '<h3>这是注册子组件，这个组件是 霸波奔 开发的。</h3>'
    }

    // 3. 创建一个路由对象
    var router = new VueRouter({
      routes: [ // 路由规则数组
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        { path: '/register', component: register }
      ],
      linkActiveClass: 'myactive' // 和激活相关的类
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      // router: router
      router
    });
  </script>
```

### 14.7 路由监听

> 1. 使用keyup监听事件

```javascript
<div id="app">
    <!-- 分析： -->
    <!-- 1. 我们要监听到 文本框数据的改变，这样才能知道 什么时候去拼接 出一个 fullname -->
    <!-- 2. 如何监听到 文本框的数据改变呢？？？ -->
    <input type="text" v-model="firstname" @keyup="getFullname"> +
    <input type="text" v-model="lastname" @keyup="getFullname"> =
    <input type="text" v-model="fullname">
  </div>
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstname: '',
        lastname: '',
        fullname: ''
      },
      methods: {
        getFullname() {
          this.fullname = this.firstname + '-' + this.lastname
        }
      }
    });
  </script>
```

> 2. 使用watch监听

```javascript
<div id="app">
    <input type="text" v-model="firstname"> +
    <input type="text" v-model="lastname"> =
    <input type="text" v-model="fullname">
  </div>
  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstname: '',
        lastname: '',
        fullname: ''
      },
      methods: {},
      watch: { // 使用这个属性，可以监视 data 中指定数据的变化，然后触发这个 watch 中对应的 function 处理函数
        'firstname': function (newVal, oldVal) {
          // console.log('监视到了 firstname 的变化')
          // this.fullname = this.firstname + '-' + this.lastname

          // console.log(newVal + ' --- ' + oldVal)

          this.fullname = newVal + '-' + this.lastname
        },
        'lastname': function (newVal) {
          this.fullname = this.firstname + '-' + newVal
        }
      }
    });
  </script>
```

> 3. watch监听路由地址的变化

```javascript
<div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <!-- 容器 -->
    <router-view></router-view>
  </div>
  <script>
    // 2. 创建子组件
    var login = {
      template: '<h3>这是登录子组件，这个组件是 奔波霸 开发的。</h3>'
    }

    var register = {
      template: '<h3>这是注册子组件，这个组件是 霸波奔 开发的。</h3>'
    }

    // 3. 创建一个路由对象
    var router = new VueRouter({
      routes: [ // 路由规则数组
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        { path: '/register', component: register }
      ],
      linkActiveClass: 'myactive' // 和激活相关的类
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      // router: router
      router,
      watch: {
        //监听路由的变化
        //  this.$route.path
        '$route.path': function (newVal, oldVal) {
          // console.log(newVal + ' --- ' + oldVal)
          if (newVal === '/login') {
            console.log('欢迎进入登录页面')
          } else if (newVal === '/register') {
            console.log('欢迎进入注册页面')
          }
        }
      }
    });
  </script>
```

> 4. 使用computed计算属性监听

```javascript
<div id="app">
    <input type="text" v-model="firstname"> +
    <input type="text" v-model="middlename"> +
    <input type="text" v-model="lastname"> =
    <input type="text" v-model="fullname">

    <p>{{ fullname }}</p>
    <p>{{ fullname }}</p>
    <p>{{ fullname }}</p>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstname: '',
        lastname: '',
        middlename: ''
      },
      methods: {},
      computed: { // 在 computed 中，可以定义一些属性，这些属性叫做【计算属性】， 计算属性的本质就是一个方法，只不过，我们在使用这些计算属性的时候，是把它们的名称，直接当作属性来使用的；并不会把计算属性当作方法去调用；
// 注意1： 计算属性在引用的时候，一定不要加 () 去调用，直接把它当作普通属性去使用就好了；
// 注意2： 只要计算属性，这个 function 内部，所用到的任何 data 中的数据发送了变化，就会立即重新计算这个计算属性的值
// 注意3： 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果计算属性方法中，所有来的任何数据，都没有发生过变化，则不会重新对计算属性求值；
        'fullname': function () {
          console.log('ok')
          //必须使用 return 返回计算后的值
          return this.firstname + '-' + this.middlename + '-' + this.lastname
        }
      }
    });
  </script>
```

> 5. `watch`、`computed`和`methods`之间的对比

1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods`方法表示一个具体的操作，主要书写业务逻辑；
3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是`computed`和`methods`的结合体；

### 14.8动态路由匹配

-  应用场景：通过动态路由参数的模式进行路由匹配  
- 语法：

```javascript
var router = new VueRouter({
routes: [
// 1.动态路径参数 以冒号开头
{ path: '/user/:id', component: User }
]
})

const User = {
// 2.路由组件中通过$route.params获取路由参数
template: '<div>User {{ $route.params.id }}</div>'
}
```

- 示例

```javascript
<div id="app">
      <router-link to="/user/1">User1</router-link>
      <router-link to="/user/2">User2</router-link>
      <router-link to="/user/3">User3</router-link>
      <router-link to="/register">Register</router-link>

      <!-- 路由占位符 -->
      <router-view></router-view>
    </div>

    <script>
      const User = {
        template: '<h1>User 组件 -- 用户id为: {{$route.params.id}}</h1>'
      }

      const Register = {
        template: '<h1>Register 组件</h1>'
      }

      // 创建路由实例对象
      const router = new VueRouter({
        // 所有的路由规则
        routes: [
          { path: '/', redirect: '/user'},
          { path: '/user/:id', component: User },
          { path: '/register', component: Register }
        ]
      })

      // 创建 vm 实例对象
      const vm = new Vue({
        // 指定控制的区域
        el: '#app',
        data: {},
        // 挂载路由实例对象
        // router: router
        router
      })
    </script>
```

### 14.9路由组件传递参数

-   `$route`与对应路由形成高度耦合，不够灵活，所以可以使用`props`将组件和路由解耦  

> 1.   props的值为布尔类型  

```javascript
const router = new VueRouter({
routes: [
// 如果 props 被设置为 true， route.params 将会被设置为组件属性
{ path: '/user/:id', component: User, props: true }//props: true 开启传参
]
})
const User = {
props: ['id'], // 使用 props 接收路由参数
template: '<div>用户ID： {{ id }}</div>' // 使用路由参数
}
```

> 2.   props的值为对象类型  

```javascript
const router = new VueRouter({
routes: [
// 如果 props 是一个对象，它会被按原样设置为组件属性
{ path: '/user/:id', component: User, props: { uname: 'lisi', age: 12 }}]})

const User = {
props: ['uname', 'age','id'],
template: ‘<h1>User 组件 -- 用户id为: {{id}} -- 姓名为:{{uname}} -- 年龄为：{{age}}</h1>'
}
```

> 3.   props的值为函数类型  

```javascript
const router = new VueRouter({
routes: [
// 如果 props 是一个函数，则这个函数接收 route 对象为自己的形参
{ path: '/user/:id',
component: User,
props: route => ({ uname: 'zs', age: 20, id: route.params.id })}
]})

const User = {
props: ['uname', 'age', 'id'],
template: ‘<div>用户信息： {{ uname + '---' + age + '---' + id}}</div>'
}
```

### 14.10命名路由

-   为了更加方便的表示路由的路径，可以给路由规则起一个别名，即为==命名路由==
- 语法：

```javascript
const router = new VueRouter({
routes: [
{//通过name属性设置路由别名
path: '/user/:id',
name: 'user',
component: User,
props: route => ({ uname: 'zs', age: 20, id: route.params.id })
}]})

<router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link>
```

### 14.11编程式导航

1.   页面导航的两种方式  

-   ==声明式导航==：通过点击链接实现导航的方式，叫做声明式导航
  例如：普通网页中的 `<a></a>` 链接 或 `vue` 中的 `<router-link></router-link>`
- ==编程式导航==：通过调用`JavaScript`形式的API实现导航的方式，叫做编程式导航
  例如：普通网页中的 `location.href`  

2.   常用的编程式导航 API 如下：

```javascript
this.$router.push('hash地址')
this.$router.go(n)

```

- 示例：

```javascript
const User = {
template: '<div><button @click="goRegister">跳转到注册页面</button></div>',
methods: {
goRegister: function(){
// 用编程的方式控制路由跳转
this.$router.push('/register');
}}}
```

-   router.push() 方法的参数规则  

```javascript
// 字符串(路径名称)
router.push('/home')
// 对象
router.push({ path: '/home' })
// 命名的路由(传递参数)
router.push({ name: '/user', params: { userId: 123 }})
// 带查询参数，变成 /register?uname=lisi
router.push({ path: '/register', query: { uname: 'lisi' }})
```

## 15.nrm的使用

作用：提供了一些最常用的`NPM`包镜像地址，能够让我们快速的切换安装包时候的服务器地址；
什么是镜像：原来包刚一开始是只存在于国外的`NPM`服务器，但是由于网络原因，经常访问不到，这时候，我们可以在国内，创建一个和官网完全一样的`NPM`服务器，只不过，数据都是从人家那里拿过来的，除此之外，使用方式完全一样；

1. 运行`npm i nrm -g`全局安装`nrm`包；
2. 使用`nrm ls`查看当前所有可用的镜像源地址以及当前所使用的镜像源地址；
3. 使用`nrm use npm`或`nrm use taobao`切换不同的镜像源地址；

> 注意： nrm 只是单纯的提供了几个常用的 下载包的 URL地址，并能够让我们在 这几个 地址之间，很方便的进行切换，但是，我们每次装包的时候，使用的装包工具，都是  npm

## 16模块化相关规范

- **`模块化`**就是把单独的一个功能封装到一个模块（文件）中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以依赖别的模块
- 模块化开发的好处：方便代码的重用，从而提升开发效率，并且方便后期的维护

### 16.1浏览器端模块化规范

- `AMD`(Asynchronous Module Definition,异步模块定义)
  - 代表产品为：Require.js

- `CMD`(Common Module Definition,通用模块定义)
  - 代表产品为：Sea.js

### 16.2服务器端模块化规范

1. `CommonJS`
   - 模块分为单文件模块与包
   - 一个文件就是一个模块，都拥有独立的作用域
   - 模块成员导出：`module.exports`和`exports`
   - 模块成员导入：`require`（模块标识符！）

### 16.3大一统的模块化规范-ES6模块化

- 推荐使用ES6模块化，因为AMD，CMD局限使用与浏览器端，而CommonJS在服务器端使用。
- ES6语法规范中，在语言层面上定义了ES6模块化规范，是浏览器端与服务器端通用的模块化开发规范。
- ES6模块化规范中定义：
  - 每个js文件都是一个独立的模块
  - 导入模块成员使用`import `关键字
  - 暴露模块成员使用`export `关键字
- `Node.js`中通过`babel`体验`ES6`模块化

```javascript
1. npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
2. npm install --save @babel/polyfill
3. 项目根目录创建文件 babel.config.js
4. babe1.config.js 文件内容如下侧代码
const presets = [
	["@babel/env", {
		targets: {//可使用浏览器版本号
			edge: "17",
			firefox: "60",
			chrome: "67",
			safari: "11.1"
		}
	}]
];
module.exports = { presets };//模块成员导出
5. 通过npx babel-node index.js执行代码//index.js为要执行的js文件
```

### 16.4  ES6 模块化的基本语法  

> 1.   默认导出 与 默认导入  

- 默认==导出==语法： `export default` 默认导出的成员
- 默认==导入==语法： `import` 接收名称 `from` '模块标识符'  (模块标识符不是指路径)

- 示例：

```javascript
// 当前文件模块为 m1.js
// 定义私有成员 a 和 c
let a = 10
let c = 20
// 外界访问不到变量 d ,因为它没有被暴露出去
let d = 30
function show() {}
// 将本模块中的私有成员暴露出去，供其它模块使用
export default {
a,
c,
show
}
```

```javascript
// 导入模块成员
import m1 from './m1.js'
console.log(m1)
// 打印输出的结果为：
// { a: 10, c: 20, show: [Function: show] }
```

-   注意：每个模块中，只允许使用唯一的一次 `export default`，否则会报错！  

> 2.   按需导出 与 按需导入  
>

- 按需导出语法： `export let s1 = 10`
- 按需导入语法： `import` { s1 } `from` '模块标识符'  

- 示例：

```javascript
// 当前文件模块为 m1.js
// 向外按需导出变量 s1
export let s1 = 'aaa'
// 向外按需导出变量 s2
export let s2 = 'ccc'
// 向外按需导出方法 say
export function say = function() {}
```

```javascript
// 导入模块成员
import { s1, s2 as ss2, say } from './m1.js'
console.log(s1) // 打印输出 aaa
console.log(ss2) // 打印输出 ccc
console.log(say) // 打印输出 [Function: say]
```

-   注意：每个模块中，可以使用多次按需导出  

> 3.   直接导入并执行模块代码  
>

-   有时候，我们==只想单纯执行某个模块中的代码，并不需要得到模块中向外暴露的成员==，此时，可以直接导入并执行模块代码。  


- 示例：

```javascript
// 当前文件模块为 m2.js
// 在当前模块中执行一个 for 循环操作
for(let i = 0; i < 3; i++) {
console.log(i)
}
```

```javascript
// 直接导入并执行模块代码
import './m2.js'
```

## 17.webpack

- `webpack` 是前端的一个项目构建工具，它是基于 `Node.js` 开发出来的一个前端工具；

- 网页中引入的静态资源多了以后的问题：

  1. 网页加载速度慢， 因为 我们要发起很多的二次请求；

  2. 要处理错综复杂的依赖关系

- 解决上述两个问题：

  - 合并、压缩、精灵图、图片的Base64编码
  - 可以使用之前学过的`requireJS`、也可以使用webpack可以解决各个包之间的复杂依赖关系；

- 如何完美实现上述的2种解决方案

  - 使用`Gulp`， 是基于 `task `任务的；
  - 使用`Webpack`， 是基于整个项目进行构建的；

  + 借助于`webpack`这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。

### 17.1webpack  的基本使用

> 1.  创建列表隔行变色项目  

1. 新建项目空白目录，并运行 `npm init –y` 命令，初始化包管理配置文件 `package.json`
2. 新建 `src` 源代码目录
3. 新建 `src -> index.html` 首页
4. 初始化首页基本的结构
5. 运行 `npm install jquery –S` 命令，安装 `jQuery`
6. 通过模块化的形式，实现列表隔行变色效果  

注：在`src`文件夹下新建一个`index.js`当作`js`入口文件，首先导入`jq`包，使用`import`导入：`import $ from'jquery'`

导入后直接就可以在后面编写jq业务代码

- 注意：此时项目运行会有错误，因为import $ from "jquery";这句代码属于ES6的新语法代码，在浏览器中可能会存在兼容性问题，所以我们需要webpack来帮助我们解决这个问题。

> 2.   在项目中安装和配置 webpack  
>

1. 运行 `npm install webpack webpack-cli –D` 命令，安装webpack 相关的包

2. 在项目根目录中，创建名为 `webpack.config.js` 的 webpack 配置文件

3.  在 webpack 的配置文件中，初始化如下基本配置：  

```javascript
module.exports = {
mode: 'development' // mode 用来指定构建模式
}
```

4. 在 `package.json` 配置文件中的 scripts 节点下，新增 dev 脚本如下：  

```javascript
"scripts": {
"dev": "webpack" // script 节点下的脚本，可以通过 npm run 执行
}
```

5.   在终端中运行 `npm run dev` 命令，启动 webpack 进行项目打包。  (打包会输出到`dist`目录，输出文件名默认是`main.js`文件)


> 3.   配置打包的入口与出口  
>

  webpack 的 4.x 版本中默认约定：

- 打包的入口文件为 `src -> index.js`
-  打包的输出文件为 `dist -> main.js `

  如果要修改打包的入口与出口，可以在 `webpack.config.js` 中新增如下配置信息：  

```javascript
const path = require('path') // 导入 node.js 中专门操作路径的模块
module.exports = {
// 打包入口文件的路径
//dirname代表当前文件所处的目录，也就是webpack.config.js文件所处的目录。
entry: path.join(__dirname, './src/index.js'),
//出口
output: {//是个配置对象
path: path.join(__dirname, './dist'), // 输出文件的存放路径
filename: 'bundle.js' // 输出文件的名称
}}
```

> 4.   配置 webpack 的自动打包功能  
>

1.   运行 `npm install webpack-dev-server –D` 命令，安装支持项目自动打包的工具
2. 修改 `package.json -> scripts` 中的 `dev` 命令如下： 

```js
"scripts": {
"dev": "webpack-dev-server" // script 节点下的脚本，可以通过 npm run 执行
}
```

3. 将 `src -> index.html` 中， script 脚本的引用路径，修改为 "/buldle.js“==(之前是../dist/bundle.js)==
4. 运行 `npm run dev` 命令，重新进行打包
5. 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果  ==(根据打包输出的实际地址访问，有可能不是8080)==

注意：

-  `webpack-dev-server` 会启动一个实时打包的 http 服务器
- `webpack-dev-server` 打包生成的输出文件，==默认放到了项目根目录中==，而且是虚拟的、看不见的  
- 代码改变保存就会自动打包，

> 5.   配置 html-webpack-plugin 生成预览页面  
>

1.  运行 `npm install html-webpack-plugin –D` 命令，安装生成预览页面的插件

2. 修改 `webpack.config.js` 文件头部区域，添加如下配置信息：  

```javascript
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
template: './src/index.html', // 指定要用到的模板文件
filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})
```

3. 修改 `webpack.config.js` 文件中向外暴露的配置对象，新增如下配置节点：  

```javascript
module.exports = {
plugins: [ htmlPlugin ] // plugins 数组是 webpack 打包期间会用到的一些插件列表
}
```

> 6.   配置自动打包相关的参数  
>

```javascript
// package.json中的配置
// --open 打包完成后自动打开浏览器页面
// --host 配置 IP 地址
// --port 配置端口
"scripts": {
"dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
},
```

### 17.2  webpack 中的加载器  

> 1. 通过 loader 打包非 js 模块  

  在实际开发过程中， `webpack` 默认只能打包处理以 `.js` 后缀名结尾的模块，其他非` .js `后缀名结
尾的模块， `webpack `默认处理不了， 需要调用 `loader `加载器才可以正常打包，否则会报错！  

  loader 加载器可以协助 webpack 打包处理特定的文件模块，比如：  

-  `less-loader` 可以打包处理` .less `相关的文件
- `sass-loader` 可以打包处理 `.scss `相关的文件
-  `url-loader` 可以打包处理 `css` 中与 `url` 路径相关的文件  

> 2.  loader 的调用过程  
>

![image-20191116235635052](E:\Git\gitee\webNote\06-Vue\image-201911162356135052.png)

> 3.   打包处理 css 文件  
>

1.   运行 `npm i style-loader css-loader -D` 命令，安装处理 `css` 文件的 `loader`

2. 在 `webpack.config.js` 的 `module -> rules` 数组中，添加 loader 规则如下：  

   ```javascript
   // 所有第三方文件模块的匹配规则
   module: {
   rules: [
   	{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
   ]}
   ```
   

其中：`test `表示匹配的文件类型， `use `表示对应要调用的 `loader`
   注意：

- `use` 数组中指定的 `loader` 顺序是固定的
   - 多个 loader 的调用顺序是：从后往前调用  
   - 需要在入口js文件（index.js）导入编写的全局css文件

> 4.   打包处理 less 文件  
>

需要在入口js文件（index.js）导入编写的less文件

1. 运行 `npm i less-loader less -D` 命令
2. 在 `webpack.config.js `的 module -> rules 数组中，添加 loader 规则如下：  

```javascript
// 所有第三方文件模块的匹配规则
module: {
rules: [
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
]
}
```

> 5.   打包处理 scss 文件  
>

1. 运行 `npm i sass-loader node-sass -D` 命令
2.  在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：  

```javascript
// 所有第三方文件模块的匹配规则
module: {
rules: [
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
]
}
```

> 6.   配置 postCSS 自动添加 css 的兼容前缀  
>

1.   运行 `npm i postcss-loader autoprefixer -D` 命令
2. 在项目根目录中创建 `postcss` 的配置文件 `postcss.config.js`，并初始化如下配置：  

```javascript
const autoprefixer = require('autoprefixer') // 导入自动添加前缀的插件
module.exports = {
plugins: [ autoprefixer ] // 挂载插件
}
```

3.   在 `webpack.config.js` 的 `module -> rules` 数组中，修改 `css` 的 `loader` 规则如下：  

```javascript
module: {
rules: [//只需在第一个配置数组中最后添加
{ test:/\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
]
}
```

> 6.   打包样式表中的图片和字体文件  
>

1.   运行 `npm i url-loader file-loader -D` 命令
2. 在 `webpack.config.js` 的 `module -> rules` 数组中，添加 `loader` 规则如下：  

```javascript
module: {
rules: [
{//其中|为或者的意思
test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
use: 'url-loader?limit=16940'
  //use接收两种类型的值，一种是数组（多个名称时用此种），一种是名称的字符串（只有一个名称时用这种）
}]}
```

-  其中 `?`之后的是 `loader` 的参数项。
- `limit` 用来指定图片的大小，单位是字节(byte),只有小于 `limit` 大小的图片，才会被转为 `base64` 图片  

> 7.   打包处理 js 文件中的高级语法  
>

1. 安装`babel`转换器相关的包：

   ```javascript
   npm i babel-loader @babel/core @babel/runtime -D
   ```

2. 安装`babel`语法插件相关的包：

   ```javascript
   npm i @babel/preset-env @babel/plugin-transformruntime @babel/plugin-proposal-class-properties –D
   ```

3. 在项目根目录中，创建 `babel` 配置文件 `babel.config.js` 并初始化基本配置如下：

```javascript
module.exports = {
  //放置语法相关的包
presets: [ '@babel/preset-env' ],
  //放置插件
plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposalclass-properties’ ]
}
```

4.   在 `webpack.config.js` 的 `module -> rules` 数组中，添加 `loader` 规则如下：  

```javascript
// exclude 为排除项，表示 babel-loader 不需要处理 node_modules 中的 js 文件
//因为node_modules 中的js文件是第三方提供的，不需要打包.只需要打包用户自己编写的js文件
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```

## 18.Vue单文件组件

### 18.1  Vue 单文件组件的基本用法 

-   单文件组件的组成结构  （文件后缀名为`.vue`）
  -   template 组件的模板区域
  - script 业务逻辑区域
  -  style 样式区域  
- 示例

```javascript
<template>
<!-- 这里用于定义Vue组件的模板内容 -->
<!--这里只能有一个根容器 -->
</template>
<script>
// 这里用于定义Vue组件的业务逻辑
export default {
data: () { return {} }, // 私有数据
methods: {} // 处理函数
// ... 其它业务逻辑
}
</script>
<style scoped>
  //scoped防止组件之间样式冲突问题，这个代表此样式只能在此组件应用
/* 这里用于定义组件的样式 */
</style>
```

### 18.2  webpack 中配置 vue 组件的加载器  

1.   运行 `npm i vue-loader vue-template-compiler -D` 命令
2.  在 `webpack.config.js` 配置文件中，添加 `vue-loader` 的配置项如下：  

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
module: {
rules: [
// ... 其它规则
{ test: /\.vue$/, use: 'vue-loader' }
]
},
plugins: [
// ... 其它插件
new VueLoaderPlugin() // 请确保引入这个插件！
]
}
```

### 18.3  在 webpack 项目中使用 vue  

1.   运行 `npm i vue –S` 安装 `vue`（导入的是严格版本的vue）
2.  在 `src -> index.js` 入口文件中，通过 `import Vue from 'vue' `来导入 `vue` 构造函数
3. 创建`vue ` 的实例对象，并指定要控制的 `el` 区域
4. 通过 `render `函数渲染 `App` 根组件  (在入口文件编写)

```javascript
// 1. 导入 Vue 构造函数
import Vue from 'vue'
// 2. 导入 App 根组件
import App from './components/App.vue'
const vm = new Vue({
// 3. 指定 vm 实例要控制的页面区域
el: '#app',
// 4. 通过 render 函数，把指定的组件渲染到 el 区域中
  //导入的是严格版本的`vue`，因此只能使用render渲染，不支持component渲染
render: h => h(App)
})
```

### 18.4  webpack 打包发布  

- 基本的打包发布，后续还需要一些配置
-   上线之前需要通过webpack将应用进行整体打包，可以通过 package.json 文件配置打包命令：  

```javascript
// 在package.json文件中配置 webpack 打包命令
// 该命令默认加载项目根目录中的 webpack.config.js 配置文件
"scripts": {
// 用于打包的命令
"build": "webpack -p",
// 用于开发调试的命令
"dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000",
},
```

### webpack配置总结

> 1. 入口index.js配置（在src根目录下）

```javascript
import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'
$(function() {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', 'lightblue')
})
class Person {
  static info = 'aaa'
}
console.log(Person.info)
// -----------------------------------------------
import Vue from 'vue'
// 导入单文件组件
import App from './components/App.vue'

const vm = new Vue({
  el: '#app',
  render: h => h(App)
})
```

> 2. package.json配置

- 只需要配置scripts对象，其他文件都是通过install安装的插件，可以查看安装成功与否以及安装的版本

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888",
    "build": "webpack -p"
  }
```

> 3. webpack.config.js配置

- 

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlguin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 编译模式
  mode: 'development', // development  production
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'), // 输出文件的存放路径
    filename: 'bundle.js' // 输出文件的名称
  },
  plugins: [htmlPlguin, new VueLoaderPlugin()],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16941' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}
```

> 4. babel.config.js配置

- 

```javascript
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}
```

> 5. postcss.config.js配置

- 

```javascript
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [autoprefixer]
}
```

## 19.Vue 脚手架

### 19.1  Vue 脚手架的基本用法  

-   Vue 脚手架用于快速生成 Vue 项目基础架构，其官网地址为： https://cli.vuejs.org/zh/  

-   使用步骤  

  1.   安装 3.x 版本的 Vue 脚手架：  

  ```javascript
  npm install -g @vue/cli
  ```

-   基于3.x版本的脚手架创建vue项目  

```javascript
// 1. 基于 交互式命令行 的方式，创建 新版 vue 项目
vue create my-project
// 2. 基于 图形化界面 的方式，创建 新版 vue 项目
vue ui
// 3. 基于 2.x 的旧模板，创建 旧版 vue 项目
npm install -g @vue/cli-init
vue init webpack my-project
```

### 19.2  Vue 脚手架生成的项目结构分析  

![image-20191117004227801](E:\Git\gitee\webNote\06-Vue\image-201911170042278021.png)

### 19.3  Vue 脚手架的自定义配置  

1.   通过 package.json 配置项目  

```javascript
// 必须是符合规范的json语法
//在最底部配置
"vue": {
"devServer": {//服务器配置
"port": "8888",
"open" : true
}
},
```

  ==注意==： 不推荐使用这种配置方式。因为 `package.json` 主要用来管理包的配置信息；为了方便维护，推荐将 `vue` 脚手架相关的配置，单独定义到 `vue.config.js` 配置文件中。  

2.   通过单独的配置文件配置项目  

   1.   在项目的根目录创建文件 `vue.config.js`
   2. 在该文件中进行相关配置，从而覆盖默认配置  

   ```javascript
   // vue.config.js
   module.exports = {
   devServer: {
   // 自动打开浏览器
       open: true,
       port: 8878
   }
   }
   ```

## 20  Element-UI 的基本使用  

 Element-UI： 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。
官网地址为： http://element-cn.eleme.io/#/zh-CN  

### 20.1基于命令行方式手动安装  

1.   安装依赖包 `npm i element-ui –S`
2. 导入 `Element-UI` 相关资源  (在打包入口文件配置)

```javascript
// 1. 导入组件库
import ElementUI from 'element-ui';
// 2. 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
// 3. 配置 Vue 插件
Vue.use(ElementUI);
```

### 20.2  基于图形化界面自动安装  

1.   运行 `vue ui` 命令，打开图形化界面
2.  通过 Vue 项目管理器， 进入具体的项目配置面板
3.  点击 插件 -> 添加插件，进入插件查询面板
4. 搜索 `vue-cli-plugin-element` 并安装
5. 配置插件，实现按需导入，从而减少打包后项目的体积  

- 实现的效果：
  - 在src目录下新建了一个plugins目录，目录下有个element.js配置文件

```javascript
import Vue from 'vue'
import { Button } from 'element-ui'

Vue.use(Button)
```

- 在打包入口文件main.js文件中导入配置文件

```javascript
import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

```

- router配置信息（在src根目录新建一个router.js配置文件）

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
```

