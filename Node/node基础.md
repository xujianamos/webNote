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















## 6.Buffer使用



## 7.脚手架开发



## 8.深入事件循环



## 9.http开发web服务器



## 10.express开发web服务器



## 11.koa开发web服务器



## 12.数据库MYSQL
