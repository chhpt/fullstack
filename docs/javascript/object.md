---
id: object
title: JavaScript 对象
---

对象是 JavaScript 的基础，同时也是 JavaScript 中一个强大的特性。JavaScript 中主要有两种数据类型，第一种是基础类型（string、boolean、number、null 和 undefined），第二种是引用类型（array、object、function），而引用类型又是继承于对象，拥有对象的特性。

## 内置对象

JavaScript 中还有一些对象的子类型，通常被称为内置对象，以下是一些常见的内置对象：

- Boolean
- Number
- String
- Function
- Array
- JSON
- Math
- Date
- RegExp

这些内置对象从表现形式来说很像其他语言中的类型（type）或者类（class）， 比如 Java 中的 String 类。但是在 JavaScript 中，它们实际上只是一些内置函数。 这些内置函数可以当作构造函数来使用，创建一些新的对象。同时这些对象也可能拥有一些方法，可以用来进行一些操作，如 `JSON.parse()` 方法可以用来解析一个 JSON 的字符串。

## 创建对象

### 1. 使用字面量

```js
var obj = {};
```

### 2. 使用 `Object.create()` 方法

```js
var obj = Object.create();
```

[理解 `{}` 和 `Object.create(null)` 的区别](https://juejin.im/post/5acd8ced6fb9a028d444ee4e)

## `typeof`

一般情况下，typeof 可以用来判断一个变量的类型，但是要注意一些特殊的情况。

`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型

```js
typeof 1; // 'number'
typeof "1"; // 'string'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'

// 特殊情况
typeof null; // 'object'
```

`typeof` 对于对象，除了函数都会显示 `object`

```js
typeof []; // 'object'
typeof {}; // 'object'
typeof console.log; // 'function'
```

对于 `null` 来说，虽然它是基本类型，但是会显示 object，这是 JavaScript 语言本身的 Bug。

> **为什么会出现这种情况？**
>
> 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，null 的二进制表示是全 0，自然前三位也是 0，所以将它错误的判断为 object。

如果我们想获得一个变量的正确类型，可以通过 `Object.prototype.toString.call(xx)`，这样我们就可以获得类似 [object Type] 的字符串。

```js
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call({}); // [object Object]
```

## 原型与原型链

每个函数 function 都有一个 prototype，即原型。每个对象都有一个 **proto** 属性，指向创建该对象的函数的 prototype。当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去 prototype 里找这个属性。于是就这样一直找下去，也就是我们平时所说的原型链的概念。

特点：JavaScript 对象继承是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

当我们需要一个属性的时，JavaScript 引擎会先看当前对象中是否有这个属性，如果没有的话，就会查找他的 Prototype 对象是否有这个属性，这个 prototype 又会有自己的 prototype，如此递推下去，一直检索到 Object 内建对象。（Object.prototype 的 **proto** 指向的是 null）

原型链：

![pic](./pics/prototype.jpg)

- prototype 是 JavaScript 中创建的函数（由 bind 创建的函数没有 prototype 属性）的属性，指向了一个对象。
- 这个对象包含了所有由此函数创建的实例所共享的属性和方法，我们称这个对象为原型对象，简称原型。
- 一般情况下，JavaScript 对象有一个内部属性 `__proto__`，不能通过脚本访问（在 Chrome 中可以通过 `__proto__`访问），指向了对象的原型。
- 函数的 prototype 属性为一个对象，这个对象也会有一个原型对象。原型的原型也就构成了一种链式关系，称为原型链。

原型的用处

- 扩展内置对象
- 实现继承
- 减少每次创建变量所消耗的内存空间

### 模拟实现类

- 创建一个构造函数，在构造函数中使用 `this` 添加属性
- 在构造函数的 prototype 上添加方法
- 使用 `new` 调用构造函数生成实例

```JavaScript
// Type 类
function Type(property){
  this.property = property;
}

Type.prototype.method = function(){};

var instance = new Type();
```

### 扩展

- [深入理解 JavaScript 原型](https://juejin.im/post/5a0a5dc4f265da430b7abffb)
- [JavaScript 中的 “多继承”](https://juejin.im/post/5a0a5dc4f265da430b7abffb)

## new 操作符

new 操作符执行的步骤：

- 创建一个空对象，并将构造函数的 this 指向该对象。
- 执行构造函数中的代码。
- 返回该对象。

## 对象继承

JavaScript 中的对象是基于原型的，对象有一个内部属性 `__proto__` 指向它的原型。对象可以获取原型上的值，当对象的原型是另一个对象时，则又可以获取另一个对象的值以及其原型上的值，通过原型链，对象可以获取其他对象的属性，这就是原型继承的基本原理。

### 1. 原型链

```js
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}

// 继承了 SuperType
SubType.prototype = new SuperType();
```

缺点：

1. 原型中的引用类型会被共享，从而引起问题。

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"

var instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green,black"
```

2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数。

### 2. 借用构造函数

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  // 继承了 SuperType
  SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"

var instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"
```

问题：

方法都在构造函数中定义，每次创建实例都会创建一遍方法，无法实现方法共享。

### 3. 组合继承

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性 SuperType.call(this, name);
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  alert(this.age);
};
```

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，是 JavaScript 中最常用的继承模式。而且，`instanceof` 和 `isPrototypeOf()` 也能够用于识别基于组合继承创建的对象。

### 4. 原型式继承

就是 ES5 `Object.create` 的模拟实现，将传入的对象作为创建的对象的原型。

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

### 5. 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log("hi");
  };
  return clone;
}
```

缺点：同上

### 6. 寄生组合式继承

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

// 继承
inheritPrototype(SubType, SuperType);
```

> 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

- [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)

## 对象的复制

在 JavaScript 中进行复制变量的操作时，不用类型的变量会有不同的表现。基本类型的变量（string，number 等），复制的是变量的值，复制操作结束后，两个变量拥有独立的值，互不影响。而引用类型的变量（array，object 等），复制的是对变量的引用，复制操作结束后，两个变量实际上将引用同一个对象，一个变量的修改会影响另外一个变量。

### 浅拷贝与深拷贝

浅拷贝很简单，就是直接拷贝变量，不考虑引用类型的影响。深拷贝则是创造一个相同的变量，两个变量有不同的地址，不同的引用，两个变量之间完全独立，互不影响。

### 深拷贝的一些方法

#### 1. 使用 `JSON.stringify` 和 `JSON.parse` 方法

JSON.stringify 和 JSON.parse 是 JavaScript 内置对象 JSON 的两个方法，主要是用来将 JavaScript 对象序列化为 JSON 字符串和把 JSON 字符串解析为原生 JavaScript 值。

但是这种方式有一定的局限性，就是对象必须遵从 JSON 的格式，当遇到层级较深，且序列化对象不完全符合 JSON 格式时，使用 JSON 的方式进行深拷贝就会出现问题。

#### 2. 使用递归

我们可以定义一个函数，遍历对象的属性，当对象的属性是基本类型值得时候，直接拷贝；当属性是引用类型值的时候，再次调用这个函数进行递归拷贝。

```JavaScript
function deepClone(source) {
  // 递归终止条件
  if (!source || typeof source !== 'object') {
    return source;
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) {
      if (source[key] && typeof source[key] === 'object') {
        targetObj[key] = deepClone(source[key]);
      } else {
        targetObj[key] = source[key];
      }
    }
  }
  return targetObj;
}
```

#### 3. MessageChannel

如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 `MessageChannel`

```js
function structuralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}

var obj = {
  a: 1,
  b: {
    c: b,
  },
};

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
(async () => {
  const clone = await structuralClone(obj);
})();
```

想要了解更多关于深浅拷贝的内容，可以读读下面的文章：

- [深入理解 JavaScript 对象和数组拷贝](https://juejin.im/post/5a00226b5188255695390a74)
