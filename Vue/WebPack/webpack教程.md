## 1.Webpack介绍

而webpack其中一个核心就是让我们可能进行模块化开发，并且会帮助我们处理模块间的依赖关系。

而且不仅仅是JavaScript文件，我们的CSS、图片、json文件等等在webpack中都可以被当做模块来使用（在后续我们会看到）。

## 2.安装

安装webpack首先需要安装Node.js，Node.js自带了软件包管理工具npm

查看自己的node版本：

```bash
# node -v
```

全局安装webpack(这里我先指定版本号3.6.0，因为vue cli2依赖该版本)

```bash
# npm install webpack@3.6.0 -g
```

局部安装webpack（后续才需要）

- `--save-dev`是开发时依赖，项目打包后不需要继续使用的。

```bash
# cd 项目目录
# npm install webpack@3.6.0 --save-dev
```

为什么全局安装后，还需要局部安装呢？

- 在==终端直接执行==webpack命令，使用的==全局安装的webpack==

- 当在`package.json`中定义了`scripts`时，其中包含了`webpack`命令，那么使用的是==局部webpack==

## 3.js文件的打包

现在的js文件中使用了模块化的方式进行开发，他们可以直接使用吗？不可以。

- 因为如果直接在index.html引入这两个js文件，浏览器并不识别其中的模块化代码。

- 另外，在真实项目中当有许多这样的js文件时，我们一个个引用非常麻烦，并且后期非常不方便对它们进行管理。

我们应该怎么做呢？使用webpack工具，对多个js文件进行打包。

- 我们知道，webpack就是一个模块化的打包工具，所以它支持我们代码中写模块化，可以对模块化的代码进行处理。（如何处理的，待会儿在原理中，我会讲解）

- 另外，如果在处理完所有模块之间的关系后，将多个js打包到一个js文件中，引入时就变得非常方便了。

OK，如何打包呢？使用webpack的指令即可

```bash
# webpack src/main.js dist/bundle.js
```

使用打包后的文件：

打包后会在dist文件下，生成一个bundle.js文件

- bundle.js文件，是webpack处理了项目直接文件依赖后生成的一个js文件，我们只需要将这个js文件在index.html中引入即可

## 4.webpack的配置

### 4.1入口和出口

如果每次使用webpack的命令都需要写上入口和出口作为参数，就非常麻烦，有没有一种方法可以将这两个参数写到配置中，在运行时，直接读取呢？

当然可以，就是创建一个webpack.config.js文件

```js
# webpack.config.js文件
//导入路径相关的包
const path = require('path')

module.exports = {
  //打包入口文件
  entry: './src/main.js',
  //打包出口文件
  output: {
    //出口路径
    //__dirname代表当前路径
    //代表当前路径下的dist目录
    path: path.resolve(__dirname, 'dist'),
    //打包后的文件名
    filename: 'bundle.js'
  },
}
```

### 4.2局部安装webpack

目前，我们使用的webpack是全局的webpack，如果我们想使用局部来打包呢？

- 因为一个项目往往依赖特定的webpack版本，全局的版本可能很这个项目的webpack版本不一致，导出打包出现问题。

- 所以通常一个项目，都有自己局部的webpack。

第一步，项目中需要安装自己局部的webpack

- 这里我们让局部安装webpack3.6.0

- Vue CLI3中已经升级到webpack4，但是它将配置文件隐藏了起来，所以查看起来不是很方便。

  ```bash
  # npm install webpack@3.6.0 --save-dev
  ```

第二步，通过node_modules/.bin/webpack启动webpack打包

```bash
# node_modules/.bin/webpack
```

## 5.loader配置

loader是webpack中一个非常核心的概念。

webpack用来做什么呢？

- 在我们之前的实例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关的依赖。

- 但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片，也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将scss、less转成css，将.jsx、.vue文件转成js文件等等。

- 对于webpack本身的能力来说，对于这些转化是不支持的。

- 那怎么办呢？给webpack扩展对应的loader就可以啦。

loader使用过程：

- 步骤一：通过npm安装需要使用的loader

- 步骤二：在webpack.config.js中的modules关键字下进行配置

大部分loader我们都可以在webpack的官网中找到，并且学习对应的用法。

### 5.1loader配置的格式

所有的loader配置都在module对象下的rules数组配置。一个规则就是一个对象

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

### 5.2style-loader

将模块的导出作为样式添加到 DOM 中

```bash
npm install style-loader --save-dev
```

用法：

建议将 `style-loader` 与 [`css-loader`](https://github.com/webpack/css-loader) 结合使用

```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
```

### 5.3cssloader

解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

安装

```bash
npm install --save-dev css-loader
```

用法

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

css-loader只负责加载css文件，但是并不负责将css具体样式嵌入到文档中。

这个时候，我们还需要一个style-loader帮助我们处理。

> 注意：style-loader需要放在css-loader的前面。

疑惑：不对吧？按照我们的逻辑，在处理css文件过程中，应该是css-loader先加载css文件，再由style-loader来进行进一步的处理，为什么会将style-loader放在前面呢？

答案：这次因为webpack在读取使用的loader的过程中，是按照==从右向左==的顺序读取的。

### 5.4less-loader

加载和转译 LESS 文件

安装

```bash
npm install --save-dev less-loader less
```

示例：

将 css-loader、style-loader 和 less-loader 链式调用，可以把所有样式立即应用于 DOM。

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [
              {loader: "style-loader" }, 
              {loader: "css-loader"   }, 
              {loader: "less-loader"  }
            ]
        }]
    }
};
```

### 5.5**图片文件处理**

#### 5.5.1

图片处理，我们使用url-loader来处理，依然先安装url-loader

安装

```bash
npm install --save-dev url-loader
```

用法

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

limit属性的作用，当图片小于8kb时，对图片进行base64编码

如果大于8kb的图片，会通过file-loader进行处理

#### 5.5.2

安装

```bash
npm install --save-dev file-loader
```

使用

```js
//可以不进行配置
```

#### 5.5.3**修改文件名称**

我们发现webpack自动帮助我们生成一个非常长的名字

- 这是一个32位hash值，目的是防止名字重复

- 但是，真实开发中，我们可能对打包的图片名字有一定的要求

- 比如，将所有的图片放在一个文件夹中，跟上图片原来的名称，同时也要防止重复

所以，我们可以在options中添加上如下选项：

- img：文件要打包到的文件夹

- name：获取图片原来的名字，放在该位置

- hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位

- ext：使用图片原来的扩展名

但是，我们发现图片并没有显示出来，这是因为图片使用的路径不正确

- 默认情况下，webpack会将生成的路径直接返回给使用者

- 但是，我们整个程序是打包在dist文件夹下的，所以这里我们需要在路径下再添加一个dist/

  ```js
  module.exports = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      //添加路径
      publicPath: 'dist/'
    }
  }
  ```

  图片修改规则如下

  ```js
  {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
                // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载.
                limit: 13000,
                name: 'img/[name].[hash:8].[ext]'
              },
            }
          ]
        }
  ```

## 6.babel的使用

如果你仔细阅读webpack打包的js文件，发现写的ES6语法并没有转成ES5，那么就意味着可能一些对ES6还不支持的浏览器没有办法很好的运行我们的代码。

在前面我们说过，如果希望将ES6的语法转成ES5，那么就需要使用babel。

- 而在webpack中，我们直接使用babel对应的loader就可以了。

```bash
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

配置webpack.config.js文件

```js
{
        test: /\.js$/,
        // exclude: 排除
        // include: 包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
```

重新打包，查看bundle.js文件，发现其中的内容变成了ES5的语法

## 7.webpack配置vue

现在，我们希望在项目中使用Vuejs，那么必然需要对其有依赖，所以需要先进行安装

- 注：因为我们后续是在实际项目中也会使用vue的，所以并不是开发时依赖

```bash
npm install vue --save
```

那么，接下来就可以按照我们之前学习的方式来使用Vue了

修改完成后，重新打包，运行程序：

- 打包过程没有任何错误(因为只是多打包了一个vue的js文件而已)

- 但是运行程序，没有出现想要的效果，而且浏览器中有报错

这个错误说的是我们使用的是runtime-only版本的Vue，什么意思呢？

- 这里我只说解决方案：[Vue](http://cn.vuejs.org/v2/guide/installation.html)[不同版本构建](http://cn.vuejs.org/v2/guide/installation.html)，后续我具体讲解runtime-only和runtime-compiler的区别。

所以我们修改webpack的配置，添加如下内容即可

```js
resolve: {
    // alias: 别名
    extensions: ['.js', '.css', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
```

### 7.1el和template区别

el和template模板的关系是什么呢？

- 在我们之前的学习中，我们知道el用于指定Vue要管理的DOM，可以帮助解析其中的指令、事件监听等等。

- 而如果Vue实例中同时指定了template，那么template模板的内容会替换掉挂载的对应el的模板。

### 7.2`.vue`文件处理

我们以一种全新的方式来组织一个vue的组件

但是，这个时候这个文件可以被正确的加载吗？

- 必然不可以，这种特殊的文件以及特殊的格式，必须有人帮助我们处理。

- 谁来处理呢？vue-loader以及vue-template-compiler。

安装vue-loader和vue-template-compiler

```bash
npm install vue-loader vue-template-compiler --save-dev
```

修改webpack.config.js的配置文件：

```js
{
        test: /\.vue$/,
        use: ['vue-loader']
      }
```

## 8.plugin的使用

plugin是什么？

- plugin是插件的意思，通常是用于对某个现有的架构进行扩展。

- webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。

loader和plugin区别

- loader主要用于转换某些类型的模块，它是一个转换器。

- plugin是插件，它是对webpack本身的扩展，是一个扩展器。

plugin的使用过程：

- 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)

- 步骤二：在webpack.config.js中的plugins中配置插件。

下面，我们就来看看可以通过哪些插件对现有的webpack打包过程进行扩容，让我们的webpack变得更加好用。

### 8.1添加版权的Plugin

我们先来使用一个最简单的插件，为打包的文件添加版权声明

- 该插件名字叫BannerPlugin，属于webpack自带的插件。

按照下面的方式来修改webpack.config.js的文件：

```js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  ...
  plugins: [
      new webpack.BannerPlugin('最终版权归aaa所有'),
  ]
}
```

重新打包程序：查看bundle.js文件的头部，看到如下信息

![image-20200315234526749](E:%5CwebNote%5CVue%5CWebPack%5Cwebpack%E6%95%99%E7%A8%8B.assets%5Cimage-20200315234526749.png)

### 8.2打包html的plugin

目前，我们的index.html文件是存放在项目的根目录下的。

- 我们知道，在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等文件也就没有意义了。

- 所以，我们需要将index.html文件打包到dist文件夹中，这个时候就可以使用HtmlWebpackPlugin插件

HtmlWebpackPlugin插件可以为我们做这些事情：

- 自动生成一个index.html文件(可以指定模板来生成)

- 将打包的js文件，自动通过script标签插入到body中

安装HtmlWebpackPlugin插件

```bash
npm install html-webpack-plugin --save-dev
```

使用插件，修改webpack.config.js文件中plugins部分的内容如下：

- 这里的template表示根据什么模板来生成index.html

- 另外，我们需要删除之前在output中添加的publicPath属性

- 否则插入的script标签中的src可能会有问题

```js
plugins: [
      new webpack.BannerPlugin('最终版权归aaa所有'),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
  ],
```

### 8.3js压缩的Plugin

在项目发布之前，我们必然需要对js等文件进行压缩处理

- 这里，我们就对打包的js文件进行压缩

- 我们使用一个第三方的插件uglifyjs-webpack-plugin，并且版本号指定1.1.1，和CLI2保持一致

安装

```bash
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

修改webpack.config.js文件，使用插件：

```js
const path=require（'path'）
const webpack =require（‘webpack'）
const uglifyJsPlugin =require（'uglifyjs-webpack-plugin'）

module.exports={
	plugins:[
		new webpack.BannerPlugin（'最终版权归coderwhy所有”）
		new uglify]sPLugin（）
  ]
}
```

查看打包后的bunlde.js文件，是已经被压缩过了。

### 8.4搭建本地服务器

webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。

不过它是一个单独的模块，在webpack中使用之前需要先安装它

```bash
npm install --save-dev webpack-dev-server@2.9.1
```

devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：

- contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写./dist

- port：端口号

- inline：页面实时刷新

- historyApiFallback：在SPA页面中，依赖HTML5的history模式

webpack.config.js文件配置修改如下：

```js
 devServer: {
    contentBase: './dist',
    inline: true
  }
```

我们可以再配置另外一个scripts：

- --open参数表示直接打开浏览器

## 9.webpack配置分离