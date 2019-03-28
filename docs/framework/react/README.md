# React

React 是一个用于构建用户界面的 JAVASCRIPT 库。
React 主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。
React最初的目的是使用 JavaScript 创建大型的，快速响应的网络应用。
有状态组件：除了使用外部传入的数据以外（通过 this.props 访问传入数据，只读）,组件还可以拥有其内部的状态数据（通过 this.state 访问状态数据）。当组件的状态数据改变时（使用 this.setState() 来更新组件局部状态），组件会调用 render() 方法重新渲染。
我们可以在组件类上声明特殊的方法，当组件挂载或卸载时，来运行一些代码：这些方法被称作生命周期钩子。

## 调用 setState 之后发生了什么

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## props 和 state 的区别

1. props 用于定义外部接口，使用 state 来存储控制当前页面逻辑的数据
2. props 的赋值是在父级组件，state 赋值在当前组件内部
3. props 是不可变的，而 state 是可变的
4. 使用 props 比 state 会有更好的性能

## setState 同步更新策略

为了提高性能 React 将 setState 设置为批次更新，即是异步操作函数，并不能以顺序控制流的方式设置某些事件，我们也不能依赖于 `this.state` 来计算未来状态。

setState 函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用，譬如：

```js
this.setState(
  {
    load: !this.state.load,
    count: this.state.count + 1
  },
  () => {
    console.log(this.state.count);
    console.log('加载完成');
  }
);
```

这里的回调函数用法相信大家很熟悉，就是 JavaScript 异步编程相关知识，我们可以引入 Promise 来封装 setState:

```js
setStateAsync(state) {
  return new Promise((resolve) => {
    this.setState(state, resolve);
  });
}
```

setStateAsync 返回的是 Promise 对象，在调用时我们可以使用 Async/Await 语法来优化代码风格：

```js
async componentDidMount() {
  StatusBar.setNetworkActivityIndicatorVisible(true);
  const res = await fetch('https://api.ipify.org?format=json');
  const {ip} = await res.json();
  await this.setStateAsync({ipAddress: ip});
  StatusBar.setNetworkActivityIndicatorVisible(false);
}
```

除了使用回调函数的方式监听状态更新结果之外，React 还允许我们传入某个状态计算函数而不是对象来作为第一个参数。状态计算函数能够为我们提供可信赖的组件的 State 与 Props 值，即会自动地将我们的状态更新操作添加到队列中并等待前面的更新完毕后传入最新的状态值：

```js
this.setState(function(prevState, props) {
  return { showForm: !prevState.showForm };
});
```

## React 中的 key

key 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

```js
render () {
  return (
    <ul>
      {this.state.todoItems.map(({task, uid}) => {
        return <li key={uid}>{task}</li>
      })}
    </ul>
  )
}
```

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 key 的重要性。

key 的作用主要是为了高效的更新虚拟 DOM。

## 在生命周期中的哪一步你应该发起 AJAX 请求

我们应当将 AJAX 请求放到 componentDidMount 函数中执行，主要原因有下：

- React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。

- 如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了 setState 函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。

### 参考

- [setState 同步更新策略](#setstate-%E5%90%8C%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%AD%96%E7%95%A5)
- [Index as a key is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
