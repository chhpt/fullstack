function Person() {
  this.age = '20';
}

Person.prototype.weight = '120';

function Engineer() {
  this.work = 'Front-End';
}

Engineer.prototype = new Person(); // 此时 Engineer.prototype 没有 constructor 属性
Engineer.prototype.constructor = Engineer;

Engineer.prototype.getAge = function() {
  console.log(this.age);
}

var person = new Person();
var engineer = new Engineer();

console.log(person.age);
engineer.getAge();
console.log(engineer.weight);
console.log(Engineer.prototype.__proto__ == Person.prototype);
console.log(Person.prototype.__proto__ == Object.prototype);