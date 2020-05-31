## 1.promise简介

Promise是异步编程的一种解决方案

一般情况下是有异步操作时,使用Promise对这个异步操作进行封装

## 2.基本使用

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
      //将异步拿到的结果传递出去
      // 成功的时候调用resolve,一旦调用resolve就会调用then函数
      // resolve(‘ssss’)

      // 失败的时候调用reject
      reject('error message')
    }, 1000)
  }).then((data) => {
    // 1.在这里处理代码
  //此时的data为resolve传递出来的参数
    console.log(data);
  }).catch((err) => {
  //这里的形参err为调用reject函数传递出来的数据
    console.log(err);
  })
```

## 3.Promise三种状态

- pending：等待状态，比如正在进行网络请求，或者定时器没有到时间。
- fulfill：满足状态，当我们主动回调了`resolve`时，就处于该状态，并且会回调`.then()`
- reject：拒绝状态，当我们主动回调了`reject`时，就处于该状态，并且会回调`.catch()`

```js
//可以通过then拿到两种状态，也就是then后面调用两个函数
 new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('Hello Vuejs')
      reject('error message')
    }, 1000)
  }).then(data => {
    console.log(data);
  }, err => {
    console.log(err);
  })
```

## 4.promise的链式调用

需求：

//网络请求: aaa -> 自己处理(10行)
  // 处理: aaa111 -> 自己处理(10行)
  // 处理: aaa111222 -> 自己处理

方式1：

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(res => {
    // 1.自己处理10行代码
    console.log(res, '第一层的10行处理代码');
  
    // 2.对结果进行第一次处理
    return new Promise((resolve, reject) => {
      // resolve(res + '111')
      reject('err')
    })
  }).then(res => {
    console.log(res, '第二层的10行处理代码');
  
    return new Promise(resolve => {
      resolve(res + '222')
    })
  }).then(res => {
    console.log(res, '第三层的10行处理代码');
  }).catch(err => {
    console.log(err);
  })

```

简写：

```js
 // new Promise(resolve => resolve(结果))简写
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(res => {
    // 1.自己处理10行代码
    console.log(res, '第一层的10行处理代码');

    // 2.对结果进行第一次处理
    return Promise.resolve(res + '111')
  }).then(res => {
    console.log(res, '第二层的10行处理代码');

    return Promise.resolve(res + '222')
  }).then(res => {
    console.log(res, '第三层的10行处理代码');
  })

```

简写2：

```js
 // 省略掉Promise.resolve
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(res => {
    // 1.自己处理10行代码
    console.log(res, '第一层的10行处理代码');

    // 2.对结果进行第一次处理
    return res + '111'
  }).then(res => {
    console.log(res, '第二层的10行处理代码');

    return res + '222'
  }).then(res => {
    console.log(res, '第三层的10行处理代码');
  })
```

简写3：

```js

new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(res => {
    // 1.自己处理10行代码
    console.log(res, '第一层的10行处理代码');

    // 2.对结果进行第一次处理
    // return Promise.reject('error message')
    throw 'error message'
  }).then(res => {
    console.log(res, '第二层的10行处理代码');

    return Promise.resolve(res + '222')
  }).then(res => {
    console.log(res, '第三层的10行处理代码');
  }).catch(err => {
    console.log(err);
  })
```

## 5.同时发送两个请求处理

### 5.1使用Ajax处理

```js
 //请求一:
  let isResult1 = false
  let isResult2 = false
  $ajax({
    url: '',
    success: function () {
      console.log('结果1');
      isResult1 = true
      handleResult()
    }
  })
  // 请求二:
  $ajax({
    url: '',
    success: function () {
      console.log('结果2');
      isResult2 = true
      handleResult()
    }
  })
  
  function handleResult() {
    if (isResult1 && isResult2) {
      //此时两个请求都已完成，可以进行下一步处理
    }
  }
```

### 5.2使用promise

`Promise.all()`方法：

```js
Promise.all([
      // new Promise((resolve, reject) => {
      //   $.ajax({
      //     url: 'url1',
      //     success: function (data) {
      //       resolve(data)
      //     }
      //   })
      // }),
      // new Promise((resolve, reject) => {
      //   $.ajax({
      //     url: 'url2',
      //     success: function (data) {
      //       resolve(data)
      //     }
      //   })
      // })

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({name: 'why', age: 18})
      }, 2000)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({name: 'kobe', age: 19})
      }, 1000)
    })
  ]).then(results => {
    console.log(results);
  })
```

