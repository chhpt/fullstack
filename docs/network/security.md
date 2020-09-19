---
id: security
title: 网络安全
---


## 会话劫持（Session hijacking）

一种通过获取用户 Session ID 后，使用该 Session ID 登录目标账号的攻击方法，此时攻击者实际上是使用了目标账户的有效 Session。会话劫持的第一步是取得一个合法的会话标识来伪装成合法用户，因此需要保证会话标识不被泄漏。网络嗅探攻击，是通过捕获网络通信数据得到 Session ID 的，这种攻击可以通过 SSL 避免。

防御方法：

* 更改 Session 名称。PHP 中 Session 的默认名称是 PHPSESSID，此变量会保存在 Cookie 中，如果攻击者不分析站点，就不能猜到 Session 名称，阻挡部分攻击。
* 关闭透明化 Session ID。透明化 Session ID 指当浏览器中的 Http 请求没有使用 Cookie 来存放 Session ID 时，Session ID 则使用 URL 来传递。目前有三种广泛使用的在 Web 环境中维护会话（传递 Session ID）的方法：URL 参数，隐藏域和 Cookie。其中每一种都各有利弊，Cookie 已经被证明是三种方法中最方便最安全的。使用 Cookie 而产生的一个风险是用户的 Cookie 会被攻击者所盗窃。如果 Session ID 保存在 Cookie 中，Cookie 的暴露就是一个严重的风险，因为它能导致会话劫持。
* 设置 HttpOnly。通过设置 Cookie 的 HttpOnly 为 true，可以防止客户端脚本访问这个 Cookie，从而有效的防止 XSS 攻击。
* 关闭所有 phpinfo 类 dump request 信息的页面。利用 PHP 开发的应用会有一个 phpinfo 页面。而这个页面会 dump 出请求信息，其中就包括 Cookie 信息。如果开发者没有关闭这个页面，就可以利用 XSS 漏洞向这个页面发起异步请求，获取到页面内容后 Parse 出 Co   okie 信息，然后上传给攻击者。为了调试方便，任何 dump 请求的页面都是可以被利用的漏洞。

## XSS 跨站脚本攻击

### XSS 的原理

XSS 攻击指的是攻击者往 Web 页面里插入恶意 html 标签或者 JavaScript 代码。比如：攻击者在论坛中放一个看似安全的链接，骗取用户点击后，窃取 cookie 中的用户私密信息；或者攻击者在论坛中加一个恶意表单，当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。

### XSS 的防范方法

* 代码里对用户输入的地方和变量都需要仔细检查长度和对用户输入的内容进行过滤
* 建立 DOM 解析白名单，对用户输入的 HTML 文本进行 DOM 解析，重新构建 HTML 元素树。构建的过程中，所有的标签、属性都只从白名单中拿取。
* 避免直接在 cookie 中泄露用户隐私，例如 email、密码等等。
* 通过使 cookie 和系统 ip 绑定来降低 cookie 泄露后的危险。这样攻击者得到的 cookie 没有实际价值，不可能拿来重放。
* 尽量采用 POST 而非 GET 提交表单。

## CSRF 跨站请求伪造

CSRF 伪造请求，冒充用户在站内的正常操作。通过 XSS 或链接欺骗等途径，让用户在本机（即拥有身份 cookie 的浏览器端）发起用户所不知道的请求。

## XSS 与 CSRF（跨站请求伪造）有什么区别吗

XSS 是获取信息，不需要提前知道其他用户页面的代码和数据包。

CSRF 是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。

要完成一次 CSRF 攻击，受害者必须依次完成两个步骤： 1. 登录受信任网站 A，并在本地生成 Cookie。 2. 在不登出 A 的情况下，访问危险网站 B。

## CSRF(Cross-site request forgery)的防御

### 验证 HTTP Referer 字段

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站。

### 在请求地址中添加 token 并验证

要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

### 在 HTTP 头中自定义属性并验证

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。

### 验证码或密码

对于比较重要的操作，比如付款，转账等，可以采用随机验证码或者让用户再次输入密码等。

### 参考

* [总结 XSS 与 CSRF 两种跨站攻击](https://blog.tonyseek.com/post/introduce-to-xss-and-csrf/)
* [CSRF 攻击的应对之道](https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/)

## SQL 注入

就是通过把 SQL 命令插入到 Web 表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的 SQL 命令。总的来说有以下几点： 1.永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双"-"进行转换等。 2.永远不要使用动态拼装 SQL，可以使用参数化的 SQL 或者直接使用存储过程进行数据查询存取。 3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。 4.不要把机密信息明文存放，请加密或者 hash 掉密码和敏感的信息。