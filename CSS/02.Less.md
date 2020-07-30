# Less教程

## 1. less简介

​	`less`是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
​	`Less` 既可以在客户端上运行 ，也可以借助Node.js在服务端运行。

	less的中文官网：http://lesscss.cn/
	bootstrap中less教程：http://www.bootcss.com/p/lesscss/

## 2. Less编译工具

1. koala 官网:www.koala-app.com 

2. 使用IDE的插件进行编译less	

## 3. less中的注释

1. 以`//`开头的注释，不会被编译到css文件中.
2. 以`/**/`包裹的注释会被编译到css文件中 .因为css里的注释就是`/**/`

## 4. less中的变量

使用`@`来声明一个变量。

语法：`@变量名：值;	`		

示例：@pink：pink;

声明位置：写在less文件的最前面进行定义

变量的用途：

​	1.作为普通属性值来使用：直接使用`@color`——==推荐==

```less
//声明变量color
@color:deeppink;

.inner{
        background: @color;
        height: 100px;
        width: 100px;
    }
```

​	2.作为选择器:`@{selector的值}`的形式——==不推荐==

```less
//声明变量selector
@selector:#wrap;

@{selector}{
    width: 300px;
    height: 400px;
    border: 1px solid;
}
```

​	3.作为属性名：`@{属性名}`的形式——==不推荐==

```less
//声明变量m
@m:margin;

*{
    @{m}: 0;
    padding: 0;
}
```

​	4.作为URL：@{url}

​	5.变量的延迟加载

​	在less中的变量是块级作用域（一个大括号代表一个作用域）

```less
/*less文件*/
//
@var: 0;

.class {
@var: 1;
    .brass {
      @var: 2;
      three: @var;//3  
      @var: 3;
    }
  one: @var;  //1
}

//编译后的css文件
.class {
  one: 1;
}
.class .brass {
  three: 3;
}
```

说明：等`.brass`块编译完再去解析` three: @var;`，因此结果是3

## 5. less中的嵌套规则

1. 基本嵌套规则：父子关系

```less
//基本嵌套规则
//与html结构类似
@color:deeppink;
#wrap{
    width: 300px;
    height: 400px;
    border: 1px solid;
    .inner{
        background: @color;
        height: 100px;
        width: 100px;
    }
}
//编译后的css文件
#wrap {
  width: 300px;
  height: 400px;
  border: 1px solid;
}
#wrap .inner {
  background: #ff1493;
  height: 100px;
  width: 100px;
}
```

2. &的使用：平级关系。==主要用于伪类和伪元素==

```less
//平级关系使用：&
@color:deeppink;
.inner{
        background: @color;
        height: 100px;
        width: 100px;
        &:hover{
            background: pink;
        }
    }
//编译后的css文件
.inner {
  background: #ff1493;
  height: 100px;
  width: 100px;
}
.inner:hover {
  background: pink;
}
```

## 6. less中的混合

​	混合就是将一系列属性从一个规则集引入到另一个规则集的方式

### 	6.1 普通混合

​	语法：以`.`号开头，后面 跟着一个变量名，然后是公共声明块

​	使用：直接在需要使用混合的声明块中以`.变量名;`调用

​	注：此中方法编译成css时，定义的混合也会被编译到css文件中

```less
//定义普通混合方法
.juzhong{
    background: pink;
    height: 100px;
    width: 100px;
}
#wrap{
    width: 300px;
    height: 400px;
    border: 1px solid;
    .inner{
        //调用
       .juzhong;
    }
    .inner2{
        //调用
       .juzhong;
    }
}
//编译后的css文件
/*定义的混合被编译到css文件*/
.juzhong {
  background: pink;
  height: 100px;
  width: 100px;
}
#wrap {
  width: 300px;
  height: 400px;
  border: 1px solid;
}
#wrap .inner {
  background: pink;
  height: 100px;
  width: 100px;
}
#wrap .inner2 {
  background: pink;
  height: 100px;
  width: 100px;
}
```

### 	6.2 不带输出的混合

​			语法：`.变量名(){声明}`

​			调用：`.变量名;`

​			==注==：此中方法编译成css时，定义的混合`不会`被编译到css文件中	

```less
//定义不带输出的混合
.juzhong(){
    background: pink;
    height: 100px;
    width: 100px;
}
#wrap{
    width: 300px;
    height: 400px;
    border: 1px solid;
    .inner{
        //调用
       .juzhong;
    }
    .inner2{
        //调用
       .juzhong;
    }
}
/*编译后的css文件*/
#wrap {
  width: 300px;
  height: 400px;
  border: 1px solid;
}
#wrap .inner {
  background: pink;
  height: 100px;
  width: 100px;
}
#wrap .inner2 {
  background: pink;
  height: 100px;
  width: 100px;
}
```

### 	6.3 带输出（参数)的混合

​	==注==：

1. 混合`不会`被编译到css文件中
2. 传递的实参必须与定义混合的形参相对应

```less
//这是混合（mixin），不是函数
.juzhong(@w,@h,@c){
    background: @c;
    height: @h;
    width: @w;
}
#wrap{
    width: 300px;
    height: 400px;
    border: 1px solid;
    .inner{
        //调用时传递实参
       .juzhong(100px ,100px,pink);
    }
    .inner2{
        //调用时传递实参
       .juzhong(200px ,200px,deeppink);
    }
}
```

### 	6.4 带参数并且有默认值的混合

注：如果调用时没传递参数，则会使用定义混合时的默认值

```less
.juzhong(@w:10px,@h:10px,@c:pink){
    background: @c;
    height: @h;
    width: @w;
}
#wrap{
    position: relative;
    width: 300px;
    height: 400px;
    border: 1px solid;
    margin: 0 auto;
    .inner{
        //调用时传递参数
       .juzhong(100px ,100px,pink);
    }
    .inner2{
        //此时不会报错，因为定义的混合有默认值
       .juzhong();
    }
}
```

### 	6.5 带多个参数的混合

### 	6.6 命名参数

​	用途：当传入的实参与定义的形参个数不一样时，可以通过命名参数指定传入的实参是给哪个形参的

```less
.juzhong(@w:10px,@h:10px,@c:pink){
    background: @c;
    height: @h;
    width: @w;
}
#wrap{
    position: relative;
    width: 300px;
    height: 400px;
    border: 1px solid;
    margin: 0 auto;
    .inner{
        //调用传递参数
       .juzhong(100px ,100px,pink);
    }
    .inner2{
        //命名参数
        //@w和@h使用形参的默认值，@c使用传入的实参black
       .juzhong(@c:black);
    }
}
```

### 	6.7 匹配模式

用于实现某个具体功能所定义的一个”库“，相当于jq的库，用于实现某项具体功能。

第一步：写具体功能的less代码

```less
/*公共代码提取出来单独编写：
	1.公共代码的混合名字与下面具体功能混合必须一样
	2.第一个参数必须使用@_，才能将公共代码编译到具体的功能混合去
	3.其余参数需要与下面定义的参数一样
*/
.triangle(@_,@w,@c){
    width: 0px;
    height: 0px;
}
.triangle(t,@w:10px,@c:red){
    border: @w solid white;
    border-top-color: @c;
}
.triangle(r,@w:10px,@c:red){
    border: 1px solid white;
    border-right-color: @c;
}
.triangle(b,@w:10px,@c:red){
    border: 1px solid white;
    border-bottom-color: @c;
}
.triangle(l,@w:10px,@c:red){
    border: 1px solid white;
    border-left-color:  @c;
}
```

第二步：在业务代码引入

```less
//引入单独定义的功能混合
@import "./triangle.less";
//业务代码
#wrap .sjx{
    //此时参数t就会去匹配功能区的代码
    .triangle(t,20px,yellow)
}
```

### 	6.8 arguments变量（实参列表）

```less
.border(@w,@style,@c){
    border: @arguments;
}
#wrap .sjx{
   .border(1px,solid,black)
}
```

## 7. less运算

​	在less中可以进行加减乘除的运算

```less
//less文件
@rem:100rem;
#wrap .sjx{
   width:(100 + @rem)
}
//编译后的css
#wrap .sjx {
  width: 200rem;
}
```

## 8. less避免编译

语法：`cacl(避免编译内容)`

```less
/*********less******************/
* {
  margin: 1000px;
  padding: cacl(100px + 100);
}
/************编译后的css*********/
* {
  margin: 1000px;
  padding: cacl(200px);
}
```

## 9. Less继承

特点：性能比混合高但灵活度比混合低

==注==：继承不能带参数

```less
/*******************定义继承***********/
//公共代码
//不能带参数
.juzhong{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.juzhong:hover{
    background: red!important;
}

/*******************继承的引入***********/
*{
    margin: 0;
    padding: 0;
}
@import "mixin/juzhong-extend.less";
#wrap{
    position: relative;
    width: 300px;
    height: 300px;
    border: 1px solid;
    margin: 0 auto;
    .inner{
		// extend为函数
		//all代表所有状态都继承
        &:extend(.juzhong all);
        &:nth-child(1){
           width: 100px;
           height: 100px;
           background: pink;
        }
        &:nth-child(2){
           width: 50px;
           height: 50px;
           background: yellow;
        }
    }
}
```

​		     