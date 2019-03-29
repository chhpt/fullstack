function VM(options) {
  var self = this;
  self.data = options.data;
  self.methods = options.methods;
  // 属性代理，实现 vm.xxx -> vm._data.xxx
  Object.keys(self.data).forEach(function(key) {
    self.proxyKeys(key);
  });

  if (self.data && typeof self.data === 'object') {
    new Observer(self.data);
  }

  new Compile(options.el, self);
  // options.mounted.call(this); // 所有事情处理好后执行 mounted 函数
}

VM.prototype = {
  proxyKeys: function(key) {
    var self = this;
    Object.defineProperty(self, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key];
      },
      set: function setter(newValue) {
        self.data[key] = newValue;
      }
    });
  }
};
