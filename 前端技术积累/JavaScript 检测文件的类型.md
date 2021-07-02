在日常工作中，文件上传是一个很常见的功能。在某些情况下，我们希望能限制文件上传的类型，比如限制只能上传 PNG 格式的图片。针对这个问题，我们会想到通过 `input` 元素的 `accept` 属性来限制上传的文件类型：

```html
<input type="file" id="inputFile" accept="image/png" />
```

这种方案虽然可以满足大多数场景，但如果用户把

# 一.如何区分图片的类型

**计算机并不是通过图片的后缀名来区分不同的图片类型，而是通过 “魔数”（Magic Number）来区分。** 对于某一些类型的文件，起始的几个字节内容都是固定的，根据这几个字节的内容就可以判断文件的类型。

常见图片类型对应的魔数如下表所示：

| 文件类型 | 文件后缀 | 魔数                      |
| -------- | -------- | ------------------------- |
| JPEG     | jpg/jpeg | 0xFF D8 FF                |
| PNG      | png      | 0x89 50 4E 47 0D 0A 1A 0A |
| GIF      | gif      | 0x47 49 46 38（GIF8）     |
| BMP      | bmp      | 0x42 4D                   |

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00b4bc360a64bc39853631ad614c200~tplv-k3u1fbpfcp-zoom-1.image)

由上图可知，PNG 类型的图片前 8 个字节是 **0x89 50 4E 47 0D 0A 1A 0A**。当你把 `abao.png` 文件修改为 `abao.jpeg` 后，再用编辑器打开查看图片的二进制内容，你会发现文件的前 8 个字节还是保持不变。但如果使用 `input[type="file"]` 输入框的方式来读取文件信息的话，将会输出以下结果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dfd93c6de354e53b0a796a34d7f4432~tplv-k3u1fbpfcp-zoom-1.image)

很明显通过 **文件后缀名或文件的 MIME 类型** 并不能识别出正确的文件类型。





# 二.如何检测图片的类型

#### 2.1 定义 readBuffer 函数

在获取文件对象后，我们可以通过 FileReader API 来读取文件的内容。因为我们并不需要读取文件的完整信息，所以阿宝哥封装了一个 `readBuffer` 函数，用于读取文件中指定范围的二进制数据。

```javascript
function readBuffer(file, start = 0, end = 2) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(start, end));
  });
}
```

对于 PNG 类型的图片来说，该文件的前 8 个字节是 **0x89 50 4E 47 0D 0A 1A 0A**。因此，我们在检测已选择的文件是否为 PNG 类型的图片时，只需要读取前 8 个字节的数据，并逐一判断每个字节的内容是否一致。

#### 2.2 定义 check 函数

为了实现逐字节比对并能够更好地实现复用，阿宝哥定义了一个 `check` 函数：

```javascript
function check(headers) {
  return (buffers, options = { offset: 0 }) =>
    headers.every(
      (header, index) => header === buffers[options.offset + index]
    );
}
```

#### 2.3 检测 PNG 图片类型

基于前面定义的 `readBuffer` 和 `check` 函数，我们就可以实现检测 PNG 图片的功能：

##### 2.3.1 html 代码

```html
<div>
   选择文件：<input type="file" id="inputFile" accept="image/*"
              onchange="handleChange(event)" />
   <p id="realFileType"></p>
</div>
```

##### 2.3.2 JS 代码

```javascript
const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]); // PNG图片对应的魔数
const realFileElement = document.querySelector("#realFileType");

async function handleChange(event) {
  const file = event.target.files[0];
  const buffers = await readBuffer(file, 0, 8);
  const uint8Array = new Uint8Array(buffers);
  realFileElement.innerText = `${file.name}文件的类型是：${
    isPNG(uint8Array) ? "image/png" : file.type
  }`;
}
```

以上示例成功运行后，对应的检测结果如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebc0f907780145f1838cb25eef8979db~tplv-k3u1fbpfcp-zoom-1.image)

由上图可知，我们已经可以成功地检测出正确的图片格式。如果你要检测 JPEG 文件格式的话，你只需要定义一个 `isJPEG` 函数：

```javascript
const isJPEG = check([0xff, 0xd8, 0xff])
```

在实际工作中，遇到的文件类型是多种多样的，针对这种情形，你可以使用现成的第三库来实现文件检测的功能，比如 [file-type](https://github.com/sindresorhus/file-type#readme) 这个库。