# Does my number look big in this

## Problem Description

A Narcissistic Number is a number which is the sum of its own digits, each raised to the power of the number of digits.

For example, take 153 (3 digits):

```JavaScript
1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
```

and 1634 (4 digits):

```JavaScript
1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634
```

The Challenge:

Your code must return true or false depending upon whether the given number is a Narcissistic number.

Error checking for text strings or other invalid inputs is not required, only valid integers will be passed into the function.

## Sample Tests

```JavaScript
describe( "Narcissistic Function", function() {
  it( "should find small numbers are all narcissistic", function() {
    Test.expect( narcissistic( 7 ), "7 is narcissistic" );
  });
  it( "should find these numbers are narcissistic", function() {
    Test.expect( narcissistic( 371 ), "371 is narcissistic" );
  });
});
```