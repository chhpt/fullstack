(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{356:function(t,e,a){"use strict";a.r(e);var v=a(5),_=Object(v.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"正则表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#正则表达式","aria-hidden":"true"}},[t._v("#")]),t._v(" 正则表达式")]),t._v(" "),a("p",[t._v("在编写处理字符串的程序或网页时，经常会有查找符合某些复杂规则的字符串的需要。正则表达式就是用于描述这些规则的工具。换句话说，正则表达式就是记录文本规则的代码。")]),t._v(" "),a("p",[t._v("正则表达式是被用来匹配字符串中的字符组合的模式。在 JavaScript 中，正则表达式也是对象。这种模式可以被用于 RegExp 的 exec 和 test 方法以及 String 的 match、replace、search 和 split 方法。")]),t._v(" "),a("h2",{attrs:{id:"元字符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#元字符","aria-hidden":"true"}},[t._v("#")]),t._v(" 元字符")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("元字符")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v(".")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("匹配除换行符以外的任意字符")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\d")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("匹配数字字符 (等价于 [0-9])")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\w")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何一个字母数字字符 (大小写均可) 或下划线（等价于 [a-zA-Z0-9_]）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\s")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何一个空白字符 (等价于 [\\f\\n\\r\\t\\v])")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\W")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何一个非字母数字或非下划线字符 (等价于 [^a-za-z0-9_])")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\S")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何一个非空白字符 (等价于 [^\\f\\n\\r\\t\\v])")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\D")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("匹配非数字字符 (等价于 [^0-9])")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("\\B")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("匹配不是单词开头或结束的位置")])])])]),t._v(" "),a("h2",{attrs:{id:"重复匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重复匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 重复匹配")]),t._v(" "),a("p",[t._v("正则表达式中所有的限定符：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("代码 / 语法")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("*")]),t._v(" "),a("td",[t._v("重复零次或更多次")])]),t._v(" "),a("tr",[a("td",[t._v("+")]),t._v(" "),a("td",[t._v("重复一次或更多次")])]),t._v(" "),a("tr",[a("td",[t._v("?")]),t._v(" "),a("td",[t._v("重复零次或一次")])]),t._v(" "),a("tr",[a("td",[t._v("{n}")]),t._v(" "),a("td",[t._v("重复 n 次")])]),t._v(" "),a("tr",[a("td",[t._v("{n,}")]),t._v(" "),a("td",[t._v("重复 n 次或更多次")])]),t._v(" "),a("tr",[a("td",[t._v("{n,m}")]),t._v(" "),a("td",[t._v("重复 n 到 m 次")])])])]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("Windows\\d+")]),t._v(" 匹配 Windows 后面跟 1 个或更多数字")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("a+")]),t._v(" 匹配一个或多个连续出现的 a")])])]),t._v(" "),a("h2",{attrs:{id:"贪婪与懒惰"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贪婪与懒惰","aria-hidden":"true"}},[t._v("#")]),t._v(" 贪婪与懒惰")]),t._v(" "),a("p",[t._v("当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。以这个表达式为例："),a("code",[t._v("a.*b")]),t._v("，它将会匹配最长的以 a 开始，以 b 结束的字符串。如果用它来搜索 aabab 的话，它会匹配整个字符串 aabab，这被称为贪婪匹配。")]),t._v(" "),a("p",[t._v("有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。前面给出的限定符都可以被转化为懒惰匹配模式，只要在它后面加上一个问号 "),a("code",[t._v("?")]),t._v(" 。这样 "),a("code",[t._v(".*?")]),t._v(" 就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。现在看看懒惰版的例子吧：")]),t._v(" "),a("p",[a("code",[t._v("a.*?b")]),t._v(" 匹配最短的，以 a 开始，以 b 结束的字符串。如果把它应用于 aabab 的话，它会匹配 aab（第一到第三个字符）和 ab（第四到第五个字符）。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("代码 / 语法")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("*?")]),t._v(" "),a("td",[t._v("重复任意次，但尽可能少重复")])]),t._v(" "),a("tr",[a("td",[t._v("+?")]),t._v(" "),a("td",[t._v("重复 1 次或更多次，但尽可能少重复")])]),t._v(" "),a("tr",[a("td",[t._v("??")]),t._v(" "),a("td",[t._v("重复 0 次或 1 次，但尽可能少重复")])]),t._v(" "),a("tr",[a("td",[t._v("{n,m}?")]),t._v(" "),a("td",[t._v("重复 n 到 m 次，但尽可能少重复")])]),t._v(" "),a("tr",[a("td",[t._v("{n,}?")]),t._v(" "),a("td",[t._v("重复 n 次以上，但尽可能少重复")])])])]),t._v(" "),a("h2",{attrs:{id:"位置匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#位置匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 位置匹配")]),t._v(" "),a("p",[a("code",[t._v("\\b")]),t._v("：boundary。 简单的说 "),a("code",[t._v("\\b")]),t._v(" 匹配的是一个这样的位置，这个位置位于一个能够用来构成单词的字符（字母、数字和下划线，也就是 "),a("code",[t._v("\\w")]),t._v(" 相匹配的字符）和一个不能用来构成单词的字符 (也就是跟 "),a("code",[t._v("\\W")]),t._v(" 相匹配的字符) 之间。需要注意一点的是 "),a("code",[t._v("\\b")]),t._v(" 只匹配位置，不匹配字符也就是不占用匹配出来的字符的长度。"),a("code",[t._v("\\bcat\\b")]),t._v(" 匹配出来的字符长度就是 "),a("code",[t._v("3")]),t._v(" 而不是 "),a("code",[t._v("5")]),t._v(".")]),t._v(" "),a("p",[a("code",[t._v("\\B")]),t._v(" 同理，"),a("code",[t._v("\\B")]),t._v(" 则是匹配一个不是单词边界的连字符。举个栗子吧：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a1 = 'Please enter the nine-digit id as it appears on your color - coded pass-key';\n")])])]),a("p",[t._v("我现在要匹配 "),a("code",[t._v("-")]),t._v("，仔细的同学已经发现这三个 "),a("code",[t._v("-")]),t._v(" 可以分成两类，第一类是直接与 "),a("code",[t._v("\\w")]),t._v(" 仅仅相邻，如 "),a("code",[t._v("pass-key")]),t._v("，暂记作类型 1 吧，另一种是不与其相邻 "),a("code",[t._v("color - coded")]),t._v(" 以空格相邻，类型 2。假如我要匹配类型 2，那么正则表达式就应该这样写:")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/\\B-\\B/g\n")])])]),a("p",[t._v("匹配类型 1 的 "),a("code",[t._v("-")]),t._v("，应该这样写：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/\\b-\\b/g\n")])])]),a("p",[t._v("大家可以在 console 里面粘贴测试效果，代码如下：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a1 = 'Please enter the nine-digit id as it appears on your color - coded pass-key';\na1.match(/\\B-\\B/g);\na1.match(/\\b-\\b/g);\n")])])]),a("h2",{attrs:{id:"子表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#子表达式","aria-hidden":"true"}},[t._v("#")]),t._v(" 子表达式")]),t._v(" "),a("p",[t._v("我们已经提到了怎么重复单个字符（直接在字符后面加上限定符就行了），如果想要重复多个字符又该怎么办？你可以用小括号来指定子表达式 (也叫做分组)，然后你就可以指定这个子表达式的重复次数了，你也可以对子表达式进行其它一些操作。")]),t._v(" "),a("p",[a("code",[t._v("(\\d{1,3}\\.){3}\\d{1,3}")]),t._v(" 是一个简单的 IP 地址匹配表达式。要理解这个表达式，请按下列顺序分析它："),a("code",[t._v("\\d{1,3}")]),t._v(" 匹配 1 到 3 位的数字，"),a("code",[t._v("(\\d{1,3}\\.){3}")]),t._v(" 匹配三位数字加上一个英文句号 (这个整体也就是这个分组) 重复 3 次，最后再加上一个一到三位的数字 "),a("code",[t._v("(\\d{1,3})")]),t._v("。")]),t._v(" "),a("p",[t._v("此外，子表达式还允许嵌套。事实上，子表达式允许多重嵌套，这种嵌套的层次在理论上没有限制，但在实际工作中还是应该遵循适可而止的原则。")]),t._v(" "),a("h2",{attrs:{id:"分枝条件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分枝条件","aria-hidden":"true"}},[t._v("#")]),t._v(" 分枝条件")]),t._v(" "),a("p",[t._v("正则表达式里的分枝条件指的是有几种规则，如果满足其中任意一种规则都应该当成匹配，具体方法是用 | 把不同的规则分隔开。")]),t._v(" "),a("p",[a("code",[t._v("0\\d{2}-\\d{8}|0\\d{3}-\\d{7}")]),t._v(" 这个表达式能匹配两种以连字号分隔的电话号码：一种是三位区号，8 位本地号 (如 010-12345678)，一种是 4 位区号，7 位本地号 (0376-2233445)。")]),t._v(" "),a("h2",{attrs:{id:"向前查找"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#向前查找","aria-hidden":"true"}},[t._v("#")]),t._v(" 向前查找")]),t._v(" "),a("p",[t._v("向前查找制定了一个必须匹配但不在结果中返回的模式。向前查找实际就是一个子表达式，而且从格式上也确实如此。从语法上看，一个向前查找模式其实就是一个以"),a("code",[t._v("?=")]),t._v("开头的子表达式，需要匹配的文本跟在"),a("code",[t._v("=")]),t._v("的后面。")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("提示")]),t._v(" 有些正则表达式文档使用术语"),a("code",[t._v('"消费"')]),t._v("来表述"),a("code",[t._v("匹配和返回文本")]),t._v("的含义。在向前查找里，被匹配的文本不包含在最终返回的匹配结果里面，这被称为"),a("code",[t._v("不消费")]),t._v("。")])]),t._v(" "),a("p",[t._v("栗子一颗：比如我要查找下面文本中所有的协议名称")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("http://www.yonyouhr.com\nhttps://www.yonyouhr.com\nftp://123.109.12.12\n")])])]),a("p",[t._v("那么正则表达式就应该类似这样写：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/(\\w+(?=:))/g\n")])])]),a("p",[t._v("这样匹配出来的就是不带有"),a("code",[t._v(":")]),t._v("的协议文本。")]),t._v(" "),a("p",[t._v("俗话说的好，凡事都有两性性，既然有了"),a("code",[t._v("=")]),t._v("那自然也会有"),a("code",[t._v("!")]),t._v("。举个栗子：我们要匹配下面这个语句中的 “<” 后面不是 “br>” 的 “<”：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<div>line1</div> <br>\n")])])]),a("p",[t._v("那么正则表达式就该这样写：")]),t._v(" "),a("div",{staticClass:"language-source-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/<(?!br>)/\n")])])]),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://www.jb51.net/tools/zhengze.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("正则表达式 30 分钟入门教程"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/HRFE/blog/issues/8",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript 学习之正则表达式"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"http://imweb.io/topic/56e804ef1a5f05dc50643106",target:"_blank",rel:"noopener noreferrer"}},[t._v("玩转 JavaScript 正则表达式"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/jawil/blog/issues/20",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript 正则进阶之路——活学妙用奇淫正则表达式"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://juejin.im/post/5c7496fdf265da2dda6957d2",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript正则表达式备忘单"),a("OutboundLink")],1)])])])},[],!1,null,null,null);e.default=_.exports}}]);