---
id: event
title: React 中的事件
---

## React 支持的事件

参考 https://zh-hans.reactjs.org/docs/events.html

## 冒泡与捕获

通常情况下，我们使用的 `onClick` 方法是在事件冒泡阶段触发的，如需注册捕获阶段的事件处理函数，可以为事件名添加 Capture，如 `onClickCapture`。

## 事件处理

在处理 JSX 中的事件时，要注意在 JavaScript 中，`class` 的方法默认不会绑定 `this`，因此可能比较容易出现方法中的 `this` 为 `undefined` 的情况，需要为方法绑定 `this`。

#### 方法一：显式绑定 this

```js
this.handleClick = this.handleClick.bind(this);
```

#### 方法二：ES6 箭头函数

```js
<button onClick={(e) => this.handleClick(e)}>Click me</button>
```

#### 方法三：使用实验性的 [public class fields](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) 语法，Create React App 默认启用此语法。

```js
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

## 合成事件 - SyntheticEvent

如果 DOM 上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React 为了避免这类 DOM 事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了自己的事件处理系统 - SyntheticEvent。它是浏览器原生事件的跨浏览器封装，除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()` 和 `preventDefault()` 等，如果需要使用浏览器原生的事件，可以使用 nativeEvent 属性获取。

React 并不将事件直接绑在真实 DOM 上，而是在 document 处监听所有支持的事件，当事件发生并冒泡至 document 处时，React 将事件内容封装并交由真正的处理函数运行。React 会维护一个事件池，重用事件池中的 SyntheticEvent 对象。在事件回调函数被调用后，事件所有的属性都会被删除，所以 `event` 的属性无法被异步访问。

```js
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function () {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // 不起作用，this.state.clickEvent 的值将会只包含 null
  this.setState({ clickEvent: event });

  // 你仍然可以导出事件属性
  this.setState({ eventType: event.type });
}
```

如果你想异步访问事件，可以在事件处理时调用 `event.persist()`，此方法会从池中移除合成事件，保留对事件的引用。

```js
function onClick(event) {
  event.persist();
  setTimeout(function () {
    console.log(event.type); // => click
  }, 0);

  // 可以使用
  this.setState({ clickEvent: event });
}
```

### 参考

- [合成事件](https://zh-hans.reactjs.org/docs/events.html#ui-events)
