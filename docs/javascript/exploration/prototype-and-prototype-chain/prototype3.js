function Person() {
  this.name = 'Mike';
}

Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person = new Person();

for (var item in person) {
  console.log(item); // name age job sayName
}

console.log('name' in person); // true - 来自实例
console.log('age' in person); //  true - 来自原型