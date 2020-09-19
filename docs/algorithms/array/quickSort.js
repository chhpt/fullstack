/*
 * @Author: wuyiqing 
 * @Date: 2018-03-02 12:59:59 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-02 15:22:31
 * 快速排序
 */

const { generateRandomNumbers, assertEqual } = require('./utils');
const testNumbers = generateRandomNumbers(10);
const source = testNumbers.slice(0);

const swap = (a, b) => {
  [testNumbers[a], testNumbers[b]] = [testNumbers[b], testNumbers[a]];
};

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

quickSort(testNumbers, 0, testNumbers.length - 1);

assertEqual(source, testNumbers);
