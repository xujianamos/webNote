# Babel转码器

## 1.安装babel

 在项目目录中，安装 Babel。 

```
npm i --save-dev @babel/core
```

## 2.配置文件

 Babel 的配置文件是`.babelrc`，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。 

 该文件用来设置转码规则和插件，基本格式如下。 

```
{
  "presets": [],
  "plugins": []
}
```

 `presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。 

```
# 最新转码规则
npm install --save-dev @babel/preset-env

# react 转码规则
npm install --save-dev @babel/preset-react
```

 然后，将这些规则加入`.babelrc`。 

```
{
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```

 注意，以下所有 Babel 工具和模块的使用，都必须先写好`.babelrc`。 

## 3.命令行转码

Babel 提供命令行工具`@babel/cli`，用于命令行转码。

它的安装命令如下。

```
npm install --save-dev @babel/cli
```

 基本用法如下。 

```js
# 转码结果输出到标准输出
npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ npx babel example.js --out-file compiled.js
# 或者
$ npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ npx babel src --out-dir lib
# 或者
$ npx babel src -d lib

# -s 参数生成source map文件
$ npx babel src -d lib -s
```

## 4.Babel-node

`@babel/node`模块的`babel-node`命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

首先，安装这个模块。

```node
npm i --save-dev @babel/node
```

 然后，执行`babel-node`就进入 REPL 环境。 

```js
npx babel-node
> (x => x * 2)(1)	//执行代码
2
```

 `babel-node`命令可以直接运行 ES6 脚本。将上面的代码放入脚本文件`es6.js`，然后直接运行。 