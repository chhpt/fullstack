/*
 * @Author: wuyiqing 
 * @Date: 2018-09-04 13:23:47 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-09-04 14:01:17
 * 封装
 */

// TODO: 支持存储对象
class Storage {
  constructor() {
    if ('localStorage' in window) {
      this.storage = window.localStorage;
    } else {
      console.error('你的浏览器不支持 storage');
    }
  }

  get(key) {
    // key 为空，输出错误，返回 null
    if (!key) {
      console.error('Required param key missed');
      return null;
    }
    // 查询数据
    if (this.storage) {
      return this.storage.getItem(key);
    } else {
      return null;
    }
  }
  /**
   * 存储数据
   * @param {!String} key
   * @param {!String} value
   */
  set(key, value) {
    if (!key) {
      console.error('Required param key missed!');
      return;
    }
    if (typeof key === 'object') {
      console.error(
        'localStorage only store string, all none string value will be turned into string and it may cause losing your data!'
      );
    }
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  delete(key) {
    if (!key) {
      console.error('Required param key missed!');
      return;
    }
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear() {
    if (!key) {
      console.error('Required param key missed!');
      return;
    }
    if (this.storage) {
      this.storage.clear();
    }
  }

  // 将 localStorage 转换成对象
  toObject() {
    const obj = {};
    const length = this.storage.length;
    for (let i = 0; i < length; i++) {
      key = this.storage.key(i);
      obj[key] = this.get(key);
    }
    return obj;
  }
}
