function encrypt(text, n) {
  if (!text) {
    return text;
  }
  for (let i = 0; i < n; i++) {
    let one = '',
      two = '';
    for (let count = 0; count < text.length; count++) {
      if (count % 2 === 1) {
        one += text[count];
      } else {
        two += text[count];
      }
    }
    text = one + two;
  }
  return text;
}

function decrypt(encryptedText, n) {
  if (!text) {
    return encryptedText;
  }
  const length = encryptedText.length;
  for (let i = 0; i < n; i++) {
    // 少
    const number = length % 2 === 0 ? Math.ceil(length / 2) : Math.ceil(length / 2) - 1;
    const one = encryptedText.substring(0, number);
    // 多
    const two = encryptedText.substring(number);
    let text = '';
    let count = 0;
    for (; count < one.length; count++) {
      text += two[count];
      text += one[count];
    }
    if (one.length !== two.length) {
      text += two[count];
    }
    encryptedText = text;
  }
  return encryptedText;
}