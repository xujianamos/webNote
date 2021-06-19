FileSaver.js 是在客户端保存文件的解决方案，非常适合在客户端上生成文件的 Web 应用程序。它简单易用且兼容大多数浏览器，被作为项目依赖应用在 6.3 万的项目中。在近期的项目中，阿宝哥再一次使用到了它，所以就想写篇文章来聊一聊这个优秀的开源项目。

# 一、FileSaver.js 简介

`FileSaver.js` 是 HTML5 的 `saveAs()` `FileSaver` 实现。它支持大多数主流的浏览器，其兼容性如下图所示：

## 1.1 saveAs API

```js
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

saveAs 方法支持三个参数，第一个参数表示它支持 `Blob/File/Url` 三种类型，第二个参数表示文件名（可选），而第三个参数表示配置对象（可选）。如果你需要 FlieSaver.js 自动提供 Unicode 文本编码提示（参考：字节顺序标记），则需要设置 `{ autoBom: true}`。

## 1.2 保存文本

```js
let blob = new Blob(["大家好，我是阿宝哥!"], { type: "text/plain;charset=utf-8" });
FileSaver.saveAs(blob, "hello.txt");
```

## 1.3 保存线上资源

```js
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

如果下载的 URL 地址与当前站点是同域的，则将使用 `a[download]` 方式下载。否则，会先使用 **同步的 HEAD 请求** 来判断是否支持 CORS 机制，若支持的话，将进行数据下载并使用 Blob URL 实现文件下载。如果不支持 CORS 机制的话，将会尝试使用 `a[download]` 方式下载。

标准的 W3C File API Blob 接口并非在所有浏览器中都可用，对于这个问题，你可以考虑使用 Blob.js 来解决兼容性问题。

## 1.4 保存 Canvas 画布内容

```js
let canvas = document.getElementById("my-canvas");
canvas.toBlob(function(blob) {
  saveAs(blob, "abao.png");
});
```

需要注意的是 `canvas.toBlob()` 方法并非在所有浏览器中都可用，对于这个问题，你可以考虑使用 canvas-toBlob.js 来解决兼容性问题。

在以上的示例中，我们多次见到 Blob 的身影，因此在介绍 FileSaver.js 源码时，先来简单介绍一下 Blob 的相关知识。

# 二、Blob 简介

Blob（Binary Large Object）表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。**在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。**

## 2.1 Blob 构造函数

`Blob` 由一个可选的字符串 `type`（通常是 MIME 类型）和 `blobParts` 组成：

![图片](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/640-20210620005323886)

> MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展类型，是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。
>
> 常见的 MIME 类型有：超文本标记语言文本 .html text/html、PNG 图像 .png image/png、普通文本 .txt text/plain 等。

在 JavaScript 中我们可以通过 Blob 的构造函数来创建 Blob 对象，Blob 构造函数的语法如下：

```js
var aBlob = new Blob(blobParts, options);
```

相关的参数说明如下：

- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。

- options：一个可选的对象，包含以下两个属性：

- - type —— 默认值为 `""`，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
  - endings —— 默认值为 `"transparent"`，用于指定包含行结束符 `\n` 的字符串如何被写入。它是以下两个值中的一个：`"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持 blob 中保存的结束符不变。

介绍完 Blob 之后，我们再来介绍一下 Blob URL。

## 2.2 Blob URL

Blob URL/Object URL 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。在浏览器中，我们使用 `URL.createObjectURL` 方法来创建 Blob URL，该方法接收一个 `Blob` 对象，并为其创建一个唯一的 URL，其形式为 `blob:<origin>/<uuid>`，对应的示例如下：

```
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

浏览器内部为每个通过 `URL.createObjectURL` 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 较短，但可以访问 `Blob`。生成的 URL 仅在当前文档打开的状态下才有效。它允许引用 `<img>`、`<a>` 中的 `Blob`，但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。

上述的 Blob URL 看似很不错，但实际上它也有副作用。**虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放**。但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

针对这个问题，我们可以调用 `URL.revokeObjectURL(url)` 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。

# 三、FileSaver.js 源码解析

在 FileSaver.js 内部提供了三种方案来实现文件保存，因此接下来我们将分别来介绍这三种方案。

## 3.1 方案一

当 FileSaver.js 在保存文件时，如果当前平台中 a 标签支持 `download` 属性且非 MacOS WebView 环境，则会优先使用 `a[download]` 来实现文件保存。在具体使用过程中，我们是通过调用 `saveAs` 方法来保存文件，该方法的定义如下：

```
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

通过观察 saveAs 方法的签名，我们可知该方法支持字符串和 Blob 两种类型的参数，因此在 saveAs 方法内部需要分别处理这两种类型的参数，下面我们先来分析字符串参数的情形。

##### 3.1.1 字符串类型参数

在前面的示例中，我们演示了如何利用 `saveAs` 方法来保存线上的图片：

```
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

在方案一中，`saveAs` 方法的处理逻辑如下所示：

```
// Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
function saveAs(blob, name, opts) {
  var URL = _global.URL || _global.webkitURL;
  var a = document.createElement("a");
  name = name || blob.name || "download";

  a.download = name;
  a.rel = "noopener";

  if (typeof blob === "string") {
    a.href = blob;
    if (a.origin !== location.origin) { // (1)
      corsEnabled(a.href)
        ? download(blob, name, opts)
        : click(a, (a.target = "_blank"));
    } else { // (2)
      click(a);
    }
  } else {
    // 省略处理Blob类型参数
  }
}
```

在以上代码中，如果发现下载资源的 URL 地址与当前站点是非同域的，则会先使用 **同步的 HEAD 请求** 来判断是否支持 CORS 机制，若支持的话，就会调用 `download` 方法进行文件下载。首先我们先来分析 `corsEnabled` 方法：

```
function corsEnabled(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e) {}
  return xhr.status >= 200 && xhr.status <= 299;
}
```

`corsEnabled` 方法的实现很简单，就是通过 `XMLHttpRequest` API 发起一个同步的 HEAD 请求，然后判断返回的状态码是否在 **[200 ~ 299]** 的范围内。接着我们来看一下 `download` 方法的具体实现：

```
function download(url, name, opts) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function () {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function () {
    console.error("could not download file");
  };
  xhr.send();
}
```

同样 `download` 方法的实现也很简单，也是通过 XMLHttpRequest API 来发起 HTTP 请求，与大家熟悉的  JSON 格式不同的是，我们需要设置 `responseType` 的类型为 `blob`。此外，因为返回的结果是 blob 类型的数据，所以在成功回调函数内部会继续调用 `saveAs` 方法来实现文件保存。

而对于不支持 CORS 机制或同域的情形，它会调用内部的 `click` 方法来完成下载功能，该方法的具体实现如下：

```
// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click", true, true, window, 0, 0, 0, 80, 20, 
      false, false, false, false, 0, null
    );
    node.dispatchEvent(evt);
  }
}
```

在 `click` 方法内部，会优先调用 node 对象上的 `dispatchEvent` 方法来派发 `click` 事件。当出现异常的时候，会在 `catch` 语句进行相应的异常处理，`catch` 语句中的 MouseEvent.initMouseEvent() 方法用于初始化鼠标事件的值。**但需要注意的是，该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性**。

##### 3.1.2 blob 类型参数

同样，在前面的示例中，我们演示了如何利用 `saveAs` 方法来保存 Blob 类型数据：

```
let blob = new Blob(["大家好，我是阿宝哥!"], { type: "text/plain;charset=utf-8" });
FileSaver.saveAs(blob, "hello.txt");
```

blob 类型参数的处理逻辑，被定义在 `saveAs` 方法体的 else 分支中：

```
// Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
function saveAs(blob, name, opts) {
  var URL = _global.URL || _global.webkitURL;
  var a = document.createElement("a");
  name = name || blob.name || "download";

  a.download = name;
  a.rel = "noopener";

  if (typeof blob === "string") {
     // 省略处理字符串类型参数
  } else {
    a.href = URL.createObjectURL(blob);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 4e4); // 40s
    setTimeout(function () {
      click(a);
    }, 0);
  }
}
```

对于 blob 类型的参数，首先会通过 `createObjectURL` 方法来创建 Object URL，然后在通过 `click` 方法执行文件保存。为了能及时释放内存，在 else 处理分支中，会启动一个定时器来执行清理操作。此时，方案一我们已经介绍完了，接下去要介绍的方案二主要是为了兼容 IE 浏览器。

#### 3.2 方案二

在 Internet Explorer 10 浏览器中，msSaveBlob 和 msSaveOrOpenBlob 方法允许用户在客户端上保存文件，其中 msSaveBlob 方法只提供一个保存按钮，而 `msSaveOrOpenBlob` 方法提供了保存和打开按钮，对应的使用方式如下所示：

```
window.navigator.msSaveBlob(blobObject, 'msSaveBlob_hello.txt');
window.navigator.msSaveOrOpenBlob(blobObject, 'msSaveBlobOrOpenBlob_hello.txt');
```

了解完上述的知识和方案一中介绍的 `corsEnabled`、`download` 和 `click` 方法后，再来看方案二的代码，就很清晰明了。

在满足 `"msSaveOrOpenBlob" in navigator` 条件时， FileSaver.js 会使用方案二来实现文件保存。跟前面一样，我们先来分析 **字符串类型参数** 的处理逻辑。

##### 3.2.1 字符串类型参数

```
// Use msSaveOrOpenBlob as a second approach
function saveAs(blob, name, opts) {
  name = name || blob.name || "download";
  if (typeof blob === "string") {
    if (corsEnabled(blob)) { // 判断是否支持CORS
      download(blob, name, opts);
    } else {
      var a = document.createElement("a");
      a.href = blob;
      a.target = "_blank";
      setTimeout(function () {
        click(a);
      });
    }
  } else {
    // 省略处理Blob类型参数
  }
}
```

##### 3.2.2 blob 类型参数

```
// Use msSaveOrOpenBlob as a second approach
function saveAs(blob, name, opts) {
  name = name || blob.name || "download";
  if (typeof blob === "string") {
    // 省略处理字符串类型参数
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name); // 提供了保存和打开按钮
  }
}
```

#### 3.3 方案三

如果方案一和方案二都不支持的话，FileSaver.js 就会降级使用 FileReader API 和 open API 新开窗口来实现文件保存。

##### 3.3.1 字符串类型参数

```
// Fallback to using FileReader and a popup
function saveAs(blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only available on user interaction and the fileReader is async so...
  popup = popup || open("", "_blank");
  if (popup) {
    popup.document.title = popup.document.body.innerText = "downloading...";
  }

  if (typeof blob === "string") return download(blob, name, opts);
 // 处理Blob类型参数
}
```

##### 3.3.2 blob 类型参数

对于 blob 类型的参数来说，在 saveAs 方法内部会根据不同的环境选用不同的方案，比如在 Safari 浏览器环境中，它会利用 FileReader API 先把 Blob 对象转换为 Data URL，然后再把该 Data URL 地址赋值给新开的窗口或当前窗口的 `location` 对象，具体的代码如下：

```
// Fallback to using FileReader and a popup
function saveAs(blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only available on user interaction and the fileReader is async so...
  popup = popup || open("", "_blank");
  if (popup) { // 设置新开窗口的标题
    popup.document.title = popup.document.body.innerText = "downloading...";
  }

  if (typeof blob === "string") return download(blob, name, opts);

  var force = blob.type === "application/octet-stream"; // 二进制流数据
  var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

  if (
    (isChromeIOS || (force && isSafari) || isMacOSWebView) &&
    typeof FileReader !== "undefined"
  ) {
    // Safari doesn't allow downloading of blob URLs
    var reader = new FileReader();
    reader.onloadend = function () {
      var url = reader.result;
      url = isChromeIOS
        ? url
        : url.replace(/^data:[^;]*;/, "data:attachment/file;"); // 处理成附件的形式
      if (popup) popup.location.href = url;
      else location = url;
      popup = null; // reverse-tabnabbing #460
    };
    reader.readAsDataURL(blob);
  } else {
    // 省略Object URL的处理逻辑
  }
}
```

其实对于 FileReader API 来说，除了支持把 File/Blob 对象转换为 Data URL 之外，它还提供了 `readAsArrayBuffer()` 和 `readAsText()` 方法，用于把 File/Blob 对象转换为其它的数据格式。

在 [玩转前端二进制](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247485357&idx=1&sn=97f2ac5a7a3ab5b9033fc934c6a0ae14&scene=21#wechat_redirect) 文章中，阿宝哥详细介绍了 FileReader API 在前端图片处理场景中的应用，阅读完该文章之后，你们将能轻松看懂以下转换关系图：

![图片](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/640-20210620005629910)

最后我们再来看一下 else 分支的代码：

```
function saveAs(blob, name, opts, popup) {
  popup = popup || open("", "_blank");
  if (popup) {
    popup.document.title = popup.document.body.innerText = "downloading...";
  }

  // 处理字符串类型参数
  if (typeof blob === "string") return download(blob, name, opts);

  if (
    (isChromeIOS || (force && isSafari) || isMacOSWebView) &&
    typeof FileReader !== "undefined"
  ) {
    // 省略FileReader API处理逻辑
  } else {
    var URL = _global.URL || _global.webkitURL;
    var url = URL.createObjectURL(blob);
    if (popup) popup.location = url;
    else location.href = url;
    popup = null; // reverse-tabnabbing #460
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 4e4); // 40s
  }
}
```

在实际项目中，如果你需要保存超过 blob 大小限制的超大文件，或者没有足够的内存空间，你可以考虑使用更高级的 StreamSaver.js 库来实现文件保存功能。