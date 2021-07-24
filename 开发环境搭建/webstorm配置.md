## 1.环境配置

### 1.1修改字体与行高

选择菜单栏的`File - Settings`打开软件的设置面板。

- 按照下图所示修改字体、大小、行高、开启连字符

![image-20210723215834313](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723215834313.png)

## 2.常用插件

### 2.1主题插件

首先要安装的是主题插件`Material Theme UI`，打开软件的设置面板找到，`Plugins`，搜索这个插件

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723220456689.png" alt="image-20210723220456689" style="zoom:80%;" />

- 安装成功，重启webstorm

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723220622432.png" alt="image-20210723220622432" style="zoom:80%;" />

### 2.2安装图标插件

安装完主题插件后，界面稍微好看了那么一点，但是图标还是默认的，很是不搭配，我们继续在`Plugins`中搜索`Atom Material Icons`

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723220850578.png" alt="image-20210723220850578" style="zoom:80%;" />

- 安装成功，应用更改，手动重启webstorm。

### 2.3更换主题

安装完主题插件和图标插件后，我们还需要在`Settings`面板中切换主题

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723221839722.png" alt="image-20210723221839722" style="zoom:80%;" />

- 在打开的面板中，在`Theme`选项那里选择你喜欢的主题，此处选择`Atom One Dark (Material)`

![image-20210723221931285](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723221931285.png)

- 在`Editor - Font`面板中修改主题字体

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723222141865.png" alt="image-20210723222141865" style="zoom:80%;" />

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723222322220.png" alt="image-20210723222322220" style="zoom:80%;" />

### 2.4翻译插件

英语不是很好的开发者，为变量起名时，遇到词穷的情况时，大多数情况会打开翻译网站翻译过后再粘贴过来，webstorm有一款名为`Translation`的插件，可以做到选中中文直接右键翻译并替换。

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723222502109.png" alt="image-20210723222502109" style="zoom:80%;" />

安装完成后，在编辑器中输入中文，**选中中文后右键即可翻译**，如下所示：

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723225501785.png" alt="image-20210723225501785" style="zoom:80%;" />

或者将鼠标光标移到需要翻译的中文位置，按下快捷键:

Windows:`Ctrl + Shift + X`

Mac  OS:`Control + Meta + O`

![image-20210723225946412](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723225946412.png)

### 2.5git提交模版

我们在使用git提交代码时，团队如果制定了提交规范，可能需要自己去写提交前缀，在webstorm中有一个名为`Git Commit Template`的插件，可以手动选择类型，自动帮我们补齐前缀。

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723230239490.png" alt="image-20210723230239490" style="zoom:80%;" />

- 我们随便改点项目中的代码，然后选择菜单栏的`git - commit`

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723230404915.png" alt="image-20210723230404915" style="zoom:80%;" />

- 默认是在项目左侧显示，我们把它改为弹窗形式显示

![image-20210720004631719](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ac1f6e6d58d42f2ad5cdd20eac23264~tplv-k3u1fbpfcp-zoom-1.image)

- 点击模版图标，即可打开提交选项

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723230720345.png" alt="image-20210723230720345" style="zoom:80%;" />

- 按照自己更改的内容，按需选择填写即可

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723230841898.png" alt="image-20210723230841898" style="zoom:80%;" />

- 填写完成，将会回到提交页面，自动填写我们刚才所选择的选项

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723231027246.png" alt="image-20210723231027246" style="zoom:80%;" />

提交成功后的效果：

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723231227196.png" alt="image-20210723231227196" style="zoom:80%;" />

### 2.6Git提交记录

维护项目时，发现bug，我们想快速知道这行代码是谁提交的，大部分开发者可能要去通过`git log`来查找。

在webstorm中，有一个名为`GitToolBox`的插件，当我们鼠标选择某一行代码时，就能显示出这行代码的提交人和提交时间。

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723231341898.png" alt="image-20210723231341898" style="zoom:80%;" />

- 鼠标选中代码，这一行的末尾就会显示提交人、提交时间等信息

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723231649017.png" alt="image-20210723231649017" style="zoom:80%;" />

### 2.7AI代码联想工具

webstorm中还有一款名为`Codota`的插件，他可以在你写代码时，自动联想出你想输入的内容。

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723231845617.png" alt="image-20210723231845617" style="zoom:80%;" />

- 安装完成，重启编辑器，打开`setting-Codota`面板，将其启用

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723233924760.png" alt="image-20210723233924760" style="zoom:80%;" />

- 随便写点代码即可看到效果

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723234018065.png" alt="image-20210723234018065" style="zoom:80%;" />

### 2.8文件忽略

我们在项目中不想让把某个文件上传到git，通常情况下我们需要自己往`.gitignore`文件中去添加要忽略的文件，在webstorm中有一款名为`.ignore`的插件，可以通过右键不想上传的文件即可实现将其添加到配置文件中。

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723234134919.png" alt="image-20210723234134919" style="zoom:80%;" />

- 右键，添加到忽略文件

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723234348660.png" alt="image-20210723234348660" style="zoom:80%;" />

## 3.其他配置

### 3.1构建项目索引

当你在写代码时，发现vue的一些内置指令、elementUI的一些组件无代码提示时，就需要构建下项目索引了，操作方法如下：

- 在`node_modules`文件夹上右键，在弹出的选项中选择`Mark Directory as -Not Excluded`即可

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210723234533086.png" alt="image-20210723234533086" style="zoom:80%;" />

### 3.2一些常用的快捷键

- 选中当前行代码：`command shift ⬅️/command shift ➡️`

- 移动当前行代码：`command ⬆️/ commind ⬇️`

- 提交代码到git本地：`command K`

- push代码到git远程仓库: `comnand shift K`

- `shift` 按两次，随处搜索，搜索文件、功能、代码很方便

- command + f  当前页搜索

- command + shift + f  全局搜索字段

- command + r 替换当前文档

- command + shift + r 全局替换字段

- command + option + l 格式化代码

- shift + f6 使文件、标签、变量名重命名

- f2, shift + f2 切换到上\下一个突出错误的位置

- shift + 回车  无论在什么位置，自动跳到下一行

- option + 回车 警告代码快速给出自动修正

- command + 左键点击  跳到代码调用位置

- command + delete 删除当前行

- command + d 复制新增一行一样的代码

- command + w  关闭当前文件选项卡

- command + /    注释行代码

- command + b   跳转到变量声明处

- command + shift + c  复制文件的路径

- command + shift + [ ]  选项卡快速切换，很有用

- command + shift + +/-  展开/折叠 当前选中的代码块

### 3.3将某一块代码提炼成一个方法

用鼠标选中一块代码，按下：`command+option+m`即可自动将这部分代码提炼成一个方法。

![image-20210721234032254](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a89900797a8c43209e8279a2dd27e1e6~tplv-k3u1fbpfcp-zoom-1.image)

### 3.4配置备份

点击下图所示图标（编辑器底部），点击登录自己账号即可完成同步

![image-20210721232319259](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b58f8fa0ba91471aa16705a397613cb8~tplv-k3u1fbpfcp-zoom-1.image)

注意：如果你看不到这一栏，则需要在`view - status Bar`开启

![image-20210721232611336](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/020bce418d6647e98b3687d65696206d~tplv-k3u1fbpfcp-zoom-1.image)

### 3.5禁止掉不用的插件

在`help`菜单下禁用，如下图所示：

![image-20210721235131850](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b49c93d9bc412897d4c9b5b6eef225~tplv-k3u1fbpfcp-zoom-1.image)

再打开的面板中，选中你想禁用的插件点ok即可，如下图所示：

![image-20210721235319352](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/207842d81bfc4a0d88b0ac7bd56bd2a2~tplv-k3u1fbpfcp-zoom-1.image)

## 4.使用ESLint+Prettier对代码进行格式校验

写Vue项目时，使用`CLI`搭建项目，勾选上`ESLint+Prettier`就会自动帮我们配置好。但是有些项目代码脱离了`webpack`，想规范自己的代码格式，就需要自行搭建格式规则。

### 4.1环境搭建

#### 4.1.1安装ESLint

- 初始化一个项目

```bash
# 项目根目录执行，执行后填写相关信息，初始化成功后，项目根目录会多一个package.json文件
yarn init
```

- 安装依赖

```bash
# 项目根目录执行，执行完成后项目根目录会多一个yarn.lock文件
yarn install
```

- 安装ESLint

```bash
# 项目根目录执行
yarn add eslint --dev
```

- 初始化ESLint

```bash
# 项目根目录执行
yarn eslint --init
# 执行后，会出现如下选择
# 你想如何使用ESLint，我选择第二项校验代码和解决方案
✔ How would you like to use ESLint? · problems
# 使用什么作为项目模块，我选择import/export
✔ What type of modules does your project use? · esm
# 项目使用哪个框架，我选择第三项不使用框架
✔ Which framework does your project use? · none
# 项目是否使用typescript，我选择yes
✔ Does your project use TypeScript? · No / Yes
# 代码运行环境，我选择了浏览器和node
✔ Where does your code run? · browser, node
# eslint配置文件的格式，我选择json配置格式
✔ What format do you want your config file to be in? · JSON
# 是否安装如下依赖
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
# 这里选择no，一会自己安装缺少的依赖
✔ Would you like to install them now with npm? · No / Yes
Successfully created .eslintrc.json file in /Users/likai/Documents/WebProject/JavaScript-test
✨  Done in 85.77s.
```

- 安装插件让ESLint支持TypeScript

```bash
yarn add typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

#### 4.1.2安装prettier

- 安装插件

```bash
yarn add prettier --dev
```

- 配置prettier规则，项目根目录创建.prettierrc.json文件，添加下述代码

```json
{
  "printWidth": 160, // 每一行的代码字符
  "tabWidth": 4, // tab的长度
  "useTabs": true, // 使用tab
  "singleQuote": false, // 使用单引号代替双引号
  "semi": true, // 末尾分号
  "trailingComma": "none", // 删除数组末尾逗号
  "bracketSpacing": true // 大括号之间的空格
}
```

### 4.2配置编辑器

#### 4.2.1配置ESLint

- 打开webstorm的设置面板，按照图中所示进行设置
- <img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210724225724030.png" alt="image-20210724225724030" style="zoom:80%;" />

- 在eslint配置文件处右击，按照图中所示进行操作

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210724000435969.png" alt="image-20210724000435969" style="zoom:80%;" />

#### 4.2.2配置prettier

- 打开webstorm的设置面板，按照图中所示进行设置

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20210724000720052.png" alt="image-20210724000720052" style="zoom:80%;" />

#### 4.2.3结合ESLint与prettier

单独使用ESLint需要在其配置文件中额外配置很多规则，而这些规则又大多为prettier的默认规则或者我们已经在prettier配了一份，这样就会造成重复写的情况且维护成本较大。

幸好插件的作者已经想到了这一点，出了一个名为**eslint-plugin-prettier**的插件。通过下属命令进行安装

```bash
yarn add eslint-plugin-prettier --dev
```

- 打开`.eslintrc.json`添加prettier插件和规则rules规则

```json
{
   "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error", // prettier标记的地方抛出错误信息
        "spaced-comment": [2,"always"] // 注释后面必须写两个空格
    } 
}
```

- 加入上述配置后，大概可以省略如下配置:

![img](https://user-gold-cdn.xitu.io/2020/7/15/1735301a6ca4b208?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

