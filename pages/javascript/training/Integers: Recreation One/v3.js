// 参考 solutions
const isSquared = n => {
  let divisors = [];
  // 优化求除数算法
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i) {
      continue;
    }
    divisors.push(i);
    if (i !== n / i) {
      divisors.push(n / i);
    }
  }
  divisors.push(n);
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