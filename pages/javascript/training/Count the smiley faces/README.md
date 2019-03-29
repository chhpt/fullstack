# Count the smiley faces

## Problem Description

Given an array (arr) as an argument complete the function countSmileys that should return the total number of smiling faces.

Rules for a smiling face:

- Each smiley face must contain a valid pair of eyes. Eyes can be marked as `:` or `;`
- A smiley face can have a nose but it does not have to. Valid characters for a nose are `-` or `~`
- Every smiling face must have a smiling mouth that should be marked with either `)` or `D`.

No additional characters are allowed except for those mentioned.
Valid smiley face examples:
`:) :D ;-D :~)`

Invalid smiley faces:
`;( :> :} :]`

Example cases:

``` JavaScript
countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;
```

Note: In case of an empty array return 0. You will not be tested with invalid input (input will always be an array)

Happy coding!

## Sample Tests

```JavaScript
Test.describe("Basic testing", function() {
  it("", _ => {
    Test.assertEquals(countSmileys([]), 0);
    Test.assertEquals(countSmileys([':D',':~)',';~D',':)']), 4);
    Test.assertEquals(countSmileys([':)',':(',':D',':O',':;']), 2);
    Test.assertEquals(countSmileys([';]', ':[', ';*', ':$', ';-D']), 1);
  });
});
```