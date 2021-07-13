打平的数据内容如下：

```js
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
```

输出结果

```js
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
```

## 什么是好算法，什么是坏算法

判断一个算法的好坏，一般从`执行时间`和`占用空间`来看,执行时间越短，占用的内存空间越小，那么它就是好的算法。对应的，我们常常用时间复杂度代表执行时间，空间复杂度代表占用的内存空间。

### 时间复杂度

> 时间复杂度的计算并不是计算程序具体运行的时间，而是算法执行语句的次数。

随着`n`的不断`增大`，时间复杂度不断`增大`，算法`花费时间`越多。 常见的时间复杂度有

- 常数阶`O(1)`
- 对数阶`O(log2 n)`
- 线性阶`O(n)`
- 线性对数阶`O(n log2 n)`
- 平方阶`O(n^2)`
- 立方阶`O(n^3)`
- k次方阶`O(n^K)`
- 指数阶`O(2^n)`

#### 计算方法

1. 选取相对增长最高的项
2. 最高项系数是都化为1
3. 若是常数的话用O(1)表示

举个例子：如f(n)=3*n^4+3n+300 则 O(n)=n^4

通常我们计算时间复杂度都是计算最坏情况。计算时间复杂度的要注意的几个点

- 如果算法的执行时间`不随n`的`增加`而`增长`，假如算法中有`上千条`语句，执行时间也不过是一个`较大的常数`。此类算法的时间复杂度是`O(1)`。 举例如下：代码执行100次，是一个常数，复杂度也是`O(1)`。

```js
    let x = 1;
    while (x <100) {
     x++;
    }
```

- 有`多个循环语`句时候，算法的时间复杂度是由`嵌套层数最多`的循环语句中`最内层`语句的方法决定的。举例如下：在下面for循环当中，`外层循环`每执行`一次`，`内层循环`要执行`n`次，执行次数是根据n所决定的，时间复杂度是`O(n^2)`。

```js
  for (i = 0; i < n; i++){
         for (j = 0; j < n; j++) {
             // ...code
         }
     }
```

- 循环不仅与`n`有关，还与执行循环`判断条件`有关。举例如下：在代码中，如果`arr[i]`不等于`1`的话，时间复杂度是O(n)。如果`arr[i]`等于`1`的话，循环不执行，时间复杂度是`O(0)`。

```js
    for(var i = 0; i<n && arr[i] !=1; i++) {
    // ...code
    }
```

### 空间复杂度

> 空间复杂度是对一个算法在运行过程中临时占用存储空间的大小。

#### 计算方法：

1. 忽略常数，用O(1)表示
2. 递归算法的空间复杂度=(递归深度n)*(每次递归所要的辅助空间)

计算空间复杂度的简单几点

- 仅仅只复制单个变量，空间复杂度为O(1)。举例如下：空间复杂度为O(n) = O(1)。

```js
   let a = 1;
   let b = 2;
   let c = 3;
   console.log('输出a,b,c', a, b, c);
```

- 递归实现，调用fun函数，每次都创建1个变量k。调用n次，空间复杂度O(n*1) = O(n)。

```js
    function fun(n) {
       let k = 10;
       if (n == k) {
           return n;
       } else {
           return fun(++n)
       }
    }
```

## 不考虑性能实现，递归遍历查找

主要思路是提供一个递`getChildren`的方法，该方法`递归`去查找子集。 就这样，不用考虑性能，无脑去查，大多数人只知道递归，就是写不出来。。。

```js
/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}

/**
* 转换方法
*/
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  return result;
}
```

从上面的代码我们分析，该实现的时间复杂度为`O(2^n)`。

## 不用递归，也能搞定

主要思路是先把数据转成`Map`去存储，之后遍历的同时借助`对象的引用`，直接从`Map`找对应的数据做存储

```js
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
    
  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = {...item, children: []}
  }
  
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem =  itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
```

从上面的代码我们分析，有两次循环，该实现的时间复杂度为`O(2n)`，需要一个Map把数据存储起来，空间复杂度`O(n)`

## 最优性能

主要思路也是先把数据转成`Map`去存储，之后遍历的同时借助`对象的引用`，直接从`Map`找对应的数据做存储。不同点在遍历的时候即做`Map`存储,有找对应关系。性能会更好。

```js
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
```

从上面的代码我们分析，一次循环就搞定了，该实现的时间复杂度为`O(n)`，需要一个Map把数据存储起来，空间复杂度`O(n)`

## 其他方法

升序排序加Map数据结构：

```js
```

