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

```shell
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
interface Point {
  x: number;
  y: number;
}

const point: Point = {
  x: 3,
  y: 18,
};
```

## 2.2基础类型

## 2.3类型注解和类型推断

类型注解：我们来告诉TS变量是什么类型

类型推断：TS会自动的去尝试分析变量的类型

如果TS能够自动分析变量类型，我们就什么也不需要做，

如果TS无法分析变量类型的话，我们就需要使用类型注解

```ts
//类型注解
let count: number;
count = 123

//类型推断:此时ts能推断出类型
let countInference = 123;
const firstNumber = 1;
const lastNUmber = 2;

//函数的类型注解：因为传递的参数ts不能推断，所以需要使用类型注解
function getTotal(firstNumber: number,secondNumber: number){
  return firstNumber+secondNumber
  
}
```



## 函数类型

### 为函数定义类型

三种写法：

`:`后面是类型，`=`后面是函数的具体实现

```js
function add(x: number, y: number): number {
    return x + y;
}

const add = (x: number, y: number):number=>{
  return x + y;
}

const add: (x: number, y: number)=>number=(x,y) =>{
    return x + y;
}
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

> 函数没有返回值类型

```js
function add(x: number, y: number): void {
    return x + y;
}
```

`void`表示函数不能有返回值。

> 函数参数解构类型

```js
function add( {x,y}: {x:number,y:number}): number {
    return x + y;
}
```



## 数组

```js
//数组可以存放number类型或者string类型
const arr: (number | string)[] = [1,'2',3]
//数组只能存储string类型
const stringArr: string[] = ['a','b','c']
//数组只能存放undefined类型
const undefineArr: undefined[] =[undefined]
//数组里面存储对象类型
const objectArr: {name:string,age:number}[] = [{
  name:'name',
  age:25
}]
//使用类型别名简化
type User={name: string,age: number}
const objectArr: User[] = [{
  name:'name',
  age:25
}]
```

类型别名

```js
type
```

## 元祖

当数组长度固定，数组里面的每一项也是固定的时候。就可以使用元祖类型。

```js
const techerINFO: [string,string,number] = ['x','x',18]
```

## interface接口

```js
const getPersonName = (person: {name:string}): void=>{
  console.log(person.name)
}

const setPersonName =(person: {name:string},name: string): void=>{
  person.name=name
}
//使用接口改写
interface Person{
  name:string;
}
const getPersonName = (person: Person): void=>{
  console.log(person.name)
}

const setPersonName =(person: Person,name: string): void=>{
  person.name=name
}
```

与类型别名区别：

接口只能是对象或者函数，但是类型别名可以是基本类型

```js
//接口
interface Person{
  name:string;
}
//类型别名
type Person1= string
```

接口属性可有可无：

```js
interface Person{
  name:string;
  age?:number
}
```

属性后面加`?`就代表这个属性可有可无

只读属性:

```js
interface Person{
  readonly name:string;
  age?:number
}
```

此时代表name是只读的，不能进行赋值操作。

可以有其他属性：

```js
interface Person{
  readonly name:string;
  age?:number;
  //将来的属性名为字符串类型，属性值为任何类型
  [propName:string]:any;
}
const getPersonName = (person: Person): void=>{
  console.log(person.name)
}
const person={
  name:'',
  sex:''
}
getPersonName(person)
getPersonName({name:'',sex:''})
```

接口定义方法：

```js
interface Person{
  readonly name:string;
  age?:number;
  //将来的属性名为字符串类型，属性值为任何类型
  [propName:string]:any;
  //必须要有say方法，并且返回值是string
  say():string;
}
const person={
  name:'',
  sex:'',
  say(){
    return ''
  }
}
getPersonName(person)
```

类应用接口：

```js
interface Person{
  readonly name:string;
  age?:number;
  //将来的属性名为字符串类型，属性值为任何类型
  [propName:string]:any;
  //必须要有say方法，并且返回值是string
  say():string;
}
//定义类并应用接口Person
class User implements Person {
  //指定初始值
  name:'';
	say(){
  return ''
}
}
```

接口继承：

```js
interface Person{
  readonly name:string;
  age?:number;
  //将来的属性名为字符串类型，属性值为任何类型
  [propName:string]:any;
  //必须要有say方法，并且返回值是string
  say():string;
}
//接口继承
interface Teacher extends Person {
  teach():string
}
```

接口定义函数：

接口能够代表函数的类型

```js
//函数类型叫SayHi
interface SayHi{
  //函数必须接受一个string类型的参数，并且返回值也必须是string
  (word:string):string
}

//使用接口
const say: SayHi  = (word: string) =>{
  return word
}
```



## 类

定义基本的类

```js
class Person {
  name:'';
	getName() {
    return this.name
  }
}
//使用
const person = new Person()
person.getName()
```

类的继承：

```js
class Person {
  name:'';
	getName() {
    return this.name
  }
}
//继承
class Teacher extends Person {
  getTeacherName() {
    return ''
  }
}
//使用
const person = new Teacher()
person.getName()
person.getTeacherName()
```

子类调用父类：

```js
class Person {
  name:'';
	getName() {
    return this.name
  }
}
//继承
class Teacher extends Person {
  getTeacherName() {
    return ''
  }
  //重写父类方法
  getName(){
    //使用super关键字调用父类方法
    return super.getName()+''
  }
}
//使用
const person = new Teacher()
person.getName()
person.getTeacherName()
```

### 类的访问类型

默认的访问类型是`public`

```js
class Person {
  name:string;
	say(){
    return ''
  }
}
//等同于
class Person {
  public name:string;
	public say(){
    return ''
  }
}
```

`public`:允许我在类的内外都能被调用

```js
class Person {
  public name:string;
	public say(){
    //内部调用name
    console.log(this.name)
    return ''
  }
}

const person = new Person()
//外部调用name
person.name=''
```

`private`只允许在类的内部使用，不允许在类的外部使用和继承的子类中使用

```js
class Person {
  private name:string;
	public say(){
    //内部调用name
    console.log(this.name)
    return ''
  }
}

const person = new Person()
//外部调用name时就会报错
//person.name=''
```

`protected`允许在类的内部以及继承的子类中使用，不允许在类的外部使用

```js
class Person {
  protected name:string;
	public say(){
    //内部调用name
    console.log(this.name)
    return ''
  }
}
//继承
class Teacher extends Person{
  public sayBye(){
    //使用父类的name
    this.name
  }
}
```

### 类中的构造器

```js
class Person {
  private name:string;
	constructor(name: string){
    //this.name代表内部的name，而name参数代表实例化传递的参数
    this.name=name
  }
}
const person = new Person('ss')

//简写形式
class Person {
  constructor(private name: string){
    
  }
}
const person = new Person('ss')
```

子类中使用构造器：

```js
class Person {
  constructor(public name: string){
    
  }
}
//继承
class Teacher extends Person {
  constructor(public age: number){
    //必须手动调用父类的构造器，并传入所需参数，否则会报错
    //如果父类没有constructor函数，子类也必须调用super()函数，此时不需要传递参数
    super('dd')
  }
}
const person = new Teacher(28)
```

定义getter：

```js
class Person {
  //私有属性一般前面加个下划线
  constructor(private _name: string){}
  //定义getter属性，名为getName。
  //看似像个方法，实际上是个属性
  get name(){
    //返回私有属性给外部
    return this._name
  }
}

const person = new Person('ddd')
person.name//输出ddd
```

定义setter：

```js
class Person {
  //私有属性一般前面加个下划线
  constructor(private _name: string){}
  //定义getter属性，名为getName。
  //看似像个方法，实际上是个属性
  get name(){
    //返回私有属性给外部
    return this._name
  }
  set name(name: string){
    this._name=name
  }
}

const person = new Person('ddd')
//调用getter
person.name//输出ddd
//调用setter
person.name='sss'
person.name//输出sss
```

实现单列模式：

```js
class Demo {
  //创建静态属性instance
  private static instance: Demo;
  private constructor(public name: string) {}
  
  //使用static关键字将方法挂在Demo上，也就是静态方法
  static getInstance() {
    if(!this.instance){
      this.instance = new Demo(‘dd)
    }
    return this.instance
  }
}

//调用静态方法，创建唯一实例
const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
//此时创建的demo1和demo2是相等的。也就是同一个实例
```

只读属性：

只能读取，不能修改。

```js
class Person {
  //添加只读属性name
  public readonly name: string
  constructor(name: string){
    this.name=name
  }
}
const person =new Person('dd')
//此时不能修改
//person.name='sss'
```

### 抽象类

只能被继承，不能被实例化。

```js
//抽象类
abstract class Geom {
  width: number;
	getType() {
  return 'ss'
	}
  //抽象方法，必须在子类中进行实现
	abstract getArea(): number;
}

//继承抽象类
class Circle extends Geom {
  //实现父类的抽象方法
  getArea() {
    return 123
  }
}
```



























