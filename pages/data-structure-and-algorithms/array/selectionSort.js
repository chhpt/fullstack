/*
 * @Author: wuyiqing 
 * @Date: 2018-03-01 15:38:17 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-01 17:03:28
 * 选择排序，从小到大
 * 
 */

const { generateRandomNumbers, assertEqual } = require('./utils');
const numbers = generateRandomNumbers();
const source = numbers.slice(0);

const swap = (a, b) => {
  [numbers[a], numbers[b]] = [numbers[b], numbers[a]];
};

const selectionSort = (numbers) => {
  const length = numbers.length;
  for (let i = 0; i < length - 1; i++) {
    let index = i;
    for (let j = i + 1; j < length; j++) {
      if (numbers[index] > numbers[j]) {
        index = j;
      }
    }
    if (i !== index) {
      swap(i, index);
    }
  }
};

selectionSort(numbers);

assertEqual(source, numbers);
