# HTML5

HTML5 规范则围绕如何使用新增标记定义了大量 JavaScript API。其中一些 API 与 DOM 重叠，定义了浏览器应该支持的 DOM 扩展。

## HTML5 有哪些新特性（或你经常使用的 HTML5 语法）

* 语义化标签（header, nav, footer, aside, article, section）
* 音频、视频 API(audio,video)
* 用于绘画的 canvas 元素
* 对本地离线存储的更好的支持，localStorge，sessionStorage 等
* 拖拽释放 (Drag and drop) API
* 表单控件，calendar、date、time、email、url、search
* 新的技术 websocket, Geolocation 等
* 新的跨域通信机制 window.postMessage
* 新增获取地理位置，上传文件等 API

## HTML 5 的结构元素

* 结构性元素：主要负责 web 上下文结构的定义。

  * section：在 web 页面应用中，该元素也可以用于区域的章节描述。
  * header：页面主体上的头部， header 元素往往在一对 body 元素中。
  * footer：页面的底部（页脚），通常会标出网站的相关信息。
  * nav：专门用于菜单导航、链接导航的元素，是 navigator 的缩写。
  * article：用于表现一篇文章的主体内容，一般为文字集中显示的区域。

* 级块性元素：主要完成 web 页面区域的划分，确保内容的有效分割。

  * aside：用于表达注记、贴士、侧栏、摘要、插入的引用等作为补充主体的内容。
  * figure：是对多个元素进行组合并展示的元素，通常与 ficaption 联合使用。
  * code：表示一段代码块。
  * dialog：用于表达人与人之间的对话，该元素包含 dt 和 dd 这两个组合元素。

* 行内语义性元素：主要完成 web 页面具体内容的引用和描述，是丰富内容展示的基础。

  * meter：表示特定范围内的数值，可用于工资、数量、百分比等。
  * time：表示时间值。
  * progress：用来表示进度条，可通过对其 max, min, step 等属性进行控制。
  * video/audio：用于支持音视频文件的直接播放，支持缓冲预载和多种媒体格式。

* 交互性元素：主要用于功能性的内容表达，会有一定的内容和数据的关联，是各种事件的基础。
  * details：用来表示一段具体的内容，但是内容可能显示不全，通过某种手段（如单击）显示全部。

## HTML 5 新增的内容

### getElementsByClassName() 方法

getElementsByClassName() 方法接收一个参数，即一个包含一或多个类名的字符串，返回带有 指定类的所有元素的 NodeList。传入多个类名时，类名的先后顺序不重要。

### classList 属性

在操作类名时，需要通过 className 属性添加、删除和替换类名。因为 className 中是一个字 符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。

```JavaScript
div.className = div.className + 'newClass';
```

HTML5 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加 classList 属性。这个属性有一些方法可以操作元素的 class 属性。

* add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
* contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。
* remove(value)：从列表中删除给定的字符串。
* toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

```JavaScript
div.classList.remove("user");
```

### 焦点管理

HTML5 新增了 document.activeElement 属性，这个属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入（通常是 通过按 Tab 键）和在代码中调用 focus() 方法。

### 自定义数据属性

HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-，目的是为元素提供与渲染无关的 信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以 data - 开头即可。

```JavaScript
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
var div = document.getElementById("myDiv");
// 取得自定义属性的值
var appId = div.dataset.appId;
var myName = div.dataset.myname;
```

### insertAdjacentHTML() 方法

`insertAdjacentHTML()` 方法接收两个参数：插入位置和要插入的 HTML 文本。第一个参数必须是下列值之一：

* "beforebegin"，在当前元素之前插入一个紧邻的同辈元素
* "afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素
* "beforeend"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
* "afterend"，在当前元素之后插入一个紧邻的同辈元素

### scrollIntoView() 方法

scrollIntoView() 可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入 false 作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口顶部平齐）不过顶部不一定平齐。

#### innerHTML 属性

innerHTML 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标记。在写模式下，innerHTML 会根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全替换调用元素原先的所有子节点。

在大多数浏览器中，通过 innerHTML 插入 `<script>` 元素并不会执行其中的脚本。

### outerHTML 属性

在读模式下，outerHTML 返回调用它的元素及所有子节点的 HTML 标签。在写模式下，outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替换调用元素。

## 特殊扩展 - 在部分浏览器中可用

### children 属性

由于 IE9 之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此就出现了 children 属性。这个属性是 HTMLCollection 的实例， 只包含元素中同样还是元素的子节点，不包含空白空白文本节点。除此之外， children 属性与 childNodes 没有什么区别，即在元素只包含元素子节点时，这两个属性的值相同。

```JavaScript
var childCount = element.children.length;
var firstChild = element.children[0];
```

### contains() 方法

contains() 方法接收一个参数，即要检测的后代节点。如果被检测的节点是后代节点，该方法返回 true，否则，返回 false。

### innerText

通过 innertText 属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。在通过 innerText 读取值时，它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。在通过 innerText 写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点。

可以通过此方法获取某个 HTML 片断中的文本内容，去除 HTML 标签。由于不同浏览器处理空白符的方式不同，因此输出的文本可能会也可能不会包含原始 HTML 代码中的缩进。

```HTML
<div id="content">
  <p>This is a <strong>paragraph</strong> with a list following it.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>


This is a paragraph with a list following it.
Item 1
Item 2
Item 3
```

还有一个和 innerText 类似的属性：textContent，textContent 也可以返回元素中的文本或者向元素中写入文本。innerText 与 textContent 返回的内容并不完全一样。 比如，innerText 会忽略行内的样式和脚本，而 textContent 则会像返回其他文本一样返 回行内的样式和脚本代码。

### outerText 属性

除了作用范围扩大到了包含调用它的节点之外，outerText 与 innerText 基本上没有多大区别。 在读取文本值时，outerText 与 innerText 的结果完全一样。但在写模式下，outerText 就完全不同了。outerText 不只是替换调用它的元素的子节点，而是会替换整个元素（包括子节点）。

### 滚动

除了上面提到的 scrollIntoView，还有一些其他和页面滚动相关的方法。

* scrollIntoViewIfNeeded(alignCenter)：只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。 如果将可选的 alignCenter 参数设置为 true，则表示尽量将元素显示在视口中部（垂直方向）。
* scrollByLines(lineCount)：将元素的内容滚动指定的行高，lineCount 值可以是正值， 也可以是负值。
* scrollByPages(pageCount)：将元素的内容滚动指定的页面高度，具体高度由元素的高度决 定。

scrollIntoView() 和 scrollIntoViewIfNeeded() 的作用对象是元素的容器，而 scrollByLines() 和 scrollByPages() 影响的则是元素自身。

以上方法不具有通用性，并不是在所有的浏览器中都可用，建议使用时做响应的检测。

## 原生拖放

### 使元素可拖放

默认情况下，图像、链接和文本是可以拖动的，也就是说，不用额外编写代码，用户就可以拖动它们。文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。HTML5 为所有 HTML 元素规定了一个 draggable 属性，表示元素是否可以拖动。要想让其他元素可拖动，或者让图像或链接不能拖动，都可以设置这个属性。

```html
<!-- 让这个图像不可以拖动 -->
<img src="smile.gif" draggable="false" alt="Smiley face">

<!-- 让这个元素可以拖动 -->
<div draggable="true">...</div>
```

### 拖放事件

拖放事件是元素在被拖放过程中所触发的事件，通过拖放事件，可以控制拖放相关的各个方面。拖动某元素时，将依次触发下列事件：

1. dragstart
2. drag
3. dragend

按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发 dragstart 事件。拖动开始时，可以通过 ondragstart 事件处理程序来运行 JavaScript 代码。触发 dragstart 事件后，随即会触发 drag 事件，而且在元素被拖动期间会持续触发该事件。这个事件与 mousemove 事件相似，在鼠标移动过程中，mousemove 事件也会持续发生。当拖动停止时（无论是把元素放到了有效的放置目标，还是放到了无效的放置目标上），会触发 dragend 事件。

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生：

1. dragenter

2. dragover

3. dragleave 或 drop

只要有元素被拖动到放置目标上，就会触发 dragenter 事件（类似于 mouseover 事件）。紧随其后的是 dragover 事件，而且在被拖动的元素还在放置目标的范围内移动时，就会持续触发该事件。如果元素被拖出了放置目标，dragover 事件不再发生，但会触发 dragleave 事件（类似于 mouseout 事件）。如果元素被放到了放置目标中，则会触发 drop 事件而不是 dragleave 事件。

### 数据传递

为了在拖放操作时实现数据交换，我们可以使用 dataTransfer 对象，它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。dataTransfer 对象有两个主要方法：getData()和 setData()，getData()可以取得由 setData()保存的值。

```JavaScript
//设置和接收文本数据
event.dataTransfer.setData("text", "some text");
var text = event.dataTransfer.getData("text");
```

此外，dataTransfer 还有一个 files 属性，包含了拖放操作的文件对象，可以通过 files 属性获取拖放的文件。

```JavaScript
var dt = event.dataTransfer;
var files = dt.files;
var count = files.length;
output("File Count: " + count + "\n");
```

### 拖放行为效果

当我们拖放不同的对象，浏览器可能会为不同的行为展现不同的效果，比如为一个链接展示分享的效果。

利用 dataTransfer 对象，可不光是能够传输数据，还能通过它来确定被拖动的元素以及作为放置目标的元素能够接收什么操作。为此，需要访问 dataTransfer 对象的两个属性：dropEffect 和 effectAllowed。

其中，通过 dropEffect 属性可以知道被拖动的元素能够执行哪种放置行为。这个属性有下列 4 个可能的值。

* "none"：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
* "move"：应该把拖动的元素移动到放置目标。
* "copy"：应该把拖动的元素复制到放置目标。
* "link"：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 URL）。

在把元素拖动到放置目标上时，以上每一个值都会导致光标显示为不同的符号。然而，要怎样实现 光标所指示的动作完全取决于你。换句话说，如果你不介入，没有什么会自动地移动、复制，也不会打开链接。总之，浏览器只能帮你改变光标的样式，而其他的都要靠你自己来实现。要使用 dropEffect 属性，`必须在 ondragenter 事件处理程序中针对放置目标来设置它`。

dropEffect 属性只有搭配 effectAllowed 属性才有用。effectAllowed 属性表示允许拖动元素的哪种 dropEffect，effectAllowed 属性可能的值如下。

* "uninitialized"：没有给被拖动的元素设置任何放置行为。
* "none"：被拖动的元素不能有任何行为。
* "copy"：只允许值为"copy"的 dropEffect。
* "link"：只允许值为"link"的 dropEffect。
* "move"：只允许值为"move"的 dropEffect。
* "copyLink"：允许值为"copy"和"link"的 dropEffect。
* "copyMove"：允许值为"copy"和"move"的 dropEffect。
* "linkMove"：允许值为"link"和"move"的 dropEffect。
* "all"：允许任意 dropEffect。

### 一个例子 🌰

实现列表元素可以拖拽排序

```html
<ul id="list">
  <li draggable="true">drag1</li>
  <li draggable="true">drag2</li>
  <li draggable="true">drag3</li>
  <li draggable="true">drag4</li>
  <li draggable="true">drag5</li>
</ul>
```

```JavaScript
var list = document.getElementById('list');
var lis = document.getElementsByTagName('li');
// 保存拖放目标
var over;
// 保存拖放的元素
var drag;
Array.prototype.forEach.call(lis, li => {
  li.addEventListener("dragstart", (e) => {
    console.log(e.dataTransfer);
    drag = e.target;
    e.dataTransfer.effectAllowed = 'move';
  }, false);

  li.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (e.target === over) return;
    over = e.target;
  });

  li.addEventListener("dragend", (e) => {
    if (over === list.lastElementChild) {
      list.appendChild(drag);
    } else {
      list.insertBefore(drag, over);
    }
  });
});
```
