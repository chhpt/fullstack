var array = [1, 'string', {a: 1,b: 2, obj: {c: 3}}];
// slice()
var array1 = array.slice();
// concat()
var array2 = array.concat();
// 改变原数组元素
array[1] = 'newString';
array[2].c = 4;

console.log(array1[1]); // string
console.log(array1[2].c); // 4
console.log(array2[1]); // string
console.log(array2[2].c); // 4