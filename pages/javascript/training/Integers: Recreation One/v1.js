const isSquared = n => {
  let divisors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }
  const sum = divisors.reduce((prev, next) => prev + next * next);
  return [Number.isInteger(Math.sqrt(sum)), sum];
}

function listSquared(m, n) {
  let array = [];
  for (let i = m; i <= n; i++) {
    const [isSquare, sum] = isSquared(i);
    if (isSquare) {
      array.push([i, sum]);
    }
  }
  return array;
}

console.log(listSquared(1, 250));
