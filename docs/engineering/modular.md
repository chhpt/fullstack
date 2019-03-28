# 模块化

## 解释 JavaScript 模块模式

模块模式和我们平常所说的模块化的理念比较接近，但不仅仅是指依赖于 `module` 的实现。模块模式一般用来模拟类的概念（因为原生 JavaScript 并不支持类，虽然最新的 ES6 里引入了 Class 不过还不普及）这样我们就能把公有和私有方法还有变量存储在一个对象中——这就和我们在 Java 或 Python 里使用类的感觉一样。这样我们就能在公开调用 API 的同时，仍然在一个闭包范围内封装私有变量和方法。

## 模块化的优点

网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等...... 开发者不得不使用软件工程的方法，管理网页的业务逻辑。我们无法保证自己所写的代码与他人不发生冲突，同时处于可维护性，重用性等诸多方面的因素，我们需要某种 **类** 的理念来帮助我们管理我们的代码。

模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。模块化可以使你的代码低耦合，功能模块直接不相互影响。

### 主要优点

- **可维护性**：根据定义，每个模块都是独立的。良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护。维护一个独立的模块比起一团凌乱的代码来说要轻松很多。

- **命名空间**：在 JavaScript 中，最高级别的函数外定义的变量都是全局变量（这意味着所有人都可以访问到它们）。也正因如此，当一些无关的代码碰巧使用到同名变量的时候，我们就会遇到 “命名空间污染” 的问题。这样的问题在我们开发过程中是要极力避免的。

- **可复用性**：现实来讲，在日常工作中我们经常会复制自己之前写过的代码到新项目中。复制粘贴虽然很快很方便，但难道我们找不到更好的办法了么？要是…… 有一个可以重复利用的模块岂不妙哉？

## 模块模式的实现

### 匿名闭包函数

```js
(function() {
  // 在函数的作用域中下面的变量是私有的
  // 变量方法任然能访问全局变量
})();
```

通过这种构造，我们的匿名函数有了自己的作用域或闭包。这允许我们从父（全局）命名空间隐藏变量。这种方法的好处在于，你可以在函数内部使用局部变量，而不会意外覆盖同名全局变量，但仍然能够访问到全局变量。要注意的是，一定要用括号把匿名函数包起来，以关键词 function 开头的语句总是会被解释成函数声明（JS 中不允许没有命名的函数声明），而加上括号后，内部的代码就会被识别为函数表达式。其实这个也叫作立即执行函数（IIFE）。

### 引入全局变量

JavaScript 有个特性，称为隐性全局。使用变量名称时，解释器会从作用域向后寻找变量声明。如果没找到，变量会被假定入全局（以后可以全局调用）。如果会被分配使用，在还不存在时全局创建它。这意味着在匿名函数里使用全局变量很简单。不幸的是，这会导致代码难以管理，文件中不容易区分（对人而言）哪个变量是全局的。

幸好，匿名函数还有一个不错的选择。全局变量作为参数传递给匿名函数。将它们引入我们的代码中，既更清晰，又比使用隐性全局更快。

```js
(function(globalVariable) {
  // 在函数的作用域中下面的变量是私有的
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  };

  // 访问全局变量
  var a = globalVariable.a;

  // 通过全局变量设置下列方法的外部访问接口
  // 与此同时这些方法又都在函数内部
  globalVariable.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };
})(globalVariable);
```

### 模块的接口

```js
var GradesModule = (function() {
  // 在函数的作用域中下面的变量是私有的
  var myGrades = [93, 95, 88, 0, 55, 91];

  // 通过接口在外部访问下列方法
  // 与此同时这些方法又都在函数内部
  return {
    average: function() {
      var avg =
        myGrades.reduce(function(prev, current) {
          return prev + current;
        }) / myGrades.length;
      return avg;
    },

    getGrades: function() {
      return myGrades;
    }
  };
})();
```

我们声明了一个全局变量 `GradesModule`，暴露两个接口 `average` 和 `getGrades`，通过这两个接口，我们可以访问 `Grades` 的私有变量。

### 扩展

模块模式的一个限制是整个模块必须在一个文件里，但是在一些大型项目里，将一个功能分离成多个文件是非常重要的，因为可以多人合作易于开发。那么我们怎么在一个文件引入另一个文件的模块，而不对另一个模块造成影响呢？还好，我们有很好的办法扩充模块。（在扩充文件）首先我们引入模块（从全局），给他添加属性，再输出他。

```js
var MODULE = (function(my) {
  // 给引入的模块添加方法
  my.anotherMethod = function() {};
  return my;
})(MODULE);
```

### 松耦合扩展

上面的例子需要我们首先创建模块，然后扩充它，这并不总是必要的。提升 JavaScript 应用性能最好的操作就是异步加载脚本。因而我们可以创建灵活多部分的模块，可以将他们无顺序加载，以松耦合扩充。

```js
var MODULE = (function(my) {
  // add capabilities...
  return my;
})(MODULE || {});
```

通过这样的代码，** 每个单独分离的文件都保证这个结构 **，那么我们就可以实现任意顺序的加载，所以，这个时候的 `var` 就是必须要声明的，因为不声明，其它文件读取不到哦。

A.js 文件

```js
// 声明一个模块
var AModule = (function(module) {
  module.privateProperties = {};
  module.methods = function() {};
  return moudle;
})(AModule || {});
```

B.js 文件

```js
// 引入模块，并添加方法
var AModule = (function(module) {
  module.newMethods = function() {};
  return module;
})(AModule || {});
```

### 紧耦合扩充

虽然松耦合很不错，但模块上也有些限制，你不能重写模块属性（因为没有加载顺序）。初始化时也无法使用其他文件定义的模块属性（但你可以在初始化后运行）。紧耦合扩充意味着一组加载顺序，但是允许覆写。

```js
var MODULE = (function(my) {
  var old_moduleMethod = my.moduleMethod;
  my.moduleMethod = function() {
    // method override, has access to old through old_moduleMethod...
  };
  return my;
})(MODULE);
```

## CommonJS，AMD，UMD 和 ES6 的模块

上述的所有解决方案都有一个共同点：使用单个全局变量来把所有的代码包含在一个函数内，由此来创建私有的命名空间和闭包作用域。

虽然每种方法都比较有效，但也都有各自的短板。

有一点，作为开发者，你必须清楚地了解引入依赖文件的正确顺序。就拿 Backbone.js 来举个例子，想要使用 Backbone 就必须在你的页面里引入 Backbone 的源文件。

然而 Backbone 又依赖 Underscore.js，所以 Backbone 的引入必须在其之后。

而在工作中，这些依赖管理经常会成为让人头疼的问题。

另外一点，这些方法也有可能引起命名空间冲突。举个例子，要是你碰巧写了俩重名的模块怎么办？或者你同时需要一个模块的两个版本时该怎么办？

难道就没有不通过全局作用域来实现的模块方法么？

当然是有的。

接下来介绍两种广受欢迎的解决方案：CommonJS 和 AMD。

### [CommonJS](https://www.wikiwand.com/en/CommonJS)

CommonJS 是 **以在浏览器环境之外** 构建 JavaScript 生态系统为目标而产生的项目，比如在 **服务器** 和桌面环境中。CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

A 文件中定义模块

```js
function myModule() {
  this.hello = function() {
    return 'hello!';
  };

  this.goodbye = function() {
    return 'goodbye!';
  };
}

module.exports = myModule;
```

B 文件中引用模块

```js
var myModule = require('myModule');

var myModuleInstance = new myModule();
myModuleInstance.hello(); // 'hello!'
myModuleInstance.goodbye(); // 'goodbye!'
```

需要注意的一点是，CommonJS 以服务器优先的方式来同步载入模块，假使我们引入三个模块的话，他们会一个个地被载入。

它在服务器端用起来很爽，可是在浏览器里就不会那么高效了。毕竟读取网络的文件要比本地耗费更多时间，只要它还在读取模块，浏览器载入的页面就会一直卡着不动。

### [AMD](https://github.com/amdjs/amdjs-api/wiki)

CommonJS 已经挺不错了，但假使我们想要实现异步加载模块该怎么办？答案就是 `Asynchronous Module Definition（异步模块定义规范）`，简称 AMD。AMD 是为浏览器环境设计的，因为 CommonJS 模块系统是同步加载的，当前浏览器环境还没有准备好同步加载模块的条件。

AMD 定义了一套 JavaScript 模块依赖异步加载标准，来解决同步加载的问题。

模块通过 define 函数定义在闭包中，格式如下：

```js
define(id?: String, dependencies?: String[], factory: Function|Object);
```

id 是模块的名字，它是可选的参数。

dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]。factory 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值，函数将会使用载入的模块作为参数。

定义一个名为 myModule 的模块，它依赖 jQuery 模块：

```js
define('myModule', ['jquery'], function($) {
  // $ 是 jquery 模块的输出
  $('body').text('hello world');
});
```

```js
// 使用
require(['myModule'], function(myModule) {
  console.log(myModule.hello());
});
```

重申一下，不像 CommonJS，AMD 是优先浏览器的一种异步载入模块的解决方案。除了异步加载以外，AMD 的 另一个优点是你可以在模块里使用对象、函数、构造函数、字符串、JSON 或者别的数据类型，而 CommonJS 只支持对象。再补充一点，AMD 不支持 Node 里的一些诸如 IO, 文件系统等其他服务器端的功能。另外语法上写起来也比 CommonJS 麻烦一些。

### UMD

在一些同时需要 AMD 和 CommonJS 功能的项目中，你需要使用另一种规范：Universal Module Definition（通用模块定义规范）。

UMD 创造了一种同时使用两种规范的方法，并且也支持全局变量定义。所以 UMD 的模块可以同时在客户端和服务端使用。

### ES6 模块

上述的这几种方法都不是 JS 原生支持的。要么是通过模块模式来模拟，要么是使用 CommonJS 或 AMD.

幸运的是在 JS 的最新规范 ECMAScript 6 (ES6) 中，引入了模块功能。ES6 的模块功能汲取了 CommonJS 和 AMD 的优点，拥有简洁的语法并支持异步加载，并且还有其他诸多更好的支持。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

模块功能主要由两个命令构成：`export` 和 `import`。`export` 命令用于规定模块的对外接口，`import` 命令用于输入其他模块提供的功能。

A.js 文件

```js
var firstName = 'Michael';
var getName = function() {
  return firstName;
};

export { firstName, getName };
```

导入模块

```js
import { firstName, getName } from './A.js';
console.log(firstName); // Michael
```

这里只是简单的介绍 ES6 的模块语法，想深入了解的同学可以看 [这里](http://es6.ruanyifeng.com/#docs/module)。

### 参考

- [JavaScript 模块化入门 Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
- [深入理解 JavaScript 模块模式](http://colobu.com/2014/09/23/JavaScript-Module-Pattern-In-Depth/#%E6%A8%A1%E5%9D%97%E5%87%BA%E5%8F%A3)
- [模块系统的演进](http://zhaoda.net/webpack-handbook/module-system.html)
- [AMD 规范](http://zhaoda.net/webpack-handbook/amd.html)
- [Module 的语法](http://es6.ruanyifeng.com/#docs/module)

## Node 中的 require/exports 和 ES6 中的 import/export 区别

### 遵循的规范不同，语法不同

Node 中模块借鉴于 CommonJS 规范，ES6 的模块是标准的 ECMAScript 语法。

语法部分不做详细介绍，可以看看官方的介绍。

### 变量的加载

#### CommonJS

当导出一个变量时，导出的是变量的拷贝值。对于基本数据类型，属于复制。同时，在另一个模块可以对该模块输出的变量重新赋值。对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。

当使用 require 命令加载某个模块时，就会运行整个模块的代码，属于同步执行，当 require() 方法返回时，我们就得到了我们相应的变量，并且可以使用它的值，所有的这些事情都发生在 Node.js 进程事件循环的同一个周期里。此外，引入的模块会被缓存，当使用 require 命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，commonjs 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

#### ES6 模块

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。ES6 模块是动态只读引用，并且不会缓存值，模块里面的变量绑定其所在的模块。即不允许修改引入变量的值，且当原始值发生变化时，import 加载的值也会发生改变。

ES6 模块是动态引用，如果使用 import 从一个模块加载变量，不会立刻执行整个模块，而是保存一个对变量的引用，等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。此外，ES6 中是允许这个解析的步骤异步执行的。这就意味着，在 ES6 的机制中，加载脚本内容、解析模块的 import 和 export，执行模块代码将发生在多个事件循环里。

### 循环加载

循环加载（circular dependency）指的是，a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本。

#### CommonJS

CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被 "循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

#### ES6

循环加载时，ES6 模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。

- import/export 最终都是编译为 require/exports 来执行的。
  CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。
- export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

### 参考

- [Module 的加载实现](http://es6.ruanyifeng.com/#docs/module-loader)
- [commonjs 模块与 es6 模块的区别](http://www.cnblogs.com/unclekeith/p/7679503.html)
- [关于 Node.js 里 ES6 Modules 的一次更新说明](https://aotu.io/notes/2017/04/22/an-update-on-es6-modules-in-node-js/index.html)
