function once1(fn) {
  var result;
  return function () {
    if (fn) {
      result = fn(arguments);
      fn = null;
    }
    return result;
  }
}
var init = once(function () {
  //初始化操作
})

function once2(fn, context) {
  var result;
  return function () {
    if (fn) {
      result = fn.apply(context, arguments);
      fn = null;
    }
    return result;
  }
}