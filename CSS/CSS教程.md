## 1.css基本使用

**样式表**由**规则**组成，**规则**由**选择器**和**声明块**组成，声明块由一条一条声明组成，声明由合法的属性名和属性值组成。

浏览器读取编译css的顺序是**从右往左**。

### 1.1内联样式表

通过HTML标签的`style`属性来设置元素的样式。

示例：

```html
<div style="color: red; font-size: 12px;">青春不常在，抓紧谈恋爱</div>
```

注意：

- style其实就是html标签的属性

- 样式属性和值中间是`:`

- 多组属性值之间用`;`隔开 

- 只能控制当前的标签和以及嵌套在其中的字标签，造成代码冗余 

### 1.2内部样式表

是将`CSS`样式集中写在`HTML`文档的`head`头部标签中，并且用`style`标签定义

示例：

```html
<style type="text/css">
	 div {
	 	color: red;
	 	font-size: 12px;
	 }
</style>
```

注意： 

- `style`标签一般位于`head`标签中，当然理论上他可以放在`HTML`文档的任何地方。

- `type="text/css"`  在`html5`中可以省略。

- 只能控制当前的页面，代码复用性差。

### 1.3外部样式表

是将所有的样式放在一个或多个以`.CSS`为扩展名的**外部样式表文件中，通过`link`标签将外部样式表文件链接到HTML文档中。

- 语法：

```html
<head>
  <link rel="stylesheet" type="text/css" href="css文件路径">
</head> 
```

- `link `是个单标签
- `link`标签需要放在`head`头部标签中，并且指定`link`标签的三个属性。

| 属性 | 作用                                                         |
| ---- | :----------------------------------------------------------- |
| rel  | 定义当前文档与被链接文档之间的关系，在这里需要指定为“stylesheet”，表示被链接的文档是一个样式表文件。 |
| type | 定义所链接文档的类型，在这里需要指定为“text/CSS”，表示链接的外部文件为CSS样式表。我们都可以省略 |
| href | 定义所链接外部样式表文件的URL，可以是相对路径，也可以是绝对路径。 |

## 2.元素类型

### 2.1块级元素

语法：

```css
display:block;
```

特点：

- **独占一行**，和相邻块级元素垂直排列
- 不设置宽度时，**宽度自动撑满父元素宽度**
- 可以设置元素的**宽高以及四个方向的内外边距**

> 注意：只有文字才能组成段落，因此p里面不能放块级元素，特别是p不能放div。

### 2.2内联（行内）元素

语法：

```css
display:inline;
```

特点：

- 相邻行内元素从左到右依次**排列在同一行**。直到一行排不下才会换行
- **宽高由内容撑开，不可以设置width和height**
- 可以设置4个方向的内边距以及左右外边距，**不可以设定上下外边距**

### 2.3行内块元素

语法：

```css
display:inline-block;
```

特点：

- 和相邻的行内元素以及行内块元素，从左往右依次排列在同一行里，直到一行排不下才换行。**但是之间会有空白缝隙**
- 默认宽度就是它本身内容的宽度。
- 可以设置元素的宽高以及四个方向的内外边距

### 2.4元素的显示与隐藏

#### 2.4.1display 显示

`display: none` 隐藏对象

`display：block` 除了转换为块级元素之外，同时还有显示元素的意思。

特点： 隐藏之后，不再保留位置。

#### 2.4.2visibility 可见性

`visibility：visible;` 　可见的

`visibility：hidden; `　  隐藏的

特点： 隐藏之后，继续保留原有位置。（停职留薪）

#### 2.4.3overflow 溢出

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。

| 属性值      | 描述                                       |
| ----------- | ------------------------------------------ |
| **visible** | 不剪切内容也不添加滚动条                   |
| **hidden**  | 不显示超过对象尺寸的内容，超出的部分隐藏掉 |
| **scroll**  | 不管超出内容否，总是显示滚动条             |
| **auto**    | 超出自动显示滚动条，不超出不显示滚动条     |

实际开发场景：

1. 清除浮动

```css

```

1. 隐藏超出内容,  不允许内容超过父盒子。

```css

```

## 3.css选择器

### 3.1选择器作用

找到特定的HTML页面元素。

css 就是分两件事， 选对人，  做对事。 

```css
h3 { color: red; }
/*
*这段代码就是2件事， 把h3选出来， 然后把它变成了红色
*/
```

### 3.2基础选择器

通配符选择器(**优先级为：0**):

```css
* { margin: 0; padding: 0; border: none; }
```

元素选择器(**优先级为：1**):

```css
body { background: #eee; }
```

类选择器(**优先级为：10**):

```css
.list { list-style: square; }
```

ID选择器(**优先级为：100**):

```css
#list { width: 500px; margin: 0 auto; }
```

选择器分组:

```css
h1,h2,h3{ color: pink; }
/*此处的逗号我们称之为结合符	*/
```

### 3.3层次选择器

#### 3.3.1后代选择器

用来选择元素或元素组的**子孙后代**

其写法就是把外层标签写在前面，内层标签写在后面，中间用**空格**分隔，先写父亲爷爷，再写儿子孙子。 

语法：

```css
父级 子级{ 属性:属性值; 属性:属性值; }
```

示例：

```css
.list li { margin-top: 10px; background: #abcdef; }
```

#### 3.3.2子元素选择器

子元素选择器只能选择作为某元素**子元素(亲儿子)**的元素。这里的子 指的是 亲儿子  不包含孙子 重孙子之类。

其写法就是把父级标签写在前面，子级标签写在后面，中间跟一个 `>` 进行连接

语法：

```css
#wrap > .inner {color: pink;}
```

> 也可称为直接后代选择器，此类选择器只能匹配到直接后代，不能匹配到深层次的后代元素。

#### 3.3.3交集选择器

交集选择器由两个选择器构成，找到的标签必须满足：既有标签一的特点，也有标签二的特点。

语法：

```css
/*
选择器1.选择器2{ 属性名：属性值 }
*/
h3.class{ color:red }
```

> 其中第一个为标签选择器，第二个为class选择器，两个选择器之间**不能有空格**，如`h3.special`。

交集选择器 是 **并且**的意思。  即...又...的意思

```css
比如：p.one   选择的是： 类名为.one的p标签。  
```

#### 3.3.4并集选择器

**如果某些选择器定义的相同样式**，就可以利用并集选择器，可以让代码更简洁。

并集选择器（CSS选择器分组）是各个选择器通过`,`连接而成的，通常用于集体声明。

语法：

```css
/*
选择器1 ，选择器2 { 属性名：属性值 }
*/
.class ,h3{ color:red }
```

并集选择器通常用于集体声明  ，逗号隔开的，所有选择器都会执行后面样式，逗号可以理解为和的意思。

#### 3.3.5相邻兄弟选择器

它只会匹配紧跟着的兄弟元素

```css
#wrap #first + .inner { color: #f00; }
```

#### 3.3.6通用兄弟选择器

它会匹配所有的兄弟元素(不需要紧跟)

```css
#wrap #first ~ div { border: 1px solid;}
```

### 3.4属性选择器

存在和值属性选择器

```css
[attr]：该选择器选择包含 attr 属性的所有元素，不论 attr 的值为何。
[attr=val]：该选择器仅选择 attr 属性被赋值为 val 的所有元素。
[attr~=val]：表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少一个值为val。
```

子串值属性选择器

```css
[attr|=val] : 选择attr属性的值是val（包括val）或以val-开头的元素。
[attr^=val] : 选择attr属性的值以val开头（包括val）的元素。
[attr$=val] : 选择attr属性的值以val结尾（包括val）的元素。
[attr*=val] : 选择attr属性的值中包含字符串val的元素。	 
/*示例*/
input[type=search] {
  color: skyblue;
}

span[class^=black] {
  color: lightgreen;
}

span[class$=black] {
  color: lightsalmon;
}

span[class*=black] {
  color: lightseagreen;
}
```

### 3.5伪类选择器

#### 3.5.1链接伪类

注意:`:link`，`:visited`，`:target`是作用于**链接**元素的！

- `:link` 表示作为超链接，并指向一个**未访问**的链接
- `:visited` 表示作为超链接，并指向一个**已访问**的链接
- `:target`代表一个特殊的元素，它的id是URI的片段标识符

只有下列的属性才能被应用到**已访问链接**：

```css
:visited{
  color: ;
	background-color: ;
	border-color:;
}
```

示例：

```css
/*未访问链接*/
a:link{
  color:#333;
}
/*已经访问的链接*/
a:visited{
  color:orange;
}
```

#### 3.5.2动态伪类

注意:`:hover`，`:active`基本可以**作用于所有的元素**！

- `:hover`：表示悬浮到元素上
- `:active`：表示匹配被用户激活的元素（点击按住时）

示例：

```css
/*鼠标经过*/
a:hover{
  color:red;
}
/*当我们点击的时候（按下鼠标，别松开的时候）*/
a:active{
  color:green;
}
```

> 注意：由于a标签的:link和:visited可以覆盖了所有a标签的状态，并且只能用在a标签上。所以当:link，:visited，:hover，:active同时出现在a标签身上时 :link和:visited不能放在最后！！！

必须按照以下顺序编写：

```css
 a:link      /* 未访问的链接 */
 a:visited   /* 已访问的链接 */
 a:hover     /* 鼠标移动到链接上 */
 a:active    /* 选定的链接 */
```

> 注意：因为叫链接伪类，所以都是 利用交集选择器  `a:link ` ，`  a:hover  `

#### 3.5.3表单相关伪类

```css
:enabled	匹配可编辑的表单
:disable	匹配被禁用的表单
:checked	匹配被选中的表单
:focus		匹配获焦的表单
```

#### 3.5.4结构性伪类

示例：

```css
ul li:first-child {
  background-color: lightseagreen;
}

ul li:last-child {
  background-color: lightcoral;
}
/*n是从1开始的*/
ul li:nth-child(3) {
  background-color: aqua;
}
```

> `nth-child(index)`参数详解

注意：本质上就是选中第几个子元素

- 取值：
  - index的值从`1`开始计数！！！！
  - n 可以是数字、关键字、公式
  - n 如果是数字，就是选中第几个
  - index可以为变量`n`(只能是字母n，其他字母无效)
  - index可以为`even odd`
  - 常见的公式如下(如果 n 是公式，则从 0 开始计算)



`:first-child`

```css
/*找到第一个位置上是p的儿子元素，如果p不是第一个儿子，则不会被选中*/
p:first-child{}
/*找到所有第一个儿子*/			
:first-child{}		
```

`:last-child`

```css
/*找到最后一个儿子是p的元素，如果p不是最后一个儿子，则不会被选中*/
p:last-child{}
/*找到所有是最后一个儿子的元素*/			
:last-child{}			
```

`:nth-last-child(index)`

```css
/*找到倒数第二个儿子是p的元素，如果p不是倒数第二个儿子，则不会被选中*/
p:nth-last-child(2){}
/*找到所有倒数第二个儿子*/			
:nth-last-child(2){}		
```

`:only-child`(相对于:first-child:last-child 或者 :nth-child(1):nth-last-child(1))

```css
/*选中p元素，并且p元素是唯一的儿子*/
p:only-child{}
/*选中只有一个儿子的所有元素*/		
:only-child{}		
```

`:nth-child`

```css
/* 偶数 */
/*选择偶数个孩子，并且孩子是li*/
  ul li:nth-child(even) {
    background-color: aquamarine;
  }

  /* 奇数 */
  ul li:nth-child(odd) {
    background-color: blueviolet;
  }

  /*n 是公式，从 0 开始计算 */
  ul li:nth-child(n) {
    background-color: lightcoral;
  }

  /* 偶数 */
  ul li:nth-child(2n) {
    background-color: lightskyblue;
  }

  /* 奇数 */
  ul li:nth-child(2n + 1) {
    background-color: lightsalmon;
  }

  /* 选择第 0 5 10 15, 应该怎么选 */
  ul li:nth-child(5n) {
    background-color: orangered;
  }

  /* n + 5 就是从第5个开始往后选择 */
  ul li:nth-child(n + 5) {
    background-color: peru;
  }

  /* -n + 5 前五个 */
  ul li:nth-child(-n + 5) {
    background-color: tan;
  }
```

- `:nth-of-type(index)`参数详解
  - 以==元素==为中心

`nth-of-type()`

```css
/*找到#warp底下的所有子元素,并且选中第一次出现的ele子元素*/
#wrap ele:nth-of-type(1){}
```

`:first-of-type`

```css
/*选中p元素，并且p元素是在所有兄弟元素中第一次出现的那一个，第二次出现的不会选中*/
p:first-of-type{}
```

`:last-of-type`

```css
/*选中最后一个元素*/
:last-of-type{}
```

`:nth-last-type(index)`

```
选中倒数第index的元素
```

`:only-of-type`(相对于:first-of-type:last-of-type 或者 :nth-of-type(1):nth-last-of-type(1))

选中某一类型只有一个的元素

```css
/*选中p元素，并且p元素是所有兄弟元素中唯一的一个p元素类型，有多个p元素，则不会被选中*/
p:only-of-type
/*选中在所有兄弟元素中，只有一个类型的元素*/				
:only-of-type			
```

==**区别**：==

- `nth-child`  选择父元素里面的第几个子元素，不管是第几个类型
- `nth-of-type`  选择指定类型的元素

```css
/*表示匹配#wrap中第index的子元素 这个子元素必须是ele*/
		#wrap ele:nth-child(index)
/*表示匹配#wrap中第index的ele子元素*/
		#wrap ele:nth-of-type(index)	
除此之外:nth-child和:nth-of-type有一个很重要的区别！！
			nth-of-type以元素为中心！！！
```

- :not

  `a:not(:last-of-type)`

- :empty

  内容必须是空的，有空格都不行，有attr没关系

  `div:empty`
  		选中空的div

### 3.6伪元素选择器

```css
::after
::before
::firstLetter
::firstLine
::selection
```

伪元素选择器注意事项:

- `before` 和 `after` 必须有 `content` 属性
- `before` 在内容前面，`after `在内容后面
- `before` 和 `after` 创建的是一个元素，但是属于行内元素
- 创建出来的元素在 `Dom` 中查找不到，所以称为伪元素
- 伪元素和标签选择器一样，权重为 1

```css
div {
      width: 100px;
      height: 100px;
      border: 1px solid lightcoral;
}

    div::after,
    div::before {
      width: 20px;
      height: 50px;
      text-align: center;
      display: inline-block;
    }
    div::after {
      content: '德';
      background-color: lightskyblue;
    }

    div::before {
      content: '道';
      background-color: mediumaquamarine;
    }
```

案列：添加字体图标

```css
p {
   width: 220px;
   height: 22px;
   border: 1px solid lightseagreen;
   margin: 60px;
   position: relative;
}
p::after {
  content: '\ea50';
  font-family: 'icomoon';
  position: absolute;
  top: -1px;
  right: 10px;
}
```

## 4.css字体

### 4.1字体属性

#### 4.1.1`font-style`

`font-style`属性用于定义字体风格，如设置斜体、倾斜或正常字体。

属性值：

| 属性    | 作用                                                    |
| ------- | :------------------------------------------------------ |
| normal  | 默认值，浏览器会显示标准的字体样式  font-style: normal; |
| italic  | 浏览器会显示斜体的字体样式。                            |
| oblique | 倾斜                                                    |

注：平时我们很少给文字加斜体，反而喜欢给斜体标签（`em`，`i`）改为普通模式。

#### 4.1.2`font-weight	`

设置字体粗细。

在html中如何将字体加粗我们可以用标签来实现，使用 `b`  和 `strong` 标签是文本加粗。

可以使用CSS 来实现，但是CSS 是没有语义的。

属性值：

| 属性值  | 描述                                                         |
| ------- | :----------------------------------------------------------- |
| normal  | 默认值（不加粗的）                                           |
| bold    | 定义粗体（加粗的）                                           |
| bolder  | 更粗                                                         |
| lighter | 更细                                                         |
| 100~900 | 400 等同于 normal，而 700 等同于 bold  我们重点记住这句话。只能是正数 |

> 注：我们平时更喜欢用数字来表示加粗和不加粗。

#### 4.1.3`font-size`

设置字体大小。浏览器默认字体大小为16px。

属性值:

- 固定数值：单位为px，em
- 百分比值：**基于父元素或者默认值的一个百分比**。子级大小需要根据父级的大小来计算，如果父级没有指定，则根据浏览器的默认大小来计算。
- em   ：em值的大小是动态的。当定义font-size属性时，1em等于元素的父元素的字体大小。
- **如果不指定字体大小，则继承父元素的大小**
- 一般给body指定整个页面文字的大小。

```css

```



#### 4.1.4`font-family`

用于设置哪一种字体

```css
p{ font-family:Arial,"Microsoft Yahei", "微软雅黑";}
```

注：

1. 属性值为两个或两个以上时，使用英文逗号隔开字体名称
2. 对含有空格的字体，需要使用引号将这些字体包起来
3. 中文字体需要使用引号

#### 4.1.5`line-height`

line-height属性用于设置行间距，就是行与行之间的距离，即字符的垂直间距，一般称为行高。

行高是指上下文本行的基线间的垂直距离，即图中两条红线间垂直距离。

![image-20200325235902822](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200325235902822.png)

行距是指一行底线到下一行顶线的垂直距离，即第一行粉线和第二行绿线间的垂直距离。

![image-20200325235851373](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200325235851373.png)

单位：line-height常用的属性值单位有三种，分别为像素px，相对值em和百分比%，实际工作中使用最多的是像素px

```css
/*一般情况下，行距比字号大7.8像素左右就可以了。*/
line-height: 24px;
```

> 利用行高实现单行文本垂直居中

可以让单行文本在盒子中垂直居中对齐。

**文字的行高等于盒子的高度。**就可以实现

行高   =  上距离 +  内容高度  + 下距离 

上距离和下距离总是相等的，因此文字看上去是垂直居中的。

**行高和高度的三种关系**

- 如果 行高 等于 高度  文字会 垂直居中
- 如果行高 大于 高度   文字会 偏下 
- 如果行高小于高度   文字会  偏上 

```css
div {
			width: 100px;
			height: 50px;
			background-color: pink;
  /*行高等于高度实现单行文本垂直居中*/
			line-height: 50px;
		}
```



#### 4.1.6  font简写属性

font属性用于对字体样式进行综合设置

基本语法格式如下：

```css
选择器 { font: font-style  font-weight  font-size/line-height  font-family;}
```

注意：

- 使用font属性时，必须按上面语法格式中的顺序书写，不能更换顺序，各个属性以**空格**隔开。
- 其中不需要设置的属性可以省略（取默认值），但必须保留font-size和font-family属性，否则font属性将不起作用。

### 4.2自定义字体

语法：`@font-face`

- 允许网页开发者为其网页指定在线字体。 通过这种作者自备字体的方式，可以消除对用户电脑字体的依赖
- 属性：
  - font-family
        所指定的字体名字将会被用于font或font-family属性
  - src
        字体资源
- ==注意:==
  不能在一个 CSS 选择器中定义 @font-face，也就是不能放在声明块的内部，需要单独定义。

```css
@font-face {
    			/*字体名字*/
				font-family:"damu";
    		/*字体所在相对地址*/
				src: url(damu/GOUDYSTO.TTF);
			}
/*自定义字体的使用*/
#test{
				font: 50px 'damu';
			}
```

### 4.3字体图标

- 步骤:

1. 在网上下载字体图标文件
2. 将style.css样式，fonts文件夹引入项目
3. 在网页中引入style.css文件，使用时，只需要在标签中添加样式的类（样式的类在style.css文件中）
4. 可以使用字体和文本样式设置字体图标

- 字体兼容处理网站
      https://www.fontsquirrel.com/tools/webfont-generator
- icomoon字体图标
      https://icomoon.io/#home

```css
/*1.引入字体样式文件夹*/
<link rel="stylesheet" type="text/css" href="style.css"/>
/*3.设置字体图标样式*/
<style type="text/css">
		.test{
				font-size:48px;
				color: pink;
		}
</style>
/*2.通过类名引入字体图标*/
<body>
	<i class="icon-add_circle test" ></i>
</body>
```

- 将svg转换成字体图标步骤：

1. 设计师发的svg是矢量图
2. 将svg导入icomoon字体图标网站
3. 选中每一个图标，然后点击生成，此时将图标与一个字符相绑定了

## 5.文本样式

### 5.1文本基础属性

#### 5.1.1  color

color属性用于定义文本的颜色，

其取值方式有如下3种：

| 表示表示       | 属性值                                  |
| :------------- | :-------------------------------------- |
| 预定义的颜色值 | red，green，blue，还有我们的御用色 pink |
| 十六进制       | #FF0000，#FF6600，#29D794               |
| RGB代码        | rgb(255,0,0)或rgb(100%,0%,0%)           |

技巧：我们实际工作中， 用 16进制的写法是最多的，而且我们更喜欢简写方式比如  #f00 代表红色

#### 5.1.2  text-align

text-align属性用于设置==单行==文本内容的水平对齐，相当于html中的align对齐属性

属性值如下：

| 属性   |       解释       |
| ------ | :--------------: |
| left   | 左对齐（默认值） |
| right  |      右对齐      |
| center |     居中对齐     |

注意：是让盒子里面的内容水平居中， 而不是让盒子居中对齐

#### 5.1.3text-indent

text-indent属性用于设置首行文本的缩进

属性值：

- 其属性值可为不同单位的数值、em字符宽度的倍数、或相对于浏览器窗口宽度的百分比%，允许使用负值

- 建议使用em作为设置单位。

**1em 就是一个字的宽度   如果是汉字的段落， 1em 就是一个汉字的宽度**

```css
p {
      /*行间距*/
      line-height: 25px;
      /*首行缩进2个字  em  1个em 就是1个字的大小*/
      text-indent: 2em;  
 }
```



#### 5.1.4text-decoration

text-decoration   通常我们用于给链接修改装饰效果,设置文本是否显示下划线，上划线，删除线

| 值           | 描述                                                  |
| ------------ | ----------------------------------------------------- |
| none         | 默认。定义标准的文本。 取消下划线（最常用）           |
| underline    | 定义文本下的一条线。下划线 也是我们链接自带的（常用） |
| overline     | 定义文本上的一条线。（不用）                          |
| line-through | 定义穿过文本下的一条线。（不常用）                    |

```css

```



#### 5.1.5letter-spacing

字符间距

#### 5.1.6word-spacing

单词间距，减小或增加单词与单词之间的间距，文本中最少有两个单词，对中文不起作用

#### 5.1.7vertical-align

垂直对齐。
	注：只对显示方式为inline和inline-block和table-cell的元素有效，对block元素无效



### 5.2透明度

#### 5.2.1`opacity`

opacity是一个属性，而非一个属性值	

注意：会将子元素也会设置透明

#### 5.2.2`rgba`

- 首先它是一个属性值，语法为rgba（r,g,b,a） 
- 不限于背景颜色，可以是文字颜色，阴影等
- 示例：background: rgba(0,0,0,.5);
- 用途：背景透明文字不透明

示例：

```css
#wrap{
				width: 300px;
				height: 300px;
				margin: 100px auto;
    			/*背景透明*/
				background: rgba(0,0,0,.5);
   				/*文字颜色*/
				color: #ffffff;
				font-size: 30px;
				line-height: 300px;
				text-align: center;
}
```

==模糊背景效果：==

```css
/********************html*********************/
<div id="wrap">
	<img src="img/1.jpg" width="64px" height="64px"/>
	<div id="bg"></div>
</div>
/***********************css**********************/
#wrap{
    height:100px;
    background:rgba(0,0,0,0.5);
    position:relative;
}
#wrap #bg{
  /**/
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:url(img/1.jpg)no-repeat;
    /*让图片铺满容器*/
    background-size:100% 100%;
    /*让图片层级在最下面*/
    z-index:-1;
    /*让元素模糊*/
    filter:blur(10px);
}
```

#### 5.2.3区别

有`opacity`属性的所有后代元素都会继承 `opacity `属性

而`rgba`后代元素不会继承透明属性

### 5.3文字阴影

`text-shadow`用来为文字添加阴影，而且可以添加多层，阴影值之间用==逗号==隔开。（多个阴影时，==第一个阴影在最上边==）

- 默认值：none        不可继承 
- 值
      `<color>`
             可选。可以在偏移量之前或之后指定。如果没有指定颜色，则使用UA（用户代理）选择的颜色。
      `<offset-x> <offset-y>`
            必选。这些长度值指定阴影相对文字的偏移量。
           <offset-x> 指定水平偏移量，若是负值则阴影位于文字左边。        
           <offset-y> 指定垂直偏移量，若是负值则阴影位于文字上面。
           如果两者均为0，则阴影位于文字正后方(如果设置了<blur-radius> 则会产生模糊效果)。
      `<blur-radius>`
           可选。这是 <length> 值。如果没有指定，则默认为0。
           值越大，模糊半径越大，阴影也就越大
- 示例：
  `text-shadow:gray 10px 10px 10px，pink 10px 10px 10px;`
  注意：颜色可以放最前面或最后面，==但不能放数字中间==

==浮雕效果：==

```css
h1{
    font-size:100px/200px "微软雅黑";
    color:white;
    text-shadow:black 1px 1px 100px;
}
```

==文字模糊效果：==

```css
h1{
    font-size:100px/200px "微软雅黑";
    color:black;
    /*一秒钟慢慢变模糊*/
    transition:1s;
}
h1:hover{
    /*改变字体颜色并为白色并且颜色透明*/
    color:rgba(0,0,0,0);
    /*模糊效果*/
    text-shadow:black 0 0 100px;
}
```

### 5.4文字描边

webkit内核独有的属性

示例：

```css
-webkit-text-stroke:10px pink;
```

### 5.5文字排版

`direction`:控制文字的方向

注：一定要配合`unicode-bidi:bidi-override;`来使用

示例：

```css
 p{
	width:300px;
	border:1px solid #000;
	font:14px/30px "宋体";
     /*文字从右往左读*/
	direction:ltr;
	unicode-bidi:bidi-override;
}
```

### 5.6  超出显示省略号

`text-overflow `确定如何向用户发出未显示的溢出内容信号。它可以被剪切，显示一个省略号`...`

示例：

```css
 p{
	width:300px;
	border:1px solid #000;
	font:14px/30px "宋体";
	//下面三条缺一不可
     /*让文字不换行显示*/
	white-space:nowrap; 
     /*切掉溢出的文字*/
	overflow:hidden;
     /*出现省略号*/
	text-overflow:ellipsis; 
}
/*
    注意：
    要生效本样式，必须设置以下四个样式(display为inline时此样式不生效)
    white-space:nowrap; 
    overflow:hidden;
    text-overflow:ellipsis;

    display：inline-block|block；;
*/
```

## 6.背景样式

### 6.1背景颜色

语法：

```css
background-color:颜色值; 
/*默认值：transparent(透明的)*/
```

示例：

```css
.bg {
			width: 800px;
			height: 500px;
			background-color: pink;
		}
```

### 6.2背景图片

属性用于为一个元素设置一个或多个背景图像，图像在绘制时，以z轴方向堆叠的方式进行。**先指定的图像会在之后指定的图像上面进行绘制(也就是前面的图像压住后面的图像)**。

注意：`background-color`会在image之下进行绘制，边框和内容会在image之上进行绘制
默认值：none   不可继承

语法：

```css
background-image : none | url (url) 
```

| 参数 |              作用              |
| ---- | :----------------------------: |
| none |       无背景图（默认的）       |
| url  | 使用绝对或相对地址指定背景图像 |

示例：

```css
.bg {
			width: 800px;
			height: 500px;
			/*背景图片 1. 必须加url 2. url 里面的地址不要加 引号*/
			background-image: url(images/l.jpg);
		}
```

### 6.3背景平铺

CSS 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。
默认值：repeat 不可继承

语法：

```css
background-repeat : repeat | no-repeat | repeat-x | repeat-y 
```

| 参数      |                 作用                 |
| --------- | :----------------------------------: |
| repeat    | 背景图像在纵向和横向上平铺（默认的） |
| no-repeat |            背景图像不平铺            |
| repeat-x  |         背景图像在横向上平铺         |
| repeat-y  |          背景图像在纵向平铺          |

示例：

```css
.bg {
			width: 800px;
			height: 500px;
			background-color: pink;
			/*背景图片 1. 必须加url 2. url 里面的地址不要加 引号*/
			background-image: url(images/l.jpg);
			/*默认的是平铺图 repeat*/
			/*background-repeat: repeat;*/
			/*背景图片不平铺*/
			/*background-repeat: no-repeat;*/
			/*横向平铺 repeat-x*/
			/*background-repeat: repeat-x;*/
			/*纵向平铺*/
			background-repeat: repeat-y;
		}
```

### 6.4背景位置

指定背景位置的初始位置

默认值：0% 0%(此时在元素边框内的左上角)   不可继承

100% 100% 此时为右下角

值：
百分比：偏移量为相对于元素的宽度和背景图片的宽度之差的百分数

- 第一个值：元素在水平方向的位移     
- 第二个值：元素在垂直方向的位移 
- 水平偏移量为正值时，表示从左向右移动
- 垂直偏移量为正值时，表示从上到下移动

注：偏移量为百分数时，定位时会折合成px值

- x轴=（元素的宽度-背景图片的宽度）*x%
- y轴=（元素的高度-背景图片的高度）*y%

```css
background-position:30% 36%;
/*
	元素宽度为400px，高度为150px
	图片宽度为128px，高度为128px
	此时相对于左边框向右偏移（400-128）*30%=81.6px
	相对于上边框向下偏移（150-128）*36%=7.92px
*/
```

注意：

​    如果只有一个值被指定，则这个值就会默认设置背景图片位置中的水平方向，与此同时垂直方向的默认值被设置成50%。

语法：

```css
background-position : length || length

background-position : position || position 
```

| 参数     |                              值                              |
| -------- | :----------------------------------------------------------: |
| length   |         百分数 \| 由浮点数字和单位标识符组成的长度值         |
| position | top \| center \| bottom \| left \| center \| right   方位名词 |

注意：

- 必须先指定background-image属性
- position 后面是x坐标和y坐标。 可以使用方位名词或者 精确单位。
- 如果指定两个值，两个值都是方位名字，则两个值前后顺序无关，比如left  top和top  left效果一致
- 如果只指定了一个方位名词，另一个值默认居中对齐。
- 如果position 后面是精确坐标， 那么第一个，肯定是 x  ,第二的一定是y
- 如果只指定一个数值,那该数值一定是x坐标，另一个默认垂直居中
- 如果指定的两个值是 精确单位和方位名字混合使用，则第一个值是x坐标，第二个值是y坐标

示例：

```css
	.bg {
			width: 800px;
			height: 500px;
			background-color: pink;
			/*背景图片 1. 必须加url 2. url 里面的地址不要加 引号*/
			background-image: url(images/l.jpg);
			/*背景图片不平铺*/
			background-repeat: no-repeat;
			/*背景位置*/
			/*background-position: x坐标 y坐标;*/
			/*background-position: right top; 右上角*/
			/*background-position: left bottom; 左下角*/
			/*background-position: center center; 水平居中 垂直居中*/
			/*则两个值前后顺序无关 因为是方位名词*/
			/*background-position:  center left; */
			/*如果只指定了一个方位名词，另一个值默认居中对齐*/
			background-position: top; 
     /*那么第一个，肯定是 x 是 50   第二的一定是y 是 10*/
			background-position: 50px 10px ;
			/*以下说明  x 10像素  y 垂直居中的*/
			background-position: 10px center;
			background-position: center 10px;
		}
```

超大背景写法：

```css
	body {
    	/*让浏览器出现滚动条*/
			height: 3000px;
			background-image: url(images/sms.jpg);
			background-repeat: no-repeat;
			/*这种写法一般是我们以后 超大背景图片的做法 背景定位*/
			background-position: center top;
		}
```

小图片左侧对齐盒子：

```css
.icon {
			width: 150px;
			height: 35px;
			background-color: pink;
			background-image: url(images/sina.png);
			background-repeat: no-repeat;
  		/*距左侧10px，垂直居中*/
			background-position: 10px center;
		}
```

效果图：

<img src="D:%5CGitHub%5CwebNote%5CCSS%5CCSS%E6%95%99%E7%A8%8B.assets%5Cimage-20200326205706214.png" alt="image-20200326205706214" style="zoom:100%;" />

### 6.5背景固定

决定背景是在视口中固定的还是随包含它的区块滚动的。

| 参数   |                作用                |
| ------ | :--------------------------------: |
| scroll | 背景图像是随对象内容滚动（默认值） |
| fixed  |            背景图像固定            |

语法：

```css
	background-attachment: fixed;
```

示例：

```css
body {
			height: 3000px;
			background-image: url(images/sms.jpg);
			background-repeat: no-repeat;
			/*这种写法一般是我们以后 超大背景图片的做法 背景定位*/
			background-position: center top;
			/*背景固定的*/
			background-attachment: fixed;
		}
```

### 6.6背景简写

注：当简写属性超过三条时，不建议写简写属性

background：属性的值的书写顺序官方并没有强制标准的。为了可读性，建议大家如下写：

语法：

```css
background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;
```

示例：

```css
body {
			height: 3000px;
			/*background-color: #ccc;
			background-image: url(images/sms.jpg);
			background-repeat: no-repeat;
			background-position: center top;
			background-attachment: fixed;*/
			/*background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;*/
			background: #ccc url(images/sms.jpg) no-repeat fixed center top;
		}
```

链接导航综合案例：

html结构：

```html
<div class="nav">
  <a href="#">首页</a>
  <a href="#">首页</a>
  <a href="#">首页</a>
  <a href="#">首页</a>
  <a href="#">首页</a>
</div>
```

css样式：

```css
.nav {
			/*让里面的6个链接 居中对齐水平  这句话对 行内元素 行内块元素都有效果的*/
			text-align: center;
		}
		.nav a {
			/*有大小的 因为a 是行内元素 不能直接设置宽度和高 必须要转换 行内块元素*/
			display: inline-block;
			width: 120px;
			height: 50px;
			/*行高等于盒子的高度 就可以让单行文本垂直居中*/
			line-height: 50px;
			color: #fff;
			/*background-color: pink;*/
      /*去掉下划线*/
			text-decoration: none;
			/*背景简写*/
			background: url(images/bg.png) no-repeat;
		}
		/*鼠标经过nav里面的链接， 背景图片更换一下就好了*/
		.nav a:hover {
			background-image: url(images/bgc.png);
		}
```

### 6.7背景透明

语法：

```css
background: rgba(0, 0, 0, 0.3);
```

- 最后一个参数是alpha 透明度  取值范围 0~1之间
- 我们习惯把0.3 的 0 省略掉  这样写  background: rgba(0, 0, 0, .3);
- 注意：  背景半透明是指盒子背景半透明， 盒子里面的内容不受影响
- 因为是CSS3 ，所以 低于 ie9 的版本是不支持的。

### 6.8background-origin

设置背景的渲染的起始位置

==默认情况下背景图片是从padding box开始绘制，从border box开始剪裁==	

可选值：

​     border-box

​     padding-box

​    content-box

### 6.9  background-clip

设置背景裁剪位置

默认从border-box开始剪裁

文字外的内容都被剪切：`-webkit-background-clip:text;`

### 6.10  background-size

设置背景图片大小

默认值：auto auto  不可继承

值：
百分比：  指定背景图片相对背景区（background positioning area）的百分比。背景区由background-origin设置，默认为盒模型的内容区与内边距
auto：  以背景图片的比例缩放背景图片。

注意：
单值时，这个值指定图片的宽度，图片的高度隐式的为auto
两个值: 第一个值指定图片的宽度，第二个值指定图片的高度   

示例：`background-size: 100% 100% ;`

### 6.11渐变

==渐变是图片渐变而不是颜色渐变==

#### 6.11.1线性渐变

为了创建一个线性渐变，你需要设置一个起始点和一个方向（指定为一个角度）。你还要定义终止色。终止色就是你想让浏览器去平滑的过渡过去，并且你必须指定至少两种，当然也会可以指定更多的颜色去创建更复杂的渐变效果。

默认从上到下发生渐变
    linear-gradient(red,blue);

`background-image:linear-gradient(red,blue) ;`

- 改变渐变方向：（top bottom left right）
      linear-gradient(to 结束的方向,red,blue);

  `background-image:linear-gradient(to top,red,blue) ;`

- 使用角度
      linear-gradient(角度,red,blue);

`background-image:linear-gradient(45deg,red,blue) ;`

- 颜色节点的分布（第一个不写为0%，最后一个不写为100%）
      linear-gradient(red 长度或者百分比,blue 长度或者百分比);

```css
background-image:linear-gradient(90deg,red 10%,yellow 20%,green 30%) ;
/*
	10%前面是纯红色，
	10%-20%是red到yellow的渐变
	20-30%是yellow到green的渐变
	30%以后是green的纯色区域
*/
```

- 重复渐变
      repeating-linear-gradient(60deg,red 0,blue 30%);

```css
background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,1) 300px) ;
```

案例:

==画廊灯==

```css
/*静止系统滚动条*/
html,body{
			height: 100%;
			overflow: hidden;
}
#wrap{
			width: 40px;
			height: 300px;
			border: 1px solid;
			margin: 100px auto;
    		/*截掉超出的区域*/
			overflow: hidden;
}
#wrap > .inner{
			height: 600px;
    		/*
    		black 0px,black 10px表示黑到黑的渐变，也就是纯色
    		white 10px,white 20px表示白到白的渐变，也就是纯色
    		如果写black 10px,white 20px,不会出现纯色，
    		如果写black 10px,white 10px，渐变不会被重复，因为没有渐变
    */
			background:repeating-linear-gradient(135deg,black 0px,black 10px,white 10px,white 20px);
}
<div id="wrap">
	<div class="inner"></div>
</div>

script type="text/javascript">
var inner = document.querySelector("#wrap > .inner");
var flag =0;
//定时器
setInterval(function(){
		flag++;
		if(flag==300){
				flag=0;
		}
inner.style.marginTop = -flag+"px";
},1000/60)
```

==光斑==

```css
<style>
body{
		background: black;
		text-align: center;
		font: 50px/200px "微软雅黑";
		color: rgba(255,255,255,.3);
}
h1{
		display: inline-block;
		background: linear-gradient(120deg,rgba(255,255,255,0) 100px,rgba(255,255,255,1) 180px,rgba(255,255,255,0) 270px);
		background-position: -300px 0;
		background-repeat:no-repeat ;
		-webkit-background-clip: text;
}
</style>
<h1>atguigu尚硅谷</h1>

<script type="text/javascript">
	var h1Node = document.getElementsByTagName("h1")[0];
	var left =-300;
	move();
	function move(){
		setInterval(function(){
				left+=10;
				if(left>1000){
					left=-300;
				}
				h1Node.style.backgroundPosition=left+"px 0px";
			},20)
		}
</script>
```

#### 6.11.2径向渐变

radial-gradient() 函数创建一个<image>，用来展示由原点（渐变中心）辐射开的颜色渐变

默认均匀分布
`background-image:radial-gradient(red,blue);`

示例：

```css
background-image:radial-gradient(red,blue);
background-image: radial-gradient(red,blue,pink,black);
```

不均匀分布

```css
background-image:radial-gradient(red 50%,blue 70%);
```

改变渐变的形状

```css
background-image:radial-gradient(circle ,red,blue)
/*
 circle
 ellipse（默认为椭圆）
*/
```

渐变形状的大小

```css
background-image:radial-gradient(closest-corner  circle ,red,blue)
/*
closest-side   最近边
farthest-side  最远边
closest-corner 最近角
farthest-corner 最远角  （默认值）
*/
```

改变圆心

```css
background-image:radial-gradient(closest-corner  circle at 10px 10px,red,blue);
```

重复渐变

```css
background-image:repeating-radial-gradient(closest-corner  circle,red 30%,blue 50%);
```

### 6.12图片的垂直水平居中

```css
body:after{
			content: "";
			display: inline-block;
			height: 100%;
			vertical-align: middle;
}
img{
			vertical-align: middle;
}
```



## 7.其他样式

### 7.1鼠标样式cursor

 设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

| 属性值          | 描述       |
| --------------- | ---------- |
| **default**     | 小白  默认 |
| **pointer**     | 小手       |
| **move**        | 移动       |
| **text**        | 文本       |
| **not-allowed** | 禁止       |

### 7.2轮廓线 outline

是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。 

语法：

```css
 outline : outline-color ||outline-style || outline-width 
```

 但是我们都不关心可以设置多少，我们平时都是去掉的。 li  

最直接的写法是 ：  outline: 0;   或者  outline: none;

```css
 <input  type="text"  style="outline: 0;"/>
```

### 7.3防止拖拽文本域resize

实际开发中，我们文本域右下角是不可以拖拽： 

```css
<textarea  style="resize: none;"></textarea>
```

### 7.4vertical-align 垂直对齐

- 有宽度的块级元素居中对齐，是margin: 0 auto;
- 让文字居中对齐，是 text-align: center;

但是我们从来没有讲过有垂直居中的属性。

vertical-align 垂直对齐，它只针对于**行内元素**或者**行内块元素**，

语法：

```css
vertical-align : baseline |top |middle |bottom 
```

设置或检索对象内容的垂直对其方式。

- 注意：

  vertical-align 不影响块级元素中的内容对齐，它只针对于**行内元素**或者**行内块元素**，

  特别是行内块元素， **通常用来控制图片/表单与文字的对齐**。

#### 7.4.1图片、表单和文字对齐

所以我们知道，我们可以通过vertical-align 控制图片和文字的垂直关系了。 默认的图片会和文字基线对齐。

![image-20200327000840793](E:%5CwebNote%5CCSS%5CCSS%E6%95%99%E7%A8%8B.assets%5Cimage-20200327000840793.png)



![image-20200327000852007](E:%5CwebNote%5CCSS%5CCSS%E6%95%99%E7%A8%8B.assets%5Cimage-20200327000852007.png)

#### 7.4.2去除图片底侧空白缝隙

![image-20200327000907832](E:%5CwebNote%5CCSS%5CCSS%E6%95%99%E7%A8%8B.assets%5Cimage-20200327000907832.png)

- 原因：

  图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐。

  就是图片底侧会有一个空白缝隙。

- 解决的方法就是：  

  - 给img vertical-align:middle | top| bottom等等。  让图片不要和基线对齐。
  - 给img 添加 display：block; 转换为块级元素就不会存在问题了。

### 7.5溢出的文字省略号显示

#### 7.5.1white-space

white-space设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容 

```css
white-space:normal ；默认处理方式

white-space:nowrap ；　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。
```

#### 7.5.2text-overflow 文字溢出

设置或检索是否使用一个省略标记（...）标示对象内文本的溢出

```css
text-overflow : clip ；不显示省略标记（...），而是简单的裁切 

text-overflow：ellipsis ； 当对象内文本溢出时显示省略标记（...）
```

**注意**：

一定要首先强制一行内显示，再次和overflow属性  搭配使用

示例：

```css
  /*1. 先强制一行内显示文本*/
      white-space: nowrap;
  /*2. 超出的部分隐藏*/
      overflow: hidden;
  /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
```

### 7.6百分比参照于谁

width margin padding参照与包含块的width

height参照与包含块的height		

left参照与包含块的width

top参照与包含块的height

### 7.7滚动条

1. ==高度需要一层一层继承==。如给==body==设置`height: 100%;`则首先需要给==html==设置`height: 100%;`，否则body的高度值无效。*（只是针对于百分比设置，固定值不受这个约束）*
2. html和body其中任意一个设置`overflow：scroll`，则滚动条作用给文档
3. html和body同时设置`overflow：scroll`，则html的设置会作用给文档，而body的设置会作用给自身。

```css
html{
		margin: 30px;
		border: 1px solid;
		height: 100%;
		overflow: scroll;
}
body{
		margin: 30px;
		border: 1px solid pink;
		height: 100%;
		overflow: scroll;
}
```

应用：静止系统默认滚动条

```css
html,body{
			height: 100%;
			overflow: hidden;
}
```

### 7.8

## 8.尺寸

### 8.1宽度

width默认值为auto。

当设置width为100%时，继承父元素的全部宽度。此时如果加margin或者padding，会先根据100%计算出当前元素宽度，然后再的元素两边添加margin或者padding。

```css
/************html***************/
<div id="wrap">
	<div id="inner"></div>
</div>
/************css***************/
#wrap {
		width: 300px;
		height: 300px;
		background: deeppink;
	}
#inner {
		margin: 0 50px;
		padding: 0 20px;
		/* width:auto; */
		width: 100%;
		height: 100px;
		background: pink;
		}
/*
	说明：此时inner的width为300px，左右各加了padding 20px，margin 50px
*/
```





## 9.css三大特性

### 9.1层叠性

所谓层叠性是指多种CSS样式的叠加。

是浏览器处理冲突的一个能力，如果一个属性通过两个相同选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉。

原则：

- 样式冲突，遵循的原则是**就近原则。** 那个样式离着结构近，就执行那个样式。
- 样式不冲突，不会层叠

示例：

```css
div{
  color:red;
  font-size:18px;
}
div{
  color:pink;
}
/*
	此时div里面文字颜色为pink，字体大小为18px。即声明相同样式时，后面样式覆盖前面样式。font-size样式不冲突，则不会覆盖。
*/
```

### 9.2继承性

概念：

- 子标签会继承父标签的某些样式，如文本颜色和字号。

- 想要设置一个可继承的属性，只需将它应用于父元素即可。

**注意**：

- 恰当地使用继承可以简化代码，降低CSS样式的复杂性。比如有很多子级孩子都需要某个样式，可以给父级指定一个，这些孩子继承过来就好了。
- 子元素可以继承父元素的样式（**text-，font-，line-这些元素开头的可以继承，以及color属性**）

示例：

```html
<div>
  <p>
    我是p里面的
  </p>
</div>
```

css样式：

```css
div{
  color:red;
  font-size:18px;
}
/*此时p元素里面文字继承父亲div的样式。颜色为red，大小为18px*/
```

### 9.3优先级

定义CSS样式时，经常出现两个或更多规则应用在同一元素上，此时，

* 选择器相同，则执行层叠性
* 选择器不同，就会出现优先级的问题。

#### 9.3.1权重计算公式：

| 标签选择器               | 计算权重公式 |
| ------------------------ | ------------ |
| 继承或者 `*`             | 0,0,0,0      |
| 元素（元素选择器）       | 0,0,0,1      |
| 类，伪类                 | 0,0,1,0      |
| ID选择器                 | 0,1,0,0      |
| 行内样式 `style=""`      | 1,0,0,0      |
| 每个`!important`  重要的 | ∞ 无穷大     |

- 值从左到右，左面的最大，一级大于一级，**数位之间没有进制，级别之间不可超越**。 

- 关于CSS权重，我们需要一套计算公式来去计算，这个就是 CSS Specificity（特殊性）

```css
div {
    color: pink!important;  
}
```

#### 9.3.2权重叠加:

我们经常用交集选择器，后代选择器等，是有多个基础选择器组合而成，那么此时，就会出现权重叠加。

就是一个简单的加法计算:

```css
/*权重为：1+1+1=3 */
div ul  li{  }
/*权重为：10+1+1=12 */
.nav ul li{}
/*权重为：1+10=11 */
a:hover {}
/*权重为：10+1=11 */
.nav a {}
```

>注意： 数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0，**所以不会存在10个div能赶上一个类选择器的情况**。

示例：

```css
div div div div div div div div div div div div {/*权重为：0,0,0,12*/
  color:red
}

.me{/*权重为：0,0,1,0*/
  color:blue
}
/*颜色为blue。因为权重计算不存在进位*/
```

#### 9.3.3继承的权重是0

其实，我们修改样式，**一定要看该标签有没有被选中**。

1） 如果选中了，那么以上面的公式来计权重。谁大听谁的。 
2） 如果没有选中，那么权重是0，因为继承的权重为0。

示例：

html结构：

```html
<div class="demo">
	<p>继承的权重是0</p>
</div>
```

css：

```css
div{
  color:red;
}
p{
  color:green;
}
.demo{/*因为demo没有选p标签，所以继承的权重为0*/
  color:blue
}
/*此时p元素里面文字颜色为green*/
```

#### 9.3.4就近原则

权重相同，就采用就近原则（后写的样式离结构近）

html结构：

```html
<div id="box1" class="c1">
		<div id="box2" class="c2">
			<div id="box3" class="c3">
				文字
			</div>
		</div>
	</div>
```

css:

```css
.c1 .c2 div{  
			color: blue;
		}
		div #box3 {/*权重为101*/
			color:green;
		}
		#box1 div { /*权重为101*/
			color:yellow;
		}
/*权重相同，就采用就近原则（后写的样式近）。因此文字颜色为yellow*/
```

## 10.盒模型

* 盒子模型有元素的内容（content）、边框（border）、内边距（padding）、和外边距（margin）组成。
* 盒子里面的文字和图片等元素是内容区域
* 盒子的厚度 我们成为 盒子的边框 
* 盒子内容与边框的距离是内边距（类似单元格的 cellpadding)
* 盒子与盒子之间的距离是外边距（类似单元格的 cellspacing）

![标准盒子模型](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/标准盒子模型.png)

### 10.1盒子边框

语法：

```css
border : border-width || border-style || border-color 
```

| 属性         |          作用          |
| ------------ | :--------------------: |
| border-width | 定义边框粗细，单位是px |
| border-style |       边框的样式       |
| border-color |        边框颜色        |

边框的样式：

- none：没有边框即忽略所有边框的宽度（默认值）
- solid：边框为单实线(最为常用的)
- dashed：边框为虚线  
- dotted：边框为点线

示例：

```css
div{
  border-width:1px;
  border-style:solid;
  border-color:red;
}
/*简写形式：*/
div{
  border:1px solid red;
}
```

简写：

```css
1.border-width	简写属性
		border-top-width	上边框宽度
		border-right-width	右边框宽度
		border-bottom-width	下边框宽度
		border-left-width	左边框宽度
2.简写属性取值个数说明：
		border-width：1px；同时设置四个边框的大小
		border-width：1px 2px；上下为1px，左右为2px；
		border-width: 1px 2px 3px; 上为1px，左右为2px，下为3px；
		border-width：1px 2px 3px 4px;设置顺序为上右下左
```

#### 10.1.1分别指定四个边框样式

```css
div {
			width: 200px;
			height: 400px;
			/*上边框写法*/
			border-top: 2px solid red;
  		/*右边框写法*/
			border-right: 1px solid blue;
  		/*下边框写法*/
			border-bottom: 1px solid pink;
  		/*左边框写法*/
			border-left: 1px solid green;
}	
```

#### 10.1.2只保留输入框的下边框写法

```css
input {
    	/*去掉上左右边框*/
			border-top: none;
			border-left: none;
			border-right: none;
    	/*下边框样式*/
			border-bottom: 1px dashed red;
		}
/*简写*/
input{
  /*去掉四个边框*/
  border: none;
  /*指定下边框*/
	border-bottom: 1px dashed red;
}
```

效果：

![image-20200902191950630](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200902191950630.png)

#### 10.1.3表格的细线边框

- 通过表格的`cellspacing="0"`,将单元格与单元格之间的距离设置为0，

- 但是两个单元格之间的边框会出现重叠，从而使边框变粗

- 通过css属性设置边框：

```css
table{ 
  border-collapse:collapse;
} 
/*
	collapse 单词是合并的意思。
	border-collapse:collapse; 表示相邻边框合并在一起。
*/
```

设置表格的完整样式：

```css
table {
		width: 500px;
		height: 300px;
		border: 1px solid red;
	}
	td {
		border: 1px solid red;
		text-align: center;
	}
	table, td {
		border-collapse: collapse;  /*合并相邻边框*/
	}
```

#### 10.1.4圆角边框

 用来设置边框圆角。

- 当使用一个半径时确定一个圆形；

- 当使用两个半径时确定一个椭圆，这个(椭)圆与边框的交集形成圆角效果。

语法：

```css
border-radius:length;  /*其中每一个值可以为 数值或百分比的形式。*/
```

**取值类型：**

- 固定的px值定义圆形半径或椭圆的半长轴，半短轴。**不能用负值**
- 使用百分数定义圆形半径或椭圆的半长轴，半短轴。水平半轴相对于盒模型的宽度；垂直半轴相对于盒模型的高度。**不能用负值**

**简写属性：**

```css
div{
  /*左上圆角*/
	border-top-left-radius:30px;
  /*右上圆角*/
	border-top-right-radius:30px;
  /*右下圆角*/
	border-bottom-right-radius:30px;
  /*左下圆角*/
	border-bottom-left-radius:30px;
}
/*半径的第一个语法取值个数可取1~4个值:*/
div{
  /*1个值:作用于四个角*/
   border-radius: 10px;
  /*2个值:第一个值为左上和右下对角，第二个值为右上和左下对角*/
   border-radius: 10px 30px;
  /*3个值:第一个值为左上角，第二个值为右上和左下对角，第三个值为右下角*/
   border-radius: 10px 20px 30px;
   /*4个值:依次为：左上，右上，右下，坐下顺时针*/
   border-radius: 10px 20px 30px 40px;
}
```

注意:
    百分比值
       在旧版本的 Chrome 和 Safari 中不支持。(fixed in Sepember 2010)
       在 11.50 版本以前的 Opera 中实现有问题。
       Gecko 2.0 (Firefox 4) 版本前实现不标准：水平半轴和垂直半轴都相对于盒子模型的宽度。
       在旧版本的 iOS (iOS 5 之前) 和 Android 中 (WebKit 532 之前) 不支持。

> 圆点

```css
div {
        width: 10px;
        height: 10px;
        background: tomato;
  			/*为正方形宽度的一半就是圆*/
  			border-radius:5px;
  			/*与下面样式等价*/
        border-radius: 50%;/*百分比值表示高度和宽度的一半。因此只适合正方形设置为圆*/
}
```

![image-20200903155741335](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903155741335.png)

> 风车

html结构

```html
<div class="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
</div>
```

css:

```css
.box{
	width:400px;
	height:400px;
	margin:50px auto; 
	transition:5s linear;
}
.box div{
	width:180px;
	height:180px;
	margin:10px;
	border:1px solid #000; 
	box-sizing:border-box;
	float:left;
	background:pink;
}
.box div:nth-child(1),.box div:nth-child(4){ 
	border-radius:0 60%;
}
.box div:nth-child(2),.box div:nth-child(3){ 
	border-radius:60% 0;
}
.box:hover{
	transform:rotate(720deg);
}
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903160353855.png" alt="image-20200903160353855" style="zoom:50%;" />

总结：如果为矩形，则使用px值设置为圆角边框。如果为正方形，则用百分比设置为圆形。

#### 10.1.5 css三角

边框特点：
	1.当盒子宽高为0时，边框宽度大于1px时，边框形状为三角形
	2.当盒子宽高不为0时，边框宽度为1px时，边框形状是一条直线，当边框宽度大于1px时，边框形状为梯形

> 倒三角

```css
div{
    width:0;
    height:0;/*高度可以不为0*/
    border:10px solid #fff;
    border-top-color:red;
}
/*原理：将所有边框颜色设置为透明或者白色，然后单独设置需要显示上边框的颜色*/
```

![image-20200903152504641](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903152504641.png)

> 直线

```css
/********水平直线**************/
div {
        width: 100px;/*控制水平直线的长度*/
        height: 0px;/*水平直线可以不添加高度，因为div为块级盒子，默认沾满一行。*/
        border: 1px solid transparent;
        border-top-color: red;
}

/*
	注意：
			当设置垂直直线时，必须要加height，因为div盒子高度默认为内容高度。盒子多高，垂直直线就多高
*/
/********垂直直线**************/
div {
        width: 1px;
        height: 150px;/*控制垂直直线的长度*/
        border: 1px solid transparent;
        border-left-color: red;
}
/*原理：当盒子宽高不为0时，边框宽度为1px时，边框形状是一条直线*/
```

![image-20200903153121633](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903153121633.png)

> 梯形

```css
div {
        width: 100px;
        height: 100px;
        border: 10px solid transparent;
        border-top-color: red;
}
/**原理：当盒子宽高不为0时，当边框宽度大于1px时，边框形状为梯形*/
```

![image-20200903153308471](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903153308471.png)

> 四面三角形

```css
div {
        width: 0px;
        height: 0px;
  			font-size: 0; 
  			line-height: 0;
        border: 10px solid transparent;
        border-right-color: tomato;
        border-top-color: turquoise;
        border-left-color: violet;
        border-bottom-color: yellow;
}
/*原理：
		将所有边框颜色设置为透明或者白色，然后单独设置需要显示上边框的颜色
*/
/*注意：
		为了照顾兼容性 低版本的浏览器，加上 font-size: 0;  line-height: 0;
*/
```

![image-20200903155439897](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903155439897.png)

#### 10.1.6边框图片

`border-image` 属性允许在元素的边框上绘制图像。这使得绘制复杂的外观组件更加简单，使用 `border-image` 时，其将会替换掉 `border-style` 属性所设置的边框样式。

默认值：不可继承

```css
div{
  border-image-source: none;
	border-image-slice: 100%;
	border-image-width: 10px;
	border-image-outset: none;
	border-image-repeat: stretch;
}
```

> border-image-source

`border-image-source` 属性定义使用一张图片来代替边框样式；如果值为`none`，则仍然使用`border-style` 定义的样式。

默认值：none   不可继承

语法：`border-image-source:url(img/border-image.png) ;`

> border-image-slice

`border-image-slice` 属性会通过规范将` border-image-source`  的图片明确的分割为9个区域：四个角，四边以及中心区域。并可指定偏移量

语法：`border-image-slice:33.3333% ;`

注意：切割顺序是==上——右——下——左==的顺序切割。

第九个方格默认是不填充，如果需要填充，需要在切割数字后面写`fill`关键字

- 示例：`border-image-slice:33.3333% fill;`


默认值：100%    不可继承

百分比参照于image本身！！

> border-image-repeat

`border-image-repeat` 定义图片如何填充边框。

- 为单个值，设置所有的边框；
- 为两个值，分别设置水平与垂直的边框。

默认值：stretch  不可继承

值：
stretch （拉伸）
repeat，round（平铺）

示例：`border-image-repeat:round;`

> border-image-width

`border-image-width` 定义图像边框宽度。 

默认值：1   不可继承

示例：`border-image-width:20px ;`

注意：这个设置的是图片边框的大小，并不是边框（`border`）的大小

> border-image-outset

`border-image-outset`属性定义边框图像可超出边框盒的大小

默认值：0  不可继承

正值： 可超出边框盒的大小。

不可取负值

示例：`border-image-outset:10px ;`

### 10.2盒子内边距

`padding`属性用于设置内边距。 **是指 边框与内容之间的距离。**

| 属性           | 作用     |
| -------------- | :------- |
| padding-left   | 左内边距 |
| padding-right  | 右内边距 |
| padding-top    | 上内边距 |
| padding-bottom | 下内边距 |

当我们给盒子指定padding值之后， 发生了2件事情：

1. 内容和边框有了距离，添加了内边距。
2. 盒子会变大。

特点：

- 可以撑大元素的尺寸
- 背景可以延伸到`padding`区域

简写：

| 值的个数 | 表达意思                                        |
| -------- | ----------------------------------------------- |
| 1个值    | padding：上下左右内边距;                        |
| 2个值    | padding: 上下内边距    左右内边距 ；            |
| 3个值    | padding：上内边距   左右内边距   下内边距；     |
| 4个值    | padding: 上内边距 右内边距 下内边距 左内边距 ； |

```css
div {
			/*左内边距*/
			/*padding-left: 10px;
			padding-top: 30px;*/
			/*padding 简写 复合写法*/
			/*padding: 20px; 上下左右 都是 20 内边距*/
			/*padding: 10px 20px; 上下10  左右 20 内边距*/
			/*padding: 10px 20px 30px; 上 10  左右 20  下 30 内边距*/
			/*padding: 10px 20px 30px 40px;  上10 右 20  下 30 左 40 顺时针*/
		}
```

> 元素实际大小:



![盒模型大小](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/盒模型大小.png)

- 宽度

  Element Height = content height + padding + border （Height为内容高度）

- 高度

  Element Width = content width + padding + border （Width为内容宽度）

-  盒子的实际的大小 =   内容的宽度和高度 +  内边距   +  边框   

解决方法：

通过给设置了宽高的盒子，减去相应的内边距的值，维持盒子原有的大小

```css
div {
			width: 180px;
			height: 200px;
			background-color: pink;
			/*添加10px 内边距 左右 上下*/
			padding: 10px;
			/*盒子的实际大小 =  内容宽度 高度 +  内边距 +  边框*/
			      /*           =   200  +  20  +  0
			                 =   220  */
      /*解决的方法：内边距一定要给的， 我们只能改变 内容宽度 width 让他减去 多出来的内边距就可以了*/
                /*200 - 20  =  180 */
		}
```

#### 10.2.1padding不影响盒子大小情况

**如果没有给一个盒子指定宽度， 此时，如果给这个盒子指定padding， 则不会撑开盒子。**

```css
	p {	
			/*width: 200px;*/
			height: 30px;
			background-color: purple;
			padding-left: 30px;
			/*特殊情况： 如果这个盒子没有宽度， 则padding 不会撑开盒子*/
		}
```

#### 10.2.2新浪导航

新浪导航栏的核心就是因为里面的字数不一样多，所以我们不方便给宽度，还是给`padding `，撑开盒子的。

html结构：

```html
<div class="nav">
		<a href="#">设为首页</a>
		<a href="#">手机新浪网</a>
		<a href="#">移动客户端</a>
		<a href="#">博客</a>
		<a href="#">微博</a>
		<a href="#">关注我</a>
	</div>
```

css

```css
/*清除元素默认的内外边距*/
		* {
			margin: 0;
			padding: 0;
		}
		.nav {
			height: 41px;
			background-color: #FCFCFC;
			/*上边框*/
			border-top: 3px solid #FF8500;
			/*下边框*/
			border-bottom: 1px solid #EDEEF0;
		}
		.nav a {
			/*转换为行内块*/
			display: inline-block;
			height: 41px;
			line-height: 41px;
			color: #4C4C4C;
			/*代表 上下是 0  左右是 20 内边距*/
			padding: 0 20px;
			text-decoration: none;
			font-size: 12px;
		}
		.nav a:hover {
			background-color: #eee;
		}
```

效果：

![image-20200902233845275](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200902233845275.png)

### 10.3外边距

​	`margin`属性用于设置外边距。  `margin`就是控制**盒子和盒子之间的距离**

| 属性          | 作用     |
| ------------- | :------- |
| margin-left   | 左外边距 |
| margin-right  | 右外边距 |
| margin-top    | 上外边距 |
| margin-bottom | 下外边距 |

margin值的简写 （复合写法）代表意思 跟 padding 完全相同。

#### 10.3.1块级盒子水平居中

可以让一个块级盒子实现水平居中：

- 盒子必须指定了宽度（width）
- 然后就给**左右的外边距都设置为auto**，

实际工作中常用这种方式进行网页布局，示例代码如下：

```css
.header{ 
  width:960px; 
  margin:0 auto;
}
```

常见的写法，以下三种都可以。

```css
div{
  margin-left: auto;
  margin-right: auto;
}
div{margin: auto;}
div{margin: 0 auto;}
```

#### 10.3.2文字居中和盒子居中区别

1.  盒子内的文字水平居中是  `text-align: center`,  而且还可以让行内元素和行内块居中对齐
2.  块级盒子水平居中  左右margin 改为 auto 

~~~css
text-align: center; /*  文字 行内元素 行内块元素水平居中 */
margin: 10px auto;  /* 块级盒子水平居中  左右margin 改为 auto 就阔以了 上下margin都可以 */
~~~

#### 10.3.3插入图片和背景图片区别

1. 插入图片 我们用的最多 比如产品展示类  移动位置只能靠盒模型` padding margin`

2. 背景图片我们一般用于小图标背景或者超大背景图片，背景图片只能通过`background-position`

~~~css
 img {  
		width: 200px;/* 插入图片更改大小 width 和 height */
		height: 210px;
		margin-top: 30px;  /* 插入图片更改位置 可以用margin 或padding  盒模型 */
		margin-left: 50px; /* 插入图片也是一个盒子 */
	}

 div {
		width: 400px;
		height: 400px;
		border: 1px solid purple;
		background: #fff url(images/sun.jpg) no-repeat;
		background-position: 30px 50px; /* 背景图片更改位置 用 background-position */
	}
~~~

#### 10.3.4清除元素的默认内外边距(重要)

为了更灵活方便地控制网页中的元素，制作网页时，我们需要将元素的默认内外边距清除。

```css
* {
   padding:0;/* 清除内边距 */
   margin:0;/* 清除外边距 */
}
```

> 注意：行内元素为了照顾兼容性， 尽量只设置左右内外边距， 不要设置上下内外边距。

#### 10.3.5外边距合并

使用margin定义块元素的**垂直外边距**时，可能会出现外边距的合并。

> 1.相邻块元素垂直外边距的合并

- 当上下相邻的两个块元素相遇时，如果上面的元素有下外边距`margin-bottom`
- 下面的元素有上外边距`margin-top`，则他们之间的垂直间距不是`margin-bottom`与`margin-top`之和
- **取两个值中的较大者**这种现象被称为相邻块元素垂直外边距的合并（也称外边距塌陷）。

![image-20200326222847477](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200326222847477.png)

**解决方案：尽量只给一个盒子添加margin值**。

> 2.嵌套块元素垂直外边距的合并（塌陷）

- 对于两个嵌套关系的块元素，如果父元素没有上内边距及边框
- 父元素的上外边距会与子元素的上外边距发生合并
- 合并后的外边距为两者中的较大者

![image-20200326222941394](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200326222941394.png)

**解决方案：**

1. 可以为父元素定义上边框。
2. 可以为父元素定义上内边距
3. 可以为父元素添加overflow:hidden。
4. 可以给父盒子中添加文字内容

还有其他方法，比如浮动、固定、绝对定位的盒子不会有问题，后面咱们再总结。。。

html结构：

```html
<div class="father">
  <div class="son"></div>
</div>
```

css

```css
.father{
  width:500px;
  height:500px;
  background-color:pink;
}
.son{
   width:500px;
   height:500px;
   background-color:deeppink;
   margin-top:100px;/*此时相当于给父盒子设置外边距*/
}
```

![image-20200903233655002](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903233655002.png)

解决办法：

```css
.father {
			width: 500px;
			height: 500px;
			background-color: pink;
			/*嵌套关系 垂直外边距合并  解决方案 */
			/*1. 可以为父元素定义上边框  transparent 透明*/
			/*border-top: 1px solid transparent;*/
			/*2. 可以给父级指定一个 上 padding值*/
			/*padding-top: 1px; */
			/*3. 可以为父元素添加overflow:hidden。*/
			overflow: hidden;
		}
		.son {
			width: 200px;
			height: 200px;
			background-color: purple;
			margin-top: 100px;
		}
```

![image-20200903234103874](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903234103874.png)



### 10.4盒子阴影

语法：

```css
box-shadow:水平阴影 垂直阴影 模糊距离（虚实）  阴影尺寸（影子大小，默认为盒子大小）  阴影颜色  内/外阴影；
```

![image-20200326225734147](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200326225734147.png)



前两个属性是必须写的。其余的可以省略。

外阴影 (outset) 是默认的，但是不能写 。 想要内阴影可以写 inset 

```css
div {
			width: 200px;
			height: 200px;
			border: 10px solid red;
			/* box-shadow: 5px 5px 3px 4px rgba(0, 0, 0, .4);  */
			/* box-shadow:水平位置 垂直位置 模糊距离 阴影尺寸（影子大小） 阴影颜色  内/外阴影； */
			box-shadow: 0 15px 30px  rgba(0, 0, 0, .4);
}
```

![image-20200904001138658](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904001138658.png)

### 10.5倒影

设置元素的倒影（`webkit`内核特有属性）

语法：

```css
-webkit-box-reflect:
```

默认值:none  不可继承

值：（必须是123的顺序）
倒影的方向
    第一个值，above, below, right, left
倒影的距离
    第二个值，长度单位
渐变
    第三个值

### 10.6resize

`resize`属性允许你控制一个元素的可调整大小性。（一定要配合`overflow：auto`使用）

- 默认值：none  不可继承 

```css
/**元素不能被用户缩放。**/
resize:none;
/**允许用户在水平和垂直方向上调整元素的大小。**/        
resize:both;
/**允许用户在水平方向上调整元素的大小。**/       
resize:horizontal;
/**允许用户在垂直方向上调整元素的大小。**/       
resize:vertical;
```

### 10.7 box-sizing

`box-sizing` 属性用于更改默认的 CSS 盒子模型。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行列为。

- 默认值：content-box  不可继承

> 可选值：

可以取两个值：

(1) `content-box`:默认值，标准盒子。

```css
 box-sizing:content-box;
```

默认值，标准盒子模型。 width 与 height 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。

注意: 内边距, 边框 & 外边距 都在这个盒子的外部。 比如. 如果` .box {width: 350px}`; 而且` {border: 10px solid black;}` 那么在浏览器中的渲染的实际宽度将是370px;

尺寸计算公式：

- width = 内容的宽度，
- height = 内容的高度。
- 宽度和高度都不包含内容的边框（border）和内边距（padding）。

(2) `border-box`:

```css
box-sizing:border-box;
```

width 和 height 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式时Internet Explorer使用的盒模型。

尺寸计算公式：

- width = border + padding + 内容的 width，
- height = border + padding + 内容的height。

## 11.浮动

**浮动提升层级，并且只提升半层(元素层)**

### 11.1 CSS 布局的三种机制

网页布局的核心——就是**用 CSS 来摆放盒子**。

CSS 提供了 **3 种机制**来设置盒子的摆放位置，分别是**普通流**（标准流）、**浮动**和**定位**，其中： 

1. **普通流**（标准流）
   - **块级元素**会独占一行，**从上向下**顺序排列；
     - 常用元素：div、hr、p、h1~h6、ul、ol、dl、form、table
   - **行内元素**会按照顺序，**从左到右**顺序排列，碰到父元素边缘则自动换行；
     - 常用元素：span、a、i、em等
2. **浮动**
   - 让盒子从普通流中**浮**起来,主要作用让多个块级盒子一行显示。
3. **定位**
   - 将盒子**定**在浏览器的某一个**位**置——CSS 离不开定位，特别是后面的 js 特效。

虽然我们前面学过行内块（inline-block） 但是他却有自己的缺陷：

1. 它可以实现多个元素一行显示，但是中间会有空白缝隙，不能满足以上第一个问题。
2. 它不能实现以上第二个问题，盒子左右对齐 

### 11.2浮动简介

**概念**：元素的浮动是指**设置了浮动属性的元素**会

1. 脱离标准流的控制
2. 移动到指定位置。
3. 当元素设置为浮动时，元素将被视作块级元素

#### 11.2.1浮动的表现和特征：

1. 浮动可以让块级元素在一行显示

2. 浮动使行内元素具有块级元素的特征

3. 浮动元素不设置宽高时，宽高由内容撑开

4. 浮动元素向指定的方向移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止

5. 浮动元素脱离文档流，浮动后的子元素无法撑开父元素（即高度塌陷）

6. 向同一方向浮动的元素形成流式布局

8. **浮动元素会脱离文档流，提升层级（只提升半层）**

   在html中，元素由两层组成的，一层是元素本身即“元素层”，另一层是元素上方的内容层。内容层包括文字、图片、视频等。给元素设置浮动后，元素层就会浮动到内容层区域。

#### 11.2.2作用

1. **让多个盒子(div)水平排列成一行**，使得浮动成为布局的重要手段。
2. 可以实现盒子的左右对齐等等..
3. 浮动最早是用来**控制图片**，实现**文字环绕图片的效果**。

语法:

```css
选择器 { float: 属性值; }
```

| 属性值    | 描述                     |
| --------- | ------------------------ |
| **none**  | 元素不浮动（**默认值**） |
| **left**  | 元素向**左**浮动         |
| **right** | 元素向**右**浮动         |

示例：

```css
.box1 {
    width: 200px;
    height: 200px;
    background-color: rgba(255, 0, 0, 0.5);
    float: left;
}
.box2 {
    width: 150px;
    height: 300px;
    background-color: skyblue;
}
```

![23浮动脱标](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/23浮动脱标.png)

`float` 属性会让盒子漂浮在标准流的上面，所以第二个标准流的盒子跑到浮动盒子的底下了。

#### 11.2.3div水平排列：

html结构

```html
<div class="one">one</div>
<div class="two">two</div>
```

css:

```css
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* 转换为行内块元素，可以水平显示，不过 div 之间有间隙，不方便处理 */
    /* display: inline-block; */
    /* 设置浮动属性，可以让 div 水平排列，并且没有间隙 */
    float: left;
  /**所有盒子都要设置浮动属性，才能水平排列*/
}
.two {
    background-color: hotpink;
}
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904104416847.png" alt="image-20200904104416847" style="zoom:50%;" />

**注意： 浮动的元素互相贴靠一起的，但是如果父级宽度装不下这些浮动的盒子， 多出的盒子会另起一行对齐**

### 11.3清除浮动

因为父级盒子很多情况下，不方便给高度，但是子盒子浮动就不占有位置，最后父级盒子高度为0，就影响了下面的标准流盒子。

![n](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/n.jpg)

![no](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/no.jpg)

总结：

- 由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响
- 准确地说，并不是清除浮动，而是**清除浮动后造成的影响**

#### 11.3.1清除浮动本质

清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题。清除浮动之后， 父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了

#### 11.3.2清除浮动的方法

语法：

```css
选择器{clear:属性值;}   clear 清除  
```

| 属性值 | 描述                                       |
| ------ | ------------------------------------------ |
| left   | 不允许左侧有浮动元素（清除左侧浮动的影响） |
| right  | 不允许右侧有浮动元素（清除右侧浮动的影响） |
| both   | 同时清除左右两侧浮动的影响                 |

注意：

- 具有clear属性的元素，必须是块级元素
- 具有clear属性的元素，必须与浮动元素是同级元素，即兄弟元素
- clear属性是消除文档流元素上方的浮动元素对自身的影响

html结构：

```html
<div id="wrap">
      <div id="inner"></div>
    </div>
```

> 1. 直接给父级加高度（扩展性不好）

```css
#wrap{
		border: 1px solid;
		height: 300px;
}			
#inner{
		float: left;
		width: 200px;
		height: 200px;
		background: pink;
}
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904111431894.png" alt="image-20200904111431894" style="zoom:50%;" />

> 2. br标签清浮动

违反了结构 行为样式相分离的原则。

html结构：

```html
 <div id="wrap">
      <div id="inner"></div>
   		<!--br标签清除浮动-->
      <br clear="both" />
</div>
```

css：

```css
#wrap{
			border: 1px solid red;
   		width: 300px;
}			
#inner{
			float: left;
			width: 200px;
			height: 200px;
			background: pink;
}
```

> 3. 额外标签法(隔墙法)

是W3C推荐的做法。是通过在**浮动元素末尾添加一个空的标签**例如 `<div style="clear:both"></div>`，或则其他标签br等亦可。

- 优点： 通俗易懂，书写方便
- 缺点： 添加许多无意义的标签，结构化较差。

html结构：

```html
<div id="wrap">
	<div id="inner"></div>
	<!--在浮动元素添加空标签清除浮动-->
	<div style="clear: both;"></div>
</div>
```

css：

```css
#wrap{
			border: 1px solid;
}			
#inner{
			float: left;
			width: 200px;
			height: 200px;
			background: pink;
}
```

> 4. 父级添加`overflow`属性方法：触发BFC

可以给父级添加： `overflow: hidden| auto| scroll ` 都可以实现。

优点：  代码简洁

缺点：  内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。

```css
/*ie 6 7不支持BFC*/
#wrap{
		border: 1px solid;
		/*触发bfc，才能撑开父元素*/
		overflow: hidden;
}
			
#inner{
		float: left;
		width: 200px;
		height: 200px;
		background: pink;
}
```

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904112409127.png" alt="image-20200904112409127" style="zoom:50%;" />

> 5. 使用`after`伪元素清除浮动

`:after` 方式为空元素额外标签法的升级版，好处是不用单独加标签了

- **因为ie6 7 下不支持伪元素** ，所以要额外的去开启`haslayout`

- 扩展：`haslayout`是IE7-浏览器的特有属性。`hasLayout`是一种只读属性，有两种状态：true或false。当其为true时，代表该元素有自己的布局，否则代表该元素的布局继承于父元素。

- 触发`hasLayout==true`的方式：

```css
display: inline-block
height: (除 auto 外任何值)
width: (除 auto 外任何值)
float: (left 或 right)
position: absolute
writing-mode: tb-rl
zoom: (除 normal 外任意值)
```

**原理：伪元素中的after可以在元素内容的最后添加内容，当将添加的这个内容设置为一个块级元素之后，就可以使用它来清除浮动了**

扩展：

- 添加的内容由`content`属性设置
- `after`伪元素添加的内容为行内元素，并不是块级元素

使用方法：

html结构:

```html
<div id="wrap" class="clearfix">
	<div id="inner"></div>
</div>
```

css:

```css
 #wrap {
        border: 1px solid;
        width: 300px;
}
#inner {
        float: left;
        width: 200px;
        height: 200px;
        background: pink;
} 
/**伪元素清除浮动*/
.clearfix:after {  
   content: ""; /*添加空内容*/
   display: block; /*将伪元素添加的行内元素转化为块级元素*/
   height: 0; 
   clear: both; /*清除浮动*/
   visibility: hidden;  
}   
.clearfix {
   *zoom: 1;/* IE6、7 专有 */
}   
```

- 优点： 符合闭合浮动思想  结构语义化正确
- 缺点： 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。
- 代表网站： 百度、淘宝网、网易等

> 6. 使用双伪元素清除浮动

html结构：

```html
<div id="wrap" class="clearfix">
      <div id="inner"></div>
    </div>
```

css

```css
 #wrap {
        border: 1px solid;
        width: 300px;
        margin: auto;
}
#inner {
        float: left;
        width: 200px;
        height: 200px;
        background: pink;
}
/**使用双伪元素清除浮动**/
.clearfix:before,
.clearfix:after {
        content: "";
        display: table;
}
.clearfix:after {
        clear: both;
}
.clearfix {
        *zoom: 1;
}
```

- 优点：  代码更简洁

- 缺点：  由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。

- 代表网站： 小米、腾讯等。

## 12.定位

将盒子**定**在某一个**位**置  自由的漂浮在其他盒子(包括标准流和浮动)的上面 。

所以，我们脑海应该有三种布局机制的上下顺序：

标准流在最底层 (海底)  -------    浮动的盒子在中间层 (海面)  ------- 定位的盒子在最上层 （天空）

定位也是用来布局的，它有两部分组成：

`定位 = 定位模式 + 边偏移`

### 12.1边偏移

简单说， 我们定位的盒子，是通过边偏移来移动位置的。

在 CSS 中，通过 `top`、`bottom`、`left` 和 `right` 属性定义元素的**边偏移**：（方位名词）

| 边偏移属性 | 示例           | 描述                                                     |
| ---------- | :------------- | -------------------------------------------------------- |
| `top`      | `top: 80px`    | **顶端**偏移量，定义元素相对于其父元素**上边线的距离**。 |
| `bottom`   | `bottom: 80px` | **底部**偏移量，定义元素相对于其父元素**下边线的距离**。 |
| `left`     | `left: 80px`   | **左侧**偏移量，定义元素相对于其父元素**左边线的距离**。 |
| `right`    | `right: 80px`  | **右侧**偏移量，定义元素相对于其父元素**右边线的距离**   |

定位的盒子有了边偏移才有价值。 一般情况下，凡是有定位地方必定有边偏移。

### 12.2定位模式 (position)

在 CSS 中，通过 `position` 属性定义元素的**定位模式**，语法如下：

```css
选择器 { 
  position: 属性值; 
}
```

定位模式是有不同分类的，在不同情况下，我们用到不同的定位模式。

| 值         |     语义     |
| ---------- | :----------: |
| `static`   | **静态**定位 |
| `relative` | **相对**定位 |
| `absolute` | **绝对**定位 |
| `fixed`    | **固定**定位 |

#### 12.2.1静态定位(static)

- **静态定位**是元素的默认定位方式，无定位的意思。它相当于 border 里面的none， 不要定位的时候用。
- 静态定位按照标准流特性摆放位置，它没有边偏移。
- 静态定位在布局时我们几乎不用的

#### 12.2.2相对定位(relative) 

**相对定位**是元素**相对**于它原来在标准流中的位置来说的。

相对定位的特点：

- 相对于 自己原来在标准流中位置来移动的
- 原来**在标准流的区域继续占有**，后面的盒子仍然以标准流的方式对待它。（**不脱离文档流**）
- 提升元素的层级
- 定位不继承

#### 12.2.3绝对定位(absolute)

**绝对定位**是元素以带有定位的父级元素来移动位置 （拼爹型）

1. **完全脱标** —— 完全不占位置；  

2. **父元素没有定位**，则以**浏览器**为准定位（Document 文档）。

3. **父元素要有定位**
   - 将元素依据最近的已经定位（绝对、固定或相对定位）的父元素（祖先）进行定位。

绝对定位的特点：（务必记住）

- 绝对是以带有定位的父级元素来移动位置 （拼爹型） 如果父级都没有定位，则以浏览器文档为准移动位置
- 不保留原来的位置，完全是脱标的。
- 提升层级
- 不设置宽度时，宽度由内容撑开
- 使行内元素变为块级元素，
- 触发BFC
- 在祖先元素中有多个定位元素时，子元素会相对距离其最近的那个祖先元素进行绝对定位
- 如果祖先元素只是用于给子元素定位，一般设置祖先元素为相对定位，因为相对定位不脱离文档流
- 不设置偏移量，元素位置无变化，但是会脱离文档流，即绝对定位元素不占据文档位置（后面元素会向前移动）

因为绝对定位的盒子是拼爹的，所以要和父级搭配一起来使用。

##### 定位口诀 —— 子绝父相

刚才咱们说过，绝对定位，要和带有定位的父级搭配使用，那么父级要用什么定位呢？

**子绝父相** —— **子级**是**绝对**定位，**父级**要用**相对**定位。

#### 12.2.4固定定位(fixed) 

**固定定位**是**绝对定位**的一种特殊形式：如果说绝对定位是一个矩形 那么 固定定位就类似于正方形

相对于浏览器可视窗口进行定位，它的位置固定，不会随网页的移动而移动

1. **完全脱标** —— 完全不占位置；
2. 只认**浏览器的可视窗口** —— `浏览器可视窗口 + 边偏移属性` 来设置元素的位置；
   * 跟父元素没有任何关系；单独使用的
   * 不随滚动条滚动。
3. 脱离文档流，提升层级
4. 固定在浏览器的可视区的某个位置上
5. 根据浏览器的可视窗口来计算位置
6. 使行内元素支持宽高内外边距设置，行内元素和块级元素不设置宽高时，宽高由内容撑开
7. 触发BFC

**提示**：IE 6 等低版本浏览器不支持固定定位。

注意：使用固定定位时，如果盒子中没有内容，需要指定宽度 

>  fixed在ie6失效解决方案

使用绝对定位来模拟固定定位：

1. 禁止系统滚动条
2. 将滚动条加给body
3. 让body的尺寸变为视口的尺寸. 

```css
/***********css******************/
html{
		overflow: hidden;  //作用给文档，隐藏文档的滚动条
		height: 100%;   //需一层一层继承，继承窗口的
}
			
body{
		overflow: auto;  //作用给body，根据内容自动添加滚动条
		height: 100%;   //需一层一层继承，继承html的
}
			
#test{
    /*
    此时绝对定位参照与初始包含块定位，由于禁用了视窗的滚动条，因此视窗不会变，body的滚动条不会影响视窗的大小，因此就实现了固定定位
    */
		position: absolute;
		left: 50px;
		top: 50px;
		width: 100px;
		height: 100px;
		background: pink;
}
/***********html******************/
<div id="test"></div>
```

#### 12.2.5定位层级

元素的层级可以通过`z-index`属性来设置

属性值:

- auto：    默认值
- 数值 ：   值越大，层级越高

表现特征：

- 定位元素没有`z-index`时，后者定位层级高于前者的定位层级
- 同级的定位元素有`z-index`时，数值越大层级越高
- 不同级别的定位元素的`z-index`的值没有可比性
  - 在低层级的父级元素中的子元素的层级永远低于高层次的父级元素的兄弟元素，不管子元素的`z-index`值多大

注：`z-index`只能在定位元素上使用，并且`z-index`元素支持负的属性值

### 12.3绝对定位的盒子居中

**注意**：**绝对定位/固定定位的盒子**不能通过设置 `margin: auto` 设置**水平居中**。

在使用**绝对定位**时要想实现水平居中，可以按照下图的方法：

![image-20200326235757304](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200326235757304.png)

1. `left: 50%;`：让**盒子的左侧**移动到**父级元素的水平中心位置**；
2. `margin-left: -100px;`：让盒子**向左**移动**自身宽度的一半**。

## 13.常见布局

### 13.1三列布局

核心：

- 两边固定，中间自适应
- 中间列要完整的显示
- 中间列要优先加载

#### 13.1.1圣杯布局

html结构：**middle需要优先加载，left与right顺序任意**。

```html
<div id="container">
		<div class="middle">middle</div>
		<div class="left">left</div>
		<div class="right">right</div>
</div>
```

css：

```css
*{
			margin: 0;
			padding: 0;
}
#container{
			padding: 0 200px;
}
.middle{
			background: pink;
			width: 100%;
			float: left;
		}
.left{
			background: deeppink;
			width: 200px;
			float: left;
			margin-left:-100%; 
			position: relative;
			left: -200px;
		}
.right{
			background: deeppink;
			width: 200px;
			float: left;
			margin-left:-200px;
			position: relative;
			right: -200px ;
		}
```

实现步骤：

```css
1.middle设置宽度为100%，left与right设置为固定宽度，如：200px；
2.由于块级元素独占一行，因此需要给元素设置浮动才能在一行显示，
		此时设置浮动，middle还是独占一行（因为宽度为100%），但left和right在同一行显示，原因是一行放不下，left和right自动换行。需要使用margin负值设置边距，因为margin只改变边界位置，不改变内容的位置。
3.left设置margin-left：-100%；right设置margin-left：-200px；此时left和right的宽度盖住了middle一部分。
4.设置容器的padding-left和padding-right为left和right的宽度。
5.给left和right使用相对定位，定位在左右两侧	
```

总结：使用浮动让盒子一行显示。使用margin负值移动盒子，使用相对定位移动盒子到两边。

#### 13.1.2双飞翼布局

html结构：

```html
<div id="content">
	<div class="middle">
		<div class="m_inner">middle</div>
	</div>
	<div class="left">left</div>
	<div class="right">right</div>
</div>
```

css:

```css
*{
			margin: 0;
			padding: 0;
		}
.middle{
			width: 100%;
			background: pink;
			float: left;
		}
.m_inner{
			padding: 0 200px;
		}
.left{
			width: 200px;
			background: deeppink;
			float: left;
			margin-left: -100%
		}
.right{
			width: 200px;
			background: deeppink;
			float: left;
			margin-left: -200px;
		}
```

圣杯布局与双飞翼布局的对比:

1. 两种布局方式都是把主列放在文档流最前面，使主列优先加载。
2. 两种布局方式在实现上也有相同之处，都是让三列浮动，然后通过负外边距形成三列布局。
3. 两种布局方式的不同之处在于如何处理中间主列的位置：
   - 圣杯布局是利用父容器的左、右内边距+两个从列相对定位；
   - 双飞翼布局是把主列嵌套在一个新的父级块中利用主列的左、右外边距进行布局调整

#### 13.1.3伪等高布局

**定位元素和浮动元素，margin：0 auto；会失效**.

html结构：

```html
<div id="wrap" class="clearfix">
	<div class="left"></div>
	<div class="right"></div>
</div>
```

css:

```css
*{
				margin: 0;
				padding: 0;
			}
#wrap{
				width: 750px;
				border: 1px solid;
    			/*等高布局核心*/
    			overflow: hidden;
			}
#wrap .left{
				float: left;
				width: 200px;
				background: pink;
    			/*等高布局核心*/
				padding-bottom: 1000px;
				margin-bottom: -1000px;
			}
#wrap .right{
				float: left;
				width: 500px;
				background: deeppink;
    			/*等高布局核心*/
				padding-bottom: 1000px;
				margin-bottom: -1000px;
			}
/**************核心***************/
/*
    给子元素添加：
        padding-bottom: 1000px;
        margin-bottom: -1000px;
    给父元素添加：
        overflow: hidden;
    原理：
    1.将内容区拉长
    2.由于margin只改变边界，因此设置负值将边界拉回来
    3.overflow: hidden;会将边界外的内容隐藏，从而实现等高布局
*/
```

==注：margin为负值（margin不影响元素的位置，只影响边界位置）==

- 负值:将元素的边界往里收
- 正值:将元素的边界往外扩

### 13.2移动端粘连布局

html结构:

```html
<div id="wrap" >
	<div class="main">
		main <br />
		main <br />
		main <br />
	</div>
</div>
<div id="footer">
		footer
</div>
```

css:

```css
*{
	margin: 0;
	padding: 0;
}
html,body{
				height: 100%;
}
#wrap{
		min-height: 100%;
		background: pink;
		text-align: center;
		overflow: hidden;
}
#wrap .main{
				padding-bottom:50px ;
}
#footer{
				height: 50px;
				line-height: 50px;
				background: deeppink;
				text-align: center;
				margin-top: -50px;
}
```

![image-20200904151101767](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904151101767.png)

## 14.BFC

BFC（Block formatting context）直译为**块级格式化上下文**。为元素提供了一个独立的布局环境，环境中的内容不会影响到环境外的布局，环境外的布局也不会影响到环境中的内容。就像是一个围墙。

### 14.1BFC布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。
2. BFC的区域不会与float box重画。
3. 内部的Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重到
4. 计算BFC的高度时，浮动元素也参与计算。（清除浮动 haslayout）
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

### 14.2开启BFC

- 根元素
- float属性不为none 
- position为absolute或fixed 
- overflow不为visible 
- display为inline-block，table-cell，table-caption，flex，inline-flex

### 14.3应用

两列布局:

html结构：

```html
<div id="left">left</div>
<div id="right">right</div>
```

css

```css
#left{
		height: 200px;
		width: 200px;
		background: pink;
		float: left;
}
#right{
		height: 200px;
    	/*开启BFC*/
		overflow: hidden;
		background: deeppink;
}
```

注意：

1. 此时是干净的两列布局。如果`right`不开启`bfc`，则`left`会压住`right`一部分区域（因为left设置了浮动，提升了半层）
2. 此时文档有两个`bfc`。一个是根标签，一个是`right`。根标签`bfc`管理`right`，`right`的`bfc`管理自身子元素

## 15.监测低版本ie

```js
//js中的作用域都是函数作用域
function isIE(version){
		var b = document.createElement("b");
		b.innerHTML="<!--[if IE "+version+"]><i></i><![endif]-->";
		return   b.getElementsByTagName("i").length == 1 ;
}
```

## 16.水平垂直居中

### 16.1水平居中

```css
#test{
		width: 200px;
		height: 200px;
		/* 文字垂直居中:行高等于高度 */
		line-height: 200px;
		background: pink;
		margin: 0 auto;
		/* 文字水平居中 */
		text-align: center;
}
```

`margin: 0 auto;`相当于``margin: auto;``只针对普通流盒子

### 16.2已知高度的元素水平垂直居中

> 方案1：

```css
/***********css*****************/
#wrap{
  			/*相对定位*/
				position: relative;
				width: 400px;
				height: 600px;
				background: pink;
				margin: 0 auto;
}
			
#inner{
/*
   使用绝对定位，left和top为50%是框的左上角相对于最近定位元素的位置，要使框的中心点在垂直水平居中，因此要减去框高宽的一半 
    */
  		/*绝对定位*/
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -50px;
				margin-top: -50px;
				width: 100px;
				height: 100px;
				background: deeppink;
}
/****************html**************/
<div id="wrap">
	<div id="inner">test</div>
</div>
```

> 方案2

绝对定位盒子的特性：
		  高宽有内容撑开
  			水平方向上：   left + right + width + padding + margin = 包含块padding区域的尺寸
  									         0        0           100        0                auto           400
  			垂直方向上：   top + bottom + height + padding + margin = 包含块padding区域的尺寸
  									         0          0          	100          0                 auto			600

```css
#wrap{
		position: relative;
		width: 400px;
		height: 600px;
		background: pink;
		margin: 0 auto;
}
			
#inner{
  /*下面6条样式都要指定*/
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
  /*必须指定高宽*/
		width: 100px;
		height: 100px;
		background: deeppink;
}

```

### 16.3未知高度的元素水平垂直居中

```css
#wrap{
		position: relative;
		width: 400px;
		height: 600px;
		background: pink;
		margin: 0 auto;
}
			
#inner{
		position: absolute;
		left: 50%;
		top: 50%;
  /*百分比参照与元素本身*/
		transform: translate3d(-50%,-50%,0);
		background: deeppink;
}
```


