## 1.  jQuery 介绍

### 1.1 JavaScript 库

JavaScript库：即 library，是一个==封装==好的特定的==集合==（方法和函数）。从封装一大堆函数的角度理解库，就是在这个库中，封装了很多预先定义好的函数在里面，比如动画animate、hide、show，比如获取元素等。

简单理解： 就是一个JS 文件，里面对我们原生js代码进行了封装，存放到里面。这样我们可以快速高效的使用这些封装好的功能了。

比如 jQuery，就是为了快速方便操作DOM，里面基本都是函数（方法）。

常见的JavaScript 库：jQuery、Prototype、YUI、Dojo、Ext JS、移动端的zepto等，这些库都是对原生 JavaScript 的封装，内部都是用 JavaScript 实现的。

### 1.2 jQuery的概念

jQuery总体概况如下 :

- jQuery 是一个快速、简洁的 JavaScript 库，其设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。
- j 就是 JavaScript；   Query 查询； 意思就是查询js，把js中的DOM操作做了封装，我们可以快速的查询使用里面的功能。
- jQuery 封装了 JavaScript 常用的功能代码，优化了 DOM 操作、事件处理、动画设计和 Ajax 交互。
- 学习jQuery本质： 就是学习调用这些函数（方法）。
- jQuery 出现的目的是加快前端人员的开发速度，我们可以非常方便的调用和使用它，从而提高开发效率。

### 1.3 jQuery的优点

1. 轻量级。核心文件才几十kb，不会影响页面加载速度。
2. 跨浏览器兼容，基本兼容了现在主流的浏览器。
3. 链式编程、隐式迭代。
4. 对事件、样式、动画支持，大大简化了DOM操作。
5. 支持插件扩展开发。有着丰富的第三方的插件，例如：树形菜单、日期控件、轮播图等。
6. 免费、开源。

## 2. jQuery 的基本使用

### 2.1 jQuery 的下载

jQuery的官网地址： https://jquery.com/，官网即可下载最新版本。

>  各个版本的下载：https://code.jquery.com/

​	版本介绍：

> 1x ：兼容 IE 678 等低版本浏览器， 官网不再更新
>
> 2x ：不兼容 IE 678 等低版本浏览器， 官网不再更新
>
> 3x ：不兼容 IE 678 等低版本浏览器， 是官方主要更新维护的版本

### 2.2  jQuery的入口函数

jQuery中常见的两种入口函数：

```javascript
// 第一种: 简单易用。
$(function () {   
    ...  // 此处是页面 DOM 加载完成的入口
}) ; 

// 第二种: 繁琐，但是也可以实现
$(document).ready(function(){
   ...  //  此处是页面DOM加载完成的入口
});
```

总结：

1. 等着 ==DOM== 结构==渲染完毕==即可执行内部代码，不必等到所有外部资源加载完成，jQuery 帮我们完成了封装。
2. 相当于原生 js 中的 `DOMContentLoaded`。
3. 不同于原生 js 中的 `load `事件是等页面文档、外部的 js 文件、css文件、图片加载完毕才执行内部代码。
4. 更推荐使用第一种方式。

### 2.3 jQuery中的顶级对象$

- `$`是 `jQuery` 的别称，在代码中可以使用 `jQuery` 代替，但一般为了方便，通常都直接使用 `$ `。
- `$`是`jQuery`的顶级对象，相当于原生`JavaScript`中的 `window`。把元素利用`$`包装成`jQuery`对象，就可以调用`jQuery `的方法。

### 2.4 jQuery 对象和 DOM 对象

- 用原生 JS 获取来的对象就是 DOM 对象
- jQuery 方法获取的元素就是 jQuery 对象。
- jQuery 对象本质是： 利用`$`对`DOM `对象包装后产生的对象（伪数组形式存储）。

==注意：==

只有 jQuery 对象才能使用 jQuery 方法，DOM 对象则使用原生的 JavaScirpt 方法。

### 2.5  jQuery 对象和 DOM 对象转换

DOM 对象与 jQuery 对象之间是可以相互转换的。

因为原生js 比 jQuery 更大，原生的一些属性和方法 jQuery没有给我们封装. 要想使用这些属性和方法需要把jQuery对象转换为DOM对象才能使用。

1. DOM对象转换成jQuery对象，方法只有一种

```javascript
var box = document.getElementById('box');  // 获取DOM对象
var jQueryObject = $(box);  // 把DOM对象转换为 jQuery 对象
```

2. jQuery 对象转换为 DOM 对象有两种方法

```javascript
//   2.1 jQuery对象[索引值]
var domObject1 = $('div')[0]

//   2.2 jQuery对象.get(索引值)
var domObject2 = $('div').get(0)
```

总结：实际开发比较常用的是把DOM对象转换为jQuery对象，这样能够调用功能更加强大的jQuery中的方法。

## 3.jQuery 选择器

​	原生 JS 获取元素方式很多，很杂，而且兼容性情况不一致，因此 jQuery 给我们做了封装，使获取元素统一标准。

### 3.1  基础选择器

```javascript
$("选择器")   //  里面选择器直接写 CSS 选择器即可，但是要加引号 
```

![基础选择器](E:%5CwebNote%5CjQuery%5Cjquery%E5%9F%BA%E7%A1%80.assets%5C%E5%9F%BA%E7%A1%80%E9%80%89%E6%8B%A9%E5%99%A8.png)

### 3.2层级选择器

​	层级选择器最常用的两个分别为：后代选择器和子代选择器。![层级选择器](E:%5CwebNote%5CjQuery%5Cjquery%E5%9F%BA%E7%A1%80.assets%5C%E5%B1%82%E7%BA%A7%E9%80%89%E6%8B%A9%E5%99%A8.png)

### 3.3 隐式迭代（重要）  

- 遍历内部 DOM 元素（伪数组形式存储）的过程就叫做隐式迭代。  

- 简单理解：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，简化我们的操作，方便我们调用。  

```js
 // 2. 给四个div设置背景颜色为粉色 jquery对象不能使用style
$("div").css("background", "pink");
// 3. 隐式迭代就是把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法
$("ul li").css("color", "red");
```

### 3.4  筛选选择器

筛选选择器，顾名思义就是在所有的选项中选择满足条件的进行筛选选择。常见如下 :

![筛选选择器](E:%5CwebNote%5CjQuery%5Cjquery%E5%9F%BA%E7%A1%80.assets%5C%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8.png)

```js
$(function() {
            $("ul li:first").css("color", "red");
            $("ul li:eq(2)").css("color", "blue");
            $("ol li:odd").css("color", "skyblue");
            $("ol li:even").css("color", "pink");
})
```

### 3.5 jQuery筛选方法

类似DOM中的通过一个节点找另外一个节点，父、子、兄以外有所加强。![relation](E:%5CwebNote%5CjQuery%5Cjquery%E5%9F%BA%E7%A1%80.assets%5Crelation.png)

```js
// 注意一下都是方法 带括号
$(function() {
     // 1. 兄弟元素siblings 除了自身元素之外的所有亲兄弟
      $("ol .item").siblings("li").css("color", "red");
     // 2. 第n个元素
      var index = 2;
     	// (1) 我们可以利用选择器的方式选择
      $("ul li:eq(2)").css("color", "blue");
      $("ul li:eq("+index+")").css("color", "blue");
      // (2) 我们可以利用选择方法的方式选择 更推荐这种写法
         $("ul li").eq(2).css("color", "blue");
         $("ul li").eq(index).css("color", "blue");
       // 3. 判断是否有某个类名
            console.log($("div:first").hasClass("current"));
            console.log($("div:last").hasClass("current"));
        });
```

### 3.6 jQuery 里面的排他思想

想要多选一的效果，排他思想：当前元素设置样式，其余的兄弟元素清除样式。

```js
$(this).css(“color”,”red”);
$(this).siblings(). css(“color”,””);
```

```js
$(function() {
            // 1. 隐式迭代 给所有的按钮都绑定了点击事件
            $("button").click(function() {
                // 2. 当前的元素变化背景颜色
                $(this).css("background", "pink");
                // 3. 其余的兄弟去掉背景颜色 隐式迭代
                $(this).siblings("button").css("background", "");
            });
        })
```

案列：淘宝服饰精品案例分析  

1. 核心原理：鼠标经过左侧盒子某个小li，就让内容区盒子相对应图片显示，其余的图片隐藏。
2. 需要得到当前小li 的索引号，就可以显示对应索引号的图片
3. `jQuery `得到当前元素索引号 `$(this).index()`
4.  中间对应的图片，可以通过 `eq(index) `方法去选择
5. 显示元素 `show()` 隐藏元素 `hide()`  

```js
$(function() {
            // 1. 鼠标经过左侧的小li 
            $("#left li").mouseover(function() {
                // 2. 得到当前小li 的索引号
                var index = $(this).index();
                console.log(index);
                // 3. 让我们右侧的盒子相应索引号的图片显示出来就好了
                // $("#content div").eq(index).show();
                // 4. 让其余的图片（就是其他的兄弟）隐藏起来
                // $("#content div").eq(index).siblings().hide();
                // 链式编程
                $("#content div").eq(index).show().siblings().hide();

            })
        })
//html
 <div class="wrapper">
        <ul id="left">
            <li><a href="#">女靴</a></li>
            <li><a href="#">雪地靴</a></li>
        </ul>
        <div id="content">
            <div>
                <a href="#"><img src="images/女靴.jpg" width="200" height="250" /></a>
            </div>
            <div>
                <a href="#"><img src="images/雪地靴.jpg" width="200" height="250" /></a>
            </div>
        </div>
</div>
```

### 3.7链式编程

链式编程是为了节省代码量，看起来更优雅

```js
$(this).css('color', 'red').sibling().css('color', ''); 
```

## 4.jQuery 样式操作

​	jQuery中常用的样式操作有两种：css() 和 设置类样式方法

### 4.1 操作 css 方法

jQuery 可以使用 css 方法来修改简单元素样式； 也可以操作类，修改多个样式。

1. 参数只写属性名，则是返回属性值

```js
var strColor = $(this).css('color');
```

2. 参数是==属性名，属性值，逗号分隔==，是设置一组样式，==属性必须加引号==，==值如果是数字可以不用跟单位和引号==

```js
$(this).css("color", "red");
```

3. 参数可以是==对象==形式，方便设置多组样式。属性名和属性值用==冒号隔开==， ==属性可以不用加引号==

```javascript
$(this).css({ 
  "color":"white",
  "font-size":"20px"
});
```

示例：

```js
$("div").css("width");//获取值
$("div").css("width", "300px");//设置值
$("div").css("width", 300);//设置值
$("div").css(height, "300px"); //属性名一定要加引号
$("div").css({
                width: 400,
                height: 400,
                backgroundColor: "red"
                // 如果是复合属性则必须采取驼峰命名法，如果值不是数字，则需要加引号
})
```

注意：css() 多用于样式少时操作，多了则不太方便。

### 4.2设置类样式方法

作用等同于以前的 classList，可以操作类样式，==注意操作类里面的参数不要加点==。

常用的三种设置类样式方法：

```js
// 1.添加类
$("div").addClass("current");

// 2.删除类
$("div").removeClass("current");

// 3.切换类
$("div").toggleClass("current");
```

注意：

1. 设置类样式方法比较==适合样式多==时操作，可以弥补`css()`的不足。
2. 原生 JS 中 `className` 会==覆盖==元素原先里面的类名，jQuery 里面类操作只是对指定类进行操作，==不影响原先的类名==。

案例：tab 栏切换

思路分析: 

1. 点击上部的li，当前li 添加current类，其余兄弟移除类。
2. 点击的同时，得到当前li 的索引号
3. 让下部里面相应索引号的item显示，其余的item隐藏

```js
<div class="tab">
  	<div class="tab_list">
        <ul>
             <li class="current">商品介绍</li>
             <li>规格与包装</li>
         </ul>
     </div>
     <div class="tab_con">
            <div class="item" style="display: block;">
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
            </div>
        </div>
    </div>

//js
$(function() {
            // 1.点击上部的li，当前li 添加current类，其余兄弟移除类
            $(".tab_list li").click(function() {
                // 链式编程操作
                $(this).addClass("current").siblings().removeClass("current");
                // 2.点击的同时，得到当前li 的索引号
                var index = $(this).index();
                console.log(index);
                // 3.让下部里面相应索引号的item显示，其余的item隐藏
                $(".tab_con .item").eq(index).show().siblings().hide();
            });
})
```

## 5.jQuery 效果

jQuery 给我们封装了很多动画效果，最为常见的如下：

- 显示隐藏：show() / hide() / toggle() ;
- 划入画出：slideDown() / slideUp() / slideToggle() ; 
- 淡入淡出：fadeIn() / fadeOut() / fadeToggle() / fadeTo() ; 
- 自定义动画：animate() ;

==注意：==

- 动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行。

- jQuery为我们提供另一个方法，可以停止动画排队：`stop()`;

### 5.1 显示隐藏

> 1. 显示效果语法

```css
show([speed,[easing],[fn]])
```

参数：

1. 参数都可以省略， 无动画直接显示。
2.  speed：三种预定速度之一的字符串(`slow` ,`normal` , `fast` )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是`swing`， 可用参数`linear`。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 2. 隐藏语法  

```css
hide([speed,[easing],[fn]])
```

参数：

1. 参数都可以省略， 无动画直接显示。
2. speed：三种预定速度之一的字符串(`slow` ,`normal` , `fast` )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是`swing`， 可用参数`linear`。
4. fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 3. 切换语法  

参数：

1. 参数都可以省略， 无动画直接显示。
2. speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4. fn: 回调函数，在动画完成时执行的函数，每个元素执行一次  

==建议：平时一般不带参数，直接显示隐藏即可==

示例：

```js
<button>显示</button>
<button>隐藏</button>
<button>切换</button>
<div></div>
<script>
  $(function() {
            $("button").eq(0).click(function() {
                $("div").show(1000, function() {
                    alert(1);
                });
            })
            $("button").eq(1).click(function() {
                $("div").hide(1000, function() {
                    alert(1);
                });
            })
            $("button").eq(2).click(function() {
                    $("div").toggle(1000);
                })
                // 一般情况下，我们都不加参数直接显示隐藏就可以了
        });
</script>
```

### 5.2滑动效果  

> 1. 下滑效果语法  

```css
slideDown([speed,[easing],[fn]])
```

参数:

1. 参数都可以省略。
2.  speed:三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing:(Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4. fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 2. 上滑效果语法  

```css
slideUp([speed,[easing],[fn]])
```

参数  :

1. 参数都可以省略。
2. speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 3. 滑动切换效果  

```css
slideToggle([speed,[easing],[fn]])
```

参数  :

1. 参数都可以省略。
2. speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

示例：

```js
$("button").eq(0).click(function() {
                // 下滑动 slideDown()
                $("div").slideDown();
            })
$("button").eq(1).click(function() {
                // 上滑动 slideUp()
                $("div").slideUp(500);

            })
$("button").eq(2).click(function() {
                // 滑动切换 slideToggle()

                $("div").slideToggle(500);

            });
```

### 5.3 事件切换

jQuery中为我们添加了一个新事件 hover() ; 功能类似 css 中的伪类 :hover 。

```css
hover([over,]out)		// 其中over和out为两个函数
```

1. over:鼠标==移到==元素上要触发的函数（相当于`mouseenter`）
2. out:鼠标==移出==元素要触发的函数（相当于`mouseleave`）
3. 如果只写一个函数，则鼠标经过和离开都会触发它  

```js
// 1. 事件切换 hover 就是鼠标经过和离开的复合写法
            $(".nav>li").hover(function() {
                $(this).children("ul").slideDown(200);
            }, function() {
                $(this).children("ul").slideUp(200);
            });
// 2. 事件切换 hover  如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
            $(".nav>li").hover(function() {
                $(this).children("ul").slideToggle();
            });
```

### 5.4动画队列及其停止排队方法  

动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行  

停止排队方法：

```css
stop()
```

1. stop() 方法用于停止动画或效果。
2. 注意： stop() 写到动画或者效果的==前面==， 相当于停止结束上一次的动画。  
3. 总结: 每次使用动画之前，先调用 stop() ,在调用动画。

```js
 $(".nav>li").hover(function() {
                // stop 方法必须写到动画的前面
                $(this).children("ul").stop().slideToggle();
});
```

### 5.5淡入淡出效果  

> 1. 淡入效果语法  

```css
fadeIn([speed,[easing],[fn]])
```

参数  :

1. 参数都可以省略。
2.  speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 2. 淡出效果语  

```css
fadeOut([speed,[easing],[fn]])
```

参数  :

1. 参数都可以省略。
2.  speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 3. 淡入淡出切换效果语法  

```css
fadeToggle([speed,[easing],[fn]])
```

参数  :

1. 参数都可以省略。
2.  speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4.  fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

> 4. 渐进方式调整到指定的不透明度  

```css
fadeTo([[speed],opacity,[easing],[fn]])
```

参数  :

1. `opacity` 透明度==必须写==，取值 0~1 之间。
2.  speed： 三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。 ==必须写==
3. easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4. fn: 回调函数，在动画完成时执行的函数，每个元素执行一次  

示例：

```js
$("button").eq(0).click(function() {
                // 淡入 fadeIn()
                $("div").fadeIn(1000);
            })
$("button").eq(1).click(function() {
                // 淡出 fadeOut()
                $("div").fadeOut(1000);

            })
$("button").eq(2).click(function() {
                // 淡入淡出切换 fadeToggle()
                $("div").fadeToggle(1000);

            });
$("button").eq(3).click(function() {
                //  修改透明度 fadeTo() 这个速度和透明度要必须写
                $("div").fadeTo(1000, 0.5);

            });
```

### 5.6自定义动画 animate  

语法：

```css
animate(params,[speed],[easing],[fn])
```

参数  ：

1. params: 想要更改的样式属性，以对象形式传递，==必须写==。 属性名可以不用带引号， 如果是复合属性则需要采取驼峰命名法 borderLeft。 其余参数都可以省略。
2. speed：三种预定速度之一的字符串(“slow” ,“normal” , or “fast” )或表示动画时长的毫秒数值(如： 1000)。
3.  easing： (Optional) 用来指定切换效果， 默认是“swing”， 可用参数“linear”。
4. fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。  

```js
 $("button").click(function() {
                $("div").animate({
                    left: 500,
                    top: 300,
                    opacity: .4,
                    width: 500
                }, 500);
            })
```

案例：王者荣耀手风琴效果

思路分析: 

1. 鼠标经过某个小li 有两步操作：
2. 当前小li 宽度变为 224px， 同时里面的小图片淡出，大图片淡入
3. 其余兄弟小li宽度变为69px， 小图片淡入， 大图片淡出

```css
/*********css************/
img {
            display: block;
        }
        
ul {
            list-style: none;
        }
        
.king {
            width: 852px;
            margin: 100px auto;
            background: url(images/bg.png) no-repeat;
            overflow: hidden;
            padding: 10px;
        }
        
.king ul {
            overflow: hidden;
        }
        
.king li {
            position: relative;
            float: left;
            width: 69px;
            height: 69px;
            margin-right: 10px;
        }
        
.king li.current {
            width: 224px;
        }
        
.king li.current .big {
            display: block;
        }
        
.king li.current .small {
            display: none;
        }
        
.big {
            width: 224px;
            display: none;
        }
        
.small {
            position: absolute;
            top: 0;
            left: 0;
            width: 69px;
            height: 69px;
            border-radius: 5px;css
        }
/*********html************/
 <div class="king">
        <ul>
            <li class="current">
                <a href="#">
                    <img src="images/m1.jpg" alt="" class="small">
                    <img src="images/m.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/l1.jpg" alt="" class="small">
                    <img src="images/l.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/c1.jpg" alt="" class="small">
                    <img src="images/c.png" alt="" class="big">
                </a>
            </li>
        </ul>
    </div>
/*********js************/
 $(function() {
            // 鼠标经过某个小li 有两步操作：
            $(".king li").mouseenter(function() {
                // 1.当前小li 宽度变为 224px， 同时里面的小图片淡出，大图片淡入
                $(this).stop().animate({
                    width: 224
                }).find(".small").stop().fadeOut().siblings(".big").stop().fadeIn();
                // 2.其余兄弟小li宽度变为69px， 小图片淡入， 大图片淡出
                $(this).siblings("li").stop().animate({
                    width: 69
                }).find(".small").stop().fadeIn().siblings(".big").stop().fadeOut();
            })
});
```

## 6. jQuery 属性操作

### 6.1设置或获取元素固有属性值 prop()  

所谓元素固有属性就是元素本身自带的属性，比如 <a> 元素里面的 href ，比如 <input> 元素里面的 type。 

1. 获取属性语法  

```js
prop('属性')
```

2. 设置属性语法  

```js
prop('属性', '属性值')
```

注意：prop() 除了普通属性操作，更适合操作表单属性：disabled / checked / selected 等。

### 6.2设置或获取元素自定义属性值 attr()  

用户自己给元素添加的属性，我们称为自定义属性。 比如给 div 添加 index =“1”。 

1. 获取属性语法  

```js
attr('属性') // 类似原生 getAttribute()
```

2. 设置属性语法  

```js
attr('属性', '属性值') // 类似原生 setAttribute()
```

注意：

- attr() 除了普通属性操作，更适合操作自定义属性。（该方法也可以获取 H5 自定义属性）

### 6.3数据缓存 data()

data() 方法可以在指定的元素上存取数据，并不会修改 DOM 元素结构。一旦页面刷新，之前存放的数据都将被移除。 

1. 附加数据语法  

```js
data(''name'',''value'') // 向被选元素附加数据
```

2. 获取数据语法  

```js
date(''name'') // 向被选元素获取数据
```

注意：同时，还可以读取 HTML5 自定义属性  data-index ，得到的是数字型。

演示代码：

```js
<body>
    <a href="http://www.itcast.cn" title="都挺好">都挺好</a>
    <input type="checkbox" name="" id="" checked>
    <div index="1" data-index="2">我是div</div>
    <span>123</span>
    <script>
        $(function() {
            //1. element.prop("属性名") 获取元素固有的属性值
            console.log($("a").prop("href"));
            $("a").prop("title", "我们都挺好");
            $("input").change(function() {
                console.log($(this).prop("checked"));
            });
            // console.log($("div").prop("index"));
            // 2. 元素的自定义属性 我们通过 attr()
            console.log($("div").attr("index"));
            $("div").attr("index", 4);
            console.log($("div").attr("data-index"));
            // 3. 数据缓存 data() 这个里面的数据是存放在元素的内存里面
            $("span").data("uname", "andy");
            console.log($("span").data("uname"));
            // 这个方法获取data-index h5自定义属性 第一个 不用写data-  而且返回的是数字型
            console.log($("div").data("index"));
        })
    </script>
</body>
```

### 6.4 案例：购物车案例模块-全选  

1. 全选思路：里面3个小的复选框按钮（j-checkbox）选中状态（checked）跟着全选按钮（checkall）走。
2. 因为checked 是复选框的固有属性，此时我们需要利用prop()方法获取和设置该属性。
3. 把全选按钮状态赋值给3小复选框就可以了。
4. 当我们每次点击小的复选框按钮，就来判断：
5. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
6. :checked 选择器      :checked 查找被选中的表单元素。

```js
 // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
 // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
```

## 7.jQuery 文本属性值

​	jQuery的文本属性值常见操作有三种：html() / text() / val() ; 分别对应JS中的 innerHTML 、innerText 和 value 属性。

### 7.1内容文本值

常见操作有三种：html() / text() / val() ; 分别对应JS中的 innerHTML 、innerText 和 value 属性，主要针对元素的内容还有表单的值操作。

1. 普通元素内容 html()（ 相当于原生inner HTML)

```js
html() // 获取元素的内容
html(''内容'') // 设置元素的内容
```

2. 普通元素文本内容 text() (相当与原生 innerText)

```js
text() // 获取元素的文本内容
text(''文本内容'') // 设置元素的文本内容 
```

3. 表单的值 val()（ 相当于原生value)  

```js
val() // 获取表单的值
val(''内容'') // 设置表单的值
```

注意：html() 可识别标签，text() 不识别标签。

### 7.2案例：购物车案例模块-增减商品数量  

1. 核心思路：首先声明一个变量，当我们点击+号（ increment），就让这个值++，然后赋值给文本框。
2. 注意1： 只能增加本商品的数量， 就是当前+号的兄弟文本框（ itxt）的值。
3.  修改表单的值是val() 方法
4. 注意2： 这个变量初始值应该是这个文本框的值，在这个值的基础上++。要获取表单的值
5. 减号（ decrement）思路同理，但是如果文本框的值是1，就不能再减了。  

```js
 // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        var price = (p * n).toFixed(2);
        // 小计模块 
        // toFixed(2) 可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        // 小计模块 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
```

### 7.3案例：购物车案例模块-修改商品小计  

1. 核心思路：每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格 就是 商品的小计
2.  注意1： 只能增加本商品的小计， 就是当前商品的小计模块（ p-sum）
3. 修改普通元素的内容是text() 方法
4. 注意2： 当前商品的价格，要把￥符号去掉再相乘 截取字符串 substr(1)
5. parents(‘选择器’ ) 可以返回指定祖先元素
6. 最后计算的结果如果想要保留2位小数 通过 toFixed(2) 方法
7.  用户也可以直接修改表单里面的值，同样要计算小计。 用表单change事件
8.  用最新的表单内的值 乘以 单价即可 但是还是当前商品小计  

```js
//  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
```

## 8.元素操作

jQuery 元素操作主要讲的是用jQuery方法，操作标签的遍历、创建、添加、删除等操作。

### 8.1遍历元素

​	jQuery 隐式迭代是对同一类元素做了同样的操作。 如果想要给同一类元素做不同操作，就需要用到遍历。

语法1：

```js
$("div").each(function (index, domEle) { xxx; }）
```

1. each() 方法遍历匹配的每一个元素。主要用DOM处理。 each 每一个
2. 里面的回调函数有2个参数： index 是每个元素的索引号; demEle 是每个DOM元素对象，不是jquery对象
3. 所以要想使用jquery方法，需要给这个dom元素转换为jquery对象 $(domEle)  

语法2：

```js
$.each(object， function (index, element) { xxx; }）
```

1. $.each()方法可用于遍历任何对象。 主要用于数据处理，比如数组，对象
2. 里面的函数有2个参数： index 是每个元素的索引号; element 遍历内容  

注意：此方法用于遍历 jQuery 对象中的每一项，回调函数中元素为 DOM 对象，想要使用 jQuery 方法需要转换。

演示：

```js
<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        $(function() {
            // 如果针对于同一类元素做不同操作，需要用到遍历元素（类似for，但是比for强大）
            var sum = 0;
            var arr = ["red", "green", "blue"];
            // 1. each() 方法遍历元素 
            $("div").each(function(i, domEle) {
                // 回调函数第一个参数一定是索引号  可以自己指定索引号号名称
                // console.log(i);
                // 回调函数第二个参数一定是 dom 元素对象，也是自己命名
                // console.log(domEle);  // 使用jQuery方法需要转换 $(domEle)
                $(domEle).css("color", arr[i]);
                sum += parseInt($(domEle).text());
            })
            console.log(sum);
            // 2. $.each() 方法遍历元素 主要用于遍历数据，处理数据
            // $.each($("div"), function(i, ele) {
            //     console.log(i);
            //     console.log(ele);
            // });
            // $.each(arr, function(i, ele) {
            //     console.log(i);
            //     console.log(ele);
            // })
            $.each({
                name: "andy",
                age: 18
            }, function(i, ele) {
                console.log(i); // 输出的是 name age 属性名
                console.log(ele); // 输出的是 andy  18 属性值
            })
        })
    </script>
</body>
```

### 8.2案例：购物车案例模块-计算总计和总额  

1. 核心思路：把所有文本框里面的值相加就是总计数量。总额同理
2. 文本框里面的值不相同，如果想要相加需要用到each遍历。声明一个变量，相加即可
3. 点击+号-号，会改变总计和总额，如果用户修改了文本框里面的值同样会改变总计和总额
4. 因此可以封装一个函数求总计和总额的， 以上2个操作调用这个函数即可。
5.  注意1： 总计是文本框里面的值相加用 val() 总额是普通元素的内容用text()
6.  要注意普通元素里面的内容要去掉￥并且转换为数字型才能相加  

```js
// 5. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
```

### 8.3创建元素  

语法：

```js
$(''<li></li>'');//动态的创建了一个 <li>
```

### 8.4添加元素  

1. 内部添加  

```js
element.append(''内容'')//把内容放入匹配元素内部最后面， 类似原生 appendChild。
element.prepend(''内容'')//把内容放入匹配元素内部最前面。
```

2. 外部添加  

```js
element.after(''内容'') // 把内容放入目标元素后面
element.before(''内容'') // 把内容放入目标元素前面
```

- 内部添加元素，生成之后，它们是父子关系。  
- 外部添加元素，生成之后，他们是兄弟关系。  

### 8.5删除元素  

```js
element.remove() // 删除匹配的元素（本身）
element.empty() // 删除匹配的元素集合中所有的子节点
element.html('''') // 清空匹配的元素内容
```

- remove 删除元素本身。  
- empt() 和 html('''') 作用等价，都可以删除元素里面的内容，只不过 html 还可以设置内容。  

```js
<body>
    <ul>
        <li>原先的li</li>
    </ul>
    <div class="test">我是原先的div</div>
    <script>
        $(function() {
            // 1. 创建元素
            var li = $("<li>我是后来创建的li</li>");
      
            // 2. 添加元素
            // 	2.1 内部添加
            // $("ul").append(li);  内部添加并且放到内容的最后面 
            $("ul").prepend(li); // 内部添加并且放到内容的最前面
            //  2.2 外部添加
            var div = $("<div>我是后妈生的</div>");
            // $(".test").after(div);
            $(".test").before(div);
      
            // 3. 删除元素
            // $("ul").remove(); 可以删除匹配的元素 自杀
            // $("ul").empty(); // 可以删除匹配的元素里面的子节点 孩子
            $("ul").html(""); // 可以删除匹配的元素里面的子节点 孩子
        })
    </script>
</body>
```

### 8.6 案例：购物车案例模块-删除商品模块  

1. 核心思路：把商品remove() 删除元素即可
2. 有三个地方需要删除： 1. 商品后面的删除按钮 2. 删除选中的商品 3. 清理购物车
3. 商品后面的删除按钮： 一定是删除当前的商品，所以从 $(this) 出发
4. 删除选中的商品： 先判断小的复选框按钮是否选中状态，如果是选中，则删除对应的商品
5.  清理购物车： 则是把所有的商品全部删掉  

```js
// 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        // 删除的是当前的商品 
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
```

### 8.7案例：购物车案例模块-选中商品添加背景

1. 核心思路：选中的商品添加背景，不选中移除背景即可
2. 全选按钮点击：如果全选是选中的，则所有的商品添加背景，否则移除背景
3. 小的复选框点击： 如果是选中状态，则当前商品添加背景，否则移除背景
4. 这个背景，可以通过类名修改，添加类和删除类

## 9.jQuery 尺寸、位置操作  

### 9.1jQuery 尺寸

 jQuery 尺寸操作包括元素宽高的获取和设置，且不一样的API对应不一样的盒子模型。

![image-20200225104107440](E:%5CwebNote%5CjQuery%5Cjquery%E5%9F%BA%E7%A1%80.assets%5Cimage-20200225104107440.png)

- 以上参数为==空==，则是获取相应值，返回的是数字型。
-  如果参数为==数字==，则是修改相应值。
- ==参数可以不必写单位==。  

```js
$(function() {
            // 1. width() / height() 获取设置元素 width和height大小 
            console.log($("div").width());
            // $("div").width(300);

            // 2. innerWidth() / innerHeight()  获取设置元素 width和height + padding 大小 
            console.log($("div").innerWidth());

            // 3. outerWidth()  / outerHeight()  获取设置元素 width和height + padding + border 大小 
            console.log($("div").outerWidth());

            // 4. outerWidth(true) / outerHeight(true) 获取设置 width和height + padding + border + margin
            console.log($("div").outerWidth(true));
        })
```

注意：有了这套 API 我们将可以快速获取和设置宽高，至于其他属性想要获取和设置，还要使用 css() 等方法配合。

### 9.2 jQuery 位置  

位置主要有三个： offset()、 position()、 scrollTop()/scrollLeft()  

> 1. offset() 设置或获取元素偏移  

- offset() 方法设置或返回被选元素相对于文档的偏移坐标，跟父级没有关系。
-  该方法有2个属性 left、 top 。 offset().top 用于获取距离文档顶部的距离， offset().left 用于获取距离文档左侧的距离。
-  可以设置元素的偏移： offset({ top: 10, left: 30 });  

```js
// 1. 获取设置距离文档的位置（偏移） offset
            console.log($(".son").offset());
            console.log($(".son").offset().top);
             $(".son").offset({
                 top: 200,
                 left: 200
             });
```

> 2. position() 获取元素偏移  

- position() 方法用于返回被选元素相对于==带有定位的父级偏移坐标==，如果父级都没有定位，则以文档为准。
- 该方法有2个属性 left、 top。 position().top 用于获取距离定位父级顶部的距离， position().left 用于获取距离定位父级左侧的距离。
- ==该方法只能获取==。  

```js
// 2. 获取距离带有定位父级位置（偏移） position   如果没有带有定位的父级，则以文档为准
            // 这个方法只能获取不能设置偏移
            console.log($(".son").position());
             $(".son").position({
                 top: 200,
                 left: 200
            });
```

> 3. scrollTop()/scrollLeft() 设置或获取元素被卷去的头部和左侧  

- scrollTop() 方法==设置或返回==被选元素被卷去的头部。
- 不跟参数是获取，参数为==不带单位的数字==则是设置被卷去的头部。  

```js
// 3. 被卷去的头部
      		$(document).scrollTop(100);
            // 被卷去的头部 scrollTop()  / 被卷去的左侧 scrollLeft()
            // 页面滚动事件
            var boxTop = $(".container").offset().top;
            $(window).scroll(function() {
                // console.log(11);
                console.log($(document).scrollTop());
                if ($(document).scrollTop() >= boxTop) {
                    $(".back").fadeIn();
                } else {
                    $(".back").fadeOut();
                }
            });
            // 返回顶部
            $(".back").click(function() {
                // $(document).scrollTop(0);
                $("body, html").stop().animate({
                    scrollTop: 0
                });
                // $(document).stop().animate({
                //     scrollTop: 0
                // }); 不能是文档而是 html和body元素做动画
            })
```

### 9.3案例：带有动画的返回顶部  

1. 核心原理： 使用animate动画返回顶部。
2. animate动画函数里面有个scrollTop 属性，可以设置位置
3.  但是是元素做动画，因此 $(“body,html”).animate({scrollTop: 0})  

```js

```

### 9.4案例： 品优购电梯导航  

1. 当我们滚动到 今日推荐 模块，就让电梯导航显示出来
2.  点击电梯导航页面可以滚动到相应内容区域
3.  核心算法：因为电梯导航模块和内容区模块一一对应的
4. 当我们点击电梯导航某个小模块，就可以拿到当前小模块的索引号
5. 就可以把animate要移动的距离求出来： 当前索引号内容区模块它的offset().top
6. 然后执行动画即可  

```

```

1. 当我们点击电梯导航某个小li， 当前小li 添加current类，兄弟移除类名
2. 当我们页面滚动到内容区域某个模块， 左侧电梯导航，相对应的小li模块，也会添加current类， 兄弟移除current类。
3. 触发的事件是页面滚动，因此这个功能要写到页面滚动事件里面。
4. 需要用到each，遍历内容区域大模块。 each里面能拿到内容区域每一个模块元素和索引号
5. 判断的条件： 被卷去的头部 大于等于 内容区域里面每个模块的offset().top
6.  就利用这个索引号找到相应的电梯导航小li添加类。  

```

```

## 10.jQuery 事件

### 10.1 jQuery 事件注册

jQuery 为我们提供了方便的事件注册机制，是开发人员抑郁操作优缺点如下：

- 优点: 操作简单，且不用担心事件覆盖等问题。
- 缺点: 普通的事件注册不能做事件委托，且无法实现事件解绑，需要借助其他方法。

>  单个事件注册  

语法：

```js
element.事件(function(){})

$(“div”).click(function(){ 事件处理程序 })
```

其他事件和原生基本一致。  

比如mouseover、 mouseout、 blur、 focus、 change、 keydown、 keyup、 resize、 scroll 等  

```js
$(function() {
            // 1. 单个事件注册
            $("div").click(function() {
                $(this).css("background", "purple");
            });
            $("div").mouseenter(function() {
                $(this).css("background", "skyblue");
            });
        })
```

### 10.2 jQuery 事件处理

因为普通注册事件方法的不足，jQuery又开发了多个处理方法，重点讲解如下：

- on(): 用于事件绑定，目前最好用的事件绑定方法
- off(): 事件解绑
- trigger() / triggerHandler(): 事件触发

#### 10.2.1事件处理 on() 绑定事件  

on() 方法在匹配元素上绑定一个或多个事件的事件处理函数  

语法：

```js
element.on(events,[selector],fn)
```

1. events:==一个或多个==用==空格分隔==的事件类型，如"click"或"keydown" 。
2. selector: 元素的==子元素选择器== 。主要用于事件委托
3.  fn:回调函数 即绑定在元素身上的侦听函数。 

> on() 方法优势1：  

可以绑定多个事件，多个处理事件处理程序。  

```js
$(“div”).on({
mouseover: function(){},
mouseout: function(){},
click: function(){}
});
```

如果多个事件处理程序都相同  ，则可使用以下方法

```js
$(“div”).on(“mouseover mouseout”, function() {
			$(this).toggleClass(“current”);
});
```

```js
// (1) on可以绑定1个或者多个事件处理程序
             $("div").on({
                 mouseenter: function() {
                     $(this).css("background", "skyblue");
                 },
                 click: function() {
                     $(this).css("background", "purple");
                 }
             });
            $("div").on("mouseenter mouseleave", function() {
                $(this).toggleClass("current");
            });
```



> on() 方法优势2： 

可以事件委派操作 。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素。  

```js
$('ul').on('click', 'li', function() {
alert('hello world!');
});
```

在此之前有bind(), live() delegate()等方法来处理事件绑定或者事件委派，最新版本的请用on替代他们。

```js
// (2) on可以实现事件委托（委派）
            // click 是绑定在ul 身上的，但是 触发的对象是 ul 里面的小li
            $("ul li").click();
            $("ul").on("click", "li", function() {
                alert(11);
            });
```

  

> on() 方法优势3：  

动态创建的元素， click() 没有办法绑定事件， on() 可以给动态生成的元素绑定事件  

```js
$("div").append($("<p>我是动态创建的p</p>"));

$(“div").on("click",”p”, function(){
alert("俺可以给动态生成的元素绑定事件")
});
```

> 案例：发布微博案例  

- 点击发布按钮， 动态创建一个小li，放入文本框的内容和删除按钮， 并且添加到ul 中。
- 点击的删除按钮，可以删除当前的微博留言  

#### 10.2.2事件处理 off() 解绑事件  

事件处理 off() 解绑事件  

```js
$("p").off() // 解绑p元素所有事件处理程序

$("p").off( "click") // 解绑p元素上面的点击事件 后面的 foo 是侦听函数名

$("ul").off("click", "li"); // 解绑事件委托
```

注：如果有的事件只想触发一次， 可以使用 one() 来绑定事件。  

```js
$(function() {
  			// 事件绑定
            $("div").on({
                click: function() {
                    console.log("我点击了");
                },
                mouseover: function() {
                    console.log('我鼠标经过了');
                }
            });
            $("ul").on("click", "li", function() {
                alert(11);
            });
  
            // 1. 事件解绑 off 
            // $("div").off();  // 这个是解除了div身上的所有事件
            $("div").off("click"); // 这个是解除了div身上的点击事件
            $("ul").off("click", "li");
  
            // 2. one() 但是它只能触发事件一次
            $("p").one("click", function() {
                alert(11);
            })
        })
```



#### 10.2.3自动触发事件 trigger()

有些事件希望自动触发, 比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

语法：  

```js
element.click() // 第一种简写形式

element.trigger("type") // 第二种自动触发模式

element.triggerHandler(type) // 第三种自动触发模式
//triggerHandler模式不会触发元素的默认行为，这是和前面两种的区别。
```

示例：

```js
$("p").on("click", function () {
alert("hi~");
});
$("p").trigger("click"); // 此时自动触发点击事件，不需要鼠标点击
```

```javascript
<body>
    <div></div>
    <input type="text">
      
    <script>
    $(function() {
      // 绑定事件
      $("div").on("click", function() {
        alert(11);
      });

      // 自动触发事件
      // 1. 元素.事件()
      // $("div").click();会触发元素的默认行为
      
      // 2. 元素.trigger("事件")
      // $("div").trigger("click");会触发元素的默认行为
      $("input").trigger("focus");
      
      // 3. 元素.triggerHandler("事件") 就是不会触发元素的默认行为
      $("input").on("focus", function() {
        $(this).val("你好吗");
      });
      // 一个会获取焦点，一个不会
      $("div").triggerHandler("click");
      // $("input").triggerHandler("focus");
    });
    </script>
</body>
```



### 10.3 jQuery 事件对象

​	jQuery 对DOM中的事件对象 event 进行了封装，兼容性更好，获取更方便，使用变化不大。事件被触发，就会有事件对象的产生。  

语法：

```js
element.on(events,[selector],function(event) {
  //形参event就是事件对象
})
```

阻止默认行为： event.preventDefault() 或者 return false
阻止冒泡： event.stopPropagation()  

```javascript
$(function() {
            $(document).on("click", function() {
                console.log("点击了document");
            })
            $("div").on("click", function(event) {
                // console.log(event);
                console.log("点击了div");
                event.stopPropagation();
            })
        })
```



## 11.jQuery 拷贝对象

如果想要把某个对象拷贝（合并） 给另外一个对象使用，此时可以使用 $.extend() 方法  

语法：

```js
$.extend([deep], target, object1, [objectN])
```

1. deep: 如果设为true 为深拷贝， 默认为false 浅拷贝
2.  target: 要拷贝的目标对象
3. object1:待拷贝到第一个对象的对象。
4.  objectN:待拷贝到第N个对象的对象。
5. 浅拷贝目标对象引用的被拷贝的对象地址，修改目标对象==会影响==被拷贝对象。
6. 深拷贝，前面加true， 完全克隆，修改目标对象==不会影响==被拷贝对象。  

```javascript
<script>
        $(function() {
   			// 1.合并数据
            var targetObj = {};
            var obj = {
                id: 1,
                name: "andy"
            };
            // $.extend(target, obj);
            $.extend(targetObj, obj);
            console.log(targetObj);
   
   			// 2. 会覆盖 targetObj 里面原来的数据
            var targetObj = {
                id: 0
            };
            var obj = {
                id: 1,
                name: "andy"
            };
            // $.extend(target, obj);
            $.extend(targetObj, obj);
            console.log(targetObj); 
        })
    </script>
```

## 12.多库共存

jQuery使用`$`作为标示符， 随着`jQuery`的流行,其他 js 库也会用这`$`作为标识符， 这样一起使用会引起冲突。  

需要一个解决方案，让jQuery 和其他的js库不存在冲突，可以同时存在，这就叫做多库共存。  

jQuery 解决方案：

1. 把里面的 $ 符号 统一改为 jQuery。 比如 jQuery(''div'')
2. jQuery 变量规定新的名称： `$.noConflict() var xx = $.noConflict();  `

## 13.jQuery 插件

jQuery 功能比较有限，想要更复杂的特效效果，可以借助于 jQuery 插件完成。

注意: 这些插件也是依赖于jQuery来完成的，所以必须要先引入jQuery文件，因此也称为 jQuery 插件。  

jQuery 插件常用的网站：

1. jQuery 插件库 http://www.jq22.com/
2. jQuery 之家 http://www.htmleaf.com/  

jQuery 插件使用步骤：

1. 引入相关文件。（ jQuery 文件 和 插件文件）
2. 复制相关html、 css、 js (调用插件)  

jQuery 插件演示：

### 13.1瀑布流

**代码演示**

​	插件的使用三点：   1. 引入css.           2.引入JS            3.引入html。 （有的简单插件只需引入html和js，甚至有的只需引入js）

- 1.引入css.

```javascript
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/default.css">
  
<!-- 下面的样式代码为页面布局，可以引入，也可以自己写，自己设计页面样式，一般为直接引入，方便 -->
<style type="text/css">
  #gallery-wrapper {
    position: relative;
    max-width: 75%;
    width: 75%;
    margin: 50px auto;
  }

  img.thumb {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .white-panel {
    position: absolute;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    padding: 10px;
  }

  .white-panel h1 {
    font-size: 1em;
  }

  .white-panel h1 a {
    color: #A92733;
  }

  .white-panel:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    margin-top: -5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
</style>
```

- 2.引入js.

```javascript
<!-- 前两个必须引入 -->
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/pinterest_grid.js"></script>
<!-- 下面的为启动瀑布流代码，参数可调节属性，具体功能可参考readme.html -->
<script type="text/javascript">
	$(function() {
      $("#gallery-wrapper").pinterest_grid({
          no_columns: 5,
          padding_x: 15,
          padding_y: 10,
          margin_bottom: 50,
          single_column_breakpoint: 700
      });
	});
</script>
```

- 3.引入html.

```javascript
	<!-- html结构一般为事先写好，很难修改结构，但可以修改内容及图片的多少（article标签） -->
	<section id="gallery-wrapper">
        <article class="white-panel">
            <img src="images/P_000.jpg" class="thumb">
            <h1><a href="#">我是轮播图片1</a></h1>
            <p>里面很精彩哦</p>
        </article>
        <article class="white-panel">
            <img src="images/P_005.jpg" class="thumb">
            <h1><a href="#">我是轮播图片1</a></h1>
            <p>里面很精彩哦</p>
        </article>
        <article class="white-panel">
            <img src="images/P_006.jpg" class="thumb">
            <h1><a href="#">我是轮播图片1</a></h1>
            <p>里面很精彩哦</p>
        </article>
        <article class="white-panel">
            <img src="images/P_007.jpg" class="thumb">
            <h1><a href="#">我是轮播图片1</a></h1>
            <p>里面很精彩哦</p>
        </article>
    </section>
```

总结：jQuery插件就是引入别人写好的：html 、css、js  （有时也可以只引入一部分，读懂后也可以修改部分内容）

### 13.2图片懒加载

图片的懒加载就是：当页面滑动到有图片的位置，图片才进行加载，用以提升页面打开的速度及用户体验.
我们使用jquery 插件库 EasyLazyload。 注意，此时的js引入文件和js调用必须写到 DOM元素（图片）最后面

**代码演示**

​	懒加载只需引入html 和 js操作 即可，此插件不涉及css。

- 1.引入js

```javascript
<script src="js/EasyLazyload.min.js"></script>
<script>
   	lazyLoadInit({
   		showTime: 1100,
   		onLoadBackEnd: function(i, e) {
     		console.log("onLoadBackEnd:" + i);
   		},
   		onLoadBackStart: function(i, e) {
     		console.log("onLoadBackStart:" + i);
   		}
 	});
</script>
```

- 2.引入html

```javascript
 <img data-lazy-src="upload/floor-1-3.png" alt="">
```



### 13.3全屏滚动（ fullpage.js）

gitHub： https://github.com/alvarotrigo/fullPage.js
中文翻译网站： http://www.dowebok.com/demo/2014/77/  

**代码演示**

​	全屏滚动因为有多重形式，所以不一样的风格html和css也不一样，但是 js 变化不大。所以下面只演示js的引入，html和css引入根据自己实际

项目需要使用哪种风格引入对应的HTML和CSS。

```javascript
<script src="js/jquery.min.js"></script>
<script src="js/fullpage.min.js"></script>
<script>
  	$(function() {
  		$('#dowebok').fullpage({
    		sectionsColor: ['pink', '#4BBFC3', '#7BAABE', '#f90'],
    		navigation: true
  		});
	});
</script>
```

注意：实际开发，一般复制文件，然后在文件中进行修改和添加功能。

## 14. 综合案例

案例： toDoList  

### 14.1 需求：

1. 文本框里面输入内容，按下回车，就可以生成待办事项。

2. 点击待办事项复选框，就可以把当前数据添加到已完成事项里面。
3.  点击已完成事项复选框，就可以把当前数据添加到待办事项里面。
4.  但是本页面内容刷新页面不会丢失。  

### 14.2 分析 ：

1. 刷新页面不会丢失数据，因此需要用到本地存储 localStorage
2. 核心思路： 不管按下回车，还是点击复选框，都是把本地存储的数据加载到页面中，这样保证刷新关闭页面不会丢失数据
3. 存储的数据格式： var todolist = [{ title : ‘xxx’ , done: false}]
4.  注意点1： 本地存储 localStorage 里面只能存储字符串格式 ，因此需要把对象转换为字符串 JSON.stringify(data)。
5. 注意点2： 获取本地存储数据，需要把里面的字符串转换为对象格式JSON.parse() 我们才能使用里面的数据。  

### 14.3模块开发

> toDoList 按下回车把新数据添加到本地存储里面  

1. 切记： 页面中的数据，都要从本地存储里面获取，这样刷新页面不会丢失数据，所以先要把数据保存到本地存储里面。
2. 利用事件对象.keyCode判断用户按下回车键（ 13）。
3. 声明一个数组，保存数据。
4. 先要读取本地存储原来的数据（声明函数 getData()），放到这个数组里面。
5. 之后把最新从表单获取过来的数据，追加到数组里面。
6. 最后把数组存储给本地存储 (声明函数 savaDate())  

> toDoList 本地存储数据渲染加载到页面  

1. 因为后面也会经常渲染加载操作，所以声明一个函数 load，方便后面调用
2. 先要读取本地存储数据。（数据不要忘记转换为对象格式）
3. 之后遍历这个数据（ $.each()），有几条数据，就生成几个小li 添加到 ol 里面。
4.  每次渲染之前，先把原先里面 ol 的内容清空，然后渲染加载最新的数据。  

> toDoList 删除操作  

1. 点击里面的a链接，不是删除的li，而是删除本地存储对应的数据。
2.  核心原理：先获取本地存储数据，删除对应的数据，保存给本地存储，重新渲染列表li
3. 我们可以给链接自定义属性记录当前的索引号
4. 根据这个索引号删除相关的数据----数组的splice(i, 1)方法
5. 存储修改后的数据，然后存储给本地存储
6.  重新渲染加载数据列表
7. 因为a是动态创建的，我们使用on方法绑定事件  

> toDoList 正在进行和已完成选项操作  

1. 当我们点击了小的复选框，修改本地存储数据，再重新渲染数据列表。
2. 点击之后，获取本地存储数据。
3. 修改对应数据属性 done 为当前复选框的checked状态。
4.  之后保存数据到本地存储
5. 重新渲染加载数据列表
6. load 加载函数里面，新增一个条件,如果当前数据的done为true 就是已经完成的，就把列表渲染加载到 ul 里面
7. 如果当前数据的done 为false， 则是待办事项，就把列表渲染加载到 ol 里面  

> toDoList 统计正在进行个数和已经完成个数  

1. 在我们load 函数里面操作
2. 声明2个变量 ： todoCount 待办个数 doneCount 已完成个数
3. 当进行遍历本地存储数据的时候， 如果 数据done为 false， 则 todoCount++, 否则 doneCount++
4. 最后修改相应的元素 text()  