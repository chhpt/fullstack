function averageString(str) {
  const numberMap = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const numbers = str.split(' ');
  let sum = 0;
  numbers.forEach((item) => {
    const index = numberMap.indexOf(item);
    if (index === -1) {
      sum = 'n/a';
    }
    if (typeof sum === 'number') {
      sum += index;
    }
  });
  if (typeof sum === 'string') {
    return sum;
  }
  const average = parseInt(sum / numbers.length);
  return numberMap[average];
}
