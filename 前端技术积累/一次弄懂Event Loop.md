`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

# javascript事件循环

既然js是单线程，那就像只有一个窗口的银行，客户需要排队一个一个办理业务，同理js任务也要一个一个顺序执行。如果一个任务耗时过长，那么后一个任务也必须等着。那么问题来了，假如我们想浏览新闻，但是新闻包含的超清图片加载很慢，难道我们的网页要一直卡着直到图片完全显示出来？因此聪明的程序员将任务分为两类：

- 同步任务
- 异步任务

当我们打开网站时，网页的渲染过程就是一大堆同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大耗时久的任务，就是异步任务。关于这部分有严格的文字定义，但本文的目的是用最小的学习成本彻底弄懂执行机制，所以我们用导图来说明：

![img](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

导图要表达的内容用文字来表述的话：

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

我们不禁要问了，那怎么知道主线程执行栈为空啊？js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

说了这么多文字，不如直接一段代码更直白：

```javascript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
复制代码
```

上面是一段简易的`ajax`请求代码：

- ajax进入Event Table，注册回调函数`success`。
- 执行`console.log('代码执行结束')`。
- ajax事件完成，回调函数`success`进入Event Queue。
- 主线程从Event Queue读取回调函数`success`并执行。

相信通过上面的文字和代码，你已经对js的执行顺序有了初步了解。接下来我们来研究进阶话题：setTimeout。



# 一.堆，栈、队列

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859c984806c78d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 1.1堆（Heap）

**堆**是一种数据结构，是利用完全二叉树维护的一组数据，**堆**分为两种，一种为最大**堆**，一种为**最小堆**，将根节点**最大**的**堆**叫做**最大堆**或**大根堆**，根节点**最小**的**堆**叫做**最小堆**或**小根堆**。
**堆**是**线性数据结构**，相当于**一维数组**，有唯一后继。

如最大堆

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859dbb5b9c7ca1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 1.2栈（Stack）

**栈**在计算机科学中是限定仅在**表尾**进行**插入**或**删除**操作的线性表。 **栈**是一种数据结构，它按照**后进先出**的原则存储数据，**先进入**的数据被压入**栈底**，**最后的数据**在**栈顶**，需要读数据的时候从**栈顶**开始**弹出数据**。
**栈**是只能在**某一端插入**和**删除**的**特殊线性表**。

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859ed4f6143043?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 1.3队列（Queue）

特殊之处在于它只允许在表的前端（`front`）进行**删除**操作，而在表的后端（`rear`）进行**插入**操作，和**栈**一样，**队列**是一种操作受限制的线性表。
 进行**插入**操作的端称为**队尾**，进行**删除**操作的端称为**队头**。  队列中没有元素时，称为**空队列**。

**队列**的数据元素又称为**队列元素**。在队列中插入一个队列元素称为**入队**，从**队列**中**删除**一个队列元素称为**出队**。因为队列**只允许**在一端**插入**，在另一端**删除**，所以只有**最早**进入**队列**的元素**才能最先从队列中**删除，故队列又称为**先进先出**（`FIFO—first in first out`）

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859f2f4f5da2a8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 二.Event Loop

在`JavaScript`中，任务被分为两种，一种宏任务（`MacroTask`）也叫`Task`，一种叫微任务（`MicroTask`）。

微任务和宏任务皆为异步任务，它们都属于一个队列，主要区别在于他们的执行顺序，Event Loop的走向和取值.

![cmd-markdown-logo](https://user-gold-cdn.xitu.io/2018/7/14/164974fa4b42e4af?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 2.1MacroTask（宏任务）

- `script`全部代码、`setTimeout`、`setInterval`、`setImmediate`（浏览器暂时不支持，只有IE10支持，具体可见[`MDN`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate)）、`I/O`、`UI Rendering`。

## 2.2MicroTask（微任务）

- `Process.nextTick（Node独有）`、`Promise`、`Object.observe(废弃)`、`MutationObserver`（具体使用方式查看[这里](http://javascript.ruanyifeng.com/dom/mutationobserver.html)）

# 三.浏览器中的Event Loop

`Javascript` 有一个 `main thread` 主线程和 `call-stack` 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

## 3.1JS调用栈

JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

## 3.2同步任务和异步任务

`Javascript`单线程任务被分为**同步任务**和**异步任务**，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

![img](https://user-gold-cdn.xitu.io/2019/1/18/1685f03d7f88792b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

任务队列`Task Queue`，即队列，是一种先进先出的一种数据结构。

![img](https://user-gold-cdn.xitu.io/2019/1/18/1685f037d48da0de?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 3.3事件循环的进程模型

- 选择当前要执行的任务队列，选择任务队列中最先进入的任务，如果任务队列为空即`null`，则执行跳转到微任务（`MicroTask`）的执行步骤。
- 将事件循环中的任务设置为已选择任务。
- 执行任务。
- 将事件循环中当前运行任务设置为null。
- 将已经运行完成的任务从任务队列中删除。
- microtasks步骤：进入microtask检查点。
- 更新界面渲染。
- 返回第一步。

## 3.4执行进入microtask检查点时，用户代理会执行以下步骤：

- 设置microtask检查点标志为true。
- 当事件循环`microtask`执行不为空时：选择一个最先进入的`microtask`队列的`microtask`，将事件循环的`microtask`设置为已选择的`microtask`，运行`microtask`，将已经执行完成的`microtask`为`null`，移出`microtask`中的`microtask`。
- 清理IndexDB事务
- 设置进入microtask检查点的标志为false。

执行栈在执行完**同步任务**后，查看**执行栈**是否为空，如果执行栈为空，就会去检查**微任务**(`microTask`)队列是否为空，如果为空的话，就执行`Task`（宏任务），否则就一次性执行完所有微任务。
 每次单个**宏任务**执行完毕后，检查**微任务**(`microTask`)队列是否为空，如果不为空的话，会按照**先入先**出的规则全部执行完**微任务**(`microTask`)后，设置**微任务**(`microTask`)队列为`null`，然后再执行**宏任务**，如此循环。

## 3.5例1

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```

首先我们划分几个分类：

### 第一次执行：

```
Tasks：run script、 setTimeout callback

Microtasks：Promise then	

JS stack: script	
Log: script start、script end。
```

执行同步代码，将宏任务（`Tasks`）和微任务(`Microtasks`)划分到各自队列中。

### 第二次执行：

```
Tasks：run script、 setTimeout callback

Microtasks：Promise2 then	

JS stack: Promise2 callback	
Log: script start、script end、promise1、promise2
```

执行宏任务后，检测到微任务(`Microtasks`)队列中不为空，执行`Promise1`，执行完成`Promise1`后，调用`Promise2.then`，放入微任务(`Microtasks`)队列中，再执行`Promise2.then`。

### 第三次执行：

```
Tasks：setTimeout callback

Microtasks：	

JS stack: setTimeout callback
Log: script start、script end、promise1、promise2、setTimeout
```

当微任务(`Microtasks`)队列中为空时，执行宏任务（`Tasks`），执行`setTimeout callback`，打印日志。

### 第四次执行：

```
Tasks：setTimeout callback

Microtasks：	

JS stack: 
Log: script start、script end、promise1、promise2、setTimeout
```

清空**Tasks**队列和`JS stack`。

![img](https://user-gold-cdn.xitu.io/2019/1/18/16860ae5ad02f993?imageslim)

## 3.6例2

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
```

- 首先，打印`script start`，调用`async1()`时，返回一个`Promise`，所以打印出来`async2 end`。

- 每个 `await`，会新产生一个`promise`,但这个过程本身是异步的，所以该`await`后面不会立即调用。

- 继续执行同步代码，打印`Promise`和`script end`，将`then`函数放入**微任务**队列中等待执行。

- 同步执行完成之后，检查**微任务**队列是否为`null`，然后按照先入先出规则，依次执行。

- 然后先执行打印`promise1`,此时`then`的回调函数返回`undefinde`，此时又有`then`的链式调用，又放入**微任务**队列中，再次打印`promise2`。

- 再回到`await`的位置执行返回的 `Promise` 的 `resolve` 函数，这又会把 `resolve` 丢到微任务队列中，打印`async1 end`。

- 当**微任务**队列为空时，执行宏任务,打印`setTimeout`。

# 四.setTimeout

大名鼎鼎的`setTimeout`无需再多言，大家对他的第一印象就是异步可以延时执行，我们经常这么实现延时3秒执行：

```javascript
setTimeout(() => {
    console.log('延时3秒');
},3000)
复制代码
```

渐渐的`setTimeout`用的地方多了，问题也出现了，有时候明明写的延时3秒，实际却5，6秒才执行函数，这又咋回事啊？

先看一个例子：

```javascript
setTimeout(() => {
    task();
},3000)
console.log('执行console');
复制代码
```

根据前面我们的结论，`setTimeout`是异步的，应该先执行`console.log`这个同步任务，所以我们的结论是：

```javascript
//执行console
//task()
复制代码
```

去验证一下，结果正确！ 然后我们修改一下前面的代码：

```javascript
setTimeout(() => {
    task()
},3000)

sleep(10000000)
复制代码
```

乍一看其实差不多嘛，但我们把这段代码在chrome执行一下，却发现控制台执行`task()`需要的时间远远超过3秒，说好的延时三秒，为啥现在需要这么长时间啊？

这时候我们需要重新理解`setTimeout`的定义。我们先说上述代码是怎么执行的：

- `task()`进入Event Table并注册,计时开始。
- 执行`sleep`函数，很慢，非常慢，计时仍在继续。
- 3秒到了，计时事件`timeout`完成，`task()`进入Event Queue，但是`sleep`也太慢了吧，还没执行完，只好等着。
- `sleep`终于执行完了，`task()`终于从Event Queue进入了主线程执行。

上述的流程走完，我们知道`setTimeout`这个函数，是经过指定时间后，把要执行的任务(本例中为`task()`)加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于3秒。

我们还经常遇到`setTimeout(fn,0)`这样的代码，0秒后执行又是什么意思呢？是不是可以立即执行呢？

答案是不会的，`setTimeout(fn,0)`的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。举例说明：

```javascript
//代码1
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},0);
复制代码
//代码2
console.log('先执行这里');
setTimeout(() => {
    console.log('执行啦')
},3000);  
复制代码
```

代码1的输出结果是：

```javascript
//先执行这里
//执行啦
复制代码
```

代码2的输出结果是：

```javascript
//先执行这里
// ... 3s later
// 执行啦
复制代码
```

关于`setTimeout`要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。有兴趣的同学可以自行了解。

# 五.setInterval

上面说完了`setTimeout`，当然不能错过它的孪生兄弟`setInterval`。他俩差不多，只不过后者是循环的执行。对于执行顺序来说，`setInterval`会每隔指定的时间将注册的函数置入Event Queue，如果前面的任务耗时太久，那么同样需要等待。

唯一需要注意的一点是，对于`setInterval(fn,ms)`来说，我们已经知道不是每过`ms`秒会执行一次`fn`，而是每过`ms`秒，会有`fn`进入Event Queue。一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**。这句话请读者仔细品味。

