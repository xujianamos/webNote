## 1.基础配置

## 2.插件

### 2.1注释插件

用于对文件进行头部注释或者函数注释。

- 安装：

在vscode中输入`koroFileHeader`进行安装即可。

- 配置注释模板

在vscode的`settings.json`中进行配置。

默认配置:

```json
{
   "fileheader.customMade": {}, // 头部注释
   "fileheader.cursorMode": {} // 函数注释 
}
```

自定义模板：

```json
{
   "fileheader.customMade": {//头部注释
    "Date": "Do not edit", // 文件创建时间(不变)
    "LastEditors": "OBKoro1", // 文件最后编辑者
    "LastEditTime": "Do not edit", // 文件最后编辑时间
    "FilePath": "Do not edit" // 文件在项目中的相对路径 自动更新
  }
}
```

- 使用

文件头部注释 快捷键：`window`：`ctrl+alt+i`,`mac`：`ctrl+cmd+i`

函数注释:`window`：`ctrl+alt+t`,`mac`：`ctrl+cmd+t`

### 2.2`path-intellisense`路径匹配插件

配置：

```json
{
  "path-intellisense.autoSlashAfterDirectory": true,
  "path-intellisense.showHiddenFiles": true,
  "path-intellisense.extensionOnImport": true, // 头部注释
  "path-intellisense.mappings": {
    //@代表别名，代表的是后面的路径
    "@": "${workspaceRoot}/src/renderer"//这里配置路径
  }
}
```

使用：

```js
//这里的@代表的就是${workspaceRoot}/src/renderer路径
//将@代表的路径与后面的路径进行拼接。完整路径就是：${workspaceRoot}/src/renderer/utils/index.js
import  utils from '@/utils/index.js'
```

> 注：需要配合`webpack`的`alias`配置

```js
resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),//使用相对路径
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css']
  }
```

