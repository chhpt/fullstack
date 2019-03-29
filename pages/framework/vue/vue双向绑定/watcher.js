function Watcher (vm, exp, cb) {
  this.$vm = vm;
  this.cb = cb;
  this.exp = exp;
  // 获取当前变量的值，触发 observer 的 get，将当前变量添加到订阅器中
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  // 判断值是否改变
  run: function () {
    var value = this.$vm.data[this.exp];
    var oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.$vm, value, oldValue);
    }
  },
  // 获取值
  get: function () {
    Dep.target = this;
    var value = this.$vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}