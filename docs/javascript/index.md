---
id: index
title: JavaScript
---

## JavaScript 延迟加载

有些 JS 代码并非页面初始化的时候就立刻需要的，而是稍后某些情况才需要的。

- 异步加载的方案：动态插入 script 标签
- 通过 ajax 获取代码，然后通过 `eval` 执行（不推荐，不安全，非常耗性能）
- script 标签上添加 defer 或 async 属性
- 创建并插入 iframe，让它异步执行 JS

## for...in 和 for...of

1.  推荐在循环对象属性的时候，使用`for...in`，在遍历数组的时候的时候使用`for...of`。
2.  `for...in`循环出的是 key，`for...of`循环出的是 value
3.  注意，`for...of`是 ES6 新引入的特性。修复了 ES5 引入的`for...in`的不足。
4.  `for...of` 不能循环普通的对象（报错），需要通过和`Object.keys()`搭配使用。
