function highAndLow(numbers) {
  numbers = numbers.split(' ');
  var min = Math.min.apply(null, numbers);
  var max = Math.max.apply(null, numbers);
  return max + ' ' + min;
}
