# DOM

## 事件模型

### DOM0 级事件模型

又称为原始事件模型，在该模型中，事件不会传播，即没有事件流的概念。事件绑定监听函数比较简单, 有两种方式:

```JavaScript
// 方式一
// 将事件直接通过属性绑定在元素上
<button onclick="clickBtn()"></button>

// 方式二
// 获取到元素后，通过 onclick 等事件，将触发的方法指定为元素的事件
// 取消该事件可直接设置为 null
var btn = document.getElementById('btn');
btn.onclick = function () {...};
btn.onclick = null;
```

### IE 事件模型

IE 事件模型一共有两个阶段：

* 事件处理阶段：事件在达到目标元素时，触发监听事件
* 事件冒泡阶段：事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

绑定和移除事件的方法如下：

```JavaScript
// 绑定事件
el.attachEvent(eventType, handler)

// 移除事件
el.detachEvent(eventType, handler)

// 例子
var btn = document.getElementById('btn');
btn.attachEvent('onclick', showMessage);
btn.detachEvent('onclick', showMessage);
```

eventType 是如 onclick 一样的带有 `on` 的事件，绑定事件时，handler 可以是具名函数，也可以是匿名函数，但是匿名函数无法移除。

IE 事件模型仅在 IE 浏览器中有效，不兼容其他浏览器。

### DOM2 级事件模型

W3C 标准模型，也是我们频繁使用的事件模型，除 IE6-8 以外的所有现代浏览器都支持该事件模型。

DOM2 级事件模型共有三个阶段：

* 事件捕获阶段：事件从 document 向下传播到目标元素，依次检查所有节点是否绑定了监听事件，如果有则执行。
* 事件处理阶段：事件在达到目标元素时，触发监听事件。
* 事件冒泡阶段：事件从目标元素冒泡到 document，并且一次检查各个节点是否绑定了监听函数，如果有则执行。

相对于 IE 事件模型，多了**事件捕获阶段**，我们可以在其 API 中设置是在事件捕获阶段还是冒泡阶段再触发监听事件

```JavaScript
// 事件绑定监听函数
addEventListener(eventType, handler, useCapture);

// 事件移除监听函数
removeEventListener(eventType, handler, useCapture);

var btn = document.getElementById('.btn');
btn.addEventListener(‘click’, showMessage, false);
btn.removeEventListener(‘click’, showMessage, false);
```

* eventType 指定事件类型 (不要加 on)
* handler 是事件处理函数
* useCapture 是一个 boolean 用于指定是否在捕获阶段进行处理，一般设置为 false 与 IE 浏览器保持一致。

### 处理顺序的问题

有以下代码：

```html
<ul id="list">
  <li id="li1">测试</li>
</ul>
<script>
  var list = document.querySelector('#list');
  var test = document.querySelector('#li1');
  list.addEventListener('click', () => console.log('list'), false);
  test.addEventListener('click', () => console.log('li1'), false);
</script>
```

我们指定 `addEventListener` 的 `useCapture` 的值（默认为 false）为 false，与 IE 浏览器的行为一致，则在时间冒泡阶段执行监听函数，所以当点击`测试`时，打印的顺序为：`li1`，`list`。若指定 `useCapture` 为 true，则在事件捕获阶段执行监听函数，打印的顺序为：`list`，`li1`。

### 事件对象

当一个事件被触发时，会创建一个事件对象 (Event Object), 这个对象里面包含了与该事件相关的属性或者方法。该对象会作为第一个参数传递给监听函数。

DOM 事件模型中的事件对象常用属性:

* type 用于获取事件类型
* target 获取事件目标
* stopPropagation() 阻止事件冒泡
* preventDefault() 阻止事件默认行为

IE 事件模型中的事件对象常用属性:

* type 用于获取事件类型
* srcElement 获取事件目标
* cancelBubble 阻止事件冒泡
* returnValue 阻止事件默认行为

### 自定义事件

JS 中已经内置了很多事件，如 click, mouseover 等等，但是内置事件毕竟有限，有时候我们想自己定义一些事件，例如三连击，threeclick。如何实现自定义事件呢？

首先要创建一个事件。可以使用以下方式:

```JavaScript
var event = new Event('threeclick', {"bubbles":true, "cancelable":false});
```

然后我们需要为事件注册监听函数:

```JavaScript
target.addEventListener('threeclick', hello, false);
```

最后我们要在合适的时机触发该事件，我们可以使用 dispatchEvent 函数。该方法在当前节点触发指定事件，从而触发监听函数执行。该方法返回一个布尔值，只要有一个监听函数调用了 Event.preventDefault(), 则返回 false，否则返回 true。

```JavaScript
target.dispatchEvent(event);
```

自定义事件的机制如普通事件一样——监听事件，写回调操作，触发事件后执行回调。但不同的是，自定义事件完全由我们控制触发时机，这就意味着实现了一种 JavaScript 的解耦。我们可以把多个关联但逻辑复杂的操作利用自定义事件的机制灵活地控制好。

### 参考

* [JS 事件模型](https://segmentfault.com/a/1190000006934031#articleHeader6)

## 事件代理

当页面中存在大量元素，而且每一个都要一次或多次绑定事件处理器（比如 onclick）时，由于每绑定一个事件处理器都是有代价的，所以这种情况会随着 DOM 元素的增多而严重影响页面性能。

一个简单而优雅的处理 DOM 事件的技术是事件代理（event delegation）机制。它是基于这样一个事实：事件逐层冒泡并能被父级元素捕获。使用事件代理，只需给外层元素绑定一个处理器，就可以处理在其子元素上发出的所有事件。

例如对于以下代码，点击列表，输出文字。当不使用事件代理时，需要给每个 `<li>` 标签添加 `onclick` 事件。

```HTML
<ul id="demo">
  <li onclick="logText">Test</li>
  <li onclick="logText">Test</li>
  <li onclick="logText">Test</li>
</ul>
```

使用事件代理，就会非常简单：

```JavaScript
var demo = document.getElementById('demo');
demo.addEventListener('click', function(e){
  // 使用 target 获取触发事件的目标
  var li = e.target;
  // operations...
});
```

## Window 对象

所有浏览器都支持 window 对象。它表示浏览器窗口。在 node 中的全局变量是 global，可以通过该全局变量是否定义来判断宿主环境。
window 对象是 JS 中的顶级对象，所有定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法，在调用的时候可以省略 window。

## 获得计算后样式的方法

* w3c 标准 window.getComputedStyle(elemnet,[null\|pseudoElt)
* IE 浏览器 element.currentStyle
