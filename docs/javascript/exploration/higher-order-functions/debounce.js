/**
 * 防抖函数（避免同一函数短时间内多次触发）
 */

function debounce(fn, wait) {
  var td;
  return function () {
    clearTimeout(td);
    td = setTimeout(fn, wait);
  }
}

var myFunc = debounce(function () {
  //繁重、耗性能的操作
}, 250);
window.addEventListener('resize', myFunc);