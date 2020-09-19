// 利用队列的思想优化递归
function deepClone(source) {
  if (!source || typeof source !== 'object') {
    return source;
  }
  var current;
  var target = source.constructor === Array ? [] : {};
  var cloneQueue = [{
    source,
    target
  }];
  // 先进先出
  while (current = cloneQueue.shift()) {
    for (var key in current.source) {
      if (Object.prototype.hasOwnProperty.call(current.source, key)) {
        if (current.source[key] && typeof current.source[key] === 'object') {
          current.target[key] = current.source[key].constructor === Array ? [] : {};
          cloneQueue.push({
            source: current.source[key],
            target: current.target[key]
          });
        } else {
          current.target[key] = current.source[key];
        }
      }
    }
  }
  return target;
}

var object1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
}

var object2 = deepClone(object1);
console.log(object2);