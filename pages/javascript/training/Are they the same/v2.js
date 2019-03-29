// 参考 solutions
function comp(array1, array2) {
  if (array1 === null || array2 === null) return false;
  // 对 array1 和 array2 按从小到大的顺序排序
  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);
  // 顺序比较
  return array1.map((v) => v * v).every((v, i) => v === array2[i]);
}