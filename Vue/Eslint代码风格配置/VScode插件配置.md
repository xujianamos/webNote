## 1.KoroFileHeader

- 作用：自动生成文件==头部注释==和==函数注释==

### 1.1配置信息

- 参数说明：
	- `Date`：为创建当前文件的日期时间，创建文件时就被固定了的，以后不会有变化
	- `LastEditTime`：最后修改当前文件的时间，保存时自动修改。如果文件没有修改，保存时，时间也不会修改
	- `version`:当前版本号
	- `Author`:当前作者

```json
// 文件头部注释
    "fileheader.customMade": {
        "Descripttion":"",
        "version":"V3.0",
        "Author":"xujian",
        "Date":"Do not edit",
        "LastEditors":"xujian",
        "LastEditTime":"Do not Edit"
    },
//函数注释
    "fileheader.cursorMode": {
        "name":"",
        "test":"test font",
        "msg":"",
        "param":"",
        "return":""
}
```

### 1.2使用

- `ctrl + alt + i` 生成头部注释

- `ctrl + alt + t` 生成函数注释
- 注：如果没有头部注释时，保存当前文件会自动生成一个头部注释

### 1.3快捷键占用问题





总的配置

```js
{
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  //  #让prettier使用eslint的代码格式进行校验 
  // "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号 
  "prettier.semi": false,
  //  #使用带引号替代双引号 
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "workbench.iconTheme": "vscode-icons",
  "workbench.colorTheme": "Ayu Mirage Bordered",
  "workbench.sideBar.location": "right",
  "editor.fontSize": 16,
  "editor.minimap.enabled": false,
  "breadcrumbs.enabled": false,
  "editor.renderWhitespace": "none",
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" // 两个选择器中是否换行
}
```

