# 进程

Node 是单线程的，存在对多核心 CPU 计算能力利用不足的问题。为了最大限度的利用计算资源，可以启动多个进程，理想状态下每个进程各自利用一个 CPU，以此实现多核 CPU 的利用。Node 提供了 `child_process` 模块，并且也提供了 `child_process.fork()` 函数实现进程的复制。

一个简单的例子

```js
var fork = require('child_process').fork;
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
    fork('./worker.js');
}
```

https://xo.tn/link/9obWbMBnt2Z35i3T?mu=0