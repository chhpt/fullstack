## Exercises 1

### 1. 考虑如下代码的输出结果：

```js
var func = new Function();
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof undefined);
console.log(typeof func);
```

#### 解析

typeof 用来检测一个变量的类型，对一个值使用 typeof 操作符可能返回  这几种字符串：

```js
'undefined', 'boolean', 'string', 'number', 'object', 'function';
```

调用 typeof null 会返回 "object"，因为特殊值 null 被认为是一个空的对象引用。

#### 答案

```js
console.log(typeof null); // 'object'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof undefined); // 'undefined'
console.log(typeof func); // 'function'
```

### 2. 考虑如下代码，请问控制台上会输出什么？

```js
(function() {
  var a = (b = 5);
})();
console.log(b);
```

#### 解析

在函数表达式中有两个赋值，但 a 是用关键字 var 来声明的，这意味着 a 是局部变量，而 b 则被赋予为全局变量。它并没有使用严格模式（use strict)，在函数里面，如果启用了严格模式，代码就会报错：“Uncaught ReferenceError: b is not defined”。如果尝试输出 a， 会得到 a 未定义的错误。

请记住，严格模式需要你显式地引用全局作用域。

#### 答案

5

### 3. 给 String 对象定义一个 repeatify 方法

该方法接收一个整数参数，作为字符串重复的次数，最后返回重复指定次数的字符串。

```js
console.log('hello'.repeatify(3)); // hellohellohello
```

#### 解析

这题测试开发者对 Javascript 的继承及原型属性的知识，它同时也检验了开发者是否能扩展内置数据类型的方法。

这里的另一个关键点是，看你怎样避免重写可能已经定义了的方法。这可以通过在定义自己的方法之前，检测方法是否已经存在。

#### 答案

```js
String.prototype.repeatify =
  String.prototype.repeatify ||
  function(times) {
    var str = '';
    for (var i = 0; i < times; i++) {
      str += this;
    }
    return str;
  };
```

### 4. 如何实现下列代码

```js
[1, 2, 3, 4, 5].duplicator(); // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

将此方法添加至 `Array.prototype` 实现，代码如下：

```js
Array.prototype.duplicator = function() {
  return this.concat(this);
};
```

### 5. 看下面的代码，请问，如果用户点击第一个和第四个按钮，控制台上会输出什么？为什么？

```js
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
  nodes[i].addEventListener('click', function() {
    console.log('You clicked element #' + i);
  });
}
```

#### 解析

由于闭包中变量的值不是静态的，i 的值并不是添加 click 事件处理器时的值（比如，当给第一个 button 添加 click 事件处理器时 i 为 0，给第二个添加时 i 为 1）。当 for 循环结束时，变量 i 的值等于 nodes 的长度。因此事件被执行时，控制台会输出变量 i 当前的值，即等于 nodes 的长度。

#### 答案

控制台会输出两次 You clicked element (NODES_LENGTH)，其中 NODES_LENGTH 等于 nodes 的结点个数。

### 6. 修复上题的问题，使得点击第一个按钮时输出 0，点击第二个按钮时输出 1。

#### 解析

#### 答案

第一个解决方案要用到一个 IIFE 来创建另外一个闭包，从而得到所希望的 i 的值。相应的代码如下：

```js
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
  nodes[i].addEventListener(
    'click',
    (function(i) {
      return function() {
        console.log('You clicked element #' + i);
      };
    })(i)
  );
}
```

另一个解决方案不使用 IIFE，而是将函数移到循环的外面，代码如下：

```js
function handlerWrapper(i) {
  return function() {
    console.log('You clicked element #' + i);
  };
}

var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
  nodes[i].addEventListener('click', handlerWrapper(i));
}
```

### 7. 下面代码运行结果是什么？请解释。

```js
function printing() {
  console.log(1);
  setTimeout(function() {
    console.log(2);
  }, 1000);
  setTimeout(function() {
    console.log(3);
  }, 0);
  console.log(4);
}
printing();
```

#### 解析

要弄懂数字为何以这种顺序输出，你需要弄明白 setTimeout() 是干什么的，以及浏览器的事件循环工作原理。浏览器有一个事件循环用于检查事件队列，处理延迟的事件。UI 事件（例如，点击，滚动等），Ajax 回调，以及提供给 setTimeout() 和 setInterval() 的回调都会依次被事件循环处理。因此，当调用 setTimeout() 函数时，即使延迟的时间被设置为 0，提供的回调也会被排队。回调会呆在队列中，直到指定的时间用完后，引擎开始执行动作（如果它在当前不执行其他的动作）。因此，即使 setTimeout（）回调被延迟 0 毫秒，它仍然会被排队，并且直到函数中其他非延迟的语句被执行完了之后，才会执行。

#### 扩展

[JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

#### 答案

```js
1;
4;
3;
2;
```

### 8. 下面两个函数的返回值是一样的吗？为什么？

```js
function foo1() {
  return {
    bar: 'hello'
  };
}

function foo2() {
  return;
  {
    bar: 'hello';
  }
}
```

在编程语言中，基本都是使用分号（;）将语句分隔开，这可以增加代码的可读性和整洁性。而在 JS 中，如若语句各占独立一行，通常可以省略语句间的分号（;），JS 解析器会根据能否正常编译来决定是否自动填充分号：

```js
var test = 1 + 2;

console.log(test); // 3
```

在上述情况下，为了正确解析代码，就不会自动填充分号了，但是对于 `return` 、`break`、`continue` 等语句，如果后面紧跟换行，解析器一定会自动在后面填充分号 (;)，所以上面的第二个函数就变成了这样：

```js
function foo2() {
  return;
  {
    bar: 'hello';
  }
}
```

所以第二个函数是返回 undefined。

### 9. 什么是 NaN，它的类型是什么？怎么测试一个值是否等于 NaN？

NaN 是 Not a Number 的缩写，JavaScript 的一种特殊数值，其类型是 Number，可以通过 `isNaN(param)` 来判断一个值是否是 NaN：

```js
console.log(typeof NaN); // number
console.log(isNaN(NaN)); // true
console.log(isNaN(23)); // false
console.log(isNaN('12334')); // false
console.log(isNaN('32131sdasd')); // true
console.log(NaN === NaN); // false
```

### 10. 解释一下下面代码的输出

```js
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 == 0.3); //false
```

JavaScript 中的 number 类型就是浮点型，JavaScript 中的浮点数采用 IEEE-754 格式的规定，这是一种二进制表示法，可以精确地表示分数，比如 1/2，1/8，1/1024，每个浮点数占 64 位。但是，二进制浮点数表示法并不能精确的表示类似 0.1 这样 的简单的数字，会有舍入误差。

由于采用二进制，JavaScript 也不能有限表示 1/10、1/2 等这样的分数。在二进制中，1/10(0.1) 被表示为 `0.00110011001100110011……` 注意 `0011` 是无限重复的，这是舍入误差造成的，所以对于 0.1 + 0.2 这样的运算，操作数会先被转成二进制，然后再计算：

```js
0.1 => 0.0001 1001 1001 1001…（无限循环）
0.2 => 0.0011 0011 0011 0011…（无限循环）
```

双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100... 因浮点数小数位的限制而截断的二进制数字，这时候，再把它转换为十进制，就成了 0.30000000000000004。

对于保证浮点数计算的正确性，有两种常见方式。

一是先升幂再降幂：

```js
function add(num1, num2) {
  let r1, r2, m;
  r1 = ('' + num1).split('.')[1].length;
  r2 = ('' + num2).split('.')[1].length;

  m = Math.pow(10, Math.max(r1, r2));
  return (num1 * m + num2 * m) / m;
}
console.log(add(0.1, 0.2)); //0.3
console.log(add(0.15, 0.2256)); //0.3756
```

二是是使用内置的 `toPrecision()` 和 `toFixed()` 方法，**注意，方法的返回值字符串。**

```js
function add(x, y) {
  return x.toPrecision() + y.toPrecision();
}
console.log(add(0.1, 0.2)); //"0.10.2"
```

### 11. 实现函数 isInteger(x) 来判断 x 是否是整数

可以将 x 转换成 10 进制，判断和本身是不是相等即可：

```js
function isInteger(x) {
  return parseInt(x, 10) === x;
}
```

ES6 对数值进行了扩展，提供了静态方法 isInteger() 来判断参数是否是整数：

```js
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(25.1); // false
Number.isInteger('15'); // false
```

### 12. 写一个函数，判断一个字符串是不是回文字符串

```js
function isPalindrome(str) {
  return (
    str ==
    str
      .split('')
      .reverse()
      .join('')
  );
}
```

### 13. 下面的代码会输出什么？为什么？

```js
var arr1 = "john".split(''); j o h n
var arr2 = arr1.reverse(); n h o j
var arr3 = "jones".split(''); j o n e s
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

会输出什么呢？你运行下就知道了，可能会在你的意料之外。

MDN 上对于 `reverse()` 的描述是酱紫的：

> Description
> The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.

`reverse()` 会改变数组本身，并返回原数组的`引用`。

### 14. 下面的代码会输出什么？为什么？

```js
console.log(1 + '2' + '2'); // 122
console.log(1 + +'2' + '2'); // 32
console.log(1 + -'1' + '2'); // 02
console.log(+'1' + '1' + '2'); // 112
console.log('A' - 'B' + '2'); // NaN2
console.log('A' - 'B' + 2); // NaN
```

- 多个数字和数字字符串混合运算时，跟操作数的位置有关

```js
console.log(2 + 1 + '3'); // ‘33’
console.log('3' + 2 + 1); // '321'
```

- 数字字符串之前存在数字中的正负号 (+/-) 时，会被转换成数字

```js
console.log(typeof '3'); // string
console.log(typeof +'3'); //number
```

同样，可以在数字前添加 `''`，将数字转为字符串

```js
console.log(typeof 3); // number
console.log(typeof ('' + 3)); //string
```

- 对于运算结果不能转换成数字的，将返回 `NaN`

```js
console.log('a' * 'sd'); // NaN
console.log('A' - 'B'); // NaN
```

### 15. 如果 list 很大，下面的这段递归代码会造成堆栈溢出。如果在不改变递归模式的前提下修善这段代码？

```js
var list = readHugeList();

var nextListItem = function() {
  var item = list.pop();

  if (item) {
    // process the list item...
    nextListItem();
  }
};
```

原文上的解决方式是加个定时器：

```js
var list = readHugeList();

var nextListItem = function() {
  var item = list.pop();
  if (item) {
    // process the list item...
    setTimeout(nextListItem, 0);
  }
};
```

### 16. 解释下面代码的输出

```js
var a = {},
  b = { key: 'b' },
  c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

原因如下：设置对象属性时，JavaScript 会隐式地将参数转化成字符串。 在这种情况下，由于 b 和 c 都是对象，它们都将被转换为 `"[object Object]"`。 因此，a [b] 和 a [c] 都等价于 `"[object Object]"`，并且可以互换使用。 因此，设置或引用 [c] 与设置或引用 [b] 完全相同。

### 17. 给你一个 DOM 元素，创建一个能访问该元素所有子元素的函数，并且要将每个子元素传递给指定的回调函数。

函数接受两个参数：

DOM
指定的回调函数
原文利用 深度优先搜索 (Depth-First-Search) 给了一个实现：

```js
function Traverse(p_element, p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
    Traverse(list[i], p_callback); // recursive call
  }
}
```

## 题目来源

- [你有必要知道的 25 个 JavaScript 面试题](https://github.com/dwqs/blog/issues/17)
