// 参看 solutions
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function averageString(str) {
  const num = str.split(' ').map(n => numbers.indexOf(n));
  if (num.includes(-1)) return 'n/a';
  const sum = num.reduce((sum, value) => sum + value);
  const average = Math.floor(sum / num.length);
  return numbers[average];
}

