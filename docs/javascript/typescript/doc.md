## 环境声明

### 声明文件

你可以通过 declare 关键字，来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码（如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码）。

你可以选择把这些声明放入 `.ts` 或者 `.d.ts` 里。在你实际的项目里，我们强烈建议你应该把声明放入 `.d.ts` 里（比如 @types 常见的 index.d.ts）。

如果一个文件有扩展名 .d.ts，这意味着每个顶级的声明都必须以 declare 关键字作为前缀。这有利于向作者说明，在这里 TypeScript 将不会把它编译成任何代码，同时他需要确保这些在编译时存在。

> - 环境声明就好像你与编译器之间的一个约定，如果这些没有在编译时存在，但是你却使用了他们，则事情将会在没有警告的情况下中断。
> - 环境声明就好像是一个文档。如果源文件更新了，你应该同步更进。所以，当你使用源文件在运行时的新行为时，如果没有人更新环境声明，编译器将会报错。

## 接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

```js
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25
};
```

### 类可以实现接口

如果你希望在类中使用必须遵循的接口（类）或是别人给你定义的对象结构，可以使用 implements 关键字来确保兼容性：

```js
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x: number;
  y: number;
}
```

### 类可以继承接口

```js
interface Shape {
  color:string;
}

interface PenStroke {
  penWidth:number;
}

interface Square extends Shape,PenStroke {
  sideLength:number
}

let square = <Square>{}
```

### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```js
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: 'Tom'
};
```

### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```js
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
};
```

**需要注意的是，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性。**

### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：

```js
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527; // 报错
```

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候。
