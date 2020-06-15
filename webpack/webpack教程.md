# 一.webpack基本使用

在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)。

## 1.webpack安装

如果使用 webpack 4+ 版本，还需要安装 `webpack-cli`。

### 1.1全局安装webpack

```bash
# 初始化项目（初始化 npm）
$ npm init -y
# 全局安装webpack
$ npm install webpack webpack-cli -g
# 查看安装webpack的版本号
$ webpack -v
```

注：由于每个项目所依赖的webpack版本不同，配置也不同。因此不能全局安装webpack。否则会造成打包错误。

### 1.2卸载webpack

卸载全局安装的webpack。

```bash
npm uninstall webpack webpack-cli -g
```

### 1.3本地安装

在项目中安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。

```bash
# 进入项目根目录
$ cd 项目名
# 局部安装
$ npm install webpack webpack-cli -D
# 或者
$ npm install webpack webpack-cli --save-dev
# 查看版本号
$ npx webpack -v
```

注意：此时使用`webpack -v`查看版本号时，无法查看。因为执行webpack命令时，`nodejs`会尝试去全局环境去找webpack，而我们安装webpack到项目中的，因此找不到。

通常，webpack 通过运行一个或多个 [npm scripts](https://docs.npmjs.com/misc/scripts)，会在本地 `node_modules` 目录中查找安装的 webpack：

```json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```



> *在安装一个要打包到生产环境的安装包时，你应该使用* `npm install --save`*，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用* `npm install --save-dev`

### 1.4修改package.json文件

我们还需要调整 `package.json` 文件，以便确保我们安装包是`私有的(private)`，并且移除 `main` 入口。这可以防止意外发布你的代码。

```json
{
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,//增加为私有的
-   //"main": "index.js",//这一行删除
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9"
    },
    "dependencies": {}
  }
```



## 2.webpack配置文件

使用 `npx webpack index.js`时将使用webpack的默认配置进行打包index.js文件

### 2.1基本配置

#### 2.1.1配置打包文件

在项目根目录下新建`webpack.config.js`用于编写webpack的配置。

```js
//webpack.config.js
const path =require('path')
module.exports={
  //打包模式
  mode:'development',
  //打包入口文件
  entry:'./index.js',
  //打包出口文件
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
```

注意：有这个配置文件时只需执行`npx webpack`即可进行打包。因为此时会默认去找`webpack.config.js`文件。

#### 2.1.2配置打包命令

在`package.json`文件的`scripts`脚本下添加打包命令。

```js
//package.json
{
  "scripts":{
    "bundle":"webpack"
  }
}
```

此时只需执行`npm run bundle`命令即可打包成功。

## 2.2webpack-cli作用

如果没有安装`webpack-cli`这个文件，就无法在命令行下执行全局安装的`webpack`命令和局部安装的`npx webpack`命令

作用：使我们能在命令行使用`webpack`命令。

# 二.webpack核心概念

## 1.entry

指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的==开始==。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

### 1.1语法

#### 1.1.1单个入口

```js
//webpack.config.js
module.exports={
   entry: {
    main: './main.js'
  }
  //简写形式
  entry: './main.js'
}
```

#### 1.1.2多个入口（对象语法）

```js
//webpack.config.js
module.exports={
	entry: {
    	index: './src/index.js',
    	main: './src/main.js'
  	}
}
```

### 1.2应用场景：

#### 1.2.1打包输出为固定一个文件名

```js
//webpack.config.js
//打包入口配置
entry:'./src/index.js',
//打包出口配置
output:{
  filename:'bundle.js',
  path:path.resolve(__dirname,'dist')
}
```

此时打包输出的js文件只有一个`bundle.js`。

#### 1.2.2打包输出为多个文件

```js
//webpack.config.js
//打包入口配置
entry:{
  //打包到main.js
  main:'./src/index.js',
  //打包到sub.js
  sub:'./src/index.js'
},
//打包出口配置
output:{
  // [name]在这个地方为占位符，打包时会替换为入口配置的键值
  filename:'[name].js',
  path:path.resolve(__dirname,'dist')
}
```

此时打包输出的js文件为两个，分别是`main.js`,`sub.js`。这两个js文件名为打包入口`entry`中配置的键值。

#### 1.2.3打包输出时自动在html文件的script中添加`cdn`地址

适用场景：只将打包后的html文件拿给后端部署。将其他静态资源放在cdn服务器上。

```js
//webpack.config.js
//打包入口配置
entry:{
  main:'./src/index.js',
  sub:'./src/index.js'
},
//打包出口配置
output:{
  //为html文件引入js文件自动添加cdn地址
  publicPath:'http://cdn.com.cn'
  // [name]在这个地方为占位符，打包时会替换为入口配置的键值
  filename:'[name].js',
  path:path.resolve(__dirname,'dist')
}
```

此时打包完成后，html文件中引入的js文件都自动添加了配置的cdn地址。

## 2.output

**output** 属性告诉 webpack 在哪里输出它所创建的 ==bundles==，以及如何命名这些文件，默认值为 `./dist`。

> 注意，即使可以存在多个`入口`起点，但只指定一个`输出`配置。

### 2.1基本用法

在 webpack 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

- `filename` 用于输出文件的文件名。
- 目标输出目录 `path` 的绝对路径。

对于单个[`入口`](https://www.webpackjs.com/configuration/entry-context#entry)起点，filename 会是一个静态名称。

```js
//webpack.config.js
const path=require('path')
module.exports={
  //此配置将一个单独的 bundle.js 文件输出到 当前目录下的dist 目录中。
   output: {
    filename: 'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
```

### 2.2多个入口

如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用[占位符(substitutions)](https://www.webpackjs.com/configuration/output#output-filename)来确保每个文件具有唯一的名称。

```js
module.exports={
 	 entry: {
   		 app: './src/app.js',
   	 	search: './src/search.js'
 	 },
  	output: {
      //使用入口名称
   		 filename: '[name].js',
     	 path: __dirname + '/dist'
  	}
}

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

2.3`filename`配置

使用入口名称：

```js
filename: "[name].bundle.js"
```

使用内部 chunk id:

```js
filename: "[id].bundle.js"
```

使用每次构建过程中，唯一的 hash 生成:

```js
filename: "[name].[hash].bundle.js"
```

使用基于每个 chunk 内容的 hash：

```js
filename: "[chunkhash].bundle.js"
```



## 3.loader

webpack默认只能打包以`.js`结尾的文件，如果需要打包图片，css等文件时，就需要使用loader告诉webpack怎么去打包。

注意:webpack 不会更改代码中除 `import` 和 `export` 语句以外的部分。如果你在使用其它 [ES2015 特性](http://es6-features.org/)，请确保你在 webpack 的 [loader 系统](https://www.webpackjs.com/concepts/loaders/)中使用了一个像是 [Babel](https://babeljs.io/) 或 [Bublé](https://buble.surge.sh/guide/) 的[转译器](https://www.webpackjs.com/loaders/#transpiling)。

作用：

- 安装loader

使用loader时需要先用`npm install file-loader -D`安装相应的loader才能进行配置使用。

- 配置loader

```js
//webpack.config.js

const path =require('path')

module.exports={
  //打包模式
  mode:'development',
  //打包入口文件
  entry:'./index.js',
  //loader配置规则
  module:{
    rules:[
      {
       test:/\.jpg$/,
       use:{
         loader:'file-loader',
         options:{
           //placeholder 占位符
           //配置打包后文件的名字
           name:'[name]_[hash].[ext]'
         }
       }
      }
    ]
  },
  //打包出口文件
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
```

- 执行顺序

从右到左，从下到上执行。

### 3.1打包图片类文件

#### 3.1.1file-loader

用于打包文件

- 基础配置

```js
 module:{
    rules:[
      {
       test:/\.jpg$/,
       use:{
         loader:'file-loader'
       }
      }
    ]
  },
```

- 配置打包后文件如何命名

```js
 module:{
    rules:[
      {
       test:/\(.jpg|png|gif)$/,
       use:{
         loader:'file-loader',
         options:{
           //placeholder 占位符
           //配置打包后文件的名字如何命名，[name]表示原始名字，[hash]表示名字后面加上hash值，[ext]表示原始文件的后缀名
           name:'[name]_[hash].[ext]'
         }
       }
      }
    ]
  },
```

- 配置打包后文件的存放位置

```js
{
         loader:'file-loader',
         options:{
           //placeholder 占位符
           //配置打包后文件的名字
           name:'[name]_[hash].[ext]',
           //配置打包后存放位置
           //表示打包后的文件存放在images/文件夹下
           outputPath:'images/'
         }
       }
```

- 拓展

```js
//使用es6引入图片
import avatar from './avatar.jpg'
```



#### 3.1.2url-loader

与`file-loader`类似，只是多了`limit`配置项。但是打包图片时会将图片转换成base64的。并且图片文件会打包到输出的js文件中

```js
{
         loader:'url-loader',
         options:{
           //placeholder 占位符
           //配置打包后文件的名字
           name:'[name]_[hash].[ext]',
           //配置打包后存放位置
           //表示打包后的文件存放在images/文件夹下
           outputPath:'images/',
           //当图片大于10kb时就存放在images/文件夹下，小于时就存放在打包后的js文件中
           limit:10240
         }
       }
```

### 3.2打包样式文件

#### 3.2.1基本配置

安装：

```bash
npm install style-loader css-loader -D
```

使用：

```js
 {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
```

原理：`css-loader`负责将css文件之间的依赖关系合并。`style-loader`将合并后的css文件挂载到html文件的head中(以内部样式表形式)

#### 3.2.2.打包scss文件

安装：

```bash
npm install sass-loader node-sass  --save-dev
```

配置：

```js
{
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
      }, {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
      }, {
          loader: "sass-loader" // 将 Sass 编译成 CSS
}
```

#### 3.2.3给样式自动添加厂商前缀

使用`postcss-loader`实现自动给样式添加厂商前缀。

- 安装：

```bash
npm i -D postcss-loader
```

- 配置：

根目录下新建`postcss.config.js`文件。

安装`npm i -D autoprefixer`插件。

```js
//postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

- 使用

同时需要在需要添加前缀的类型文件中使用postcss-loader

```js
{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader'
        ]
}
```

#### 3.2.4css-loader详解

- js文件中引入scss文件

当在js文件中使用`import 'index.scss'`引入样式文件时，依次执行postcss-loader，sass-loader，css-loader，style-loader。

- 在scss文件中引入scss文件

当在scss文件中使用`@import './index.scss'`引入其他scss文件时，打包时有可能就不会使用postcss-loader，sass-loader。如果也让打包时使用这两个loader，则需要在`css-loader`中进行配置。

```js
 {
        test: /\.scss$/,
        use: [ 
          'style-loader', 
          {
          	loader:'css-loader',
          	options:{
              //使用import语法引入的scss文件也需要走下面两个loader
            importLoaders:2
          	}
       	 	}
          'sass-loader',
        	'postcss-loader'
        ]
}
```

- cssloader模块化打包

当在入口js文件中使用`import './index.css'`这种全局方式引入css文件时。此样式会作用于所有文件。这会导致一些未知的错误。

配置：

```js
 {
        test: /\.scss$/,
        use: [ 
          'style-loader', 
          {
          	loader:'css-loader',
          	options:{
              //使用import语法引入的scss文件也需要走下面两个loader
            	importLoaders:2,
              //开启模块化打包
            	modules:true
          	}
       	 	}
          'sass-loader',
        	'postcss-loader'
        ]
}
```

样式引入方式：

```js
//index.js
import style from './index.scss'

//使用
style.类名 添加到需要使用的上面
```

#### 3.2.5打包字体文件

使用`file-loader`打包字体文件。

```js
{
       test:/\.(eot|ttf|svg)$/,
       use:{
         loader:'file-loader'
       }
}
```

## 4.plugins

可以在webpack运行到某个时刻的时候，帮你做一些事情。

### 4.1HtmlWebpackPlugin

HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中。

安装：

```bash
npm install --save-dev html-webpack-plugin
```

配置：

```js
//webpack.config.js
//1. 导入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  //2. 实列化插件
  plugins: [
    //打包之后运行
    //这个插件默认生成的html文件不含任何html标签（也就是不含vue绑定的id标签），因此需要添加相应的配置项
    new HtmlWebpackPlugin({
      //指定打包的模板文件路径
      template:'src/index.html'
    })
  ]
};
```

如果你有多个 webpack 入口点， 他们都会在生成的HTML文件中的 `script` 标签内。

### 4.2clean-webpack-plugin

执行打包前先删除上一次打包生成的文件，然后再执行本次打包操作。这样会避免打包后的文件每次都是最新的，并且不会有其他多余的文件（比如修改打包输出文件名时，打包后的文件就会存在上次打包后的文件和修改后打包出的文件，导致分不清哪一次是最新的）。

安装:

```bash
npm install clean-webpack-plugin -D
```

配置：

```js
//webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
//1. 导入插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  //实列化插件
  plugins: [
    //打包之后运行
    //这个插件默认生成的html文件不含任何html标签，因此需要添加相应的配置项
    new HtmlWebpackPlugin({
      //指定打包的模板文件路径
      template:'src/index.html'
    }),
    //2. 使用插件
    //打包之前先被运行
    //打包之前先删除dist目录下的所有文件
    new CleanWebpackPlugin(['dist'])
  ]
};
```



## 5.sourceMap

作用：当我们打包的代码出错的时候，如果不用`sourceMap`，我们只能知道打包出来的代码第一行出错了，但是我们并不知道对应的源代码哪里出错了，所以我们需要使用`sourceMap`帮我们做一个源代码和目标生成之间的一个映射。就能知道源代码的第几行出错了。

### 5.1基础配置

```js
module.exports={
  //打包模式
  mode:'development',
  //1. 配置sourcemap
  devtool:'source-map'
}
```

此时打包后生成一个`main.js`文件，并且还会有一个`main.js.map`文件,这个文件是源代码与打包的main.js之间的映射关系。

![image-20200518231523736](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20200518231523736.png)

此时就会显示源代码的第一行出错了，而不是打包后的文件第几行出错。

### 5.2inline-source-map

```js
module.exports={
  //打包模式
  mode:'development',
  //配置sourcemap
  devtool:'inline-source-map'
}
```

此时打包后的文件只有一个`main.js`,而之前的`main.js.map`映射文件没有了。这个文件此时被打包到了`main.js`的最后一行。

### 5.3cheap-inline-source-map

当代码量很大时，如果我们的代码出了错误，而我们devtool前面又没有加cheap，那么这个sourcemap会告诉我们代码第几行第几个字符出错了，会精确到第几行的第几列出了问题。这样的提示比较耗费性能。

我们代码出错了，我们只希望sourcemap告诉我们第几行出错了就可以了。

添加cheap意思就是只需告诉我们行，不需要告诉我们第几列。

```js
module.exports={
  //打包模式
  mode:'development',
  //配置sourcemap
  devtool:'cheap-inline-source-map'
}
```

### 5.4cheap-module-source-map

这个module意思是不仅管我们业务代码的出错，还会管其他loader或者第三方插件的错误

### 5.5eval

打包速度最快的方式。并且一样有提示。但是针对复杂代码不建议使用这种，因为提示不全面。

### 5.6最佳实践

开发环境：

```js
module.exports={
  //打包模式
  mode:'development',
  //配置sourcemap
  //这种在开发模式下提示的错误比较全面，同时打包速度也是比较快的
  devtool:'cheap-module-eval-source-map'
}
```

生产环境:

```js
module.exports={
  //打包模式
  mode:'production',
  //配置sourcemap
  //出错时，代码提示会更好些
  devtool:'cheap-module-source-map'
}
```

## 6.WebpackDevServer

修改源代码并保存后自动执行打包命令进行打包输出文件。

### 6.1使用观察模式

可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

在`package.json`中的scripts下进行配置。

```js
//package.json
{
  "script":{
    "watch":"webpack --watch"
  }
}
```

加了`--watch`参数时，就会监听打包的源代码，只要源代码发生变化，就会自动执行打包。

现在，你可以在命令行中运行 `npm run watch`，就会看到 webpack 编译代码，然而却不会退出命令行。这是因为 script 脚本还在观察文件。

> 缺点：为了看到修改后的实际效果，你需要刷新浏览器

### 6.2使用webpackdevserver

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

- 安装

```bash
npm install webpack-dev-server -D
```

- 配置

```js
module.exports={
  //配置服务器
  devServer:{
    //在哪个目录开启服务器
    //将 dist 目录下的文件，作为可访问文件。
    contentBase:'./dist',
    //打包后自动打开浏览器
    open:true,
    //指定端口号
    port:8080,
    //开启模块热替换
    hot:true,
    hotonly:true
  }
}
```

- 使用

在`package.json`中配置了webpack-dev-server后只需在控制台执行`npm run start`即可开启服务。

```js
//package.json
{
  "script":{
    "watch":"webpack --watch",
    "start":"webpack-dev-server --open"
  }
}

```

### 6.3使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

- 安装

安装 `express` 和 `webpack-dev-middleware`：

```bash
npm install --save-dev express webpack-dev-middleware
```

- 配置

1.配置**webpack.config.js**

只需在`output`中添加`publicpath:'/`配置

```js
//webpack.config.js
output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    }
```

`publicPath` 也会在服务器脚本用到，以确保文件资源能够在 `http://localhost:3000` 下正确访问

2.根目录下新建`server.js`

用于编写服务器代码

```js
//server.js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
//引入当前目录下的配置文件
const config = require('./webpack.config.js');
//编译器
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('监听3000端口');
});
```

3.添加脚本

```bash
# package.json
 "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
      //服务启动脚本
      "server": "node server.js",
      "build": "webpack"
    },
```

终端执行 `npm run server`

打开浏览器，跳转到 `http://localhost:3000`，你应该看到你的webpack 应用程序已经运行！

## 7.使用Babel处理ES6语法

### 7.1webpack中使用babel

安装：

```shell
npm install --save-dev babel-loader @babel/core
```

使用：

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" 
       }
    ]
  }
}
```

说明：当我们使用`babel-loader`处理js文件的时候，实际上`babel-loader`只是webpack和Babel做通信的桥梁，使用之后，他们就会做打通。实际上`babel-loader`不会将js文件里的es6语法转换为es5语法。

安装转换es6的模块:

```shell
npm install @babel/preset-env --save-dev
```

配置：

增加options字段。

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" ,
         options:{
           presets: ["@babel/preset-env"]
         }
       }
    ]
  }
}
```

此时就会将es6的模块转换为es5的语法了。这个插件只是翻译了一部分，很多语法在低版本浏览器还是没法支持的。需要使用`polyfill`做语法或变量的补充。

安装`polyfill`:

```shell
npm install --save @babel/polyfill
```

使用：

所有代码前引入这个插件即可。也就是放在入口文件`main.js`中。

```js
//main.js
import "@babel/polyfill";
//或者
require("@babel/polyfill");
//如果配置了useBuiltIns:'usage'这个配置项，就无需再引入上面的
```

注意：这个插件会将所有语法都打包。但是我们只使用promise，map方法。因此只需要将这两个高级语法实现下就可以了

配置：

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" ,
         options:{
           presets: [["@babel/preset-env",{
             useBuiltIns:'usage'
           }]]
         }
       }
    ]
  }
}
```

说明：只实现业务代码中使用了的高级语法。其他没使用的高级语法就不会打包进去。

指定浏览器进行语法代码打包：

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" ,
         options:{
           presets: [["@babel/preset-env",{
             "targets": {
         			 	 "edge": "17",
         				 "firefox": "60",
         				 "chrome": "67",
         				 "safari": "11.1",
        			},
             useBuiltIns:'usage'
           }]]
         }
       }
    ]
  }
}
```

说明：如果`targets`指定的浏览器中已经对es6已经支持的很好了，就没必要再将代码进行翻译转换了。这些都是自动操作。

使用`transform-runtime`:

如果写的是业务代码时，只需要`babel/polyfill`的配置就可以了。但是如果写的是库项目代码的时候，需要使用`babel/plugin-transform-runtime`。`polyfill`会污染全局环境。但是`babel/plugin-transform-runtime`会以闭包的形式注入，不存在污染全局环境。

安装:

```shell
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

配置：

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" ,
         options:{
          	"plugins": [["@babel/plugin-transform-runtime",{
              	"corejs": 2,//这里如果改为2时，需要安装插件npm install --save @babel/runtime-corejs2
        				"helpers": true,
        				"regenerator": true,
        				"useESModules": false,
            }]]
         }
       }
    ]
  }
}
```

安装包`runtime-corejs2`

```shell
npm install --save @babel/runtime-corejs2
```

此时打包就不会出现问题。

抽离配置

新建`.babelrc`文件，将`webpack.config.js`中`babel-loader`的options配置项抽离处理单独配置。写了这个文件就会生效，无需引入。

```js
//.babelrc
{
   "plugins": [["@babel/plugin-transform-runtime",{
       "corejs": 2,//这里如果改为2时，需要安装插件npm install --save @babel/runtime-corejs2
        "helpers": true,
        "regenerator": true,
        	"useESModules": false,
            }]]
}
```

注意：`.babelrc`中的配置是从下网上，从左到右的执行顺序。

删除`webpack.config.js`中`babel-loader`下的options配置

```js
//webpack.config.js
module.exports={
  module:{
    rules:[
       { 
         test: /\.js$/, 
         exclude: /node_modules/, //第三方模块不使用loader转换
         loader: "babel-loader" ,
       }
    ]
  }
}
```



# 三.webpack高级概念

## 3.1Tree Shaking

把一个模块中无用的代码都不打包到最后的文件下。比如`main.js`导出两个方法`add`和`minus`,但是在`index.js`中只引入add方法，此时`minus`方法没使用，但是打包时会默认打包所有。此时就需要借助`tree shaking`来打包。

通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

注意：

- 只支持ES Module的引入。`import`的引入形式（静态引入）。`require`的形式不支持（动态引入）

### 3.1.1开发环境

配置：

```js
//webpack.config.js
module.exports={
  mode:'development',
	plugins:[
  	optimization:{//注意是在开发环境
 	 		usedExports:true
  	}
	]
}
```



```json
//package.json
{
  "sideEffects":false  //表示对所有模块进行tree shaking。
}
```

注：如果某个模块不需要tree shaking ，则将不需要的模块加入`sideEffects`数组中

示例：

```json
//如果在main。js中以import "@babel/polyfill";这种方式引入了。而这个模块又没有导出任何内容，因此不需要打包。就可以将这个模块加入数组中。
{
  "sideEffects":["@babel/polyfill"]
}
```

`tree shaking`会去查看每个文件是否有导出，如果没有导出就不打包，有导出才去打包。但是我们写的`css`文件没有导出，因此会存在问题。修改我们的配置如下：

```json
{
  "sideEffects":[
    "*.css"//表示遇到任何css文件，也不要使用tree shaking
  ]
}
```

注意：此时打包后的文件会存在未使用的代码，只是在未使用的代码前面注释未使用。这样主要方便在开发环境下进行调试。

### 3.1.2生产环境

配置

```js
//webpack.config.js
module.exports={
  mode:'production',
	plugins:[
    //生产环境就不需要以下配置
  	//optimization:{//注意是在开发环境
 	 		//usedExports:true
  	//}
	]
}
```

```json
{
  "sideEffects":[
    "*.css"//表示遇到任何css文件，也不要使用tree shaking
  ]
}
```

注意：此时打包后的文件中就不会存在未使用的代码。

## 3.2打包模式区分

*开发环境(development)*和*生产环境(production)*的构建目标差异很大。在*开发环境*中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在*生产环境*中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写**彼此独立的 webpack 配置**。

开发环境和生产环境打包的配置是不同的，因此我们将开发环境与生产环境的配置区分开。而不用每次手动去改。

我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 [`webpack-merge`](https://github.com/survivejs/webpack-merge) 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

安装 `webpack-merge` ：

```shell
npm install --save-dev webpack-merge
```

### 3.2.1webpack.common.js

```js
//webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {//这个插件的默认的根路径就是代表的当前目录
			root: path.resolve(__dirname, '../')//配置根路径位置。表示清除上一层的dist目录
		})
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
      chunks: 'all',
      cacheGroups: {
      	vendors: {
      		test: /[\\/]node_modules[\\/]/,
      		priority: -10,
      		name: 'vendors',
      	}
      }
    }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')//这里代表上一层目录。因为我们将配置文件统一放在了根目录的build文件夹下
	}
}
```

### 3.2.2开发环境代码

将开发环境与公共代码合并时，需要使用webpack的合并模块。

安装合并模块：

```shell
npm install webpack-merge -D
```

开发环境配置：

```js
//webpack.dev.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	}
}

module.exports = merge(commonConfig, devConfig);
```

### 3.2.3生产环境代码

```js
//webpack.prod.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = merge(commonConfig, prodConfig);
```

### 3.2.4配置package.json

```json
{
  "scripts": {
    "start": "http-server dist",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  }
}
```

注：将webpack的所有配置文件统一放在`build`目录下。方便管理。

## 3.3代码分离

此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

### 3.3.1入口起点

```js
//webpack.config.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {//增加两个入口起点
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {//打包输出两个文件
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

此时会打包输出两个文件：another.bundle.js和index.bundle.js文件。在html中自动引入的先后顺序与入口文件的先后顺序有关。

存在问题：

- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

我们通过使用 `CommonsChunkPlugin` 来移除重复的模块。

### 3.3.2防止重复

[`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

使用以下配置，将重复的模块去除，并打包到单独的。

```js
//webpack.config.js
const path = require('path');
//1. 引入webpack
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
     }),
      //2. 使用CommonsChunkPlugin插件
     new webpack.optimize.CommonsChunkPlugin({
       name: 'common' // 指定公共 bundle 的名称。
     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 3.3.3动态导入

```js
////webpack.config.js 
	const path = require('path');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      //使用chunkFilename配置
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

注意：这里使用了 `chunkFilename`，它决定非入口 chunk 的名称。

## 3.4懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。





## 3.5缓存

可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

### 3.5.1输出文件的文件名

通过使用 `output.filename` 进行[文件名替换](https://www.webpackjs.com/configuration/output#output-filename)，可以确保浏览器获取到修改后的文件。`[hash]` 替换可以用于在文件名中包含一个构建相关(build-specific)的 hash，但是更好的方式是使用 `[chunkhash]` 替换，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。

```js
//webpack.prod.js
{
  output:{
    //这里使用contenthash
    filename:'[name].[contenthash].js',
    chunkFilename:'[name].[contenthash].js'  
  }
}
```

### 3.5.2提取模板

就像我们之前从[代码分离](https://www.webpackjs.com/guides/code-splitting)了解到的，[`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 可以用于将模块分离到单独的文件中。然而 `CommonsChunkPlugin` 有一个较少有人知道的功能是，能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。通过指定 `entry` 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中：

```js
//webpack.config.js
 const path = require('path');
// 1. 引入webpack
 const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
      //2. 配置manifest
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 `entry(入口)` 起点，以及再额外配置一个 `CommonsChunkPlugin` 实例的组合方式来实现：

```js
 var path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    //1.配置入口文件
    entry: {
      main: './src/index.js',
      vendor: [
        'lodash'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
      //2. 配置vendor
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

> *注意，引入顺序在这里很重要。*`CommonsChunkPlugin` *的* `'vendor'` *实例，必须在* `'manifest'` *实例之前引入。*

### 3.5.3模块标识符







## 3.6shimming



## 3.7环境变量

不推荐使用环境变量的方式进行打包配置

```json
//package.json
{
  scripts:{
    "dev":'',
    "build":''
  }
}
```









# 四.实战配置

## 4.1library的打包

对编写的库代码或者工具函数进行打包。

文件结构

```js
-src
	--index.js//统一出口文件
	--math.js//按需导出数学库函数
	--string.js//按需导出字符串函数
-webpack.config.js
```



```js
//math.js
```



```js
//string.js
```



```js
//index.js
```





```js
//webpack.config.js
const path = require('path');

  module.exports = {
    mode:'production',
    //1.配置入口文件
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: 'library.js',
      path: path.resolve(__dirname, 'dist'),
      library:'library',//使用script方式引入的配置
      libraryTarget:'umd'//使用import，require方式导入项目使用时的配置
    }
  };
```



## 4.2PWA的打包配置

安装http-server

```shell
npm install http-server --save-dev
```

Package.json配置

```json
{
  "script":{
    //表示在dist目录下开启一个http-server服务器
    "start":"http-server dist"
  }
}
```

安装插件:实现pwa

```shell
npm install workbox-webpack-plugin --save-dev
```

## 4.3使用webpackdevserver实现请求转发

发送请求：

```js
//配置请求转发时不需要全局配置axios的根路径
axios.get('/api/header.json').then((res)=>{
  console.log(res)
})
```





请求转发配置：

```js
//webpack.config.js
module.exports={
  devserver:{
    proxy:{
      //当访问/api路径时，就会在target配置的路径下去访问（http://192.168.3.208/api）。
      '/api':{
        target:'http://192.168.3.208',//转发的地址
        pathRewrite:{
          'header.json':'demo.json'//当访问header.json文件时，转发去访问demo.json文件
        }
      }
    }
  }
}
```



## 4.4eslint在webpack中的配置



项目中安装：

```shell
npm install eslint --save-dev
```

新建eslint配置文件：

```shell
npx eslint --init

#执行上面命令后，就会出现配置项
#1.怎么配置eslint
use a popular style guide
#2.使用哪种规范
Airbnd
#3.是否项目中使用react
n
#4.配置文件是一种什么形式
javascript
#5.是否安装依赖
y
```

此时安装完成依赖，项目中就会多一个`.eslintrc.js`文件。

```js
//.eslintrc.js
module.exports={
  "extends":"airbnd",
  "parser":"babel-eslint",
  "rules":{
    "规则名字":0//0代表不遵守这个规则
  },
  globals:{
    document:false
  }
}
```

注意：此时使用vscode编辑器安装一个eslint的插件进行检测。

这样借用编辑器插件来校验代码规范在团队中会存在问题。比如有些成员没有使用vscode，而是使用其他编辑器，并且没有类似的插件，那么代码就不会进行校验，从而这个成员就不会按照eslint规范进行编写代码。因此需要讲eslint在webpack中进行配置，保证每个成员都遵循此规范，而不受编辑器的约束。

安装eslint-loader：

```shell
npm install eslint-loader --save-dev
```

使用：

```js
//webpack.config.js
module.exports={
  devServer:{
    //当进行eslint有错误时，会在浏览器打开的页面上弹层显示哪些规范错误。如果不配置这个属性，则错误只能在控制台显示。
    overlay:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:['babel-loader','eslint-loader']//执行顺序：从右到左  
      }
    ]
  }
}
```

> 注意：此时不需要编辑器再安装eslint相关插件。但是会降低打包的速度。可以使用git钩子，在提交到仓库之前进行eslint检测，检测通过才让提交仓库。



## 4.5webpack性能优化

### 4.5.1使用最新的Node,Npm等工具



### 4.5.2在尽可能少的模块上应用Loader

减少loader 的使用。

比如打包js文件时，推荐使用excluded排除不需要进行打包的模块。

```js

```



### 4.5.3plugin尽可能精简并确保可靠



### 4.5.4resolve参数合理配置

使用import引入逻辑文件时省略后缀的配置：

```js
//webpack.config.js
module.exports={
  resolve:{
    extensions:['.vue','.js','.jsx']//从前往后执行
  }
}
```

使用：

```js
//index.js
//此时可以省略后缀名
import index from './index'
//此时会先去文件找当前文件夹下是否有index.vue文件，没有就继续查找是否有index.js文件，如果没有就查找index,jsx文件。如果所有的都没找的，则报错。
```

注：`.jpg`和`.css`等非逻辑文件，不建议配置此项。因为会对打包性能造成一定影响。

修改默认引入的index.js配置：

```js
//webpack.config.js
module.exports={
  resolve:{
    extensions:['.vue','.js','.jsx'],//从前往后执行
    mainFiles:['index','child']//不建议配置此项
  }
}
```

使用：

```js
//如果不配置上面的mainFiles，则默认会去找child文件夹下的index
import child from './child/'
//当配置了上面的，则依次会去找child文件夹下的index.vue,index.js.index.jsx,child.vue,child.js.child.jsx
```

注：也会对性能造成影响

配置路径别名：

```js
//webpack.config.js
module.exports={
  resolve:{
    alias:{
      @:path.resolve(__dirname,'../src')
    }
  }
}
```

使用：

```js
//此时表示引入../src/view/home
import home from '@/view/home'
```

### 4.5.5使用DllPlugin提高打包速度

在项目中使用的第三方模块（比如`vue`,`react`,`lodash`等），实际上是不会变的。因此我们只需要在第一次打包时对依赖的第三方模块进行分析并打包成库文件，最后借助插件添加到生成的html文件中。

原理：减少第三方模块的打包次数（打包一次），从而减少每次打包的速度。

1. 第三方模块打包一次

- 对第三方模块打包配置

```js
//webpack.dll.js
const path =require('path')

module.exports={
  mode:;'production',
  entry:{
  	vendors:['react','react-dom','lodash']//这里配置需要打包的第三方模块名字（只需要打包一次的第三方模块）
	},
  output:{
    filename:'[name].dll.js',//打包后的名字为vendors.dll.js
    path:path.resolve(__dirname,'../dll'),//打包后的文件存放路径
    library:'[name]'//将打包好的文件通过全局变量暴露出来，这个全局变量叫vendors
  }
}
```

配置package.json:对第三方模块进行打包

```json
{
  "script":{
    "build:dll":"webpack --config ./build/webpack.dll.js"
  }
}
```

- 使用插件将打包的第三方模块添加到新生成的html中（只有引入才能使用打包暴露的全局变量）。

安装插件:

往新生成的html文件中添加静态资源。

```shell
npm install add-asset-html-webpack-plugin --save
```

使用：

```js
//webpack.common.js
const AddAssetHtmlWebpackPlugin =require('add-asset-html-webpack-plugin')

module.exports={
  plugins:[
    new HtmlWebpackPlugin({
      template:'src/index.html'
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath:path.resolve(__dirname,'../dll/vendors.dll.js')//需要添加的文件路径
    })
  ]
}
```

此时在控制台输入`vendors`,控制台就会打印出内容。

但是这个打包生成的第三方模块，在webpack打包的过程中并没有使用它。目前还只是在html文件中引入了。

2. 我们引入第三方模块的时候，要去使用dll文件引入。

```js
//webpack.dll.js
const path =require('path')
const webpack =require('webpack')

module.exports={
  mode:;'production',
  entry:{
  	vendors:['react','react-dom','lodash']//这里配置需要打包的第三方库名字
	},
  output:{
    filename:'[name].dll.js',
    path:path.resolve(__dirname,'../dll'),
    library:'[name]'//以库文件的形式进行打包。向全局暴露。
  },
  plugins:[
      //使用DllPlugin插件对暴露的模块代码做一个分析生成一个manifest.json的映射文件
      new webpack.DllPlugin({
        name:'[name]',//分析的文件名字，必须和library的名字一样。
        path:path.resolve(__dirname,'../dll/[name].manifest.json'),//分析结果的存放位置
      })
    ]
}
```

此时执行打包命令，在dll文件夹下就会生成一个映射文件。此时还需要在打包的`webpack.common.js`配置中进行配置：

```js
//webpack.common.js
const AddAssetHtmlWebpackPlugin =require('add-asset-html-webpack-plugin')

module.exports={
  plugins:[
    new AddAssetHtmlWebpackPlugin({
      filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
    }),
    //使用插件。
    //当进行打包时，发现引入了第三方模块，此时这个插件就会在vendors.manifest.json去找第三方模块的映射关系，如果能找到映射关系，他就知道这个第三方模块没必要再进行打包，直接从vendors.dll.js中拿过来用就可以了（会在全局变量里去拿）。如果发现引入的第三方模块，没在这个映射关系里面，就会在node_modules中去拿这个模块进行打包。
    new webpack.DllReferrencePlugin({
      manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
    })
  ]
}
```

此时就可以正常使用了。并且打包时间缩短了很多。

> 扩展：对第三方模块进行拆分再分别引入

配置`webpack.dll.js`

```js
//webpack.dll.js
const path =require('path')
const webpack =require('webpack')

module.exports={
  mode:;'production',
  entry:{
  	vendors:['lodash'],//对第三方模块进行拆分打包
      react:['react','react-dom']
	},
  output:{
    filename:'[name].dll.js',
    path:path.resolve(__dirname,'../dll'),
    library:'[name]'//以库文件的形式进行打包。向全局暴露。
  },
  plugins:[
      //使用DllPlugin插件对暴露的模块代码做一个分析生成一个manifest.json的映射文件
      new webpack.DllPlugin({
        name:'[name]',//分析的文件名字，必须和library的名字一样。
        path:path.resolve(__dirname,'../dll/[name].manifest.json'),//分析结果的存放位置
      })
    ]
}
```

此时执行打包命令会生成：`react.dll.js`,`react.manifest.json`和`vendors.dll.js`和`vendors.manifest.json`

此时还需要配置`webpack.common.js`文件

```js
//webpack.common.js
const AddAssetHtmlWebpackPlugin =require('add-asset-html-webpack-plugin')

module.exports={
  plugins:[
    new AddAssetHtmlWebpackPlugin({
      filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
    }),
    //配置react.dll.js
 		new AddAssetHtmlWebpackPlugin({
      filepath:path.resolve(__dirname,'../dll/react.dll.js')
    }),
    new webpack.DllReferrencePlugin({
      manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
    }),
    //配置react.manifest.json
    new webpack.DllReferrencePlugin({
      manifest:path.resolve(__dirname,'../dll/react.manifest.json')
    })
  ]
}
```

此时重新启动项目，可以正常运行。

但是在大型的项目中，拆分的模块很多，打包生成的第三方模块对应的dll文件很多。此时就要一个一个在`webpack.common.js`中添加很多重复的代码。

解决办法：使用node分析dll目录下有几个dll文件，然后动态的往plugins添加`AddAssetHtmlWebpackPlugin`和`DllReferrencePlugin`

```js
//webpack.common.js
const AddAssetHtmlWebpackPlugin =require('add-asset-html-webpack-plugin')
//2.
const fs=require('fs')

//1.抽离基础的插件
const plugins=[
  new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
	new CleanWebpackPlugin(['dist'], {//这个插件的默认的根路径就是代表的当前目录
			root: path.resolve(__dirname, '../')//配置根路径位置。表示清除上一层的dist目录
		})
]

const files=fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file=>{
  if(/.*\.dll.js/.test(file)){
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
      filepath:path.resolve(__dirname,'../dll',file)
    }))
  }
  if(/.*\.manifest.json/.test(file)){
    plugins.push(
    new webpack.DllReferrencePlugin({
      manifest:path.resolve(__dirname,'../dll',file)
    }))
  }
})

module.exports={
  plugins
}
```

此时在webpack.dll.js配置中拆分模块并且打包后，webpack.common.js就会自动的去分析并向全局暴露。

### 4.5.6控制包文件的大小

使用treeshiking

### 4.5.7thread-loader,parallel-webpack,happypack多进程打包

### 4.5.8合理使用sourcemap

### 4.5.9结合stats分析打包结果

### 4.5.10开发环境内存编译

### 4.5.11开发环境无用插件剔除



## 4.6多页面打包配置









































# 五.底层原理

5.1编写loader



5.2编写plugin



5.3Bundler源码编写