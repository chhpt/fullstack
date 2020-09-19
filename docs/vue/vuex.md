## 导出内容

install 方法，使得 vuex 可以作为插件使用。

```JavaScript
// export install function
export function install (_Vue) {
  Vue = _Vue
  const _init = Vue.prototype._init
  Vue.prototype._init = function (options) {
    options = options || {}
    if (options.store) {
      this.$store = options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
    _init.call(this, options)
  }
}
```

/^[a-zA-Z0-9]+$/