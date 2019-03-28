# Canvas

## 画布

基于 canvas 的绘图并不是直接在 canvas 标记所创建的绘图画面上进行各种绘图操作，而是依赖画面所提供的渲染上下文（Rendering Context），所有的绘图命令和属性都定义在渲染上下文当中。在通过 canvas id 获取相应的 DOM 对象之后首先要做的事情就是获取渲染上下文对象。渲染上下文与 canvas 一一对应，无论对同一 canvas 对象调用几次 getContext() 方法，都将返回同一个上下文对象。

```js 
// canvas 元素
<canvas id="canvas" width="500" height="500"></canvas>

// 获取 canvas 上下文
const canvas = document.getElementById('#canvas');
// CanvasRenderingContext2D 对象
const ctx = canvas.getContext();

// 执行相关操作
...
```

## 文字

canvas 支持直接绘制文字。

> 字体设置：ctx.font = ‘’;
> 填充文字：ctx.fillText();
> 画笔文字：ctx.strokeText();

```js
// ... 获取上下文 ctx
ctx.font = "48px serif";
ctx.fillStyle = 'red';
ctx.fillText("Hello world", 50, 100);
```

## 简单的图形绘制 - 矩形

canvas 原生支持的基本图形只有矩形一种，至于其他的圆形，多边形等图形则都由路径来负责绘制实现。

> 清空像素：`ctx.clearRect()`
> 填充样式：`ctx.fillStyle()`
> 填充矩形：`ctx.fillRect()`

```js
// ... 获取上下文 ctx
ctx.fillStyle = '#CCC';
ctx.fillRect(5, 5, 150, 80);
```

## 绘制路径

画笔（stroke）

先定义画笔的样式，再使用画笔绘制路径

```js
// ... 获取上下文
// 画笔样式
ctx.strokeStyle = '#f00';
ctx.beginPath(); 
// 绘制一个圆
ctx.arc(75, 75, 30, 0, 2 * Math.PI, false);
// 填充颜色
ctx.fillStyle = '#00f';
ctx.fill();
ctx.stroke();
```

## 画布状态

Canvas 绘图中另一个重要的概念是 绘画状态（Drawing State），绘画状态反映了渲染上下文当前的瞬时状态，开发人员可以通过对绘画状态的保存 / 恢复操作而快速的回到之前使用的各种属性和变形操作。绘画状态主要由以下三个部分构成：

- 当前的变形矩阵（transformation matrix）
- 当前的裁剪区域（clipping region）
- 当前上下文中的属性，比如 strokeStyle, fillType, globalAlpha, font 等等。

需要指出的是，当前路径对象以及当前的位图都不包含在绘画状态之中，路径是持续性的对象，如前文所讲，只有通过 beginPath() 操作才会进行重置，而位图则是 canvas 的属性，并非属于渲染上下文的。

开发人员可以使用 save 和 restore 两种方法来保存和恢复 canvas 状态，每调用 save 方法，都会将当前状态压入堆栈中，而相应的 restore 方法则会从堆栈中弹出一个状态，并将当前画面恢复至该状态。绘画状态在 canvas 图形变形操作中应用极为广泛，也非常重要，因为调用一个 restore 方法远比手动恢复先前状态要简单许多，因而，一个较好的习惯是在做变形操作之前先保存 canvas 状态。

## 实现动画效果

Canvas 并非为了制作动画而出现，自然没有动画制作中帧的概念。因而，使用定时器不断的重绘 canvas 画面成为了实现动画效果的通用解决方式。Javascript 中的 setInterval(code，millisec) 方法可以按照指定的时间间隔 millisec 来反复调用 code 所指向的函数或代码串，这样，通过将绘图函数作为第一个参数传给 setInterval 方法，在每次被调用的过程中移动画面中图形的位置，来最终达到一种动画的体验。

需要注意的一点是，虽然 setinterval 方法的第二个参数允许开发人员对绘图函数的调用频率进行设定，但这始终都是一种最为理想的情况，由于这种绘图频率很大程度上取决于支持 canvas 的底层 JavaScript 引擎的渲染速度以及相应绘图函数的复杂性，因而实际运行的结果往往都是要慢于指定绘图频率的。

## 动画的基本步骤

你可以通过以下的步骤来画出一帧:

1.  清空 canvas
> 除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 `clearRect` 方法。
2.  保存 canvas 状态
> 如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
3.  绘制动画图形（animated shapes）
> 这一步才是重绘动画帧。
5.  恢复 canvas 状态
> 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。


## Canvas 绘制圆形进度条

[实际效果](http://jsrun.net/AvgKp/edit)

这个实现原理很简单，就是使用画笔画两个半径相同的同心圆，第一个是完整的圆，第二是根据进度的不完整的圆，然后使用 setInterval 间隔一定的时间重复以上步骤，进形成了我们所看到的动画。

当然，这样是不够的，我们需要考虑还有哪些值得优化的地方。上面的实现方法中，每次重绘我们都会进行三个步骤：

1. 画一个完整的圆
2. 画一个不完整的圆
3. 画进度文字

我们完全没有必要每次都画完整的圆，因为这个圆是不变的，我们可以使用分层 canvas，将完整的圆用另外一个 canvas 元素进行绘制，这样就减少了不必要的绘制。

### 参考

- [Canvas 最佳实践（性能篇）](http://taobaofed.org/blog/2016/02/22/canvas-performance/)
- [Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

