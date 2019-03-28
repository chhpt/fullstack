# String average

## Problem Description

You are given a string of numbers between 0-9. Find the average of these numbers and return it as a floored whole number (ie: no decimal places) written out as a string. Eg:

"zero nine five two" -> "four"

If the string is empty or includes a number greater than 9, return "n/a"

## Sample Tests

``` JavaScript
Test.assertEquals(averageString("zero nine five two"), "four");
Test.assertEquals(averageString("four six two three"), "three");
Test.assertEquals(averageString("one two three four five"), "three");
Test.assertEquals(averageString("five four"), "four");
Test.assertEquals(averageString("zero zero zero zero zero"), "zero");
Test.assertEquals(averageString("one one eight one"), "two");
Test.assertEquals(averageString(""), "n/a");
```