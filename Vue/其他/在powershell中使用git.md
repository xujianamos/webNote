### 1.安装git

按照默认安装即可

### 2.将git加入环境变量

将git安装的目录`/Git/cmd`这个目录添加到环境变量中

### 3.下载posh-git-master

在git bash here中使用git命令下载https://github.com/dahlbyk/posh-git.git

下载放入一个固定位置

### 4.powershell安装脚本

Win+x -> 运行Powershell(管理员)。Powershell默认不支持运行脚本，需要首先执行指令

```js
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Confirm
```

输入`y`确认即可

在posh-git-master目录下，使用`shift+右键`==在此处打开Powershell窗口==使用以下指令

```js
.\install.ps1
```

注意：若要通过shift+右键“在此处打开Powershell窗口”使用指令，则上述步骤执行完毕后仍需重启电脑，方可启用支持。

### 5.测试

在Powershell中使用git命令

```js
//查看版本号
git --version
```

