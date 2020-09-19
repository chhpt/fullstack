/*
 * @Author: wuyiqing 
 * @Date: 2018-03-01 17:22:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-01 17:47:36
 * 归并排序，从小到大
 */

const { generateRandomNumbers, assertEqual } = require('./utils');
const numbers = generateRandomNumbers();
const source = numbers.slice(0);

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

const mergeSort = (numbers) => {
  const length = numbers.length;
  if (length === 1) {
    return numbers;
  }
  const split = Math.floor(length / 2);
  const left = numbers.slice(0, split);
  const right = numbers.slice(split, length);
  return merge(mergeSort(left), mergeSort(right));
};

const sortNumbers = mergeSort(numbers);

assertEqual(source, sortNumbers);