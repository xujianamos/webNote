## 1.环境配置

### 1.1修改字体与行高

选择菜单栏的`File - Settings`打开软件的设置面板。

- 按照下图所示修改字体、大小、行高、开启连字符

![image-20210719235546600](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db270a9ecfc4486487ebe5611ab2d6e8~tplv-k3u1fbpfcp-zoom-1.image)

## 2.常用插件

### 2.1主题插件

首先要安装的是主题插件`Material Theme UI`，打开软件的设置面板找到，`Plugins`，搜索这个插件

![image-20210720000136770](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/132e9a621c3d43dc8c33b5ec2148bf15~tplv-k3u1fbpfcp-zoom-1.image)

- 安装成功，重启webstorm

![image-20210720000309157](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9786ad9d9ce443fbaf435f90a95c11f~tplv-k3u1fbpfcp-zoom-1.image)

### 2.2安装图标插件

安装完主题插件后，界面稍微好看了那么一点，但是图标还是默认的，很是不搭配，我们继续在`Plugins`中搜索`Atom Material Icons`

![image-20210720000824116](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03d4f58c44749d2a38728cc014c15c6~tplv-k3u1fbpfcp-zoom-1.image)

- 安装成功，应用更改，手动重启webstorm。

![image-20210720000941830](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f67cea9517b345c9b90b67b823455aa9~tplv-k3u1fbpfcp-zoom-1.image)

### 2.3更换主题

安装完主题插件和图标插件后，我们还需要在`Settings`面板中切换主题

![image-20210720001708274](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c01183e6182411ba8bb6acdafda9d95~tplv-k3u1fbpfcp-zoom-1.image)

- 在打开的面板中，在`Theme`选项那里选择你喜欢的主题，此处选择`Atom One Dark (Material)`

![image-20210720001959996](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3593eaf7da88410fb89d9ccea7888fd0~tplv-k3u1fbpfcp-zoom-1.image)

- 在`Editor - Font`面板中修改主题字体

![image-20210720002152088](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6051d590125a4dd084d2a33f9c597753~tplv-k3u1fbpfcp-zoom-1.image)

![image-20210720002314482](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72cbeb6142874c20a8c9272b5656abbf~tplv-k3u1fbpfcp-zoom-1.image)

### 2.4翻译插件

英语不是很好的开发者，为变量起名时，遇到词穷的情况时，大多数情况会打开翻译网站翻译过后再粘贴过来，webstorm有一款名为`Translation`的插件，可以做到选中中文直接右键翻译并替换。

![image-20210720002918264](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/428884db9af346d2876a068406bcdfbd~tplv-k3u1fbpfcp-zoom-1.image)

安装完成后，在编辑器中输入中文，右键即可翻译，如下所示：

![image-20210720003320120](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2735fcebef5452ab093b9398ec1cbe4~tplv-k3u1fbpfcp-zoom-1.image)

![image-20210720003336242](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5471daffb5bc49b8961c20d631e3c1c8~tplv-k3u1fbpfcp-zoom-1.image)

### 2.5git提交模版

我们在使用git提交代码时，团队如果制定了提交规范，可能需要自己去写提交前缀，在webstorm中有一个名为`Git Commit Template`的插件，可以手动选择类型，自动帮我们补齐前缀。

![image-20210720003808245](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b122362a6148ad9eb8c9e2963974a9~tplv-k3u1fbpfcp-zoom-1.image)

- 我们随便改点项目中的代码，然后选择菜单栏的`git - commit`

![image-20210720004508661](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08df9db9caa44449b0d2aef777e64162~tplv-k3u1fbpfcp-zoom-1.image)

- 默认是在项目左侧显示，我们把它改为弹窗形式显示

![image-20210720004631719](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ac1f6e6d58d42f2ad5cdd20eac23264~tplv-k3u1fbpfcp-zoom-1.image)

- 点击模版图标，即可打开提交选项

![image-20210720004809668](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cacdcbf12e7a49fda40025ab950714b7~tplv-k3u1fbpfcp-zoom-1.image)

- 按照自己更改的内容，按需选择填写即可

![image-20210720004935379](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddb517d1dbab4cb0936939b6478bc1f1~tplv-k3u1fbpfcp-zoom-1.image)

- 填写完成，将会回到提交页面，自动填写我们刚才所选择的选项

![image-20210720005051274](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a4b2ac22e334249bcf8663285af07bd~tplv-k3u1fbpfcp-zoom-1.image)

### 2.6Git提交记录

维护项目时，发现bug，我们想快速知道这行代码是谁提交的，大部分开发者可能要去通过`git log`来查找。

在webstorm中，有一个名为`GitToolBox`的插件，当我们鼠标选择某一行代码时，就能显示出这行代码的提交人和提交时间。

![image-20210720005537135](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2266854e00984892a33b953f234a880c~tplv-k3u1fbpfcp-zoom-1.image)

- 鼠标选中代码，这一行的末尾就会显示提交人、提交时间等信息

![image-20210720005737054](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89fd12115825401aa481b39ba408d24c~tplv-k3u1fbpfcp-zoom-1.image)

### 2.7AI代码联想工具

webstorm中还有一款名为`Codota`的插件，他可以在你写代码时，自动联想出你想输入的内容。

![image-20210720010111488](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c5aa37f7c784e5f89e24ea3f51f2f9c~tplv-k3u1fbpfcp-zoom-1.image)

- 安装完成，重启编辑器，打开`setting-Codota`面板，将其启用

![image-20210720010636730](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e27293fc11d43a581a067b1823093e5~tplv-k3u1fbpfcp-zoom-1.image)

- 随便写点代码即可看到效果

![image-20210720010451528](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e589b4c8b40c4a59801be05cb96b8501~tplv-k3u1fbpfcp-zoom-1.image)

### 2.8文件忽略

我们在项目中不想让把某个文件上传到git，通常情况下我们需要自己往`.gitignore`文件中去添加要忽略的文件，在webstorm中有一款名为`.ignore`的插件，可以通过右键不想上传的文件即可实现将其添加到配置文件中。

![image-20210720011017473](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc9a11140246401cb8b171a7db317234~tplv-k3u1fbpfcp-zoom-1.image)

- 右键，添加到忽略文件

![image-20210720011244740](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22fb22f5ed5e4e91ad069efd446662f2~tplv-k3u1fbpfcp-zoom-1.image)

## 3.其他配置

### 3.1构建项目索引

当你在写代码时，发现vue的一些内置指令、elementUI的一些组件无代码提示时，就需要构建下项目索引了，操作方法如下：

- 在`node_modules`文件夹上右键，在弹出的选项中选择`Mark Directory as -Not Excluded`即可

![image-20210721220710616](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92bf15a2108546bebbbc66eab5c568c6~tplv-k3u1fbpfcp-zoom-1.image)

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

写Vue项目时，使用CLI搭建项目，勾选上ESLint+Prettier就会自动帮我们配置好。但是有些项目代码脱离了webpack，想规范自己的代码格式，就需要自行搭建格式规则。

### 4.1环境搭建

