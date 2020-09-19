---
id: performance
title: 性能
---

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

是 Buffer 对象不同于其他对象，它不经过 V8 的内存分配机制，所以也不会有堆内存的大小限制。

### 内存泄漏

内存泄漏的情况，其实质只有一个，那就是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象。通常，造成内存泄漏的原因有如下几个

1. 缓存：慎将内存当做缓存，为了解决缓存中的对象永远无法释放的问题，需要加入一种策略来限制缓存的无限增长，参考：[https://github.com/isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)。采用进程外缓存，如，Redis、Memcached，进程自身不存储状态。注意模块缓存，由于模块的缓存机制，模块是常驻老生代的。在设计模块时，要十分小心内存泄漏的出现。
2. 队列消费不及时：关注队列状态，及时处理堆积。
3. 作用域未释放：闭包等。
