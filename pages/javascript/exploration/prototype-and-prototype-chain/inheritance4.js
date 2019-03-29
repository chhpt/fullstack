function inheritPrototype(child, parent) {
  var F = function () {}
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
}

function Super(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Super.prototype.sayName = function () {
  console.log(this.name);
};

function Sub(name, age) {
  // 继承基本属性和方法
  SuperType.call(this, name);
  this.age = age;
}

// 继承原型上的属性和方法
inheritPrototype(Sub, Spuer);

Sub.prototype.log = function () {
  console.log(this.age);
};