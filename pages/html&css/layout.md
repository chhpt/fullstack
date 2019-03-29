# CSS 布局

网页布局是我们经常需要处理的问题，掌握基本的 CSS 布局是每个前端工程师的必备技能。

## position 和 display

* position

  * static（默认值）：元素框正常生成。
  * relative：元素框偏移某个距离。
  * absolute：元素框从文档流完全删除，并相对于其包含块定位。包含块为最近的 `position` 值不是 `static` 的祖先元素。
  * fixed：表现类似于 `absolute` ，不过包含块是视窗本身。
  * inherit

* display 指定了元素的展示行为

  * none：元素被移除，不显示。
  * inline：元素显示为内联元素，高度和宽度不起作用。
  * inline-block：元素显示为内联-块级元素，表现为内联元素，但是高度和宽度有作用。
  * list-item：表现与 li 类似。
  * table：
  * table-cell
  * inline-table

### `display`

`display` 是 CSS 中最重要的用于控制布局的属性。每个元素都有一个默认的 `display` 值，这与元素的类型有关。对于大多数元素它们的默认值通常是 `block` 或 `inline`。一个 `block` 元素通常被叫做块级元素。一个 `inline` 元素通常被叫做行内元素。

* `block`：一个块级元素会新开始一行并且尽可能撑满容器。`div` 是一个标准的块级元素。其他常用的块级元素包括 `p`、`form` 和 HTML5 中的新元素：`header`、`footer`、`section` 等等。
* `inline`：一个行内元素可以在段落中 `<span>像这样</span>` 包裹一些文字而不会打乱段落的布局。`a` 元素是最常用的行内元素，它可以被用作链接。
* `inline-block`：`inline-block` 的元素在元素外表现的像行内元素，其盒模型的宽度为元素的实际宽度，而在元素内部表现为一个块级元素，可以设置宽高。
* `table` 类：与表格 `table` 相关的。
* `flexbox`：弹性布局，[参考](http://www.html5rocks.com/zh/tutorials/flexbox/quick/)
* `none`：通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。它和 `visibility` 属性不一样。把 `display` 设置成 `none` 不会保留元素本该显示的空间，但是 `visibility: hidden` 还会保留。

## CSS 布局

* display 属性
* margin: auto;
* max-width
* 盒模型
* box-sizing
* position
* float
* clear
* 清除浮动（clearfix hack）
* 百分比宽度
* 媒体查询
* inline-block 布局
* column
* flexbox
* css 框架

### 扩展

[学习 css 布局](http://zh.learnlayout.com/)

## 清除浮动

浮动最初设计只是用来实现文字环绕排版的。浮动的三个特点：

* 脱离文档流。
* 向左/向右浮动直到遇到父元素或者别的浮动元素。
* 浮动会导致父元素高度坍塌，与相邻非浮动元素重叠。

解决方式就是清除浮动，常规的方法是 clear: both 或 overflow: auto 触发 BFC（块状格式化上下文），推荐 clearfix 的方式：

```css
/* 引入了*zoom以针对性支持IE6/7
同时加入:before以解决现代浏览器上边距折叠的问题
*/
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}

.clearfix:after {
    clear: both;
}

.clearfix{
    *zoom: 1;
}
```

## 如何保持浮层水平居中

### 设置父元素浮动，并左移 50%，同时设置子元素右移 50%。

```css
/* 父元素 */
.parent {
  position: relative;
  left: 50%;
  float: left;
}

/* 浮动元素 */
.float {
  position: relative;
  float: left;
  right: 50%;
}
```

### 使用 transform

```css
.float {
  position: absolute;
  float: left;
  top: 50%;
  right: 50%;
  width: 100px;
  transform: translate(50%, 50%);
  background: #ccc;
}
```

### 水平垂直居中

```css
/* 父元素 */
.outer {
  position: absolute;
  left: 50%;
  top: 50%;
}

/* 浮动元素 */
.inner {
  position: relative;
  right: 50%;
  margin-top: -50%;
  float: left;
}
```

### 参考

* [六种实现元素水平居中](https://www.w3cplus.com/css/elements-horizontally-center-with-css.html)

## 页面布局的方式有哪些

### 双飞翼布局

经典三列布局，也叫做圣杯布局(Holy Grail of Layouts),是 Kevin Cornell 在 2006 年提出的一个布局模型概念，在国内最早是由淘宝 UED 的工程师传播开来，在中国也有叫法是双飞翼布局，它的布局要求有几点：
a、三列布局，中间宽度自适应，两边定宽；
b、中间栏要在浏览器中优先展示渲染；
c、允许任意列的高度最高；
d、使用的 HTML 标记尽量少；
e、用最简单的 CSS、最少的 HACK 语句。

### 多栏布局

a、栅格系统：就是利用浮动实现的多栏布局，在 bootstrap 中用的非常多。
b、多列布局：栅格系统并没有真正实现分栏效果（如 word 中的分栏），CSS3 为了满足这个要求增加了多列布局模块。

### 弹性布局（Flexbox）

综合而言，Flexbox 布局功能主要有：
a、屏幕和浏览器窗口大小发生改变也可以灵活调整布局；
b、可以指定伸缩项目沿着主轴或侧轴按比例分配额外空间（伸缩容器额外空间），从而调整伸缩项目的大小；
c、可以控制元素在页面上的布局方向；
d、可以按照不同于文档对象模型（DOM）所指定排序方式对屏幕上的元素重新排序。也就是说可以在浏览器渲染中不按照文档流先后顺序重排伸缩项目顺序。

![example](http://upload-images.jianshu.io/upload_images/3185709-483dcd42b55fa010.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```html
<!DOCTYPE html>
<header>...</header>
<main>
   <article>...</article>
   <nav>...</nav>
   <aside>...</aside>
</main>
<footer>...</footer>
This layout can be easily achieved with flex layout:
main { display: flex; }
main > article { order: 2; min-width: 12em; flex:1; }
main > nav     { order: 1; width: 200px; }
main > aside   { order: 3; width: 200px; }
And the main content will be as wide as necessary to fill the screen. Additionally, this can then be combined with media queries to switch to an all-vertical layout on narrow screens:
@media all and (max-width: 600px) {
  /* Too narrow to support three columns */
  main { flex-flow: column; }
  main > article, main > nav, main > aside {
    /* Return them to document order */
    order: 0; width: auto;
  }
}
```

### 瀑布流布局

流式布局的一种，是当下比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。最早采用此布局的网站是 Pinterest，逐渐在国内流行开来。优点：
a、有效降低了界面复杂度，节省空间：我们不再需要臃肿复杂的页码导航了。
b、对触屏设备来说，交互方式更符合直觉：在移动应用的交互环境当中，通过向上滑动进行滚屏的操作已经成为最基本的用户习惯，而且所需要的操作精准程度远远低于点击链接或按钮。
c、更高的参与度：以上两点所带来的交互便捷性可以使用户将注意力更多的集中在内容而不是操作上，从而让他们更乐于沉浸在探索与浏览当中。局限性：
a、有限的用例：无限滚动的方式只适用于一部分特定类型的内容。
b、额外的复杂度：那些用来打造无限滚动的 JS 库虽然都自称很容易使用，但你总会需要在自己的产品中进行不同程度的定制化处理，以满足你们自己的需求；另外这些 JS 库在浏览器和设备兼容性等方面的表现也参差不齐，你必须做好充分的测试与调整工作。
c、再见了，页脚：最好考虑一下页脚对于你的网站，特别是用户的重要性；如果其中确实有比较重要的内容或链接，那么最好换一种更传统和稳妥的方式。
d、集中在一页当中动态加载数据，与一页一页的输出相比，究竟那种方式更利于 SEO，这是你必须考虑的问题。
e、关于页面数量的印象：如果对于你的网站来说，通过更多的内容页面展示更多的相关信息(如广告)是很重要的策略，那么单页无限滚动的方式对你并不适用。

### 流式布局（Fluid）

固定布局和流式布局在网页设计中最常用的两种布局方式。固定布局能呈现网页的原始设计效果，流式布局则不受窗口宽度影响，流式布局使用百分比宽度来限定布局元素，这样可以根据客户端分辨率的大小来进行合理的显示。

### 响应式布局

在 2010 年 5 月提出的一个概念。简而言之，就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。这个概念是为解决移动端浏览而诞生的。优点：面对不同分辨率设备灵活性强，能够快捷解决多设备显示适应问题。缺点：这是一种折中性质的设计解决方案，受多方面因素影响而达不到最佳效果。
a、兼容各种设备工作量大，效率低下
b、代码累赘，需隐藏无用的元素，加载时间加长
c、一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

## Flex 布局

布局的传统解决方案，基于盒状模型，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

2009 年，W3C 提出了一种新的方案 ----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持（IE 10+），这意味着，现在就能很安全地使用这项功能。

### 什么是 Flex 布局

Flex 是 Flexible Box 的缩写，意为 "弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局：

```css
.box {display: flex;}
```

行内元素也可以使用 Flex 布局：

```css
.box {
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上 - webkit 前缀。

```css
.box {
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为 Flex 布局以后，子元素的 `float`、 `clear` 和 `vertical-align` 属性将失效。

### 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称 "容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称 "项目"。

![pic](./pics/flex.png)

容器中存在两条轴：水平主轴（main axis）和垂直交叉轴（cross axis）。这是默认的设置，你可以通过修改属性使垂直方向变为主轴，水平方向变为交叉轴。

主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

### Flex 容器属性

Flex 容器包含一些属性，你可以设置这些属性来指定 Flex 项目的排列：

* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

#### 1. flex-direction

flex-direction 属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

* 默认值：row，主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

![pic](./pics/flex-direction.png)

#### 2. flex-wrap

默认情况下，项目都排在轴线上，flex-wrap 属性定义了当一条轴线无法容纳所有元素时如何换行：

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* 默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。
* wrap：项目主轴总尺寸超出容器时换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。

nowrap

![pic](./pics/flex-wrap-1.png)

wrap

![pic](./pics/flex-wrap-2.jpg)

wrap-reverse

![pic](./pics/flex-wrap-3.jpg)

#### 3. flex-flow

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 `row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

#### 4. justify-content

justify-content 属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

* flex-start（默认值）：左对齐
* flex-end：右对齐 fle
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![pic](./pics/justify-content.png)

#### 5. align-items

align-items 属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

* stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。
* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。

![pic](./pics/align-items.png)

#### 6. align-content

align-content 属性定义了多根轴线的对齐方式，即当设置 flex-wrap 属性为 wrap 或 wrap-reverse 时，项目会有换行的可能性，就会出现多条轴线，这时需要指定多条轴线之间的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch;
}
```

* flex-start：与交叉轴的起点对齐。
* flex-end：与交叉轴的终点对齐。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：轴线占满整个交叉轴。

![pic](./pics/align-content.png)

### Flex 项目属性

Flex 项目也拥有一些和布局相关的属性：

* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

#### 1. order

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

```css
.item {
  order: <integer>;
}
```

![pic](./pics/order.jpg)

#### 2. flex-grow

flex-grow 属性定义了项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![pic](./pics/flex-grow.png)

#### 3. flex-shrink

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

```css
item {
  flex-shrink: <number>; /* default 1 */
}
```

![pic](./pics/flex-shrink.jpg)

#### 4. flex-basis

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

它可以设为跟 width 或 height 属性一样的值（比如 350px），则项目将占据固定空间。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

#### 5. flex

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### 6. algin-self

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![pic](./pics/align-self.png)

### 参考

* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
* [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
* [30 分钟学会 Flex 布局](https://zhuanlan.zhihu.com/p/25303493)
* [CSS 布局方案](https://juejin.im/post/5bd805e6f265da0acd2107d7)