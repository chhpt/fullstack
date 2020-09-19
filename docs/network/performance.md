---
id: performance
title: 网页性能
---

关于网页性能

## 你如何对网站的文件和资源进行优化

期待的解决方案包括：

* 文件合并 / 压缩
* 使用 CDN 托管
* 缓存的使用（多个域名来提供缓存）

## 白屏和首屏时间

### 白屏时间

白屏时间指的是浏览器开始显示内容的时间。因此我们只需要知道是浏览器开始显示内容的时间点，即页面白屏结束时间点即可获取到页面的白屏时间。

#### 计算白屏时间

因此，我们通常认为浏览器开始渲染 `<body>` 标签或者解析完 `<head>` 标签的时刻就是页面白屏结束的时间点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>白屏</title>
  <script type="text/javascript">
    // 不兼容performance.timing 的浏览器，如IE8
    window.pageStartTime = Date.now();
  </script>
  <!-- 页面 CSS 资源 -->
  <link rel="stylesheet" href="common.css">
  <link rel="stylesheet" href="page.css">
  <script type="text/javascript">
    // 白屏时间结束点
    window.firstPaint = Date.now();
  </script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

* 可使用 Performance API 时
  > 白屏时间 = firstPaint - performance.timing.navigationStart;

* 不可使用 Performance API 时
  > 白屏时间 = firstPaint - pageStartTime;

### 首屏时间

首屏时间是指用户打开网站开始，到浏览器首屏内容渲染完成的时间。

#### 计算首屏时间

通常计算首屏的方法有

* 首屏模块标签标记法
* 统计首屏内加载最慢的图片的时间
* 自定义首屏内容计算法

#### 1、首屏模块标签标记法

首屏模块标签标记法，通常适用于首屏内容不需要通过拉取数据才能生存以及页面不考虑图片等资源加载的情况。我们会在 HTML 文档中对应首屏内容的标签结束位置，使用内联的 JavaScript 代码记录当前时间戳。如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>首屏</title>
  <script type="text/javascript">
    window.pageStartTime = Date.now();
  </script>
  <link rel="stylesheet" href="common.css">
  <link rel="stylesheet" href="page.css">
</head>
<body>
  <!-- 首屏可见模块1 -->
  <div class="module-1"></div>
  <!-- 首屏可见模块2 -->
  <div class="module-2"></div>
  <script type="text/javascript">
    window.firstScreen = Date.now();
  </script>
  <!-- 首屏不可见模块3 -->
  <div class="module-3"></div>
    <!-- 首屏不可见模块4 -->
  <div class="module-4"></div>
</body>
</html>
```

此时首屏时间等于 firstScreen - performance.timing.navigationStart;

事实上首屏模块标签标记法 在业务中的情况比较少，大多数页面都需要通过接口拉取数据才能完整展示，因此我们会使用 JavaScript 脚本来判断首屏页面内容加载情况。

#### 2、统计首屏内图片完成加载的时间

通常我们首屏内容加载最慢的就是图片资源，因此我们会把首屏内加载最慢的图片的时间当做首屏的时间。

由于浏览器对每个页面的 TCP 连接数有限制，使得并不是所有图片都能立刻开始下载和显示。因此我们在 DOM 树 构建完成后将会去遍历首屏内的所有图片标签，并且监听所有图片标签 onload 事件，最终遍历图片标签的加载时间的最大值，并用这个最大值减去 navigationStart 即可获得近似的首屏时间。

此时首屏时间等于 加载最慢的图片的时间点 - performance.timing.navigationStart;

#### 3、自定义模块内容计算法

由于统计首屏内图片完成加载的时间比较复杂。因此我们在业务中通常会通过自定义模块内容，来简化计算首屏时间。如下面的做法：

* 忽略图片等资源加载情况，只考虑页面主要 DOM
* 只考虑首屏的主要模块，而不是严格意义首屏线以上的所有内容

### 参考

* [前端优化 - 如何计算白屏和首屏时间](http://www.cnblogs.com/longm/p/7382163.html)
* [7 天打造前端性能监控系统](http://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/)

## 请说出三种减少页面加载时间的方法

* 图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方）
* 优化 JS，CSS(压缩合并，如 margin-)
* 标明高度和宽度（如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，不断地调整页面；当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。）
* 减少 http 请求（合并文件 / 图片）。

## 你有哪些性能优化的方法

* 减少 http 请求次数：CSS Sprites(把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的 "background-image"，"background-repeat"，"background-position" 的组合进行背景定位。这样可以减少很多图片请求的开销，因为请求耗时比较长；请求虽然可以并发，但是也有限制，一般浏览器都是 6 个。未来就不需要这样做了，因为有 http2), JS、CSS 源码压缩、图片大小控制合适，网页 Gzip，CDN 托管，data 缓存，图片服务器。
* 前端用变量保存 AJAX 请求结果，每次操作本地变量，不用请求，减少请求次数，减少由于 HTML 标签导致的带宽浪费。
* 用 innerHTML 代替 DOM 操作，减少 DOM 操作次数，优化 JavaScript 性能。
* 当需要设置的样式很多时设置 className 而不是直接操作 style。
* 少用全局变量、缓存 DOM 节点查找的结果。减少 IO 读取操作。

## 网站重构

在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变 UI 的情况下，对网站进行优化，在扩展的同时保持一致的 UI。

## 如何解决首页白屏问题

一、 问题的产生渲染：指模板与数据装配的过程。（1）很久之前，页面在服务端渲染（经典 MVC 开发模式）。那时前端还处于刀耕火种、jQuery 独树一帜的时代，前后端代码的耦合度很高。这意味着后端的工程师往往得负责一部分修改 HTML、编写脚本的工作，而前端开发者也得了解页面上存在的服务端代码含义。有时候某处页面逻辑的变动，鉴于代码的混搭，可能都不确定应该请后端还是前端来改动。（2）前后端分离（前端渲染）：浏览器分别拿到空的页面和数据(AJAX)，然后用某种方式拼接到一起，是现在绝大多数网站的做法。随着近年来 angular 牵起各种前端 MV\* 框架的风靡，后端毋须再于静态页面耗费心思，只需专心开发数据接口供前端使用即可。（3）再之后，部分网站就变成了 SPA（单页应用程序）：浏览器一开始会加载必需的 HTML、CSS 和 JavaScript，之后所有的操作都在一个 HTML 上完成，这一切都由 JS 来控制。因此，SPA 会包含大量 JS 代码，复杂度可想而知，模块化开发和设计的重要性不言而喻。SPA 不仅仅把渲染放到了前端，路由也顺便挪到了前端：在 URL 中采用 #号来作为当前视图的地址, 改变 #号后的参数，然后对页面元素进行调整，页面并不会重载。SPA 的问题一是 SEO，即仅仅是 hash 部分不同，（国产）搜索引擎会将其认成一个页面；二是大型应用的首次加载非常耗时。

二、 问题的描述做移动 web 页面，受网速和终端性能影响，我们经常要关注首屏内容展示时间（以下简称首屏时间）这个指标，它衡量着我们的页面是否能在用户耐心消磨完之前展示出来，很大程度影响着用户的使用满意度。
A：加载完静态资源后通过 ajax 请求去后台获取数据，数据回来后渲染内容

![demo](http://upload-images.jianshu.io/upload_images/3185709-ae453a25d9914998.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在每个点打上一个时间戳，首屏时间 = 点 8 – 点 1；
B：使用后台直出，返回的 html 已经带上内容了

![demo](http://upload-images.jianshu.io/upload_images/3185709-fe2deb27eb008c63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时首屏时间 = 点 4 – 点 1。打了这么多个点，是因为当我们收集到首屏时间之后，要去分析到底是哪一段是性能瓶颈，哪一段还有优化空间。如果真想要知道 js 文件的加载时间，最正确的姿势是使用 Resource Timing API，不过这个 API 移动端只能在 Android 4.4 及以上的版本拿到数据，也就在业务 PV 大的场景才够我们做分析用。

### 三、 解决方案

（1）直出：服务端渲染并输出，跟起初前后端水乳交融的开发模式基本类似，只是后端语言我们换成了 node ；同构：前后端使用同一套代码方案，方便维护。这样用户访问到的便是已经带有首屏内容的页面，大大降低了等候时间，提升了体验。同构时，服务端结合数据将 Component 渲染成完整的 HTML 字符串并将数据状态返回给客户端。对比前端渲染，相同的 Component，将输出一致的 Dom 结构。同构让前后端模板、类库以及数据模型上共用，大大减少了服务端渲染的工作量。在服务端上渲染模板增加了服务端负载，所以可以只直出首屏可视区域，减少 Component 层级，减少调用栈；最后，做好容灾方案，如真的服务端挂了，可以直接切换到普通的客户端渲染方案。（2）把渲染相关的代码抽离出来放到最前面。走直出的话，建议把首屏的样式抽离出来内联到头部去。无关紧要的 js 不要放在负责渲染的 js 前面，所谓 “无关紧要” 是指和首屏渲染无关，如数据上报组件。可以将要上报的数据缓存起来，先继续执行渲染的 js，等负责渲染的 js 执行完再加载上报组件。对于没有启用 chunk 的 html，建议不要 inline 太多无关的 js 在里面，这样会影响渲染时间。（3）小心处理好文件的依赖关系。动态加载的 js 执行不会受到 html 后面外联的 js 的阻塞的影响，即它的执行和后面 js 的执行顺序是不确定的。当然还可以采用最不容易出错的方法：负责动态加载 js 的文件是 html 里面外联的最后一个文件。
