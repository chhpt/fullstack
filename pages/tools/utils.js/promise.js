function Promise(executor) {
  // executor 为函数
  this.status = 'pending';
  // 函数执行结果
  this.data = undefined;
  // 成功回调函数
  this.onResolvedCallback = [];
  // 失败回调函数
  this.onRejectedCallback = [];
  var self = this;

  function resolve(value) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        self.onRejectedCallback.forEach(cb => {
          cb(value);
        });
      }
    }, 0);
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        self.onResolvedCallback.forEach(cb => {
          cb(reason);
        });
      }
    }, 0);
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/**
 * Promise 的 then 方法
 * @param {!Function} onResolved Promise 成功的回调
 * @param {!Function} onRejected Promise 失败的回调
 * @return {!Promise}
 */
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this;
  var promise2;

  // 根据标准，如果 then 的参数不是 function，则我们需要忽略它，此处以如下方式处理
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function(value) {
          return value;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(reason) {
          return reason;
        };

  if (self.status === 'resolved') {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          var res = onResolved(self.data);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          }
          resolve(res);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }));
  }

  if (self.status === 'rejected') {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          var res = onRejected(self.data);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    }));
  }

  if (self.status === 'pending') {
    return (promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var res = onResolved(value);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            resolve(value);
          }
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallback.push(function(reason) {
        try {
          var res = onRejected(reason);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(e);
        }
      });
    }));
  }
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

// promise 状态的转换
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

promise.then(res => {
  console.log(res);
});

console.log(promise);
