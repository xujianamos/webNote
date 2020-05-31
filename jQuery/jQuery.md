# jQuery 教程

## 1 简介

jQuery 是一个 JavaScript 库。

目前jQuery兼容于所有主流浏览器, 包括Internet Explorer 6

## 2 网页中添加 jQuery

可以通过以下方法在网页中添加 jQuery：

- 从 [jquery.com](http://jquery.com/download/) 下载 jQuery 库
- 从 CDN 中载入 jQuery, 如从 Google 中加载 jQuery

有两个版本的 jQuery 可供下载：

- Production version - 用于实际的网站中，已被精简和压缩。
- Development version - 用于测试和开发（未压缩，是可读的代码）

网页引入jquery文件：

```html
<head>
<script src="jquery-1.10.2.min.js"></script>
</head>
```

==注== ：引入的jquery文件最后带上版本号，便于后期查看更新

## 3 jQuery 语法

通过 jQuery，您可以选取（==查询==，query）HTML 元素，并对它们执行"操作"（actions）。

jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： `$(selector).action()`

- 美元符号定义 jQuery
- 选择符（selector）"查询"和"查找" HTML 元素
- jQuery 的 action() 执行对元素的操作

实例:

- `$(this).hide()` - 隐藏当前元素
- `$("p").hide()` - 隐藏所有 <p> 元素
- ` $("p.test").hide()`- 隐藏所有 class="test" 的 <p> 元素
- ` $("#test").hide()`- 隐藏所有 id="test" 的元素

**文档就绪事件**: jQuery 函数位于一个 document ready 函数中（jQuery 入口函数）

示例：

```javascript
$(document).ready(function(){
   // 开始写 jQuery 代码...
});
```

说明：这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。

如果在文档没有完全加载之前就运行函数，操作可能失败。

提示：简洁写法

```js
$(function(){
 
   // 开始写 jQuery 代码...
 
});
```

注：以上两种方式选择你喜欢的方式实现文档就绪后执行 jQuery 方法。

扩展：JavaScript 入口函数:

```js
window.onload = function () {
    // 执行代码
}
```

jQuery 入口函数与 JavaScript 入口函数的区别：

-  jQuery 的入口函数是在 html 所有标签(DOM)都加载之后，就会去执行。
-  JavaScript 的 window.onload 事件是等到所有内容，包括外部图片之类的文件加载完后，才会执行。

|          | window.onload                                              | $(document).ready\|()                                 |
| :------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| 执行时机 | 必须等待网页全部加载完毕（包括图片等），然后再执行包裹代码 | 只需要等待网页中的DOM结构加载完毕，就能执行包裹的代码 |
| 执行次数 | 只能执行一次，如果第二次，那么第一次的执行会被覆盖         | 可以执行多次，第N此都不会被上一次覆盖                 |
| 简写方案 | 无                                                         | $(function() {<br/>    });                            |

## 4 jQuery 选择器

jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。

jQuery 选择器基于元素的 `id`、`类`、`类型`、`属性`、`属性值`等==查找==（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。

jQuery 中所有选择器都以美元符号开头：`$()`

### 4.1 元素选择器

元素选择器基于元素名选取元素。

语法：`$("element")`

示例：

```html
<head>
<script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("p").hide();
            });
        });
    </script>
</head>

<body>
    <h2>标题</h2>
    <p>这是一个段落。</p>
    <p>这是另一个段落。</p>
    <button>点我</button>
</body>
```

### 4.2 id 选择器

jQuery #id 选择器通过 HTML 元素的 id 属性选取指定的元素。

页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。

语法：`$("#test")`

实例：当用户点击按钮后，有 id="p1" 属性的元素将被隐藏

```html
<head>
    <script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("#p1").hide();
            });
        });
    </script>
</head>

<body>
    <h2>标题</h2>
    <p id="p1">这是一个段落。</p>
    <p>这是另一个段落。</p>
    <button>点我</button>
</body>
```

### 4.3 class 选择器

jQuery 类选择器可以通过指定的 class 查找元素。

语法：`$(".test")`

实例：用户点击按钮后所有带有 class="p" 属性的元素都隐藏

```html
<head>
    <script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $(".p").hide();
            });
        });
    </script>
</head>

<body>
    <h2>标题</h2>
    <p class="p">这是一个段落。</p>
    <p class="p">这是另一个段落。</p>
    <button>点我</button>
</body>
```

### 4.4 其他选择器语法

| 语法                       | 描述                                                    |
| :------------------------- | :------------------------------------------------------ |
| `$("*")`                   | 选取所有元素                                            |
| `$(this)`                  | 选取当前 HTML 元素                                      |
| `$("p.intro")`             | 选取 class 为 intro 的 <p> 元素                         |
| `$("p:first")`             | 选取第一个 <p> 元素                                     |
| `$("ul li:first")`         | 选取第一个 <ul> 元素的第一个 <li> 元素                  |
| `$("ul li:first-child")`   | 选取每个 <ul> 元素的第一个 <li> 元素                    |
| `$("[href]")`              | 选取带有 href 属性的元素                                |
| `$("a[target='_blank']")`  | 选取所有 target 属性值等于 "_blank" 的 <a> 元素         |
| `$("a[target!='_blank']")` | 选取所有 target 属性值不等于 "_blank" 的 <a> 元素       |
| `$(":button")`             | 选取所有 type="button" 的 <input> 元素 和 <button> 元素 |
| `$("tr:even")`             | 选取偶数位置的 <tr> 元素                                |
| `$("tr:odd")`              | 选取奇数位置的 <tr> 元素                                |

### 4.5 行为与结构分离

如果您的网站包含许多页面，并且您希望您的 jQuery 函数易于维护，那么请把您的 jQuery 函数放到独立的 .js 文件中。

```html
<head>
<script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
</script>
<script src="my_jquery_functions.js"></script>
</head>
```

## 5 jQuery 事件

页面对不同访问者的响应叫做事件。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。

实例：

- 在元素上移动鼠标。
- 选取单选按钮
- 点击元素

在事件中经常使用术语"触发"（或"激发"）例如： "当您按下按键时触发 keypress 事件"。

==常见 DOM 事件==：

| 鼠标事件   | 键盘事件 | 表单事件 | 文档/窗口事件 |
| :--------- | :------- | :------- | :------------ |
| click      | keypress | submit   | load          |
| dblclick   | keydown  | change   | resize        |
| mouseenter | keyup    | focus    | scroll        |
| mouseleave |          | blur     | unload        |
| hover      |          |          |               |

###  5.1 事件方法语法

在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法。

页面中指定一个点击事件：`$("p").click();`

下一步是定义什么时间触发事件。您可以通过一个事件函数实现：

```js
$("p").click(function(){    
	// 动作触发后执行的代码!! 
});
```

### 5.2 常用的 jQuery 事件方法

#### 5.2.1 $(document).ready()

`$(document).ready() `方法允许我们在文档完全加载完后执行函数。

####  5.2.2 click()

`click() `方法是当按钮点击事件被触发时会调用一个函数。

该函数在用户点击 HTML 元素时执行。

实例：

```js
//当点击事件在某个 <p> 元素上触发时，隐藏当前的 <p> 元素：
$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});
```

####  5.2.3 dblclick()

当双击元素时，会发生 `dblclick `事件。

dblclick() 方法触发 dblclick 事件，或规定当发生 dblclick 事件时运行的函数：

实例：

```js
//双击鼠标左键，该段落就消失。
$(document).ready(function(){
  $("p").dblclick(function(){
    $(this).hide();
  });
});
```

####  5.2.4 mouseenter()

当鼠标指针穿过元素时，会发生 `mouseenter` 事件。

mouseenter() 方法触发 mouseenter 事件，或规定当发生 mouseenter 事件时运行的函数：

实例：

```js
//鼠标指针进入id="p1"，会看到弹窗。
$(document).ready(function(){
  $("#p1").mouseenter(function(){
    alert('您的鼠标移到了 id="p1" 的元素上!');
  });
});
```

####  5.2.5 mouseleave()

当鼠标指针离开元素时，会发生 `mouseleave `事件。

mouseleave() 方法触发 mouseleave 事件，或规定当发生 mouseleave 事件时运行的函数：

实例：

```js
$(document).ready(function(){
  $("#p1").mouseleave(function(){
    alert("再见，您的鼠标离开了该段落。");
  });
});
```

####  5.2.6 mousedown()

当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 `mousedown` 事件。

mousedown() 方法触发 mousedown 事件，或规定当发生 mousedown 事件时运行的函数

实例：

```js
$(document).ready(function(){
  $("#p1").mousedown(function(){
    alert("鼠标在该段落上按下！");
  });
});
```

####  5.2.7 mouseup()

当在元素上松开鼠标按钮时，会发生 `mouseup` 事件。

mouseup() 方法触发 mouseup 事件，或规定当发生 mouseup 事件时运行的函数：

实例：

```js
$(document).ready(function(){
  $("#p1").mouseup(function(){
    alert("鼠标在段落上松开。");
  });
});
```

####  5.2.8 hover()

`hover()`方法用于模拟光标悬停事件。

1. 当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter);

2. 当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。

实例：

```js
$(document).ready(function(){
    $("#p1").hover(
		function(){
			alert("你进入了 p1!");
		},
		function(){
			alert("拜拜! 现在你离开了 p1!");
		}
    )
});
```

####  5.2.9 focus()

当元素获得焦点时，发生` focus` 事件。

当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

focus() 方法触发 focus 事件，或规定当发生 focus 事件时运行的函数：

实例：

```js
//输入框获得焦点，改变输入框的样式
$(document).ready(function(){
  $("input").focus(function(){
    $(this).css("background-color","#cccccc");
  });
  $("input").blur(function(){
    $(this).css("background-color","#ffffff");
  });
});
```

####  5.2.10 blur()

当元素失去焦点时，发生 `blur` 事件。

blur() 方法触发 blur 事件，或规定当发生 blur 事件时运行的函数：

实例：

```js
$(document).ready(function(){
  $("input").focus(function(){
    $(this).css("background-color","#cccccc");
  });
  $("input").blur(function(){
    $(this).css("background-color","#ffffff");
  });
});
```

## 6 jQuery 效果

### 6.1 隐藏和显示

可以使用 `hide()` 和 `show() `方法来隐藏和显示 HTML 元素.

语法：

```javascript
$(selector).hide(speed,callback);

$(selector).show(speed,callback);

//可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

//可选的 callback 参数是隐藏或显示完成后所执行的函数名称。
```

==hide() 方法实例：==

```js
//点击隐藏按钮，p元素会慢慢的隐藏
$(document).ready(function(){
  $("button").click(function(){
  //速度为1000毫秒
    $("p").hide(1000);
  });
});
```

带有回调函数的实例：

```js
$(document).ready(function(){
  $(".hidebtn").click(function(){
      //hide方法的第二个参数是一个字符串，表示过渡使用哪种缓动函数。（jQuery自身提供"linear" 和 "swing"，其他可以使用相关的插件）
    $("div").hide(1000,"linear",function(){
      alert("Hide() 方法已完成!");
    });
  });
});
```

隐藏和显示综合案例：

```js
$(document).ready(function(){
  $("#hide").click(function(){
    $("p").hide();
  });
  $("#show").click(function(){
    $("p").show();
  });
});
```

**jQuery toggle()**

通过 jQuery，您可以使用 `toggle()` 方法来切换 hide() 和 show() 方法。

语法：

```js
$(selector).toggle(speed,callback);
/*
    可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。
    可选的 callback 参数是隐藏或显示完成后所执行的函数名称。
*/
```

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    $("p").toggle(1000);
  });
});
```

### 6.2 淡入淡出

通过 jQuery，可以实现元素的淡入淡出效果。

jQuery 拥有下面四种 fade 方法：

1. `fadeIn()`

2. `fadeOut()`

3. `fadeToggle()`

4. `fadeTo()`

#### 6.2.1 fadeIn()

`fadeIn()` 用于淡入已隐藏的元素。

语法：

```js
$(selector).fadeIn(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。.
可选的 callback 参数是 fading 完成后所执行的函数名称。
*/
```

实例：

```js
//使用此方法淡入元素时，该元素默认应该设置为隐藏
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
    $("#div3").fadeIn(3000);
  });
});
```

#### 6.2.2 fadeOut()

`fadeOut()` 方法用于淡出可见元素。

语法：

```js
$(selector).fadeOut(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是 fading 完成后所执行的函数名称。
*/
```

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").fadeOut();
    $("#div2").fadeOut("slow");
    $("#div3").fadeOut(3000);
  });
});
```

#### 6.2.3 fadeToggle()

`fadeToggle()` 方法可以在 `fadeIn()` 与 `fadeOut()` 方法之间进行切换。

如果元素已淡出，则 fadeToggle() 会向元素添加淡入效果。

如果元素已淡入，则 fadeToggle() 会向元素添加淡出效果。

语法：

```js
$(selector).fadeToggle(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是 fading 完成后所执行的函数名称。
*/
```

实例：

```js
$(document).ready(function(){
	$("button").click(function(){
		$("#div1").fadeToggle();
		$("#div2").fadeToggle("slow");
		$("#div3").fadeToggle(3000);
	});
});
```

#### 6.2.4 fadeTo()

`fadeTo()` 方法允许渐变为给定的不透明度（值介于 0 与 1 之间）。

语法：

```js
$(selector).fadeTo(speed,opacity,callback);
/*
必需的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
fadeTo() 方法中必需的 opacity 参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）。
可选的 callback 参数是该函数完成后所执行的函数名称。
*/
```

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").fadeTo("slow",0.15);
    $("#div2").fadeTo("slow",0.4);
    $("#div3").fadeTo("slow",0.7);
  });
});
```

### 6.3 滑动

jQuery 拥有以下滑动方法：

1. `slideDown()`

2. `slideUp()`

3. `slideToggle()`

#### 6.3.1 slideDown()

`slideDown() `方法用于向下滑动元素.

语法：

```js
$(selector).slideDown(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是滑动完成后所执行的函数名称。
*/
```

实例：

```html
<script> 
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideDown("slow");
  });
});
</script>
<style type="text/css"> 
#panel,#flip
{
	padding:5px;
	text-align:center;
	background-color:#e5eecc;
	border:solid 1px #c3c3c3;
}
#panel
{
	padding:50px;
 	/*必须将元素设置为隐藏*/
	display:none;
}
</style>
</head>
<body>
<div id="flip">点我滑下面板</div>
<div id="panel">Hello world!</div>
</body>
```

#### 6.3.2 slideUp()

`slideUp()` 方法用于向上滑动元素。

语法：

```js
$(selector).slideUp(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是滑动完成后所执行的函数名称。
*/
```

实例：

```js
//此方法无需给元素设置隐藏效果
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideUp("slow");
  });
});
```

#### 6.3.3 slideToggle()

`slideToggle()` 方法可以在 `slideDown()` 与 `slideUp()` 方法之间进行切换。

1. 如果元素向下滑动，则 slideToggle() 可向上滑动它们。

2. 如果元素向上滑动，则 slideToggle() 可向下滑动它们。

语法：

```js
$(selector).slideToggle(speed,callback);
/*
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是滑动完成后所执行的函数名称。
*/
```

实例：

```js
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideToggle("slow");
  });
});
```

### 6.4 动画

`animate()` 方法允许创建自定义的动画。

#### 6.4.1 animate() 方法

语法：

```js
$(selector).animate({params},speed,callback);
/*
必需的 params 参数定义形成动画的 CSS 属性。
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是动画完成后所执行的函数名称。
*/
```

实例:

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("div").animate({left:'250px'});
  });
});
</script> 
<body>
<button>开始动画</button>
<div style="background:#98bf21;height:100px;width:100px;position:absolute;">
</div>
</body>
/*
默认情况下，所有的 HTML 元素有一个静态的位置，且是不可移动的。 如果需要改变为，我们需要将元素的 position 属性设置为 relative, fixed, 或 absolute!
*/
```

#### 6.4.2 animate() - 操作多个属性

实例：

```html
<script> 
$(document).ready(function(){
  $("button").click(function(){
    $("div").animate({
      left:'250px',
      opacity:'0.5',
      height:'150px',
      width:'150px'
    });
  });
});
</script> 

<body>
<button>开始动画</button>
<div style="background:#98bf21;height:100px;width:100px;position:absolute;">
</div>
</body>
```

==注意：==

当使用 animate() 时，必须使用 ==驼峰==标记法书写所有的属性名，比如，必须使用 `paddingLeft` 而不是 `padding-left`，使用 `marginRight` 而不是 `margin-right`，等等。

同时，色彩动画并不包含在核心 jQuery 库中。

如果需要生成颜色动画，您需要从 [jquery.com](http://jquery.com/download/) 下载 [颜色动画](http://plugins.jquery.com/color/) 插件。

#### 6.4.3 animate() - 使用相对值

可以定义相对值（该值相对于元素的当前值)。需要在值的前面加上 ==+\===或 ==-\===：

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    $("div").animate({
      left:'250px',
      height:'+=150px',
      width:'+=150px'
    });
  });
});
```

#### 6.4.4 animate() - 使用预定义的值

可以把属性的动画值设置为 `show`、``hide`或 `toggle`

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    $("div").animate({
      height:'toggle'
    });
  });
});
```

#### 6.4.5  animate() - 使用队列功能

默认地，jQuery 提供针对动画的队列功能。

这意味着如果您在彼此之后编写多个 animate() 调用，jQuery 会创建包含这些方法调用的“内部”队列。然后逐一运行这些 animate 调用。

实例：

```js
$(document).ready(function(){
  $("button").click(function(){
    var div=$("div");
    div.animate({height:'300px',opacity:'0.4'},"slow");
    div.animate({width:'300px',opacity:'0.8'},"slow");
    div.animate({height:'100px',opacity:'0.4'},"slow");
    div.animate({width:'100px',opacity:'0.8'},"slow");
  });
});
```

### 6.5 停止动画

`stop()` 方法用于在动画或效果完成前对它们进行停止。

语法：

```js
$(selector).stop(stopAll,goToEnd);
/*
可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。
可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。
因此，默认地，stop() 会清除在被选元素上指定的当前动画。
*/
```

实例：

1. 不带参数

```js
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideDown(5000);
  });
  $("#stop").click(function(){
    $("#panel").stop();
  });
});

<body>
<button id="stop">停止滑动</button>
<div id="flip">点我向下滑动面板</div>
<div id="panel">Hello world!</div>
</body>
```

2. 带参数

```html
<script> 
$(document).ready(function(){
  $("#start").click(function(){
    $("div").animate({left:'100px'},5000);
    $("div").animate({fontSize:'3em'},5000);
  });
  
  $("#stop").click(function(){
    $("div").stop();
  });

  $("#stop2").click(function(){
    $("div").stop(true);
  });

  $("#stop3").click(function(){
    $("div").stop(true,true);
  });
    
});
</script> 
</head>
<body>
<button id="start">开始</button>
<button id="stop">停止</button>
<button id="stop2">停止所有</button>
<button id="stop3">停止动画，但完成动作</button>
<p>点击 "开始" 按钮开始动画。</p>
<p>点击 "停止" 按钮停止当前激活的动画，但之后我们能再动画队列中再次激活。</p>
<p>点击 "停止所有" 按钮停止当前动画，并清除动画队列，所以元素的所有动画都会停止。</p>
<p>点击 "停止动画，但完成动作" 快速完成动作，并停止它。</p> 
<div style="background:#98bf21;height:100px;width:200px;position:absolute;">HELLO</div>
</body>
```

### 6.6 Callback 方法

Callback 函数在当前动画 100% 完成之后执行。

1. 使用 callback 实例

```
//在隐藏效果完全实现后回调函数
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide("slow",function(){
      alert("段落现在被隐藏了");
    });
  });
});
```

2. 没有 callback(回调)

```
//没有回调函数，警告框会在隐藏效果完成前弹出
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide(1000);
    alert("现在段落被隐藏了");
  });
});
```

==注：==被立即停止的动画不会触发回调，被立即完成的动画会触发回调。

### 6.7 链(Chaining)

通过 jQuery，可以把动作/方法链接在一起。

链 允许我们在一条语句中运行多个 jQuery 方法（在相同的元素上）。

直到现在，我们都是一次写一条 jQuery 语句（一条接着另一条）。

不过，有一种名为链接（chaining）的技术，允许我们在相同的元素上运行多条 jQuery 命令，一条接着另一条。

**提示：** 这样的话，浏览器就不必多次查找相同的元素。

如需链接一个动作，您只需简单地把该动作追加到之前的动作上。

```js
//把 css()、slideUp() 和 slideDown() 链接在一起。"p1" 元素首先会变为红色，然后向上滑动，再然后向下滑动
$(document).ready(function()
  {
  $("button").click(function(){
    $("#p1").css("color","red").slideUp(2000).slideDown(2000);
  });
});
```

可以添加多个方法调用：

```js
//当进行链接时，代码行会变得很长。不过，jQuery 语法不是很严格；您可以按照希望的格式来写，包含换行和缩进
$(document).ready(function()
  {
  $("button").click(function(){
    $("#p1").css("color","red")
      .slideUp(2000)
      .slideDown(2000);
  });
});
```

## 7 jQuery HTML

### 7.1 jQuery 捕获

jQuery 拥有可操作 HTML 元素和属性的强大方法。

jQuery DOM 操作：jQuery 提供一系列与 DOM 相关的方法，这使访问和操作元素和属性变得很容易。

#### 7.1.1 获得内容 

三个简单实用的用于 DOM 操作的 jQuery 方法：

1. text() - 设置或返回所选元素的文本内容

2. html() - 设置或返回所选元素的内容（==包括 HTML 标记==）

3. val() - 设置或返回表单字段的值

实例： ==text() 和 html() 方法==

```html
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
      //text()方法
    alert("Text: " + $("#test").text());
  });
  $("#btn2").click(function(){
      //html()方法
    alert("HTML: " + $("#test").html());
  });
});
</script>

<body>
<p id="test">这是段落中的 <b>粗体</b> 文本。</p>
<button id="btn1">显示文本</button>
<button id="btn2">显示 HTML</button>
</body>
```

实例：==val() 方法==

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
      //val()方法
    alert("值为: " + $("#test").val());
  });
});
</script>

<body>
<p>名称: <input type="text" id="test" value="设置或返回表单字段的值"></p>
<button>显示值</button>
</body>
```

#### 7.1.2 获取属性

jQuery `attr()` 方法用于获取属性值。

实例：

```html
//获得链接中 href 属性的值
<script>
$(document).ready(function(){
  $("button").click(function(){
    alert($("#runoob").attr("id"));
  });
});
</script>

<body>
<p><a href="#" id="runoob"></a></p>
<button>显示 href 属性的值</button>
</body>
```

### 7.2 设置内容和属性

#### 7.2.1 设置内容

方法：

1. `text()` - 设置或返回所选元素的文本内容

2. `html()` - 设置或返回所选元素的内容（包括 HTML 标记）

3. `val()` - 设置或返回表单字段的值

实例：

```html
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    $("#test1").text("Hello world!");
  });
  $("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
  });
  $("#btn3").click(function(){
    $("#test3").val("123456");
  });
});
</script>

<body>
<p id="test1">这是一个段落。</p>
<p id="test2">这是另外一个段落。</p>
<p>输入框: <input type="text" id="test3" value="jquery"></p>
<button id="btn1">设置文本</button>
<button id="btn2">设置 HTML</button>
<button id="btn3">设置值</button>
</body>
```

==text()、html() 以及 val() 的回调函数==

text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

实例：

```html
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    $("#test1").text(function(i,origText){
      return "旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")"; 
    });
  });

  $("#btn2").click(function(){
    $("#test2").html(function(i,origText){
      return "旧 html: " + origText + " 新 html: Hello <b>world!</b> (index: " + i + ")"; 
    });
  });

});
</script>

<body>
<p id="test1">这是一个有 <b>粗体</b> 字的段落。</p>
<p id="test2">这是另外一个有 <b>粗体</b> 字的段落。</p>
<button id="btn1">显示 新/旧 文本</button>
<button id="btn2">显示 新/旧 HTML</button>
</body>
```

#### 7.2.2 设置属性

jQuery attr() 方法也用于设置/改变属性值.

实例：

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#runoob").attr("href","http://www.baidu.com");
  });
});
</script>

<body>
<p><a href="#" id="runoob"></a></p>
<button>修改 href 值</button>
<p>点击按钮修改后，可以点击链接查看链接地址是否变化。</p>
</body>
```

attr() 方法也允许您同时设置多个属性。

实例：

```js
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#runoob").attr({
      "href" : "http://www.baidu.com",
      "title" : "百度"
    });
	// 通过修改的 title 值来修改链接名称
	title =  $("#runoob").attr('title');
	$("#runoob").html(title);
  });
});
</script>

<body>
<p><a href="#" id="runoob">点击</a></p>
<button>修改 href 和 title</button>
<p>点击按钮修改后，可以查看 href 和 title 是否变化。</p>
</body>
```

==attr() 的回调函数==

​	回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

实例：

```js
<script>
$(document).ready(function(){
    $("button").click(function(){
        $("#runoob").attr("href", function(i, origValue){
            return origValue + "/jquery";
        });
    });
});
</script>

<body>
<p><a href="#" id="runoob">点击</a></p>
<button>修改 href 值</button>
<p>点击按钮修改后，可以点击链接查看 href 属性是否变化。</p>
</body>
```

### 7.3 添加元素

#### 7.3.1 添加新的 HTML 内容

添加新内容的四个 jQuery 方法：

- append() - 在被选元素的结尾插入内容
- prepend() - 在被选元素的开头插入内容
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容

==append()== 方法实例：

```js
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    $("p").append(" <b>追加文本</b>。");
  });

  $("#btn2").click(function(){
    $("ol").append("<li>追加列表项</li>");
  });
});
</script>

<body>
<p>这是一个段落。</p>
<p>这是另外一个段落。</p>
<ol>
<li>List item 1</li>
<li>List item 2</li>
<li>List item 3</li>
</ol>
<button id="btn1">添加文本</button>
<button id="btn2">添加列表项</button>
</body>
```

==prepend()==实例

```js
<script>
$(document).ready(function(){
	$("#btn1").click(function(){
		$("p").prepend("<b>在开头追加文本</b>。 ");
	});
	$("#btn2").click(function(){
		$("ol").prepend("<li>在开头添加列表项</li>");
	});
});
</script>

<body>	
<p>这是一个段落。</p>
<p>这是另外一个段落。</p>
<ol>
<li>列表 1</li>
<li>列表 2</li>
<li>列表 3</li>
</ol>
<button id="btn1">添加文本</button>
<button id="btn2">添加列表项</button>
</body>
```

==通过 append() 和 prepend() 方法添加若干新元素==

append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。

实例：

```js
<script>
function appendText(){
	var txt1="<p>文本。</p>";              // 使用 HTML 标签创建文本
	var txt2=$("<p></p>").text("文本。");  // 使用 jQuery 创建文本
	var txt3=document.createElement("p");
	txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
	$("body").append(txt1,txt2,txt3);        // 追加新元素
}
</script>

<body>
<p>这是一个段落。</p>
<button onclick="appendText()">追加文本</button>
</body>
```

after() 和 before() 方法

实例：

```html
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    $("p").before("<b>之前</b>");
  });
  $("#btn2").click(function(){
    $("p").after("<i>之后</i>");
  });
});
</script>

<body>
<p>我是固定的</p>
<button id="btn1">之前插入</button>
<button id="btn2">之后插入</button>
</body>
<!--
	插入的元素位置会受到被选元素的影响：
		如果被选元素是块元素，插入的位置会在上下行
		如果是内联元素，会在左右插入
-->
```

==通过 after() 和 before() 方法添加若干新元素==

after() 和 before() 方法能够通过参数接收无限数量的新元素。可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建新元素。

实例：

```html
<script>
function afterText(){
	var txt1="<b>I </b>";                    // 使用 HTML 创建元素
	var txt2=$("<i></i>").text("love ");     // 使用 jQuery 创建元素
	var txt3=document.createElement("big");  // 使用 DOM 创建元素
	txt3.innerHTML="jQuery!";
	$("p").after(txt1,txt2,txt3);          // 在图片后添加文本
}
</script>

<body>
<p>添加若干元素</p>
<br><br>
<button onclick="afterText()">之后插入</button>
</body>
```

### 7.4 删除元素

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

- remove() - 删除被选元素（及其子元素）
- empty() - 从被选元素中删除子元素

#### 7.4.1 remove() 方法

```js
//移除整个div元素
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").remove();
  });
});
</script>
```

#### 7.4.2 empty() 方法

```js
//移除div元素里面的子元素
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").empty();
  });
});
</script>
```

#### 7.4.3 过滤被删除的元素

remove() 方法也可接受一个参数，允许您对被删元素进行过滤。该参数可以是任何 jQuery 选择器的语法。

```html
//删除 class="italic" 的所有 <p> 元素
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("p").remove(".italic");
  });
});
</script>
</head>
<body>
<p>这是一个段落。</p>
<p class="italic"><i>这是另外一个段落。</i></p>
<p class="italic"><i>这是另外一个段落。</i></p>
<button>移除所有  class="italic" 的 p 元素。</button>
</body>
```

### 7.5 获取并设置 CSS 类

jQuery 拥有若干进行 CSS 操作的方法：

- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回被选元素的一个或多个样式属性

#### 7.5.1 addClass() 方法

```js
/*
	1. 给h1,h2,p元素增加类为blue的样式
	2. 给div增加类为important的样式

*/

<script>
$(document).ready(function(){
  $("button").click(function(){
    $("h1,h2,p").addClass("blue");
    $("div").addClass("important");
  });
});
</script>
```

增加多个类名的写法：

```js
<script>
$(document).ready(function(){
  $("button").click(function(){
      //多个类名之间使用空格隔开
    $("body div:first").addClass("important blue");
  });
});
</script>
```



#### 7.5.2 removeClass() 方法

```js
<script>
$(document).ready(function(){
  $("button").click(function(){
      //多个类名之间使用空格隔开
    $("h1,h2,p").removeClass("blue important");
  });
});
</script>
```



#### 7.5.3 toggleClass()方法

```js
//如果h1,h2,p有类名blue的就执行移除操作。没有blue类名的就执行添加类名blue操作
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("h1,h2,p").toggleClass("blue");
  });
});
</script>
```

###  7.6 css() 方法

#### 7.6.1 返回 CSS 属性

语法：`css("属性名");`

实例：

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    alert("背景颜色 = " + $("p").css("background-color"));
  });
});
</script>
</head>

<body>
<p style="background-color:#ff0000">这是一个段落。</p>
<p style="background-color:#00ff00">这是一个段落。</p>
<button>返回第一个 p 元素的 background-color </button>
</body>
```

#### 7.6.2 设置 CSS 属性

语法：`css("属性名","属性值");`

实例：

```js
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("p").css("background-color","yellow");
  });
});
</script>
```

==设置多个 CSS 属性==

语法：

```css
css({
    "属性名":"属性值",
    "属性名":"属性值",
    ...
}); 
```

==注意==每条声明后面都需要有个逗号分隔（最后一条声明除外）

实例：

```js
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("p").css({
        "background-color":"yellow",
        "font-size":"200%"
    });
  });
});
</script>
```

### 7.7 jQuery 尺寸方法

jQuery 提供多个处理尺寸的重要方法：

- width()
- height()
- innerWidth()
- innerHeight()
- outerWidth()
- outerHeight()

==jQuery 尺寸==

![1563267906125](C:/Users/xujian/AppData/Roaming/Typora/typora-user-images/1563267906125.png)

#### 7.7.1 width() 和 height() 方法

width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。

height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。

实例：

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    var txt="";
    txt+="div 的宽度是: " + $("#div1").width() + "</br>";
    txt+="div 的高度是: " + $("#div1").height();
    $("#div1").html(txt);
  });
});
</script>

<body>
<div id="div1" style="height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;background-color:lightblue;"></div>
<button>显示 div 元素的尺寸</button>
</body>
```

#### 7.7.2 innerWidth() 和 innerHeight() 方法

innerWidth() 方法返回元素的宽度（包括内边距）。

innerHeight() 方法返回元素的高度（包括内边距）。

实例：

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    var txt="";
    txt+="div 宽度: " + $("#div1").width() + "</br>";
    txt+="div 高度: " + $("#div1").height() + "</br>";
    txt+="div 宽度，包含内边距: " + $("#div1").innerWidth() + "</br>";
    txt+="div 高度，包含内边距: " + $("#div1").innerHeight();
    $("#div1").html(txt);
  });
});
</script>

<body>
<div id="div1" style="height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;background-color:lightblue;"></div>
<button>显示 div 元素的尺寸</button>
<p>innerWidth() - 返回元素的宽度 (包含内边距)。</p>
<p>innerHeight() - 返回元素的高度 (包含内边距)。</p>
</body>
```

#### 7.7.3 outerWidth() 和 outerHeight() 方法

outerWidth() 方法返回元素的宽度（包括内边距和边框）。

outerHeight() 方法返回元素的高度（包括内边距和边框）。

实例：

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    var txt="";
    txt+="div 宽度: " + $("#div1").width() + "</br>";
    txt+="div 高度: " + $("#div1").height() + "</br>";
    txt+="div 宽度，包含内边距和边框: " + $("#div1").outerWidth() + "</br>";
    txt+="div 高度，包含内边距和边框: " + $("#div1").outerHeight();
    $("#div1").html(txt);
  });
});
</script>

<body>
<div id="div1" style="height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;background-color:lightblue;"></div>
<br>
<button>显示 div 元素的尺寸</button>
<p>outerWidth() - 返回元素的宽度 (包含内边距和边框)。</p>
<p>outerHeight() - 返回元素的高度 (包含内边距和边框)。</p>
</body>
```

## 8 jQuery 遍历

### 8.1 遍历定义

jQuery 遍历，意为"移动"，用于根据其相对于其他元素的关系来"查找"（或选取）HTML 元素。以某项选择开始，并沿着这个选择移动，直到抵达您期望的元素为止。

下图展示了一个家族树。通过 jQuery 遍历，您能够从被选（当前的）元素开始，轻松地在家族树中向上移动（祖先），向下移动（子孙），水平移动（同胞）。这种移动被称为对 DOM 进行遍历。

![1563268389658](C:/Users/xujian/AppData/Roaming/Typora/typora-user-images/1563268389658.png)

图示解析：

- <div> 元素是 <ul> 的父元素，同时是其中所有内容的祖先。
- <ul> 元素是 <li> 元素的父元素，同时是 <div> 的子元素
- 左边的 <li> 元素是 <span> 的父元素，<ul> 的子元素，同时是 <div> 的后代。
- <span> 元素是 <li> 的子元素，同时是 <ul> 和 <div> 的后代。
- 两个 <li> 元素是同胞（拥有相同的父元素）。
- 右边的 <li> 元素是 <b> 的父元素，<ul> 的子元素，同时是 <div> 的后代。
- <b> 元素是右边的 <li> 的子元素，同时是 <ul> 和 <div> 的后代。

> 注：祖先是父、祖父、曾祖父等等。后代是子、孙、曾孙等等。同胞拥有相同的父。

### 8.2 遍历祖先

祖先是父、祖父或曾祖父等等。

通过 jQuery，您能够向上遍历 DOM 树，以查找元素的祖先。

向上遍历 DOM 树方法：

- parent()
- parents()
- parentsUntil()

#### 8.2.1 parent()方法

parent() 方法返回被选元素的直接父元素。

该方法只会向上一级对 DOM 树进行遍历。

实例：

```js
//返回每个 <span> 元素的的直接父元素
<script>
$(document).ready(function(){
  $("span").parent().css({"color":"red","border":"2px solid red"});
});
</script>

<body>
<div class="ancestors">
  <div style="width:500px;">div (曾祖父元素)
    <ul>ul (祖父元素)  
      <li>li (父元素)
        <span>span</span>
      </li>
    </ul>   
  </div>
  <div style="width:500px;">div (祖父元素)   
    <p>p (父元素)
        <span>span</span>
      </p> 
  </div>
</div>
</body>
```

#### 8.2.2 parents()方法

parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)。

```js
//返回所有 <span> 元素的所有祖先
<script>
$(document).ready(function(){
  $("span").parents().css({"color":"red","border":"2px solid red"});
});
</script>

<body class="ancestors">body (曾曾祖父元素)
  <div style="width:500px;">div (曾祖父元素)
    <ul>ul (祖父元素)  
      <li>li (父元素)
        <span>span</span>
      </li>
    </ul>   
  </div>
</body>
```

可以使用可选参数来过滤对祖先元素的搜索。

```js
//返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素
<script>
$(document).ready(function(){
  $("span").parents("ul").css({"color":"red","border":"2px solid red"});
});
</script>
```

####  8.2.3 parentsUntil()方法

parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。

```js
//返回介于 <span> 与 <div> 元素之间的所有祖先元素
<script>
$(document).ready(function(){
  $("span").parentsUntil("div").css({"color":"red","border":"2px solid red"});
});
</script>

<body class="ancestors"> body (曾曾祖父元素)
  <div style="width:500px;">div (曾祖父元素)
    <ul>ul (祖父元素)  
      <li>li (父元素)
        <span>span</span>
      </li>
    </ul>   
  </div>
</body>
```

### 8.3 遍历后代

后代是子、孙、曾孙等等。

通过 jQuery，您能够向下遍历 DOM 树，以查找元素的后代。

两个用于向下遍历 DOM 树的 jQuery 方法：

- children()
- find()

#### 8.3.1 children()方法

children() 方法返回被选元素的所有直接子元素。

该方法只会向下一级对 DOM 树进行遍历。

实例：

```js
//返回每个 <div> 元素的所有直接子元素
//直接子元素为p元素
<script>
$(document).ready(function(){
	$("div").children().css({"color":"red","border":"2px solid red"});
});
</script>

<body>
<div class="descendants" style="width:500px;">div (当前元素) 
  <p>p (儿子元素)
    <span>span (孙子元素)</span>     
  </p>
  <p>p (儿子元素)
    <span>span (孙子元素)</span>
  </p> 
</div>
</body>
```

可以使用可选参数来过滤对子元素的搜索

```js
//返回类名为 "1" 的所有 <p> 元素，并且它们是 <div> 的直接子元素
<script>
$(document).ready(function(){
  $("div").children("p.1").css({"color":"red","border":"2px solid red"});
});
</script>

<body>
<div class="descendants" style="width:500px;">div (当前元素) 
  <p class="1">p (儿子元素)
    <span>span (孙子元素)</span>     
  </p>
  <p class="2">p (儿子元素)
    <span>span (孙子元素)</span>
  </p> 
</div>
</body>
```



#### 8.3.2 find()方法

find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。

实例：返回指定的后代（span）

```HTML
//返回属于 <div> 后代的所有 <span> 元素
<script>
$(document).ready(function(){
  $("div").find("span").css({"color":"red","border":"2px solid red"});
});
</script>

<body>
<div class="descendants" style="width:500px;">div (当前元素) 
  <p>p (儿子元素)
    <span>span (孙子元素)</span>     
  </p>
  <p>p (儿子元素)
    <span>span (孙子元素)</span>
  </p> 
</div>
</body>
```

实例：返回所有后代（*）

```html
<script>
$(document).ready(function(){
  $("div").find("*").css({"color":"red","border":"2px solid red"});
});
</script>

<body>
<div class="descendants" style="width:500px;">div (当前元素) 
  <p>p (儿子元素)
    <span>span (孙子元素)</span>     
  </p>
  <p>p (儿子元素)
    <span>span (孙子元素)</span>
  </p> 
</div>
</body>
```

### 8.4 遍历同胞（siblings）

同胞拥有相同的父元素。

通过 jQuery，您能够在 DOM 树中遍历元素的同胞元素。

#### 8.4.1 在 DOM 树中水平遍历

有许多有用的方法让我们在 DOM 树进行水平遍历：

- siblings()
- next()
- nextAll()
- nextUntil()
- prev()
- prevAll()
- prevUntil()

#### 8.4.2 siblings() 方法

siblings() 方法返回被选元素的所有同胞元素。

实例：

```html
//h2的同胞元素为p,span,h3,p(也就是同级元素)
<script>
$(document).ready(function(){
	$("h2").siblings().css({"color":"red","border":"2px solid red"});
});
</script>

<body class="siblings">
<div>div (父元素)
  <p>p</p>
  <span>span</span>
  <h2>h2</h2>
  <h3>h3</h3>
  <p>p</p>
</div>
</body>
```

可以使用可选参数来过滤对同胞元素的搜索

```js
//返回属于 <h2> 的同胞元素的所有 <p> 元素
<script>
$(document).ready(function(){
  $("h2").siblings("p").css({"color":"red","border":"2px solid red"});
});
</script>
```

#### 8.4.3 next()

next() 方法返回被选元素的下一个同胞元素。

该方法只返回一个元素。

实例：

```html
//返回 <h2> 的下一个同胞元素
//只会返回h3元素
<script>
$(document).ready(function(){
	$("h2").next().css({"color":"red","border":"2px solid red"});
});
</script>

<body class="siblings">
<div>div (父元素)
  <p>p</p>
  <span>span</span>
  <h2>h2</h2>
  <h3>h3</h3>
  <p>p</p>
</div>
</body>
```

#### 8.4.4 nextAll()

nextAll() 方法返回被选元素的所有跟随（后面）的同胞元素。

实例：

```html
//返回 <h2> 的所有跟随的同胞元素
//也就是返回h3和h3后面的p元素
<script>
$(document).ready(function(){
	$("h2").nextAll().css({"color":"red","border":"2px solid red"});
});
</script>

<body class="siblings">
<div>div (父元素)
  <p>p</p>
  <span>span</span>
  <h2>h2</h2>
  <h3>h3</h3>
  <p>p</p>
</div>
</body>
```

注：也可用可选参数来过滤对同胞元素的搜索

#### 8.4.5 nextUntil()

nextUntil() 方法返回介于两个给定参数之间的所有跟随的同胞元素。

实例：

```html
//返回介于 <h2> 与 <h6> 元素之间的所有同胞元素
//也就是返回h3,h4,h5元素
<script>
$(document).ready(function(){
	$("h2").nextUntil("h6").css({"color":"red","border":"2px solid red"});
});
</script>

<body class="siblings">

<div>div (父元素)
  <p>p</p>
  <span>span</span>
  <h2>h2</h2>
  <h3>h3</h3>
  <h4>h4</h4>
  <h5>h5</h5>
  <h6>h6</h6>
  <p>p</p>
</div>

</body>
```

#### 8.4.6 prev(), prevAll() & prevUntil() 方法

prev(), prevAll() 以及 prevUntil() 方法的工作方式与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞之前元素遍历，而不是之后元素遍历）。

### 8.5 过滤

 作用：缩小搜索元素的范围

三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。

其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。

#### 8.5.1 first() 方法

first() 方法返回被选元素的首个元素。

实例：

```html
//选取首个 <div> 元素内部的第一个 <p> 元素
//只会返回第一个段落（“这是 div 中的一个段落。”）
<script>
$(document).ready(function(){
  $("div p").first().css("background-color","yellow");
});
</script>

<body>
<h1>欢迎访问我的主页</h1>
<div>
	<p>这是 div 中的一个段落。</p>
</div>
<div>
	<p>这是另外一个 div 中的一个段落。</p>
</div>
<p>这是一个段落。</p>
</body>
```

#### 8.5.2 last() 方法

last() 方法返回被选元素的最后一个元素。

实例：

```html
//选择最后一个 <div> 元素中的最后一个 <p> 元素
//只会返回最后一个段落（“这是另外一个 div 中的一个段落。”）
<script>
$(document).ready(function(){
	$("div p").last().css("background-color","yellow");
});
</script>

<body>
<h1>欢迎访问我的主页</h1>
<div>
	<p>这是 div 中的一个段落。</p>
</div>
<div>
	<p>这是另外一个 div 中的一个段落。</p>
</div>
<p>这是一个段落。</p>
</body>
```

#### 8.5.3 eq() 方法

eq() 方法返回被选元素中带有指定索引号的元素。

索引号从 0 开始，因此首个元素的索引号是 0 而不是 1

实例：

```html
//选取第二个 <p> 元素（索引号 1）
<script>
$(document).ready(function(){
  $("p").eq(1).css("background-color","yellow");
});
</script>

<body>
<h1>欢迎访问我的主页</h1>
<p></p>
<p></p>	<!--本次元素会被选中-->
<p></p>
<p></p>
</body>
```

#### 8.5.4 filter() 方法

filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。

实例：

```html
//返回带有类名 "url" 的所有 <p> 元素
<!--
	 (index 1)和(index 3)会设置背景色，其他段落不做修改
-->
<script>
$(document).ready(function(){
   $("p").filter(".url").css("background-color","yellow");
});
</script>

<body>
<h1>欢迎访问我的主页</h1>
<p>(index 0)</p>
<p class="url"> (index 1)</p>	<!--会设置背景色-->
<p>google (index 2)</p>
<p class="url"> (index 3)</p>	<!--会设置背景色-->
</body>
```

#### 8.5.5 not() 方法

not() 方法返回不匹配标准的所有元素。

提示：not() 方法与 filter() 相反。

实例：

```html
//返回不带有类名 "url" 的所有 <p> 元素
<!--
	 (index 0)和(index 2)会设置背景色，其他段落不做修改
-->    
<script>
$(document).ready(function(){
   $("p").not(".url").css("background-color","yellow");
});
</script>

<body>
<h1>欢迎访问我的主页</h1>
<p>(index 0)</p>	<!--会设置背景色-->
<p class="url"> (index 1)</p>	
<p>google (index 2)</p>		<!--会设置背景色-->
<p class="url"> (index 3)</p>	
</body>
```

## 9 jQuery AJAX

### 9.1 简介

AJAX 是与服务器交换数据的技术，它在不重载全部页面的情况下，实现了对部分网页的更新。

AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

使用 AJAX 的应用程序案例：谷歌地图、腾讯微博、优酷视频、人人网等等。

==如果没有 jQuery，AJAX 编程还是有些难度的：==

编写常规的 AJAX 代码并不容易，因为不同的浏览器对 AJAX 的实现并不相同。这意味着您必须编写额外的代码对浏览器进行测试。不过，jQuery 团队为我们解决了这个难题，我们只需要一行简单的代码，就可以实现 AJAX 功能。

### 9.2 AJAX load() 方法

jQuery load() 方法是简单但强大的 AJAX 方法。

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

语法：

```
$(selector).load(URL,data,callback);
说明：
    1. 必需的 URL 参数规定您希望加载的 URL。
    2. 可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。
    3. 可选的 callback 参数是 load() 方法完成后所执行的函数名称。
```

实例：

```js
//将获取的内容加载到id=div1容器中，并且加载到已有内容的后面
<script>
$(document).ready(function(){
	$("button").click(function(){
		$("#div1").load("/try/ajax/demo_test.txt");
	});
});
</script>

<body>
<div id="div1">
<h2>使用 jQuery AJAX 修改文本内容</h2>
</div>
<button>获取外部内容</button>
</body>
```

==也可以把 jQuery 选择器添加到 URL 参数。==

实例：

```js
//将获取的内容加载到id=div1的容器中，并且全部替换容器已有元素
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").load("/try/ajax/demo_test.txt #p1");
  });
});
</script>

<body>
<div id="div1">
<h2>使用 jQuery AJAX 修改文本</h2>
</div>
<button>获取外部文本</button>
</body>
```

可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

实例：

```js
//会在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示"外部内容加载成功！"，而如果失败，则显示错误消息：
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").load("/try/ajax/demo_test.txt",function(responseTxt,statusTxt,xhr){
      if(statusTxt=="success")
        alert("外部内容加载成功!");
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
    });
  });
});
</script>
```

### 9.3 AJAX get() 和 post() 方法

jQuery get() 和 post() 方法用于通过 HTTP GET 或 POST 请求从服务器请求数据。

#### 9.3.1 HTTP 请求：GET vs. POST

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

- *GET* - 从指定的资源请求数据
- *POST* - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

#### 9.3.2 jQuery $.get() 方法

$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

语法：

```html
$.get(URL,callback);
参数：
	1. 必需的 URL 参数规定您希望请求的 URL。
	2. 可选的 callback 参数是请求成功后所执行的函数名。
```

实例：

```js
<script>
$(document).ready(function(){
	$("button").click(function(){
		$.get("/try/ajax/demo_test.php",function(data,status){
			alert("数据: " + data + "\n状态: " + status);
		});
	});
});
</script>
/*
	$.get() 的第一个参数是我们希望请求的 URL（"demo_test.php"）。
	第二个参数是回调函数。第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。
*/
```

#### 9.3.3 jQuery $.post() 方法

$.post() 方法通过 HTTP POST 请求向服务器提交数据。

语法：

```
$.post(URL,data,callback);
说明：
	1. 必需的 URL 参数规定您希望请求的 URL。
	2. 可选的 data 参数规定连同请求发送的数据。
	3. 可选的 callback 参数是请求成功后所执行的函数名。
```

实例：

```js
//使用 $.post() 连同请求一起发送数据
<script>
$(document).ready(function(){
	$("button").click(function(){
		$.post("/try/ajax/demo_test_post.php",{
			name:"post",
			url:"http://www.runoob.com"
		},
		function(data,status){
			alert("数据: \n" + data + "\n状态: " + status);
		});
	});
});
</script>
/*
	$.post() 的第一个参数是我们希望请求的 URL ("demo_test_post.php")。
	然后我们连同请求（name 和 url）一起发送数据。
	"demo_test_post.php" 中的 PHP 脚本读取这些参数，对它们进行处理，然后返回结果。
	第三个参数是回调函数。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。
*/
```

## 10 noConflict() 方法

jQuery 使用 $ 符号作为 jQuery 的简写。

其中某些框架也使用 $ 符号作为简写（就像 jQuery），如果您在用的两种不同的框架正在使用相同的简写符号，有可能导致脚本停止运行。

jQuery 的团队考虑到了这个问题，并实现了 noConflict() 方法。

noConflict() 方法会释放对 $ 标识符的控制，这样其他脚本就可以使用它了。

方法1：

可以通过全名替代简写的方式来使用 jQuery：

```js
<script>
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery 仍然在工作!");
  });
});
</script>
```

方法2：

您也可以创建自己的简写。noConflict() 可返回对 jQuery 的引用，您可以把它存入变量，以供稍后使用。

```js
<script>
var jq=$.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery 仍然在工作!");
  });
});
</script>
```

方法3：

如果你的 jQuery 代码块使用 $ 简写，并且您不愿意改变这个快捷方式，那么您可以把 $ 符号作为变量传递给 ready 方法。这样就可以在函数内使用 $ 符号了 - 而在函数外，依旧不得不使用 "jQuery"：

```js
<script>
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery 仍然在工作!");
  });
});
</script>
```

