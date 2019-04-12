(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{336:function(a,t,e){"use strict";e.r(t);var s=e(2),r=Object(s.a)({},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"html"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html","aria-hidden":"true"}},[a._v("#")]),a._v(" HTML")]),a._v(" "),e("h2",{attrs:{id:"doctype（文档类型）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#doctype（文档类型）","aria-hidden":"true"}},[a._v("#")]),a._v(" doctype（文档类型）")]),a._v(" "),e("p",[a._v("声明页面文档的类型，以及告诉浏览器应该使用哪种模式进行渲染。")]),a._v(" "),e("h2",{attrs:{id:"浏览器标准模式和怪异模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器标准模式和怪异模式","aria-hidden":"true"}},[a._v("#")]),a._v(" 浏览器标准模式和怪异模式")]),a._v(" "),e("p",[a._v("所谓的标准模式是指，浏览器按 W3C 标准解析执行代码。怪异模式则是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式。")]),a._v(" "),e("p",[a._v("由于历史的原因，各个浏览器在对页面的渲染上存在差异，甚至同一浏览器在不同版本中，对页面的渲染也不同。在 W3C 标准出台以前，浏览器在对页面的渲染上没有统一规范，产生了差异（Quirks mode）。由于 W3C 标准的推出，浏览器渲染页面有了统一的标准（Standars mode），这就是二者最简单的区别。总而言之，怪异模式是为了兼容在标准推出之前出现的页面而设置的。")]),a._v(" "),e("p",[a._v("浏览器会根据 doctype 来决定使用哪种渲染模式，比如 "),e("code",[a._v("<!doctype html>")]),a._v(" 将会触发标准模式。如果页面中没有声明 doctype，浏览器则会使用怪异模式。")]),a._v(" "),e("h2",{attrs:{id:"html-语义化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html-语义化","aria-hidden":"true"}},[a._v("#")]),a._v(" HTML 语义化")]),a._v(" "),e("p",[a._v("语义化的含义就是用正确的标签做正确的事情，html 语义化就是让页面的内容结构化，便于浏览器、搜索引擎的解析。在没有样式 CCS 情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。")]),a._v(" "),e("h2",{attrs:{id:"data-属性的作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#data-属性的作用","aria-hidden":"true"}},[a._v("#")]),a._v(" "),e("code",[a._v("data-")]),a._v(" 属性的作用")]),a._v(" "),e("p",[a._v("当没有合适的属性和元素时，自定义的 "),e("code",[a._v("data-")]),a._v(" 属性是能够存储页面或 App 的私有的自定义数据。")]),a._v(" "),e("p",[a._v("可以通过 "),e("code",[a._v("ele.dataset.xxx")]),a._v(" 来访问 "),e("code",[a._v('data-xxx=""')]),a._v("。")]),a._v(" "),e("h2",{attrs:{id:"cookies，sessionstorage-和-localstorage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookies，sessionstorage-和-localstorage","aria-hidden":"true"}},[a._v("#")]),a._v(" cookies，sessionStorage 和 localStorage")]),a._v(" "),e("h3",{attrs:{id:"cookie"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookie","aria-hidden":"true"}},[a._v("#")]),a._v(" Cookie")]),a._v(" "),e("ul",[e("li",[a._v("一般由服务器生成，可设置失效时间。如果在浏览器端生成 Cookie，默认是关闭浏览器后失效。")]),a._v(" "),e("li",[a._v("每个域名存储量比较小（各浏览器不同，大致 4K）")]),a._v(" "),e("li",[a._v("所有域名的存储量有限制（各浏览器不同，大致 4K）")]),a._v(" "),e("li",[a._v("每次都会携带在 HTTP 头中，如果使用 cookie 保存过多数据会带来性能问题")])]),a._v(" "),e("h3",{attrs:{id:"localstorage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#localstorage","aria-hidden":"true"}},[a._v("#")]),a._v(" localStorage")]),a._v(" "),e("ul",[e("li",[a._v("永久存储（可以手动清除）")]),a._v(" "),e("li",[a._v("单个域名存储量比较大（推荐 5MB，各浏览器不同）")]),a._v(" "),e("li",[a._v("总体数量无限制")])]),a._v(" "),e("h3",{attrs:{id:"sessionstorage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sessionstorage","aria-hidden":"true"}},[a._v("#")]),a._v(" sessionStorage")]),a._v(" "),e("ul",[e("li",[a._v("仅在当前会话下有效，关闭页面或浏览器后被清除")]),a._v(" "),e("li",[a._v("仅在客户端（即浏览器）中保存，不参与和服务器的通信")]),a._v(" "),e("li",[a._v("存储量更大（推荐没有限制，但是实际上各浏览器也不同）")])]),a._v(" "),e("h2",{attrs:{id:"html5-应用程序缓存和浏览器缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html5-应用程序缓存和浏览器缓存","aria-hidden":"true"}},[a._v("#")]),a._v(" HTML5 应用程序缓存和浏览器缓存")]),a._v(" "),e("p",[a._v("HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。")]),a._v(" "),e("ul",[e("li",[a._v("离线浏览 - 用户可在应用离线时使用它们")]),a._v(" "),e("li",[a._v("速度 - 已缓存资源加载得更快")]),a._v(" "),e("li",[a._v("减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源")])]),a._v(" "),e("p",[a._v("它的实现借助于 manifest 文件，如下：")]),a._v(" "),e("div",{staticClass:"language-HTML extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token doctype"}},[a._v("<!DOCTYPE HTML>")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("html")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("manifest")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("demo.appcache"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v('\nmanifest 文件是简单的文本文件，它告知浏览器被缓存（以及不缓存）的内容。\n\n- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存\n- NETWORK: - 在此标题下列出的文件需要与服务器的连接，且不会被缓存\n- FALLBACK: - 在此标题下列出的文件规定当页面无法访问时的回退页面（如 404 页面）\n- "#" 开头的是注释行（一旦文件被缓存，则浏览器会继续展示已缓存的版本，即使您修改了服务器上的文件）更新注释行中的日期和版本号是一种使浏览器重新缓存文件的办法\n\n与传统浏览器缓存相比，它不强制用户访问的网站内容被缓存。\n')])])]),e("h2",{attrs:{id:"requestanimationframe"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#requestanimationframe","aria-hidden":"true"}},[a._v("#")]),a._v(" requestAnimationFrame")]),a._v(" "),e("p",[a._v("requestAnimationFrame(callback) 就是针对动画效果的 API，你可以把它用在 DOM 上的风格变化或 canvas 动画或 WebGL 中。在浏览器动画程序中，我们通常使用 setTimout() 或 setInterval() 来循环每隔几毫秒移动目标物体一次，来让它动起来。HTML5 标准规定了 setTimeout() 的最短时间不得低于 4 毫秒，如果低于这个值，就会自动增加。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 requestAnimationFrame() 的效果要好于 setTimeout()。浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果。另外，当标签页不可见时，浏览器会暂停其动画，这会减少 CPU、内存的压力，节省电池电量。")])])},[],!1,null,null,null);t.default=r.exports}}]);