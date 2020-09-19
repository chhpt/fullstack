---
id: loader
title: Webpack Loader
---

## 什么是 Loader

Loader 用于对模块的源代码进行准换，可以看作具有文件转换功能的翻译员，Loader 运行时可以根据规则接受文件数据，对文件数据进行处理，再返回处理好的数据。Loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，Loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件。

## 使用 Loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

## 编写 Loader

### 同步的 Loader

可以使用 return 或 this.callback 回传数据。

```js
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};

module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // always return undefined when calling callback()
};
```

### 异步的 Loader

同步的 Laoder 可能引发性能问题，所以最好使用异步 Loader 来处理资源。

```js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```

### 获取 options 选项

默认情况下，可以通过 this.query 获取 options 选项。

### 辅助工具

- [loader-utils](https://github.com/webpack/loader-utils#getoptions)

### 参考文档

- [Loader API](https://webpack.js.org/api/loaders/)
- [如何开发一个 Webpack Loader ( 一 )](http://www.alloyteam.com/2016/01/webpack-loader-1/)