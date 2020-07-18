## 1.创建vue项目

### 1.1安装脚手架工具

```js

```

### 1.2创建vue项目

```js
//vue-electron为项目名称
vue create vue-electron
```

根据项目需要选择相应的配置即可

### 1.3启动项目

```js
cd vue-electron
npm run serve
```

## 2.在vue项目中安装electron

### 2.1安装

需要在当前项目下安装electron：安装时间较长，请耐心等待。

```js
cd vue-electron
vue add electron-builder
```

配置选择：**选择Electron的版本**

```js
? Choose Electron Version (Use arrow keys)
  ^4.0.0
  ^5.0.0
> ^6.0.0——————（这里选择electron的6.0版本）
```

### 2.2启动项目

安装完成后，查看项目的目录结构，会自动在`src`目录下生成`background.js`并修改了`package.json`。 运行项目：

```js
npm run electron:serve
```

注：运行项目的指令在`package.json`的`scripts`下。根据需要执行相应的命令

```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "electron:build": "vue-cli-service electron:build",
    "electron:serve": "vue-cli-service electron:serve",
    "postinstall": "electron-builder install-app-deps",
    "postuninstall": "electron-builder install-app-deps"
  }
```

### 2.3失败解决方案

有可能因为网络原因会导致安装electron失败。

#### 2.3.1无提示解决方案

如果安装过程中报错，并且没有相应提示指令。则重新执行命令:

```js
vue add electron-builder
```

#### 2.3.2有提示的解决方案

如果安装报错，并且有提示指令。则根据提示指令操作。操作成功后重启项目即可运行。

如提示信息1：

![image-20200423140829394](https://gitee.com/xuxujian/webNoteImg/raw/master/electron/image-20200423140829394.png)

则执行命令：图中标注部分

```js
npm install --loglevel error vue-cli-plugin-electron-builder -D
```

如提示信息2：

![image-20200423141027204](https://gitee.com/xuxujian/webNoteImg/raw/master/electron/image-20200423141027204.png)

则执行命令：图中标注部分

```js
npm install --loglevel error
```

