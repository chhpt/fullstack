---
id: performance
title: 性能
---

# 一、测试工具

## 性能分析

JavaScript 计算，特别是会触发大量视觉变化的计算会降低应用性能。 不要让时机不当或长时间运行的 JavaScript 影响用户交互。分析脚本运行期间执行的各种函数和操作，找出需要优化的部分。

### 1. JavaScript

测试脚本或函数的执行时间是一种比较常用的手段，可以简单，清楚的看出耗时的执行文件。

**测试方法**

> 使用 JavaScript Date 对象

Date 对象可以返回当前时间，用一个 Date 实例减去另一个 Date 实例就可以简单的获取脚本或函数执行时间。

```js
var start = new Date();
var end = new Date();
var time = end - start;
```

> 在 Chrome 中使用 `console.time()` 和 `console.timeEnd()` 方法

```js
console.time(label)
function...
console.timeEnd(label)
// 输出 label：time
```

> 使用 [`window.performance.now()`](http://www.alloyteam.com/2015/09/explore-performance/) 方法

window.performance

> 使用 Chrome 的 Performance 调试工具

进行 Timeline 记录，并找出疑似较长的 Evaluate Script 事件。 如果您发现存在任何这样的事件，可以启用 JS 分析器并重新做记录，以便获取究竟调用了哪些 JS 函数以及调用每个函数需要多长时间的更详细信息。

如果您注意到 JavaScript 中出现较多的卡顿现象，您可能需要进一步分析并收集 JavaScript CPU 配置文件。CPU 配置文件会显示执行时间花费在页面的哪些函数上。在加快 JavaScript 执行速度中了解如何创建 CPU 配置文件。

### 2. 样式与布局

样式更改开销较大，在这些更改会影响 DOM 中的多个元素时更是如此。 只要您将样式应用到元素，浏览器就必须确定对所有相关元素的影响、重新计算布局并重新绘制。

布局（或 Firefox 中的自动重排）是浏览器用来计算页面上所有元素的位置和大小的过程。 网页的布局模式意味着一个元素可能影响其他元素；例如 `<body>` 元素的宽度一般会影响其子元素的宽度以及树中各处的节点，等等。这个过程对于浏览器来说可能很复杂。 一般的经验法则是，如果在帧完成前从 DOM 请求返回几何值，您将发现会出现“强制同步布局”，在频繁地重复或针对较大的 DOM 树执行操作时这会成为性能的大瓶颈。

**测试方法**

> 使用 Chrome 的 Performance 工具

进行 Timeline 记录。检查大型 Recalculate Style 事件的记录（以紫色显示）。

点击 Recalculate Style 事件可以在 Details 窗格中查看更多相关信息。 如果样式更改需要较长时间，对性能的影响会非常大。 如果样式计算会影响大量元素，则需要改进另一个方面。

Chrome DevTools 的 Timeline 可以确定页面何时会导致强制同步布局。

### 3. 绘制与合成

绘制是填充像素的过程。这经常是渲染流程开销最大的部分。 如果您在任何情况下注意到页面出现卡顿现象，很有可能存在绘制问题。

合成是将页面的已绘制部分放在一起以在屏幕上显示的过程。 大多数情况下，如果坚持仅合成器属性并避免一起绘制，您会看到性能会有极大的改进，但是您需要留意过多的层计数。

**测试方法**

> 使用 Chrome 的 Performance 工具
> Paint 时间在火焰图中显示为绿色。如果您的大部分渲染时间花费在绘制上，即表示存在绘制问题。

## 网络分析

检查图片，样式和脚本的加载过程，以及他们对页面整体加载和渲染的影响。

在分析调整代码之前，应该先确认所有的脚本和其他资源文件的加载都已经被优化。

### 1. 使用 Chrome DevTools 的 Network 面板

在网络面板中可以看到网络请求资源的实时信息。明确和定位那些比预期更加耗时的请求是优化 web 页面的关键步骤。

![介绍图片](http://markdown-1252710547.coscd.myqcloud.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-08-27%20%E4%B8%8B%E5%8D%8816.07.38%20%E4%B8%8B%E5%8D%88.png)

### 2. 使用 Firefox 的网络面板

![介绍图片](http://markdown-1252710547.coscd.myqcloud.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-08-27%20%E4%B8%8B%E5%8D%8816.09.55%20%E4%B8%8B%E5%8D%88.png)

### 3. 综合分析

借助专业的网页性能分析工具进行分析

#### 使用 PageSpeed Insights。

Page Speed Insights 能针对移动设备和桌面设备衡量网页的性能。该工具会抓取网址两次，一次是通过移动设备用户代理，另一次是通过桌面设备用户代理。PageSpeed 得分范围是从 0 到 100 分。分数越高，代表性能越好。85 分或更高分表明网页性能良好。

PageSpeed Insights 能根据以下内容衡量网页如何提升其性能：

- 首屏加载时间：从用户请求新页面到浏览器呈现首屏内容所用的时间。
- 完整的网页加载时间：从用户请求新网页到浏览器完全呈现网页所用的时间。

然而，由于网络连接性能有很大差异，因此，PageSpeed Insights 只考虑网页性能中与网络无关的方面：服务器配置、网页的 HTML 结构及其所用的外部资源（例如，图片、JavaScript 和 CSS）。实施这些建议应该能改进网页的相对性能。但网页的绝对性能将仍取决于用户的网络连接。

系统会使用优先级指示器对每个建议进行评分，以表明其重要性。

![](http://markdown-1252710547.coscd.myqcloud.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-08-27%20%E4%B8%8B%E5%8D%8815.52.16%20%E4%B8%8B%E5%8D%88.png)

# 二、脚本加载与执行

Javascript 是单线程的，浏览器在执行 JavaScript 代码的时候不能同时做其他任何事情。多数浏览器在使用单一进程来处理用户界面的刷新和 Javascript 的脚本执行，所以同一时刻只能做一件事，这意味着，JavaScript 执行时间越久，浏览器等待响应的时间就越久。

简单来说，在页面中每次出现 `script` 标签的时候，浏览器都需要去执行这些代码，页面也就会处于暂停状况。因为浏览器无法预知 JavaScript 是否会修改页面中的内容。因此，浏览器停下来，运行此 JavaScript 代码，然后再继续解析、翻译页面。在使用 src 属性加载 JavaScript 的过程中也会发生同样的事情：浏览器必须首先下载外部文件的代码，这要占用一些时间，然后解析并运行此代码。此过程中，页面解析和用户交互是被完全阻塞的。

## 脚本的位置

HTML 4 规范指出，一个 `script` 标签可以放在 HTML 文档的 `<head>` 或 `<body>` 中，可以在其中多次出现。一般情况下，`<script>` 标签用于加载外部的 JavaScript 文件。`<head>` 部分除此类代码外，还包含 `<link>` 用于加载外部的 CSS 文件和其他页面元信息。理论上来说，把行为和样式有关的文件放在一起，首先加载他们，有助于确保页面渲染和交互的正确性。

例如下面这样：

```html
<html>
  <head>
    <title>Script Example</title>
    <script type="text/javascript" src="file1.js"></script>
    <script type="text/javascript" src="file2.js"></script>
    <script type="text/javascript" src="file3.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>

  <body>
    <p>Hello world!</p>
  </body>
</html>
```

然而，这却又比较严重的性能问题，在 `<head>` 中的三个 JavaScript 脚本被加载和执行完成之前，页面不会被加载和渲染，会造成长时间的白屏，这很影响用户体验。把脚本放在页面顶部将会导致明显的延迟，用户无法预览内容，也无法与页面交互。

Internet Explorer 8, Firefox 3.5, Safari 4 和 Chrome 2 都允许并行下载 JavaScript 文件。单是 JavaScript 下载过程任然会阻塞其他资源的下载，例如图片。因为脚本阻塞其他页面资源的下载过程，所以推荐的办法是：将所有 `<script>` 标签放在标签底部的位置，尽量减少对整个页面下载的影响。

## 组织脚本

由于每个 `<script>` 标签下载时阻塞页面解析过程，所以限制页面的
`<script>` 标签总数也可以改善性能。这个规则对内联脚本和外部脚本同样适用。每当页面解析碰到一个 `<script>` 标签时，紧接着有一段时间用于代码执 行。最小化这些延迟时间可以改善页面的整体性能。

每个 HTTP 请求都会产生额外的性能负担，下载一个 100KB 的文件比下载四个 25KB 的文件要快。也就是说，减少引用外部脚本文件的数量会改善网页的性能。一般情况下，一个大型网站或网页应用需要多次请求 JavaScript 文件，可以将这些文件整合成一个文件，只需要一个 `<script>` 标签引用，就可以减少性能损失。

## 无阻塞的脚本

一个应用程序所包含的功能越多，所需要的 JavaScript 代码就越大，保持源码短小并不总是一种选择。尽管下载一个大 JavaScript 文件只产生一次 HTTP 请求，却会锁定浏览器一大段时间。为避开这种情况，需要向页面中逐步添加 JavaScript，某种程度上说不会阻塞浏览器。

非阻塞脚本的秘密在于，等页面完成加载之后，再加载 JavaScript 源码。从技术角度讲，这意味着在 window 的 load 事件发出之后开始下载代码。有几种方法可以实现这种效果。

### 1. 延迟脚本

**defer**

HTML 4 为 `<script>` 标签定义了一个扩展属性：defer。这个 defer 属性指明元素中所包含的脚本不打算修 改 DOM，因此代码可以稍后执行。

一个带有 defer 属性的 `<script>` 标签可以放置在文档的任何位置。对应的 JavaScript 文件将在 `<script>` 被解析时启动下载，但代码不会被执行，直到 DOM 加载完成（在 onload 事件句柄被调用之前）。当一个 defer 的 JavaScript 文件被下载时，它不会阻塞浏览器的其他处理过程，所以这些文件可以与页面的其他资源一起并行下载。

```html
<script type="text/javascript" src="file1.js" defer></script>
```

**async**

async 属性规定一旦脚本可用，则会异步执行，加载和渲染后续文档元素的过程将和 `script` 的加载与执行并行进行（异步）。

指定 `async` 属性的目的是不让页面等待此脚本的下载和执行，从而异步加载页面其他内容，建议不要在加载期间修改 DOM。标记为 async 的脚本并不保证按照指定它们的先后顺序执行，有多个异步脚本时确保两者之间互不依赖。

async 属性仅适用于外部脚本（只有在使用 src 属性时）。

```html
<script type="text/javascript" src="file.js" async></script>
```

### 2. 动态脚本元素

利用 JavaScript 创建 `<script>` 标签，并利用新创建的 `<script>` 标签加载脚本。此文件当元素添加到页面之后立刻开始下载。此技术的重点在于： 无论在何处启动下载，文件的下载和运行都不会阻塞其他页面处理过程，你甚至可以将这些代码放在 `<head>` 部分而不会对其余部分的页面代码造成影响。

当文件使用动态脚本节点下载时，返回的代码通常立即执行。

Firefox, Opera, Chrome 和 Safari 3 + 会在 `<script>` 节点接收完成之后发出一个 load 事件。你可以监听这一事件，以得到脚本准备好的通知：

```js
var script = document.createElement("script");
script.type = "text/javascript";
//Firefox, Opera, Chrome, Safari 3+
script.onload = function () {
  alert("Script loaded!");
};
script.src = "file1.js";
document.getElementsByTagName("head")[0].appendChild(script);
```

IE 支持另一种实现方式，它发出一个 readystatechange 事件。`<script>` 元素有一个 readyState 属性，它的值随着下载外部文件的过程而改变。

```js
var script = document.createElement("script");
script.type = "text/javascript";
//Internet Explorer
script.onreadystatechange = function () {
  if (script.readyState == "loaded" || script.readyState == "complete") {
    script.onreadystatechange = null;

    alert("Script loaded.");
  }
};
script.src = "file1.js";
document.getElementsByTagName("head")[0].appendChild(script);
```

### 3. XMLHTTPRequest 脚本注入

另一个以非阻塞方式获得脚本的方法是使用 XMLHttpRequest(XHR) 对象将脚本注入到页面中。首先创建一个 XHR 对象，然后利用他下载 JavaScript 文件，接着创建一个动态 `<script>` 标签将 JavaScript 代码注入页面。

```js
var xhr = new XMLHttpRequest();
xhr.open("get", "file1.js", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.text = xhr.responseText;
      document.body.appendChild(script);
    }
  }
};
xhr.send(null);
```

### 4. webpack 按需加载

当使用 `webpack` 构建网页应用时， 会将所有的代码都打包进一个或几个文件中，加载的时候，把所有文件都加载进来，然后执行。当应用变得比较复杂时，打包出来的文件就会变得很庞大，影响加载速度，而我们又不需要一次性全部加载进行，只需要加载会用的文件即可。这种按需要加载文件的做法就是我们所说的 `按需加载` 或者 `懒加载`。

**使用 webpack 懒加载**

```js
require.ensure(dependencies, callback, chunkName);
```

这个方法可以实现 JS 的按需加载，分开打包。

# 三、DOM 渲染

JavaScript 如今已经很快了，真正慢的是 DOM。

文本对象模型是一个独立于语言的，用于操作 XML 和 HTML 文档的 API。浏览器通常会把 DOM 和 JavaScript 独立实现，这个分离允许其他技术和语言，能够共享使用 DOM 和 JavaScript。

DOM 对外提供了 API，而 JavaScript 可以调用这些 API，它们两者就像是使用一座桥梁相连，每次过桥都要被收取大量费用，访问 DOM 的次数越多，费用也就越高。

## 访问与修改

正如前面所讨论的，访问一个 DOM 元素的代价就是交一次“过桥费”。修改元素的代价可能更大，因为它会导致浏览器重新计算页面的几何变化。当然，最坏的情况是在循环中访问或修改元素，尤其是对 HTML 元素集合（包含 DOM 节点引用的类数组对象）进行循环操作。

为了更加深刻的理解 DOM 操作的性能，我们来看下面两个例子，分别在 Chrome，Safari，Firefox 中的运行 2000 次所花费的时间。

**例 1**

```js
function innerHTML() {
  for (let count = 0; count < 2000; count++) {
    document.getElementById("area").innerHTML += "a";
  }
}
```

**例 2**

```js
function innerHTML() {
  let content = "";
  for (let count = 0; count < 2000; count++) {
    content += "a";
  }
  document.getElementById("area").innerHTML = content;
}
```

**运行时间对比**

![](http://markdown-1252710547.coscd.myqcloud.com/%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%AF%94%E8%BE%83.png)

可以看到，两段代码最后的结果是一致的，但是例 1 的运行时间在 20~30 ms 左右，而例 2 的运行时间 只有 0.1~0.2 ms 左右，差距还是很明显的。由此可见， 访问 DOM 的次数越多，代码运行速度越慢。因此，要减少 DOM 操作的次数，尽量用 JavaScript 解决运算问题。

## HTML 集合

HTML 集合是用于存放 DOM 节点引用的类数组对象。以下方法的返回值就是一个集合：

- document.getElementsByName()
- document.getElementsByClassName()
- document.getElementsByTagName()

下列属性也属于 HTML 集合：

- document.images 页面中所有的 `<img>` 元素
- document.links 所有的 `<a>` 元素
- document.forms 所有表单

这些方法和属性返回 HTMLCollection 对象，是一种类似数组的列表。它们不是数组（因为它们没有诸 如 push()或 slice()之类的方法），但是提供了一个 length 属性，和数组一样你可以使用索引访问列表中的元素。

需要注意的是，HTML 集合是以一种 “假定实时态” 存在，这意味着当底层文档更新时，它们将自动更新。事实上，HTML 集合一直与文档保持联系，当你需要最新的信息时，都会重复执行查询操作，哪怕只是读取集合中元素的数目（也就是集合的 length），这正是低效率的来源。

看下面的例子，分别为不缓存 HTML 集合 `length` 和缓存 HTML 集合 `length` 的 10000 次查找时间对比。

**例 1**

```js
function htmlCollection() {
  let collection = document.getElementsByClassName("area");
  for (let count = 0; count < 10000; count++) {
    for (let i = 0; i < collection.length; i++) {}
  }
}
```

**例 2**

```js
function htmlCollection() {
  let collection = document.getElementsByTagName("div");
  let length = collection.length;
  for (let count = 0; count < 10000; count++) {
    for (let i = 0; i < length; i++) {}
  }
}
```

**运行时间比较**

![](http://markdown-1252710547.coscd.myqcloud.com/%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%AF%94%E8%BE%832.png)

可以看出，直接在循环中读取 HTML 集合的 `length` 会花费更多的时间，缓存 HTML 集合的 `length` 是一种更好的做法。

这里未对 HTML 集合进行操作，若是对 HTML 集合做大量的操作，可以先集合拷贝到数组中，那么访问它的属性会更快。看下面两个例子的运行时间对比，例 1 为未采用任何优化的 HTML 集合操作，例 2 缓存了 HTML 集合的 `length` 并将集合拷贝到数组中。

**例 1**

```js
function htmlCollection() {
  let collection = document.getElementsByClassName("area");
  for (let count = 0; count < 1000; count++) {
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML = "测试";
    }
  }
}
```

**例 2**

```js
function htmlCollection() {
  let collection = document.getElementsByClassName("area");
  let length = collection.length;
  let collectionArray = [];
  for (let i = 0; i < length; i++) {
    collectionArray[i] = collection[i];
  }
  for (let count = 0; count < 1000; count++) {
    for (let i = 0; i < collection.length; i++) {
      collectionArray[i].innerHTML = "测试";
    }
  }
}
```

![](http://markdown-1252710547.coscd.myqcloud.com/%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%AF%94%E8%BE%833.png)

可以看出不同的浏览器中所花费的事件均有减少，当对 HTML 集合做更多操作时，这种优势将会变得更明显。

## 获取 DOM 元素

识别 DOM 中的元素时，开发者经常需要更精细的控制，而不仅是 `getElementById()` 和 `getElementsByTagName()` 之类的函数。有时你结合这些函数调用并迭代操作它们返回的节点，以获取所需要的元素，这一精细的过程可能造成效率低下。

另一方面，使用 CSS 选择器是一个便捷的确定节点的方法，因为开发者已经对 CSS 很熟悉了。许多 JavaScript 库为此提供了 API，而且最新的浏览器提供了一个名为 `querySelector()` 的原生浏览器 DOM 函数，可以方便快速的查找元素（性能无明显提升，在此不做对比）。

## 重绘与重排

当浏览器下载完所有页面 HTML 标记，JavaScript，CSS，图片之后，它解析文件并创建两个内部数据结构：

- DOM 树 表示页面结构
- 渲染树 表示 DOM 节点如何显示

一旦 DOM 树和渲染树构造完毕，浏览器就可以显示（绘制）页面上的元素了。当 DOM 的改变影响到元素的几何属性（宽和高）时，浏览器需要重新计算元素的几何属性，而且其他元素的几何属性和位置也会因此改变受到影响。浏览器会使渲染树上受到影响的部分失效，然后重构渲染树，这个过程被称作 `重排`。重排完成后，浏览器会重新绘制受影响的部分到屏幕上，这个过程称为 `重绘`。

不是所有的 DOM 改变都会触发重排，比如背景色的变化就只会触发一次重绘，因为布局并没有改变。重绘和重排版是负担很重的操作，可能导致网页应用的用户界面失去相应。所以，十分有必要尽可能减少这类事情的发生。

### 1. 重排何时发生

- 添加或者删除可见元素
- 元素位置改变
- 元素尺寸改变
- 内容改变
- 页面渲染初始化
- 浏览器尺寸变化

### 2. 渲染树变化的排队和刷新

由于每次重排都会产生计算消耗，所以浏览器会通过队列来批量执行重排过程。然而在读取元素的 `offset*`，`scroll*`，`client*` 等属性的时候，由于要获取到当前准确的信息，这个时候浏览器会强制进行重排以返回正确值，在修改样式的时候最好减少甚至不使用以上属性。

### 3. 最小化重绘与重排

- 批量修改样式

> 使用 el.style.cssText 批量修改样式

- 批量修改 DOM

> 当你需要对 DOM 元素进行多次修改时，你可以通过以下步骤减少重绘和重排版的次数：

- 从文档流中移除该元素
- 对其应用多重改变
- 将元素带回文档中

> <br/>
> 有三种基本方法可以将 DOM 从文档中移除：

- 隐藏元素，进行修改，然后再显示它。
- 使用一个文档片断在已存 DOM 之外创建一个子树，然后将它拷贝到文档中。
- 将原始元素拷贝到一个脱离文档的节点中，修改副本，然后覆盖原始元素。

> <br/>
> **文档片断**

> 文档片断是一个轻量级的 document 对象，它被设计专用于更新、移动节点之类的任务。文档片断的一个便利的语法特性是当你向节点附加一个片断时，实际添加的是文档片断的子节点，而不是片断本身。

```js
var fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
document.getElementById("myList").appendChild(fragment);
```

- 缓存布局信息

> 当需要对布局进行操作时，如移动一个元素的位置，先获取元素的布局信息，把他赋值给一个变量，然后再操作变量。

- 让元素脱离动画流

> 显示和隐藏部分页面构成展开/折叠动画是一种常见的交互模式。它通常包括区域扩大的几何动画，将页面其他部分推向下方。可能会引发巨大的重排版动作，使用户感到动画卡顿。使用绝对坐标定位页面动画的元素，使它位于页面布局流之外，可以避免大规模重排。

## 事件委托

当页面中存在大量元素，而且每个元素有一个或多个绑定事件（例如列表的 `onclick` 事件，链接等）时，可能会影响性能。绑定事件占用了处理时间，另外，浏览器需要跟踪每个事件处理器，占用更多内存。当这些工作结束时，这些事件句柄中的相当一部分根本不需要（不是每个列表或者链接都会被点击）。

一个简单的解决办法就是 `事件托管`。它基于这样一个原理：事件逐层冒泡总能被父元素捕获。可以捕获父元素的事件，然后定位事件来源，就可以处理子元素发生的所有事件。

```js
document.querySelector("ul").addEventListener(
  "onclick",
  function (e) {
    let list = e.target;
    // 对列表进行处理
  },
  false
);
```

# 四、JavaScript 编程

## 循环

在大多数编程语言中，代码执行时间多数在循环中度过。循环是最常用的编程模式之一，也是提高性能必须关注的要点之一。

ECMA-263 标准第三版规定了 JavaScript 的基本语法和行为，定义了四种类型的循环。

- 标准的 for 循环
- while 循环
- do-while 循环
- for-in 循环

在 JavaScript 提供的四种循环类型中，只有一种循环比其他 循环明显要慢：`for-in 循环`。由于每次迭代操作要搜索实例或原形的属性，for-in 循环每次迭代都要付出更多开销，所以比其他类型循环慢一些。除非你需要对数目不详的对象属性进行操作，否则避免使用 for-in 循环。

对比以下代码，分别用普通的 for 循环和 for-in 循环迭代并修改一个有 10 个元素的数组，迭代 100000 次。

**例 1**

```js
function loopArray() {
  for (let count = 0; count < 100000; count++) {
    let testArray = [
      "0.02",
      "0.49",
      "0.63",
      "0.53",
      "0.56",
      "0.19",
      "0.62",
      "0.82",
      "0.28",
      "0.78",
    ];
    for (let item in testArray) {
      testArray[item] = "1";
    }
  }
}
```

**例 2**

```js
  function loopArray () {
    for (let count = 0; count < 100000; count++) {
      let testArray = ["0.02", "0.49", "0.63", "0.53", "0.56", "0.19", "0.62", "0.82", "0.28", "0.78"]
      let length = testArray.length
      for (let i = 0; i < length; i++) {
        testArray[i] = '1'
      }
  }
```

**运行时间比较**

![](http://markdown-1252710547.coscd.myqcloud.com/%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%AF%94%E8%BE%834.png)

### 循环优化

除了上面说的减少使用 `for-in` 循环之外，还有很多其他方法可以优化循环的性能：

- 减少迭代的工作量。显然，如果一次循环迭代需要较长时间来执行，那么多次循环将需要更长时间。限制在循环体内耗时操作的数量是一个加快循环的好方法。

  > 1. 减少对象成员和数组项查找的次数。在大多数浏览器上， 这些操作比访问局部变量或直接量需要更长时间。
  > 2. 缓存迭代对象的长度。每次迭代都查询迭代对象的长度无疑是一件浪费时间的操作，可以简单地将长度存入一个局部变量中，在控制条件中使用这个局部变量，从而提高了循环性能。

- 减少迭代次数。即使循环体中执行最快的代码，累计迭代上千次也会慢下来。减少循环的迭代次数可获得显著的性能提升。
- 查表法。

  > 当有大量离散值需要测试时，`if-else` 和 `switch` 都比使用查表法要慢得多。在 JavaScript 中查表法可使用数组或者普通对象实现，查表法访问数据比 `if-else` 或者 `switch` 更快，特别当条件体的数目很大时。
  > <br />
  > 当使用查表法时，必须完全消除所有条件判断。操作转换成一个数组项查询或者一个对象成员查询。

```js
switch(value){
  case 0: return result0;
  case 1: return result1;
...
}
```

```js
let results = [result0, result1, ...]
return results[value];
```

看下面的例子，缓存迭代对象的长度与不缓存的 100000 迭代时间对比。从对比图中可以看出，不同的浏览器的运行时间均有一定程度的缩减。

**例 1**

```js
// 缓存迭代对象 length
function loopTest() {
  for (let count = 0; count < 100000; count++) {
    let testArray = [
      "0.02",
      "0.49",
      "0.63",
      "0.53",
      "0.56",
      "0.19",
      "0.62",
      "0.82",
      "0.28",
      "0.78",
    ];
    for (let i = 0; i < testArray.length; i++) {
      testArray[i] = "1";
    }
  }
}
```

**例 2**

```js
// 缓存迭代对象 length
function loopTest() {
  for (let count = 0; count < 100000; count++) {
    let testArray = [
      "0.02",
      "0.49",
      "0.63",
      "0.53",
      "0.56",
      "0.19",
      "0.62",
      "0.82",
      "0.28",
      "0.78",
    ];
    let length = testArray.length;
    for (let i = 0; i < length; i++) {
      testArray[i] = "1";
    }
  }
}
```

**运行时间比较**

![](http://markdown-1252710547.coscd.myqcloud.com/%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%AF%94%E8%BE%83-%E7%BC%93%E5%AD%98%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1%20length.png)

## 递归

复杂的算法通常比较容易使用递归实现，但是递归是比较消耗性能的操作。此外，在浏览器中，递归函数还会遇到浏览器调用栈大小的限制。

JavaScript 引擎所支持的递归数量与 JavaScript 调用栈大小直接相关。只有 IE 例外，它的调用栈与可用系统内存相关，其他浏览器有固定的调用栈限制。当你使用了太多的递归，超过最大调用栈尺寸时，浏览器会报错。

任何可以用递归实现的算法都可以用迭代实现。迭代算法通常包括几个不同的循环，分别对应算法过程的不同方面，这也许会导致它自身的性能问题。但是，使用优化的循环替代长时间运行的递归函数可以提高性能， 因为运行一个循环比反复调用一个函数的开销要低。

减少工作量就是最好的性能优化技术。代码所做的事情越少，它的运行速度就越快。根据这个思路，避免重复工作是很有意义的。多次执行相同的任务纯粹是浪费时间。Memoization（制表），通过缓存先前计算结果为后续计算所重复使用，避免了重复工作。这使得 Memoization（制表） 成为递归算法中有用的技术。

例如，下面求阶乘的代码：

```js
// 求阶乘
var fact6 = factorial(6);
var fact5 = factorial(5);
var fact4 = factorial(4);
```

可以使用 Memoization (制表) 技术来重写 factorial() 函数，如下：

```js
function memfactorial(n) {
  if (!memfactorial.cache) {
    memfactorial.cache = {
      0: 1,
      1: 1,
    };
  }
  if (!memfactorial.cache.hasOwnProperty(n)) {
    memfactorial.cache[n] = n * memfactorial(n - 1);
  }
  return memfactorial.cache[n];
}
```

# 五、网络请求

作为 `web` 的重要组成部分，网络请求（与服务器进行通信），占用了大量的时间。优化网络请求的速度能够大幅度提升网页响应速度。

## 请求数据

### 1. XMLHTTPRequest

XMLHTTPRequest 是一种常用的异步收发数据的方法，现代浏览器都能很好的支持它。你可以向请求报文中添加任意的头信息和参数（包括 GET 和 POST），并读取从服务器返回的头信息，以及响应文本自身。由于 XHR 提供了高级的控制，浏览器在上面增加了一些限制：你不能使用 XHR 从当前运行的代码域之外请求数据（跨域请求）。

```js
var url = "/data.php";
var params = ["id=934875", "limit=20"];
var req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState === 4) {
    var responseHeaders = req.getAllResponseHeaders();
    var data = req.responseText;
  }
};
req.open("GET", url + "?" + params.join("&"), true);
req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
req.send(null);
```

### 2. 动态脚本注入

该技术克服了 XHR 的最大限制：它可以从不同域的服务器上获取数据，即可以进行跨域请求。但是动态脚本注入也有一些缺点：

- 不能设置请求的头信息
- 只能通过 GET 方法传递参数
- 不能设置请求的超时或重试

```js
var scriptElement = document.createElement("script");
scriptElement.src = "http://any-domain.com/javascript/lib.js";
document.getElementsByTagName("head")[0].appendChild(scriptElement);
```

响应结果被用作脚本标签的源码，它必须是可执行的 JavaScript，你不能使用 XML 或者 JSON 等数据格式。

### 3. Multipart XHR

Multipart XHR 允许你只用一个 HTTP 请求就可以从服务器端获取多个资源。它通过将资源（可以是 CSS 文件，HTML 片段，JavaScript 代码，或 base64 编码的图片）打包成一个由双方约定的字符串分隔的长字符串，从服务器端发送到客户端。JavaScript 代码处理此长字符串，根据它的媒体类型和其他 “信息头” 解析出每个资源。

使用这个技术有一些缺点，其中最大的缺点是以这种方法获得的资源不能被浏览器缓存。由于 HTTP 请求是 Ajax 中最大的瓶颈之一，减少其需求数量对整个页面性能有很大影响。

## 发送数据

有时我们不仅要接受数据，还要将数据发送给服务器，例如注册用户信息。

### 1. XMLHTTPRequest

虽然 XHR 主要用于从服务器获取数据，但它同样可以将将数据发送给服务器。数据可以用 GET 或 POST 方式发回， 包括任意数量的 HTTP 头信息。

```js
var url = "/data.php";
var params = ["id=934875", "limit=20"];
var req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4) {
  }
};
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.setRequestHeader("Content-Length", params.length);
req.send(params.join("&"));
```

### 2. Beacons

这种技术与动态脚本标签插入非常类似。使用 JavaScript 创建一个新的 Image 对象，并把 src 设置为服务器上脚本文件的 URL。此 URL 包含我们打算通过 GET 格式传回的键值对数据。服务器取得此数据并保存下来，而不必向客户端返回什么，因此没有实际的图像显示。这是将信息发回 服务器的最有效方法。其开销很小，而且任何服务器端错误都不会影响客户端。

```js
var url = "/status_tracker.php";
var params = ["step=2", "time=1248027314"];
new Image().src = url + "?" + params.join("&");
```

## 数据格式

常用的数据格式：

- XML 代码冗长，解析复杂
- JSON
- HTML
- 自定义格式

通常来说，数据格式越轻量级越好，JSON 和字符分隔的自定义格式是最好的。如果数据集很大并且对解析时间有要求，那么可以选择使用这两种格式之一。

## 性能优化

了解完基本概念，我们就可以开始重点 - 性能优化了。在选择好合适的数据传输方式和数据格式之后，就可以考虑优化技术了。针对不同的数据传输方式，一般都有不同的优化方法。

### 1. 缓存数据

最快的请求就是不发送请求，有两种主要方法可以避免发送不必要的请求：

- 在服务端，设置 HTTP 头信息，确保响应会被缓存在浏览器中。
- 在客户端，把获取到的信息存储到本地。

**设置 HTTP 头信息**

> 浏览器会在第一次请求完服务器后得到响应，我们可以在服务器中设置这些响应，从而达到在以后的请求中尽量减少甚至不从服务器获取资源的目的。浏览器是依靠请求和响应中的的头信息来控制缓存的。

> Expires 是 Web 服务器响应消息头字段，在响应 HTTP 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。不过 Expires 是 HTTP 1.0 的东西，现在默认浏览器均默认使用 HTTP 1.1，所以它的作用基本忽略。

> Cache-Control 与 Expires 的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过 Cache-Control 的选择更多，设置更细致，如果同时设置的话，其优先级高于 Expires。

> 当然并不是所有请求都能被缓存。无法被浏览器缓存的请求：

> HTTP 信息头中包含 `Cache-Control:no-cache`，`pragma:no-cache（HTTP1.0）`，或 `Cache-Control:max-age=0` 等告诉浏览器不用缓存的请求

- 需要根据 Cookie，认证信息等决定输入内容的动态请求是不能被缓存的
- 经过 HTTPS 安全加密的请求（有人也经过测试发现，ie 其实在头部加入 `Cache-Control：max-age` 信息，Firefox 在头部加入 `Cache-Control:Public` 之后，能够对 HTTPS 的资源进行缓存，参考《HTTPS 的七个误解》）
- POST 请求无法被缓存
- HTTP 响应头中不包含 `Last-Modified/Etag`，也不包含 `Cache-Control/Expires` 的请求无法被缓存

> 除了 `Expires` 和 `Cache-Control` 之外，还有其他方法可以设置 HTTP 头信息来缓存数据，在此不做讨论，具体可以参看参考文献中的 `浏览器缓存机制剖析`。

**本地数据存储**

> 除了依赖浏览器处理缓存之外，你还可以用手工方法实现它，直接存储那些从服务器收到的响应。主要的存储方法：

- Cookies
- Local Storage
- Session Storage
- IndexedDB

> 具体的使用方法可以参考对应的文章。

总的来说，设置一个 HTTP 头信息是更好的解决方案。这比较容易实现，而且其缓存内容可以跨页面或者跨对话，而本地数据存储拥有更高的灵活性，更大的数据存储量，可以根据具体需求选择对应的缓存策略。

### 2. 优化网络请求

在无法缓存数据，或者缓存数据失效之后，我们不得不发送网络请求。这时，我们就得考虑怎么优化网络请求，以构建更快的网页应用。

**合并请求**

> 合并请求的主要目的是减少浏览器对服务器发起的请求数，从而减少在发起请求过程中花费的时间。尽量合并图片、CSS、JS，节省网络请求时间，加快页面的加载。

**使用 CDN 加速**

> CDN 是将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问的响应速度和成功率。解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。

**域名拆分**

> 域名拆分主要是为了增加浏览器下载的并行度，让浏览器能同时发起更多的请求。

**使用 gzip 压缩内容**

> gzip 能够压缩任何一个文本类型的响应，包括 html，xml，json，大大缩小请求的文件大小。

**Minify**

> Minify 指的是将 JS 和 CSS 等文本文件进行最小化处理，一般对于 CSS 来说就是去除空格去除换行去除注释等，对于 JS，除了上述方法外，还可以进行变量名替换，将长变量名替换为短变量名

### 参考

- [《高性能 JavaScript》](https://book.douban.com/subject/5362856/)
- [分析运行时性能](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/?hl=zh-cn)
- [webpack 解惑：require 的五种用法](http://www.cnblogs.com/lvdabao/p/5953884.html)
- [前端性能优化相关](https://github.com/wy-ei/notebook/issues/34#)
- [浏览器缓存机制剖析](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html)
- [浏览器缓存机制](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html)
- [客户端 (浏览器端) 数据存储技术概览](https://github.com/dwqs/blog/issues/42)
- [常见的前端性能优化手段都有哪些？都有多大收益？](https://www.zhihu.com/question/40505685/answer/86898655)
