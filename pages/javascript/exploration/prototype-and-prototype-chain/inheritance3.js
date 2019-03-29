function Super(properties){
  this.properties = [].concat(properties);
  this.colors = ['red', 'blue', 'green']; 
}

Super.prototype.log = function() {
  console.log(this.properties[0]);
}

function Sub(properties){ 
  // 继承了 Super，传递参数，互不影响
  Super.call(this, properties); 
}
// 继承了父类型的原型
Sub.prototype = new Super();
// isPrototypeOf() 和 instance 能正常使用
Sub.prototype.constructor = Sub;

var instance1 = new Sub(['instance1']); 
instance1.colors.push('black'); 
console.log(instance1.colors); // 'red,blue,green,black'
instance1.log(); // 'instance1'

var instance2 = new Sub(); 
console.log(instance2.colors); // 'red,blue,green'
instance2.log(); // 'undefined'