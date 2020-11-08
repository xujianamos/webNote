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

- nvm：Node Version Manager；
- n：Interactively Manage Your Node.js Versions（交互式管理你的Node.js版本）

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

> windows上可以使用nvm-window来完成。

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
//参数为字符串路径
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



## 3.内置模块path



## 4.内置模块fs

## 5.内置模块events





