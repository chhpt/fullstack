# Integers: Recreation One

## Problem Description

Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!

Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.

The result will be an array of arrays(in C an array of Pair), each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.

**Examples:**

```JavaScript
list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
list_squared(42, 250) --> [[42, 2500], [246, 84100]]
```

The form of the examples may change according to the language, see Example Tests: for more details.

## Sample Tests

```JavaScript
Test.describe("Basic tests",function() {
Test.assertSimilar(listSquared(1, 250), [[1, 1], [42, 2500], [246, 84100]])
Test.assertSimilar(listSquared(42, 250), [[42, 2500], [246, 84100]])
Test.assertSimilar(listSquared(250, 500), [[287, 84100]])
})
```