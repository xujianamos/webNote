## 1. JavaScript运行原理

### 1.1JavaScript如何运行

#### 1.1.1浏览器内核

- Gecko：早期被Netscape和Mozilla Firefox浏览器浏览器使用；
- Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
- Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
- Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；

![image-20201108205345563](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20201108205345563.png)

但是在这个执行过程中，HTML解析的时候遇到了JavaScript标签，应该怎么办呢？

- 会停止解析HTML，而去加载和执行JavaScript代码；

当然，为什么不直接异步去加载执行JavaScript代码，而要在这里停止掉呢？

- 这是因为JavaScript代码可以操作我们的DOM；
- 所以浏览器希望将HTML解析的DOM和JavaScript操作之后的DOM放到一起来生成最终的DOM树，而不是频繁的去生成新的DOM树；

那么，JavaScript代码由谁来执行呢？

- JavaScript引擎

#### 1.1.2 JavaScript引擎

为什么需要JavaScript引擎呢？

- 事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的；
- 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行；
- 所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行；

比较常见的JavaScript引擎有哪些呢？

- **SpiderMonkey**：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；
- **Chakra**：微软开发，用于IT浏览器；
- **JavaScriptCore**：WebKit中的JavaScript引擎，Apple公司开发；
- **V8**：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；

这里我们先以WebKit为例，WebKit事实上由两部分组成的：

- WebCore：负责HTML解析、布局、渲染等等相关的工作；
- JavaScriptCore：解析、执行JavaScript代码；

#### 1.1.3V8引擎

V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。

执行JavaScript代码的原理：

- Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；

- - 如果函数没有被调用，那么是不会被转换成AST的；

- Ignition是一个解释器，会将AST转换成ByteCode（字节码）

- - 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
  - 如果函数只调用一次，Ignition会执行解释执行ByteCode；

- TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；

- - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能；
  - 但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；

## 2.node基础知识

### 2.1简介

Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。

### 2.2Node.js版本管理

如果你希望通过可以快速更新或切换多个版本时，可以借助于一些工具：

- `nvm`：Node Version Manager；
- `n`：Interactively Manage Your Node.js Versions（交互式管理你的Node.js版本）

这里我演示管理工具：n

- n是TJ方便node的版本管理，专门开发的；

安装n：直接使用npm安装即可

```bash
# 安装工具n
npm install -g n
# 查看安装的版本
n --version
```

安装最新的lts版本：

- 前面添加的sudo是权限问题；
- 可以两个版本都安装，之后我们可以通过n快速在两个版本间切换；

```bash
# 安装最新的lts版本
sudo n lts

# 安装最新的版本
sudo n latest
```

查看所有的版本，并且选择要使用的版本：

- 可以上下选择想使用的版本

```bash
# 查看所有的版本
n
```

> **windows上可以使用nvm-window来完成。**

### 2.3模块化开发

#### 2.3.1exports导出

**exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出。**

index.js中导出内容：

```js
exports.name = name;
exports.age = age;
exports.sayHello = sayHello;
```

main.js中导入内容：

```js
// 参数为字符串路径
const index = require('./index');
```

意味着main中的index变量等于exports对象，index和exports是同一个对象，并且index对象是exports对象的浅拷贝；

#### 2.3.2module.exports



#### 2.3.3require





#### 2.3.4模块加载顺序

> **模块在被第一次引入时，模块中的js代码会被运行一次**

```js
//index.js
const name = 'xujain';
console.log("Hello aaa");
```

导入index.js

```js
//main.js
const aaa = require('./index');
```

Index.js中的代码在引入时会被运行一次。

> **模块被多次引入时，会缓存，最终只加载（运行）一次**

```js
//ccc.js
console.log('ccc被加载');
```

```js
//aaa.js
const ccc = require("./ccc");
```

```js
//bbb.js
const ccc = require("./ccc");
```

```js
//main.js
const aaa = require('./aaa');
const bbb = require('./bbb');
```

ccc中的代码只会运行一次。

**为什么只会加载运行一次呢？**

- 这是因为每个模块对象module都有一个属性：loaded。
- 为false表示还没有加载，为true表示已经加载；

> **如果有循环引入，那么加载顺序是什么？**

- 这个其实是一种数据结构：图结构；
- 图结构在遍历的过程中，有深度优先搜索（DFS, depth first search）和广度优先搜索（BFS, breadth first search）；
- Node采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb

![image-20201108221447785](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20201108221447785.png)

## 3.前端模块化

### 3.1CommonJS和Node

我们需要知道CommonJS是一个规范，最初提出来是在浏览器意外的地方使用，并且当时被命名为**ServerJS**，后来为了体现它的广泛性，修改为**CommonJS**，平时我们也会简称为CJS。

- Node是CommonJS在服务器端一个具有代表性的实现；
- Browserify是CommonJS在浏览器中的一种实现；
- webpack打包工具具备对CommonJS的支持和转换（后面我会讲到）；

所以，Node中对CommonJS进行了支持和实现，让我们在开发node的过程中可以方便的进行模块化开发：

- 在Node中每一个js文件都是一个单独的模块；
- 这个模块中包括CommonJS规范的核心变量：exports、module.exports、require；
- 我们可以使用这些变量来方便的进行模块化开发；

前面我们提到过模块化的核心是导出和导入，Node中对其进行了实现：

- exports和module.exports可以负责对模块中的内容进行导出；
- require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

### 3.2. Node模块化开发

我们来看一下两个文件：

bar.js

```js
const name = 'name';
const age = 18;

function sayHello(name) {
  console.log("Hello " + name);
}
```

main.js

```js
console.log(name);
console.log(age);

sayHello('kobe');
```

上面的代码会报错：

- 在node中每一个文件都是一个独立的模块，有自己的作用域；
- 那么，就意味着别的模块main中不能随便访问另外一个模块bar中的内容；
- bar需要导出自己想要暴露的变量、函数、对象等等；
- main从bar中导入自己想要使用的变量、函数、对象等等；

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725225243625.png" alt="image-20210725225243625" style="zoom: 80%;" />

#### 3.2.1. exports导出

**强调：exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出**

bar.js中导出内容：

```js
const name = 'name';
const age = 18;

function sayHello(name) {
  console.log("Hello " + name);
}

exports.name = name;
exports.age = age;
exports.sayHello = sayHello;
```

main.js中导入内容：

```js
const bar = require('./bar');
```

上面这行代码意味着什么呢？

- 意味着main中的bar变量等于exports对象；

```js
main中的bar = bar中的exports
```

所以，我可以编写下面的代码：

```js
const bar = require('./bar');

const name = bar.name;
const age = bar.age;
const sayHello = bar.sayHello;

console.log(name);
console.log(age);
sayHello('kobe');
```

为了进一步论证，bar和exports是同一个对象：

- 所以，bar对象是exports对象的浅拷贝；
- 浅拷贝的本质就是一种引用的赋值而已；

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725230022536.png" alt="image-20210725230022536" style="zoom:80%;" />

#### 3.2.2. module.exports

但是Node中我们经常导出东西的时候，又是通过module.exports导出的：

- module.exports和exports有什么关系或者区别呢？

我们追根溯源，通过维基百科中对CommonJS规范的解析：

- CommonJS中是没有module.exports的概念的；
- 但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module；
- 所以在Node中真正用于导出的其实根本不是exports，而是module.exports；
- 因为module才是导出的真正实现者；

但是，为什么exports也可以导出呢？

- 这是因为module对象的exports属性是exports对象的一个引用；
- 也就是说 `module.exports = exports = main中的bar`；

注意：真正导出的模块内容的核心其实是module.exports，只是为了实现CommonJS的规范，刚好module.exports对exports对象有一个引用而已；

那么，如果我的代码这样修改了：

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725230413971.png" alt="image-20210725230413971" style="zoom:80%;" />

你能猜到内存中会有怎么样的表现吗？

- 结论：和exports对象没有任何关系了，exports你随便玩自己的吧；
- module.exports我现在导出一个自己的对象，不带着你玩了；
- 新的对象取代了exports对象的导出，那么就意味着require导入的对象是新的对象；

#### 3.2.3. require细节

我们现在已经知道，require是一个函数，可以帮助我们引入一个文件（模块）中导入的对象。

require的查找规则:

导入格式如下：require(X)

- 情况一：X是一个核心模块，比如path、http

- - 直接返回核心模块，并且停止查找

- 情况二：X是以 `./` 或 `../` 或 `/`（根目录）开头的

- - 查找目录下面的index文件
  - 1> 查找X/index.js文件
  - 2> 查找X/index.json文件
  - 3> 查找X/index.node文件
  - 1.如果有后缀名，按照后缀名的格式查找对应的文件
  - 2.如果没有后缀名，会按照如下顺序：
  - 1> 直接查找文件X
  - 2> 查找X.js文件
  - 3> 查找X.json文件
  - 4> 查找X.node文件
  - 第一步：将X当做一个文件在对应的目录下查找；
  - 第二步：没有找到对应的文件，将X作为一个目录
  - 如果没有找到，那么报错：`not found`

- 情况三：直接是一个X（没有路径），并且X不是一个核心模块

- - 比如 `/Users/coderwhy/Desktop/Node/TestCode/04_learn_node/05_javascript-module/02_commonjs/main.js`中编写 `require('why')`

- 如果上面的路径中都没有找到，那么报错：`not found`

#### 3.2.4. 模块加载顺序

**结论一：模块在被第一次引入时，模块中的js代码会被运行一次**

aaa.js

```js
const name = 'coderwhy';

console.log("Hello aaa");

setTimeout(() => {
  console.log("setTimeout");
}, 1000);
```

main.js

```js
const aaa = require('./aaa');
```

aaa.js中的代码在引入时会被运行一次。

**结论二：模块被多次引入时，会缓存，最终只加载（运行）一次**

main.js

```js
const aaa = require('./aaa');
const bbb = require('./bbb');
```

aaa.js

```js
const ccc = require("./ccc");
```

bbb.js

```js
const ccc = require("./ccc");
```

ccc.js

```js
console.log('ccc被加载');
```

ccc中的代码只会运行一次。

**为什么只会加载运行一次呢？**

- 这是因为每个模块对象module都有一个属性：loaded。
- 为false表示还没有加载，为true表示已经加载；

**结论三：如果有循环引入，那么加载顺序是什么？**

如果出现下面模块的引用关系，那么加载顺序是什么呢？

- 这个其实是一种数据结构：图结构；
- 图结构在遍历的过程中，有深度优先搜索（DFS, depth first search）和广度优先搜索（BFS, breadth first search）；
- Node采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725231027747.png" alt="image-20210725231027747" style="zoom:80%;" />



### 3.3 AMD和CMD规范

#### 3.3.1. CommonJS规范缺点

CommonJS加载模块是同步的：

- 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行；
- 这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快；

如果将它应用于浏览器呢？

- 浏览器加载js文件需要先从服务器将文件下载下来，之后在加载运行；
- 那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作；

所以在浏览器中，我们通常不使用CommonJS规范：

- 当然在webpack中使用CommonJS是另外一回事；
- 因为它会将我们的代码转成浏览器可以直接执行的代码；

在早期为了可以在浏览器中使用模块化，通常会采用AMD或CMD：

- 但是目前一方面现代的浏览器已经支持ES Modules，另一方面借助于webpack等工具可以实现对CommonJS或者ES Module代码的转换；
- AMD和CMD已经使用非常少了，所以这里我们进行简单的演练；

### 3.4ES Module

#### 3.4.1. 认识ES Module

JavaScript没有模块化一直是它的痛点，所以才会产生我们前面学习的社区规范：CommonJS、AMD、CMD等，所以在ES推出自己的模块化系统时，大家也是兴奋异常。

ES Module和CommonJS的模块化有一些不同之处：

- 一方面它使用了import和export关键字；
- 另一方面它采用编译期静态类型检测，并且动态引用的方式；

ES Module模块采用export和import关键字来实现模块化：

- export负责将模块内的内容导出；
- import负责从其他模块导入内容；

了解：采用ES Module将自动采用严格模式：`use strict`

#### 3.4.2浏览器中演示ES6的模块化

代码结构如下：

```
├── index.html
├── main.js
└── modules
    └── foo.js
```

index.html中引入两个js文件作为模块：

```js
<script src="./modules/foo.js" type="module"></script>
<script src="main.js" type="module"></script>
```

如果直接在浏览器中运行代码，会报如下错误：

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725231747427.png" alt="image-20210725231747427" style="zoom:80%;" />

这个在MDN上面有给出解释：

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules
- 你需要注意本地测试 — 如果你通过本地加载Html 文件 (比如一个 `file://` 路径的文件), 你将会遇到 CORS 错误，因为Javascript 模块安全性需要。
- 你需要通过一个服务器来测试。

我这里使用的VSCode，VSCode中有一个插件：Live Server

- 通过插件运行，可以将我们的代码运行在一个本地服务中；

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725231823416.png" alt="image-20210725231823416" style="zoom:80%;" />



####  3.4.3export关键字

export关键字将一个模块中的变量、函数、类等导出；

foo.js文件中默认代码如下：

```js
const name = 'name';
const age = 18;
let message = "my name is Hello";

function sayHello(name) {
  console.log("Hello " + name);
}
```

**我们希望将其他中内容全部导出，它可以有如下的方式：**

方式一：在语句声明的前面直接加上export关键字

```js
export const name = 'coderwhy';
export const age = 18;
export let message = "my name is why";

export function sayHello(name) {
  console.log("Hello " + name);
}
```

方式二：将所有需要导出的标识符，放到export后面的 `{}`中

- 注意：这里的 `{}`里面不是ES6的对象字面量的增强写法，`{}`也不是表示一个对象的；
- 所以：`export {name: name}`，是错误的写法；

```js
const name = 'coderwhy';
const age = 18;
let message = "my name is why";

function sayHello(name) {
  console.log("Hello " + name);
}

export {
  name,
  age,
  message,
  sayHello
}
```

方式三：导出时给`标识符`起一个别名

```js
export {
  name as fName,
  age as fAge,
  message as fMessage,
  sayHello as fSayHello
}
```

#### 3.4.4 import关键字

import关键字负责从另外一个模块中导入内容

**导入内容的方式也有多种：**

方式一：`import {标识符列表} from '模块'`；

- 注意：这里的`{}`也不是一个对象，里面只是存放导入的标识符列表内容；

```js
import { name, age, message, sayHello } from './modules/foo.js';

console.log(name)
console.log(message);
console.log(age);
sayHello("Kobe");
```

方式二：导入时给标识符起别名

```js
import { name as wName, age as wAge, message as wMessage, sayHello as wSayHello } from './modules/foo.js';
```

方式三：将模块功能放到一个模块功能对象（a module object）上

```js
import * as foo from './modules/foo.js';

console.log(foo.name);
console.log(foo.message);
console.log(foo.age);
foo.sayHello("Kobe");
```

#### 3.4.5 export和import结合

如果从一个模块中导入的内容，我们希望再直接导出出去，这个时候可以直接使用export来导出。

bar.js中导出一个sum函数：

```js
export const sum = function(num1, num2) {
  return num1 + num2;
}
```

foo.js中导入，但是只是做一个中转：

```js
export { sum } from './bar.js';
```

main.js直接从foo中导入：

```js
import { sum } from './modules/foo.js';
console.log(sum(20, 30));
```

甚至在foo.js中导出时，我们可以变化它的名字

```js
export { sum as barSum } from './bar.js';
```

为什么要这样做呢？

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中；
- 这样方便指定统一的接口规范，也方便阅读；
- 这个时候，我们就可以使用export和import结合使用；

#### 3.4.6default用法

前面我们学习的导出功能都是有名字的导出（named exports）：

- 在导出export时指定了名字；
- 在导入import时需要知道具体的名字；

还有一种导出叫做默认导出（default export）

- 默认导出export时可以不需要指定名字；
- 在导入时不需要使用 `{}`，并且可以自己来指定名字；
- 它也方便我们和现有的CommonJS等规范相互操作；

导出格式如下：

```js
export default function sub(num1, num2) {
  return num1 - num2;
}
```

导入格式如下：

```js
import sub from './modules/foo.js';

console.log(sub(20, 30));
```

注意：在一个模块中，只能有一个默认导出（default export）；

#### 3.4.7import()

通过import加载一个模块，是不可以在其放到逻辑代码中的，比如：

```js
if (true) {
  import sub from './modules/foo.js';
}
```

为什么会出现这个情况呢？

- 这是因为ES Module在被JS引擎解析时，就必须知道它的依赖关系；
- 由于这个时候js代码没有任何的运行，所以无法在进行类似于if判断中根据代码的执行情况；
- 甚至下面的这种写法也是错误的：因为我们必须到运行时能确定path的值；

```js
const path = './modules/foo.js';

import sub from path;
```

但是某些情况下，我们确确实实希望动态的来加载某一个模块：

- 如果根据不懂的条件，动态来选择加载模块的路径；
- 这个时候我们需要使用 `import()` 函数来动态加载；

aaa.js模块：

```js
export function aaa() {
  console.log("aaa被打印");
}
```

bbb.js模块：

```js
export function bbb() {
  console.log("bbb被执行");
}
```

main.js模块：

```js
let flag = true;
if (flag) {
  import('./modules/aaa.js').then(aaa => {
    aaa.aaa();
  })
} else {
  import('./modules/bbb.js').then(bbb => {
    bbb.bbb();
  })
}
```

#### 3.4.8ES Module的原理

1. ES Module和CommonJS的区别

**CommonJS模块加载js文件的过程是运行时加载的，并且是同步的：**

- 运行时加载意味着是js引擎在执行js代码的过程中加载 模块；
- 同步的就意味着一个文件没有加载结束之前，后面的代码都不会执行；

```js
console.log("main代码执行");

const flag = true;
if (flag) {
  // 同步加载foo文件，并且执行一次内部的代码
  const foo = require('./foo');
  console.log("if语句继续执行");
}
```

**CommonJS通过module.exports导出的是一个对象：**

- 导出的是一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量；
- 但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改；

**ES Module加载js文件的过程是编译（解析）时加载的，并且是异步的：**

- 编译时（解析）时加载，意味着import不能和运行时相关的内容放在一起使用：

- - 比如from后面的路径需要动态获取；
  - 比如不能将import放到if等语句的代码块中；
  - 所以我们有时候也称ES Module是静态解析的，而不是动态或者运行时解析的；

- 异步的意味着：JS引擎在遇到`import`时会去获取这个js文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行；

- - 也就是说设置了 `type=module` 的代码，相当于在script标签上也加上了 `async` 属性；
  - 如果我们后面有普通的script标签以及对应的代码，那么ES Module对应的js文件和代码不会阻塞它们的执行；

```js
<script src="main.js" type="module"></script>
<!-- 这个js文件的代码不会被阻塞执行 -->
<script src="index.js"></script>
```

**ES Module通过export导出的是变量本身的引用：**

- export在导出一个变量时，js引擎会解析这个语法，并且创建**模块环境记录**（module environment record）；
- **模块环境记录**会和变量进行 `绑定`（binding），并且这个绑定是实时的；
- 而在导入的地方，我们是可以实时的获取到绑定的最新值的；

**所以我们下面的代码是成立的：**

bar.js文件中修改

```js
let name = 'coderwhy';

setTimeout(() => {
  name = "湖人总冠军";
}, 1000);

setTimeout(() => {
  console.log(name);
}, 2000);

export {
  name
}
```

main.js文件中获取

```js
import { name } from './modules/bar.js';

console.log(name);

// bar中修改, main中验证
setTimeout(() => {
  console.log(name);
}, 2000);
```

但是，下面的代码是不成立的：main.js中修改

```js
import { name } from './modules/bar.js';

console.log(name);

// main中修改, bar中验证
setTimeout(() => {
  name = 'kobe';
}, 1000);
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210725235954040.png" alt="image-20210725235954040" style="zoom:80%;" />

思考：如果bar.js中导出的是一个对象，那么main.js中是否可以修改对象中的属性呢？

- 答案是可以的，因为他们指向同一块内存空间；（自己编写代码验证，这里不再给出）

#### 3.4.9Node中支持 ES Module

**在Current版本中**

在最新的Current版本（v14.13.1）中，支持es module我们需要进行如下操作：

- 方式一：在package.json中配置 `type: module`（后续再学习，我们现在还没有讲到package.json文件的作用）
- 方式二：文件以 `.mjs` 结尾，表示使用的是ES Module；

这里我们暂时选择以 `.mjs` 结尾的方式来演练：

bar.mjs

```js
const name = 'coderwhy';

export {
  name
}
```

main.mjs

```js
import { name } from './modules/bar.mjs';

console.log(name);
```

**在LTS版本中**

在最新的LST版本（v12.19.0）中，我们也是可以正常运行的，但是会报一个警告：

### 3.5ES Module和CommonJS的交互

**CommonJS加载ES Module**

结论：通常情况下，CommonJS不能加载ES Module

- 因为CommonJS是同步加载的，但是ES Module必须经过静态分析等，无法在这个时候执行JavaScript代码；
- 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，也可能会支持；
- Node当中是不支持的；

**ES Module加载CommonJS**

结论：多数情况下，ES Module可以加载CommonJS

- ES Module在加载CommonJS时，会将其module.exports导出的内容作为default导出方式来使用；
- 这个依然需要看具体的实现，比如webpack中是支持的、Node最新的Current版本也是支持的；
- 但是在最新的LTS版本中就不支持；

foo.js

```js
const address = 'foo的address';

module.exports = {
  address
}
```

main.js

```js
import foo from './modules/foo.js';
console.log(foo.address);
```

## 4.常用的内置模块

### 4.1path

#### 4.1.1介绍

path模块用于对路径和文件进行处理。

并且我们知道在Mac OS、Linux和window上的路径是不一样的

- window上会使用 `\`或者 `\\` 来作为文件路径的分隔符，当然目前也支持 `/`；
- 在Mac OS、Linux的Unix操作系统上使用 `/` 来作为文件路径的分隔符；

那么如果我们在window上使用 `\` 来作为分隔符开发了一个应用程序，要部署到Linux上面应该怎么办呢？

- 显示路径会出现一些问题；
- 所以为了屏蔽他们之间的差异，在开发中对于路径的操作我们可以使用 `path` 模块；

#### 4.1.2从路径中获取信息

- dirname：获取文件的父文件夹；
- basename：获取文件名；
- extname：获取文件扩展名；

```js
const path = require("path");

const myPath = '/Users/coderwhy/Desktop/Node/课堂/PPT/01_邂逅Node.pdf';

const dirname = path.dirname(myPath);
const basename = path.basename(myPath);
const extname = path.extname(myPath);

console.log(dirname); // /Users/coderwhy/Desktop/Node/课堂/PPT
console.log(basename); // 01_邂逅Node.pdf
console.log(extname); // .pdf
```

#### 4.1.3路径的拼接

- 如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符；
- 这个时候我们可以使用`path.join`函数；

```js
console.log(path.join('/user', 'why', 'abc.txt'));
```

#### 4.1.4将文件和某个文件夹拼接

- 如果我们希望将某个文件和文件夹拼接，可以使用 `path.resolve`;

- - `resolve`函数会判断我们拼接的路径前面是否有 `/`或`../`或`./`；
  - 如果有表示是一个绝对路径，会返回对应的拼接路径；
  - 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接

```js
path.resolve('abc.txt'); // /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/06_常见的内置模块/02_文件路径/abc.txt
path.resolve('/abc.txt'); // /abc.txt
path.resolve('/User/why', 'abc.txt'); // /User/why/abc.txt
path.resolve('User/why', 'abc.txt'); // /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/06_常见的内置模块/02_文件路径/User/why/abc.txt
```

resolve其实我们在webpack中也会使用：

```js
const CracoLessPlugin = require('craco-less');
const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    }
  ],
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components")
    }
  }
}
```

### 4.2fs

#### 4.2.1介绍

fs是File System的缩写，表示文件系统。

对于任何一个为服务器端服务的语言或者框架通常都会有自己的文件系统：

- 因为服务器需要将各种数据、文件等放置到不同的地方；
- 比如用户数据可能大多数是放到数据库中的（后面我们也会学习）；
- 比如某些配置文件或者用户资源（图片、音视频）都是以文件的形式存在于操作系统上的；

Node也有自己的文件系统操作模块，就是fs：

- 借助于Node帮我们封装的文件系统，我们可以在任何的操作系统（window、Mac OS、Linux）上面直接去操作文件；
- 这也是Node可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因；

Node文件系统的API非常的多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html

但是这些API大多数都提供三种操作方式：

- 方式一：同步操作文件：代码会被阻塞，不会继续执行；
- 方式二：异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；
- 方式三：异步Promise操作文件：代码不会被阻塞，通过 `fs.promises` 调用方法操作，会返回一个Promise，可以通过then、catch进行处理；

**我们这里以获取一个文件的状态为例：**

- 注意：都需要引入 `fs` 模块；

方式一：同步操作文件

```js
// 1.方式一: 同步读取文件
const state = fs.statSync('../foo.txt');
console.log(state);

console.log('后续代码执行');
```

方式二：异步回调函数操作文件

```js
// 2.方式二: 异步读取
fs.stat("../foo.txt", (err, state) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(state);
})
console.log("后续代码执行");
```

方式三：异步Promise操作文件

```js
// 3.方式三: Promise方式
fs.promises.stat("../foo.txt").then(state => {
  console.log(state);
}).catch(err => {
  console.log(err);
})
console.log("后续代码执行");
```

后续代码演练中，我将以异步回调的方式演练：相对更通用一些；

#### 4.2.2文件描述符

文件描述符（File descriptors）是什么呢？

在 POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格。

- 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符。
- 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件。
- Windows 系统使用了一个虽然不同但概念上类似的机制来跟踪资源。
- 为了简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符。

`fs.open()` 方法用于分配新的文件描述符。一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息。

```js
// 获取文件描述符
fs.open("../foo.txt", 'r', (err, fd) => {
  console.log(fd);

  fs.fstat(fd, (err, state) => {
    console.log(state);
  })
})
```

#### 4.2.3文件的读写

如果我们希望对文件的内容进行操作，这个时候可以使用文件的读写：

- `fs.readFile(path[, options], callback)`：读取文件的内容；
- `fs.writeFile(file, data[, options], callback)`：在文件中写入内容；

文件写入：

```js
fs.writeFile('../foo.txt', content, {}, err => {
  console.log(err);
})
```

在上面的代码中，你会发现有一个大括号没有填写任何的内容，这个是写入时填写的option参数：

- flag：写入的方式。
- encoding：字符的编码；

我们先来看flag：

- flag的值有很多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags

- - `w` 打开文件写入，默认值；
  - `w+`打开文件进行读写，如果不存在则创建文件；
  - `r+` 打开文件进行读写，如果不存在那么抛出异常；
  - `r`打开文件读取，读取时的默认值；
  - `a`打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
  - `a+`打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

我们再来看看编码：

- 我之前在简书上写过一篇关于字符编码的文章：https://www.jianshu.com/p/899e749be47c
- 目前基本用的都是UTF-8编码；

文件读取：

- 如果不填写encoding，返回的结果是Buffer；

```js
fs.readFile('../foo.txt', {encoding: 'utf-8'}, (err, data) => {
  console.log(data);
})
```

文件读取：

```js
const fs = require('fs');

fs.readFile('../foo.txt', {encoding: 'utf-8'}, (err, data) => {
  console.log(data);
})
```

#### 4.2.4文件夹操作

**新建一个文件夹**

使用`fs.mkdir()`或`fs.mkdirSync()`创建一个新文件夹：

```js
const fs = require('fs');

const dirname = '../why';

if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  })
}
```

**获取文件夹的内容**

```js
// 读取文件夹
function readFolders(folder) {
  fs.readdir(folder, {withFileTypes: true} ,(err, files) => {
    files.forEach(file => {
      if (file.isDirectory()) {
        const newFolder = path.resolve(dirname, file.name);
        readFolders(newFolder);
      } else {
        console.log(file.name);
      }
    })
  })
}

readFolders(dirname);
```

**文件重命名**

```js
fs.rename('../why', '../coder', err => {
  console.log(err);
})
```

### 4.3events

#### 4.3.1基本使用

Node中的核心API都是基于异步事件驱动的：

- 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
- 我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用；

发出事件和监听事件都是通过EventEmitter类来完成的，它们都属于events对象。

- `emitter.on(eventName, listener)`：监听事件，也可以使用`addListener`；
- `emitter.off(eventName, listener)`：移除事件监听，也可以使用`removeListener`；
- `emitter.emit(eventName[, ...args])`：发出事件，可以携带一些参数；

```js
const EventEmmiter = require('events');

// 监听事件
const bus = new EventEmmiter();

function clickHanlde(args) {
  console.log("监听到click事件", args);
}

bus.on("click", clickHanlde);

setTimeout(() => {
  bus.emit("click", "coderwhy");
  bus.off("click", clickHanlde);
  bus.emit("click", "kobe");
}, 2000);
```

#### 4.3.2常见的属性

EventEmitter的实例有一些属性，可以记录一些信息：

- `emitter.eventNames()`：返回当前 `EventEmitter对象`注册的事件字符串数组；
- `emitter.getMaxListeners()`：返回当前 `EventEmitter对象`的最大监听器数量，可以通过`setMaxListeners()`来修改，默认是10；
- `emitter.listenerCount(事件名称)`：返回当前 `EventEmitter对象`某一个事件名称，监听器的个数；
- `emitter.listeners(事件名称)`：返回当前 `EventEmitter对象`某个事件监听器上所有的监听器数组；

```js
console.log(bus.eventNames());
console.log(bus.getMaxListeners());
console.log(bus.listenerCount("click"));
console.log(bus.listeners("click"));
```

#### 4.3.3方法的补充

`emitter.once(eventName, listener)`：事件监听一次

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.once('click', (args) => {
  console.log("监听到事件", args);
})

setTimeout(() => {
  emitter.emit('click', 'coderwhy');
  emitter.emit('click', 'coderwhy');
}, 2000);
```

`emitter.prependListener()`：将监听事件添加到最前面

```js
emitter.on('click', (args) => {
  console.log("a监听到事件", args);
})

// b监听事件会被放到前面
emitter.prependListener("click", (args) => {
  console.log("b监听到事件", args);
})
```

`emitter.prependOnceListener()`：将监听事件添加到最前面，但是只监听一次

```js
emitter.prependOnceListener("click", (args) => {
  console.log("c监听到事件", args);
})
```

`emitter.removeAllListeners([eventName])`：移除所有的监听器

```js
// 移除emitter上的所有事件监听
emitter.removeAllListeners();
// 移除emitter上的click事件监听
emitter.removeAllListeners("click");
```

## 5.npm详解

### 5.1认识npm

我们已经学习了在JavaScript中可以通过模块化的方式将代码划分成一个个小的结构：

- 在以后的开发中我们就可以通过模块化的方式来封装自己的代码，并且封装成一个工具；
- 这个工具我们可以让同事通过导入的方式来使用，甚至你可以分享给世界各地的程序员来使用；

**如果我们分享给世界上所有的程序员使用，有哪些方式呢？**

方式一：上传到GitHub上、其他程序员通过GitHub下载我们的代码手动的引用；

- 缺点是大家必须知道你的代码GitHub的地址，并且从GitHub上手动下载；
- 需要在自己的项目中手动的引用，并且管理相关的依赖；
- 不需要使用的时候，需要手动来删除相关的依赖；
- 当遇到版本升级或者切换时，需要重复上面的操作；

显然，上面的方式是有效的，但是这种传统的方式非常麻烦，并且容易出错；

方式二：使用一个专业的工具来管理我们的代码

- 我们通过工具将代码发布到特定的位置；
- 其他程序员直接通过工具来安装、升级、删除我们的工具代码；

显然，通过第二种方式我们可以更好的管理自己的工具包，其他人也可以更好的使用我们的工具包。

包管理工具npm：

- Node Package Manager，也就是Node包管理器；
- 但是目前已经不仅仅是Node包管理器了，在前端项目中我们也在使用它来管理依赖的包；
- 比如express、koa、react、react-dom、axios、babel、webpack等等；

npm管理的包可以在哪里查看、搜索呢？

- https://www.npmjs.com/
- 这是我们安装相关的npm包的官网；

npm管理的包存放在哪里呢？

- 我们发布自己的包其实是发布到registry上面的；
- 当我们安装一个包时其实是从registry上面下载的包；

### 5.2项目配置文件

事实上，我们每一个项目都会有一个对应的配置文件，无论是前端项目还是后端项目：

- 这个配置文件会记录着你项目的名称、版本号、项目描述等；
- 也会记录着你项目所依赖的其他库的信息和依赖库的版本号；

这个配置文件在Node环境下面（无论是前端还是后端）就是package.json。

我们以vue cli4脚手架创建的项目为例：

```json
{
  "name": "my-vue",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```

事实上Vue ClI4脚手架创建的项目相对进行了简化，我们来看一下CLI2创建的项目：

```json
{
  "name": "vuerouterbasic",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "'xujian'",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

我们也可以手动创建一个package.json文件：

```bash
npm init #创建时填写信息
npm init -y # 所有信息使用默认的
```

`npm init -y`生成文件的效果：

```json
{
  "name": "learn-npm",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

我们会发现属性非常的多，我们这里对一些常见属性进行一些解析。

**必须填写的属性：name、version**

- name是项目的名称；
- version是当前项目的版本号；
- description是描述信息，很多时候是作为项目的基本描述；
- author是作者相关信息（发布时用到）；
- license是开源协议（发布时用到）；

**private属性：**

- private属性记录当前的项目是否是私有的；
- 当值为true时，npm是不能发布它的，这是防止私有项目或模块发布出去的方式；

**main属性：**

- 设置程序的入口。

- 很多人会有疑惑，webpack不是会自动找到程序的入口吗？

- - 这个入口和webpack打包的入口并不冲突；
  - 它是在你发布一个模块的时候会用到的；
  - 比如我们使用axios模块 `const axios = require('axios');`
  - 实际上是找到对应的main属性查找文件的；

![image-20210728123215184](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210728123215184.png)

**scripts属性**

- scripts属性用于配置一些脚本命令，以键值对的形式存在；

- 配置后我们可以通过 `npm run 命令的key`来执行这个命令；

- `npm start`和`npm run start`的区别是什么？

- - 它们是等价的；
  - 对于常用的 start、 test、stop、restart可以省略掉run直接通过 `npm start`等方式运行；

**dependencies属性**

- dependencies属性是指定无论开发环境还是生产环境都需要依赖的包；
- 通常是我们项目实际开发用到的一些库模块；
- 与之对应的是devDependencies；**dependencies属性**
  - dependencies属性是指定无论开发环境还是生成环境都需要依赖的包；
  - 通常是我们项目实际开发用到的一些库模块；
  - 与之对应的是devDependencies；

**devDependencies属性**

- 一些包在生产环境是不需要的，比如webpack、babel等；
- 这个时候我们会通过 `npm install webpack --save-dev`，将它安装到devDependencies属性中；

疑问：那么在生产环境如何保证不安装这些包呢？

- 生成环境不需要安装时，我们需要通过 `npm install --production` 来安装文件的依赖；

**版本管理的问题**

我们会发现安装的依赖版本出现：`^2.0.3`或`~2.0.3`，这是什么意思呢？

npm的包通常需要遵从semver版本规范：

- semver：https://semver.org/lang/zh-CN/
- npm semver：https://docs.npmjs.com/misc/semver

semver版本规范是X.Y.Z：

- X主版本号（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）；
- Y次版本号（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）；
- Z修订号（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）；

我们这里解释一下 ^和~的区别：

- `^x.y.z`：表示x是保持不变的，y和z永远安装最新的版本；
- `~x.y.z`：表示x和y保持不变的，z永远安装最新的版本；

**engines属性**

- engines属性用于指定Node和NPM的版本号；
- 在安装的过程中，会先检查对应的引擎版本，如果不符合就会报错；
- 事实上也可以指定所在的操作系统 `"os" : [ "darwin", "linux" ]`，只是很少用到；

**browserslist属性**

- 用于配置打包后的JavaScript浏览器的兼容情况，参考；
- 否则我们需要手动的添加polyfills来让支持某些语法；
- 也就是说它是为webpack等打包工具服务的一个属性（这里不是详细讲解webpack等工具的工作原理，所以不再给出详情）；

### 5.3npm工具解析

#### 5.3.1npm install命令

安装npm包分两种情况：

- 全局安装（global install）：`npm install yarn -g`;
- 项目（局部）安装（local install）：`npm install`

**全局安装**

全局安装是直接将某个包安装到全局：

比如yarn的全局安装：

```bash
npm install yarn -g
```

但是很多人对全局安装有一些误会：

- 通常使用npm全局安装的包都是一些工具包：yarn、webpack等；
- 并不是类似于 axios、express、koa等库文件；
- 所以全局安装了之后并不能让我们在所有的项目中使用 axios等库；

**项目安装**

项目安装会在当前目录下生产一个 `node_modules` 文件夹，我们之前讲解require查找顺序时有讲解过这个包在什么情况下被查找；

局部安装分为开发时依赖和生产时依赖：

```bash
# 安装开发和生产依赖
npm install axios --save
npm install axios -S
npm install axios
npm i axios

# 开发者
npm install axios --save-dev
npm install axios -D
npm i axios -D
```

#### 5.3.2npm install原理

- npm install会检测是有package-lock.json文件：

- - 检测lock中包的版本是否和package.json中一致（会按照semver版本规范检测）；
  - 一致的情况下，会去优先查找缓存
  - 查找到，会获取缓存中的压缩文件，并且将压缩文件解压到node_modules文件夹中；
  - 不一致，那么会重新构建依赖关系，直接会走顶层的流程；
  - 没有找到，会从registry仓库下载，直接走顶层流程；
  - 分析依赖关系，这是因为我们可能包会依赖其他的包，并且多个包之间会产生相同依赖的情况；
  - 从registry仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）；
  - 获取到压缩包后会对压缩包进行缓存（从npm5开始有的）；
  - 将压缩包解压到项目的node_modules文件夹中（前面我们讲过，require的查找顺序会在该包下面查找）
  - 没有lock文件
  - 有lock文件

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210728231227747.png" alt="image-20210728231227747" style="zoom:80%;" />

package-lock.json文件：

```json
{
  "name": "learn-npm",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "axios": {
      "version": "0.20.0",
      "resolved": "https://registry.npmjs.org/axios/-/axios-0.20.0.tgz",
      "integrity": "sha512-ANA4rr2BDcmmAQLOKft2fufrtuvlqR+cXNNinUmvfeSNCOF98PZL+7M/v1zIdGo7OLjEA9J2gXJL+j4zGsl0bA==",
      "requires": {
        "follow-redirects": "^1.10.0"
      }
    },
    "follow-redirects": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.13.0.tgz",
      "integrity": "sha512-aq6gF1BEKje4a9i9+5jimNFIpq4Q1WiwBToeRK5NvZBd/TRsmW8BsJfOEGkr76TbOyPVD3OVDN910EcUNtRYEA=="
    }
  }
}
```

package-lock.json文件解析：

- name：项目的名称；

- version：项目的版本；

- lockfileVersion：lock文件的版本；

- requires：使用requires来跟着模块的依赖关系；

- dependencies：项目的依赖

- - version表示实际安装的axios的版本；
  - resolved用来记录下载的地址，registry仓库中的位置；
  - requires记录当前模块的依赖；
  - integrity用来从缓存中获取索引，再通过索引去获取压缩包文件；
  - 当前项目依赖axios，但是axios依赖follow-redireacts；
  - axios中的属性如下

#### 5.3.3其他npm命令

卸载某个依赖包：

```bash
npm uninstall package
npm uninstall package --save-dev
npm uninstall package -D
```

强制重新build

```bash
npm rebuild
```

清除缓存

```bash
npm cache clean
```

#### 5.3.4yarn和cnpm

另一个node包管理工具yarn：

- yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具；
- yarn 是为了弥补 npm 的一些缺陷而出现的；
- 早期的npm存在很多的缺陷，比如安装依赖速度很慢、版本依赖混乱等等一系列的问题；
- 虽然从npm5版本开始，进行了很多的升级和改进，但是依然很多人喜欢使用yarn；

这里给出一张常用命令的对比:



**补充：cnpm**

由于一些特殊的原因，某些情况下我们没办法很好的从 `https://registry.npmjs.org`下载下来一些需要的包。

查看npm镜像：

```bash
npm config get registry # npm config get registry
```

我们可以直接设置npm的镜像：

```bash
npm config set registry https://registry.npm.taobao.org
```

但是对于大多数人来说（比如我），并不希望将npm镜像修改了：

- 第一，不太希望随意修改npm原本从官方下来包的渠道；
- 第二，担心某天淘宝的镜像挂了或者不维护了，又要改来改去；

这个时候，我们可以使用cnpm，并且将cnpm设置为淘宝的镜像：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm config get registry # https://r.npm.taobao.org/
```

**补充：npx**

npx是npm5.2之后自带的一个命令。

npx的作用非常多，但是比较常见的是使用它来调用项目中的某个模块的指令。

我们以webpack为例：

- 全局安装的是webpack5.1.3
- 项目安装的是webpack3.6.0

如果我在终端执行 `webpack --version`使用的是哪一个命令呢？

- 显示结果会是 `webpack 5.1.3`，事实上使用的是全局的，为什么呢？
- 原因非常简单，在当前目录下找不到webpack时，就会去全局找，并且执行命令；

那么如何使用项目（局部）的webpack，常见的是两种方式：

- 方式一：明确查找到node_module下面的webpack
- 方式二：在 `scripts`定义脚本，来执行webpack；

方式一：在终端中使用如下命令（在项目根目录下）

```bash
./node_modules/.bin/webpack --version
```

方式二：修改package.json中的scripts

```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack --version"
  },
```

终端中执行：

```bash
npm run webpack
```

但是这两种方式都有一点点麻烦，更好的办法是直接使用npx：

```bash
npx webpack --version
```

npx的原理非常简单，它会到当前目录的node_modules/.bin目录下查找对应的命令；

## 6.Buffer使用

### 6.1数据的二进制

计算机中所有的内容：文字、数字、图片、音频、视频最终都会使用二进制来表示。

JavaScript可以直接去处理非常直观的数据：比如字符串，我们通常展示给用户的也是这些内容。

不对啊，JavaScript不是也可以处理图片吗？

- 事实上在网页端，图片我们一直是交给浏览器来处理的；
- JavaScript或者HTML，只是负责告诉浏览器一个图片的地址；
- 浏览器负责获取这个图片，并且最终将这个图片渲染出来；

但是对于服务器来说是不一样的：

- 服务器要处理的本地文件类型相对较多;
- 比如某一个保存文本的文件并不是使用 `utf-8`进行编码的，而是用 `GBK`，那么我们必须读取到他们的二进制数据，再通过GKB转换成对应的文字；
- 比如我们需要读取的是一张图片数据（二进制），再通过某些手段对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜），Node中有一个Sharp的库，就是读取图片或者传入图片的Buffer对其再进行处理；
- 比如在Node中通过TCP建立长连接，TCP传输的是字节流，我们需要将数据转成字节再进行传入，并且需要知道传输字节的大小（客服端需要根据大小来判断读取多少内容）；

我们会发现，对于前端开发来说，通常很少会和二进制打交道，但是对于服务器端为了做很多的功能，我们必须直接去操作其二进制的数据；

所以Node为了可以方便开发者完成更多功能，提供给了我们一个类Buffer，并且它是全局的。

### 6.2Buffer和二进制

我们前面说过，Buffer中存储的是二进制数据，那么到底是如何存储呢？

- 我们可以将Buffer看成是一个存储二进制的数组；
- 这个数组中的每一项，可以保存8位二进制：`00000000`

为什么是8位呢？

- 在计算机中，很少的情况我们会直接操作一位二进制，因为一位二进制存储的数据是非常有限的；
- 所以通常会将8位合在一起作为一个单元，这个单元称之为一个字节（byte）；
- 也就是说 `1byte = 8bit`，`1kb=1024byte`，`1M=1024kb`;

- 比如很多编程语言中的int类型是4个字节，long类型是8个字节；
- 比如TCP传输的是字节流，在写入和读取时都需要说明字节的个数；
- 比如RGB的值分别都是255，所以本质上在计算机中都是用一个字节存储的；

也就是说，Buffer相当于是一个字节的数组，数组中的每一项对于一个字节的大小：

如果我们希望将一个字符串放入到Buffer中，是怎么样的过程呢？

```js
const buffer01 = new Buffer("why");

console.log(buffer01);
```

![image-20210728234811298](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210728234811298.png)

当然目前已经不希望我们这样来做了。

那么我们可以通过另外一个创建方法：

```js
const buffer2 = Buffer.from("why");
console.log(buffer2);
```

如果是中文呢？

```js
const buffer3 = Buffer.from("王红元");
console.log(buffer3);
// <Buffer e7 8e 8b e7 ba a2 e5 85 83>
const str = buffer3.toString();
console.log(str);
// 王红元
```

如果编码和解码不同：

```js
const buffer3 = Buffer.from("王红元", 'utf16le');
console.log(buffer3);

const str = buffer3.toString('utf8');
console.log(str); // �s�~CQ
```

### 6.3Buffer的其他创建

Buffer的创建方式有很多：

![image-20210728235246632](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210728235246632.png)

来看一下`Buffer.alloc`:

- 我们会发现创建了一个8位长度的Buffer，里面所有的数据默认为00；

```js
const buffer01 = Buffer.alloc(8);

console.log(buffer01); // <Buffer 00 00 00 00 00 00 00 00>
```

我们也可以对其进行操作：

```js
buffer01[0] = 'w'.charCodeAt();
buffer01[1] = 100;
buffer01[2] = 0x66;
console.log(buffer01);
```

也可以使用相同的方式来获取：

```js
console.log(buffer01[0]);
console.log(buffer01[0].toString(16));
```

### 6.4Buffer和文件读取

文本文件的读取：

```js
const fs = require('fs');

fs.readFile('./test.txt', (err, data) => {
  console.log(data); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
  console.log(data.toString()); // Hello World
})
```

图片文件的读取：

```js
fs.readFile('./zznh.jpg', (err, data) => {
  console.log(data); // <Buffer ff d8 ff e0 ... 40418 more bytes>
});
```

图片文件的读取和转换：

- 将读取的某一张图片，转换成一张200x200的图片；
- 这里我们可以借助于 `sharp` 库来完成；

```js
const sharp = require('sharp');
const fs = require('fs');

sharp('./test.png')
  .resize(1000, 1000)
  .toBuffer()
  .then(data => {
    fs.writeFileSync('./test_copy.png', data);
  })
```

### 6.5Buffer的内存分配

事实上我们创建Buffer时，并不会频繁的向操作系统申请内存，它会默认先申请一个8 * 1024个字节大小的内存，也就是8kb

- node/lib/buffer.js：135行

```js
Buffer.poolSize = 8 * 1024;
let poolSize, poolOffset, allocPool;

const encodingsMap = ObjectCreate(null);
for (let i = 0; i < encodings.length; ++i)
  encodingsMap[encodings[i]] = i;

function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeBuffer(poolSize).buffer;
  markAsUntransferable(allocPool);
  poolOffset = 0;
}
createPool();
```

假如我们调用Buffer.from申请Buffer：

- 这里我们以从字符串创建为例
- node/lib/buffer.js：290行

```js
Buffer.from = function from(value, encodingOrOffset, length) {
  if (typeof value === 'string')
    return fromString(value, encodingOrOffset);
 
 // 如果是对象，另外一种处理情况
  // ...
};
```

我们查看fromString的调用：

- node/lib/buffer.js：428行

```js
function fromString(string, encoding) {
  let ops;
  if (typeof encoding !== 'string' || encoding.length === 0) {
    if (string.length === 0)
      return new FastBuffer();
    ops = encodingOps.utf8;
    encoding = undefined;
  } else {
    ops = getEncodingOps(encoding);
    if (ops === undefined)
      throw new ERR_UNKNOWN_ENCODING(encoding);
    if (string.length === 0)
      return new FastBuffer();
  }
  return fromStringFast(string, ops);
}
```

接着我们查看fromStringFast：

- 这里做的事情是判断剩余的长度是否还足够填充这个字符串；
- 如果不足够，那么就要通过 `createPool` 创建新的空间；
- 如果够就直接使用，但是之后要进行 `poolOffset`的偏移变化；
- node/lib/buffer.js：428行

```js
function fromStringFast(string, ops) {
  const length = ops.byteLength(string);

  if (length >= (Buffer.poolSize >>> 1))
    return createFromString(string, ops.encodingVal);

  if (length > (poolSize - poolOffset))
    createPool();
  let b = new FastBuffer(allocPool, poolOffset, length);
  const actual = ops.write(b, string, 0, length);
  if (actual !== length) {
    // byteLength() may overestimate. That's a rare case, though.
    b = new FastBuffer(allocPool, poolOffset, actual);
  }
  poolOffset += actual;
  alignPool();
  return b;
}
```

### 6.6Stream

#### 6.6.1认识Stream

什么是流呢？

- 我们的第一反应应该是流水，源源不断的流动；
- 程序中的流也是类似的含义，我们可以想象当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断的被读取到我们程序中；
- 而这个一连串的字节，就是我们程序中的流；

所以，我们可以这样理解流：

- 是连续字节的一种表现形式和抽象概念；
- 流应该是可读的，也是可写的；

在之前学习文件的读写时，我们可以直接通过 `readFile`或者 `writeFile`方式读写文件，为什么还需要流呢？

- 直接读写文件的方式，虽然简单，但是无法控制一些细节的操作；
- 比如从什么位置开始读、读到什么位置、一次性读取多少个字节；
- 读到某个位置后，暂停读取，某个时刻恢复读取等等；
- 或者这个文件非常大，比如一个视频文件，一次性全部读取并不合适；

事实上Node中很多对象是基于流实现的：

- http模块的Request和Response对象；
- process.stdout对象；

官方：另外所有的流都是EventEmitter的实例：

流（Stream）的分类：

- `Writable`：可以向其写入数据的流（例如 `fs.createWriteStream()`）。
- `Readable`：可以从中读取数据的流（例如 `fs.createReadStream()`）。
- `Duplex`：同时为`Readable`和的流`Writable`（例如 `net.Socket`）。
- `Transform`：`Duplex`可以在写入和读取数据时修改或转换数据的流（例如`zlib.createDeflate()`）。

#### 6.6.2Readable

之前我们读取一个文件的信息：

```js
fs.readFile('./foo.txt', (err, data) => {
  console.log(data);
})
```

这种方式是一次性将一个文件中所有的内容都读取到程序（内存）中，但是这种读取方式就会出现我们之前提到的很多问题：

- 文件过大、读取的位置、结束的位置、一次读取的大小；

这个时候，我们可以使用 `createReadStream`，我们来看几个参数，更多参数可以参考官网：

- start：文件读取开始的位置；
- end：文件读取结束的位置；
- highWaterMark：一次性读取字节的长度，默认是64kb；

```js
const read = fs.createReadStream("./foo.txt", {
  start: 3,
  end: 8,
  highWaterMark: 4
});
```

我们如何获取到数据呢？

- 可以通过监听data事件，获取读取到的数据；

```js
read.on("data", (data) => {
  console.log(data);
});
```

我们也可以监听其他的事件：

```js
read.on('open', (fd) => {
  console.log("文件被打开");
})

read.on('end', () => {
  console.log("文件读取结束");
})

read.on('close', () => {
  console.log("文件被关闭");
})
```

甚至我们可以在某一个时刻暂停和恢复读取：

```js
read.on("data", (data) => {
  console.log(data);

  read.pause();

  setTimeout(() => {
    read.resume();
  }, 2000);
});
```

#### 6.6.3Writable

之前我们写入一个文件的方式是这样的：

```js
fs.writeFile('./foo.txt', "内容", (err) => {
  
});
```

这种方式相当于一次性将所有的内容写入到文件中，但是这种方式也有很多问题：

- 比如我们希望一点点写入内容，精确每次写入的位置等；

这个时候，我们可以使用 `createWriteStream`，我们来看几个参数，更多参数可以参考官网：

- flags：默认是`w`，如果我们希望是追加写入，可以使用 `a`或者 `a+`；
- start：写入的位置；

我们进行一次简单的写入

```js
const writer = fs.createWriteStream("./foo.txt", {
  flags: "a+",
  start: 8
});

writer.write("你好啊", err => {
  console.log("写入成功");
});
```

如果我们希望监听一些事件：

```js
writer.on("open", () => {
  console.log("文件打开");
})

writer.on("finish", () => {
  console.log("文件写入结束");
})

writer.on("close", () => {
  console.log("文件关闭");
})
```

我们会发现，我们并不能监听到 `close` 事件：

- 这是因为写入流在打开后是不会自动关闭的；
- 我们必须手动关闭，来告诉Node已经写入结束了；
- 并且会发出一个 `finish` 事件的；

```js
writer.close();

writer.on("finish", () => {
  console.log("文件写入结束");
})

writer.on("close", () => {
  console.log("文件关闭");
})
```

另外一个非常常用的方法是 `end`：

- `end`方法相当于做了两步操作：`write`传入的数据和调用`close`方法；

```js
writer.end("Hello World");
```

#### 6.6.4pipe方法

正常情况下，我们可以将读取到的 `输入流`，手动的放到 `输出流`中进行写入：

```js
const fs = require('fs');
const { read } = require('fs/promises');

const reader = fs.createReadStream('./foo.txt');
const writer = fs.createWriteStream('./bar.txt');

reader.on("data", (data) => {
  console.log(data);
  writer.write(data, (err) => {
    console.log(err);
  });
});
```

我们也可以通过pipe来完成这样的操作：

```js
reader.pipe(writer);

writer.on('close', () => {
  console.log("输出流关闭");
})
```

## 7.脚手架开发



## 8.深入事件循环

### 8.1浏览器的事件循环

#### 8.1.1进程和线程

线程和进程是操作系统中的两个概念：

- 进程（process）：计算机已经运行的程序；
- 线程（thread）：操作系统能够运行运算调度的最小单位；

听起来很抽象，我们直观一点解释：

- 进程：我们可以认为，启动一个应用程序，就会默认启动一个进程（也可能是多个进程）；
- 线程：每一个进程中，都会启动一个线程用来执行程序中的代码，这个线程被称之为主线程；
- 所以我们也可以说进程是线程的容器；

再用一个形象的例子解释：

- 操作系统类似于一个工厂；
- 工厂中里有很多车间，这个车间就是进程；
- 每个车间可能有一个以上的工人在工厂，这个工人就是线程；

![image-20210729121705308](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729121705308.png)

操作系统是如何做到同时让多个进程（边听歌、边写代码、边查阅资料）同时工作呢？

- 这是因为CPU的运算速度非常快，它可以快速的在多个进程之间迅速的切换；
- 当我们的进程中的线程获取获取到时间片时，就可以快速执行我们编写的代码；
- 对于用于来说是感受不到这种快速的切换的；

你可以在Mac的活动监视器或者Windows的资源管理器中查看到很多进程：

![image-20210729121927633](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729121927633.png)

#### 8.1.2浏览器和JavaScript

我们经常会说JavaScript是单线程的，但是JavaScript的线程应该有自己的容器进程：浏览器或者Node。

浏览器是一个进程吗，它里面只有一个线程吗？

- 目前多数的浏览器其实都是多进程的，当我们打开一个tab页面时就会开启一个新的进程，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出；
- 每个进程中又有很多的线程，其中包括执行JavaScript代码的线程；

但是JavaScript的代码执行是在一个单独的线程中执行的：

- 这就意味着JavaScript的代码，在同一个时刻只能做一件事；
- 如果这件事是非常耗时的，就意味着当前的线程就会被阻塞；

分析下面代码的执行过程：

- 定义变量name；
- 执行log函数，函数会被放入到调用栈中执行；
- 调用bar()函数，被压入到调用栈中，但是执行未结束；
- bar因为调用了sum，sum函数被压入到调用栈中，获取到结果后出栈；
- bar获取到结果后出栈，获取到结果result；
- 将log函数压入到调用栈，log被执行，并且出栈；

```js
const name = "name";

// 1.将该函数放入到调用栈中被执行
console.log(name);

// 2. 调用栈
function sum(num1, num2) {
  return num1 + num2;
}

function bar() {
  return sum(20, 30);
}

console.log(bar());
```

#### 8.1.3浏览器的事件循环

如果在执行JavaScript代码的过程中，有异步操作呢？

- 中间我们插入了一个setTimeout的函数调用；
- 这个函数被放到入调用栈中，执行会立即结束，并不会阻塞后续代码的执行；

```js
const name = "name";

// 1.将该函数放入到调用栈中被执行
console.log(name);

// 2.调用栈
function sum(num1, num2) {
  return num1 + num2;
}

function bar() {
  return sum(20, 30);
}

setTimeout(() => {
  console.log("settimeout");
}, 1000);

const result = bar();

console.log(result);
```

那么，传入的一个函数（比如我们称之为timer函数），会在什么时候被执行呢？

- 事实上，setTimeout是调用了web api，在合适的时机，会将timer函数加入到一个事件队列中；
- 事件队列中的函数，会被放入到调用栈中，在调用栈中被执行；

![image-20210729122733500](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729122733500.png)

#### 8.1.4宏任务和微任务

但是事件循环中并非只维护着一个队列，事实上是有两个队列：

- 宏任务队列（macrotask queue）：ajax、setTimeout、setInterval、DOM监听、UI Rendering等
- 微任务队列（microtask queue）：Promise的then回调、 Mutation Observer API、queueMicrotask()等

那么事件循环对于两个队列的优先级是怎么样的呢？

- 1.main script中的代码优先执行（编写的顶层script代码）；

- 2.在执行任何一个宏任务之前（不是队列，是一个宏任务），都会先查看微任务队列中是否有任务需要执行

- - 也就是宏任务执行之前，必须保证微任务队列是空的；
  - 如果不为空，那么就优先执行微任务队列中的任务（回调）；

我们来看一个面试题：执行结果如何？

```js
setTimeout(function () {
  console.log("set1");

  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2");
  });
});

new Promise(function (resolve) {
  console.log("pr1");
  resolve();
}).then(function () {
  console.log("then1");
});

setTimeout(function () {
  console.log("set2");
});

console.log(2);

queueMicrotask(() => {
  console.log("queueMicrotask1")
});

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3");
});
```

执行结果：

```js
pr1
2
then1
queueMicrotask1
then3
set1
then2
then4
set2
```

async、await是Promise的一个语法糖：

- 我们可以将await关键字后面执行的代码，看做是包裹在`(resolve, reject) => {函数执行}`中的代码；
- await的下一条语句，可以看做是`then(res => {函数执行})`中的代码；

今日头条的面试题：

```js
async function async1 () {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}
 
async function async2 () {
  console.log('async2')
}

console.log('script start')
 
setTimeout(function () {
  console.log('setTimeout')
}, 0)
 
async1();
 
new Promise (function (resolve) {
  console.log('promise1')
  resolve();
}).then (function () {
  console.log('promise2')
})

console.log('script end')
```

执行结果如下：

```js
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

### 8.2Node的事件循环

#### 8.2.1Node的事件循环

浏览器中的EventLoop是根据HTML5定义的规范来实现的，不同的浏览器可能会有不同的实现，而Node中是由libuv实现的。

我们来看在很早就给大家展示的Node架构图：

- 我们会发现libuv中主要维护了一个EventLoop和worker threads（线程池）；
- EventLoop负责调用系统的一些其他操作：文件的IO、Network、child-processes等

![image-20210729214333621](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729214333621.png)

libuv到底是什么呢？

- libuv is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js, but it's also used by Luvit, Julia, pyuv, and others.
- libuv是一个多平台的专注于异步IO的库，它最初是为Node开发的，但是现在也被使用到Luvit、Julia、pyuv等其他地方；

libuv到底帮助我们做了什么事情呢？

- 我们以文件操作为例，来讲解一下它内部的结构；

#### 8.2.2阻塞IO和非阻塞IO

如果我们希望在程序中对一个文件进行操作，那么我们就需要打开这个文件：通过文件描述符。

- 我们思考：JavaScript可以直接对一个文件进行操作吗？
- 看起来是可以的，但是事实上我们任何程序中的文件操作都是需要进行系统调用（操作系统封装了文件系统）；
- 事实上对文件的操作，是一个操作系统的IO操作（输入、输出）；

操作系统为我们提供了`阻塞式调用`和`非阻塞式调用`：

- **阻塞式调用：** 调用结果返回之前，当前线程处于阻塞态（阻塞态CPU是不会分配时间片的），调用线程只有在得到调用结果之后才会继续执行。
- **非阻塞式调用：** 调用执行之后，当前线程不会停止执行，只需要过一段时间来检查一下有没有结果返回即可。

所以我们开发中的很多耗时操作，都可以基于这样的 `非阻塞式调用`：

- 比如网络请求本身使用了Socket通信，而Socket本身提供了select模型，可以进行`非阻塞方式的工作`；
- 比如文件读写的IO操作，我们可以使用操作系统提供的`基于事件的回调机制`；

但是非阻塞IO也会存在一定的问题：我们并没有获取到需要读取（我们以读取为例）的结果

- 那么就意味着为了可以知道是否读取到了完整的数据，我们需要频繁的去确定读取到的数据是否是完整的；
- 这个过程我们称之为轮训操作；

那么这个轮训的工作由谁来完成呢？

- 如果我们的主线程频繁的去进行轮训的工作，那么必然会大大降低性能；
- 并且开发中我们可能不只是一个文件的读写，可能是多个文件；
- 而且可能是多个功能：网络的IO、数据库的IO、子进程调用；

libuv提供了一个线程池（Thread Pool）：

- 线程池会负责所有相关的操作，并且会通过轮训等方式等待结果；
- 当获取到结果时，就可以将对应的回调放到事件循环（某一个事件队列）中；
- 事件循环就可以负责接管后续的回调工作，告知JavaScript应用程序执行对应的回调函数；

阻塞和非阻塞，同步和异步有什么区别？

- 阻塞和非阻塞是对于被调用者来说的；

- - 在我们这里就是系统调用，操作系统为我们提供了阻塞调用和非阻塞调用；

- 同步和异步是对于调用者来说的；

- - 在我们这里就是自己的程序；
  - 如果我们在发起调用之后，不会进行其他任何的操作，只是等待结果，这个过程就称之为同步调用；
  - 如果我们再发起调用之后，并不会等待结果，继续完成其他的工作，等到有回调时再去执行，这个过程就是异步调用；

#### 8.2.3Node事件循环的阶段

我们最前面就强调过，事件循环像是一个桥梁，是连接着应用程序的JavaScript和系统调用之间的通道：

- 无论是我们的文件IO、数据库、网络IO、定时器、子进程，在完成对应的操作后，都会将对应的结果和回调函数放到事件循环（任务队列）中；
- 事件循环会不断的从任务队列中取出对应的事件（回调函数）来执行；

但是一次完整的事件循环Tick分成很多个阶段：

- **定时器（Timers）**：本阶段执行已经被 `setTimeout()` 和 `setInterval()` 的调度回调函数。
- **待定回调（Pending Callback）**：对某些系统操作（如TCP错误类型）执行回调，比如TCP连接时接收到ECONNREFUSED。
- **idle, prepare**：仅系统内部使用。
- **轮询（Poll）**：检索新的 I/O 事件；执行与 I/O 相关的回调；
- **检测**：`setImmediate()` 回调函数在这里执行。
- **关闭的回调函数**：一些关闭的回调函数，如：`socket.on('close', ...)`。

![image-20210729215225483](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729215225483.png)

我们会发现从一次事件循环的Tick来说，Node的事件循环更复杂，它也分为微任务和宏任务：

- 宏任务（macrotask）：setTimeout、setInterval、IO事件、setImmediate、close事件；
- 微任务（microtask）：Promise的then回调、process.nextTick、queueMicrotask；

但是，Node中的事件循环不只是 `微任务队列`和 `宏任务队列`：

- 微任务队列：

- - next tick queue：process.nextTick；
  - other queue：Promise的then回调、queueMicrotask；

- 宏任务队列：

- - timer queue：setTimeout、setInterval；
  - poll queue：IO事件；
  - check queue：setImmediate；
  - close queue：close事件；

所以，在每一次事件循环的tick中，会按照如下顺序来执行代码：

- next tick microtask queue；
- other microtask queue；
- timer queue；
- poll queue；
- check queue；
- close queue；

#### 8.2.4 Node代码执行面试

面试题一：

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

setTimeout(function () {
  console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')
```

执行结果如下：

```js
script start
async1 start
async2
promise1
promise2
script end
nextTick
async1 end
promise3

setTimeout0
setImmediate
setTimeout2
```

面试题二：

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

执行结果：

```js
情况一：
setTimeout
setImmediate

情况二：
setImmediate
setTimeout
```

为什么会出现不同的情况呢？

- 在Node源码的deps/uv/src/timer.c中141行，有一个 `uv__next_timeout`的函数；
- 这个函数决定了，poll阶段要不要阻塞在这里；
- 阻塞在这里的目的是当有异步IO被处理时，尽可能快的让代码被执行；

```js
int uv__next_timeout(const uv_loop_t* loop) {
  const struct heap_node* heap_node;
  const uv_timer_t* handle;
  uint64_t diff;

  // 计算距离当前时间节点最小的计时器
  heap_node = heap_min(timer_heap(loop));
  // 如果为空, 那么返回-1,表示为阻塞状态
  if (heap_node == NULL)
    return -1; /* block indefinitely */

  // 如果计时器的时间小于当前loop的开始时间, 那么返回0
  // 继续执行后续阶段, 并且开启下一次tick
  handle = container_of(heap_node, uv_timer_t, heap_node);
  if (handle->timeout <= loop->time)
    return 0;

  // 如果不大于loop的开始时间, 那么会返回时间差
  diff = handle->timeout - loop->time;
  if (diff > INT_MAX)
    diff = INT_MAX;

  return (int) diff;
}
```

和上面有什么关系呢？

- 情况一：如果事件循环开启的时间(ms)是小于 `setTimeout`函数的执行时间的；

- - 也就意味着先开启了event-loop，但是这个时候执行到timer阶段，并没有定时器的回调被放到入 timer queue中；
  - 所以没有被执行，后续开启定时器和检测到有setImmediate时，就会跳过poll阶段，向后继续执行；
  - 这个时候是先检测 `setImmediate`，第二次的tick中执行了timer中的 `setTimeout`；

- 情况二：如果事件循环开启的时间(ms)是大于 `setTimeout`函数的执行时间的；

- - 这就意味着在第一次 tick中，已经准备好了timer queue；
  - 所以会直接按照顺序执行即可；

## 9.http开发web服务器

- 什么是Web服务器？

当应用程序（客户端）需要某一个资源时，可以向一个台服务器，通过Http请求获取到这个资源；提供服务的这个服务器，就是一个Web服务器；

![image-20210729232259537](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210729232259537.png)



目前有很多开源的Web服务器：Nginx、Apache（静态）、Apache Tomcat（静态、动态）、Node.js

### 9.1如何创建服务

#### 9.1.1Web服务器初体验

创建一个Web服务器的初体验：

```js
const http = require('http');

const HTTP_PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(8000, () => {
  console.log(`🚀服务器在${HTTP_PORT}启动~`)
})
```

#### 9.1.2创建服务器

创建服务器对象，我们是通过 `createServer` 来完成的

- `http.createServer`会返回服务器的对象；
- 底层其实使用直接 new Server 对象。

```js
function createServer(opts, requestListener) {
  return new Server(opts, requestListener);
}
```

那么，当然，我们也可以自己来创建这个对象：

```js
const server2 = new http.Server((req, res) => {
  res.end("Hello Server2");
});

server2.listen(9000, () => {
  console.log("服务器启动成功~");
})
```

上面我们已经看到，创建Server时会传入一个回调函数，这个回调函数在被调用时会传入两个参数：

- req：request请求对象，包含请求相关的信息；
- res：response响应对象，包含我们要发送给客户端的信息；

#### 9.1.3监听端口和主机

**Server**通过listen方法来开启服务器，并且在某一个主机和端口上监听网络请求：

- 也就是当我们通过 `ip:port`的方式发送到我们监听的Web服务器上时；
- 我们就可以对其进行相关的处理；

`listen`函数有三个参数：

- 端口port: 可以不传, 系统会默认分配端, 后续项目中我们会写入到环境变量中；

- 主机host: 通常可以传入localhost、ip地址127.0.0.1、或者ip地址0.0.0.0，默认是0.0.0.0；

- - 监听IPV4上所有的地址，再根据端口找到不同的应用程序；
  - 比如我们监听 `0.0.0.0`时，在同一个网段下的主机中，通过ip地址是可以访问的；
  - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ；
  - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的；
  - 比如我们监听 `127.0.0.1`时，在同一个网段下的主机中，通过ip地址是不能访问的；
  - localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1；
  - 127.0.0.1：回环地址（Loop Back Address），表达的意思其实是我们主机自己发出去的包，直接被自己接收；
  - 0.0.0.0：

- 回调函数：服务器启动成功时的回调函数；

```js
server.listen(() => {
  console.log("服务器启动~🚀");
})
```

### 9.2request请求对象

在向服务器发送请求时，我们会携带很多信息，比如：

- 本次请求的URL，服务器需要根据不同的URL进行不同的处理；
- 本次请求的请求方式，比如GET、POST请求传入的参数和处理的方式是不同的；
- 本次请求的headers中也会携带一些信息，比如客户端信息、接受数据的格式、支持的编码格式等；
- 等等...

这些信息，Node会帮助我们封装到一个request的对象中，我们可以直接来处理这个request对象：

```js
const server = http.createServer((req, res) => {
  // request对象
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);

  res.end("Hello World");
});
```

#### 9.2.1URL的处理

客户端在发送请求时，会请求不同的数据，那么会传入不同的请求地址：

- 比如 `http://localhost:8000/login`；
- 比如 `http://localhost:8000/products`;

服务器端需要根据不同的请求地址，作出不同的响应：

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (url === '/login') {
    res.end("welcome Back~");
  } else if (url === '/products') {
    res.end("products");
  } else {
    res.end("error message");
  }
});
```

那么如果用户发送的地址中还携带一些额外的参数呢？

- `http://localhost:8000/login?name=why&password=123`;
- 这个时候，url的值是 `/login?name=why&password=123`；

我们如何对它进行解析呢？

- 使用内置模块url；

```js
const url = require('url');

// 解析请求
const parseInfo = url.parse(req.url);
console.log(parseInfo);
```

解析结果：

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=why&password=123',
  query: 'name=why&password=123',
  pathname: '/login',
  path: '/login?name=why&password=123',
  href: '/login?name=why&password=123'
}
```

我们会发现 `pathname`就是我们想要的结果。

但是 `query` 信息如何可以获取呢？

- 方式一：截取字符串；
- 方式二：使用querystring内置模块；

```js
const { pathname, query } = url.parse(req.url);
const queryObj = qs.parse(query);
console.log(queryObj.name);
console.log(queryObj.password);
```

#### 9.2.2Method的处理

在Restful规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：

- GET：查询数据；
- POST：新建数据；
- PATCH：更新数据；
- DELETE：删除数据；

所以，我们可以通过判断不同的请求方式进行不同的处理。

比如创建一个用户：

- 请求接口为 `/users`；
- 请求方式为 `POST`请求；
- 携带数据 `username`和`password`；

在我们程序中如何进行判断以及获取对应的数据呢？

- 这里我们需要判断接口是 `/users`，并且请求方式是POST方法去获取传入的数据；
- 获取这种body携带的数据，我们需要通过监听req的 `data`事件来获取；

```js
if (req.url.indexOf('/users') !== -1) {
  if (req.method === 'POST') {
  
    // 可以设置编码，也可以在下方通过 data.toString() 获取字符串格式
    req.setEncoding('utf-8');

    req.on('data', (data) => {
      const {username, password} = JSON.parse(data);
      console.log(username, password);
    });

    res.end("create user success");
  } else {
    res.end("users list");
  }
} else {
  res.end("error message");
}
```

将JSON字符串格式转成对象类型，通过`JSON.parse`方法即可。

#### 9.2.3header属性

在request对象的header中也包含很多有用的信息：

```js
const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.end("Hello Header");
});
```

浏览器会默认传递过来一些信息：

```json
{
  'content-type': 'application/json',
  'user-agent': 'PostmanRuntime/7.26.5',
  accept: '*/*',
  'postman-token': 'afe4b8fe-67e3-49cc-bd6f-f61c95c4367b',
  host: 'localhost:8000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '48'
}
```

`content-type`是这次请求携带的数据的类型：

- `application/json`表示是一个json类型；
- `text/plain`表示是文本类型；
- `application/xml`表示是xml类型；
- `multipart/form-data`表示是上传文件；

`content-length`：

- 文件的大小和长度

`keep-alive`：

- http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断；

- 在http1.0中，如果想要继续保持连接：

- - 浏览器需要在请求头中添加 `connection: keep-alive`；
  - 服务器需要在响应头中添加 `connection:keey-alive`；
  - 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；

- 在http1.1中，所有连接默认是 `connection: keep-alive`的；

- - 不同的Web服务器会有不同的保持 `keep-alive`的时间；
  - Node中默认是5s中；

`accept-encoding`：

- 告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 `.gz`文件；

`accept`：

- 告知服务器，客户端可接受文件的格式类型；

`user-agent`：

- 客户端相关的信息；

### 9.3响应对象response

#### 9.3.1 返回响应结果

如果我们希望给客户端响应的结果数据，可以通过两种方式：

- Write方法：这种方式是直接写出数据，但是并没有关闭流；
- end方法：这种方式是写出最后的数据，并且写出后会关闭流；

```js
const http = require('http');

const server = http.createServer((req, res) => {

  // 响应数据的方式有两个:
  res.write("Hello World");
  res.write("Hello Response");
  res.end("message end");
});

server.listen(8000, () => {
  console.log("服务器启动🚀~")
});
```

如果我们没有调用 `end`和`close`，客户端将会一直等待结果，所以客户端在发送网络请求时，都会设置超时时间。

#### 9.3.2返回状态码

Http状态码（Http Status Code）是用来表示Http响应状态的数字代码：

- Http状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
- 常见的状态码是下面这些（后续项目中，也会用到其中的状态码）；

![image-20210730000504217](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210730000504217.png)

设置状态码常见的有两种方式：

```js
res.statusCode = 400;
res.writeHead(200);
```

#### 9.3.3响应头文件

返回头部信息，主要有两种方式：

- `res.setHeader`：一次写入一个头部信息；
- `res.writeHead`：同时写入header和status；

```js
res.setHeader("Content-Type", "application/json;charset=utf8");

res.writeHead(200, {
  "Content-Type": "application/json;charset=utf8"
})
```

Header设置 `Content-Type`有什么作用呢？

- 默认客户端接收到的是字符串，客户端会按照自己默认的方式进行处理；

比如，我们返回的是一段HTML，但是没有指定格式：

```js
res.end('<h2>Hello World</h2>')
```

![image-20210730000644453](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210730000644453.png)



但是，如果我们指定了格式：

```js
res.setHeader("Content-Type", "text/html;charset=utf8");
res.end('<h2>Hello World</h2>')
```

![image-20210730000717357](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210730000717357.png)

如果我们希望返回一段JSON数据，应该怎么做呢？

```js
res.writeHead(200, {
  "Content-Type": "application/json;charset=utf8"
})

const data = {
  name: "王红元",
  age: 18,
  height: 1.88
};

res.end(JSON.stringify(data));
```

### 9.4文件上传的使用

如果是一个很大的文件需要上传到服务器端，服务器端进行保存应该如何操作呢？

```js
const server = http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      const fileWriter = fs.createWriteStream('./foo.png');
      req.pipe(fileWriter);

      const fileSize = req.headers['content-length'];
      let curSize = 0;
      console.log(fileSize);

      req.on("data", (data) => {
        curSize += data.length;
        console.log(curSize);
        res.write(`文件上传进度: ${curSize/fileSize * 100}%\n`);
      });

      req.on('end', () => {
        res.end("文件上传完成~");
      })
    }
  } else {
    res.end("error message");
  }
});
```

这个时候我们发现文件上传成功了，但是文件却打不开：

- 这是因为我们写入的数据，里面包含一些特殊的信息；
- 这些信息打开的软件并不能很好的解析；

```js
const server = http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      // 图片文件必须设置为二进制的
      req.setEncoding('binary');

      // 获取content-type中的boundary的值
      var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
      
      // 记录当前数据的信息
      const fileSize = req.headers['content-length'];
      let curSize = 0;
      let body = '';

      // 监听当前的数据
      req.on("data", (data) => {
        curSize += data.length;
        res.write(`文件上传进度: ${curSize/fileSize * 100}%\n`);
        body += data;
      });

      // 数据结构
      req.on('end', () => {
        // 切割数据
        const payload = qs.parse(body, "\r\n", ":");
        // 获取最后的类型(image/png)
        const fileType = payload["Content-Type"].substring(1);
        // 获取要截取的长度
        const fileTypePosition = body.indexOf(fileType) + fileType.length;
        let binaryData = body.substring(fileTypePosition);
        binaryData = binaryData.replace(/^\s\s*/, '');

        // binaryData = binaryData.replaceAll('\r\n', '');
        const finalData = binaryData.substring(0, binaryData.indexOf('--'+boundary+'--'));

        fs.writeFile('./boo.png', finalData, 'binary', (err) => {
          console.log(err);
          res.end("文件上传完成~");
        })
      })
    }
  } else {
    res.end("error message");
  }
});
```

### 9.5http发送网络请求

axios库可以在浏览器中使用，也可以在Node中使用：

- 在浏览器中，axios使用的是封装xhr；
- 在Node中，使用的是http内置模块；

所以http模块是可以在Node中直接发送网络请求的。

发送get请求：

```js
http.get("http://localhost:8000", (res) => {
  res.on('data', data => {
    console.log(data.toString());
    console.log(JSON.parse(data.toString()));
  })
});
```

发送post请求：

```js
const req = http.request({
  method: 'POST',
  hostname: "localhost",
  port: 8000
}, (res) => {
  res.on('data', data => {
    console.log(data.toString());
    console.log(JSON.parse(data.toString()));
  })
})

req.on('error', err => {
  console.log(err);
})

req.end();
```

## 10.express开发web服务器



## 11.koa开发web服务器



## 12.数据库MYSQL
