# JavaScript 小技巧

## `JSON.stringify`

使用 JSON.stringify 来做序列化时的过滤，相当于我们可以自定义 JSON.stringify 的解析逻辑。


```js
// 使用“函数”当替代器
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {
  foundation: "Mozilla", 
  model: "box", 
  week: 45, 
  transport: "car", 
  month: 7
};

// jsonString 为字符串
var jsonString = JSON.stringify(foo, replacer);

// {"week":45,"month":7}
```