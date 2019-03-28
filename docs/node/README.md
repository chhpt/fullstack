# Node 简介

简单的说 Node.js 就是运行在服务端的 JavaScript。
Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台，用于方便地搭建响应速度快、易于扩展的网络应用。
Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 JavaScript 的速度非常快，性能非常好，非常适合在分布式设备上运行数据密集型的实时应用。

## 创建 Node.js 的 HTTP 服务器

第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
接下来我们调用 http 模块提供的函数 createServer：传入函数通过 request, response 参数来接收和响应数据；返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个 HTTP 服务器监听的端口号。
Node.js 也是单线程的 Event Loop，但是它的运行机制不同于浏览器环境。
有关方法：process.nextTick()指定的回调函数是在当前"执行栈"的尾部触发，而 setImmediate()指定的是在下次"事件循环"触发，这与 setTimeout(fn, 0)很像。所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。

## 全局对象

- process
- Buffer
- Timers：setTimeout，setImmediate，setInterval

## 优秀文章

- [2017，我们来聊聊 Node.js](https://cnodejs.org/topic/58eee565a92d341e48cfe7fc)
- [迷茫时学习Node.js最好的方法](https://cnodejs.org/topic/59c75a3dd7cbefc511964688)
- [狼叔回复的《Node相比传统服务端技术栈好在哪里？》](https://cnodejs.org/topic/5a328967d92f2f5b185ace96)