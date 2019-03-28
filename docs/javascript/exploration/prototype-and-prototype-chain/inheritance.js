// 父类
function Super(){
    this.flag = 'super';
}

Super.prototype.getFlag = function(){
    return this.flag;
}
// 子类
function Sub(){
    this.subFlag = 'sub';
}
// 实现继承
Sub.prototype = new Super();
Sub.prototype.getSubFlag = function(){
    return this.subFlag;
}

var instance1 = new Sub();
var instance2 = new Sub();

console.log(instance1.subFlag); // sub
console.log(instance1.flag); // super

instance1.flag = 'new';

console.log(instance1.flag); // 'new'
console.log(instance2.flag); // super