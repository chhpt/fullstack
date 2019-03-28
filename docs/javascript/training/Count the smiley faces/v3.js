// 参考 solutions
function countSmileys(arr) {
  // 优化匹配规则
  return arr.filter(v => v.match(/^[:;][-~]?[)D]$/g)).length;
}
