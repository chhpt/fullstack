# TypeScript

## TypeScript 是什么

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

TypeScript 是微软开发一款开源的编程语言，本质上是向 JavaScript 增加**静态类型系统**。它是 JavaScript 的超集，所有的现代 JavaScript 特性都可以不加改变就在其中使用。它是为大型软件开发而设计的，它最终编译产生 JavaScript，所以可以运行在浏览器、Node.js 等等的运行时环境。

## Why TypeScript

TypeScript 适合大规模 JavaScript 应用，正如他的官方宣传语 JavaScript that scales，从以下几点可以看到 TypeScript 在团队协作、可维护性、易读性、稳定性（编译期提前暴露 bug）等方面上有着明显的好处：

- 加上了类型系统，对于阅读代码的人和编译器都是友好的。对阅读者来说，类型定义加上 IDE 的智能提示，增强了代码的易读型；对于编译器来说，类型定义可以让编译器揪出隐藏的 bug。
- 类型系统 + 静态分析检查 + 智能感知/提示，使大规模的应用代码质量更高，运行时 bug 更少，更方便维护。
- 有类似 VSCode 这样配套的 IDE 支持，方便的查看类型推断和引用关系，可以更方便和安全的进行重构，再也不用全局搜索，一个个修改了。
- 给应用配置、应用状态、前后端接口及各种模块定义类型，整个应用都是一个个的类型定义，使协作更为方便、高效和安全。

总结来说，TypeScript 的类型系统能够帮助我们更好地构建大型的 Web 应用，能增加代码的易读性，提高代码质量，增加大型 Web 应用的可维护性。

## TypeScript 能做什么

### 静态类型检查

> 增加静态这个定语，是为了和运行时的类型检查机制加以区分，强调静态类型系统是在编译时进行类型分析。

TypeScript 中的类型检查系统非常强大，可以检查出许多不易察觉的错误，而这种错误往往是 ESLint 等风格检查工具无法检查出来的，结合 VSCode 等支持 TS 的工具可以帮助我们在代码编写阶段就很好的规避代码中隐藏的错误。

#### 低级错误

```js
const peoples = [
  {
    name: 'tim',
    age: 20
  },
  {
    name: 'alex',
    age: 22
  }
];
const sortedPeoples = peoples.sort((a, b) => a.name.localCompare(b.name));
```

执行 TS 编译：

```js
error TS2339: Property 'localCompare' does not exist on type 'string'.
```

如果是在支持 TS 的 IDE 中（VS Code、WebStorm 等），则不需等到编译，在 IDE 中就可以非常明显在 `localCompare` 位置提示出错误信息。

#### 非空判断

```js
let data = {
  list: null,
  success: true
};
const value = data.list.length;
```

执行 TS 编译

```js
error TS2532: Object is possibly 'null'.
```

#### 类型推断

```js
const arr = [];
arr.toUpperCase();

class Cat {
  miao() {}
}

class Dog {
  wang() {}
}
const cat = new Cat();
cat.wang();
```

执行 TS 编译

```js
error TS2339: Property 'toUpperCase' does not exist on type 'any[]'.
error TS2339: Property 'wang' does not exist on type 'Cat'.
```

TS 有强大的类型推断功能，给不同类型的执行对象调用错误的方法都将被检查出来。

### 面向对象增强

虽然 ES6 中也提供的类的功能，但是 ES6 中类的功能比较简单，没有 public，private 等访问权限控制，也没有接口，泛型等支持，而 TypeScript 提供了更强大的面向对象编程的能力。

#### 访问权限控制

```js
class Person {
  protected name: string;
  public age: number;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  static someAttr = 1;
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.name);
// error TS2445: Property 'name' is protected and only accessible within class 'Person' and its subclasses.
```

#### 接口

```js
interface Machine {
  move(): void;
}

interface Human {
  run(): void;
}

class Robot implements Machine, Human {
  run() {
    console.log('run');
  }
  move() {
    console.log('move');
  }
}
```

#### 泛型

```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

### 模块系统增强

```js
namespace N {
  export namespace NN {
    export function a() {
      console.log('N.a');
    }
  }
}

N.NN.a();
```

TS 除了支持 ES6 的模块系统之外，还支持命名空间。这在管理复杂模块的内部时比较有用。

## 相关文章

- [TypeScript 体系调研报告](https://juejin.im/post/59c46bc86fb9a00a4636f939)
- [初探 TypeScript](https://juejin.im/post/5b3b9729f265da0f4b7a6e08)
- [巧用 Typescript](https://zhuanlan.zhihu.com/p/39620591)
- [clean-code-typescript](https://github.com/labs42io/clean-code-typescript)