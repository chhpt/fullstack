# webpack 入门二

[上一篇文章](./webpack_1.md)中我们简单介绍了 webpack 的作用和使用方法，接下来我们将深入 webpack，了解它的更多功能。

## webpack 的核心概念

* 入口 (entry)
* 输出 (output)
* loader
* 插件 (plugins)

 上一篇文章中提到了  这些基本概念，但是没有做详细说明，也许你能理解这些概念亦或是不能，都没有关系，下面我们将详细介绍这些概念。

### 入口 (entry)

入口起点 (entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。每个依赖项随即被处理，最后输出到输出文件中。

可以通过在 webpack 配置中配置 entry 属性，来指定一个或多个入口起点。

```JavaScript
// 单个入口
module.exports = {
  entry: 'src/main.js'
};

// 多个入口
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

### 出口 (output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

```JavaScript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面的例子中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack 打包文件的名称，以及我们想要把生成文件放到哪里。

对于单个入口起点，filename 会是一个静态名称。然而，当通过多个入口起点 (entry point)、代码拆分(code splitting) 或各种插件 (plugin) 创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称：

```JavaScript
// 使用入口名称：
filename: "[name].bundle.js"

// 使用内部 chunk id
filename: "[id].bundle.js"

// 使用每次构建过程中，唯一的 hash 生成
filename: "[name].[hash].bundle.js"

// 使用基于每个 chunk 内容的 hash：
filename: "[chunkhash].bundle.js"
```

```JavaScript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
```

## loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

loader 类似于其他构建工具中 “任务 (task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件。

本质上，webpack loader 是将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

我们可以在 module.rules 中定义 loader，并指明 test 和 use 属性：

* test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
* use 属性，表示进行转换时，应该使用哪个 loader。

举个例子：

```JavaScript
const path = require('path');

const config = {
  entry: 'src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

上面的配置中，当 webpack 遇到 txt 文件时，就会调用 raw-loader 对 txt 文件进行处理。

另外，当我们需要对某种文件类型进行多重处理时，可以在 module.rules 里指定多个 loader：

```JavaScript
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
          }
        ]
      }
    ]
  }
```

loader 通过预处理函数，为 JavaScript 生态系统提供了更多能力，用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和其他更多。

### loader 的一些特性

* loader 支持链式传递。能够对资源使用流水线 (pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于对 loader 传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件 (plugin) 可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

## 插件 (plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项 (option) 自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),  // 内置插件
    new HtmlWebpackPlugin({template: './src/index.html'}) // 自定义的引入插件
  ]
};

module.exports = config;
```
