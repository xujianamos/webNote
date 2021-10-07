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

## 2.4Chinese(Simplified) Language Pack for Visual Stidio Code 中文汉化包

对于一些英文不太好的小伙伴，上来第一件事肯定是要切换成中文语言环境，安装汉化包插件之后，按快捷键Ctrl+Shift+P调出命令面板，输入Configure Display Language，选择zh-ch，然后重启vs code即可。

## 2.5open-in-browser 在浏览器中查看

VS Code没有提供直接在浏览器中运行程序的内置功能，所以我们需要安装此插件，在浏览器中查看我们的程序运行效果。

## 2.6Live Server 实时预览

安装这个插件之后，我们在编辑器中修改代码，按Ctrl+S保存，修改效果就会实时同步，显示在浏览器中，再不用手动刷新。

## 2.7Auto Close Tag 自动闭合标签

输入标签名称的时候自动生成闭合标签，特别方便。

## 2.8Auto Rename Tag 尾部闭合标签同步修改

自动检测配对标签，同步修改。

## 2.9Bracket Pair Colorizer 用不同颜色高亮显示匹配的括号

对配对的括号进行着色，方便区分，未安装该插件之前括号统一都是白色的。

## 2.10Highlight Matching Tag 高亮显示匹配标签

这个插件自动帮我们将选中的匹配标签高亮显示，再也不用费劲查找了。

## 2.11Vscode-icons VSCode 文件图标

此插件可以帮助我们根据不同的文件类型生成对应的图标，这样我们在侧边栏查看文件列表的时候直接通过图标就可以区分文件类型。

使用mac的小伙伴可以选择下载Vscode-icons-mac，基本图标与Vscode-icons类似，就是文件夹采用的是mac风格。

## 2.12TODO Highlight 高亮

如果我们在编写代码时想在某个地方做一个标记，后续再来完善或者修改里面的内容，可以利用此插件高亮显示，之后可以帮助我们快速定位到需要修改的代码行。

## 2.13Code Spell Checker 单词拼写检查

我们在编写代码的时候经常会不小心拼写错误造成软件运行失败，安装这个插件后会自动帮我们识别单词拼写错误并且给出修改建议，大大帮我们减轻了排除bug的压力。

## 2.14Code Runner 运行选中代码段

如果你需要学习或者接触各种各样的开发语言，那么 Code Runner 插件可以让你不用搭建各种语言的开发环境，直接通过此插件就可以直接运行对应语言的代码，非常适合学习或测试各种开发语言，使用方式直接右键选择Run Code，支持大量语言，包括Node。

## 2.15Improt Cost 成本提示

这个插件可以在你导入工具包的时候提示这个包的体积，如果体积过大就需要考虑压缩包，为后期上线优化做准备。

## 2.16GitLens 查看Git信息

将光标移到代码行上，即可显示当前行最近的commit信息和作者，多人开发的时候十分有用，责任到人，防止甩锅。

## 2.17Bookmarks 书签

对代码进行书签标记，通过快捷键实现快速跳转到书签位置。

## 2.18Vscode-element-helper

使用element-ui库的可以安装这个插件，编写标签时自动提示element标签名称。

## 2.19Version Lens 工具包版本信息

在package.json中显示你下载安装的npm工具包的版本信息，同时会告诉你当前包的最新版本。

## 2.20Vetur VUE语言包

VUE是时下最流行的js框架之一，很多公司都会选择基于VUE来构建产品，Vetur对VUE提供了很好的语言支持。

## 2.21WakaTime 计算代码工作量

这是一款时间记录工具，它可以帮助你在vs code中记录有效的编程的时间。

并且将数据用折线图的形式展示出来，为你呈现一周内的工作趋势，曾经编写项目的时候最多一天编程将近12个小时，你的付出和努力wakatime都知道。

同时在他的官网中，也会显示用扇形图的形式显示你编写各个语言所占用的时间比例，以及你在各个项目中所用的时间占比，是一个非常好的数据报告，项目结束的时候你可以在它的Dashboard中清晰地看出自己的时间都是如何分配的。

## 2.22Settings  Sync VSCode设置同步到Gist

有时候我们到了新公司或者换了新电脑需要配置新的开发环境，这时候一个一个下载插件，再重新配置vs code就非常麻烦而且你还不一定记得那么全面，通过这个插件我们可以将当前vs code中的配置上传到Gist，之后再通过Gist下载，就可以将所有配置同步到新环境中了。

在Github首页点击头像，选择Settings进入设置页面。









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

