## 1.一键重新发起请求

在与后端接口联调或排查线上BUG时，你是不是也经常听到他们说这句话：**你再发起一次请求试试，我这边看下为啥出错了！**

重发请求，这有一种简单到发指的方式。

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择要重新发送的请求
4. 右键选择`Replay XHR`

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e056245b2a9e4e6dbfb39db6903f9275~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 2.在控制台快速发起请求

还是联调或修BUG的场景，针对同样的请求，有时候需要**修改入参**重新发起，有啥快捷方式？

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择`Copy as fetch`
4. 控制台粘贴代码
5. 修改参数，回车搞定

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f91af146bbee42cc9e99badf83de83a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 3.复制JavaScript变量

假如你的代码经过计算会输出一个**复杂的对象**，且需要被复制下来发送给其他人，怎么办？

1. 使用`copy`函数，将`对象`作为入参执行即可

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8eac65d357c04a779149719621f477c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 4. 控制台获取Elements面板选中的元素

调试网页时通过`Elements`面板选中元素后，如果想通过`JS`知道它的一些属性，如`宽`、`高`、`位置`等怎么办呢？

1. 通过`Elements`选择要调试的元素
2. 控制台直接用`$0`访问

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fd8a970c19842a7b73ee5d43f64efa6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 5.截取一张全屏的网页

偶尔咱们也会有对网页截屏的需求，一屏还好，系统自带的截屏或者微信截图等都可以办到，但是要求**将超出一屏的内容也截下来咋办呢**？

1. 准备好需要截屏的内容
2. `cmd + shift + p` 执行`Command`命令
3. 输入`Capture full size screenshot` 按下回车

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44643079db90418d8d359d4278605732~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

**如果要截取选中的部分元素呢？**

答案也很简单，第三步输入`Capture node screenshot`即可

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3835874255224edbbd98977a1727ca7e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 6. 一键展开所有DOM元素

调试元素时，在层级比较深的情况下，你是不是也经常一个个展开去调试？有一种更加快捷的方式

1. 按住`opt`键 + click（需要展开的最外层元素）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c09ba071e1e34b9387ee0071905ad21a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 7.控制台引用上一次执行的结果

来看看这个场景，我猜你也一定遇到过, 对某个字符串进行了各种工序，然后我们想知道每一步执行的结果，该咋办？。

```js
'fatfish'.split('').reverse().join('') // hsiftaf
```

**你可能会这样做**

```js
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
['f', 'a', 't', 'f', 'i', 's', 'h'].reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
['h', 's', 'i', 'f', 't', 'a', 'f'].join('') // hsiftaf
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10903c73ac3945e39e820bdbef2be2a3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

**更简单的方式**

使用`$_`引用上一次操作的结果，不用每次都复制一遍

```js
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
$_.reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
$_.join('') // hsiftaf
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b259e40d2d1e4d489058019617e7ac6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 8.快速切换主题

有的同学喜欢chrome的白色主题，有的喜欢黑色，我们可以使用快捷键迅速切换两个主题。

1. `cmd + shift + p` 执行`Command`命令
2. 输入`Switch to dark theme`或者`Switch to light theme`进行主题切换

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6626dd2efcf4fafb01fb354275c5c33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 9.`$i`直接在控制台安装npm包

你遇到过这个场景吗？有时候想使用比如`dayjs`或者`lodash`的某个`API`，但是又不想去官网查，如果可以在控制台直接试出来就好了。

[Console Importer](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fconsole-importer%2Fhgajpakhafplebkdljleajgbpdmplhie%2Frelated) 就是这么一个插件，用来在控制台直接安装`npm`包。

1. 安装`Console Importer`插件
2. $i('name')安装npm包

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/980db6a2b2d74115bdab37e5b061a7a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)
