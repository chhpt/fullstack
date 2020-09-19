---
id: koa-router
title: koa-router
---

## API

koa-router 是 Koa 的路由中间件，基本使用方法和其他中间件一致。

```js
var Koa = require("koa");
var Router = require("koa-router");

var app = new Koa();
var router = new Router();

router.get("/", (ctx, next) => {
  // ctx.router available
});

app.use(router.routes()).use(router.allowedMethods());
```

### 处理请求

koa-router 支持 `get|put|post|patch|delete|del` 等 HTTP 动作，并且在使用时支持链式调用

```js
router
  .get("/", (ctx, next) => {
    ctx.body = "Hello World!";
  })
  .post("/users", (ctx, next) => {
    // ...
  })
  .put("/users/:id", (ctx, next) => {
    // ...
  })
  .del("/users/:id", (ctx, next) => {
    // ...
  })
  .all("/users/:id", (ctx, next) => {
    // ...
  });
```

### 命名路由

koa-router 支持为路由提供名字，方便精确定位到路由，以便在开发过程中修改路由的 url

```js
router.get("user", "/users/:id", (ctx, next) => {
  // ...
});

// 修改 url
router.url("user", 3);
// => "/users/3"
```

### 多中间件

koa-router 支持  为同一个路由提供多个  中间件，可以进行多重处理

```js
router.get(
  "/users/:id",
  (ctx, next) => {
    return User.findOne(ctx.params.id).then(function (user) {
      ctx.user = user;
      next();
    });
  },
  (ctx) => {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

### 嵌套路由

koa-router 支持  路由市里的嵌套使用

```js
var forums = new Router();
var posts = new Router();

posts.get('/', (ctx, next) => {...});
posts.get('/:pid', (ctx, next) => {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

### 路由前缀(prefix)

```js
var router = new Router({
  prefix: '/users'
});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

### 路由参数

```js
router.get("/:category/:title", (ctx, next) => {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});
```

### 其他

#### router.routes => function

返回匹配路由的所有中间件。

#### router.use([path], middleware) => Router

```js
// session middleware will run before authorize
router.use(session()).use(authorize());

// use middleware only with given path
router.use("/users", userAuth());

// or with an array of paths
router.use(["/users", "/admin"], userAuth());

app.use(router.routes());
```

## 原理

首先，我们需要明白路由器(router)在后台服务中作用。作为提供资源的一方，服务器会接受大量的请求，不同的请求会期望返回不同的资源，而路由器担任着划分请求的功能，将不同类的请求分配给不同的服务单元处理，使得不同的服务单元可以各司其职，降低应用的复杂度。

路由器的核心就是根据不同的请求调用不同的处理逻辑，所以路由器的功能可以简单划分成两点：划分请求与调用处理逻辑。当然，复杂的路由器可能也会有其他功能，这里不做过多讨论。

`koa-router` 作为 koa 的路由器中间件，主要也承担了以上两个责任，我们可以看 `koa-router` 的常用 API

```js
router.get("/api", (ctx, next) => {
  // 处理...
});
```

上面的代码可以这么理解：当接受到 `GET "/api"` 请求时，调用 `(ctx, next) => {}` 进行处理，这就是路由器的核心：分发请求。当然 `koa-router` 这个框架比较强大，也提供了许多其他功能，这个要放到后面再说，当前的任务是理解 `koa-router` 的核心，理解怎么分发请求。

### 为请求指定处理逻辑

`koa-router` 使用了原型模拟类， 并在原型上定义了一系列方法，`router` 实例暴露的 `get|put|post|patch|delete|del` 等方法就是定义在原型上的。`get|put|post|patch|delete|del` 等方法的作用是指定请求的处理逻辑，当我们新建 `router` 实例之后，就需要对不同的请求，也叫做路由(route)添加不同的处理逻辑

```js
router.get("/api", (ctx, next) => {
  // 处理...
});
```

那么，当我们添加处理逻辑时，发生了什么呢，让我们看看 `koa-router` 的源码：

```js
module.exports = Router;
// koa-router 导出的构造函数
function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || [
    "HEAD",
    "OPTIONS",
    "GET",
    "PUT",
    "PATCH",
    "POST",
    "DELETE",
  ];

  this.params = {};
  this.stack = [];
}
```

首先，`koa-router` 导出了一个构造函数，就是常用的 `Router`，通过 new 生成 router 实例进行使用。我们接着往下看，可以发现这样一段代码

```js
methods.forEach(function(method) {
  ...
});
```

这里有一个 methods 数组，顶部有一行声明 `var methods = require('methods');`，可以看出 methods 是这个 `methods` 的默认导出，我们可以到 [Github](https://github.com/jshttp/methods) 上看看这个 methods 的介绍

> HTTP verbs that Node.js core's HTTP parser supports.

介绍简单明了，就是 Node 中的 HTTP 解析器支持的 HTTP 动词，诸如 `GET`， `POST` 等，了解这个之后我们就可以继续往下看了

```js
// methods 包含 HTTP 动词的数组
methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    var middleware;

    if (typeof path === "string" || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    // 调用 register 方法
    this.register(path, [method], middleware, {
      name: name,
    });
    // this 即 router 实例，使得可以链式调用 get 等方法
    return this;
  };
});
```

这段代码对 `methods` 进行遍历，并且在 Router 的原型上添加了 `[method]` 方法，也就是我们前面使用的 `router.get()` 等方法。`[method]` 方法接受 `name`，`path`，`middleware` 三个参数，从 `koa-router` 的 API 文档中可以得知 `name` 参数是可选的，代表着路由的名称，`path` 就是路由的请求 url，`middleware` 就是处理请求的函数，`koa-router` 允许我们对一个路由指定多个处理方法，从代码可以看到，`koa-router` 会通过函数的 arguments 参数获取所有的处理函数，并存到 middleware 变量中，然后会调用 `register` 方法对路由进行处理，这个 `register` 后面再看。这里提一下这个最后返回的 `this`，这里的 `this` 会指向 `router` 实例，这样做的目的是实现 get 等方法的链式调用，可以一次处理多个路由

```js
router
  .get("/", (ctx, next) => {
    ctx.body = "Hello World!";
  })
  .post("/users", (ctx, next) => {
    // ...
  });
```

顺着函数的执行顺序，我们继续看看 `register` 方法

```js
// 创建并注册路由
Router.prototype.register = function (path, methods, middleware, opts) {
  // 包含路由名
  opts = opts || {};

  var router = this;
  var stack = this.stack; // []

  // 支持 path 数组
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });

    return this;
  }

  // 创建路由对象，保存路由信息
  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || "",
    ignoreCaptures: opts.ignoreCaptures,
  });

  // 为路由的添加 prefix
  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  }

  // 添加 param
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);

  stack.push(route);

  return route;
};
```

`register` 方法
