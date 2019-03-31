(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{344:function(r,a,t){"use strict";t.r(a);var e=t(3),s=Object(e.a)({},function(){var r=this,a=r.$createElement,t=r._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h1",{attrs:{id:"browser"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#browser","aria-hidden":"true"}},[r._v("#")]),r._v(" Browser")]),r._v(" "),t("h2",{attrs:{id:"浏览器的同源策略。"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的同源策略。","aria-hidden":"true"}},[r._v("#")]),r._v(" 浏览器的同源策略。")]),r._v(" "),t("p",[r._v("同源策略限制了一个源（origin）中加载文本或脚本与来自其它源（origin）中资源的交互方式。指处于安全原因，浏览器只允许网页中的脚本访问相同源（协议相同，域名相同，端口相同）下的资源。")]),r._v(" "),t("p",[r._v("同源策略出于安全，不允许源 A 的脚本读取（read）源 B 的资源的内容，但却允许执行（execute）源 B 的资源。这个概念也有些拗口。简单说，有一个页面调用了 Google CDN 提供的 jQuery，以及其它 CDN 上的 Bootstrap JS、CSS 代码，虽然它们与我的博客不同源，但我可以用它们来操作这个页面，并应用样式，这是执行的概念。")]),r._v(" "),t("h2",{attrs:{id:"常见的浏览器内核有哪些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见的浏览器内核有哪些","aria-hidden":"true"}},[r._v("#")]),r._v(" 常见的浏览器内核有哪些")]),r._v(" "),t("h3",{attrs:{id:"一、trident-内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、trident-内核","aria-hidden":"true"}},[r._v("#")]),r._v(" 一、Trident 内核")]),r._v(" "),t("p",[r._v("代表产品： Internet Explorer，又称其为 IE 内核。")]),r._v(" "),t("h3",{attrs:{id:"二、gecko-内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、gecko-内核","aria-hidden":"true"}},[r._v("#")]),r._v(" 二、Gecko 内核")]),r._v(" "),t("p",[r._v("代表作品： Mozilla Firefox")]),r._v(" "),t("p",[r._v("Gecko 的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。因为这是个开源内核，因此受到许多人的青睐，Gecko 内核的浏览器也很多，这也是 Gecko 内核虽然年轻但市场占有率能够迅速提高的重要原因。")]),r._v(" "),t("h3",{attrs:{id:"三、webkit-内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、webkit-内核","aria-hidden":"true"}},[r._v("#")]),r._v(" 三、WebKit 内核")]),r._v(" "),t("p",[r._v("代表作品： Safari、Chrome")]),r._v(" "),t("p",[r._v("Webkit 是一个开源项目，包含了来自 KDE 项目和苹果公司的一些组件，主要用于 Mac OS 系统，它的特点在于源码结构清晰、渲染速度极快。缺点是对网页代码的兼容性不高，导致一些编写不标准的网页无法正常显示。主要代表作品有 Safari 和 Google 的浏览器 Chrome。")]),r._v(" "),t("h3",{attrs:{id:"四、presto-内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、presto-内核","aria-hidden":"true"}},[r._v("#")]),r._v(" 四、Presto 内核")]),r._v(" "),t("p",[r._v("代表作品： Opera")]),r._v(" "),t("p",[r._v("Presto 是由 Opera Software 开发的浏览器排版引擎，供 Opera 7.0 及以上使用。它取代了旧版 Opera 4 至 6 版本使用的 Elektra 排版引擎，包括加入动态功能，例如网页或其部分可随着 DOM 及 Script 语法的事件而重新排版。")]),r._v(" "),t("h3",{attrs:{id:"五、chromium-blink-内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五、chromium-blink-内核","aria-hidden":"true"}},[r._v("#")]),r._v(" 五、Chromium/Blink 内核")]),r._v(" "),t("p",[r._v("代表作品：Chrome")]),r._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"http://web.jobbole.com/84826/",target:"_blank",rel:"noopener noreferrer"}},[r._v("主流浏览器内核介绍"),t("OutboundLink")],1)])]),r._v(" "),t("h2",{attrs:{id:"浏览器渲染"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染","aria-hidden":"true"}},[r._v("#")]),r._v(" 浏览器渲染")]),r._v(" "),t("h3",{attrs:{id:"关键路径渲染"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关键路径渲染","aria-hidden":"true"}},[r._v("#")]),r._v(" 关键路径渲染")]),r._v(" "),t("p",[r._v("关键渲染路径（Critical Rendering Path）是指与当前用户操作有关的内容。例如用户刚刚打开一个页面，首屏的显示就是当前用户操作相关的内容，具体就是浏览器收到 HTML、CSS 和 JavaScript 等资源并对其进行处理从而渲染出 Web 页面。")]),r._v(" "),t("p",[r._v("浏览器在渲染页面前需要先构建出 DOM 树与 CSSOM 树（如果没有 DOM 树和 CSSOM 树就无法确定页面的结构与样式，所以这两项是必须先构建出来的）。")]),r._v(" "),t("h3",{attrs:{id:"dom-树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dom-树","aria-hidden":"true"}},[r._v("#")]),r._v(" DOM 树")]),r._v(" "),t("p",[r._v("DOM 树全称为 Document Object Model 文档对象模型，它是 HTML 和 XML 文档的编程接口，提供了对文档的结构化表示，并定义了一种可以使程序对该结构进行访问的方式（比如 JavaScript 就是通过 DOM 来操作结构、样式和内容）。DOM 将文档解析为一个由节点和对象组成的集合，可以说一个 WEB 页面其实就是一个 DOM。")]),r._v(" "),t("h3",{attrs:{id:"cssom-树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cssom-树","aria-hidden":"true"}},[r._v("#")]),r._v(" CSSOM 树")]),r._v(" "),t("p",[r._v("CSSOM 树全称为 Cascading Style Sheets Object Model 层叠样式表对象模型，它与 DOM 树的含义相差不大，只不过它是 CSS 的对象集合。")]),r._v(" "),t("h3",{attrs:{id:"渲染树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#渲染树","aria-hidden":"true"}},[r._v("#")]),r._v(" 渲染树")]),r._v(" "),t("p",[r._v("在构建了 DOM 树和 CSSOM 树之后，浏览器只是拥有了两个互相独立的对象集合，DOM 树描述了文档的结构与内容，CSSOM 树则描述了对文档应用的样式规则，想要渲染出页面，就需要将 DOM 树与 CSSOM 树结合在一起，这就是渲染树。")]),r._v(" "),t("h3",{attrs:{id:"布局"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#布局","aria-hidden":"true"}},[r._v("#")]),r._v(" 布局")]),r._v(" "),t("p",[r._v("渲染树构建完毕后，浏览器得到了每个可见节点的内容与其样式，下一步工作则需要计算每个节点在窗口内的确切位置与大小，也就是布局阶段。")]),r._v(" "),t("p",[r._v("布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小，所有相对的测量值也都会被转换为屏幕内的绝对像素值。")]),r._v(" "),t("h3",{attrs:{id:"绘制节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#绘制节点","aria-hidden":"true"}},[r._v("#")]),r._v(" 绘制节点")]),r._v(" "),t("p",[r._v("当 Layout 布局事件完成后，浏览器会立即发出 Paint Setup 与 Paint 事件，开始将渲染树绘制成像素，绘制所需的时间跟 CSS 样式的复杂度成正比，绘制完成后，用户就可以看到页面的最终呈现效果了。")]),r._v(" "),t("h2",{attrs:{id:"页面重绘-repaints-和回流-reflows"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#页面重绘-repaints-和回流-reflows","aria-hidden":"true"}},[r._v("#")]),r._v(" 页面重绘 (repaints) 和回流 (reflows)")]),r._v(" "),t("p",[r._v("浏览器的重构（重绘）指的是改变每个元素外观时所触发的浏览器行为，比如颜色、背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流，回流指的是浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置，开销较大，可以理解为 DOM 树需要重新进行计算。一般最好触发元素的重构，避免元素的回流；比如通过添加类来改变 css 样式，合并多次对 DOM 样式的修改；当需要操作某一块元素时候，最好使其脱离文档流，这样就不会引起回流了，比如设置 position:absolute 或者 fixed；或 display:none，全部操作结束后再显示。")]),r._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://sylvanassun.github.io/2017/10/03/2017-10-03-BrowserCriticalRenderingPath/",target:"_blank",rel:"noopener noreferrer"}},[r._v("浏览器渲染过程与性能优化"),t("OutboundLink")],1)]),r._v(" "),t("li",[t("a",{attrs:{href:"http://web.jobbole.com/84888/",target:"_blank",rel:"noopener noreferrer"}},[r._v("浏览器缓存知识小结及应用（建议阅读）"),t("OutboundLink")],1)]),r._v(" "),t("li",[t("a",{attrs:{href:"https://www.zhihu.com/question/20790576/answer/32602154",target:"_blank",rel:"noopener noreferrer"}},[r._v("大公司里怎样开发和部署前端代码（建议阅读）"),t("OutboundLink")],1)])])])},[],!1,null,null,null);a.default=s.exports}}]);