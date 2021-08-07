## 1.React基础知识

### 1.1React开发依赖

开发React必须依赖三个库：

- react：包含react所必须的核心代码
- react-dom：react渲染在不同平台所需要的核心代码
- babel：将jsx转换成React代码的工具

### 1.2React中的hello world

```jsx
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel">
    class App extends React.Component {
  		constructor() {
    		super();
    		this.state = {
      			message: "Hello World"
    		};
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={this.changeText.bind(this)}>改变文本</button>
     </div>
    )
  }

  changeText() {
    this.setState({
      message: "Hello React"
    })
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
  </script>
</body>
```

## 2.React中的jsx语法

JSX是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML，因为看起就是一段XML语法；它用于描述我们的UI界面，并且其完全可以和JavaScript融合在一起使用；

### 2.1JSX的书写规范

1. JSX的顶层**只能有一个根元素**，所以我们很多时候会在外层包裹一个div原生（或者使用后面我们学习的Fragment）；

2. 为了方便阅读，我们通常在jsx的外层包裹一个小括号()，这样可以方便阅读，并且jsx可以进行换行书写；

3. JSX中的标签可以是单标签，也可以是双标签；

> **注意：如果是单标签，必须以/>结尾；**

### 2.2JSX嵌入表达式

如果我们jsx中的内容是动态的，我们可以通过表达式来获取：

- 书写规则：`{ 表达式 }`
- 大括号内可以是变量、字符串、数组、函数调用等任意js表达式；

#### 2.2.1jsx中的注释

jsx是嵌入到JavaScript中的一种语法，所以在编写注释时，需要通过JSX的语法来编写：

```jsx
<div>
  {/* 我是一段注释 */} 
  <h2>Hello World</h2>
</div>
```

#### 2.2.2JSX嵌入变量

- 情况一：当变量是Number、String、Array类型时，可以直接显示

- 情况二：当变量是null、undefined、Boolean类型时，内容为空；

- - 如果希望可以显示null、undefined、Boolean，那么需要转成字符串；
  - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式；

- 情况三：对象类型不能作为子元素（not valid as a React child）

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "name",
      number: 0,
      hobbies: ["篮球", "唱跳", "rap"],
      
      test1: null,
      test2: undefined,
      flag: false,

      friend: {
        name: "kobe",
        age: 40
      }
    }
  }

  render() {
    return (
      <div>
        {/* 我是一段注释 */}
        <h2>Hello World</h2>
      </div>

      <div>
        {/* 1.可以直接显示 */}
        <h2>{this.state.name}</h2>
        <h2>{this.state.age}</h2>
        <h2>{this.state.hobbies}</h2>

        
        {/* 2.不显示 */}
        <h2>{this.state.test1}</h2>
        <h2>{this.state.test1 + ""}</h2>
        <h2>{this.state.test2}</h2>
        <h2>{this.state.test2 + ""}</h2>
        <h2>{this.state.flag}</h2>
        <h2>{this.state.flag + ""}</h2>
        
        {/* 3.不显示 */}
        <h2>123{this.state.friend}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
```

**补充：为什么null、undefined、Boolean在JSX中要显示为空内容呢？**

原因是在开发中，我们会进行很多的判断；

- 在判断结果为false时，不显示一个内容；
- 在判断结果为true时，显示一个内容；

这个时候，我们可以编写如下代码：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false
    }
  }

  render() {
    return (
      <div>
        {this.state.flag ? <h2>我是标题</h2>: null}
        {this.state.flag && <h2>我是标题</h2>}
      </div>
    )
  }
}
```

#### 2.2.3JSX嵌入表达式

JSX中，也可以是一个表达式。

这里我们演练三个，其他的大家在开发中灵活运用：

- 运算表达式
- 三元运算符
- 执行一个函数

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "kobe",
      lastName: "bryant",
      age: 20
    }
  }

  render() {
    return (
      <div>
        {/* 运算表达式 */}
        <h2>{this.state.firstName + " " + this.state.lastName}</h2>
        {/* 三元运算符 */}
        <h2>{this.state.age >= 18 ? "成年人": "未成年人"}</h2>
        {/* 执行一个函数 */}
        <h2>{this.sayHello("kobe")}</h2>
      </div>
    )
  }

  sayHello(name) {
    return "Hello " + name;
  }
}
```

#### 2.2.4jsx绑定属性

很多时候，描述的HTML原生会有一些属性，而我们希望这些属性也是动态的：

- 比如元素都会有title属性

- 比如img元素会有src属性

- 比如a元素会有href属性

- 比如元素可能需要绑定class

- - 注意：绑定class比较特殊，因为class在js中是一个关键字，所以jsx中不允许直接写class
  - 写法：使用`className`替代

- 比如原生使用内联样式style

- - style后面跟的是一个对象类型，对象中是样式的属性名和属性值；
  - 注意：**这里会将属性名转成驼峰标识**，**而不是连接符**`-`；

我们来演示一下属性的绑定：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "你好啊",
      imgUrl: "https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
      link: "https://www.baidu.com",
      active: false
    }
  }

  render() {
    return (
      <div>
        <h2 title={this.state.title}>Hello World</h2>
        <img src={this.state.imgUrl} alt=""/>
        <a href={this.state.link} target="_blank">百度一下</a>
        <div className={"message " + (this.state.active ? "active": "")}>你好啊</div>
        <div className={["message", (this.state.active ? "active": "")].join(" ")}>你好啊</div>
        {/*属性名转成驼峰标识*/}
        <div style={{fontSize: "30px", color: "red", backgroundColor: "blue"}}>我是文本</div>
      </div>
    )
  }
}
```

### 2.3jsx事件监听

**React 事件的命名采用小驼峰式（camelCase），而不是纯小写；**

我们需要通过`{}`传入一个事件处理函数，这个函数会在事件发生时被执行；

```jsx
class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.btnClick.bind(this)}>点我一下(React)</button>
      </div>
    )
  }

  btnClick() {
    console.log("React按钮点击了一下")
  }
}
```

#### 2.3.1this绑定问题

在事件执行后，我们可能需要获取当前类的对象中相关的属性：

- 比如我们这里打印：`this.state.message`

- - 但是这里会报错：`Cannot read property 'state' of undefined`
  - **原因是`this`在这里是`undefined`**

- 如果我们这里直接打印this，也会发现它是一个undefined

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "你好啊,李银河"
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.btnClick}>点我一下(React)</button>
      </div>
    )
  }

  btnClick() {
    console.log(this);// undefined
    console.log(this.state.message);// 报错
  }
}
```

为什么是undefined呢？

- 原因是`btnClick`函数并不是我们主动调用的，而是当button发生改变时，React内部调用了`btnClick`函数；
- 而它内部调用时，并不知道要如何绑定正确的this；

#### 2.3.2解决this的问题

**方案一**:**bind给btnClick显示绑定this**

在传入函数时，我们可以主动绑定this：

- 这里我们主动将btnClick中的this通过bind来进行绑定（显示绑定）
- 那么之后React内部调用btnClick函数时，就会有一个this，并且是我们绑定的this；

```html
<button onClick={this.btnClick.bind(this)}>点我一下(React)</button>
```

但是呢，如果我有两个函数都需要用到btnClick的绑定：

- 我们发现 `bind(this)` 需要书写两遍；

```html
<button onClick={this.btnClick.bind(this)}>点我一下(React)</button>
<button onClick={this.btnClick.bind(this)}>也点我一下(React)</button>
```

这个我们可以通过在构造方法中直接给this.btnClick绑定this来解决：

- 注意查看 `constructor` 中我们的操作：`this.btnClick = this.btnClick.bind(this);`

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "你好啊,李银河"
    }
	//绑定this
    this.btnClick = this.btnClick.bind(this);
  }

  render() {
    return (
      <div>
        {/*可以直接绑定方法*/}
        <button onClick={this.btnClick}>点我一下(React)</button>
        <button onClick={this.btnClick}>也点我一下(React)</button>
      </div>
    )
  }

  btnClick() {
    console.log(this);
    console.log(this.state.message);
  }
}
```

**方案二：使用 ES6 class fields 语法**

你会发现我这里将btnClick的定义变成了一种赋值语句：

- 这是ES6中给类定义属性的方法，称之为class fields语法；
- 因为这里我们赋值时，使用了箭头函数，所以在当前函数中的this会去上一个**作用域**中查找；
- 而上一个作用域中的this就是当前的对象；

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "你好啊,李银河"
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.btnClick}>点我一下(React)</button>
        <button onClick={this.btnClick}>也点我一下(React)</button>
      </div>
    )
  }
  //使用箭头函数解决this绑定问题
  btnClick = () => {
    console.log(this);
    console.log(this.state.message);
  }
}
```

**方案三：事件监听时传入箭头函数（推荐）**

因为 `onClick` 中要求我们传入一个函数，那么我们可以直接定义一个箭头函数传入：

- 传入的箭头函数的函数体是我们需要执行的代码，我们直接执行 `this.btnClick()`；
- `this.btnClick()`中通过this来指定会进行隐式绑定，最终this也是正确的；

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "你好啊,李银河"
    }
  }

  render() {
    return (
      <div>
        {/*使用箭头函数调用方法来绑定函数*/}
        <button onClick={() => this.btnClick()}>点我一下(React)</button>
        <button onClick={() => this.btnClick()}>也点我一下(React)</button>
      </div>
    )
  }

  btnClick() {
    console.log(this);
    console.log(this.state.message);
  }
}
```

#### 2.3.3事件参数传递

在执行事件函数时，有可能我们需要获取一些参数信息：比如event对象、其他参数

**情况一：获取event对象**

- 很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
- **假如我们用不到this，那么直接传入函数就可以获取到event对象**；

```jsx
class App extends React.Component {
  constructor(props) {

  render() {
    return (
      <div>
        <a href="http://www.baidu.com" onClick={this.btnClick}>点我一下</a>
      </div>
    )
  }

  btnClick(e) {
    e.preventDefault();
    console.log(e);
  }
}
```

**情况二：获取更多参数**

- 有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数；

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: ["衣服", "鞋子", "裤子"]
    }
  }

  render() {
    return (
      <div>
        <a href="http://www.baidu.com" onClick={this.aClick}>点我一下</a>

        {
          this.state.names.map((item, index) => {
            return (
              <a href="#" onClick={e => this.aClick(e, item, index)}>{item}</a>
            )
          })
        }
      </div>
    )
  }

  aClick(e, item, index) {
    e.preventDefault();
    console.log(item, index);
    console.log(e);
  }
}
```

### 2.4jsx条件渲染

#### 2.4.1条件判断语句

一种方式是当逻辑较多时，通过条件判断：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    }
  }

  render() {
    let titleJsx = null;
    if (this.state.isLogin) {
      titleJsx = <h2>欢迎回来~</h2>
    } else {
      titleJsx = <h2>请先登录~</h2>
    }

    return (
      <div>
        {titleJsx}
      </div>
    )
  }
}
```

当然，我们也可以将其封装到一个独立的函数中：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    }
  }

  render() {
    return (
      <div>
        {/*调用函数*/}
        {this.getTitleJsx()}
      </div>
    )
  }

  getTitleJsx() {
    let titleJsx = null;
    if (this.state.isLogin) {
      titleJsx = <h2>欢迎回来~</h2>
    } else {
      titleJsx = <h2>请先登录~</h2>
    }
    return titleJsx;
  }
}
```

#### 2.4.2三元运算符

另外一种实现条件渲染的方法就是三元运算符：`condition ? true : false;`

三元运算符适用于没有太多逻辑的代码：只是根据不同的条件直接返回不同的结果

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.isLogin ? "欢迎回来~": "请先登录~"}</h2>
        <button onClick={e => this.loginBtnClick()}>{this.state.isLogin ? "退出": "登录"}</button>
      </div>
    )
  }

  loginBtnClick() {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }
}
```

#### 2.4.3与运算符&&

在某些情况下，我们会遇到这样的场景：

- 如果条件成立，渲染某一个组件；
- 如果条件不成立，什么内容也不渲染；

如果我们使用三元运算符，是如何做呢？

```jsx
{this.state.isLogin ? <h2>{this.state.username}</h2>: null}
```

其实我们可以通过`逻辑与&&`来简化操作：

```jsx
{this.state.isLogin && <h2>{this.state.username}</h2>}
```

#### 2.4.5v-show效果

针对一个HTML原生，渲染和不渲染之间，如果切换的非常频繁，那么会相对比较损耗性能：

- 在开发中，其实我们可以通过display的属性来控制它的显示和隐藏；
- 在控制方式在vue中有一个专门的指令：v-show；
- React没有指令，但是React会更加灵活（灵活带来的代价就是需要自己去实现）；

我来看一下如何实现：

```jsx
  render() {
    const { isLogin, username } = this.state;
    const nameDisplay = isLogin ? "block": "none";

    return (
      <div>
        <h2 style={{display: nameDisplay}}>{username}</h2>
        <button onClick={e => this.loginBtnClick()}>{isLogin ? "退出": "登录"}</button>
      </div>
    )
  }
```

### 2.5jsx列表渲染

在React中并没有像Vue模块语法中的v-for指令，而且需要我们通过JavaScript代码的方式组织数据，转成JSX。

在React中，展示列表最多的方式就是使用数组的map高阶函数；

案例：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ["盗梦空间", "大话西游", "流浪地球", "少年派", "食神", "美人鱼", "海王"]
    }
  }

  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
          {
            this.state.movies.map(item => {
              return <li>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
```

### 2.6JSX原理解析

#### 2.6.1JSX转换本质

实际上，jsx 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。

所有的jsx最终都会通过`babel`被转换成`React.createElement`的函数调用。

createElement需要传递三个参数：

- 参数一：`type`

- - 当前ReactElement的类型；
  - 如果是标签元素，那么就使用字符串表示 “div”；
  - 如果是组件元素，那么就直接使用组件的名称；

- 参数二：`config`

- - 所有jsx中的属性都在config中以对象的属性和值的形式存储

- 参数三：`children`

- - 存放在标签中的内容，以children数组的方式进行存储；
  - 当然，如果是多个元素呢？React内部有对它们进行处理，处理的源码在下方

对children进行的处理：

- 从第二个参数开始，将其他所有的参数，放到props对象的children中

```jsx
const childrenLength = arguments.length - 2;
if (childrenLength === 1) {
  props.children = children;
} else if (childrenLength > 1) {
  const childArray = Array(childrenLength);
  for (let i = 0; i < childrenLength; i++) {
    childArray[i] = arguments[i + 2];
  }
  if (__DEV__) {
    if (Object.freeze) {
      Object.freeze(childArray);
    }
  }
  props.children = childArray;
}
```

#### 2.6.2编写createElement

```jsx
<div className="app">
  <div className="header">
    <h1 title="标题">我是网站标题</h1>
  </div>
  <div className="content">
    <h2>我是h2元素</h2>
    <button onClick={e => console.log("+1")}>+1</button>
    <button onClick={e => console.log("+1")}>-1</button>
  </div>
  <div className="footer">
    <p>我是网站的尾部</p>
  </div>
</div>
```

上面jsx代码通过babel转换成以下代码：

```js
class App extends React.Component {
  constructor(props) {
  render() {
    /*#__PURE__*/
    const result = React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("h1", {
      title: "\u6807\u9898"
    }, "\u6211\u662F\u7F51\u7AD9\u6807\u9898")), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("h2", null, "\u6211\u662Fh2\u5143\u7D20"), /*#__PURE__*/React.createElement("button", {
      onClick: e => console.log("+1")
    }, "+1"), /*#__PURE__*/React.createElement("button", {
      onClick: e => console.log("+1")
    }, "-1")), /*#__PURE__*/React.createElement("div", {
      className: "footer"
    }, /*#__PURE__*/React.createElement("p", null, "\u6211\u662F\u7F51\u7AD9\u7684\u5C3E\u90E8")));
    return result;
  }
}

ReactDOM.render(React.createElement(App, null) , document.getElementById("app"));
```

上面的整个代码，我们就没有通过jsx来书写了，界面依然是可以正常的渲染。

另外，在这样的情况下，你还需要babel相关的内容吗？不需要了

- 所以，`type="text/babel"`可以被我们删除掉了；
- 所以，`<script src="../react/babel.min.js"></script>`可以被我们删除掉了；

#### 2.6.2虚拟DOM



## 3.React脚手架

React的脚手架：`create-react-app`

### 3.1包管理工具

**什么是npm？**

- 全称 Node Package Manager，即“node包管理器”；
- 作用肯定是帮助我们管理一下依赖的工具包（比如react、react-dom、axios、babel、webpack等等）；
- 作者开发的目的就是为了解决“模块管理很糟糕”的问题；

**另外，还有一个大名鼎鼎的node包管理工具yarn：**

- Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具；
- Yarn 是为了弥补 npm 的一些缺陷而出现的；
- 早期的npm存在很多的缺陷，比如安装依赖速度很慢、版本依赖混乱等等一系列的问题；
- 虽然从npm5版本开始，进行了很多的升级和改进，但是依然很多人喜欢使用yarn；
- React脚手架默认也是使用yarn；

安装yarn：

```bash
windows:
npm install -g yarn
MAC:
sudo npm install -g yarn
```

**yarn和npm的命令对比**:

| Npm                                     | Yarn                          |
| :-------------------------------------- | :---------------------------- |
| npm install                             | yarn install                  |
| npm install [package]                   | yarn add [package]            |
| npm install --save [package]            | yarn add [package]            |
| npm install --save-dev [package]        | yarn add [package] [--dev/-D] |
| npm rebuild                             | yarn install --force          |
| npm uninstall [package]                 | yarn remove [package]         |
| npm uninstall --save [package]          | yarn remove [package]         |
| npm uninstall --save-dev [package]      | yarn remove [package]         |
| npm uninstall --save-optional [package] | yarn remove [package]         |
| npm cache clean                         | yarn cache clean              |
| rm -rf node_modules && npm install      | yarn upgrade                  |

**cnpm的使用**

在国内，某些情况使用npm和yarn可能无法正常安装一个库，这个时候我们可以选择使用cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 3.2安装脚手架

最后一个需要安装的是创建React项目的脚手架：

```bash
npm install -g create-react-app
```

查看脚手架版本：

```bash
create-react-app --version
```

### 3.3创建React项目

#### 3.3.1创建React项目

现在，我们就可以通过脚手架来创建React项目了。

创建React项目的命令如下：

> **注意：项目名称不能包含大写字母**

```bash
create-react-app 项目名称
```

- 上面的创建方式，默认使用的yarn来管理整个项目包相关的依赖的；
- 如果希望使用npm，也可以在参数后面加上 --use-npm；

创建完成后，进入对应的目录，就可以将项目跑起来：

```bash
cd 项目名称
yarn start
```

#### 3.3.2目录结构分析

目录结构分析：

```
test-react
├─ README.md // readme说明文档
├─ package.json // 对整个应用程序的描述：包括应用名称、版本号、一些依赖包、以及项目的启动、打包等等（node管理项目必备文件）
├─ public
│    ├─ favicon.ico // 应用程序顶部的icon图标
│    ├─ index.html // 应用的index.html入口文件
│    ├─ logo192.png // 被在manifest.json中使用
│    ├─ logo512.png // 被在manifest.json中使用
│    ├─ manifest.json // 和Web app配置相关
│    └─ robots.txt // 指定搜索引擎可以或者无法爬取哪些文件
├─ src
│    ├─ App.css // App组件相关的样式
│    ├─ App.js // App组件的代码文件
│    ├─ App.test.js // App组件的测试代码文件
│    ├─ index.css // 全局的样式文件
│    ├─ index.js // 整个应用程序的入口文件
│    ├─ logo.svg // 刚才启动项目，所看到的React图标
│    ├─ serviceWorker.js // 默认帮助我们写好的注册PWA相关的代码
│    └─ setupTests.js // 测试初始化文件
└─ yarn.lock	// 记录安装插件的详细版本
```

整个目录结构都非常好理解，只是有一个PWA相关的概念：

- PWA全称Progressive Web App，即渐进式WEB应用；
- 一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能；
- 这种Web存在的形式，我们也称之为是 Web App；

PWA解决了哪些问题呢？

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏；
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能；
- 实现了消息推送；
- 等等一系列类似于Native App相关的功能；

#### 3.3.3webpack配置

我们说过React的脚手架是基于Webpack来配置的：

- webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)；
- 当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*；

我们并没有在目录结构中看到任何webpack相关的内容？

- 原因是React脚手架讲webpack相关的配置隐藏起来了（其实从Vue CLI3开始，也是进行了隐藏）；

如果我们希望看到webpack的配置信息，应该怎么来做呢？

- 我们可以执行一个package.json文件中的一个脚本：`"eject": "react-scripts eject"`
- 这个操作是不可逆的，所以在执行过程中会给与我们提示；

```bash
yarn eject
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210108214453944.png" alt="image-20210108214453944" style="zoom: 67%;" />

## 4.组件化开发

组件化提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。

- 任何的应用都会被抽象成一颗组件树。

React的组件相对于Vue更加的灵活和多样，按照不同的方式可以分成很多类组件：

- 根据组件的定义方式，可以分为：**函数组件**(Functional Component )和**类组件**(Class Component)；
- 根据组件内部是否有状态需要维护，可以分成：**无状态组件**(Stateless Component )和**有状态组件**(Stateful Component)；
- 根据组件的不同职责，可以分成：展示型组件(Presentational Component)和容器型组件(Container Component)；

这些概念有很多重叠，但是他们最主要是关注数据逻辑和UI展示的分离：

- 函数组件、无状态组件、展示型组件主要关注UI的展示；
- 类组件、有状态组件、容器型组件主要关注数据逻辑；

### 4.1创建React组件

#### 4.1.1创建类组件

类组件的定义有如下要求：

- 组件的名称是大写字符开头（无论类组件还是函数组件）

- 类组件需要继承自 `React.Component`
- 类组件必须实现`render`函数

使用class定义一个组件：

- constructor是可选的，我们通常在constructor中初始化一些数据；
- this.state中维护的就是我们组件内部的数据；
- `render()` 方法是 class 组件中唯一必须实现的方法；

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  //构造函数
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return <h2>Hello App</h2>
  }
}
```

当 `render` 被调用时，它会检查 `this.props` 和 `this.state` 的变化并返回以下类型之一：

- **React 元素**：

  - 通常通过 JSX 创建。

  - 例如，`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />` 会被 React 渲染为自定义组件；
  - 无论是 `<div />` 还是 `<MyComponent />` 均为 React 元素。

- **数组或 fragments**：使得 render 方法可以返回多个元素。

- **Portals**：可以渲染子节点到不同的 DOM 子树中。

- **字符串或数值类型**：它们在 DOM 中会被渲染为文本节点

- **布尔类型或 `null`**：页面什么都不会渲染。

**注意**：在jsx中只要首字母大写的元素都会当为组件，例如：`<DIV></DIV>`就会渲染为组件，而不是元素`<div</div>`。

#### 4.1.2创建函数组件

函数组件是使用function来进行定义的函数，只是这个函数会返回和类组件中render函数返回一样的内容。

函数式组件的特点：

- 没有生命周期，也会被更新并挂载，但是没有生命周期函数；
- 没有this(组件实例）；
- 没有内部状态（state）；

定义一个函数组件：

```jsx
export default function App() {
  return (
    <div>Hello World</div>
  )
}
```

### 4.2组件的生命周期

![v2-09f698c70d89d72b146653ce67f79c0c_1440w](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/v2-09f698c70d89d72b146653ce67f79c0c_1440w.jpeg)

上图第一个区域解析（组件挂载）：

- 当我们挂载一个组件时，会先执行constructor构造方法来创建组件；
- 紧接着调用render函数，获取要渲染的DOM结构（jsx），并且开始渲染DOM；
- 当组件挂载成功（DOM渲染完成），会执行`componentDidMount`生命周期函数，表示组件已经挂载成功了；

上图第二个区域解析（组件更新）：

- 当我们通过修改props，或者调用setState修改内部状态，或者直接调用forceUpdate时会重新调用render函数，进行更新操作；
- 当更新完成时，会回调`componentDidUpdate`生命周期函数；

上图第三个区域解析（组件卸载）：

- 当我们的组件不再使用，会被从DOM中移除掉（卸载）；
- 这个时候会回调`componentWillUnmount`生命周期函数；

#### 4.2.1生命周期函数

> **constructor**

```jsx
constructor(props)
```

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

constructor中通常只做两件事情：

- 通过给 `this.state` 赋值对象来初始化内部的state；
- 为事件绑定实例（this）；

> **componentDidMount**

```jsx
componentDidMount()
```

`componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。

componentDidMount中通常进行哪里操作呢？

- 依赖于DOM的操作可以在这里进行；
- 在此处发送网络请求就最好的地方；（官方建议）
- 可以在此处添加一些订阅（会在componentWillUnmount取消订阅）；

> **componentDidUpdate**

```jsx
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` 会在更新后会被立即调用，首次渲染不会执行此方法。

- 当组件更新后，可以在此处对 DOM 进行操作；
- 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）。

```jsx
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

> **componentWillUnmount**

```jsx
componentWillUnmount()
```

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。

- 在此方法中执行必要的清理操作；
- 例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等；

**代码验证所有的生命周期函数：**

```jsx
import React, { Component } from 'react';

class HYTestCpn extends Component {
  render() {
    return <h2>HYTestCpn</h2>
  }

  componentWillUnmount() {
    console.log("HYTestCpn componentWillUnmount");
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
		//初始化数据
    this.state = {
      counter: 0
    }

    console.log("调用constructor方法");
  }

  render() {
    console.log("调用render方法")
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        {this.state.counter <= 5 && <HYTestCpn/>}
        <button onClick={e => this.increment()}>+1</button>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  componentDidMount() {
    console.log("调用componentDidMount方法");
  }

  componentDidUpdate() {
    console.log("调用componentDidUpdate方法");
  }

  componentWillUnmount() {
    console.log("调用componentWillUnmount方法");
  }
}
```

### 4.3父子组件通信

#### 4.3.1认识组件的嵌套

我们来分析一下下面代码的嵌套逻辑：

```jsx
import React, { Component } from 'react';

function Header() {
  return <h2>Header</h2>
}

function Main() {
  return (
    <div>
      <Banner/>
      <ProductList/>
    </div>
  )
}

function Banner() {
  return <div>Banner</div>
}

function ProductList() {
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
}

function Footer() {
  return <h2>Footer</h2>
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }
}
```

上面的嵌套逻辑如下，它们存在如下关系：

- App组件是Header、Main、Footer组件的父组件；
- Main组件是Banner、ProductList组件的父组件；

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210110163519992.png" alt="image-20210110163519992" style="zoom: 33%;" />

- 父组件通过 **属性=值** 的形式来传递给子组件数据；
- 子组件通过 **props** 参数获取父组件传递过来的数据；

#### 4.3.2父组件传递数据到子组件

1. 子组件是class组件

```jsx
import React, { Component } from 'react';

// 1.类子组件
class ChildCpn1 extends Component {
  constructor(props) {
    super();
    //这里不掉用也会在render中获取到props的值
    this.props = props;
  }

  render() {
    const { name, age, height } = this.props;

    return (
      <div>
        <h2>我是class的组件</h2>
        <p>展示父组件传递过来的数据: {name + " " + age + " " + height}</p>
      </div>
    )
  }
}
//父组件
export default class App extends Component {
  render() {
    return (
      <div>
        {/*父组件通过 属性=值 的形式来传递数据给子组件*/}
        <ChildCpn1 name="why" age="18" height="1.88" />
      </div>
    )
  }
}
```

按照上面的结构，我们每一个子组件都需要写构造器来完成：`this.props = props;`

其实呢，大可不必，因为我们可以调用`super(props)`，我们来看一下Component的源码：

- 这里我们先不关心context、updater；
- 我们发现传入的props会被Component设置到this中（父类的对象），那么子类就可以继承过来；
- 补充一个思考题：为什么子类可以继承过来呢？

```jsx
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}
```

所以我们的构造方法可以换成下面的写法：

```jsx
  constructor(props) {
    super(props);
  }
```

甚至我们可以省略，为什么可以省略呢？

如果不指定构造方法，则使用默认构造函数。对于基类，默认构造函数是:

```jsx
constructor() {}
```

对于派生类，默认构造函数是：

```jsx
constructor(...args) {
  super(...args);
}
```

2. 子组件是function组件

```jsx
//子组件
function ChildCpn2(props) {
  const {name, age, height} = props;

  return (
    <div>
      <h2>我是function的组件</h2>
      <p>展示父组件传递过来的数据: {name + " " + age + " " + height}</p>
    </div>
  )
}

//父组件
export default class App extends Component {
  render() {
    return (
      <div>
        {/*父组件通过 属性=值 的形式来传递数据给子组件*/}
        <ChildCpn2 name="kobe" age="30" height="1.98"/>
      </div>
    )
  }
}
```

function组件相对来说比较简单，因为不需要有构造方法，也不需要有this的问题。

#### 4.3.3参数验证propTypes

对于传递给子组件的数据，有时候我们可能希望进行验证，特别是对于大型项目来说：

- 当然，如果你项目中默认继承了Flow或者TypeScript，那么直接就可以进行类型验证；
- 但是，即使我们没有使用Flow或者TypeScript，也可以通过 `prop-types` 库来进行参数验证；

从 React v15.5 开始，`React.PropTypes` 已移入另一个包中：`prop-types` 库;

我们对之前的class组件进行验证：

```jsx
import React, { Component } from 'react';

import PropTypes from 'prop-types';
//子组件
function ChildCpn(props) {
  const { name, age, height } = props;

  return (
    <div>
      <h2>我是function的组件</h2>
      <p>展示父组件传递过来的数据: {name + " " + age + " " + height}</p>
    </div>
  )
}

ChildCpn.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  height: PropTypes.number
}

//父组件
export default class App extends Component {
  render() {
    return (
      <div>
        {/*父组件通过 属性=值 的形式来传递数据给子组件*/}
        <ChildCpn name="kobe" age="30" height="1.98"/>
        <ChildCpn name="kobe" age={30} height={1.98}/>
      </div>
    )
  }
}
```

此时对于没有验证通过的，控制台就会报警告。

**如果没有传递，我们希望有默认值呢？**

- 我们使用`defaultProps`就可以了

```jsx
ChildCpn1.defaultProps = {
  name: "王小波",
  age: 40,
  height: 1.92
}
```

#### 4.3.4子组件传递父组件

某些情况，我们也需要子组件向父组件传递消息：

- 在vue中是通过自定义事件来完成的；
- 在React中同样是通过props传递消息，只是让`父组件`给`子组件`传递一个`回调函数`，在子组件中调用这个函数即可；

案例代码如下：

```jsx
import React, { Component } from 'react';

//子组件
function CounterButton(props) {
  //传递的btnClick属性值为一个函数
  const { operator, btnClick } = props;
  //调用父组件传递的函数，传递参数给父组件
  return <button onClick={btnClick}>{operator}</button>
}

//父组件
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }
	//传递给子组件的函数
  changeCounter(count) {
    this.setState({
      counter: this.state.counter + count
    })
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        {/*调用子组件，并传递属性和函数到子组件*/}
        <CounterButton operator="+1" btnClick={e => this.changeCounter(1)} />
        <CounterButton operator="-1" btnClick={e => this.changeCounter(-1)} />
      </div>
    )
  }
}
```

#### 4.3.5组件通信案例练习

index.js代码：

```jsx
import React from "react";
import ReactDOM from 'react-dom';
// 引入全局样式：作用与所有子组件
import "./style.css";

import App from './App';

ReactDOM.render(<App/>, document.getElementById("root"));
```

App.js：根组件

```jsx
import React, { Component } from 'react';
//引入子组件
import TabControl from './TabControl';

export default class App extends Component {
  constructor(props) {
    super(props);
		// 不会变的数据放在this.state外面
    this.titles = ["流行", "新款", "精选"];
		// 有数据变化的并且会影响页面更新的放在this.state里面 
    this.state = {
      currentTitle: "流行"
    }
  }
	//修改当前点击的哪个tab，通过子组件动态修改
  itemClick(index) {
    this.setState({
      currentTitle: this.titles[index]
    })
  }

  render() {
    return (
      <div>
        {/*使用子组件，并传递属性titles和itemClick到子组件*/}
        {/*itemClick属性值为函数，目的是：子组件向父组件传值*/}
        {/*index为子组件传递过来的参数*/}
        <TabControl titles={this.titles} itemClick={index => this.itemClick(index)} />
        <h2>{this.state.currentTitle}</h2>
      </div>
    )
  }
}
```

TabControl.js：tab子组件

```jsx
import React, { Component } from 'react'

export default class TabControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //当前选中的哪一项：默认第一项
      currentIndex: 0
    }
  }

  render() {
    const { titles } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="tab-control">
        {
          titles.map((item, index) => {
            return (
              <div className="tab-item" key={ item } onClick={e => this.itemClick(index)}>
                <span className={"title " + (index === currentIndex ? "active": "")}>{item}</span>
              </div>
            )
          })
        }
      </div>
    )
  }

  itemClick(index) {
    this.setState({
      currentIndex: index
    });
    //调用父组件事件，并传递参数到父组件
    this.props.itemClick(index);
  }
}
```

style.css

```css
.tab-control {
  height: 40px;
  line-height: 40px;
  display: flex;
}

.tab-control .tab-item {
  flex: 1;
  text-align: center;
}

.tab-control .title {
  padding: 3px 5px;
}

.tab-control .title.active {
  color: red;
  border-bottom: 3px solid red;
}
```

#### 4.3.6为什么constructor中不是必须传入props也能使用

在进行React开发中，有一个很奇怪的现象：

- 在调用super()的时候，我没有传入props，但是在下面的render函数中我依然可以使用；
- 如果你自己编写一个基础的类，可以尝试一下：这种情况props应该是undefined的；

```jsx
class ChildCpn extends Component {
  constructor(props) {
    super();
  }

  render() {
    const {name, age, height} = this.props;
    return (
      <h2>子组件展示数据: {name + " " + age + " " + height}</h2>
    )
  }
}
```

为什么这么神奇呢？

- 我一直喜欢说：计算机中没有黑魔法；
- 之所以可以，恰恰是因为React担心你的代码会出现上面这种写法而进行了一些 `骚操作`；
- **React不管你有没有通过super将props设置到当前的对象中，它都会重新给你设置一遍**；

**结论：你无论是否手动的将props保存到组件的实例上，React内部都会帮你保存的，**

### 4.4React插槽实现

在开发中，我们抽取了一个组件，但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素。

我们应该让使用者可以决定某一块区域到底存放什么内容。

举个栗子：假如我们定制一个通用的导航组件 - NavBar

- 这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定；
- 左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示；
- 中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等；
- 右边可能是一个文字，也可能是一个图标，也可能什么都不显示；

这种需求在Vue当中有一个固定的做法是通过slot来完成的，React呢？

- React对于这种需要插槽的情况非常灵活；
- **有两种方案可以实现：children和props**；

我这里先提前给出NavBar的样式：

```css
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}

.nav-bar .left, .nav-bar .right {
  width: 80px;
  background: red;
}

.nav-bar .center {
  flex: 1;
  background: blue;
}
```

#### 4.4.1children实现

每个组件都可以获取到 `props.children`：它包含组件的开始标签和结束标签之间的内容。

比如：

```jsx
//使用子组件
<Welcome>Hello world!</Welcome>
```

在 `Welcome` 组件中获取 `props.children`，就可以得到字符串 `Hello world!`：

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

当然，我们之前看过props.children的源码：

- 如果只有一个元素，那么children指向该元素；
- 如果有多个元素，那么children指向的是数组，数组中包含多个元素；

那么，我们的NavBar可以进行如下的实现：

```jsx
import React, { Component } from 'react';
//封装的导航组件
class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="item left">{this.props.children[0]}</div>
        <div className="item center">{this.props.children[1]}</div>
        <div className="item right">{this.props.children[2]}</div>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        {/*调用子组件*/}
        <NavBar>
          <div>返回</div>
          <div>购物街</div>
          {/*href属性值如果写#占位符，需要在前面加上'/' 不然控制台会报eslint的错误*/}
          <a href="/#">更多</a>
        </NavBar>
      </div>
    )
  }
}
```

#### 4.4.2props实现

通过children实现的方案虽然可行，但是有一个弊端：通过索引值获取传入的元素很容易出错，不能精准的获取传入的原生；

另外一个种方案就是使用 props 实现：

- 通过具体的属性名，可以让我们在传入和获取时更加的精准；

```jsx
import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props;

    return (
      <div className="nav-bar">
        <div className="item left">{leftSlot}</div>
        <div className="item center">{centerSlot}</div>
        <div className="item right">{rightSlot}</div>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    const navLeft = <div>返回</div>;
    const navCenter = <div>购物街</div>;
    const navRight = <div>更多</div>;

    return (
      <div>
        {/*使用子组件，并传递插槽的内容*/}
        <NavBar leftSlot={navLeft} centerSlot={navCenter} rightSlot={navRight} />
      </div>
    )
  }
}
```

### 4.5非父子组件通信

非父子组件数据的共享：

- 在开发中，比较常见的数据传递方式是通过props属性自上而下（由父到子）进行传递。
- 但是对于有一些场景：比如一些数据需要在多个组件中进行共享（地区偏好、UI主题、用户登录状态、用户信息等）。
- 如果我们在顶层的App中定义这些信息，之后一层层传递下去，那么对于一些中间层不需要数据的组件来说，是一种冗余的操作。

我们来看一个例子：

```jsx
import React, { Component } from 'react';
// 孙组件
function ProfileHeader(props) {
  return (
    <div>
      <h2>用户昵称: {props.nickname}</h2>
      <h2>用户等级: {props.level}</h2>
    </div>
  )
}
// 子组件
class Profile extends Component {
  render() {
    return (
      <div>
        {/*孙组件*/}
        <ProfileHeader nickname={this.props.nickname} level={this.props.level} />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}
// 父组件
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      nickname: "name",
      level: 99
    }
  }

  render() {
    const { nickname, level } = this.state;

    return (
      <div>
        {/*子组件*/}
        <Profile nickname={nickname} level={level} />
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

我这边顺便补充一个小的知识点：属性展开

- https://zh-hans.reactjs.org/docs/jsx-in-depth.html

下面两种写法是等价的：

```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}
//等价于
function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

那么我们上面的Profile的传递代码可以修改为如下代码：

```jsx
<ProfileHeader {...this.props}/>
```

但是，如果层级更多的话，一层层传递是非常麻烦，并且代码是非常冗余的：

- React提供了一个API：`Context`；
- Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props；
- **Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据**，例如当前认证的用户、主题或首选语言；

#### 4.5.1Context相关的API

**React.createContext**

```jsx
const MyContext = React.createContext(defaultValue);
```

创建一个需要共享的Context对象：

- 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配的 `Provider` 中读取到当前的context值；
- defaultValue是组件在顶层查找过程中没有找到对应的`Provider`，那么就使用默认值

**Context.Provider**

```jsx
<MyContext.Provider value={/* 某个值 */}></MyContext.Provider>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化：

- Provider 接收一个 `value` 属性，传递给消费组件；
- 一个 Provider 可以和多个消费组件有对应关系；
- 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据；

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染；

**Class.contextType**

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
const MyContext = React.createContext(defaultValue);
MyClass.contextType = MyContext;
```

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象：

- 这能让你使用 `this.context` 来消费最近 Context 上的那个值；
- 你可以在任何生命周期中访问到它，包括 render 函数中；

**Context.Consumer**

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

这里，React 组件也可以订阅到 context 变更。这能让你在 `函数式组件` 中完成订阅 context。

- 这里需要 函数作为子元素（function as child）这种做法；
- 这个函数接收当前的 context 值，返回一个 React 节点；

#### 4.5.2Context使用过程

我们先按照前面三个步骤来使用一个Context：

- 我们就会发现，这个过程中Profile是不需要有任何的数据传递的

```jsx
import React, { Component } from 'react';
//1.创建一个context对象
// { nickname: "默认", level: -1 }为默认值
const UserContext = React.createContext({ nickname: "默认值", level: -1 })

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        {/*每个类组件都有一个context属性，函数式组件没有context属性*/}
        {/*每个类组件都有一个context属性*/}
        <h2>用户昵称: {this.context.nickname}</h2>
        <h2>用户等级: {this.context.level}</h2>
      </div>
    )
  }
}
//3.孙组件使用共享的值：必须主动使用
ProfileHeader.contextType = UserContext;

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}
//2.向子孙组件传递共享值
export default class App extends Component {
  render() {
    return (
      <div>
        {/*UserContext.Provider返回一个组件，共享数据的子组件必须包含在内部*/}
        {/*value属性为共享的数据*/}
        <UserContext.Provider value={{ nickname: "共享的数据", level: 99 }}>
          <Profile />
        </UserContext.Provider>
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

**什么时候使用默认值defaultValue呢？**如果出现了如下代码：

- `<Profile />`并没有作为 `UserContext.Provider` 的子组件；

```jsx
//创建一个context对象
// { nickname: "默认", level: -1 }为默认值
const UserContext = React.createContext({ nickname: "默认值", level: -1 })
// 此时共享给子组件的数据为创建context对象时设置的默认值，也就是{ nickname: "默认值", level: -1 }
// 而不是传递的value值{ nickname: "why", level: 99 }
<Profile />

<UserContext.Provider value={{ nickname: "why", level: 99 }}>
</UserContext.Provider>
```

**什么时候使用Context.Consumer呢？**

- 1.当使用value的组件是一个函数式组件时；
- 2.当组件中需要使用多个Context时；

演练一：当使用value的组件是一个函数式组件时

```jsx
import React, { Component } from 'react';
//1.创建一个context对象
// { nickname: "默认", level: -1 }为默认值
const UserContext = React.createContext({ nickname: "默认值", level: -1 })

//函数式孙组件
function ProfileHeader(props) {
  return (
    <div>
      //Consumer为消费者
      <UserContext.Consumer>
        {value => {
         {/*value为传递过来的共享的值*/}
          return (
            <div>
              <h2>用户昵称: {value.nickname}</h2>
              <h2>用户等级: {value.level}</h2>
            </div>
          )
        }}
      </UserContext.Consumer>
    </div>
  )
}
// ProfileHeader.contextType = UserContext;函数式组件不能这样设置，需要使用Consumer属性
class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}
//2.向子孙组件传递共享值
export default class App extends Component {
  render() {
    return (
      <div>
        {/*UserContext.Provider返回一个组件，共享数据的子组件必须包含在内部*/}
        {/*value属性为共享的数据*/}
        <UserContext.Provider value={{ nickname: "共享的数据", level: 99 }}>
          <Profile />
        </UserContext.Provider>
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

演练二：多次共享context时

1.创建一个新的Context

```jsx
const ThemeContext = React.createContext({ color: "black" });
```

2.Provider的嵌套

```jsx
<UserContext.Provider value={{ nickname: "why", level: 99 }}>
  <ThemeContext.Provider value={{color: "red"}}>
    <Profile />
  </ThemeContext.Provider>
</UserContext.Provider>
```

3.使用Consumer的嵌套

```jsx
<UserContext.Consumer>
  {value => {
    return (
      <ThemeContext.Consumer>
        {
          theme => (
            <div>
              <h2 style={theme}>用户昵称: {value.nickname}</h2>
              <h2 style={theme}>用户等级: {value.level}</h2>
            </div>
          )
        }
      </ThemeContext.Consumer>
    )
  }}
</UserContext.Consumer>
```

完整代码：

```jsx
import React, { Component } from 'react';
//1.创建一个context对象
// { nickname: "默认", level: -1 }为默认值
const UserContext = React.createContext({ nickname: "默认值", level: -1 })
//创建一个主题context
const ThemeContext = React.createContext({ color: "black" });
//函数式孙组件
function ProfileHeader(props) {
  return (
    <div>
      //Consumer为消费者
     <UserContext.Consumer>
  		{value => {
  		  return (
    		  <ThemeContext.Consumer>
     		   {
       			   theme => (
         		   <div>
                     {/*theme为ThemeContext提供的共享数据*/}
                     {/*value为UserContext提供的共享数据*/}
             		 <h2 style={theme}>用户昵称: {value.nickname}</h2>
             		 <h2 style={theme}>用户等级: {value.level}</h2>
                     <h2>颜色: {theme.color}</h2>
           		   </div>
          )
        }
     		 </ThemeContext.Consumer>
    	)
  	}}
	</UserContext.Consumer>
    </div>
  )
}

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}
//2.向子孙组件传递共享值
export default class App extends Component {
  render() {
    return (
      <div>
        {/*UserContext.Provider返回一个组件，共享数据的子组件必须包含在内部*/}
        {/*value属性为共享的数据*/}
       <UserContext.Provider value={{ nickname: "why", level: 99 }}>
 		 <ThemeContext.Provider value={{color: "red"}}>
  			  <Profile />
  		</ThemeContext.Provider>
	  </UserContext.Provider>
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

### 4.6事件总线

#### 4.6.1事件总线的概述

前面通过Context主要实现的是数据的共享，但是在开发中如果有跨组件之间的事件传递，应该如何操作呢？

- 在Vue中我们可以通过Vue的实例，快速实现一个事件总线（EventBus），来完成操作；
- 在React中，我们可以依赖一个使用较多的库 `events` 来完成对应的操作；

我们可以通过npm或者yarn来安装events：

```bash
yarn add events
```

events常用的API：

- 创建EventEmitter对象：eventBus对象；
- 发出事件：`eventBus.emit("事件名称", 参数列表);`
- 监听事件：`eventBus.addListener("事件名称", 监听函数)`；
- 移除事件：`eventBus.removeListener("事件名称", 监听函数)`；

#### 4.6.2案例演练

```jsx
import React, { Component } from 'react';
import { EventEmitter } from "events";
//1.创建一个事件总线
const eventBus = new EventEmitter();
/*孙组件*/
class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <button onClick={e => this.btnClick()}>按钮</button>
      </div>
    )
  }

  btnClick() {
    //2.向父组件或祖先组件发出事件headerClick
    eventBus.emit("headerClick", "why", 18);
  }
}


/*子组件*/
class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}
/*父组件*/
export default class App extends Component {
	
  //在这个生命周期进行时间监听
  componentDidMount() {
    //3.监听headerClick事件
    eventBus.addListener("headerClick", this.headerClick)
  }
	
  //监听后执行的函数
  headerClick(name, age) {
    //name为传递过来的why
    //age为传递过来的18
    console.log(name, age);
  }
	//在这个生命周期进行移出事件监听
  componentWillUnmount() {
    //4.卸载headerClick事件
    eventBus.removeListener("headerClick", this.headerClick);
  }

  render() {
    return (
      <div>
        <Profile/>
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

## 5.setState的使用

### 5.1为什么使用setState

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello World"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        {/*react合成事件*/}
        <button onClick={e => this.changeText()}>改变文本</button>
      </div>
    )
  }

  changeText() {
    //此时this.state中的数据变化了，但是页面没刷新
    this.state.message = "你好啊,李银河";
  }
}
```

**注意**：点击不会有任何反应，因为我们修改了state之后，希望React根据最新的State来重新渲染界面，但是这种方式的修改React并不知道数据发生了变化；React并没有实现类似于Vue2中的Object.defineProperty或者Vue3中的Proxy的方式来监听数据的变化；我们必须通过setState来告知React数据已经发生了变化；

我们必须通过setState来更新数据：

- 当我们调用setState时，会重新执行render函数，根据最新的State来创建ReactElement对象；
- 再根据最新的ReactElement对象，对DOM进行修改；

```jsx
changeText() {
  this.setState({
    message: "你好啊,李银河"
  })
}
```

### 5.2setState异步更新

我们来看下面的代码：

- 最终打印结果是Hello World；
- 可见setState是异步的操作，我们并不能在执行完setState之后立马拿到最新的state的结果

```jsx
changeText() {
  this.setState({
    message: "你好啊,李银河"
  })
  console.log(this.state.message); // Hello World
}
```

设计异步更新原因：

- `setState`设计为异步，可以显著的提升性能；

  - 如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；

  - 最好的办法应该是获取到多个更新，之后进行批量更新；

- 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步；

  - state和props不能保持一致性，会在开发中产生很多的问题；


那么如何可以获取到更新后的值呢？

- setState接受两个参数：第二个参数是一个回调函数，这个回调函数会在更新后会执行；
- 格式如下：`setState(partialState, callback)`

```jsx
changeText() {
  this.setState({
    message: "你好啊,李银河"
  }, () => {
    console.log(this.state.message); // 你好啊,李银河
  });
}
```

当然，我们也可以在生命周期函数`componentDidUpdate`：这个生命周期早于`setState`的回调函数

```jsx
componentDidUpdate(prevProps, provState, snapshot) {
  console.log(this.state.message);
}
```

### 5.3setState同步更新

疑惑：setState一定是异步更新的吗？

验证一：在setTimeout中的更新：

```jsx
changeText() {
  setTimeout(() => {
    //放在setTimeout中会变为同步的
    this.setState({
      message: "你好啊,李银河"
    });
    console.log(this.state.message); // 你好啊,李银河
  }, 0);
}
```

验证二：原生DOM事件：

```jsx
componentDidMount() {
  const btnEl = document.getElementById("btn");
  //原生事件
  btnEl.addEventListener('click', () => {
    this.setState({
      message: "你好啊,李银河"
    });
    console.log(this.state.message); // 你好啊,李银河
  })
}
```

其实分成两种情况：

- 在组件生命周期或React合成事件中，setState是异步；
- 在setTimeout或者原生dom事件中，setState是同步；

### 5.4setState的合并

#### 5.4.1数据的合并

假如我们有这样的数据：

```jsx
this.state = {
  name: "coderwhy",
  message: "Hello World"
}
```

我们需要更新message：

- 通过setState去修改message，是不会对name产生影响的；

```jsx
changeText() {
  this.setState({
    message: "你好啊,李银河"
  });
}
```

为什么不会产生影响呢？源码中其实是有对 `原对象` 和 `新对象进行合并的：`

- 事实上就是使用 `Object.assign(target, ...sources)` 来完成的；

#### 5.4.2多个setState合并

比如我们还是有一个counter属性，记录当前的数字：

- 如果进行如下操作，那么counter会变成几呢？答案是1；
- 为什么呢？因为它会对多个state进行合并；

```jsx
  increment() {
    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });
  }
```

其实在源码的processUpdateQueue中有一个do...while循环，就是从队列中取出多个state进行合并的；

如何可以做到，让counter最终变成3呢？

```jsx
increment() {
  //state为上一次结果
  //props
  this.setState((state, props) => {
    return {
      counter: state.counter + 1
    }
  })

  this.setState((state, props) => {
    return {
      counter: state.counter + 1
    }
  })

  this.setState((state, props) => {
    return {
      counter: state.counter + 1
    }
  })
  }
```

为什么传入一个函数就可以变出3呢？

- 原因是多个state进行合并时，每次遍历，都会执行一次函数：

### 5.5setState性能优化

#### 5.5.1React更新机制

我们在前面已经学习React的渲染流程：

![image-20210115231742074](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210115231742074.png)

那么React的更新流程呢？

![image-20210115231812936](/Users/xujian/Library/Application Support/typora-user-images/image-20210115231812936.png)

React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树。

React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI：

- 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量；
- https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf；
- 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围；
- 这个开销太过昂贵了，React的更新性能会变得非常低效；

于是，React对这个算法进行了优化，将其优化成了O(n)，如何优化的呢？

- 同层节点之间相互比较，不会跨节点比较；
- 不同类型的节点，产生不同的树结构；
- 开发中，可以通过key来指定哪些节点在不同的渲染下保持稳定；

#### 5.5.2Diffing算法

> #### 对比不同类型的元素

当节点为不同的元素，React会拆卸原有的树，并且建立起新的树：

- 当一个元素从 `<a>` 变成 `<img>`，从 `<Article>` 变成 `<Comment>`，或从 `<Button>` 变成 `<div>` 都会触发一个完整的重建流程；
- 当卸载一棵树时，对应的DOM节点也会被销毁，组件实例将执行 `componentWillUnmount()` 方法；
- 当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中，组件实例将执行 `componentWillMount()` 方法，紧接着 `componentDidMount()` 方法；

比如下面的代码更改：

- React 会销毁 `Counter` 组件并且重新装载一个新的组件，而不会对Counter进行复用；

```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

> #### 对比同一类型的元素

当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。

比如下面的代码更改：

- 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 `className` 属性；

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

比如下面的代码更改：

- 当更新 `style` 属性时，React 仅更新有所更变的属性。
- 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 `color` 样式，无需修改 `fontWeight`。

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

如果是同类型的组件元素：

- 组件会保持不变，React会更新该组件的props，并且调用`componentWillReceiveProps()` 和 `componentWillUpdate()` 方法；
- 下一步，调用 `render()` 方法，diff 算法将在之前的结果以及新的结果中进行递归；

> #### 对子节点进行递归

在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

我们来看一下在最后插入一条数据的情况：

- 前面两个比较是完全相同的，所以不会产生mutation；
- 最后一个比较，产生一个mutation，将其插入到新的DOM树中即可；

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

但是如果我们是在中间插入一条数据：

- React会对每一个子元素产生一个mutation，而不是保持 `<li>星际穿越</li>`和`<li>盗梦空间</li>`的不变；
- 这种低效的比较方式会带来一定的性能问题；

```html
<ul>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>

<ul>
  <li>大话西游</li>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>
```

#### 5.5.3keys的优化

我们在前面遍历列表时，总是会提示一个警告，让我们加入一个key属性：

![image-20210116232435652](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210116232435652.png)

我们来看一个案例：

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ["星际穿越", "盗梦空间"]
    }
  }

  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
          {
            this.state.movies.map((item, index) => {
              return <li key={item}>{item}</li>
            })
          }
        </ul>
        <button onClick={e => this.insertMovie()}>插入数据</button>
      </div>
    )
  }

  insertMovie() {
  }
}
```

方式一：在最后位置插入数据

- 这种情况，有无key意义并不大

```jsx
insertMovie() {
  const newMovies = [...this.state.movies, "大话西游"];
  this.setState({
    movies: newMovies
  })
}
```

方式二：在前面插入数据

- 这种做法，在没有key的情况下，所有的li都需要进行修改；

```jsx
insertMovie() {
  const newMovies = ["大话西游", ...this.state.movies];
  this.setState({
    movies: newMovies
  })
}
```

当子元素(这里的li)拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素：

- 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改；
- 将key为333的元素插入到最前面的位置即可；

```jsx
<ul>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>

<ul>
  <li key="333">Connecticut</li>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>
```

**key的注意事项**：

- key应该是唯一的；
- key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
- 使用index作为key，对性能是没有优化的；

#### 5.5.4SCU的优化

> #### render函数被调用

我们使用之前的一个嵌套案例：

- 在App中，我们增加了一个计数器的代码；
- 当点击+1时，会重新调用App的render函数；
- 而当App的render函数被调用时，所有的子组件的render函数都会被重新调用；

```jsx
import React, { Component } from 'react';
//Header组件
function Header() {
  console.log("Header  被调用");
  return <h2>Header</h2>
}
//Main组件
class Main extends Component {
  render() {
    console.log("Main Render 被调用");
    return (
      <div>
        <Banner/>
        <ProductList/>
      </div>
    )
  }
}
//Banner组件
function Banner() {
  console.log("Banner  被调用");
  return <div>Banner</div>
}
//ProductList组件
function ProductList() {
  console.log("ProductList  被调用");
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
}
//Footer组件
function Footer() {
  console.log("Footer  被调用");
  return <h2>Footer</h2>
}
//App组件
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        {/*使用header组件*/}
        <Header/>
        {/*使用main组件*/}
        <Main/>
        {/*使用footer组件*/}
        <Footer/>
      </div>
    )
  }

  increment() {
   // 当执行此方法时，App Render被调用，所有在app中使用的子组件也会被重新调用
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```

那么，我们可以思考一下，在以后的开发中，我们只要是修改了App中的数据，所有的组件都需要重新render，进行diff算法，性能必然是很低的：

- 事实上，很多的组件没有必须要重新render；
- 它们调用render应该有一个前提，就是依赖的数据（state、props）发生改变时，再调用自己的render方法；

如何来控制render方法是否被调用呢？

- 通过`shouldComponentUpdate`方法即可；

> #### shouldComponentUpdate

React给我们提供了一个生命周期方法 `shouldComponentUpdate`（很多时候，我们简称为SCU），这个方法接受参数，并且需要有返回值：

- 该方法有两个参数：

- - 参数一：nextProps 修改之后，最新的props属性
  - 参数二：nextState 修改之后，最新的state属性

- 该方法返回值是一个boolean类型

- - 返回值为true，那么就需要调用render方法；
  - 返回值为false，那么久不需要调用render方法；
  - 默认返回的是true，也就是只要state发生改变，就会调用render方法；

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

我们可以控制它返回的内容，来决定是否需要重新渲染。

比如我们在App中增加一个message属性：

- jsx中并没有依赖这个message，那么它的改变不应该引起重新渲染；
- 但是因为render监听到state的改变，就会重新render，所以最后render方法还是被重新调用了；

```jsx
import React, { Component } from 'react';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: "Hello World"
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  changeText() {
    this.setState({
      message: "你好啊,李银河"
    })
  }
}
```

这个时候，我们可以通过实现`shouldComponentUpdate`来决定要不要重新调用render方法：

- 这个时候，我们改变counter时，会重新渲染；
- 如果，我们改变的是message，那么默认返回的是false，那么就不会重新渲染；

```jsx
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.counter !== this.state.counter) {
      //此时render会重新渲染
    return true;
  }
	//此时render不会重新渲染
  return false;
}
```

但是我们的代码依然没有优化到最好，因为当counter改变时，所有的子组件依然重新渲染了：

- 所以，事实上，我们应该实现所有的子组件的`shouldComponentUpdate`；

比如Main组件，可以进行如下实现：

- `shouldComponentUpdate`默认返回一个false；
- 在特定情况下，需要更新时，我们在上面添加对应的条件即可；

```jsx
class Main extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    console.log("Main Render 被调用");
    return (
      <div>
        <Banner/>
        <ProductList/>
      </div>
    )
  }
}
```

> #### PureComponent和memo

如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。

我们来设想一下shouldComponentUpdate中的各种判断的目的是什么？

- props或者state中的数据是否发生了改变，来决定shouldComponentUpdate返回true或者false；

事实上React已经考虑到了这一点，所以React已经默认帮我们实现好了，如何实现呢？

- 将class继承自PureComponent。

比如我们修改Main组件的代码：

```jsx
import { PureComponent } from 'react'
//Header组件：函数式组件
function Header() {
  console.log("Header  被调用");
  return <h2>Header</h2>
}
//Main组件：类组件
class Main extends PureComponent {
  render() {
    console.log("Main Render 被调用");
    return (
      <div>
        <Banner/>
        <ProductList/>
      </div>
    )
  }
}
//Banner组件：函数式组件
function Banner() {
  console.log("Banner  被调用");
  return <div>Banner</div>
}
//ProductList组件：函数式组件
function ProductList() {
  console.log("ProductList  被调用");
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
}
//Footer组件：函数式组件
function Footer() {
  console.log("Footer  被调用");
  return <h2>Footer</h2>
}
//App组件
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        {/*使用header组件*/}
        <Header/>
        {/*使用main组件*/}
        <Main/>
        {/*使用footer组件*/}
        <Footer/>
      </div>
    )
  }

  increment() {
   // 当执行此方法时，App Render被调用，所有的函数式组件会被重新渲染，但继承自PureComponent的子类组件不会被重新渲染
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```

PureComponent的原理是什么呢？

- 对props和state进行浅层比较；

**那么，如果是一个函数式组件呢？**

我们需要使用一个高阶组件memo：

- 我们将之前的Header、Banner、ProductList都通过memo函数进行一层包裹；
- Footer没有使用memo函数进行包裹；
- 最终的效果是，当counter发生改变时，Header、Banner、ProductList的函数不会重新执行，而Footer的函数会被重新执行；

```jsx
import React, { Component, PureComponent, memo } from 'react';

// 当函数式组件使用memo后，只有props改变时，才会重新渲染，其他情况不会渲染
const MemoHeader = memo(function() {
  console.log("Header Render 被调用");
  return <h2>Header</h2>
})

class Main extends PureComponent {
  render() {
    console.log("Main Render 被调用");
    return (
      <div>
        <MemoBanner/>
        <MemoProductList/>
      </div>
    )
  }
}

const MemoBanner = memo(function() {
  console.log("Banner Render 被调用");
  return <div>Banner</div>
})

const MemoProductList = memo(function() {
  console.log("ProductList Render 被调用");
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
})

// 没有使用memo执行
function Footer() {
  console.log("Footer Render 被调用");
  return <h2>Footer</h2>
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: "Hello World"
    }
  }

  render() {
    console.log("App Render 被调用");

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <MemoHeader/>
        <Main/>
        {/*app重新渲染时，Footer组件也会重新渲染，因为Footer为函数式组件，并且没有使用memo*/}
        <Footer/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.counter !== this.state.counter) {
      return true;
    }

    return false;
  }

  changeText() {
    this.setState({
      message: "你好啊,李银河"
    })
  }
}
```

> #### 不可变数据的力量

我们通过一个案例来演练我们之前说的不可变数据的重要性：

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: [
        { name: "lilei", age: 20, height: 1.76 },
        { name: "lucy", age: 18, height: 1.65 },
        { name: "tom", age: 30, height: 1.78 }
      ]
    }
  }

  render() {
    return (
      <div>
        <h2>朋友列表</h2>
        <ul>
          {
            this.state.friends.map((item, index) => {
              return (
                <li key={item.name}>
                  <span>{`姓名:${item.name} 年龄: ${item.age}`}</span>
                  <button onClick={e => this.incrementAge(index)}>年龄+1</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={e => this.insertFriend()}>添加新数据</button>
      </div>
    )
  }

  insertFriend() {
     
  }

  incrementAge(index) {
    
  }
}
```

**我们来思考一下inertFriend应该如何实现？**

实现方式一：

- 这种方式会造成界面不会发生刷新，添加新的数据；
- 原因是继承自PureComponent，会进行浅层比较，浅层比较过程中两个friends是相同的对象；

```jsx
insertFriend() {
  this.state.friends.push({name: "why", age: 18, height: 1.88});
  this.setState({
    friends: this.state.friends
  })
}
```

实现方式二：

- `[...this.state.friends, {name: "why", age: 18, height: 1.88}]`会生成一个新的数组引用；
- 在进行浅层比较时，两个引用的是不同的数组，所以它们是不相同的；

```jsx
insertFriend() {
  this.setState({
    friends: [...this.state.friends, {name: "why", age: 18, height: 1.88}]
  })
}
//推荐写法
insertFriend() {
  const newFriends = [...this.state.friends];
  newFriends.push({name: "why", age: 18, height: 1.88})
  this.setState({
    friends: newFriends
  })
}
```

**我们再来思考一下incrementAge应该如何实现？**

实现方式一：

- 和上面方式一类似

```jsx
incrementAge(index) {
  this.state.friends[index].age += 1;
  this.setState({
    friends: this.state.friends
  })
}
```

实现方式二：

- 和上面方式二类似

```jsx
incrementAge(index) {
  const newFriends = [...this.state.friends];
  newFriends[index].age += 1;
  this.setState({
    friends: newFriends
  })
}
```

所以，在真实开发中，我们要尽量保证state、props中的数据不可变性，这样我们才能合理和安全的使用PureComponent和memo。

当然，后面项目中我会结合`immutable.js`来保证数据的不可变性。

## 6.受控与非受控组件

### 6.1refs的使用

在React的开发模式中，通常情况下不需要、也不建议直接操作DOM元素，但是某些特殊的情况，确实需要获取到DOM进行某些操作：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

#### 6.1.1创建ref的方式

如何创建refs来获取对应的DOM呢？目前有三种方式：

- 方式一：传入字符串

  - 使用时通过 `this.refs.传入的字符串`格式获取对应的元素；

- 方式二：传入一个对象（推荐）

  - 对象是通过 `React.createRef()` 方式创建出来的；

  - 使用时获取到创建的对象其中有一个`current`属性就是对应的元素；

- 方式三：传入一个函数

  - 该函数会在DOM被挂载时进行回调，这个函数会传入一个 元素对象，我们可以自己保存；

  - 使用时，直接拿到之前保存的元素对象即可；


代码演练：

```jsx
import React, { PureComponent, createRef } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		// 方式2创建ref对象
    this.titleRef = createRef();
    // 方式3保存的ref对象
    this.titleEl = null;
  }

  render() {
    return (
      <div>
        { /* 方式1:传入字符串 */ }
        <h2 ref="title">String Ref</h2>
        {/* 方式2:传入对象 */}
        <h2 ref={this.titleRef}>Hello Create Ref</h2>
        {/* 方式1:传入函数 */}
        <h2 ref={element => this.titleEl = element}>Callback Ref</h2>

        <button onClick={e => this.changeText()}>改变文本</button>
      </div>
    )
  }

  changeText() {
    // 方式1：使用字符串获取dom
    this.refs.title.innerHTML = "你好啊,李银河";
    // 方式2：使用对象获取dom
    this.titleRef.current.innerHTML = "你好啊,李银河";
    // 方式3：回调函数方式
    this.titleEl.innerHTML = "你好啊,李银河";
  }
}
```

#### 6.1.2ref节点的类型

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性；
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性；
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例；

这里我们演示一下ref引用一个class组件对象：

```jsx
import React, { PureComponent, createRef } from 'react';

// 子组件
class Counter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		//创建ref对象
    this.counterRef = createRef();
  }

  render() {
    return (
      <div>
        <Counter ref={this.counterRef}/>
        <button onClick={e => this.increment()}>app +1</button>
      </div>
    )
  }

  increment() {
    // this.counterRef.current为组件对象
    // 父组件中通过ref调用子组件的方法
    this.counterRef.current.increment();
  }
}
```

函数式组件是没有实例的，所以无法通过ref获取他们的实例：

- 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素；
- 这个时候我们可以通过 `React.forwardRef` ，后面我们也会学习 hooks 中如何使用ref；

### 6.2受控组件

#### 6.2.1默认提交表单方式

在React中，HTML表单的处理方式和普通的DOM元素不太一样：表单元素通常会保存在一些内部的state。

比如下面的HTML表单元素：

- 这个处理方式是DOM默认处理HTML表单的行为，在用户点击提交时会提交到某个服务器中，并且刷新页面；
- 在React中，并没有禁止这个行为，它依然是有效的；
- 但是通常情况下会使用JavaScript函数来方便的处理表单提交，同时还可以访问用户填写的表单数据；
- 实现这种效果的标准方式是使用“受控组件”；

```jsx
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

#### 6.2.2受控组件提交表单

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。

而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 `setState()`来更新。

- 我们将两者结合起来，使React的state成为“唯一数据源”；
- 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作；
- 被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”；

例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		//保存表单数据
    this.state = {
      username: ""
    }
  }

  render() {
    const { username } = this.state;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="username">
            用户名: 
            <input type="text" 
                   id="username" 
                   onChange={e => this.handleUsernameChange(e)} 
              		 {/* 实现单向数据流*/}
                   value={username}/>
          </label>
          <input type="submit" value="提交"/>
        </form>
      </div>
    )
  }
	
  // 监听输入框的输入
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {
    console.log(this.state.username);
    // 阻止默认行为
    event.preventDefault();
  }
}
```

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。

由于 `handleUsernameChange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

#### 6.2.3常见表单的处理

刚才我们演示的是一个input表单的处理，这里我们再演示一下其他的情况。

![image-20210116234900743](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210116234900743.png)

> #### textarea标签

texteare标签和input比较相似：

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      article: "请编写你喜欢的文章"
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="article">
            <textarea id="article" cols="30" rows="10"
                      value={this.state.article}
                      onChange={e => this.handleArticelChange(e)}/>
          </label>
          <div>
            <input type="submit" value="发布文章"/>
          </div>
        </form>
      </div>
    )
  }

  handleArticelChange(event) {
    this.setState({
      article: event.target.value
    })
  }

  handleSubmit(event) {
    console.log(this.state.article);
    event.preventDefault();
  }
}
```

> #### select标签

select标签的使用也非常简单，只是它不需要通过selected属性来控制哪一个被选中，它可以匹配state的value来选中。

我们来进行一个简单的演示：

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		//保存数据
    this.state = {
      fruits: "orange"
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="fruits">
            <select id="fruits" 
                    value={this.state.fruits}
                    onChange={e => this.handleFruitsChange(e)}>
              <option value="apple">苹果</option>
              <option value="orange">橘子</option>
              <option value="banana">香蕉</option>
            </select>
          </label>
          <div>
            <input type="submit" value="提交"/>
          </div>
        </form>
      </div>
    )
  }
	//监听选择值的变化，并保存数据
  handleFruitsChange(event) {
    this.setState({
      fruits: event.target.value
    })
  }
	//提交方法
  handleSubmit(event) {
    console.log(this.state.article);
    //阻止默认行为
    event.preventDefault();
  }
}
```

> #### 处理多个输入

多处理方式可以像单处理方式那样进行操作，但是需要多个监听方法：

- 这里我们可以使用ES6的一个语法：计算属性名（Computed property names）

```jsx
let i = 0
let a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i
}

console.log(a.foo1) // 1
console.log(a.foo2) // 2
console.log(a.foo3) // 3

let param = 'size'
let config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
}

console.log(config) // {size: 12, mobileSize: 4}
```

我们进行对应的代码演练L

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		//保存表单数据
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    //解构表单数据
    const {username, password} = this.state;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="username">
            用户: 
            <input type="text" 
                   id="username" 
                   name="username"
                   onChange={e => this.handleChange(e)} 
                   value={username}/>
          </label>
          <label htmlFor="password">
            密码: 
            <input type="text" 
                   id="password" 
                   name="password"
                   onChange={e => this.handleChange(e)} 
                   value={password}/>
          </label>
          <input type="submit" value="提交"/>
        </form>
      </div>
    )
  }
	//监听多个输入方法
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
	//提交表单方法
  handleSubmit(event) {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
  }
}
```

### 6.3非受控组件

React推荐大多数情况下使用 `受控组件` 来处理表单数据：

- 一个受控组件中，表单数据是由 React 组件来管理的；
- 另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理；

如果要使用非受控组件中的数据，那么我们需要使用 `ref` 来从DOM节点中获取表单数据。

我们来进行一个简单的演练：

- 使用ref来获取input元素；
- 在非受控组件中通常使用defaultValue来设置默认值；

```jsx
import React, { PureComponent, createRef } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
		//创建ref对象
    this.usernameRef = createRef();
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="">
            用户:<input defaultValue="username" type="text" name="username" ref={this.usernameRef}/>
          </label>
          <input type="submit" value="提交"/>
        </form>
      </div>
    )
  }
	//监听提交
  handleSubmit(event) {
    //阻止默认行为
    event.preventDefault();
    //通过dom操作获取数据
    console.log(this.usernameRef.current.value);
  }
}
```

同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` 支持 `defaultValue`。

## 7.高阶组件以及组件补充

### 7.1高阶组件

什么是高阶组件呢？相信很多同学都听说过，也用过 `高阶函数`，它们非常相似，所以我们可以先来回顾一下什么是 `高阶函数`。

高阶函数的维基百科定义：至少满足以下条件之一：

- 接受一个或多个函数作为输入；
- 输出一个函数；

JavaScript中比较常见的filter、map、reduce都是高阶函数。

那么说明是高阶组件呢？

- 高阶组件的英文是 **Higher-Order Components**，简称为 `HOC`；
- 官方的定义：**高阶组件是参数为组件，返回值为新组件的函数**；

我们可以进行如下的解析：

- 首先， `高阶组件` 本身不是一个组件，而是一个函数；
- 其次，这个函数的参数是一个组件，返回值也是一个组件；

高阶组件的调用过程类似于这样：

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

高阶函数的编写过程类似于这样：

```jsx
function higherOrderComponent(WrapperComponent) {
  return class NewComponent extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }
}
```

在ES6中，类表达式中类名是可以省略的，所以可以可以写成下面的写法：

```jsx
function higherOrderComponent(WrapperComponent) {
  return class extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }
}
```

另外，组件的名称都可以通过displayName来修改：

![image-20210116235529680](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210116235529680.png)

完整的代码，我们可以这样来编写：

```jsx
import React, { PureComponent } from 'react';

function higherOrderComponent(WrapperComponent) {
  return class NewComponent extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

export default higherOrderComponent(App);
```

高阶组件并不是React API的一部分，它是基于React的组合特性而形成的设计模式；

高阶组件在一些React第三方库中非常常见：

- 比如redux中的connect；（后续会讲到）
- 比如react-router中的withRouter；（后续会讲到）

在我们的开发中，高阶组件可以帮助我们做哪些事情呢？

#### 7.1.1高阶组件的使用

> #### props的增强

**不修改原有代码的情况下，添加新的props**

加入我们有如下案例：

```jsx
class Header extends PureComponent {
  render() {
    const { name, age } = this.props;
    return <h2>Header {name + age}</h2>
  } 
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header name="aaa" age={18} />
      </div>
    )
  }
}
```

我们可以通过一个高阶组件，让使用者在不破坏原有结构的情况下对某个组件增强props：

```jsx
function enhanceProps(WrapperCpn, otherProps) {
 return props => <WrapperCpn {...props} {...otherProps} />
}

const EnhanceHeader = enhanceProps(Header, {height: 1.88})
```

**利用高阶组件来共享Context**

利用高阶组件来共享Context属性

```jsx
import React, { PureComponent, createContext } from 'react';

const UserContext = createContext({
  nickname: "默认",
  level: -1
})

function Header(props) {
  return (
    <UserContext.Consumer>
      {
        value => {
          const { nickname, level } = value;
          return <h2>Header {"昵称:" + nickname + "等级" + level}</h2>
        }
      }
    </UserContext.Consumer>
  )
}

function Footer(props) {
  return (
    <UserContext.Consumer>
      {
        value => {
          const { nickname, level } = value;
          return <h2>Footer {"昵称:" + nickname + "等级" + level}</h2>
        }
      }
    </UserContext.Consumer>
  )
}

const EnhanceHeader = enhanceProps(Header, { height: 1.88 })

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: "why", level: 90 }}>
          <Header />
          <Footer />
        </UserContext.Provider>
      </div>
    )
  }
}
```

利用高阶组件`withUser`：

```jsx
import React, { PureComponent, createContext } from 'react';

const UserContext = createContext({
  nickname: "默认",
  level: -1
})

function withUser(WrapperCpn) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          value => {
            return <WrapperCpn {...props} {...value}/>
          }
        }
      </UserContext.Consumer>
    )
  }
}

function Header(props) {
  const { nickname, level } = props;
  return <h2>Header {"昵称:" + nickname + "等级:" + level}</h2>
}


function Footer(props) {
  const { nickname, level } = props;
  return <h2>Footer {"昵称:" + nickname + "等级:" + level}</h2>
}

const UserHeader = withUser(Header);
const UserFooter = withUser(Footer);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: "why", level: 90 }}>
          <UserHeader />
          <UserFooter />
        </UserContext.Provider>
      </div>
    )
  }
}
```

> #### 渲染判断鉴权

在开发中，我们可能遇到这样的场景：

- 某些页面是必须用户登录成功才能进行进入；
- 如果用户没有登录成功，那么直接跳转到登录页面；

这个时候，我们就可以使用高阶组件来完成鉴权操作：

```jsx
function LoginPage() {
  return <h2>LoginPage</h2>
}

function CartPage() {
  return <h2>CartPage</h2>
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <CartPage/>
      </div>
    )
  }
}
```

编写鉴权的高阶组件：

```jsx
function loginAuth(Page) {
  return props => {
    if (props.isLogin) {
      return <Page/>
    } else {
      return <LoginPage/>
    }
  }
}
```

完整的代码如下：

```jsx
import React, { PureComponent } from 'react';

function loginAuth(Page) {
  return props => {
    if (props.isLogin) {
      return <Page/>
    } else {
      return <LoginPage/>
    }
  }
}

function LoginPage() {
  return <h2>LoginPage</h2>
}

function CartPage() {
  return <h2>CartPage</h2>
}

const AuthCartPage = loginAuth(CartPage);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCartPage isLogin={true}/>
      </div>
    )
  }
}
```

> #### 生命周期劫持

```jsx
import React, { PureComponent } from 'react';

class Home extends PureComponent {

  UNSAFE_componentWillMount() {
    this.begin = Date.now();
  }

  componentDidMount() {
    this.end = Date.now();
    const interval = this.end - this.begin;
    console.log(`Home渲染使用时间:${interval}`)
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>我是home的元素,哈哈哈</p>
      </div>
    )
  }
}

class Detail extends PureComponent {
  UNSAFE_componentWillMount() {
    this.begin = Date.now();
  }

  componentDidMount() {
    this.end = Date.now();
    const interval = this.end - this.begin;
    console.log(`Detail渲染使用时间:${interval}`)
  }

  render() {
    return (
      <div>
        <h2>Detail</h2>
        <p>我是detail的元素,哈哈哈</p>
      </div>
    )
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
        <Detail/>
      </div>
    )
  }
}
```

我们可以定义如下高阶组件：

```jsx
function logRenderTime(WrapperCpn) {
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.begin = Date.now();
    }

    componentDidMount() {
      this.end = Date.now();
      const interval = this.end - this.begin;
      console.log(`Home渲染使用时间:${interval}`)
    }

    render() {
      return <WrapperCpn {...this.props}/>
    }
  }
}

const LogHome = logRenderTime(Home);
const LogDetail = logRenderTime(Detail);
```

完整代码如下：

```jsx
import React, { PureComponent } from 'react';

function logRenderTime(WrapperCpn) {
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.begin = Date.now();
    }

    componentDidMount() {
      this.end = Date.now();
      const interval = this.end - this.begin;
      console.log(`${WrapperCpn.name}渲染使用时间:${interval}`)
    }

    render() {
      return <WrapperCpn {...this.props}/>
    }
  }
}

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>我是home的元素,哈哈哈</p>
      </div>
    )
  }
}


class Detail extends PureComponent {
  render() {
    return (
      <div>
        <h2>Detail</h2>
        <p>我是detail的元素,哈哈哈</p>
      </div>
    )
  }
}

const LogHome = logRenderTime(Home);
const LogDetail = logRenderTime(Detail);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <LogHome />
        <LogDetail />
      </div>
    )
  }
}
```

#### 7.1.2高阶函数的意义

我们会发现利用高阶组件可以针对某些React代码进行更加优雅的处理。

其实早期的React有提供组件之间的一种复用方式是mixin，目前已经不再建议使用：

- `Mixin` 可能会相互依赖，相互耦合，不利于代码维护
- 不同的`Mixin`中的方法可能会相互冲突
- `Mixin`非常多时，组件是可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

当然，HOC也有自己的一些缺陷：

- `HOC`需要在原组件上进行包裹或者嵌套，如果大量使用`HOC`，将会产生非常多的嵌套，这让调试变得非常困难；
- `HOC`可以劫持`props`，在不遵守约定的情况下也可能造成冲突；

Hooks的出现，是开创性的，它解决了很多React之前的存在的问题，比如this指向问题、比如hoc的嵌套复杂度问题等等；

### 7.2组件补充

#### 7.2.1ref转发

```jsx
import React, { PureComponent, createRef } from 'react';

function Home(props) {
  return (
    <div>
      <h2 ref={props.ref}>Home</h2>
      <button>按钮</button>
    </div>
  )
}

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.homeTitleRef = createRef();
  }

  render() {
    return (
      <div>
        <Home ref={this.homeTitleRef}/>
        <button onClick={e => this.printInfo()}>打印ref</button>
      </div>
    )
  }

  printInfo() {
    console.log(this.homeTitleRef);
  }
}
```

使用forwardRef

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react';

const Home = forwardRef(function(props, ref) {
  return (
    <div>
      <h2 ref={ref}>Home</h2>
      <button>按钮</button>
    </div>
  )
})

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.homeTitleRef = createRef();
  }

  render() {
    return (
      <div>
        <Home ref={this.homeTitleRef}/>
        <button onClick={e => this.printInfo()}>打印ref</button>
      </div>
    )
  }

  printInfo() {
    console.log(this.homeTitleRef.current);
  }
}
```

#### 7.2.2Portals

某些情况下，我们希望渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素中（默认都是挂载到id为root的DOM元素上的）。

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案：

- 第一个参数（`child`）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment；
- 第二个参数（`container`）是一个 DOM 元素；

```jsx
ReactDOM.createPortal(child, container)
```

通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点：

```jsx
render() {
  // React 挂载了一个新的 div，并且把子元素渲染其中
  return (
    <div>      
      {this.props.children}
    </div>  
  );
}
```

然而，有时候将子元素插入到 DOM 节点中的不同位置也是有好处的：

```jsx
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode  
  );
}
```

**比如说，我们准备开发一个Modal组件，它可以将它的子组件渲染到屏幕的中间位置：**

步骤一：修改index.html添加新的节点

```jsx
<div id="root"></div>
<!-- 新节点 -->
<div id="modal"></div>
```

步骤二：编写这个节点的样式：

```jsx
#modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
}
```

步骤三：编写组件代码

```jsx
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById("modal")
    )
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Modal>
          <h2>我是标题</h2>
        </Modal>
      </div>
    )
  }
}
```

#### 7.2.3Fragment

在之前的开发中，我们总是在一个组件中返回内容时包裹一个div元素：

```jsx
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h2>当前计数: 0</h2>
        <button>+1</button>
        <button>-1</button>
      </div>
    )
  }
}
```

我们会发现多了一个div元素：

- 这个div元素对于某些场景是需要的（比如我们就希望放到一个div元素中，再针对性设置样式）
- 某些场景下这个div是没有必要的，比如当前这里我可能希望所有的内容直接渲染到root中即可；

我们可以删除这个div吗？

我们又希望可以不渲染这样一个div应该如何操作呢？

- 使用Fragment
- Fragment 允许你将子列表分组，而无需向 DOM 添加额外节点；

React还提供了Fragment的段语法：

- 它看起来像空标签 `<> </>`；

```jsx
export default class App extends PureComponent {
  render() {
    return (
      <>
        <h2>当前计数: 0</h2>
        <button>+1</button>
        <button>-1</button>
      </>
    )
  }
}
```

但是，如果我们需要在Fragment中添加key，那么就不能使用段语法：

```jsx
{
  this.state.friends.map((item, index) => {
    return (
      <Fragment key={item.name}>
        <div>{item.name}</div>
        <div>{item.age}</div>
      </Fragment>
    )
  })
}
```

这里是不支持如下写法的：

```jsx
<key={item.name}>
  <div>{item.name}</div>
  <div>{item.age}</div>
</>
```

#### 7.2.4StrictMode

`StrictMode` 是一个用来突出显示应用程序中潜在问题的工具。

- 与 `Fragment` 一样，`StrictMode` 不会渲染任何可见的 UI；
- 它为其后代元素触发额外的检查和警告；
- 严格模式检查仅在开发模式下运行；*它们不会影响生产构建*；

可以为应用程序的任何部分启用严格模式：

- *不*会对 `Header` 和 `Footer` 组件运行严格模式检查；
- 但是，`ComponentOne` 和 `ComponentTwo` 以及它们的所有后代元素都将进行检查；

```jsx
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

**但是检测，到底检测什么呢？**

1.识别不安全的生命周期：

```jsx
class Home extends PureComponent {
  UNSAFE_componentWillMount() {

  }

  render() {
    return <h2>Home</h2>
  }
}
```

![image-20210117000552774](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210117000552774.png)

2.使用过时的ref API

```jsx
class Home extends PureComponent {
  UNSAFE_componentWillMount() {

  }

  render() {
    return <h2 ref="home">Home</h2>
  }
}
```

![image-20210117000615028](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20210117000615028.png)

3.使用废弃的findDOMNode方法

在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了，可以自行学习演练一下

4.检查意外的副作用

- 这个组件的constructor会被调用两次；
- 这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用；
- 在生产环境中，是不会被调用两次的；

```jsx
class Home extends PureComponent {
  constructor(props) {
    super(props);

    console.log("home constructor");
  }

  UNSAFE_componentWillMount() {

  }

  render() {
    return <h2 ref="home">Home</h2>
  }
}
```

5.检测过时的context API

早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的；

目前这种方式已经不推荐使用，大家可以自行学习了解一下它的用法；

## 8.React中的CSS

事实上，css一直是React的痛点，也是被很多开发者吐槽、诟病的一个点。

在组件化中选择合适的CSS解决方案应该符合以下条件：

- 可以编写局部css：css具备自己的具备作用域，不会随意污染其他组件内的原生；
- 可以编写动态的css：可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
- 支持所有的css特性：伪类、动画、媒体查询等；
- 编写起来简洁方便、最好符合一贯的css风格特点；
- 等等...

在这一点上，Vue做的要远远好于React：

- Vue通过在.vue文件中编写 `<style><style>` 标签来编写自己的样式；
- 通过是否添加 `scoped` 属性来决定编写的样式是全局有效还是局部有效；
- 通过 `lang` 属性来设置你喜欢的 `less`、`sass`等预处理器；
- 通过内联样式风格的方式来根据最新状态设置和改变css；
- 等等...

Vue在CSS上虽然不能称之为完美，但是已经足够简洁、自然、方便了，至少统一的样式风格不会出现多个开发人员、多个项目采用不一样的样式风格。

相比而言，React官方并没有给出在React中统一的样式风格：

- 由此，从普通的css，到css modules，再到css in js，有几十种不同的解决方案，上百个不同的库；
- 大家一致在寻找最好的或者说最适合自己的CSS方案，但是到目前为止也没有统一的方案；

在这篇文章中，我会介绍挑选四种解决方案来介绍：

- 方案一：内联样式的写法；
- 方案二：普通的css写法；
- 方案三：css modules；
- 方案四：css in js（styled-components）；

### 8.1内联样式

内联样式是官方推荐的一种css样式的写法：

- `style` 接受一个采用小驼峰命名属性的 JavaScript 对象，，而不是 CSS 字符串；
- 并且可以引用state中的状态来设置相关的样式；

```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      titleColor: "red"
    }
  }

  render() {
    return (
      <div>
        <h2 style={{color: this.state.titleColor, fontSize: "20px"}}>我是App标题</h2>
        <p style={{color: "green", textDecoration: "underline"}}>我是一段文字描述</p>
      </div>
    )
  }
}
```

内联样式的优点:

- 1.内联样式, 样式之间不会有冲突
- 2.可以动态获取当前state中的状态

内联样式的缺点：

- 1.写法上都需要使用驼峰标识
- 2.某些样式没有提示
- 3.大量的样式, 代码混乱
- 4.某些样式无法编写(比如伪类/伪元素)

所以官方依然是希望内联合适和普通的css来结合编写；

### 8.2普通的css

普通的css我们通常会编写到一个单独的文件。

App.js中编写React逻辑代码：

```jsx
import React, { PureComponent } from 'react';

import Home from './Home';

import './App.css';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p>
        <Home/>
      </div>
    )
  }
}
```

App.css中编写React样式代码：

```css
.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```

这样的编写方式和普通的网页开发中编写方式是一致的：

- 如果我们按照普通的网页标准去编写，那么也不会有太大的问题；
- 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响；
- 但是普通的css都属于全局的css，样式之间会相互影响；

比如编写Home.js的逻辑代码：

```jsx
import React, { PureComponent } from 'react';

import './Home.css';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <h2 className="title">我是Home标题</h2>
        <span className="desc">我是Home中的span段落</span>
      </div>
    )
  }
}
```

又编写了Home.css的样式代码：

```css
.title {
  color: orange;
}

.desc {
  color: purple;
}
```

最终样式之间会相互层叠，只有一个样式会生效；

### 8.3css modules

css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的。

但是，如果在其他项目中使用，那么我们需要自己来进行配置，比如配置webpack.config.js中的`modules: true`等。

但是React的脚手架已经内置了css modules的配置：

- .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss 等；
- 之后就可以引用并且进行使用了；

使用的方式如下：

![image-20210117225621402](/Users/xujian/Library/Application Support/typora-user-images/image-20210117225621402.png)

这种css使用方式最终生成的class名称会全局唯一：

css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案。

但是这种方案也有自己的缺陷：

- 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的；
- 所有的className都必须使用`{style.className}` 的形式来编写；
- 不方便动态来修改某些样式，依然需要使用内联样式的方式；

如果你觉得上面的缺陷还算OK，那么你在开发中完全可以选择使用css modules来编写，并且也是在React中很受欢迎的一种方式。

### 8.4CSS in JS

#### 8.4.1认识CSS in JS

实际上，官方文档也有提到过CSS in JS这种方案：

- “CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义；
- *注意此功能并不是 React 的一部分，而是由第三方库提供。* React 对样式如何定义并没有明确态度；

在传统的前端开发中，我们通常会将结构（HTML）、样式（CSS）、逻辑（JavaScript）进行分离。

- 但是在前面的学习中，我们就提到过，React的思想中认为逻辑本身和UI是无法分离的，所以才会有了JSX的语法。
- 样式呢？样式也是属于UI的一部分；
- 事实上CSS-in-JS的模式就是一种将样式（CSS）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态；
- 所以React有被人称之为 `All in JS`；

当然，这种开发的方式也受到了很多的批评：

- Stop using CSS in JavaScript for web development
- https://hackernoon.com/stop-using-css-in-javascript-for-web-development-fa32fb873dcc

批评声音虽然有，但是在我们看来很多优秀的CSS-in-JS的库依然非常强大、方便：

- CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等；
- 依然CSS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
- 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案；

目前比较流行的CSS-in-JS的库有哪些呢？

- styled-components
- emotion
- glamorous

目前可以说styled-components依然是社区最流行的CSS-in-JS库，所以我们以styled-components的讲解为主；

安装styled-components：

```bash
yarn add styled-components
```

#### 8.4.2styled-components

1. #### 标签模板字符串

ES6中增加了`模板字符串`的语法，这个对于很多人来说都会使用。

但是模板字符串还有另外一种用法：标签模板字符串（Tagged Template Literals）。

我们一起来看一个普通的JavaScript的函数：

```js
function foo(...args) {
  console.log(args);
}

foo("Hello World");
```

正常情况下，我们都是通过 `函数名()` 方式来进行调用的，其实函数还有另外一种调用方式：

```js
foo`Hello World`; // [["Hello World"]]
```

如果我们在调用的时候插入其他的变量：

- 模板字符串被拆分了；
- 第一个元素是数组，是被模块字符串拆分的字符串组合；
- 后面的元素是一个个模块字符串传入的内容；

```js
foo`Hello ${name}`; // [["Hello ", ""], "kobe"];
```

在styled component中，就是通过这种方式来解析模块字符串，最终生成我们想要的样式的

2. #### styled基本使用

styled-components的本质是通过函数的调用，最终创建出一个`组件`：

- 这个组件会被自动添加上一个不重复的class；
- styled-components会给该class添加相关的样式；

比如我们正常开发出来的Home组件是这样的格式：

```html
<div>
  <h2>我是Home标题</h2>
  <ul>
    <li>我是列表1</li>
    <li>我是列表2</li>
    <li>我是列表3</li>
  </ul>
</div>
```

我们希望给外层的div添加一个特殊的class，并且添加相关的样式：

![image-20210117225909054](/Users/xujian/Library/Application Support/typora-user-images/image-20210117225909054.png)

另外，它支持类似于CSS预处理器一样的样式嵌套：

- 支持直接子代选择器或后代选择器，并且直接编写样式；
- 可以通过&符号获取当前元素；
- 直接伪类选择器、伪元素等；

```css
const HomeWrapper = styled.div`
  color: purple;

  h2 {
    font-size: 50px;
  }

  ul > li {
    color: orange;

    &.active {
      color: red;
    }

    &:hover {
      background: #aaa;
    }

    &::after {
      content: "abc"
    }
  }
`
```

3. #### props、attrs属性

**props可以穿透**

定义一个styled组件：

```css
const HYInput = styled.input`
  border-color: red;

  &:focus {
    outline-color: orange;
  }
`
```

使用styled的组件：

```html
<HYInput type="password"/>
```

**props可以被传递给styled组件**

```html
<HomeWrapper color="blue">
</HomeWrapper>
```

使用时可以获取到传入的color：

- 获取props需要通过${}传入一个插值函数，props会作为该函数的参数；
- 这种方式可以有效的解决动态样式的问题；

```js
const HomeWrapper = styled.div`
  color: ${props => props.color};
}
```

**添加attrs属性**

```js
const HYInput = styled.input.attrs({
  placeholder: "请填写密码",
  paddingLeft: props => props.left || "5px"
})`
  border-color: red;
  padding-left: ${props => props.paddingLeft};

  &:focus {
    outline-color: orange;
  }
`
```

4. #### styled高级特性

**支持样式的继承**

编写styled组件

```js
const HYButton = styled.button`
  padding: 8px 30px;
  border-radius: 5px;
`

const HYWarnButton = styled(HYButton)`
  background-color: red;
  color: #fff;
`

const HYPrimaryButton = styled(HYButton)`
  background-color: green;
  color: #fff;
`
```

按钮的使用

```js
<HYButton>我是普通按钮</HYButton>
<HYWarnButton>我是警告按钮</HYWarnButton>
<HYPrimaryButton>我是主要按钮</HYPrimaryButton>
```

**styled设置主题**

在全局定制自己的主题，通过Provider进行共享：

```js
import { ThemeProvider } from 'styled-components';

<ThemeProvider theme={{color: "red", fontSize: "30px"}}>
  <Home />
  <Profile />
</ThemeProvider>
```

在styled组件中可以获取到主题的内容：

```js
const ProfileWrapper = styled.div`
  color: ${props => props.theme.color};
  font-size: ${props => props.theme.fontSize};
`
```

> ### classnames

**vue中添加class**

在vue中给一个元素添加动态的class是一件非常简单的事情：

你可以通过传入一个对象：

```jsx
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

你也可以传入一个数组：

```jsx
<div v-bind:class="[activeClass, errorClass]"></div>
```

甚至是对象和数组混合使用：

```jsx
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

**react中添加class**

React在JSX给了我们开发者足够多的灵活性，你可以像编写JavaScript代码一样，通过一些逻辑来决定是否添加某些class：

```jsx
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true
    }
  }

  render() {
    const {isActive} = this.state; 

    return (
      <div>
        <h2 className={"title " + (isActive ? "active": "")}>我是标题</h2>
        <h2 className={["title", (isActive ? "active": "")].join(" ")}>我是标题</h2>
      </div>
    )
  }
}
```

这个时候我们可以借助于一个第三方的库：classnames

- 很明显，这是一个用于动态添加classnames的一个库。

我们来使用一下最常见的使用案例：

```jsx
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

## 9.AntDesign UI库

### 9.1AntDesign的安装

```bash
npm install antd --save
yarn add antd
```

我们需要在index.js中引入全局的Antd样式：

```jsx
import "antd/dist/antd.css";
```

在App.js中就可以使用一些组件了。

`antd` 官网有提到：`antd` 的 JS 代码默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 `import { Button } from 'antd'` 就会有按需加载的效果。

### 9.2高级配置

#### 9.2.1认识craco

上面的使用过程是无法对主题进行配置的，好像对主题等相关的高级特性进行配置，需要修改create-react-app 的默认配置。

如何修改create-react-app 的默认配置呢？

- 前面我们讲过，可以通过`yarn run eject`来暴露出来对应的配置信息进行修改；
- 但是对于webpack并不熟悉的人来说，直接修改 CRA 的配置是否会给你的项目带来负担，甚至会增加项目的隐患和不稳定性呢？
- 所以，在项目开发中是不建议大家直接去修改 CRA 的配置信息的；

那么如何来进行修改默认配置呢？社区目前有两个比较常见的方案：

- react-app-rewired + customize-cra；（这个是antd早期推荐的方案）
- craco；（目前antd推荐的方案）

第一步：安装craco：

```bash
yarn add @craco/craco
```

第二步：修改package.json文件

- 原本启动时，我们是通过react-scripts来管理的；
- 现在启动时，我们通过craco来管理；

```zsh
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
}
```

第三步：在根目录下创建craco.config.js文件用于修改默认配置

```js
module.exports = {
  // 配置文件
}
```

#### 9.2.2配置主题

按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能：

- 我们可以引入 craco-less 来帮助加载 less 样式和修改变量；

安装 `craco-less`：

```bash
yarn add craco-less
```

修改craco.config.js中的plugins：

- 使用`modifyVars`可以在运行时修改LESS变量；
- 

```js
const CracoLessPlugin = require('craco-less');

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
    },
  ],
}
```

引入antd的样式时，引入antd.less文件：

```js
// import "antd/dist/antd.css";
import 'antd/dist/antd.less';
```

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

#### 9.2.3配置别名

在项目开发中，某些组件或者文件的层级会较深，

- 如果我们通过上层目录去引入就会出现这样的情况：`../../../../components/button`；
- 如果我们可以配置别名，就可以直接从根目录下面开始查找文件：`@/components/button`，甚至是：`components/button`；

配置别名也需要修改webpack的配置，当然我们也可以借助于 craco 来完成：

```js
...

const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  ...
  ,
  webpack: {
    alias: {
      '@': resolve("src"),
      'components': resolve("src/components"),
    }
  }
}
```

在导入时就可以按照下面的方式来使用了：

```js
import HYCommentInput from '@/components/comment-input';
import HYCommentItem from 'components/comment-item';
```

## 10.React过渡动画

在开发中，我们想要给一个组件的显示和消失添加一些过渡动画，可以很好的增加用户体验。

当然，我们可以通过原生的CSS来实现这些过渡动画，但是React社区为我们提供了react-transition-group完成了过渡动画。

### 10.1介绍

react曾为开发者提供过动画插件`react-addons-css-transition-group`，后由社区维护，形成了现在的`react-transition-group`。

这个库可以帮助我们方便的实现组件的`入场`和`离场`动画，使用时需要进行额外的安装：

```bash
npm install react-transition-group --save
yarn add react-transition-group
```

react-transition-group本身非常小，不会为我们应用程序增加过多的负担。

react-transition-group主要包含四个组件：

- 过渡

- - 该组件是一个和平台无关的组件（不一定要结合CSS）；
  - 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition；

- CSS过渡

- - 在前端开发中，通常使用CSSTransition来完成过渡动画效果

- 转换开关

- - 两个组件显示和隐藏切换时，使用该组件

- 过渡集团

- - 将多个动画组件包裹在其中，一般用于列表中元素的动画；

### 10.2react-transition-group使用

#### 10.2.1CSS过渡

CSSTransition是基于Transition组件内置的：

- CSSTransition执行过程中，有三个状态：出现，进入，退出；

- 它们有三种状态，需要定义对应的CSS样式：

- - 第一类，开始状态：对于的类是-出现，进入，退出；
  - 第二类：执行动画：对应的类是-出现活跃，进入活跃，退出活跃；
  - 第三类：执行结束：对应的类是-完成，进入，退出

CSSTransition常见对应的属性：

- in：触发进入或退出状态

- - 如果添加了`unmountOnExit={true}`，那么该该组件会在执行退出动画结束后被删除掉；
  - 当在真正时，触发进入状态，会添加-enter，-enter-acitve的类开始执行动画，当动画执行结束后，会删除两个类，并添加-enter-done的类；
  - 当在为假时，触发退出状态，会添加-exit，-exit-active的类开始执行动画，当动画执行结束后，会删除两个类，并添加-enter-done的类；

- classNames：动画class的名称

- - 决定了在编写css时，对应的类名称：

- 超时：

- - 过渡动画的时间

- 出现：

- - 是否在初次进入添加动画（需要和in同时为true）

- 其他属性可以参考官网来学习：

- - https://reactcommunity.org/react-transition-group/transition

CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作

- onEnter：在进入动画之前被触发；
- onEntering：在应用进入动画时被触发；
- onEntered：在应用进入动画结束后被触发；

```javascript
import './App.css'

import { CSSTransition } from 'react-transition-group';

import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowCard: true
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={e => this.setState({isShowCard: !this.state.isShowCard})}>显示/隐藏</Button>
        <CSSTransition in={this.state.isShowCard}
                       classNames="card"
                       timeout={1000}
                       unmountOnExit={true}
                       onEnter={el => console.log("进入动画前")}
                       onEntering={el => console.log("进入动画")}
                       onEntered={el => console.log("进入动画后")}
                       onExit={el => console.log("退出动画前")}
                       onExiting={el => console.log("退出动画")}
                       onExited={el => console.log("退出动画后")}
                      >
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </CSSTransition>
      </div>
    )
  }
}
```

对应的css样式如下：

```css
.card-enter, .card-appear {
  opacity: 0;
  transform: scale(.8);
}

.card-enter-active, .card-appear-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}

.card-exit {
  opacity: 1;
}

.card-exit-active {
  opacity: 0;
  transform: scale(.8);
  transition: opacity 300ms, transform 300ms;
}
```

#### 10.2.2转换开关

SwitchTransition可以完成两个组件之间切换的炫酷动画：

- 例如我们有一个按钮需要在on和off之间切换，我们希望看到on先从垂直退出，off再从右侧进入；
- 这个动画在vue中被称为vue转换模式；
- react-transition-group中使用SwitchTransition来实现该动画；

SwitchTransition中主要有一个属性：mode，有两个值

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入；

如何使用SwitchTransition呢？

- SwitchTransition组件里面要有CSSTransition或Transition组件，不能直接包裹你想要切换的组件；
- SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是某些状态，取而代之的是key属性；

我们来演练一个按钮的入场和出场效果：

```js
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          <button onClick={this.btnClick.bind(this)}>
            {isOn ? "on": "off"}
          </button>
        }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}
```

对应的css代码：

```css
.btn-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
```

#### 10.2.3过渡集团

当我们有一组动画时，需要将这些CSSTransition加入到一个TransitionGroup中来完成动画：

```js
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                <CSSTransition classNames="friend" timeout={300} key={index}>
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}
```

## 11.Redux 

### 11.1JavaScript纯函数

函数式编程中有一个概念叫纯函数，JavaScript符合函数式编程的范式，所以也有纯函数的概念；

在程序设计中，若一个函数符合以下条件，那么这个函数被称为纯函数：

- 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。
- 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

当然上面的定义会过于的晦涩，所以我简单总结一下：

- 确定的输入，一定会产生确定的输出；
- 函数在执行过程中，不能产生副作用；

那么我们来看几个函数是否是纯函数：

案例一：

- 很明显，下面的函数是一个纯函数；
- 它的输出是依赖我们的输入内容，并且中间没有产生任何副作用；

```js
function sum(num1, num2) {
  return num1 + num2;
}
```

案例二：

- add函数不是一个纯函数；
- 函数依赖一个外部的变量，变量发生改变时，会影响：确定的输入，产生确定的输出；
- 能否改进成纯函数呢？const foo = 5; 即可

```js
let foo = 5;

function add(num) {
  return foo + num;
}

console.log(add(5));
foo = 10;
console.log(add(5));
```

案例三：

- printInfo不是一个纯函数；
- 虽然无论输入什么，最终输出都是undefined，但是它产生了副作用，修改了传入的对象；

```js
function printInfo(info) {
  console.log(info.name, info.age);
  info.name = "哈哈哈";
}
```

当然纯函数还有很多的变种，但是我们只需要理解它的核心就可以了。

为什么纯函数在函数式编程中非常重要呢？

- 因为你可以`安心的写`和`安心的用`；
- 你在写的时候保证了函数的纯度，只是但是实现自己的业务逻辑即可，不需要关心传入的内容或者依赖其他的外部变量；
- 你在用的时候，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出；

React中就要求我们无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改：

### 11.2为什么需要redux？

JavaScript开发的应用程序，已经变得越来越复杂了：

- JavaScript需要管理的状态越来越多，越来越复杂；
- 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等，也包括一些UI的状态，比如某些元素是否被选中，是否显示加载动效，当前分页；

管理不断变化的state是非常困难的：

- 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，View页面也有可能会引起状态的变化；
- 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控制和追踪；

React是在视图层帮助我们解决了DOM的渲染过程，但是State依然是留给我们自己来管理：

- 无论是组件定义自己的state，还是组件之间的通信通过props进行传递；也包括通过Context进行数据之间的共享；
- React主要负责帮助我们管理视图，state如何维护最终还是我们自己来决定；

Redux就是一个帮助我们管理State的容器：Redux是JavaScript的状态容器，提供了可预测的状态管理；

Redux除了和React一起使用之外，它也可以和其他界面库一起来使用（比如Vue），并且它非常小（包括依赖在内，只有2kb）

### 11.3redux的核心理念

Redux的核心理念非常简单。

比如我们有一个朋友列表需要管理：

- 如果我们没有定义统一的规范来操作这段数据，那么整个数据的变化就是无法跟踪的；
- 比如页面的某处通过`products.push`的方式增加了一条数据；
- 比如另一个页面通过`products[0].age = 25`修改了一条数据；
- 整个应用程序错综复杂，当出现bug时，很难跟踪到底哪里发生的变化；

```js
const initialState = {
  friends: [
    { name: "why", age: 18 },
    { name: "kobe", age: 40 },
    { name: "lilei", age: 30 },
  ]
};
```

Redux要求我们通过action来更新数据：

- 所有数据的变化，必须通过派发（dispatch）action来更新；
- action是一个普通的JavaScript对象，用来描述这次更新的type和content；

比如下面就是几个更新friends的action：

- 强制使用action的好处是可以清晰的知道数据到底发生了什么样的变化，所有的数据变化都是可跟追、可预测的；
- 当然，目前我们的action是固定的对象，真实应用中，我们会通过函数来定义，返回一个action；

```js
const action1 = { type: "ADD_FRIEND", info: { name: "lucy", age: 20 } }
const action2 = { type: "INC_AGE", index: 0 }
const action3 = { type: "CHANGE_NAME", playload: { index: 0, newName: "coderwhy" } }
```

但是如何将state和action联系在一起呢？答案就是reducer

- reducer是一个纯函数；
- reducer做的事情就是将传入的state和action结合起来生成一个新的state；

```js
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FRIEND":
      return { ...state, friends: [...state.friends, action.info] }
    case "INC_AGE":
      return {
        ...state, friends: state.friends.map((item, index) => {
          if (index === action.index) {
            return { ...item, age: item.age + 1 }
          }
          return item;
        })
      }
    case "CHANGE_NAME":
      return {
        ...state, friends: state.friends.map((item, index) => {
          if (index === action.index) {
            return { ...item, name: action.newName }
          }
          return item;
        })
      }
    default:
      return state;
  }
}
```

### 11.4redux的三大原则

1. 单一数据源

整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中：

- Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护；
- 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改；

2. State是只读的

唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State：

- 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；
- 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

3. 使用纯函数来执行修改

通过reducer将 `旧state`和 `actions`联系在一起，并且返回一个新的State：

- 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分；
- 但是所有的reducer都应该是纯函数，不能产生任何的副作用；

### 11.5redux的基本使用

安装redux：

```bash
npm install redux --save
# 或
yarn add redux
```

这里，我通过创建一个简单的js文件，我们先来简单学习一下redux：

**搭建项目结构**

1.创建一个新的项目文件夹：learn-redux

```bash
# 执行初始化操作
yarn init -y

# 安装redux
yarn add redux
```

2.创建src目录，并且创建index.js文件

- 暂时没有任何内容

3.修改package.json可以执行index.js

```bash
"scripts": {
  "start": "node src/index.js"
}
```

**开始在index.js中编写代码**

1.创建一个对象，作为我们要保存的状态：

```js
const redux = require('redux');

const initialState = {
  counter: 0
}
```

2.创建Store来存储这个state

- 创建store时必须创建reducer；
- 我们可以通过 `store.getState` 来获取当前的state

```js
// 创建reducer
const reducer = (state = initialState, action) => {
  return state;
}

// 根据reducer创建store
const store = redux.createStore(reducer);

console.log(store.getState());
```

3.通过action来修改state

- 通过dispatch来派发action；
- 通常action中都会有type属性，也可以携带其他的数据；

```js
store.dispatch({
  type: "INCREMENT"
})

store.dispath({
  type: "DECREMENT"
})

store.dispatch({
  type: "ADD_NUMBER",
  number: 5
})
```

4.修改reducer中的处理代码

- 这里一定要记住，reducer是一个纯函数，不需要直接修改state；
- 后面我会讲到直接修改state带来的问题；

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    case "DECREMENT":
      return {...state, counter: state.counter - 1};
    case "ADD_NUMBER":
      return {...state, counter: state.counter + action.number}
    default: 
      return state;
  }
}
```

5.可以在派发action之前，监听store的变化：

```js
store.subscribe(() => {
  console.log(store.getState());
})
```

完成的案例代码如下：

```js
const redux = require('redux');

const initialState = {
  counter: 0
}

// 创建reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    case "DECREMENT":
      return {...state, counter: state.counter - 1};
    case "ADD_NUMBER":
      return {...state, counter: state.counter + action.number}
    default: 
      return state;
  }
}

// 根据reducer创建store
const store = redux.createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
})

// 修改store中的state
store.dispatch({
  type: "INCREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "DECREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "ADD_NUMBER",
  number: 5
})
// console.log(store.getState());
```

### 11.6redux结构划分

如果我们将所有的逻辑代码写到一起，那么当redux变得复杂时代码就难以维护。

接下来，我会对代码进行拆分，将store、reducer、action、constants拆分成一个个文件。

**注意：node中对ES6模块化的支持**

目前我使用的node版本是v12.16.1，从node v13.2.0开始，node才对ES6模块化提供了支持：

- node v13.2.0之前，需要进行如下操作：

- - 在package.json中添加属性：`"type": "module"`；
  - 在执行命令中添加如下选项：`node --experimental-modules src/index.js`;

- node v13.2.0之后，只需要进行如下操作：

- - 在package.json中添加属性：`"type": "module"`；

注意：导入文件时，需要跟上.js后缀名；

**对redux结构进行划分**

创建store/index.js文件：

```js
import redux from 'redux';
import reducer from './reducer.js';

const store = redux.createStore(reducer);

export default store;
```

创建store/reducer.js文件：

```js
import {
  ADD_NUMBER,
  SUB_NUMBER
} from './constants.js';

const initialState = {
  counter: 0
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_NUMBER:
      return {...state, counter: state.counter + action.num};
    case SUB_NUMBER:
      return {...state, counter: state.counter - action.num};
    default:
      return state;
  } 
}

export default reducer;
```

创建store/actionCreators.js文件：

```js
import {
  ADD_NUMBER,
  SUB_NUMBER
} from './constants.js'

const addAction = (count) => ({
  type: ADD_NUMBER,
  num: count
});

const subAction = (count) => ({
  type: SUB_NUMBER,
  num: count
})

export {
  addAction,
  subAction
}
```

创建store/constants.js文件：

```js
const ADD_NUMBER = "ADD_NUMBER";
const SUB_NUMBER = "SUB_NUMER";

export {
  ADD_NUMBER,
  SUB_NUMBER
} 
```

### 11.7Redux流程图

我们已经知道了redux的基本使用过程，那么我们就更加清晰来认识一下redux在实际开发中的流程：

- 1.全局通常只有一个Store，存储我们的State；
- 2.Component中在某些情况会派发Action（这些Action是我们提前定义好的）；
- 3.Reducer会接收到这些Action，并且在Reducer中会返回一个新的State，作为Store的State；
- 4.State发生更新之后会触发通知，告知订阅者数据发生了改变；
- 5.订阅者拿到最新的数据（在props中），更新到jsx中，界面发生改变；

![图片](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/640-20210418224244024)

### 11.8react中使用redux

## 12.react-router

React Router的版本4开始，路由不再集中在一个包中进行管理了：

- react-router是router的核心部分代码；
- react-router-dom是用于浏览器的；
- react-router-native是用于原生应用的；

目前我们使用最新的React Router版本是v5的版本：

- 实际上v4的版本和v5的版本差异并不大；

安装react-router：

- 安装react-router-dom会自动帮助我们安装react-router的依赖；

```bash
yarn add react-router-dom
```

### 12.1基本使用

react-router最主要的API是给我们提供的一些组件：

- BrowserRouter或HashRouter

- - Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件；
  - BrowserRouter使用history模式；
  - HashRouter使用hash模式；

- Link和NavLink：

- - 通常路径的跳转是使用Link组件，最终会被渲染成a元素；
  - NavLink是在Link基础之上增加了一些样式属性（后续学习）；
  - to属性：Link中最重要的属性，用于设置跳转到的路径；

- Route：

- - Route用于路径的匹配；
  - path属性：用于设置匹配到的路径；
  - component属性：设置匹配到路径后，渲染的组件；
  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；

在App中进行如下演练:

```js
import React, { PureComponent } from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
      	// link都会显示在页面上，并且渲染成a标签
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/profile">我的</Link>
				// Route路径匹配上才会显示
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    )
  }
}
```

### 12.2NavLink的使用

**路径选中时，对应的a元素变为红色**

这个时候，我们要使用NavLink组件来替代Link组件：

- activeStyle：活跃时（匹配时）的样式；
- activeClassName：活跃时添加的class；
- exact：是否精准匹配；

先演示activeStyle：

```js
<NavLink to="/" activeStyle={{color: "red"}}>首页</NavLink>
<NavLink to="/about" activeStyle={{color: "red"}}>关于</NavLink>
<NavLink to="/profile" activeStyle={{color: "red"}}>我的</NavLink>
```

但是，我们会发现在选中about或profile时，第一个也会变成红色：

- 原因是/路径也匹配到了/about或/profile；
- 这个时候，我们可以在第一个NavLink中添加上exact属性,代表精确匹配上才显示activeStyle；

```js
<NavLink exact to="/" activeStyle={{color: "red"}}>首页</NavLink>
```

默认的activeClassName：

- 事实上在默认匹配成功时，NavLink就会添加上一个动态的active class；
- 所以我们也可以直接编写样式

```css
a.active {
  color: red;
}
```

当然，如果你担心这个class在其他地方被使用了，出现样式的层叠，也可以自定义class

```js
<NavLink exact to="/" activeClassName="link-active">首页</NavLink>
<NavLink to="/about" activeClassName="link-active">关于</NavLink>
<NavLink to="/profile" activeClassName="link-active">我的</NavLink>
```

现在激活的类名变为：`link-active`

### 12.3Switch的作用

我们来看下面的路由规则：

- 当我们匹配到某一个路径时，我们会发现有一些问题；
- 比如/about路径匹配到的同时，`/:userid`也被匹配到了，并且最后的一个NoMatch组件总是被匹配到；

```js
<Route exact path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/profile" component={Profile} />
<Route path="/:userid" component={User}/>
<Route component={NoMatch}/>
```

原因是什么呢？默认情况下，react-router中只要是路径被匹配到的Route对应的组件都会被渲染；

但是实际开发中，我们往往希望有一种排他的思想：

- 只要匹配到了第一个，那么后面的就不应该继续匹配了；
- 这个时候我们可以使用Switch来将所有的Route进行包裹即可；

```js
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/profile" component={Profile} />
  <Route path="/:userid" component={User} />
  <Route component={NoMatch} />
</Switch>
```

### 12.4Redirect的使用

Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中：

我们这里使用这个的一个案例：

- 用户跳转到User界面；

- 但是在User界面有一个isLogin用于记录用户是否登录：

- - true：那么显示用户的名称；
  - false：直接重定向到登录界面；

App.js中提前定义好Login页面对应的Route：

```js
<Switch>
  ...其他Route
  <Route path="/login" component={Login} />
  <Route component={NoMatch} />
</Switch>
```

在User.js中写上对应的逻辑代码：

```js
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom';

export default class User extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    }
  }

  render() {
    return this.state.isLogin ? (
      <div>
        <h2>User</h2>
        <h2>用户名: coderwhy</h2>
      </div>
    ): <Redirect to="/login"/>
  }
}
```

### 12.5路由嵌套

在开发中，路由之间是存在嵌套关系的。

这里我们假设about页面中有两个页面内容：

- 商品列表和消息列表；
- 点击不同的链接可以跳转到不同的地方，显示不同的内容；

```js
import React, { PureComponent } from 'react';

import { Route, Switch, Link } from 'react-router-dom';

function AboutProduct(props) {
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
    </ul>
  )
}

function AboutMessage(props) {
  return (
    <ul>
      <li>消息列表1</li>
      <li>消息列表2</li>
      <li>消息列表3</li>
    </ul>
  )
}

export default class About extends PureComponent {
  render() {
    return (
      <div>
        <Link to="/about">商品</Link>
        <Link to="/about/message">消息</Link>

        <Switch>
          <Route exact path="/about" component={AboutProduct} />
          <Route path="/about/message" component={AboutMessage} />
        </Switch>
      </div>
    )
  }
}
```

### 12.6手动跳转

目前我们实现的跳转主要是通过Link或者NavLink进行跳转的，实际上我们也可以通过`JavaScript代码`进行跳转。

但是通过`JavaScript代码`进行跳转有一个前提：必须获取到history对象。

如何可以获取到history的对象呢？两种方式

- 方式一：如果该组件是通过路由直接跳转过来的，那么可以直接获取history、location、match对象；
- 方式二：如果该组件是一个普通渲染的组件，那么不可以直接获取history、location、match对象；

那么如果普通的组件也希望获取对应的对象属性应该怎么做呢？

- 前面我们学习过高阶组件，可以在组件中添加想要的属性；
- react-router也是通过高阶组件为我们的组件添加相关的属性的；

如果我们希望在App组件中获取到history对象，必须满足以下两个条件：

- App组件必须包裹在Router组件之内；
- App组件使用withRouter高阶组件包裹；

index.js代码修改如下：

```js
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

App.js代码修改如下：

```js
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
...省略其他的导入代码

class App extends PureComponent {
  render() {
    console.log(this.props.history);

    return (
      <div>
        ...其他代码
        <button onClick={e => this.pushToProfile()}>我的</button>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/:userid" component={User} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }

  pushToProfile() {
    this.props.history.push("/profile");
  }
}

export default withRouter(App);
```

### 12.7传递参数

传递参数有三种方式：

- 动态路由的方式；
- search传递参数；
- to传入对象；

#### 12.7.1动态路由的方式

动态路由的概念指的是路由中的路径并不会固定：

- 比如`/detail`的path对应一个组件Detail；
- 如果我们将path在Route匹配时写成`/detail/:id`，那么 `/detail/abc`、`/detail/123`都可以匹配到该Route，并且进行显示；
- 这个匹配规则，我们就称之为动态路由；

通常情况下，使用动态路由可以为路由传递参数。

```js
<div>
 ...其他Link
  <NavLink to="/detail/abc123">详情</NavLink>

  <Switch>
    ... 其他Route
    <Route path="/detail/:id" component={Detail}/>
    <Route component={NoMatch} />
  </Switch>
</div>
```

detail.js的代码如下：

- 我们可以直接通过match对象中获取id；
- 这里我们没有使用withRouter，原因是因为Detail本身就是通过路由进行的跳转；

```js
import React, { PureComponent } from 'react'

export default class Detail extends PureComponent {
  render() {
    console.log(this.props.match.params.id);

    return (
      <div>
        <h2>Detail: {this.props.match.params.id}</h2>
      </div>
    )
  }
}
```

#### 12.7.2search传递参数

NavLink写法：

- 我们在跳转的路径中添加了一些query参数；

```js
<NavLink to="/detail2?name=why&age=18">详情2</NavLink>

<Switch>
  <Route path="/detail2" component={Detail2}/>
</Switch>
```

Detail2中如何获取呢？

- Detail2中是需要在location中获取search的；
- 注意：这个search没有被解析，需要我们自己来解析；

```js
import React, { PureComponent } from 'react'

export default class Detail2 extends PureComponent {
  render() {
    console.log(this.props.location.search); // ?name=why&age=18

    return (
      <div>
        <h2>Detail2:</h2>
      </div>
    )
  }
}
```

#### 12.7.3to传入对象

`to`可以直接传入一个对象

```js
<NavLink to={{
    pathname: "/detail2", 
    query: {name: "kobe", age: 30},
    state: {height: 1.98, address: "洛杉矶"},
    search: "?apikey=123"
  }}>
  详情2
</NavLink>
```

获取参数：

```js
import React, { PureComponent } from 'react'

export default class Detail2 extends PureComponent {
  render() {
    console.log(this.props.location);

    return (
      <div>
        <h2>Detail2:</h2>
      </div>
    )
  }
}
```

### 12.8react-router-config

目前我们所有的路由定义都是直接使用Route组件，并且添加属性来完成的。

但是这样的方式会让路由变得非常混乱，我们希望将所有的路由配置放到一个地方进行集中管理：

- 这个时候可以使用react-router-config来完成；

安装react-router-config：

```js
yarn add react-router-config
```

常见`src/router/index.js`文件：

```js
import Home from "../pages/home";
import About, { AboutMessage, AboutProduct } from "../pages/about";
import Profile from "../pages/profile";
import Login from "../pages/login";
import User from "../pages/user";
import Detail from "../pages/detail";
import Detail2 from "../pages/detail2";
import NoMatch from "../pages/nomatch";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [//子组件
      {
        path: "/about",
        exact: true,
        component: AboutProduct
      },
      {
        path: "/about/message",
        component: AboutMessage
      },
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/detail/:id",
    component: Detail
  },
  {
    path: "/detail2",
    component: Detail2
  },
  {
    component: NoMatch
  }
];

export default routes;
```

将之前的Switch配置，换成react-router-config中提供的renderRoutes函数：

```js
//app.js
import React,{ PureComponent } from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './router'

class App extends PureComponent{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      {renderRoutes(routes)}
      </div>
    )
  }
}


{/* <Switch>
     <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Profile} />
      <Route path="/user" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/detail/:id" component={Detail}/>
      <Route path="/detail2" component={Detail2}/>
      <Route component={NoMatch} />
 </Switch> */}
```

如果是子组件中，需要路由跳转，那么需要在子组件中使用renderRoutes函数：

- 在跳转到的路由组件中会多一个 `this.props.route` 属性；
- 该`route`属性代表当前跳转到的路由对象，可以通过该属性获取到 `routes`；

```js
export default class About extends PureComponent {
  render() {
    return (
      <div>
        <Link to="/about">商品</Link>
        <Link to="/about/message">消息</Link>

        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
```

实际上react-router-config中还提供了一个`matchRoutes`辅助函数：

- `matchRoutes(routes, pathname)`传入一个路由对象数组，获取所有匹配的路径；

```js
const routes = matchRoutes(this.props.route.routes, "/about");
console.log(routes);
```

## 13.Hook

*Hook* 是 React 16.8 的新增特性，它可以让我们在不编写class的情况下使用state以及其他的React特性（比如生命周期）。

我们先来思考一下`class组件`相对于`函数式组件`有什么优势？比较常见的是下面的优势：

- class组件可以定义自己的state，用来保存组件自己内部的状态；

- - 函数式组件不可以，因为函数每次调用都会产生新的临时变量；

- class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑；

- - 比如在`componentDidMount`中发送网络请求，并且该生命周期函数只会执行一次；
  - 函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求；

- class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等；

- - 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；

所以，在Hook出现之前，对于上面这些情况我们通常都会编写class组件。

**但是class组件依然存在很多的问题：**

> 复杂组件变得难以理解：

- 我们在最初编写一个class组件时，往往逻辑比较简单，并不会非常复杂。
- 但是随着业务的增多，我们的class组件会变得越来越复杂；
- 比如componentDidMount中，可能就会包含大量的逻辑代码：包括网络请求、一些事件的监听（还需要在componentWillUnmount中移除）；
- 而对于这样的class实际上非常难以拆分：因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度；

> 难以理解的class：

- 很多人发现学习ES6的class是学习React的一个障碍。
- 比如在class中，我们必须搞清楚this的指向到底是谁，所以需要花很多的精力去学习this；
- 虽然我认为前端开发人员必须掌握this，但是依然处理起来非常麻烦；

> 组件复用状态很难 ：

- 在前面为了一些状态的复用我们需要通过高阶组件或render props；
- 像我们之前学习的redux中connect或者react-router中的withRouter，这些高阶组件设计的目的就是为了状态的复用；
- 或者类似于Provider、Consumer来共享一些状态，但是多次使用Consumer时，我们的代码就会存在很多嵌套；
- 这些代码让我们不管是编写和设计上来说，都变得非常困难；

Hook的出现，可以解决上面提到的这些问题；

**简单总结一下hooks：**

- **它可以让我们在不编写class的情况下使用state以及其他的React特性**；
- 但是我们可以由此延伸出非常多的用法，来让我们前面所提到的问题得到解决；

Hook的使用场景：

- Hook的出现基本可以代替我们之前所有使用class组件的地方（除了一些非常不常用的场景）；
- 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它；
- Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用；

### 13.1hooks的基本使用

我们通过一个计数器案例，来对比一下class组件和函数式组件结合hooks的对比：

class组件实现：

```js
import React, { PureComponent } from 'react'

export default class Counter01 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.decrement()}>-1</button>
      </div>
    )
  }

  increment() {
    this.setState({counter: this.state.counter + 1});
  }

  decrement() {
    this.setState({counter: this.state.counter - 1});
  }
}
```

函数式组件实现：

```js
import React, { useState } from 'react';

export default function Counter2() {
  /**
  **Hook:useState
  ** 本身是一个函数，来自react包
  ** 参数和返回值
  ** 1.参数：第一个参数是给创建出来的状态一个默认值
  **/
  const [count, setCount] = useState(0);// count默认值为0

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

你会发现上面的代码差异非常大：函数式组件结合hooks让整个代码变得非常简洁，并且再也不用考虑this相关的问题；

那么我们来研究一下核心的一段代码代表什么意思：

- useState来自react，需要从react中导入，它是一个hook；

- - 元素一：当前状态的值（第一调用为初始化值）；
  - 元素二：设置状态值的函数；
  - 参数：初始化值，如果不设置为undefined；
  - 返回值：数组，包含两个元素；

- 点击button按钮后，会完成两件事情：

- - 调用setCount，设置一个新的值；
  - 组件重新渲染，并且根据新的值返回DOM结构；

- React在重新渲染时，会保留这个state状态，并不会每次都使用初始化值；

```js
const [count, setCount] = useState(0);
// 等价于
const counter = useState(0);
const count = counter[0];
const setCount = counter[1];
```

**相信通过上面的一个简单案例，你已经会喜欢上Hook的使用了。**

Hook 就是 JavaScript 函数，这个函数可以帮助你 `钩入（hook into）` React State以及生命周期等特性；

但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，后面学习）。

Tip：Hook指的类似于useState、useEffect这样的函数，Hooks是对这类函数的统称；

### 13.2State Hook

State Hook的API就是 `useState`，我们在前面已经进行了学习：

- **`useState`**会帮助我们定义一个 `state变量`，`useState` 是一种新方法，它与 class 里面的 `this.state` 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

- **`useState`**接受唯一一个参数，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。

- **`useState`**是一个数组，我们可以通过数组的解构，来完成赋值会非常方便。

- - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

FAQ：为什么叫 `useState` 而不叫 `createState`?

- “Create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。
- 在下一次重新渲染时，`useState` 返回给我们当前的 state。
- 如果每次都创建新的变量，它就不是 “state”了。
- 这也是 Hook 的名字*总是*以 `use` 开头的一个原因。

当然，我们也可以在一个组件中定义多个变量和复杂变量（数组、对象）：

```js
import React, { useState } from 'react';

export default function Home() {
  const [age, setAge] = useState(0);
  const [names, setNames] = useState(["abc", "cba"]);
  const [info, setInfo] = useState({name: "why", age: 18});

  function addFriend() {
    names.push("nba");
    console.log(names);
    setNames(names);
  }

  return (
    <div>
      <h2>当前年龄: {age}</h2>
      <button onClick={e => setAge(age + 1)}>age+1</button>
      <h2>朋友列表</h2>
      <ul>
        {
          names.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
      <button onClick={e => setNames([...names, "nba"])}>添加好友</button>
      {/* 思考: 这样的方式是否可以实现 */}
      <button onClick={addFriend}>添加好友</button>
      <h2>我的信息:</h2>
      <div>我的名字: {info.name}</div>
      <button onClick={e => setInfo({...info, name: "lilei"})}>修改名字</button>
    </div>
  )
}
```

### 13.3Effect Hook

目前我们已经通过hook在函数式组件中定义state，那么类似于生命周期这些呢？

- Effect Hook 可以让你来完成一些类似于class中生命周期的功能；
- 事实上，类似于网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用（Side Effects）；
- 所以对于完成这些功能的Hook被称之为 Effect Hook；

#### 13.3.1Effect基本使用

假如我们现在有一个需求：**页面的title总是显示counter的数字**

使用class组件如何实现呢？

- 我们会发现 `document.title` 的设置必须在两个生命周期中完成；
- 这是因为React的class组件并没有给我们提供一个统一的生命周期函数，可以让无论是否是第一次渲染都会执行的生命周期函数；

```js
import React, { PureComponent } from 'react'

export default class CounterTitle01 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    document.title = `当前计数: ${this.state.counter}`
  }

  componentDidUpdate() {
    document.title = `当前计数: ${this.state.counter}`
  }

  render() {
    console.log("111");
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.decrement()}>-1</button>
      </div>
    )
  }

  increment() {
    this.setState({counter: this.state.counter + 1});
  }

  decrement() {
    this.setState({counter: this.state.counter - 1});
  }
}
```

这个时候，我们可以使用useEffect的Hook来完成：

```js
import React, { useState, useEffect } from 'react';

export default function CounterTitle02() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `当前计数: ${count}`;
  })

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

**useEffect的解析：**

- 通过useEffect的Hook，可以告诉React需要在渲染后执行某些操作；
- useEffect要求我们传入一个`回调函数`，在React执行完更新DOM操作之后，就`会回调这个函数`；
- 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个 `回调函数`；

#### 13.3.2需要清除Effect

在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnmount中进行清除：

- 比如我们之前的事件总线或Redux中手动调用subscribe；
- 都需要在componentWillUnmount有对应的取消订阅；
- Effect Hook通过什么方式来模拟componentWillUnmount呢？

useEffect传入的`回调函数A本身`可以有一个返回值，这个返回值是`另外一个回调函数B`:

```js
type EffectCallback = () => (void | (() => void | undefined));
```

我们可以这样来编写Effect Hook：

```js
import React, { useState, useEffect } from 'react';

export default function EffectHookClear() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `当前计数: ${count}`;
    console.log("每次DOM更新时会回调");

    return () => {
      console.log("DOM被移除时会回调");
    }
  })

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

**为什么要在 effect 中返回一个函数？**

- 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数；
- 如此可以将添加和移除订阅的逻辑放在一起；
- 它们都属于 effect 的一部分；

**React 何时清除 effect？**

- React 会在组件更新和卸载的时候执行清除操作；
- 正如之前学到的，effect 在每次渲染的时候都会执行；

#### 13.3.3使用多个Effect

使用Hook的其中一个目的就是解决class中生命周期经常将很多的逻辑放在一起的问题：

- 比如网络请求、事件监听、手动修改DOM，这些往往都会放在componentDidMount中；

使用Effect Hook，我们可以将它们分离到不同的useEffect中：

```js
import React, { useEffect } from 'react';

export default function MultiUseEffect() {
  useEffect(() => {
    console.log("网络请求");
  });

  useEffect(() => {
    console.log("修改DOM");
  })

  useEffect(() => {
    console.log("事件监听");

    return () => {
      console.log("取消监听");
    }
  })

  return (
    <div>
      <h2>MultiUseEffect</h2>
    </div>
  )
}
```

**Hook 允许我们按照代码的用途分离它们，** 而不是像生命周期函数那样：

- React 将按照 effect 声明的顺序依次调用组件中的*每一个* effect；

#### 13.3.4 Effect性能优化

默认情况下，useEffect的回调函数会在每次渲染时都重新执行，但是这会导致两个问题：

- 某些代码我们只是希望执行一次即可，类似于componentDidMount和componentWillUnmount中完成的事情；（比如网络请求、订阅和取消订阅）；
- 另外，多次执行也会导致一定的性能问题；

我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢？

- useEffect实际上有两个参数：
- 参数一：执行的回调函数；
- 参数二：该useEffect在哪些state发生变化时，才重新执行；（受谁的影响）

我们来看下面的一个案例：

- 在这个案例中，我们修改show的值，是不会让useEffect重新被执行的；

```js
import React, { useState, useEffect } from 'react';

export default function EffectPerformance() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("修改DOM");
  }, [count])

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  )
}
```

但是，如果一个函数我们不希望依赖任何的内容时，也可以传入一个空的数组 []：

- 那么这里的两个回调函数分别对应的就是componentDidMount和componentWillUnmount生命周期函数了；

```js
useEffect(() => {
  console.log("监听事件");

  return () => {
    console.log("取消监听");
  }
}, [])
```

### 13.4Context Hook

在之前的开发中，我们要在组件中使用共享的Context有两种方式：

- 类组件可以通过 `类名.contextType = MyContext`方式，在类中获取context；
- 多个Context或者在函数式组件中通过 `MyContext.Consumer` 方式共享context；

但是多个Context共享时的方式会存在大量的嵌套：

- Context Hook允许我们通过Hook来直接获取某个Context的值；

```js
const value = useContext(MyContext);
```

在App.js中使用Context

```js
import React, { createContext } from 'react';

import ContextHook from './04_useContext使用/01_ContextHook';

export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  return (
    <div>
      <UserContext.Provider value={{name: "why", age: 18}}>
        <ThemeContext.Provider value={{color: "red", fontSize: "20px"}}>
          <ContextHook/>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}
```

在对应的函数式组件中使用Context Hook：

```js
import React, { useContext } from 'react'
import { UserContext, ThemeContext } from '../App'

export default function ContextHook() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  console.log(user);
  console.log(theme);

  return (
    <div>
      ContextHook
    </div>
  )
}
```

注意事项：当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重新渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。

### 13.5useReducer

很多人看到useReducer的第一反应应该是redux的某个替代品，其实并不是。

useReducer仅仅是useState的一种替代方案：

- 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分；
- 或者这次修改的state需要依赖之前的state时，也可以使用；

单独创建一个reducer/counter.js文件：

```js
export function counterReducer(state, action) {
  switch(action.type) {
    case "increment":
      return {...state, counter: state.counter + 1}
    case "decrement":
      return {...state, counter: state.counter - 1}
    default:
      return state;
  }
}
```

home.js

```js
import React, { useReducer } from 'react'
import { counterReducer } from '../reducer/counter'

export default function Home() {
  const [state, dispatch] = useReducer(counterReducer, {counter: 100});

  return (
    <div>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
    </div>
  )
}
```

我们来看一下，如果我们创建另外一个profile.js也使用这个reducer函数，是否会进行数据的共享：

```js
import React, { useReducer } from 'react'
import { counterReducer } from '../reducer/counter'

export default function Profile() {
  const [state, dispatch] = useReducer(counterReducer, {counter: 0});

  return (
    <div>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
    </div>
  )
}
```

数据是不会共享的，它们只是使用了相同的counterReducer的函数而已。

**所以，useReducer只是useState的一种替代品，并不能替代Redux。**

### 13.6useCallback

useCallback实际的目的是为了进行性能的优化。

如何进行性能的优化呢？

- useCallback会返回一个函数的 memoized（记忆的） 值；
- 在依赖不变的情况下，多次定义的时候，返回的值是相同的；

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

我们来看下面一段很有趣的代码：

- increment1在每次函数组件重新渲染时，会返回相同的值；

- increment2每次定义的都是不同的值；

- 问题：是否increment1会比increment2更加节省性能呢？

- - 事实上，经过一些测试，并没有更加节省内存，因为useCallback中还是会传入一个函数作为参数；
  - 所以并不存在increment2每次创建新的函数，而increment1不需要创建新的函数这种性能优化；

- 那么，为什么说useCallback是为了进行性能优化呢？

```js
import React, { memo, useState, useCallback } from 'react'

export default function CallbackHookDemo() {
  const [count, setCount] = useState(0);

  const increment1 = useCallback(function increment() {
    setCount(count + 1);
  }, []);

  const increment2 = function() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button>
    </div>
  )
}
```

我们来对上面的代码进行改进：

- 在下面的代码中，我们将回调函数传递给了子组件，在子组件中会进行调用；
- 在发生点击时，我们会发现接受increment1的子组件不会重新渲染，但是接受increment2的子组件会重新渲染；
- 所以useCallback最主要用于性能渲染的地方应该是和memo结合起来，决定子组件是否需要重新渲染；

```js
import React, { memo, useState, useCallback } from 'react';

const CounterIncrement = memo((props) => {
  console.log("CounterIncrment被渲染:", props.name);
  return <button onClick={props.increment}>+1</button>
})

export default function CallbackHookDemo() {
  const [count, setCount] = useState(0);

  const increment1 = useCallback(function increment() {
    setCount(count + 1);
  }, []);

  const increment2 = function() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>当前计数: {count}</h2>
      {/* <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button> */}
      <CounterIncrement increment={increment1} name="increment1"/>
      <CounterIncrement increment={increment2} name="increment2"/>
    </div>
  )
}
```

### 13.7useMemo

useMemo实际的目的也是为了进行性能的优化。

如何进行性能的优化呢？

- useMemo返回的也是一个 memoized（记忆的） 值；
- 在依赖不变的情况下，多次定义的时候，返回的值是相同的；

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

我们来看一个案例：

- 无论我们点击了是 `+1`还是 `切换` 案例都会重新计算一次；
- 事实上，我们只是希望在count发生变化时重新计算；

```js
import React, { useState, useMemo } from 'react';

// 计算和的函数
function calcNum(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += i;
  }
  console.log("计算一遍");
  return total
}

export default function MemoHookDemo() {
  const [count, setCount] = useState(10);
  const [isLogin, setIsLogin] = useState(true);

  const total = calcNum(count);

  return (
    <div>
      <h2>数字和: {total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      {isLogin && <h2>Coderwhy</h2>}
      <button onClick={e => setIsLogin(!isLogin)}>切换</button>
    </div>
  )
}
```

这个时候，我们可以使用useMemo来进行性能的优化：

```js
import React, { useState, useMemo } from 'react';

function calcNum(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += i;
  }
  console.log("计算一遍");
  return total
}

export default function MemoHookDemo() {
  const [count, setCount] = useState(10);
  const [isLogin, setIsLogin] = useState(true);

  // 点击切换时不会执行，只有count变化时才执行
  const total = useMemo(() => {
    return calcNum(count);
  }, [count]);

  return (
    <div>
      <h2>数字和: {total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      {isLogin && <h2>Coderwhy</h2>}
      <button onClick={e => setIsLogin(!isLogin)}>切换</button>
    </div>
  )
}
```

当然，useMemo也可以用于子组件的性能优化：

- ShowCounter子组件依赖的是一个基本数据类型，所以在比较的时候只要值不变，那么就不会重新渲染；
- ShowInfo接收的是一个对象，每次都会定义一个新的对象，所以我们需要通过useMemo来对其进行优化；

```js
import React, { useState, useMemo, memo } from 'react';

function calcNum(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += i;
  }
  console.log("计算一遍");
  return total
}

const ShowCounter = memo((props) => {
  console.log("重新渲染");
  return <h1>Counter: {props.total}</h1>
})

const ShowInfo = memo((props) => {
  console.log("ShowInfo重新渲染");
  return <h1>信息: {props.info.name}</h1>
})

export default function MemoHookDemo() {
  const [count, setCount] = useState(10);
  const [isLogin, setIsLogin] = useState(true);

  const total = useMemo(() => {
    return calcNum(count);
  }, [count]);

  const info = useMemo(() => {
    return {name: "why"}
  }, [])

  return (
    <div>
      <h2>数字和: {total}</h2>
      <ShowCounter total={total} />
      <ShowInfo info={info}/>
      <button onClick={e => setCount(count + 1)}>+1</button>
      {isLogin && <h2>Coderwhy</h2>}
      <button onClick={e => setIsLogin(!isLogin)}>切换</button>
    </div>
  )
}
```

### 13.8useRef

useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变。

最常用的ref是两种用法：

- 用法一：引入DOM（或者组件，但是需要是class组件）元素；
- 用法二：保存一个数据，这个对象在整个生命周期中可以保存不变；

用法一：引用DOM

```js
import React, { useRef } from 'react';

export default function RefHookDemo() {
  const inputRef = useRef();
  const titleRef = useRef();

  const handleOperating = () => {
    titleRef.current.innerHTML = "我是coderwhy";
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef}/>
      <h2 ref={titleRef}>默认内容</h2>

      <button onClick={e => handleOperating()}>操作</button>
    </div>
  )
}
```

用法二：使用ref保存上一次的某一个值

- useRef可以想象成在ref对象中保存了一个`.current`的可变盒子；
- useRef在组件重新渲染时，返回的依然是之前的ref对象，但是current是可以修改的；

```js
import React, { useState, useEffect, useRef } from 'react';

let preValue = 0;

export default function RefHookDemo02() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  return (
    <div>
      <h2>前一次的值: {countRef.current}</h2>
      <h2>这一次的值: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

### 13.9useImperativeHandle

`useImperativeHandle`并不是特别好理解，我们一点点来学习。

我们先来回顾一下`ref`和`forwardRef`结合使用：

- 通过`forwardRef`可以将`ref`转发到子组件；
- 子组件拿到父组件中创建的ref，绑定到自己的某一个元素中；

```js
import React, { useRef, forwardRef } from 'react';

const HYInput = forwardRef(function (props, ref) {
  return <input type="text" ref={ref}/>
})

export default function ForwardDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}
```

上面的做法本身没有什么问题，但是我们是将子组件的DOM直接暴露给了父组件：

- 直接暴露给父组件带来的问题是某些情况的不可控；
- 父组件可以拿到DOM后进行任意的操作；
- 但是，事实上在上面的案例中，我们只是希望父组件可以操作的focus，其他并不希望它随意操作；

通过useImperativeHandle可以只暴露固定的操作：

- 通过useImperativeHandle的Hook，将`传入的ref`和`useImperativeHandle第二个参数返回的对象`绑定到了一起；
- 所以在父组件中，使用 `inputRef.current`时，实际上使用的是`返回的对象`；
- 比如我调用了 `focus函数`，甚至可以调用 `printHello函数`；

```js
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const HYInput = forwardRef(function (props, ref) {
  // 创建组件内部的ref
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    printHello: () => {
      console.log("Hello World")
    }
  }))

  // 这里绑定的是组件内部的inputRef
  return <input type="text" ref={inputRef}/>
})

export default function ImperativeHandleHookForwardDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
      <button onClick={e => inputRef.current.printHello()}>Hello World</button>
    </div>
  )
}
```

### 13.10useLayoutEffect

useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已：

- useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；
- useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新；

如果我们希望在某些操作发生之后再更新DOM，那么应该将这个操作放到useLayoutEffect。

我们来看下面的一段代码：

- 这段代码在开发中会发生闪烁的现象；
- 因为我们先将count设置为了0，那么DOM会被更新，并且会执行一次useEffect中的回调函数；
- 在useEffect中我们发现count为0，又执行一次setCount操作，那么DOM会再次被更新，并且useEffect又会被执行一次；

```js
import React, { useEffect, useState, useLayoutEffect } from 'react';

export default function EffectHookDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setCount(Math.random()*200)
    }
  }, [count]);

  return (
    <div>
      <h2>当前数字: {count}</h2>
      <button onClick={e => setCount(0)}>随机数</button>
    </div>
  )
}
```

事实上，我们上面的操作的目的是在count被设置为0时，随机另外一个数字：

- 如果我们使用useLayoutEffect，那么会等到useLayoutEffect代码执行完毕后，再进行DOM的更新；

```js
import React, { useEffect, useState, useLayoutEffect } from 'react';

export default function EffectHookDemo() {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    if (count === 0) {
      setCount(Math.random()*200)
    }
  }, [count]);

  return (
    <div>
      <h2>当前数字: {count}</h2>
      <button onClick={e => setCount(0)}>随机数</button>
    </div>
  )
}
```

![图片](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/640-20210617000330899)

### 13.11自定义Hook

**自定义Hook本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算React的特性。**

需求：所有的组件在创建和销毁时都进行打印

- 组件被创建：打印 `组件被创建了`；
- 组件被销毁：打印 `组件被销毁了`；

```js
export default function CustomHookDemo() {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])

  return (
    <div>
      <h2>CustomHookDemo</h2>
    </div>
  )
}
```

但是这样来做意味着所有的组件都需要有对应的逻辑：

```js
function Home(props) {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
  return <h2>Home</h2>
}

function Profile(props) {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
  return <h2>Profile</h2>
}
```

如何可以对它们的逻辑进行抽取呢？

- 我们可能希望抽取到一个函数中；

```js
function loggingLife() {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
}
```

但是，抽取到这里调用之后，代码是报错的：

- 原因是普通的函数中不能使用hook

![图片](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/640-20210617000421327)

那么，我们应该如何操作呢？

- 非常简单，函数以特殊的方式命名，以 `use` 开头即可；

```js
function useLoggingLife() {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
}
```

当然，自定义Hook可以有参数，也可以有返回值：

```js
function useLoggingLife(name) {
  useEffect(() => {
    console.log(`${name}组件被创建了`);
    return () => {
      console.log(`${name}组件被销毁了`);
    }
  }, [])
}
```

#### 13.11.1自定义Hook练习

我们通过一些案例来练习一下自定义Hook。

**使用User、Token的Context**

比如多个组件都需要使用User和Token的Context：

- 这段代码我们在每次使用user和token时都需要导入对应的Context，并且需要使用两次useContext；

```js
import React, { useContext } from 'react'
import { UserContext, TokenContext } from '../App'

export default function CustomHookContextDemo() {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  console.log(user, token);

  return (
    <div>
      <h2>CustomHookContextDemo</h2>
    </div>
  )
}
```

我们可以抽取到一个自定义Hook中：

```js
function useUserToken() {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  return [user, token];
}
```

**获取窗口滚动的位置**

在开发中，某些场景我们可能总是希望获取创建滚动的位置：

```js
import React, { useEffect, useState } from 'react'

export default function CustomScrollPositionHook() {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div style={{padding: "1000px 0"}}>
      <h2 style={{position: "fixed", top: 0, left: 0}}>CustomScrollPositionHook: {scrollPosition}</h2>
    </div>
  )
}
```

但是如果每一个组件都有对应这样的一个逻辑，那么就会存在很多的冗余代码：

```js
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return scrollPosition;
}
```

**数据存储的localStorage**

在开发中，我们会有一些数据希望通过localStorage进行存储（当然，你可以根据自己的情况选择sessionStorage）

```js
import React, { useState, useEffect } from 'react'

export default function CustomDataStoreHook() {
  const [name, setName] = useState(() => {
    return JSON.parse(window.localStorage.getItem("name"))
  });

  useEffect(() => {
    window.localStorage.setItem("name", JSON.stringify(name));
  }, [name])

  return (
    <div>
      <h2>CustomDataStoreHook: {name}</h2>
      <button onClick={e => setName("coderwhy")}>设置name</button>
    </div>
  )
}
```

如果每一个里面都有这样的逻辑，那么代码就会变得非常冗余：

```js
function useLocalStorange(key) {
  const [data, setData] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key))
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
```

