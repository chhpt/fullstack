// 节流函数
// 一定时间内只触发一次
const throttleWrap = (fn, delay) => {
  // 防止重复触发
  let timer = null;
  let start;
  return function() {
    let current = Date.now();
    start = start || current;
    clearTimeout(timer);
    if (current - start >= delay) {
      fn.apply(this, arguments);
      start = current;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
};

const output = (input) => {
  console.log(Date.now(), input);
};

// 测试函数
const testFn = () => {
  const throttleOutput = throttleWrap(output, 1000);
  setInterval(() => {
    throttleOutput('Input');
  }, 100);
};

testFn();
