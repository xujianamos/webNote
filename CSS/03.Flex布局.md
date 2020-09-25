## 1.Flex 布局是什么？

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

```css
.box{
  display: flex;
}
```

行内元素也可以使用 Flex 布局。

```css
.box{
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上`-webkit`前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

> 注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## 2.基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![image-20200903173146049](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173146049.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## 3.容器的属性

以下6个属性设置在容器上。

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### 3.1 flex-direction属性

`flex-direction`属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

它可能有4个值:

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

![image-20200903173420314](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173420314.png)

### 3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

![image-20200903173548427](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173548427.png)

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。

（1）`nowrap`（默认）：不换行。

![image-20200903173622090](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173622090.png)

（2）`wrap`：换行，第一行在上方。

![image-20200903173648074](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173648074.png)

（3）`wrap-reverse`：换行，第一行在下方。

![image-20200903173723058](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200903173723058.png)

### 3.3 flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### 3.4 justify-content属性

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

> 注意：它可能取6个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

（1）`flex-start`（默认值）：项目对齐主轴起点，项目间不留空隙。

![image-20200904155828701](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904155828701.png)

(2)`center`：项目在主轴上居中排列，项目间不留空隙。主轴上第一个项目离主轴起点距离等于最后一个项目离主轴终点距离。

![image-20200904161241170](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904161241170.png)

(3)`flex-end`：项目对齐主轴终点，项目间不留空隙。

![image-20200904162631345](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904162631345.png)

(4)`space-between`：项目间间距相等，第一个项目离主轴起点和最后一个项目离主轴终点距离为0。

![image-20200904162655360](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904162655360.png)

(5)`space-around`：与space-between相似。不同点为，第一个项目离主轴起点和最后一个项目离主轴终点距离为中间项目间间距的一半。

![image-20200904162708408](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904162708408.png)

(6)`space-evenly`：项目间间距、第一个项目离主轴起点和最后一个项目离主轴终点距离等于项目间间距。

![image-20200904162720304](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904162720304.png)

### 3.5 align-items属性

设置项目在行中的对齐方式。

```css
.container{
  align-items:stretch（默认值） | flex-start | center | flex-end | baseline

}
```

> 注意：它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- stretch（默认值）：如果项目未设置高度或设为auto，项目拉伸至填满行高。
- flex-start：项目顶部与行起点对齐。
- center：项目在行中居中对齐。
- flex-end：项目底部与行终点对齐。
- baseline：项目的第一行文字的基线对齐。

![image-20200904163510649](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904163510649.png)

![image-20200904163539914](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904163539914.png)

### 3.6 align-content属性

`align-content`属性定义了多行排列时，设置行在交叉轴方向上的对齐方式，以及分配行之间及其周围多余的空间。

如果项目只有一根轴线，该属性不起作用。

```css
.container{
  align-content: stretch（默认值） | flex-start | center | flex-end | space-between |space-around | space-evenly

}
```

- `stretch`（默认值）：当未设置项目尺寸，将各行中的项目拉伸至填满交叉轴。当设置了项目尺寸，项目尺寸不变，项目行拉伸至填满交叉轴。

- `flex-start`：首行在交叉轴起点开始排列，行间不留间距。

- `center`：行在交叉轴中点排列，行间不留间距，首行离交叉轴起点和尾行离交叉轴终点距离相等。

- `flex-end`：尾行在交叉轴终点开始排列，行间不留间距。
- `space-between`：行与行间距相等，首行离交叉轴起点和尾行离交叉轴终点距离为0。
- `space-around`：行与行间距相等，首行离交叉轴起点和尾行离交叉轴终点距离为行与行间间距的一半。

- `space-evenly`：行间间距、以及首行离交叉轴起点和尾行离交叉轴终点距离相等。

![image-20200904164125335](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904164125335.png)

![image-20200904164140314](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904164140314.png)

![image-20200904164200819](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904164200819.png)

## 4.项目的属性

设置项目，用于设置项目的尺寸、位置，以及对项目的对齐方式做特殊设置。

以下6个属性设置在项目上。

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### 4.1 order属性

设置项目沿主轴方向上的排列顺序，数值越小，排列越靠前。属性值为整数。默认为0。

```css
.item{
  order: 0（默认值） | <integer>
}
```

![image-20200904165250122](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904165250122.png)

### 4.2 flex-grow属性

当项目在主轴方向上还有剩余空间时，通过设置项目扩张因子进行剩余空间的分配。属性值为项目的扩张因子，属性值取非负数。

```css
.item{
  flex-grow: 0（默认值） | <number>
}
```

示例：

一个宽度为400px的容器，里面的三个项目width分别为80px，120px，140px。分别对这项目1和项目2设置flex-grow值为3和1。

```css
.container{
  display: flex;
  width: 400px; // 容器宽度为400px
}
.item1{
  width: 80px;
  flex-grow: 3;
}
.item2{
  width: 120px;
  flex-grow: 1;
}
.item3{
  /* 项目3未设置flex-grow，默认flex-grow值为0*/
  width: 140px;
}
```

在这个例子中，容器的剩余空间为 400 - (80 + 120 + 140) = 60px。剩余空间按 60 / (3 + 1 + 0) = 15px进行分配：

item1的最终宽度为：80+ (15 * 3) = 125px

item2的最终宽度为：120 + (15 * 1) = 135px

item3的最终宽度为：140 + (15 * 0) =140px

![image-20200904165905416](https://gitee.com/xuxujian/webNoteImg/raw/master/allimg/image-20200904165905416.png)

需要注意一点，当项目的扩张因子相加小于1时，剩余空间按除以1进行分配。在上面例子的基础上，我们改变各个项目的flex-grow。

```css
.container{
  display: flex;
  width: 400px; // 容器宽度为400px
}
.item1{
  width: 50px;
  flex-grow: 0.1;
}
.item2{
  width: 80px;
  flex-grow: 0.3;
}
.item3{
  width: 110px;
  flex-grow: 0.2;
}
```

在这个例子中，容器的剩余空间为 400 - (50 + 80 + 110) = 160px。由于项目的flex-grow相加0.1 + 0.3 + 0.2 = 0.6小于1，剩余空间按 160 / 1 = 160px划分。例子中的项目宽度分别为：

item1的最终宽度为：50 + (160 * 0.1) = 66px

item2的最终宽度为：80 + (160 * 0.3) = 128px

item3的最终宽度为：110 + (160 * 0.2) = 142px

> 注：

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

![image-20200904190853456](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20200904190853456.png)

### 4.3 flex-shrink属性

当项目在主轴方向上溢出时，通过设置项目收缩因子来压缩项目适应容器。属性值为项目的收缩因子，属性值取非负数。

```css
.item {
  flex-shrink: <number>; /* 默认值：1 */
}
```

示例：

一个宽度为400px的容器，里面的三个项目width分别为120px，150px，180px。分别对这项目1和项目2设置`flex-shrink`值为2和3。

```css
.container{
  display: flex;
  width: 400px; /* 容器宽度为400px*/
}
.item1{
  width: 120px;
  flex-shrink: 2;
}
.item2{
  width: 150px;
  flex-shrink: 3;
}
.item3{/* 项目3未设置flex-shrink，默认flex-shrink值为1*/
  width: 180px;
}
```

在这个例子中，项目溢出 400 - (120 + 150 + 180) = -50px。计算压缩量时总权重为各个项目的宽度乘以`flex-shrink`的总和，这个例子压缩总权重为120 * 2 + 150 * 3+ 180 * 1 = 870。各个项目压缩空间大小为总溢出空间乘以项目宽度乘以`flex-shrink`除以总权重：

item1的最终宽度为：120 - 50 * 120 * 2 / 870 ≈ 106px

item2的最终宽度为：150 - 50 * 150 * 3 / 870 ≈ 124px

item3的最终宽度为：180 - 50 * 180 * 1 / 870 ≈ 169px

其中计算时候值如果为小数，则向下取整。

![image-20200904191652435](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20200904191652435.png)

需要注意一点，当项目的压缩因子相加小于1时，参与计算的溢出空间不等于完整的溢出空间。在上面例子的基础上，我们改变各个项目的`flex-shrink`。

```css
.container{
  display: flex;
  width: 400px; /* 容器宽度为400px*/
}
.item1{
  width: 120px;
  flex-shrink: 0.1;
}
.item2{
  width: 150px;
  flex-shrink: 0.2;
}
.item3{
  width: 180px;
  flex-shrink: 0.3;
}
```

总权重为：120 * 0.1 + 150 * 0.2 + 180 * 0.3 = 96。参与计算的溢出空间不再是50px，而是50 * (0.1 + 0.2 + 0.3) / 1 =30：

item1的最终宽度为：120 - 30 * 120 * 0.1 / 96 ≈ 116px

item2的最终宽度为：150 - 30 * 150 * 0.2 / 96 ≈ 140px

item3的最终宽度为：180 - 30 * 180 * 0.3 / 96 ≈ 163px

> 注：如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

### 4.4 flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

当容器设置flex-direction为row或row-reverse时，flex-basis和width同时存在，flex-basis优先级高于width，也就是此时flex-basis代替项目的width属性。

当容器设置flex-direction为column或column-reverse时，flex-basis和height同时存在，flex-basis优先级高于height，也就是此时flex-basis代替项目的height属性。

需要注意的是，当flex-basis和width（或height），其中一个属性值为auto时，非auto的优先级更高。

![image-20200905000559246](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20200905000559246.png)

### 4.5 flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 4.6 align-self属性

设置项目在行中交叉轴方向上的对齐方式，用于覆盖容器的align-items，这么做可以对项目的对齐方式做特殊处理。默认属性值为auto，继承容器的align-items值，当容器没有设置align-items时，属性值为stretch。

```css
.item{
  align-self: auto（默认值） | flex-start | center | flex-end | baseline |stretch
}
```

![image-20200905000954542](https://gitee.com/xuxujian/webNoteImg/raw/master/webpack/image-20200905000954542.png)

> 注：该属性可能取6个值，除了auto，其他都与align-items属性完全一致。