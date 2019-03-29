/**
 * Created by wuyiqing on 2017.10.15
 * Vue 双向绑定之 Observer
 */
// Observer
function Observer (data) {
  // 数据
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var self = this;
    Object.keys(data).forEach(function (key) {
      self.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function (data, key, value) {
    // 建立订阅器
    var dep = new Dep();
    // 监听对象的属性
    if (value && typeof value === 'object') {
      new Observer(value);
    }

    Object.defineProperty(data, key, {
      // 可枚举
      enumerable: true,
      // 不能再改变
      configurable: false,
      // 获取值
      get: function () {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return value;
      },
      // 设置值
      set: function (newValue) {
        // 如果值相同，不更新数据
        if (newValue === value) {
          return;
        }
        value = newValue;
        // 检测新的值
        if (newValue && typeof newValue === 'object') {
          new Observer(newValue);
        }
        // 通知订阅者
        dep.notify();
      }
    });
  }
};

// 消息订阅器 Dep
var uid = 0;

function Dep () {
  // 每个订阅器的 id
  this.id = uid++;
  // 订阅者数组
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
}

// 全局变量 Dep
Dep.target = null;