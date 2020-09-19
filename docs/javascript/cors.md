---
id: cors
title: 跨域请求
---

## 什么是跨域

说起跨域，我们要先说浏览器的同源策略。同源策略是指处于安全原因，浏览器只允许网页中的脚本访问相同源（协议相同，域名相同，端口相同）下的资源。当一个资源从与该资源本身所在的服务器不同的域请求另一个资源时，资源会发起一个跨域 HTTP 请求。

跨域并非不一定是浏览器限制了发起跨站请求，而也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。域仅仅是通过 URL 的首部来识别，而 **不会去尝试判断两个域是否在同一个 IP 上**。

```JavaScript
URL                      说明       是否允许通信
http://www.a.com/a.js
http://www.a.com/b.js     同一域名下   允许

http://www.a.com/lab/a.js
http://www.a.com/script/b.js 同一域名下不同文件夹 允许

http://www.a.com:8000/a.js
http://www.a.com/b.js     同一域名，不同端口  不允许

http://www.a.com/a.js
https://www.a.com/b.js 同一域名，不同协议 不允许

http://www.a.com/a.js
http://70.32.92.74/b.js 域名和域名对应 ip 不允许

http://www.a.com/a.js
http://script.a.com/b.js 主域相同，子域不同 不允许（cookie 这种情况下也不允许访问）
```

## 同源策略限制了什么

- Cookie、LocalStorage 和 IndexDB 无法读取。
  > 在域名相同，端口不同的情况下，Cookie 可以共享。
- DOM 无法获得。
- AJAX 请求不能发送。

## 实现跨域的方法

### 1. 通过 document.domain 跨域

当页面存在 `iframe` 标签，并且 `iframe` 请求的域名和网页的域名的主域名相同时，可以通过设置 `documnet.domain` 来实现，我有两个网页，A 网页是 `http://a.example.com/a.html`，B 网页是 `http://b.example.com/b.html`。只要设置 `document.domain` 为两个域名的超域名（更高一级的域名），两个网页就可以共享 `Cookie`，当使用 `iframe` 时，包含 `iframe` 的网页可以通过脚本访问 `iframe` 所链接网页的内容。

```JavaScript
// 设置共同的 domain
document.domain = 'mydomainc.com';
// A 页面设置 cookie
document.cookie = 'a=atest';
// B 页面读取 cookie
var cookie = document.cookie;
```

> **📋NOTE:**
>
> 这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法规避同源政策，而要使用下文介绍的 PostMessage API。

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如 `.example.com`。

```shell
Set-Cookie: key=value; domain=.example.com; path=/
```

这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。

### 2. 通过 window.name 跨域

window 对象有个 name 属性，该属性有个特征：即在一个窗口 (window) 的生命周期内，窗口载入的所有的页面都是共享一个 window.name 的，每个页面对 window.name 都有读写的权限，window.name 是持久存在一个窗口载入过的所有页面中的。window.name 属性的神奇之处在于 name 值在不同的页面（甚至不同域名）加载后依旧存在（如果没修改则值不会变化），并且可以支持非常长的字符串。

比如，一个页面中内嵌了一个 iframe

```HTML
<iframe id="iframe" src="http://b.mydomainc.com/b.html" frameborder="0"></iframe>
```

在 `iframe` 需要加载的页面 `http://b.mydomainc.com/b.html` 中设置 `window.name` 为 `inner`。

```JavaScript
window.name = 'inner';
```

在父页面中写入如下代码：

```JavaScript
var iframe = document.getElementById('iframe');
var data = '';

// iframe 的 window 对象和父页面的 window 对象是不同的
iframe.onload = function () {
  iframe.onload = function () {
     data = iframe.contentWindow.name;
     console.log(window.name); // inner
   }
  // iframe 的源替换成同源的，以读取 iframe 的 window 对象
  iframe.src = 'about:blank';
};
```

这样，就可以在父页面中读取子页面传递的信息了。

### 3. 通过 location 对象的 hash 属性跨域

URL 有一部分被称为 `hash`，就是 # 号及其后面的字符，它一般用于浏览器锚点定位。HTTP 请求过程中不会携带 hash，所以这部分的修改不会产生 HTTP 请求，但是会产生浏览器历史记录。父窗口可以对 iframe 进行 URL 读写，iframe 也可以读写父窗口的 URL。基于以上的原理，可以利用改变 URL 的 hash 部分来进行双向通信， 每个 window 通过改变其他 window 的 location 来发送消息，并通过监听自己的 URL 的变化来接收消息。

这个方式的通信会造成一些不必要的浏览器历史记录，而且有些浏览器不支持 `onhashchange` 事件，需要轮询来获知 URL 的改变，最后，这样做也存在缺点，诸如数据直接暴露在了 URL 中，数据容量和类型都有限等。

父窗口传递信息到子窗口

```JavaScript
var src = originURL + '#' + data;
document.getElementById('iframe').src = src;
```

子窗口传递信息到父窗口

```JavaScript
// 由于两个页面不在同一个域下 IE、Chrome 不允许修改 parent.location.hash 的值
// 所以要借助于父窗口域名下的一个代理 iframe
try {
    parent.location.hash = 'data';
} catch (e) {
    // ie、chrome 的安全机制无法修改 parent.location.hash
    var ifrproxy = document.createElement('iframe');
    ifrproxy.style.display = 'none';
    ifrproxy.src = "http://www.parentdomain.com/proxy.html#data";
    document.body.appendChild(ifrproxy);
}
```

proxy.html 页面的关键代码如下

```JavaScript
// 因为 parent.parent（即 parentdomain.com/a.html）和 parentdomain.com/proxy.html 属于同一个域
// 所以可以改变其 location.hash 的值
parent.parent.location.hash = self.location.hash.substring(1);
```

窗口通过监听 haschange 事件得到通知

```JavaScript
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

### 4. 通过 HTML5 的 window.postMessage 跨域

HTML5 引入了一个全新的 API：跨文档通信 API（Cross-document messaging）。这个 API 为 window 对象新增了一个 window.postMessage 方法，允许跨窗口通信，不论这两个窗口是否同源。 Internet Explorer 8+, Chrome，Firefox , Opera 和 Safari 都支持这个功能。但是 Internet Explorer 8 和 9 以及 Firefox 6.0 和更低版本仅支持字符串作为 postMessage 的消息。

例如，窗口 A `http://a.mydomainc.com` 向窗口 B `http://b.mydoaminc.com/b.html` 发消息，调用 postMessage 方法就可以了。

```JavaScript
var popup = window.open('http://b.mydomainc.com/b.html');
// 打开新的窗口后，延迟一段时间，等待加载完成再发送消息
setTimeout(function () {
  popup.postMessage('Hello Message', 'http://b.mydomainc.com/b.html');
}, 1000);
```

postMessage 方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即 "协议 + 域名 + 端口"。也可以设为 \*，表示不限制域名，向所有窗口发送。

当在窗口 A 中通过 iframe 加载页面 `http://b.mydoaminc.com/b.html` 时：

```JavaScript
var iframe = document.getElementById('iframe');
iframe.onload = function () {
  iframe.contentWindow.postMessage('Hello Message', 'http://b.mydomainc.com');
};
```

在页面中接受消息

```JavaScript
window.addEventListener('message', function (e) {
  console.log(e.data);
}, false);
```

### 5. 通过 JSONP 跨域

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

它的基本思想是，网页通过添加一个 `<script>` 元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入 `<script>` 元素，由它向跨源网址发出请求。

```JavaScript
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is:' + data.ip);
};
```

上面代码通过动态添加 `<script>` 元素，向服务器 `example.com` 发出请求。注意，该请求的查询字符串有一个 `callback` 参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

```JavaScript
foo({
  "ip": "8.8.8.8"
});
```

由于 `<script>` 元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了 `foo` 函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用 `JSON.parse` 的步骤。

JSONP 的缺点是它只支持 `GET` 请求而不支持 `POST` 等其它类型的 `HTTP` 请求。它只支持跨域 `HTTP` 请求这种情况，不能解决不同域的两个页面之间如何进行 JavaScript 调用的问题。

### 6. 通过 WebSocket 跨域

WebSocket 是 HTML5 的一种新的通信协议，使用 `ws://`（非加密）和 `wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

以下代码利用了 `socket.io` 库进行展示

```JavaScript
var iosocket = io.connect('http://127.0.0.1:1234/'),
$ul = $("ul"),
$input = $("input");

iosocket.on('connect', function () {  // 接通处理
  $ul.append($('<li > 连上啦</li>'));

  iosocket.on('message', function (message) {  // 收到信息处理
    $ul.append($('<li></li>').text(message));
  });
  iosocket.on('disconnect', function () { // 断开处理
    $ul.append('<li>Disconnected</li>');
  });
});

$input.keypress(function (event) {
  if (event.which == 13) { // 回车
    event.preventDefault();
    iosocket.send($input.val());
    $input.val('');
  }
});
```

```JavaScript
var io = require('socket.io');
var server = require("http").createServer(function(req,res){
    res.writeHead(200, { 'Content-type': 'text/html'});
}).listen(1234);

io.listen(server).on('connection', function (client) {
    client.on('message', function (msg) { // 监听到信息处理
        console.log('Message Received:', msg);
        client.send('服务器收到了信息：'+ msg);
    });
    client.on("disconnect", function() { // 断开处理
        console.log("Server has disconnected");
    })
});
```

### 7. 通过 CORS 跨域

`CORS(Cross-Origin Resource Sharing)` 跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。`CORS` 背后的基本思想就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10。整个 `CORS` 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，`CORS` 通信与同源的 AJAX 通信基本没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

#### 两种请求

浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求。

- 请求方法是以下三种方法之一
  - HEAD
  - GET
  - POST
- HTTP 的头信息不超出以下几种字段：
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

凡是不同时满足上面两个条件，就属于非简单请求。浏览器对这两种请求的处理，是不一样的。

#### 基本流程

对于简单请求，浏览器直接发出 CORS 请求。在头信息之中，增加一个 Origin 字段，Origin 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 `Access-Control-Allow-Origin` 字段（详见下文），就知道出错了，从而抛出一个错误，被 `XMLHttpRequest` 的 `onerror` 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200。

如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```text
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与 CORS 请求相关的字段，都以 `Access-Control-` 开头。

**Access-Control-Allow-Origin**

> 该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个 \*，表示接受任意域名的请求。

**Access-Control-Allow-Credentials**

> 该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可。

**Access-Control-Expose-Headers**

> 该字段可选。CORS 请求时，XMLHttpRequest 对象的 getResponseHeader()方法只能拿到 6 个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回 FooBar 字段的值。

#### withCredentials 属性

上面说到，CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段。

```text
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在 AJAX 请求中打开 withCredentials 属性。

```JavaScript
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。

需要注意的是，如果要发送 Cookie，Access-Control-Allow-Origin 就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

#### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或者 `Content-Type` 字段的类型是 `application/json`。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为 "预检" 请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。

"预检" 请求用的请求方法是 OPTIONS，表示这个请求是用来询问的。服务器收到 "预检" 请求以后，检查了 `Origin`、`Access-Control-Request-Method` 和 `Access-Control-Request-Headers` 字段以后，确认允许跨源请求，就可以做出回应。

更多关于 CORS 请看参考链接。

### 参考

- [Cross-Origin Resource Sharing(CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [前端跨域整理](https://segmentfault.com/a/1190000007326671)
- [浅谈 WEB 跨域的实现（前端向）](http://www.cnblogs.com/vajoy/p/4295825.html#it3) WebSocket 部分
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [CORS——跨域请求那些事儿](https://yq.aliyun.com/articles/69313)
