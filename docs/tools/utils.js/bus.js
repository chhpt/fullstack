/**
 * 从 Vue 2.5 版本源码中提取，处理为通用的代码
 * 添加事件时，需要注意事件的 this 指向
 */

/**
 * 将类数组（拥有 length 属性的对象）转换成数组
 * @param {!Any} list
 * @param {!Number} begin
 */
const toArray = (list, begin) => {
  let start = begin || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
};

class Bus {
  constructor() {
    this._events = [];
  }
  /**
   *
   * @param {!String} event string | Array<string>
   * @param {!Function} Function
   */
  $on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn);
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn);
    }
    return this;
  }

  /**
   *
   * @param {!String} event
   * @param {!Function} fn
   */
  $once(event, fn) {
    function on() {
      this.$off(event, on);
      fn.apply(null, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  }

  /**
   * @param {!String} event string | Array<string>
   * @param {!String} event Function
   */
  $off(event, fn) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$off(event[i], fn);
      }
      return this;
    }
    // specific event
    const cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    if (fn) {
      // specific handler
      let cb;
      let i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }
    return this;
  }

  /**
   * @param {!String} event
   */
  $emit(event) {
    let cbs = this._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      const args = toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(null, args);
        } catch (e) {
          console.log(e);
        }
      }
    }
    return this;
  }
}

export default Bus;
