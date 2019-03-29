function Super(properties){
  this.properties = [].concat(properties);
  this.colors = ['red', 'blue', 'green']; 
}

function Sub(properties){ 
  // 继承了 Super，传递参数，互不影响
  Super.call(this, properties); 
}

var instance1 = new Sub(['instance1']); 
instance1.colors.push('black'); 
console.log(instance1.colors); // 'red,blue,green,black'
console.log(instance1.properties[0]); // 'instance1'

var instance2 = new Sub(); 
console.log(instance2.colors); // 'red,blue,green'
console.log(instance2.properties[0]); // 'undefined'