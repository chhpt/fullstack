# 数组与排序和搜索

## 数组

### 创建和初始化数组

使用构造函数

```js
// 创建数组
let arr = new Array();
// 创建指定长度的数组
let arr = new Array(7);
// 创建含有数据的数组
let arr = new Array(1, 2, 3, 4);
```

使用字面量语法

```js
let arr = [];
```

#### 例子：计算斐波那契数列

求斐波那契数列的前 20 个数字。

```js
let fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 1;

for (let i = 3; i < 20; i++) {
  fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
}

for (var i = 1; i<fibonacci.length; i++) {
  console.log(fibonacci[i]);
}
```

### 添加和删除元素

```js
let numbers = [1,2,3,4,5,6,7,8,9];

// 在数组尾部添加元素
numbers.push(10);
// 在数组首位添加元素
numbers.unshift(0);

// 删除数组尾部的元素
numbers.pop(10);
// 删除数组首位元素
numbers.shift(0);

/*
 * splice方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个* 参数是删除元素的个数。第三个参数往后，就是要添加到数组里的值。
 */
// 删除指定范围的元素
numbers.splice(0, 2,);
// 删除指定范围的元素，并添加元素
numbers.splice(0, 2, 1, 2);
```

### 其他方法

| 方法名      | 描述                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| concat      | 连接2个或更多数组，并返回结果                                                                   |
| every       | 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true                          |
| some        | 对数组中的每一项运行给定函数，如果任一项返回true，则返回true                                    |
| forEach     | 对数组中的每一项运行给定函数。这个方法没有返回值                                                |
| map         | 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组                                  |
| sort        | 按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数                                      |
| filter      | 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组                                |
| join        | 将所有的数组元素连接成一个字符串                                                                |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1                                      |
| lastIndexOf | 返回在数组中搜索到的与给定参数相等的元素的索引里最大的值                                        |
| reverse     | 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在 的第一个 |
| slice       | 传入索引值，将数组里对应索引范围内的元素作为新数组返回                                          |
| toString    | 将数组作为字符串返回                                                                            |
| valueOf     | 和 toString 类似，将数组作为字符串返回                                                          |

## 排序

### 1. 基本排序

使用数组提供的 sort 方法：

```js
let numbers = [1, 4, 6, 12, 10, 9, 11, 8, 7, 13, 5, 14, 3, 2, 15];
// sort方法在对数组做排序时，把元素默认成字符串进行相互比较。
let sortNumbers1 = numbers.sort();
console.log(sortNumbers1); // [ 1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9 ]

let sortNumbers2 = numbers.sort((a, b) => a - b);
console.log(sortNumbers2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
```

### 2. 冒泡排序

冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。冒泡排序每次

```js
const bubbleSort = (numbers) => {
  const length = numbers.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      // 比较相邻的两个数的大小
      if (numbers[j] > numbers[j + 1]) {
        swap(j, j + 1);
      }
    }
  }
}
```

#### 冒泡排序优化

在上面的排序过程中，第一轮，我们已经把最大的数放到了数组的尾部，第二轮把第二大的数组放到了数组的倒数第二位...以此类推。所以在内层排序时，我们不需要再比较最大的数，可以直接跳过这些数。

```js
const modifiedBubbleSort = numbers => {
  const length = numbers.length;
  for (let i = 0; i < length; i++) {
    // 减去已经排序的最大数
    for (let j = 0; j < length - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        swap(j, j + 1);
      }
    }
  }
};
```

### 3. 选择排序

选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

```js
const selectionSort = (numbers) => {
  const length = numbers.length;
  for (let i = 0; i < length - 1; i++) {
    let index = i;
    // 找到最小的数在数组中的位置
    for (let j = i + 1; j < length; j++) {
      if (numbers[index] > numbers[j]) {
        index = j;
      }
    }
    // 如果找到了比当前数还小的数，交换二者的值
    if (i !== index) {
      swap(i, index);
    }
  }
};
```

### 4. 插入排序

插入排序每次排一个数组项，以此方式构建最后的排序数组。我们假定第一项已经排序了，接着，我们将第二项插入到这个已经排序的数组里，形成一个已经排序完成的数组，然后插入第三项...以此类推。

```js
const insertionSort = numbers => {
  const length = numbers.length;
  for (let i = 1; i < length; i++) {
    let j = i;
    // 记录当前项，避免下面移动项时被覆盖
    let temp = numbers[j];
    // 找到当前项应当插入的位置
    while (j > 0 && temp < numbers[j - 1]) {
      // 将比当前项大的项往后移动，为插入项腾出位置
      numbers[j] = numbers[j - 1];
      j--;
    }
    // 将当前项插入到前面已排序部分中
    numbers[j] = temp;
  }
};
```

### 5. 归并排序

归并排序是第一个可以被实际使用的排序算法，前面介绍的几个排序算法的性能并不能胜任实际工程的需要。而归并排序性能还好，其复杂度为 `O(nlogn)`。

归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并排序成较大的数组，直到最后只有一个排序完毕的大数组。

```js
// 比较两个数组中数的大小，并完成合并
const merge = (left, right) => {
  const result = [];
  let l = 0;
  let r = 0;
  /**
   * 两个数组都是已经排序过的数组
   * 只需要从头开始依次比较两个数组中数的大小
   * 当其中一个数组比较完成后，另一个数组中的所有数都比 result 中的数大
   */
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  while (l < left.length) {
    result.push(left[l++]);
  }

  while (r < right.length) {
    result.push(right[r++]);
  }

  return result;
};

// 递归合并
const mergeSort = (numbers) => {
  const length = numbers.length;
  if (length === 1) {
    return numbers;
  }
  // 切分数组
  const split = Math.floor(length / 2);
  const left = numbers.slice(0, split);
  const right = numbers.slice(split, length);
  // 返回合并排序后的数组
  return merge(mergeSort(left), mergeSort(right));
};
```

### 6. 快速排序

快速排序也许是最常用的排序算法了。它的复杂度为 `O(nlogn)`，且它的性能通常比其他的复杂度为 `O(nlogn)` 的排序算法要好。和归并排序一样，快速排序也使用分治的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。

我们来梳理一下快速排序的过程：

1. 首先，从数组中选择中间一项作为主元。

2. 创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分操作。

3. 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已完全排序。

```js
// 直接对数组进行操作
const partition = (numbers, left, right) => {
  // 获取中间元素作为比较标准
  const pivot = numbers[Math.floor((left + right) / 2)];
  // 等于号必须（临界值）
  while (left <= right) {
    while (numbers[left] < pivot) {
      left++;
    }
    while (numbers[right] > pivot) {
      right--;
    }
    // 等于号必须（当数组只有两个元素且第二个元素大于第一个元素时）
    if (left <= right) {
      swap(left, right);
      left++;
      right--;
    }
  }
  return left;
};

// 递归函数
const quickSort = (numbers, left, right) => {
  if (numbers.length <= 1) return;
  const index = partition(numbers, left, right);
  // 从 index - 1 开始（最后 index 位置的值可能会比选取的参考值大）
  if (left < index - 1) {
    quickSort(numbers, left, index - 1);
  }
  if (index < right) {
    quickSort(numbers, index, right);
  }
};
```

#### 小知识

JavaScript 的 Array 类定义了一个 sort 函数（Array.prototype.sort）用以排序 JavaScript 数组（我们不必自己实现这个算法）。ECMAScript 没有定义用哪个排序算法，所以浏览器厂商可以自行去实现算法。例如，Mozilla Firefox 使用归并排序作为 Array.prototype.sort 的实现，而 Chrome 则使用的是快速排序的变体。

### 堆排序

堆可以看做是有一定限制条件的完全二叉树：二叉树中任意节点小于（或大于）它的所有子节点，最小元（或最大元）在堆的根上。将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。

> 二叉树又分为完全二叉树（complete binary tree）和满二叉树（full binary tree）

> 满二叉树：一棵深度为 k，且有 2k - 1 个节点称之为满二叉树

> 完全二叉树：深度为 k，有 n 个节点的二叉树，当且仅当其每一个节点都与深度为 k 的满二叉树中序号为 1 至 n 的节点对应时，称之为完全二叉树

### 参考

1. 学习 JavaScript 数据结构与算法 第二版
2. [常见排序算法 - 堆排序 (Heap Sort)](http://bubkoo.com/2014/01/14/sort-algorithm/heap-sort/)