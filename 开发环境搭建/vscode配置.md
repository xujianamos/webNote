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
// 头部注释
  "fileheader.customMade": {
      "Author": "xujian",
    "Date": "Do not edit",// 文件创建时间(不变)
    "LastEditors": "xujian", // 文件最后编辑者
    "LastEditTime": "Do not edit",// 文件最后编辑时间
    "Description": "",
    "FilePath": "Do not edit"// 文件在项目中的相对路径 自动更新
  },
//这个配置必须放在后面
  "fileheader.configObj": {
    "wideSame": true, // 设置为true开启
    "wideNum": 13 // 字段长度 默认为13
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

### 2.3project-manager

开发项目时，用于快速切换项目。

1. 配置文件

- windows或linux使用control+shift+p打开命令行窗口，输入Project Mangager: Edit Projects；
- 若是mac os系统则使用command+shift+p打开命令行窗口，输入Project Mangager: Edit Projects；

2. 添加本地项目





## 3.代码片段

### 3.1vue代码片段

```json
{
    "vue-template": {//模板名称
        "prefix": "vue",//触发条件
        "body": [//内容
            "<!--",
            "* @description  ${1:参数1}",
            "* @fileName  ${TM_FILENAME_BASE}",
            "* @author userName",
            "* @date ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
            "* @version V1.0.0",
            "!-->",
            "<template>",
            "  <div id='${TM_FILENAME_BASE}'",
            "\t\t\t class='${TM_FILENAME_BASE}'>",
            "  </div>",
            "</template>",
            "",
            "<script>",
            "export default {",
            "  props: { // 父辈向子辈传参",
            "  },",
            "  name: '${TM_FILENAME_BASE}',",
            "  data () {",
            "    return {",
            "",
            "    }",
            "  },",
            "  created () { // 实例被创建之后执行代码",
            "",
            "\t},",
            "  computed: { // 计算属性",
            "",
            "\t},",
            "  components: { // 组件的引用",
            "",
            "\t},",
            "  methods: { // 方法",
            "",
            "\t},",
            "  mounted () { // 页面进入时加载内容",
            "",
            "\t},",
            "  watch: { // 监测变化",
            "",
            "\t}",
            "}",
            "</script>",
            "<style scoped lang='less'>",
            "</style>"
        ],
        "description": "vue代码片段" //描述
    }
}
```

# 4.vscode加入右键菜单

1. 随便找个地方新建个XXX.reg的注册表脚本文件，文件名叫啥都可以，但后缀名必须为.reg。

vscode.reg：

```bash
Windows Registry Editor Version 5.00

# 右击文件时弹出的菜单
[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with Code" #显示的文字
"Icon"="D:\\Program Files\\Microsoft VS Code\\Code.exe" # 显示的图标,修改为自己安装的vscode路径

# 要执行的命令
[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
# 具体的命令代码，%1代表第一个参数，即右击选中的那个文件的路径,修改为自己安装的vscode路径
@="\"D:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

# 右击文件夹时弹出的菜单
[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Program Files\\Microsoft VS Code\\Code.exe"# 修改为自己安装的vscode路径

[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"D:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""#修改为自己安装的vscode路径

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Program Files\\Microsoft VS Code\\Code.exe" #修改为自己安装的vscode路径

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"D:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\"" # 修改为自己安装的vscode路径
```

2. **Ctrl+H**将`D:\\Program Files\\Microsoft VS Code\\Code.exe`替换你电脑上**VSCode**的安装路径

3. 双击运行并选择**是**

# 5.vscode个人json配置

```json
{
  "workbench.iconTheme": "vscode-icons-mac",
  "editor.fontSize": 18,
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "terminal.integrated.shell.osx": "/bin/bash",
  "path-intellisense.showHiddenFiles": false,
  "path-intellisense.extensionOnImport": false,
  "path-intellisense.autoSlashAfterDirectory": false,
  "path-intellisense.mappings": {
    // "@": "${workspaceFolder}/src",
    "@": "${workspaceRoot}/src",
    "lib": "${workspaceFolder}/lib",
    "global": "/Users/dummy/globalLibs"
  },

  "breadcrumbs.enabled": false,

  "files.autoSave": "off",
  // "eslint.validate": [
  //    "javascript",
  //    "javascriptreact",
  //    "html",
  //    "js"
  //    { "language": "vue", "autoFix": true }
  //  ],
  "eslint.options": {
    "plugins": ["html"]
  },
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "fileheader.customMade": {
    "Author": "xujian",
    "Date": "Do not edit",
    "LastEditors": "xujian",
    "LastEditTime": "Do not edit",
    "Description": "",
    "FilePath": "Do not edit"
  },
  "workbench.colorTheme": "escook dark",
  "window.menuBarVisibility": "toggle",
  "window.dialogStyle": "custom",
  "window.titleBarStyle": "native",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

