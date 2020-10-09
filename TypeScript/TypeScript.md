## 1.安装

### 1.1安装typescript

全局安装：

```shell
npm install -g typescript
```

查看安装的版本号：

```shell
tsc -v
```

此时可以使用`tsc`命令来转换ts文件:

```shell
tsc demo1.ts
```

此时文件夹下会多出一个`demo1.js`文件。此时使用`node demo1.js`即可运行js文件。

### 1.2安装`ts-node`

直接使用`ts-node`运行ts文件，而无需再转换运行。

```powershell
npm install -g ts-node
```

使用：

```shell
ts-node Demo1.ts
```

## 2.基础语法

### 2.1静态类型

```js
const count: number = 1;
```

这就是最简单的定义一个数字类型的`count`的变量，这里的`: number`就是定义了一个静态类型。这样定义后`count`这个变量在程序中就永远都是数字类型了，不可以改变了。比如我们这时候给`count`复制一个字符串，它就报错了。

你会发现这时候的`count`变量,可以使用`number`类型上所有的属性和方法。

#### 2.1.1自定义静态类型

```js
interface XiaoJieJie {
  uname: string;
  age: number;
}

const xiaohong: XiaoJieJie = {
  uname: "小红",
  age: 18,
};
```

















基础类型



变量声明

接口

类

函数

泛型

类型推断

高级类型