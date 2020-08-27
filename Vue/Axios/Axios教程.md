## 1.简介

`Axios` 是一个基于 `promise` 的 `HTTP` 库，可以用在==浏览器==和 `node.js` 中。

### 1.1特性

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- ==自动转换 JSON 数据==
- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### 1.2安装

使用 npm:

```bash
npm install axios --save
```

使用 cdn:

```bash
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### 1.3案例

#### 1.3.1执行 `GET` 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
  //返回的是promise，因此可以通过then拿到成功参数
  //通过then拿到正确结果
    console.log(response);
  })
  .catch(function (error) {
  //通过catch拿到错误
    console.log(error);
  });

// 上面的请求也可以这样做：动态传递参数
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
//还可以使用下面这种方式
axios({
  //默认情况下是get请求
  url: 'http://123.207.32.32:8000/home/data',
  // 专门针对get请求的参数拼接
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})
```

#### 1.3.2执行 `POST` 请求

注意与`get`请求参数传递方式区分

```js

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### 1.3.3执行多个==并发==请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  	 //谁先返回结果，谁就是第一个参数？
  }));
```

示例2：

```js
//同时发送两个请求
axios.all([
  //第一个请求
  axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}), 
  //第二个请求
  axios({
  url: 'http://123.207.32.32:8000/home/data',
  params: {
    type: 'sell',
    page: 5
  }
})
]).then(results => {
  //同时拿到两个请求的返回结果
  console.log(results);
  console.log(results[0]);//拿第一个数据
  console.log(results[1]);//拿第二个数据
})
```

通过`axios.spread()`方法拿到并发请求返回的结果

```js
axios.all([
  axios({
  url: '/home/multidata'
}), 
  axios({
  url: '/home/data',
  params: {
    type: 'sell',
    page: 5
  }
})
]).then(axios.spread((res1, res2) => {//通过spread方法拿到两个结果
  console.log(res1);
  console.log(res2);
}))
```



### 1.4axios API

以通过向 `axios` 传递相关配置来创建请求

#### 1.4.1  axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

```

```js
// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

#### 1.4.2  axios(url[, config])

```js
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

## 2.请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

```markdown
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

**注意**:

在使用别名方法时， `url`、`method`、`data` 这些属性都==不必==在配置中指定。

## 3.并发

处理并发请求的助手函数

```js
axios.all(iterable)
axios.spread(callback)
```

## 4.创建实例

通过`axios({})`发送的请求是全局的，里面的配置信息也是全局的，如果后面的请求全是使用的这个全局配置。如果开发的项目的api地址存在不同的服务器，此时的`baseurl`就只能写一个服务器的地址。

可以==使用自定义配置==新建一个 `axios` 实例

语法：

```js
axios.create([config])
```

示例：

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 4.1多个实例的创建

```js
//创建instance1实例
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
})
//instance1实例的使用
instance1({
  url: '/home/multidata'
}).then(res => {
  console.log(res);
})

instance1({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})
//创建第二个实例 instance2
const instance2 = axios.create({
  baseURL: 'http://222.111.33.33:8000',
  timeout: 10000,
  // headers: {}
})
//instance2实例的使用
```

## 5.实例方法

以下是可用的==实例方法==。指定的配置将与实例的配置合并。

```js
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
```

## 6.请求配置

这些是==创建请求==时可以用的==配置选项==。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

```js
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 7.响应结构

某个请求的响应包含以下信息

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

使用 `then` 时，你将接收下面这样的响应 :

```js
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

在使用 `catch` 时，或传递 [rejection callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 作为 `then` 的第二个参数时，响应可以通过 `error` 对象可被使用，正如在[错误处理](https://www.kancloud.cn/yunye/axios/234845#handling-errors)这一节所讲。

## 8.配置默认值

你可以指定将被用在各个请求的配置默认值

### 8.1全局的 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 8.2自定义实例默认值

```js
//多个实例可以进行多个配置，因此可以向不同的服务器发送请求
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//
const instance1 = axios.create({
  baseURL: 'https://192.168.3.101/api/'
});
```

### 8.3配置的优先顺序

配置会以一个优先顺序进行合并。这个顺序是：在 `lib/defaults.js` 找到的库的默认值，然后是实例的 `defaults` 属性，最后是请求的 `config` 参数。后者将优先于前者。这里是一个例子：

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```

## 9.拦截器

在请求或响应被 `then` 或 `catch` ==处理前==拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
  
  //最后必须将处理后的结果返回，否则不能正常发送到服务器
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
  
  //在处理完响应数据后，必须返回处理后的结果，否则客户端拿不到数据
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

```

如果你想在稍后==移除拦截器==，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
//移除请求拦截器
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 `axios` 实例添加拦截器

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 10错误处理

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

可以使用 `validateStatus` 配置选项定义一个自定义 HTTP 状态码的错误范围。

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; 
  }
})
```

## 11取消请求

使用 `cancel token` 取消请求

可以使用 `CancelToken.source` 工厂方法创建 `cancel token`，像这样：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 executor 函数到 `CancelToken` 的构造函数来创建 `cancel token`：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

> 注意: 可以使用同一个 cancel token 取消多个请求

## 12.使用 application/x-www-form-urlencoded format

默认情况下，`axios`将`JavaScript`对象序列化为`JSON`。 要以`application / x-www-form-urlencoded`格式发送数据，您可以使用以下选项之一。

### 12.1浏览器

在浏览器中，您可以使用`URLSearchParams API`，如下所示：

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 请注意，所有浏览器都不支持URLSearchParams（请参阅caniuse.com），但可以使用polyfill（确保填充全局环境）。

或者，您可以使用qs库编码数据：

```js
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者以另一种方式（ES6），

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

axios 依赖原生的 ES6 Promise 实现而[被支持](http://caniuse.com/promises). 如果你的环境不支持 ES6 Promise，你可以使用 [polyfill](https://github.com/jakearchibald/es6-promise).

## 13.跨域

`vue-cli 3.0`的在 `package.json` 同级目录新建一个 `vue.config.js` 文件，加入下面代码，其他版本找到配置文件的devServer加入代码：

```js
module.exports = {
    //axios域代理，解决axios跨域问题
    baseUrl: '/',
    devServer: {
      open: true,
    	host: 'localhost',
    	port: 8080,
   	 	https: false,
    	// 跨域解决方案
       proxy: {
            '/api': {
                target: 'http://192.168.3.208:8090',//开发时服务器的地址
                secure: false,
                changeOrigin: true,
                ws: false,
                pathRewrite: {
											'^/api': '/'
                }
            }
        }
    }
}
```

使用：

```js
		return axios.post('http://192.168.3.208:8090/api/login', params)
//将上面请求地址修改为下面的地址，即可实现代理
    return axios.post('/api/api/login', params)
```

## 14.封装

```js
//导入axios
import axios from 'axios'
//使用export导出多个实例，因为使用export default只能导出一个实例
export function request(config) {
  // 1.创建axios的实例
  //创建时返回的是promise
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器，
  // 2.1.请求拦截的作用，此时是拦截实例的请求。如果是axios.interceptors则调用的是全局拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    //拦截处理后必须使用return返回（放行），不然这个请求发不出去
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    //对响应数据进行过滤，data才是后台数据，其他数据是axios封装的
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  //instance为promise
  return instance(config)
}

//对网络请求的结果返回的另一种方法
// export function request1(config) {
//   return new Promise((resolve, reject) => {
//     // 1.创建axios的实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     // 发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
```

使用：

```js
//封装的request模块
import {request} from "./network/request";
request({
  url: '/home/multidata'
}).then(res => {
  console.log(res);
}).catch(err => {
  // console.log(err);
})
```

### 14.1环境配置

在开发环境下和生产模式下有着不同的 baseURL，所以，我们需要根据不同的环境切换不同的 baseURL。

```js
// 根据 process.env.NODE_ENV 区分状态，切换不同的 baseURL
const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? `/java` : '/apis',
})
```

另一种配置方式

```js
const instance = axios.create({
  timeout: 1000
})
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  instance.defaults.baseURL = baseUrl.dev
} else if (process.env.NODE_ENV === 'debug') {
  instance.defaults.baseURL = 'https://www.ceshi.com'
} else if (process.env.NODE_ENV === 'production') {
  instance.defaults.baseURL = baseUrl.pro
}
```

### 14.2统一序列化数据

在 axios 中， `transformRequest` 允许在向服务器发送请求前，修改请求数据；`transformResponse` 在传递给 then/catch 前，允许修改响应数据。

通过这两个钩子，可以省去大量重复的序列化代码。

```js
const instance = axios.create({
    // 在向服务器发送请求前，序列化请求数据
    transformRequest: [function (data) {
        data = JSON.stringify(data)
        return data
    }],
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [function (data) {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]
})

```

### 14.3拦截器