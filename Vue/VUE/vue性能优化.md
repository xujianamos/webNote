## 项目打包构建

### 1.Vue工程项目热更新慢解决办法

安装动态编译插件 `babel-plugin-dynamic-import-node` ，解决项目过大，内容多导致的编译速度慢的问题。

这个插件是将现有项目中的 `import() to a deferred require()`，

这样就可以在编译中延迟项目中 `import()` 的引入。

```bash
npm install babel-plugin-dynamic-import-node --save-dev
```

配置`babel.config.js`

```js
const prodPlugins = []
// 如果是发布模式则启用的插件
if (process.env.NODE_ENV === 'production') {
  // 生成环境
  prodPlugins.push('transform-remove-console')
} else {
  // 开发环境
  // prodPlugins.push('dynamic-import-node')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...prodPlugins],
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}
```

或者`.babelrc`

```json
{
    "presets":[],
    "plugins":[],
    "env":{
        "development":{
            "plugins":['dynamic-import-node']
        }
    }
}
```

