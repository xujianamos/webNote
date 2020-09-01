## 1.三元运算符

```js
let someThingTrue = true
if(someThingTrue){
    handleTrue()
}else{
    handleFalse()
}

/****** 使用三元运算符代替if-else结构 ******/

let someThingTrue = true
someThingTrue ?  handleTrue() : handleFalse()
```

## 2.短路`或`运算

```js
const defaultValue = "SomeDefaultValue"
let someValueNotSureOfItsExistance = null
let expectingSomeValue = someValueNotSureOfItsExistance ||     defaultValue

console.log(expectingSomeValue) // SomeDefaultValue
```

## 3. 条件成立

```js
let someValue = true
if (someValue) {
  console.log('条件成立!')
}
```

## 4. `for` 循环

```js
for (let i = 0; i < 1e2; i++) { // 代替 i<100 是不是有点酷
}
```

循环数组或对象

```js
let someValues = [1, 2, 4]
for (let val in someValues) {
  console.log(val)
}
let obj = {
  'key1': 'value1',
  'key2': 'value2',
  'key3': 'value3'
}
for (let key in obj) {
  console.log(key)
}
```

## 5. 值到对象的映射

```js
let x='x',y='y'
let obj = {x,y}

console.log(obj) // {x: "x", y: "y"}
```

## 6. Object.entries()

```js
const credits = {
  producer: '大迁世界',
  name: '前端小智',
  rating: 9
}
const arr = Object.entries(credits)
console.log(arr)

/*** 输出 ***/
[ [ 'producer', '大迁世界' ], [ 'name', '前端小智' ], [ 'rating', 9 ] ]
```

## 7. Object.values()

```js
const credits = {
  producer: '大迁世界',
  name: '前端小智',
  rating: 9
}
const arr = Object.values(credits)
console.log(arr)

*** 输出 ***

[ '大迁世界', '前端小智', 9 ]
```

## 8. 模板字面量

```js
let name = '前端小智'
let age = 20
var someStringConcatenateSomeVariable = `我是 ${name}，今年 ${age} 岁`
console.log(someStringConcatenateSomeVariable)
```

## 9. 解构赋值

```js
import { observable, action, runInAction } from 'mobx';
```

## 10.多行字符串

```js
let multiLineString = `some string\n
with multi-line of\n
characters\n`

console.log(multiLineString)
```

## 11.Array.find 简写

```js
const pets = [{
    type: 'Dog',
    name: 'Max'
  },
  {
    type: 'Cat',
    name: 'Karl'
  },
  {
    type: 'Dog',
    name: 'Tommy'
  }
]
pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Tommy')

console.log(pet) // { type: 'Dog', name: 'Tommy' }
```

## 12.默认参数值

早期的做法

```js
function area(h, w) {
  if (!h) {
    h = 1;
  }
  if (!w) {
    w = 1;
  }
  return h * w
}
```

ES6 以后的做法

```js
function area(h = 1, w = 1) {
  return h * w
}
```

## 13.箭头函数的简写

```js
let sayHello = (name) => {
  return `你好，${name}`
}

console.log(sayHello('前端小智'))
```

简写如下：

```js
let sayHello = name => `你好，${name}`

console.log(sayHello('前端小智'))
```

## 14.隐式返回

```js
let someFuncThatReturnSomeValue = (value) => {
  return value + value
}
console.log(
someFuncThatReturnSomeValue('前端小智'))
```

简写如下：

```js
let someFuncThatReturnSomeValue = (value) => (
  value + value
)
console.log(someFuncThatReturnSomeValue('前端小智'))
```

## 15.函数必须有参数值

```js
function mustHavePatamMethod(param) {
  if (param === undefined) {
    throw new Error('Hey You must Put some param!');
  }
  return param;
}
```

可以这样重写:

```js
mustHaveCheck = () => {
  throw new Error('Missing parameter!')
}
methodShoudHaveParam = (param = mustHaveCheck()) => {
  return param
}
```

## 16.charAt() 简写

```js
'SampleString'.charAt(0) // S
// 简写
'SampleString'[0]
```

## 17.有条件的函数调用

```js
function fn1() {
  console.log('I am Function 1')
}

function fn2() {
  console.log('I am Function 2')
}
/*
长的写法
*/
let checkValue = 3;
if (checkValue === 3) {
  fn1()
} else {
  fn2()
}
```

简短的写法：

```js
(checkValue === 3 ? fn1 : fn2)()
```

## 17.Math.Floor 简写

```js
let val = '123.95'

console.log(Math.floor(val)) // 常规写法
console.log(~~val) // 简写
```

## 18.Math.pow 简写

```js
Math.pow(2, 3) // 8
// 简写
2 ** 3 // 8
```

## 19.将字符串转换为数字

```js
const num1 = parseInt('100')
// 简写
console.log(+"100")
console.log(+"100.2")
```

## 20.&& 运算

```js
let value = 1;
if (value === 1)
  console.log('Value is one')
//OR In short 
value && console.log('Value is one')
```

## 21.toString 简写

```js
let someNumber = 123
console.log(someNumber.toString()) // "123"
// 简写
console.log(`${someNumber}`) // "123"
```

