function deepClone(originalObject, circular) {
  // First create an empty object with
  // same prototype of our original source
  var propertyIndex,
    descriptor,
    keys,
    current,
    nextSource,
    indexOf,
    copies = [{
      source: originalObject,
      target: Object.create(Object.getPrototypeOf(originalObject))
    }],
    cloneObject = copies[0].target,
    sourceReferences = [originalObject],
    targetReferences = [cloneObject];
  // 先进先出
  while (current = copies.shift()) {
    // 返回对象的属性数组，包括不可枚举的属性
    keys = Object.getOwnPropertyNames(current.source);
    // 可改成 for-in ？
    for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
      // 当前属性的描述符
      descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
      // 当前属性值为空或者不是对象（没考虑函数和其他引用类型），直接复制值
      if (!descriptor.value || typeof descriptor.value !== 'object') {
        Object.defineProperty(current.target, keys[propertyIndex], descriptor);
        continue;
      }
      // 否则将当前的值入栈，进行下一轮循环
      nextSource = descriptor.value;
      descriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));
      // 是否是循环引用
      if (circular) {
        indexOf = sourceReferences.indexOf(nextSource);
        if (indexOf !== -1) {
          // The source is already referenced, just assign reference
          descriptor.value = targetReferences[indexOf];
          Object.defineProperty(current.target, keys[propertyIndex], descriptor);
          continue;
        }
        sourceReferences.push(nextSource);
        targetReferences.push(descriptor.value);
      }
      Object.defineProperty(current.target, keys[propertyIndex], descriptor);
      // 入栈
      copies.push({
        source: nextSource,
        target: descriptor.value
      });
    }
  }
  return cloneObject;
};