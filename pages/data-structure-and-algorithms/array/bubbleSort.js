/*
 * @Author: wuyiqing 
 * @Date: 2018-03-01 14:48:26 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-01 17:03:35
 * 冒泡排序，从小到大排序
 */

const { generateRandomNumbers, assertEqual } = require('./utils');
const numbers = generateRandomNumbers();
const source = numbers.slice(0);

const swap = (a, b) => {
  [numbers[a], numbers[b]] = [numbers[b], numbers[a]];
};

const bubbleSort = numbers => {
  const length = numbers.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        swap(j, j + 1);
      }
    }
  }
};

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

modifiedBubbleSort(numbers);

assertEqual(source, numbers);
