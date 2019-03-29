const isSquared = n => {
  let divisors = [1];
  if (n !== 1) {
    divisors.push(n);
  }
  // 优化求除数算法
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i !== n / i) {
        divisors.push(n / i);
      }
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