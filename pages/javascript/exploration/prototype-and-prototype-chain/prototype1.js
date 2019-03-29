function Person(name) {
  this.name = name;
}

Person.prototype.age = '20';
Person.prototype.sayName = function() {
  console.log(this.name);
}

var person1 = new Person('Jack');
var person2 = new Person('Mike');

person1.sayName(); // Jack
person2.sayName(); // Mike
console.log(person1.age); // 20
console.log(person2.age); // 20

console.log(Person.prototype.isPrototypeOf(person1));
console.log(Object.getPrototypeOf(person1) == Person.prototype);