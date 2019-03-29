# CSS

CSS 有关问题。

- [布局](./layout.md)

## 盒模型

在一个文档中，每个元素都被表示为一个矩形的盒子，渲染引擎根据给定的样式确定这个盒子的呈现。盒子由内容（content），内边距（padding），边框（border）和外边距（margin）构成。

盒模型有 IE 盒模型和 W3C 标准盒模型：

- IE 盒模型：元素的 `width`，`height` 属性值包含 `border` 和 `padding`，指的是 `content` + `padding` + `border` 的总和。
- W3C 标准盒模型：元素的 `width`，`height` 属性值只包含内容 `content` 的值，不包含 `border` 和 `padding` 的值。

在 CSS 中可以使用 `box-sizing` 来改变盒模型：

- `content-box`：默认值，W3C 标准盒模型，即 `width` 和 `height`，只包含 `content`。
- `border-box`： IE 盒模型，即 `width` 和 `height` 包含 `content`，`padding` 和 `border` 。

### 参考

[CSS 的盒模型 - 过去和将来](https://zhanglun.github.io/2014/10/05/css%E7%9A%84%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%9B%9E%E9%A1%BE/)

## 选择器优先级

继承是从一个元素向其后代元素传递属性值所采用的机制。

确定应当向一个元素应用哪些值时，用户代理不仅考虑继承，还要考虑特殊性，另外需要考虑声明本身的来源，这个过程就称为层叠。

浏览器通过优先级来判断哪一些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类选择器组成的匹配规则。

选择器的优先级由选择器本身的特性确定，优先级表述为 4 个部分，如：

```text
0，1，0，1
```

选择器的权重如下：

- id 选择器（#id），为 0，1，0，0 。
- 类选择器（.class），属性选择器（[type="radio"]），伪类（ :hover），为 0，0，1，0 。
- 类型选择器（h1）和 伪元素（::before），为 0，0，0，1。
- 结合符 (+ > [] ^= $= 等等特殊符号) 和通配符 (\*) 对特殊性没有任何贡献，此外通配符的特殊性为 0，0，0，0。全是 0 有什么意义呢？当然有意义！子元素继承祖先元素的样式根本没有特殊性，因此当出现这种情况后，通配符选择器定义的样式声明也要优先于子元素继承来的样式声明。因为就算特殊性是 0，也比没有特殊性可言要强。

根据规范，计算权重值时 `A，B，C，D` 四组值，从左到右，分组比较，如果 A 相同，比较 B，如果 B 相同，比较 C，如果 C 相同，比较 D，如果 D 相同，后定义的优先。

给元素添加的内联样式 (例如, style="font-weight:bold") 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。

当在一个样式声明中使用一个 `!important` 规则时，此声明将覆盖任何其他声明。

### 参考

- [优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
- [一次性搞懂 CSS 优先级规则](https://juejin.im/entry/5a28e34a6fb9a045117105a7)
- [关于 CSS 权重 (优先级) 的理解](http://chenhaizhou.github.io/2015/01/16/css-weight.html)

## 清除浮动

```css
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}
```

[What methods of ‘clearfix’ can I use?](http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best)

## CSS sprites

将一些小图片整合到一张大图里面，来达到减少 HTTP 请求的目的。一般我会把单页需要的 icon 整合到一张，整站需要的整合到一张。这样尽量避免加载当前页不需要的图片。还可以把色值相近的图片放一起，可以让压缩的图片体积更小。

在网站中使用 SVG 或 Icon Font 也不错。


## 媒体查询

使用媒体查询实现响应话网页设计（RWD），同时是移动端优先：

```css
@media all and (min-width: 800px) {
  .container {
    width: 740px;
  }
}
@media all and (min-width: 1000px) {
  .container {
    width: 880px;
  }
}
@media all and (min-width: 1280px) {
  .container {
    width: 1200px;
  }
}
```

## position

`static` 是 `position` 属性的默认值，任何 `position` 为 `static` 的元素不会被特殊的定位。相对定位 `relative` 表现的和 `static` 一样，除非你添加了一些额外的属性（`top` 、`right`、`bottom` 和 `left`）。一个固定定位（`position` 属性的值为 `fixed`）元素会相对于视窗来定位，这意味着即便页面滚动，它还是会停留在相同的位置。和 `relative` 一样，`top` 、`right`、`bottom` 和 `left` 属性都可用。一个固定定位元素不会保留它原本在页面应有的空隙。`absolute` 是最棘手的 `position` 值。`absolute` 与 `fixed` 的表现类似，除了它不是相对于视窗而是相对于最近的被定位的（`position` 值不是 `static`）祖先元素。

## CSS 预处理器

CSS 预处理器是指类似 Sass、LESS 和 Stylus 之类的 CSS 处理器，都是用来处理 CSS 的一种工具，都是用来帮助大家更好维护和管理 CSS 的工具。
CSS 预处理器相对 CSS 而言更强大，因为其中添加了类似于编程语言的一些特性，比如说变量、混合宏（模块化）、扩展、逻辑运算等。比如先在项目中写 SCSS，然后处理器会将. scss 文件编译成. css，然后在项目中引入。也就是说，最终浏览器加载的还是 CSS 文件。（其他的预处理器是一样的）

## 居中一个（非）浮动元素

- 非浮动元素居中：margin:0 auto; 父元素 text-align: center; flex 布局等。
- 浮动元素居中：
  - position: fixed/relative; (-webkit-)transform: translateX/Y(-50%); top/left:50%;
  - 父元素和子元素同时左浮动，然后父元素相对左移动 50%，子元素相对左移 - 50%，position 定位等等。

## 纯 CSS 绘制三角形，扇形

```css
/* 形状 ▶ */
.triangle {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid red;
  border-bottom: 50px solid transparent;
}

/* 形状 ◥*/
.triangle {
  width: 0;
  height: 0;
  border-top: 100px solid red;
  border-left: 100px solid transparent;
}

/* 扇形 */
.sector {
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: #f00 transparent transparent;
  border-radius: 50px;
}
```

## link 和 @import

```HTML
<link rel='stylesheet' href='CSS 文件' type='text/css' media='all' />
<style type='text/css' media='screen'>
@import url('CSS 文件');
</style>
```

两者都是引用外部 CSS 的方式，但是存在一定的区别：

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务； @import 属于 CSS 范畴，只能加载 CSS 。
- link 引用 CSS 时，在页面载入时同时加载； @import 需要页面网页完全载入以后加载。
- link 是 XHTML 标签，无兼容问题； @import 是在 CSS2.1 提出的，低版本的浏览器不支持。
- link 支持使用 JavaScript 控制 DOM 去改变样式；而 @import 不支持。

## 边距折叠（塌陷）

外边距折叠：相邻的两个或多个外边距在垂直方向会合并成一个外边距（margin）相邻：没有被非空内容（元素之间是兄弟关系或者父子关系）、padding、border 或 clear 分隔开的 margin 特性。

外边距合并计算：

- 参加折叠的 margin 都是正值：取其中 margin 较大的值为最终 margin 值。
- 参与折叠的 margin 都是负值：取的是其中绝对值较大的，然后从 0 负向位移。
- 既有正值，也有负值：先取出负 margin 中绝对值中最大的，然后和正 margin 值中最大的 margin 相加。