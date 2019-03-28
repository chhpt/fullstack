let numbers = [1, 4, 6, 12, 10, 9, 11, 8, 7, 13, 5, 14, 3, 2, 15];
// sort方法在对数组做排序时，把元素默认成字符串进行相互比较。
let sortNumbers1 = numbers.sort();
console.log(sortNumbers1); // [ 1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9 ]

let sortNumbers2 = numbers.sort((a, b) => a - b);
console.log(sortNumbers2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]