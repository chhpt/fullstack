class TaskQueue {
  constructor(options = {}) {
    // 任务
    this.tasks = [];
    this._state = Promise.resolve();
    this._pendingCount = 0;
    this.concurrency = options.concurrency || 1;
    this.autoRun = options.autoRun || true;
  }

  _next() {
    this._pendingCount--;
    if (this._pendingCount < this.concurrency && this.tasks.length > 0) {
      this.tasks.shift()();
    }
  }

  pushTask(fn, ...args) {
    return new Promise((resolve, reject) => {
      const run = () => {
        this._pendingCount++;
        // 将同步函数转换成 Promise
        Promise.resolve(fn.apply(null, args))
          .then(result => {
            resolve(result);
            this._next();
          })
          .catch(err => {
            reject(err);
            this._next();
          });
      };
      if (this.autoRun && this._pendingCount < this.concurrency) {
        run();
      } else {
        // 添加任务
        this.tasks.push(run);
      }
    });
  }

  start() {
    this._next();
  }
}
