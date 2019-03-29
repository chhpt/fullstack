/*
 * @Author: wuyiqing 
 * @Date: 2018-03-01 17:05:33 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-01 17:13:44
 * 插入排序，从小到大
 */

const { generateRandomNumbers, assertEqual } = require('./utils');
const numbers = generateRandomNumbers();
const source = numbers.slice(0);

const swap = (a, b) => {
  [numbers[a], numbers[b]] = [numbers[b], numbers[a]];
};

const insertionSort = numbers => {
  const length = numbers.length;
  for (let i = 1; i < length; i++) {
    let j = i;
    let temp = numbers[j];
    // 找到当前值应当插入的位置
    while (j > 0 && temp < numbers[j - 1]) {
      numbers[j] = numbers[j - 1];
      j--;
    }
    // 将当前值插入到前面已排序部分中    
    numbers[j] = temp;
  }
};

insertionSort(numbers);

assertEqual(source, numbers);
