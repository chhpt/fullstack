const assert = require('assert');

/**
 * 测试排序结果是否正确
 * @param {*} numbers
 * @param {*} sortNumbers
 */
const assertEqual = (numbers, sortNumbers) => {
  const result = numbers.sort((a, b) => a - b);
  assert.deepEqual(result, sortNumbers, 'Test Failed');
};

/**
 * 生成随机的数组供排序测试
 * @param {*} n
 */
const generateRandomNumbers = (n = 100, range = n * 10) => {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(parseInt(Math.random() * range));
  }
  return numbers;
};

module.exports = { generateRandomNumbers, assertEqual };
