function narcissistic(value) {
  return value === String(value).split('').reduce((sum, v) => sum + Math.pow(v, value.toString().length), 0);
}
console.log(narcissistic(371));