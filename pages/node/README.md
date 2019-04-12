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

## 内存

### 查看内存使用情况

使用 `process.memoryUsage()` 可以看到 Node 进程的内存占用情况（单位 Byte）

```
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472,
  external: 49879
}
```

`heapTotal` 和 `heapUsed` 对应了 V8 的堆内存使用情况，`rss` 是 resident set size 的缩写，即进程的常驻内存部分。`external` 是指绑定到 V8 管理的 JavaScript 对象上的 C++ 对象的内存使用情况。

TODO: 搞清堆和栈的区别
> The heap is where objects, strings, and closures are stored. Variables are stored in the stack and the actual JavaScript code resides in the code segment.
>
> https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for

### 堆外内存

通过 process.memoryUsage() 的结果可以看到，堆中的内存用量总是小于进程的常驻内存 量，这意味着 Node 中的内存使用并非都是通过 V8 进行分配的。我们将那些不是通过 V8 分配的内 存称为堆外内存。

是 Buffer 对象不同于其他对象，它不经过V8的内存分配机制，所以也不会有堆内存的大小限制。

### 内存泄漏

内存泄漏的情况，其实质只有一个，那就是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象。通常，造成内存泄漏的原因有如下几个

1. 缓存：慎将内存当做缓存，为了解决缓存中的对象永远无法释放的问题，需要加入一种策略来限制缓存的无限增长，参考：[https://github.com/isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)。采用进程外缓存，如，Redis、Memcached，进程自身不存储状态。注意模块缓存，由于模块的缓存机制，模块是常驻老生代的。在设计模块时，要十分小心内存泄漏的出现。
2. 队列消费不及时：关注队列状态，及时处理堆积。
3. 作用域未释放：闭包等。

### 相关文章

- [2017，我们来聊聊 Node.js](https://cnodejs.org/topic/58eee565a92d341e48cfe7fc)
- [迷茫时学习 Node.js 最好的方法](https://cnodejs.org/topic/59c75a3dd7cbefc511964688)
- [狼叔回复的《Node相比传统服务端技术栈好在哪里？》](https://cnodejs.org/topic/5a328967d92f2f5b185ace96)
- [Learn Node.js from Top 50 Articles for the Past Year (v.2019)](https://medium.mybridge.co/learn-node-js-from-top-50-articles-for-the-past-year-v-2019-2ec0a6a2cfa2)