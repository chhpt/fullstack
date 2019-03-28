function Person() {}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

// 设置 phone 属性为不可写
Object.defineProperty(person1, 'phone', {
  writable: false,
  value: '100'
});

// 新增一个访问器属性 address
Object.defineProperty(person1, 'address', {
  set: function(value) {
    console.log('set');
    address = value;
  },
  get: function() {
    return address;
  }
});

// 注意，此处不能用 name，因为函数本身存在 name 属性
console.log(person1.hasOwnProperty('age')); // false
console.log(Person.hasOwnProperty('age')); // false

person1.name = 'Greg';
console.log(person1.hasOwnProperty('name')); // true
console.log(person1.name); //'Greg'——来自实例
console.log(person2.name); //'Nicholas'——来自原型

person1.phone = '123'; // 严格模式下报错
person1.address = 'china hua'; // 调用 set 方法，输出 'set'
console.log(person1.address); // 'china hua'
console.log(person1.phone); // 100