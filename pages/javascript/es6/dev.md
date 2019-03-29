# ES6 开发环境配置

随着时间的推移，浏览器对 ES6 支持度已经越来越高了，超过 90% 的 ES6 语法特性都实现了。虽然有些浏览器对 ES6 的支持程度已经很高了（Chrome59 97%，Safari10 99%），但是很多人使用的 IE 对 ES6 的支持任然很不理想（IE11 11%），所以在实际工程应用中，我们还需要将 ES6 转化成 ES5。各大浏览器的最新版本，对 ES6 的支持可以查看[此处](https://kangax.github.io/compat-table/es6/)。

## 环境支持

Node 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node 已经实现的 ES6 特性。

```shell
node --v8-options | grep harmony
```

上面命令的输出结果，会因为版本的不同而有所不同。

## 转码

通过特定的转码器，如 babel，或在线的转换器，将 ES6 转换成 ES5 再进行部署。

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。相对于之前的 babel5,babel6 不再是一个整的大的 package, 而是拆分了很多个小的 packages 可供选择安装，可以根据项目进行自定义。下面介绍 babel 的开发环境的配置。

### 1. 命令行使用（手动编译）

#### 1. 安装 babel-cli

支持命令行使用 babel

```shell
npm install --save-dev babel-cli
```

完成之后，我们还不能编译 ES6 文件，因为 babel 不再包含任何 transform 功能，babel6 里把它们作为插件（plugin）分割出去，需要我们自己定义。

#### 2. 安装 babel-preset-env

要想编译 ES6 文件，我们必须安装相关的插件，babel-preset-env 打包了所有用于转换 ES6 的插件，安装 babel-preset-env:

```shell
npm install --save-dev babel-preset-env
```

babel 还有 babel-preset-es2015，babel-preset-es2016 等插件，每一年的 preset 仅编译那一年的批准的规则，而 babel-preset-env 则包含 es2015，es2016，es2017 和 latest。

#### 3. 配置

安装完 babel-preset-env 之后，还需要一步，在 package.json 或. babelrc 文件启用 babel-preset-env:

```json
"babel": {
 "presets": ["env"]
}
```

#### 4. 编译

完成以上安装后，就可以编译文件了：

```shell
# 转码结果输出到标准输出
babel example.js

# 转码结果写入一个文件 --out-file 或 -o 参数指定输出文件
babel example.js --out-file compiled.js

# 转码整个目录 --out-dir 或 -d 参数指定输出目录
babel src --out-dir lib

# 忽略 spec 和 test 文件
babel src --out-dir lib --ignore spec.js,test.js

# -s 参数生成 source map 文件
babel src -d lib -s
```

[更多选项](http://babeljs.io/docs/usage/cli/)

### 2. [Webstorm 编译（IDE）](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)

#### 1. 开启 ES6 语法支持

Webstorm 已经支持 ES6 语法了，但是默认情况下没有开启，需要我么手动开启，打开 settings->Languages & Frameworks->JavaScript 在选项中设置为 ES6。

![](https://s3-us-west-2.amazonaws.com/notion-static/98afff036241449d8e14f19f6d88f3da/Untitled)

#### 2. 安装 babel-cli 和 babel-preset-env

```shell
npm install --save-dev babel-preset-env babel-cli
```

#### 3. 配置 babel File Watcher

File Watcher 是一个 Webstorm 内置工具，可以在文件发生变化时自动执行命令行工具，对于 babel，已经有预存的配置，我们激活配置即可使用：

settings->Tools->File watchers

点击'+'按钮，选择 babel，在 File watcher 配置中，指定 babel-cli 在 node_modules 中的路径：

![](https://s3-us-west-2.amazonaws.com/notion-static/055b7c1ea93144e8b7f837e389690ad4/Untitled)

在 Webstorm 2017.1 中，编译过的文件存放在 dist 文件夹中。当然，你也可以在 package.json 或者. babelrc 配置文件中指定，添加适合你工程的配置。

### 3. VS Code 配置

1. 安装 babel-cli 和 babel-preset-env

    ```shell
    npm install --save-dev babel-cli babel-preset-env
    ```

2. 配置 package.json，设置生成 souremaps

    ```json
    {
        "scripts": {
            "build": "babel src -d dist --source-maps"
        }
    }
    ```

3. 在. vscode 目录下的 tasks.json 文件中写入如下配置，如果没有这个文件，就创建一个。

    ```json
    {
        "version": "0.1.0",
        "command": "npm",
        "isShellCommand": true,
        "showOutput": "always",
        "suppressTaskName": true,
        "tasks": [
            {
                "taskName": "build",
                // 此处第二个参数 "build" 要与上一步中的 scripts 中的编译脚本的名字一样
                "args": ["run", "build"],
                "isBuildCommand": true
            }
        ]
    }
    ```

4. 打开 `.vscode` 目录下的 `launch.json` 文件，在 `configurations` 中添加如下配置，通过使用 `preLaunchTask` 在启动前进行编译，如果没有 `launch.json` 文件，打开调试，在启动程序一栏，下拉，添加配置即可。

    ```json
        "configurations": [{
             "type": "node",
             "request": "launch",
             "name": "启动程序",
             "program": "${workspaceRoot}/src/index.js",
             "stopOnEntry": false,
             "args": [],
             "cwd": "${workspaceRoot}",
             "preLaunchTask": "build",
             "runtimeExecutable": null,
             "runtimeArgs": ["--nolazy"],
             "env": {
               "NODE_ENV": "development"
             },
             "sourceMaps": true,
             "outFiles": [
               "${workspaceRoot}/dist"
             ]
           }]

    ```

    ![](https://s3-us-west-2.amazonaws.com/notion-static/2201753df572490882dfa3750113e32c/Untitled)

5. 启动调试或者按 F5，就可以在输出目录下看到编译好的文件

### 4. 浏览器环境

Babel 也可以用于浏览器环境。但是，从 Babel 6.0 开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以使用 babel-standalone 模块提供的浏览器版本，将其插入网页。

 <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
 <script type="text/babel">
 // Your ES6 code
 </script>

注意，网页实时将 ES6 代码转为 ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

更多转换方法请参考 [《ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/intro)

### 5. 关于 Babel

#### 1. babel-node

babel-cli 工具自带一个 babel-node 命令，提供一个支持 ES6 的 REPL(Read-Eval-Print-Loop) 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

它不用单独安装，而是随 babel-cli 一起安装。然后，执行 babel-node 就进入 REPL 环境。

```shell
# 进入 REAL 环境
babel-node

# babel-node 命令可以直接运行 ES6 脚本 (.js 可以省略)
babel-node test.js

# babel-node 也可以安装在项目中
npm install --save-dev babel-cli
```

#### 2. babel-polyfill

这将模拟一个完整的 ES2015 + 环境，旨在用于应用程序而不是库 / 工具。Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。

举例来说，ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill，为当前环境提供一个垫片。

```shell
# 因为它是一个填充工具（在源码之前运行），所以它是一个 dependency，而不是 devDependency
npm install --save babel-polyfill

# 然后在程序的入口包含 polyfill，确保在其他引用声明之前调用
# node
require("babel-polyfill");
# es6
import("babel-polyfill");

```

当使用 webpack 时，在 webpack.config.js 文件的入口数组中添加

```js
// babel-polyfill
module.exports = {
    entry: ['babel-polyfill', './app/js']
};
```
