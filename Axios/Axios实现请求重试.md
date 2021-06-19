请求超时的时候，我们希望能自动重新发起请求进行重试操作，从而完成对应的操作。

# 一、拦截器实现请求重试的方案

在 Axios 中设置拦截器很简单，通过 `axios.interceptors.request` 和 `axios.interceptors.response` 对象提供的 `use` 方法，就可以分别设置请求拦截器和响应拦截器：

```js
export interface AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

export interface AxiosInterceptorManager<V> {
  use(onFulfilled?: (value: V) => V | Promise<V>, 
    onRejected?: (error: any) => any): number;
  eject(id: number): void;
}
```

对于请求重试的功能来说，我们希望让用户不仅能够设置重试次数，而且可以设置重试延时时间。当请求失败的时候，若该请求的配置对象配置了重试次数，而 Axios 就会重新发起请求进行重试操作。为了能够全局进行请求重试，接下来我们在响应拦截器上来实现请求重试功能，具体代码如下所示：

```js
axios.interceptors.response.use(null, (err) => {
  let config = err.config;
  if (!config || !config.retryTimes) return Promise.reject(err);
  const { __retryCount = 0, retryDelay = 300, retryTimes } = config;
  // 在请求对象上设置重试次数
  config.__retryCount = __retryCount;
  // 判断是否超过了重试次数
  if (__retryCount >= retryTimes) {
    return Promise.reject(err);
  }
  // 增加重试次数
  config.__retryCount++;
  // 延时处理
  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, retryDelay);
  });
  // 重新发起请求
  return delay.then(function () {
    return axios(config);
  });
});
```

以上的代码并不会复杂，对应的处理流程如下图所示：

![img](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/d248bd368fd145a0b4e0a8bee7c66541~tplv-k3u1fbpfcp-zoom-1.image)

# 二、适配器实现请求重试的方案

通过增强默认的 Axios 适配器来实现请求重试的功能。

在介绍如何增强默认适配器之前，我们先来看一下 Axios 内置的 `xhrAdapter` 适配器，它被定义在 `lib/adapters/xhr.js` 文件中：

```js
// lib/adapters/xhr.js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    var request = new XMLHttpRequest();
    // 省略大部分代码
    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() { ... }

    // Send the request
    request.send(requestData);
  });
};
```

很明显 `xhrAdapter` 适配器是一个函数对象，它接收一个 `config` 参数并返回一个 `Promise` 对象。而在 `xhrAdapter` 适配器内部，最终会使用 `XMLHttpRequest` API 来发送 HTTP 请求。为了实现请求重试的功能，我们就可以考虑通过高阶函数来增强 `xhrAdapter` 适配器的功能。

## 2.1 定义 retryAdapterEnhancer 函数

为了让用户能够更灵活地控制请求重试的功能，我们定义了一个 `retryAdapterEnhancer` 函数，该函数支持两个参数：

- adapter：预增强的 Axios 适配器对象；
- options：缓存配置对象，该对象支持  2 个属性，分别用于配置不同的功能：
  - times：全局设置请求重试的次数；
  - delay：全局设置请求延迟的时间，单位是 ms。

了解完 `retryAdapterEnhancer` 函数的参数之后，我们来看一下该函数的具体实现：

```js
function retryAdapterEnhancer(adapter, options) {
  const { times = 0, delay = 300 } = options;

  return async (config) => {
    const { retryTimes = times, retryDelay = delay } = config;
    let __retryCount = 0;
    const request = async () => {
      try {
        return await adapter(config);
      } catch (err) {
        // 判断是否进行重试
        if (!retryTimes || __retryCount >= retryTimes) {
          return Promise.reject(err);
        }
        __retryCount++; // 增加重试次数
        // 延时处理
        const delay = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, retryDelay);
         });
         // 重新发起请求
         return delay.then(() => {
           return request();
         });
        }
      };
   return request();
  };
}
```

以上的代码并不会复杂，核心的处理逻辑如下图所示：

![img](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/a7b2d97dde104c01ac025525f65ad6bb~tplv-k3u1fbpfcp-zoom-1.image)

## 2.2 使用 retryAdapterEnhancer 函数

### 2.2.1 创建 Axios 对象并配置 adapter 选项

```js
const http = axios.create({
  baseURL: "http://localhost:3000/",
  adapter: retryAdapterEnhancer(axios.defaults.adapter, {
    retryDelay: 1000,
  }),
});
```

### 2.2.2 使用 http 对象发送请求

```js
// 请求失败不重试
function requestWithoutRetry() {
  http.get("/users");
}

// 请求失败重试
function requestWithRetry() {
  http.get("/users", { retryTimes: 2 });
}
```

