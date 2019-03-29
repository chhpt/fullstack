function shallowClone(source) {
  if (!source || typeof source !== 'object') {
    return;
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      // 简单的拷贝属性
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}

function Parent() {
  this.name = 'parent';
  this.a = 1;
}

function Child() {
  this.name = 'child';
  this.b = 2;
  Parent.call(this);  
}

Child.prototype = new Parent();

var child1 = new Child();
Object.defineProperty(child1, 'name', {
  writable: false,
  value: 'Mike'
});
var child2 = shallowClone(child1);

console.log(Object.getOwnPropertyDescriptor(child1, 'name')); // Object {value: "Nicholas", writable: false, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(child2, 'name')); // Object {value: "Nicholas", writable: true, enumerable: true, configurable: true}

child1.name = 'newName'; // 严格模式下报错
child2.name = 'newName';
console.log(child1.name); //  Mike
console.log(child2.name); // newName