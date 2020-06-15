## 1.下载electron慢的问题

### 1.1问题

electron -vue执行npm run build时，在build的时候会因为下载远程打包所需文件而超时，从而导致打包错误。

![image-20200615152006370](https://gitee.com/xuxujian/webNoteImg/raw/master/electron/image-20200615152006370.png)

### 1.2解决方案

通过手动下载electron安装包并放置在特定文件夹下，执行打包时就会在此文件夹下寻找相应的包。

#### 1.2.1手动下载electron包

在electron相关的淘宝镜像地址下载相应版本的包：https://npm.taobao.org/mirrors/electron/

注意:下载的是两个文件，一个是`.zip`文件，另一个是`.txt`文件。

示例： **electron-v2.0.18-win32-x64.zip** 和 **SHASUMS256.txt**

下载完成后，将`SHASUMS256.txt`文件改成 `SHASUMS256.txt-2.0.18`

#### 1.2.2安装

将下载的两个文件拷入`C:\Users\xujian\AppData\Local\electron\Cache`文件夹下。

![image-20200615153438341](https://gitee.com/xuxujian/webNoteImg/raw/master/electron/image-20200615153438341.png)

#### 1.2.3打包

完成以上操作后重新执行打包命令。此时会报以下错误：

![image-20200615151714458](https://gitee.com/xuxujian/webNoteImg/raw/master/electron/image-20200615151714458.png)

这个是权限问题导致的。只需要将cmd以管理员身份运行即可进行打包成功。

## 2.Error: read ECONNRESET ，请求超时

解决：
1.修改npm镜像
你可以更换阿里镜像源，执行如下语句:

```shell
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

2.修改window系统环境变量，如下图所示。
变量名：ELECTRON_MIRROR
变量值：http://npm.taobao.org/mirrors/electron/

重启cmd后，再进行打包就可以解决read econnreset问题