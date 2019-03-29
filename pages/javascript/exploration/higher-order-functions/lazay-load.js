/**
 * 惰性载入函数
 */

function detection() {
  if (a) {
    detection = function () {
      //直接用支持的特性
    }
  } else if (b) {
    detection = function () {
      //用第二种特性
    }
  } else {
    detection = function () {
      //用其他解决方案
    }
  }
}

var detection = (function () {
  if (a) {
    return function () {
      //直接用支持的特性
    }
  } else if (b) {
    return function () {
      //用第二种特性
    }
  } else {
    return function () {
      //用其他解决方案
    }
  }
})();