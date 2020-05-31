# DOM 教程

## 1.简介

​		`DOM` (Document Object Model) 译为**文档对象模型**，是 HTML 和 XML 文档的编程接口。DOM 定义了访问和操作 HTML 文档的标准方法。

## 2.节点

​		在 DOM 中，所有事物都是节点。DOM 是被视为节点树的 HTML。

​		根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：

- 整个文档是一个文档节点

- 每个 HTML 元素是元素节点

- HTML 元素内的文本是文本节点

- 每个 HTML 属性是属性节点

- 注释是注释节点

  ==节点树==：DOM 将 HTML 文档视作树结构：

  ![1563078807187](C:/Users/xujian/AppData/Roaming/Typora/typora-user-images/1563078807187.png)

## 3.DOM方法

​		DOM `方法`是我们可以在节点（HTML 元素）上执行的==动作==。

​		DOM `属性`是我们可以在节点（HTML 元素）设置和修改的==值==。

​		编程接口:

​		可通过 JavaScript （以及其他编程语言）对 DOM 进行访问。

​		所有 HTML 元素被定义为对象，而编程接口则是对象方法和对象属性。

​		方法是您能够执行的动作（比如添加或修改元素）。

​		属性是您能够获取或设置的值（比如节点的名称或内容）。

### 3.1 getElementById() 方法

​		该方法返回带有指定 ID 的元素：

实例：

```js
var element=document.getElementById("test");
```

### 3.2 DOM 对象 - 方法和属性

一些常用的DOM 方法：

- `getElementById(id)` - 获取带有指定 id 的节点（元素）
- `appendChild(node)` - 插入新的子节点（元素）
- `removeChild(node)` - 删除子节点（元素）

一些常用的DOM 属性：

- `innerHTML` - 节点（元素）的文本值
- `parentNode` - 节点（元素）的父节点
- `childNodes` - 节点（元素）的子节点
- `attributes `- 节点（元素）的属性节点

### 3.3 对象的理解

某个人是一个对象。人的方法可能是 eat(), sleep(), work(), play() 等等。所有人都有这些方法，但会在不同时间执行它们。一个人的属性包括姓名、身高、体重、年龄、性别等等。

所有人都有这些属性，但它们的值因人而异。

### 3.4 DOM 对象方法

| 方法                       | 描述                                                         |
| :------------------------- | :----------------------------------------------------------- |
| `getElementById()`         | 返回带有指定 ==ID== 的元素。                                 |
| `getElementsByTagName()`   | 返回包含带有指定==标签名==称的所有元素的节点列表（集合/节点数组）。 |
| `getElementsByClassName()` | 返回包含带有指定==类名==的所有元素的节点列表。               |
| `appendChild()`            | 把新的子节点添加到指定节点。                                 |
| `removeChild()`            | 删除子节点。                                                 |
| `replaceChild()`           | 替换子节点。                                                 |
| `insertBefore()`           | 在指定的子节点前面插入新的子节点。                           |
| `createAttribute()`        | 创建属性节点。                                               |
| `createElement()`          | 创建元素节点。                                               |
| `createTextNode()`         | 创建文本节点。                                               |
| `getAttribute()`           | 返回指定的属性值。                                           |
| `setAttribute()`           | 把指定属性设置或修改为指定的值。                             |

## 4.DOM 属性

属性是节点（HTML 元素）的值，您能够获取或设置。

### 4.1 innerHTML 属性

用途：用于获取或改变任意 HTML 元素，包括 `<html>` 和`<body>` 

```html
<body>
    <div id="intro">xxxxx</div>
<script>
    //getElementById 是一个方法，而 innerHTML 是属性
        var element = document.getElementById("intro").innerHTML;
        alert(element);//xxxxx
        console.log(element);//xxxxx
        document.write(element);//xxxxx
</script>
</body>
```

### 4.2 nodeName 属性规定节点的名称。

- `nodeName` 是只读的
- 元素节点的 `nodeName` 与标签名相同
- 属性节点的 `nodeName` 与属性名相同
- 文本节点的 `nodeName` 始终是 `#text`
- 文档节点的 `nodeName` 始终是 `#document`

**注意：** `nodeName `始终包含 `HTML` 元素的大写字母标签名。

#### 4.2.1 `nodeValue` 属性

获取节点的值。

- 元素节点的 nodeValue 是 undefined 或 null
- 文本节点的 nodeValue 是文本本身
- 属性节点的 nodeValue 是属性值

```html
//获取元素的值
<body>
    <p id="text">xxxxx</p>
<script>
    //取回 <p id="text"> 标签的文本节点值
        var element = document.getElementById("text");
    //页面上输出xxxxx
        document.write(element.firstChild.nodeValue);
</script>
</body>
```

#### 4.2.2 nodeType 属性

nodeType 属性返回节点的类型。nodeType 是只读的。

节点类型有：

| 元素类型 | NodeType |
| :------- | :------- |
| 元素     | 1        |
| 属性     | 2        |
| 文本     | 3        |
| 注释     | 8        |
| 文档     | 9        |

## 5. DOM 访问

### 访问 HTML 元素（节点）

访问 HTML 元素等同于访问节点

访问 HTML 元素的方法：

- 通过使用 `getElementById()` 方法
- 通过使用 `getElementsByTagName()` 方法
- 通过使用 `getElementsByClassName()` 方法

### 5.1 getElementById() 方法

返回值：返回带有指定 ID 的元素引用

语法：```node.getElementById("id");```

示例：``` document.getElementById("text");``` ==//表示获取 id="text" 的元素==

### 5.2 getElementsByTagName() 方法

返回值：返回带有指定标签名的所有元素

语法：```node.getElementsByTagName("tagname");```

示例：```document.getElementsByTagName("p");``` ==//返回包含文档中所有 <p> 元素的列表==

实例：

```js
//返回包含文档中所有 <p> 元素的列表，并且这些 <p> 元素应该是 id="main" 的元素的后代（子、孙等等）：
var p = document.getElementById("main").getElementsByTagName("p");
```

### 5.3 getElementsByClassName()方法

用途：查找带有相同类名的所有 HTML 元素

语法：`node.getElementsByClassName("ClassName");`

示例：`document.getElementsByClassName("text");` ==//返回包含 class="intro" 的所有元素的一个列表==

==**注意**==：getElementsByClassName() 在 Internet Explorer 5,6,7,8 中无效。

## 6 DOM 的修改

修改 HTML DOM 包括以下几个方面：

- 改变 HTML 内容
- 改变 CSS 样式
- 改变 HTML 属性
- 创建新的 HTML 元素
- 删除已有的 HTML 元素
- 改变事件（处理程序）

### 6.1 创建 HTML 内容

改变元素内容的最简单的方法是使用 innerHTML 属性。

示例：改变一个 <p> 元素的 HTML 内容：

```html
<body>
    <p id="text">xxxxx</p>
    <button onclick="element()">点击</button>
    <script>
        //改变<p> 元素的 HTML 内容
            function element() {
        var element = document.getElementById("text");
        element.innerHTML = "创建的新内容";
    }
    </script>
</body>
```

### 6.2 改变 HTML 样式

通过 DOM，能够访问 HTML 元素的样式对象。

示例：改变一个段落的 HTML 样式

```html
<body>
    <p id="text">xxxxx</p>
    <button onclick="element()">改变样式</button>
    <script>
        //改变一个段落的HTML样式
        function element() {
            var element = document.getElementById("text");
            element.style.color = "red";
            element.style.fontSize = "50px";
        }
    </script>
</body>
```

### 6.3 创建新的 HTML 元素

思路：如需向DOM 添加新元素，您首先必须创建该元素（元素节点），然后把它追加到已有的元素上。

```html
<div>
        <p id="text" class="p1">必须创建新元素（元素节点）</p>
        <p class="p2">追加到已有的元素上</p>
    </div>
    <button onclick="element()">创建一个html元素</button>
    <script>
        //创建一个html元素
        function element() {
            /*1.首先必须创建该元素*/

            //创建了一个新的 <p> 元素
            var newp = document.createElement("h2");
            //创建文本节点
            var tnode = document.createTextNode("这是新创建的一个标题");
            //向新创建的 <p> 元素追加文本节点
            newp.appendChild(tnode);
            /*2.向已有元素追加这个新元素*/

            //查找到一个已有的元素
            var element = document.getElementById("text");
            //向这个已存在的元素追加新元素
            element.appendChild(newp);
        }
    </script>
```

## 7 DOM元素

添加、删除和替换 HTML 元素。

### 7.1 createElement()

用途：向 HTML DOM 添加新元素

语法:`document.createElement("Element");`

实例：

```html
<div id="div1">
<p id="p1">这是p1段落。</p>
<p id="p2">这是p2段落。</p>
</div>
<script>
    //1.首先必须创建该元素
//创建了一个新的 <p> 元素
var para=document.createElement("p");
//创建文本节点
var node=document.createTextNode("这是一个新段落。");
//向新创建的 <p> 元素追加文本节点
para.appendChild(node);
    //2.向已有元素追加这个新元素
//查找到一个已有的元素
var element=document.getElementById("div1");
//向这个已存在的元素追加新元素
element.appendChild(para);
</script>
```

### 7.2 insertBefore()

用途：向某个元素之前插入一个元素

语法：

参数：

```html
 <div id="div1">
        <p id="text" class="p2">必须创建新元素（元素节点）</p>
        <p class="p2">追加到已有的元素上</p>
    </div>
    <button onclick="element()">创建一个html元素</button>
    <script>
        //创建一个html元素
        function element() {
            /*1.首先必须创建该元素*/

            //创建了一个新的 <p> 元素
            var newp = document.createElement("h2");
            //创建文本节点
            var tnode = document.createTextNode("这是新创建的一个标题");
            //向新创建的 <p> 元素追加文本节点
            newp.appendChild(tnode);
            /*2.向已有元素追加这个新元素*/

            //查找到一个已有的元素
            var element = document.getElementById("div1");
            var classname = document.getElementsByClassName("p2")[0];
            //向这个已存在的元素追加新元素
            element.insertBefore(newp,classname)
        }
    </script>
```

### 7.3 removeChild-删除元素

语法：`parent.removeChild(child);`

参数：

如需删除 HTML 元素，您必须清楚该元素的父元素

```html
<div id="div1">
        <p id="text" class="p2">必须创建新元素（元素节点）</p>
        <p class="p2">追加到已有的元素上</p>
    </div>
    <button onclick="element()">删除第一个段落</button>
    <script>
        
        function element() {
            //获取父元素
            var parent = document.getElementById("div1");
            //获取要删除的子元素
            var child = document.getElementsByClassName("p2")[0];
            //删除子元素
            parent.removeChild(child);
        }
    </script>
```

注：如果无法确定父元素，可以通过`parentNode`来查找

```js
//找到您需要删除的子元素，然后使用 parentNode 属性来查找其父元素：
var child=document.getElementById("p1");
child.parentNode.removeChild(child);
```

### 7.4 替换 HTML 元素

如需替换 HTML DOM 中的元素，请使用 replaceChild() 方法：

```html
<div id="div1">
        <p id="text" class="p2">aaaaaaa</p>
        <p class="p2">bbbbbbb</p>
    </div>
    <button onclick="element()">替换元素</button>
    <script>
        function element() {
            var parent = document.getElementById("div1");
            var child = document.getElementsByClassName("p2")[0];
            var para = document.createElement("p");
            var node = document.createTextNode("这是一个新的段落。");
            para.appendChild(node);
            parent.replaceChild(para, child);
        }
    </script>
```

## 8 DOM事件

当事件发生时，可以执行 JavaScript，比如当用户点击一个 HTML 元素时。

如需在用户点击某个元素时执行代码，请把 JavaScript 代码添加到 HTML 事件属性中：

==HTML 中的事件==：

- 当用户点击鼠标时
- 当网页已加载时
- 当图片已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当 HTML 表单被提交时
- 当用户触发按键时

### 8.1 HTML 事件属性

如需向 HTML 元素分配事件，可以使用事件属性。

示例：```<button onclick="displayDate()">点我</button>``` ==//当点击按钮时，会执行名为 displayDate 的函数。==

### 8.2 使用 DOM来分配事件

 DOM 允许您使用 JavaScript 向 HTML 元素分配事件：

示例：```document.getElementById("myBtn").onclick=function(){displayDate()};``` ==//为 button 元素分配 onclick 事件==

### 8.3 onload事件和 onunload 事件

当用户进入或离开页面时，会触发 onload 和 onunload 事件。

onload 事件可用于检查访客的浏览器类型和版本，以便基于这些信息来加载不同版本的网页。

onload 和 onunload 事件可用于处理 cookies。

示例：`<body onload="checkCookies()">`

### 8.4 onchange 事件

onchange 事件常用于输入字段的验证。

示例：

```html
<body>
    <p>将小写字母转为大写字母。</p>
    <label for="fname">输入英文字母:</label>
    <input type="text" id="fname" onchange="myFunction()" autofocus>
    <script>
        function myFunction() {
            var i = document.getElementById("fname");
            i.value = i.value.toUpperCase();
        }
    </script>
</body>
```

### 8.5 onmouseover 和 onmouseout 事件

可用于在鼠标指针移动到或离开元素时触发函数。

```html
<body>
    <p onmouseover="mOver(this)" onmouseout="mOut(this)">鼠标事件</p>
    <script>
        function mOver(index) {
            index.innerHTML = "鼠标悬停";
            index.style.color = "red";
        }
        function mOut(index) {
            index.innerHTML = "鼠标移出";
            index.style.color = "black";
        }
    </script>
</body>
```

### 8.6 onmousedown、onmouseup 以及 onclick 事件

onmousedown、onmouseup 以及 onclick 事件是鼠标点击的全部过程。首先当某个鼠标按钮被点击时，触发 onmousedown 事件，然后，当鼠标按钮被松开时，会触发 onmouseup 事件，最后，当鼠标点击完成时，触发 onclick 事件。

```html
<body>
    <button onmousedown="mDown(this)" onmouseup="mUp(this)">登录</button>
    <script>
        function mDown(index) {
            index.style.color = "red";
        }
        function mUp(index) {
            index.style.color = "blue";
        }
    </script>
</body>
```

## 9.DOM 导航

通过 HTML DOM，您能够使用节点关系在节点树中导航。

### 9.1 DOM 节点列表

getElementsByTagName() 方法返回*节点列表*。节点列表是一个节点数组==（下标号从 0 开始）==。

示例：`var x=document.getElementsByTagName("p");`

### 9.2 DOM 节点列表长度

length 属性定义节点列表中节点的数量。

您可以使用 length 属性来循环节点列表：

```js
//获取所有 <p> 元素节点
x=document.getElementsByTagName("p");
//输出每个 <p> 元素的文本节点的值
for (i=0;i<x.length;i++)
{ 
    document.write(x[i].innerHTML);
    document.write("<br>");
}
```

### 9.3 导航节点关系

使用三个节点属性：parentNode、firstChild 以及 lastChild ，在文档结构中进行导航

```html
<body> 
<p>Hello World!</p>
<div>
  <p>DOM 是非常有用的!</p>
  <p>这个实例演示了节点的关系。</p>
</div> 
</body>

<!--结构说明：
    首个 <p> 元素是 <body> 元素的首个子元素（firstChild）
    <div> 元素是 <body> 元素的最后一个子元素（lastChild）
    <body> 元素是首个 <p> 元素和 <div> 元素的父节点（parentNode）
-->
```

firstChild 属性可用于访问元素的文本：

```html
<p id="intro">Hello World!</p>
 
<script>
x=document.getElementById("intro");
document.write(x.firstChild.nodeValue);
</script>
```

### 9.4 DOM 根节点

这里有两个特殊的属性，可以访问全部文档：

- document.documentElement - 全部文档
- document.body - 文档的主体

### 9.5 childNodes 和 nodeValue

除了 innerHTML 属性，您也可以使用 childNodes 和 nodeValue 属性来获取元素的内容。

```html
<body>
<p id="intro">Hello World!</p>
<script>
    //getElementById 是一个方法，而 childNodes 和 nodeValue 是属性
txt=document.getElementById("intro").childNodes[0].nodeValue;
document.write(txt);
</script>
</body>
```

