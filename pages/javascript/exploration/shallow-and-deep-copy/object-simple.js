// 简单的深拷贝
function deepClone(source) {
  // 递归终止条件
  if (!source || typeof source !== 'object') {
    return source;
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] && typeof source[key] === 'object') {
        targetObj[key] = deepClone(source[key]);
      } else {
        targetObj[key] = source[key];
      }
    }
  }
  return targetObj;
}