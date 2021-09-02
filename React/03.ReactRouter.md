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

