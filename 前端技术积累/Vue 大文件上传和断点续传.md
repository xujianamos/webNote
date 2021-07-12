# 一.文件上传的 2 套方案

## 1.1基于文件流（form-data）

element-ui 框架的上传组件，就是默认基于文件流的。

- 数据格式：form-data；
- 传递的数据： file 文件流信息；filename 文件名字

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f0571a78a6c4c7584d3358c84fe8a40~tplv-k3u1fbpfcp-watermark.image)

## 1.2客户端把文件转换为 base64

通过 `fileRead.readAsDataURL(file)` 转为 base64 字符串后，要用 `encodeURIComponent` 编译再发送， 发送的数据经由 `qs.stringify` 处理，请求头添加 `"Content-Type": "application/x-www-form-urlencoded"`

# 二.大文件上传

首先借助 element-ui 搭建下页面。因为要自定义一个上传的实现，所以 `el-upload` 组件的 `auto-upload` 要设定为 `false`；`action` 为必选参数，此处可以不填值。

```html
<template>
  <div id="app">
    <!-- 上传组件 -->
    <el-upload action drag :auto-upload="false" :show-file-list="false" :on-change="handleChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">大小不超过 200M 的视频</div>
    </el-upload>

    <!-- 进度显示 -->
    <div class="progress-box">
      <span>上传进度：{{ percent.toFixed() }}%</span>
      <el-button type="primary" size="mini" @click="handleClickBtn">{{ upload | btnTextFilter}}</el-button>
    </div>

    <!-- 展示上传成功的视频 -->
    <div v-if="videoUrl">
      <video :src="videoUrl" controls />
    </div>
  </div>
</template>
```

## 2.1获取到文件对象并转成 ArrayBuffer 对象

转成 ArrayBuffer 是因为后面要用 SparkMD5 这个库生成 hash 值，对文件进行命名

```js
async handleChange(file) {
  const fileObj = file.raw
  try{
    const buffer = await this.fileToBuffer(fileObj)
    console.log(buffer)
  }catch(e){
    console.log(e)
  }
}
```

打印 buffer 结果如下图

![image (1).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/844f77596459487b98a92f40376d7e88~tplv-k3u1fbpfcp-watermark.image)

注意：before-upload 函数和 on-change 函数的参数都有 file，但是 on-change 中的 file 不是 File 对象，要获取File 对象需要通过 file.raw。 这里用到 FileReader 类将 File 对象转 ArrayBuffer 对象，因为是异步过程，所以用 Promise 封装:

```js
// 将 File 对象转为 ArrayBuffer 
fileToBuffer(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = e => {
      resolve(e.target.result)
    }
    fr.readAsArrayBuffer(file)
    fr.onerror = () => {
      reject(new Error('转换文件格式发生错误'))
    }
  })
}
```

## 2.2创建切片

可以通过固定大小或是固定数量把一个文件分成好几个部分，为了避免由于 js 使用的 IEEE754 二进制浮点数算术标准可能导致的误差，我决定用固定大小的方式对文件进行切割，设定每个切片的大小为 2M，即 2M = 2*1024KB = 2*1024*1024B = 2097152B。切割文件用到的是 `Blob.slice()`

```js
// 将文件按固定大小（2M）进行切片，注意此处同时声明了多个常量
const chunkSize = 2097152,
  chunkList = [], // 保存所有切片的数组
  chunkListLength = Math.ceil(fileObj.size / chunkSize), // 计算总共多个切片
  suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1] // 文件后缀名
  
// 根据文件内容生成 hash 值
const spark = new SparkMD5.ArrayBuffer()
spark.append(buffer)
const hash = spark.end()

// 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
let curChunk = 0 // 切片时的初始位置
for (let i = 0; i < chunkListLength; i++) {
  const item = {
    chunk: fileObj.slice(curChunk, curChunk + chunkSize),
    fileName: `${hash}_${i}.${suffix}` // 文件名规则按照 hash_1.jpg 命名
  }
  curChunk += chunkSize
  chunkList.push(item)
}
console.log(chunkList)
```

选择一个文件后将打印得到诸如下图的结果

![image (2).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8512dba908924dddafebbbc7c256066a~tplv-k3u1fbpfcp-watermark.image)

## 2.3发送请求

发送请求可以是并行的或是串行的，这里选择串行发送。每个切片都新建一个请求，为了能实现断点续传，我们将请求封装到函数 `fn` 里，用一个数组 `requestList` 来保存请求集合，然后封装一个 `send` 函数，用于请求发送，这样一旦按下暂停键，可以方便的终止上传，代码如下：

```js
sendRequest() {
  const requestList = [] // 请求集合
  this.chunkList.forEach(item => {
    const fn = () => {
      const formData = new FormData()
      formData.append('chunk', item.chunk)
      formData.append('filename', item.fileName)
      return axios({
        url: '/single3',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(res => {
        if (res.data.code === 0) { // 成功
          if (this.percentCount === 0) {
            this.percentCount = 100 / this.chunkList.length
          }
          this.percent += this.percentCount // 改变进度
        }
      })
    }
    requestList.push(fn)
  })
  
  let i = 0 // 记录发送的请求个数
  const send = async () => {
    // if ('暂停') return
    if (i >= requestList.length) {
      // 发送完毕
      return
    } 
    await requestList[i]()
    i++
    send()
  }
  send() // 发送请求
},
```

axios 部分也可以直接写成下面这种形式：

```js
axios.post('/single3', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

## 所有切片发送成功后

根据后端接口需要再发送一个 get 请求并把文件的 hash 值传给服务器，我们定义一个 `complete` 方法来实现，这里假定发送的为视频文件

```js
const complete = () => {
  axios({
    url: '/merge',
    method: 'get',
    params: { hash: this.hash }
  }).then(res => {
    if (res.data.code === 0) { // 请求发送成功
      this.videoUrl = res.data.path
    }
  })
}
```

这样就能在文件发送成功后在页面浏览到发送的视频了。

# 三.断点续传

首先是暂停按钮文字的处理，用了一个过滤器，如果 `upload` 值为 `true` 则显示“暂停”，否则显示“继续”：

```js
filters: {
  btnTextFilter(val) {
    return val ? '暂停' : '继续'
  }
}
```

当按下暂停按钮，触发 `handleClickBtn` 方法

```js
handleClickBtn() {
  this.upload = !this.upload
  // 如果不暂停则继续上传
  if (this.upload) this.sendRequest()
}
```

在发送切片的 `send` 方法的开头添加 `if (!this.upload) return`，这样只要 `upload` 这个变量为 `false` 就不会继续上传了。为了在暂停完后可以继续发送，需要在每次成功发送一个切片后将这个切片从 `chunkList` 数组里删除 `this.chunkList.splice(index, 1)`

# 四.代码汇总

```js
<template>
  <div id="app">
    <!-- 上传组件 -->
    <el-upload action drag :auto-upload="false" :show-file-list="false" :on-change="handleChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">大小不超过 200M 的视频</div>
    </el-upload>

    <!-- 进度显示 -->
    <div class="progress-box">
      <span>上传进度：{{ percent.toFixed() }}%</span>
      <el-button type="primary" size="mini" @click="handleClickBtn">{{ upload | btnTextFilter}}</el-button>
    </div>

    <!-- 展示上传成功的视频 -->
    <div v-if="videoUrl">
      <video :src="videoUrl" controls />
    </div>
  </div>
</template>

<script>
  import SparkMD5 from "spark-md5"
  import axios from "axios"
  
  export default {
    name: 'App3',
    filters: {
      btnTextFilter(val) {
        return val ? '暂停' : '继续'
      }
    },
    data() {
      return {
        percent: 0,
        videoUrl: '',
        upload: true,
        percentCount: 0
      }
    },
    methods: {
      async handleChange(file) {
        if (!file) return
        this.percent = 0
        this.videoUrl = ''
        // 获取文件并转成 ArrayBuffer 对象
        const fileObj = file.raw
        let buffer
        try {
          buffer = await this.fileToBuffer(fileObj)
        } catch (e) {
          console.log(e)
        }
        
        // 将文件按固定大小（2M）进行切片，注意此处同时声明了多个常量
        const chunkSize = 2097152,
          chunkList = [], // 保存所有切片的数组
          chunkListLength = Math.ceil(fileObj.size / chunkSize), // 计算总共多个切片
          suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1] // 文件后缀名
          
        // 根据文件内容生成 hash 值
        const spark = new SparkMD5.ArrayBuffer()
        spark.append(buffer)
        const hash = spark.end()

        // 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
        let curChunk = 0 // 切片时的初始位置
        for (let i = 0; i < chunkListLength; i++) {
          const item = {
            chunk: fileObj.slice(curChunk, curChunk + chunkSize),
            fileName: `${hash}_${i}.${suffix}` // 文件名规则按照 hash_1.jpg 命名
          }
          curChunk += chunkSize
          chunkList.push(item)
        }
        this.chunkList = chunkList // sendRequest 要用到
        this.hash = hash // sendRequest 要用到
        this.sendRequest()
      },
      
      // 发送请求
      sendRequest() {
        const requestList = [] // 请求集合
        this.chunkList.forEach((item, index) => {
          const fn = () => {
            const formData = new FormData()
            formData.append('chunk', item.chunk)
            formData.append('filename', item.fileName)
            return axios({
              url: '/single3',
              method: 'post',
              headers: { 'Content-Type': 'multipart/form-data' },
              data: formData
            }).then(res => {
              if (res.data.code === 0) { // 成功
                if (this.percentCount === 0) { // 避免上传成功后会删除切片改变 chunkList 的长度影响到 percentCount 的值
                  this.percentCount = 100 / this.chunkList.length
                }
                this.percent += this.percentCount // 改变进度
                this.chunkList.splice(index, 1) // 一旦上传成功就删除这一个 chunk，方便断点续传
              }
            })
          }
          requestList.push(fn)
        })
        
        let i = 0 // 记录发送的请求个数
        // 文件切片全部发送完毕后，需要请求 '/merge' 接口，把文件的 hash 传递给服务器
        const complete = () => {
          axios({
            url: '/merge',
            method: 'get',
            params: { hash: this.hash }
          }).then(res => {
            if (res.data.code === 0) { // 请求发送成功
              this.videoUrl = res.data.path
            }
          })
        }
        const send = async () => {
          if (!this.upload) return
          if (i >= requestList.length) {
            // 发送完毕
            complete()
            return
          } 
          await requestList[i]()
          i++
          send()
        }
        send() // 发送请求
      },
      
      // 按下暂停按钮
      handleClickBtn() {
        this.upload = !this.upload
        // 如果不暂停则继续上传
        if (this.upload) this.sendRequest()
      },
      
      // 将 File 对象转为 ArrayBuffer 
      fileToBuffer(file) {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = e => {
            resolve(e.target.result)
          }
          fr.readAsArrayBuffer(file)
          fr.onerror = () => {
            reject(new Error('转换文件格式发生错误'))
          }
        })
      }
    }
  }
</script>

<style scoped>
  .progress-box {
    box-sizing: border-box;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 8px 10px;
    background-color: #ecf5ff;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
```

效果如下图：

![GIF 2021-6-19 15-31-43.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/096e0ddfa3344e1cb62b467021a1741e~tplv-k3u1fbpfcp-watermark.image)

