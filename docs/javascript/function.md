# JavaScript 函数

JavaScript 函数相关，包含基本的函数概念，用法，闭包，this 等。

## `arguments`

在 JavaScript 中，函数的参数在内部是用一个类数组来表示的。在函数体内可以通过 `arguments` 对象来访问这个参数数组，从而获取传递给函数的每一个参数。`arguments` 对象不是数组，但可以通过下标访问，有 `length` 属性，但是没有 Array 实例的方法，如 `call()`，`cancat()` 等。

比如有这样一个面试题：定义一个函数 `log`，实现 `console.log` 的功能同时有一个前缀 `APP:`。我们知道 `console.log` 可以处理不定数量个的参数，那么可以这样：

```javascript
var log = function() {
  // 拷贝参数为一个数组
  var args = Array.prototype.slice.call(arguments);
  args.unshift('App:');
  // ES6 中可以这样：console.log(...args);
  console.log.apply(console, args);
};
```

需要注意的是，`arguments` 是一个伪数组，需要将其转化为标准数组之后才能使用 `unshift` 方法。


## `this`

在函数中 this 到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了，因为 this 的取值是执行上下文环境的一部分。

- 全局或调用普通函数

  > 在全局环境下，this 永远是 window。对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生问题。

- 函数调用时，`this` 也会指向全局对象。

  > func();

- 方法调用时，`this` 指向的是调用此方法的对象。

  > obj.func();

- 调用构造函数时，`this` 指向新创建的对象。

  > new Func();

- 显式设置 `this`，当使用 `call()` 、 `apply()` 和 `bind()` 方法时，函数内的 `this` 将会被显式设置为函数调用的参数。

- 箭头函数中的 this 指向定义时的上下文
  > 箭头函数不会创建它自己的上下文，它从它定义处的外部函数获得 this 上下文，并不会随着调用方式的改变而改变。

```js
var x = 0;
var obj = {
  x: 1
};

function output() {
  console.log(this.x);
}
output(); // 0
output.call(obj); // 1
output.apply(obj); // 1
var newFunc = output.bind(obj);
newFunc(); // 1
```

在 ES6 中，let、const 和 class 声明的全局变量不再属于顶层对象。

```js
let b = 1;
window.b; // undefined
```

### 扩展

- [this 的工作原理](https://bonsaiden.github.io/JavaScript-Garden/zh/#function.this)
- [Javascript 的 this 用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
- [JavaScript 深入之从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)

## 闭包

闭包是指有权访问另一个函数作用域中的变量的`函数`。

创建闭包的最常见的方式就是在一个函数 A 内创建并传递另一个函数 B，在外部通过函数 B 访问函数 A 的局部变量。

利用闭包可以突破作用域链，将函数内部的变量和方法传递到外部。闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境，环境由闭包创建时在作用域中的任何局部变量组成，换句话说，`这些函数可以“记忆”它被创建时候的环境`。

闭包允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联，有利于数据隐藏和封装。

可以使用闭包模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。使用闭包来定义公共函数，且其可以访问私有函数和变量。这个方式也称为模块模式（module pattern）。

闭包的特性：

- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收

闭包通常用来创建内部变量，使得这些变量不能被外部随意修改，同时又可以通过指定的函数接口来操作。下面是一个闭包：

```js
var Counter = function() {
  var count = 0;
  return function() {
    return count++;
  };
};

var a = Counter();
a(); // 0
a(); // 1
```

### 推荐阅读

- [JavaScript 闭包入门（译文）](https://juejin.im/post/58832fe72f301e00697b672d#heading-11)


## 数组的原生方法

**下面的这些方法会改变调用它们的对象自身的值：**

- Array.prototype.fill()
  > 将数组中指定区间的所有元素的值，都替换成某个固定的值。
- Array.prototype.pop()
  > 删除数组的最后一个元素，并返回这个元素。
- Array.prototype.push()
  > 在数组的末尾增加一个（或多个）元素，并返回数组的新长度。
- Array.prototype.reverse()
  > 颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。删除数组的第一个元素，并返回这个元素。
- Array.prototype.sort()
  > 对数组元素进行排序，并返回当前数组。
- Array.prototype.splice(start, deleteCount[, new1, new2, …])
  > 在任意的位置给数组添加或删除任意个元素。
- Array.prototype.unshift()
  > 在数组的开头增加一个（或多个）元素，并返回数组的新长度。

**下面的这些方法不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值**

- Array.prototype.concat()
  > 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
- Array.prototype.includes()
  > 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
- Array.prototype.join()
  > 连接所有数组元素组成一个字符串。
- Array.prototype.slice()
  > 抽取当前数组中的一段元素组合成一个新数组。
- Array.prototype.toString()
  > 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
- Array.prototype.indexOf()
  > 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
- Array.prototype.lastIndexOf()
  > 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
- Array.prototype.forEach()
  > 为数组中的每个元素执行一次回调函数。
- Array.prototype.filter()
  > 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
- Array.prototype.map()
  > 返回一个由回调函数的返回值组成的新数组。callback 调用时被依次传入三个参数：当前元素的值、索引、被遍历的数组。

## apply、call、bind

- apply、call、bind 三者都是用来改变函数的 this 对象的指向的。
- 三者第一个参数都是 this 要指向的对象，都可以利用后续参数传参。
- bind()是返回对应函数，便于稍后调用；apply、call 则是立即调用。
- call()的作用和 apply()类似，只有一个区别，就是 call()接受的是若干个参数的列表，而 apply()接受的是一个包含多个参数的数组。

典型应用

```js
var foo = {
  bar: 1,
  eventBind: function() {
    var that = this;
    $('.aClass').on('click', function(event) {
      console.log(that.bar);
    });
  }
};
var foo = {
  bar: 1,
  eventBind: function() {
    $('.aClass').on(
      'click',
      function(event) {
        console.log(this.bar);
      }.bind(this)
    );
  }
};
```

bind()的另一个简单用法是使一个函数拥有预设的初始参数。这些参数作为 bind()的后续参数跟在 this 对象后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。还可以使用箭头函数，`this` 关键字就指向我们的 class，而不是闭包。这是 ES6 提供的很棒的特性。在这种场景下，我们再也不需要使用 bind()了。

arguments 对象是所有函数中可用的局部变量。此对象包含传递给函数的每个参数的条目，第一个条目的索引从 0 开始。它类似于数组，但除长度之外没有任何数组属性。例如，它没有 pop 方法。但它可以被转换为一个真正的数组：

```js
var args = [].slice.call(arguments);
```

`typeof` 是一个运算符，运算中需要一个操作数，运算的结果就是这个操作数的类型，运算的结果是一个字符串，可能的结果有：undefined、boolean、number、string、object、function、symbol；特别地，typeof null === "object"。

`instanceof` 也是一个运算符，运算中需要两个操作数，运算的结果是 true 或 false，表示此值是不是某个类的实例，能得到一个值的具体类型。

```js
var u = new User; console.log(u instanceof User);  //true
constructor 是对象的一个属性，不是运算符，constructor 属性指向对象的构造函数。
var u = new User; console.log(u.constructor===User); //true
```

## 数组去重的方法

- 新数组排除法

```js
arr.filter(function(el, index, array) {
  return index === array.indexOf(el);
});
```

- 对象键值对法（利用对象的键是唯一的特性）

```js
var obj = {};
arr.forEach(function(value) {
  obj[value] = value;
});
var result = Object.keys(obj);
```

- ES6 特性法（Set）

```js
Array.prototype.delRep = function() {
  return [...new Set(this)];
};
```

## 获取数组最小值

```js
function minOfArray(array) {
  return Math.min.apply(null, array);
}
var min = minOfArray([5, 6, 2, 3, 7]);
```
