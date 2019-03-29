## Exercise 2

### 1. 给定一个很大的数组，数组里面有很多整数，用 JavaScript 实现一个函数，要求

将数组中和为 10 的每一对数配对并找出，返回配对后的数组。

例如：
输入：[11, 3, 8, 9, 7, -1, 1, 2, 4]
输出：[[11, -1], [3, 7], [8, 2], [9, 1]]

#### 解法一

最简单的方法可以遍历数组，找到和为 10 的数输出。

```js
function map(list) {
  let ret = [],
    len = list.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (list[i] + list[j] === 10) {
        ret.push([list[i], list[j]]);
      }
    }
  }
  return ret;
}
```

#### 解法二

解法一虽然可行，但是执行效率低下。我们可以考虑先对数组进行排序，再寻找配对的数。较好的排序算法的时间复杂度可以为 O(nlogn)，当数组比较大时，比算法一的 O(n2) 要快很多。

```js
function map(list) {
  let ret = [];
  let len = list.length;
  list = list.sort((a, b) => a - b);
  for (let i = 0, j = list.length - 1; i < j; ) {
    let a = list[i];
    let b = list[j];
    if (a + b === 10) {
      ret.push([a, b]);
      i++;
      j++;
    } else if (a + b < 10) {
      i++;
    } else {
      j--;
    }
  }
  return ret;
}
```