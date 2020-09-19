/**
 * 函数柯里化
 */



var curry1 = function (fn) {
  // 参数
  var args = [].slice.call(arguments, 1);
  var len = args.length || fn.length;
  var newArgs = [];
  return function inner() {
    newArgs = newArgs.concat([].slice.call(arguments));
    return newArgs.length === len ? fn.apply(this, newArgs) : inner;
  };
};

var curry2 = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.call(this, newArgs);
  }
}


// 多个参数相加
function add() {
  return [].slice.call(arguments).reduce((sum, value) => sum + value);
}

var num = [1, 2, 3];

var addCurry = curry1(add, ...num);
console.log(addCurry(1)(2, 3));