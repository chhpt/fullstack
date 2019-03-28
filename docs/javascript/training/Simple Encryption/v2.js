function encrypt(text, n) {
  if (!text || n <= 0) {
    return text;
  }
  const length = text.length;
  while (n--) {
    let temp = '';
    for (let i = 1; i < length; i += 2) {
      temp += text[i];
    }
    for (let i = 0; i < length; i += 2) {
      temp += text[i];
    }

    text = temp;
  }
  return text;
}

function decrypt(encryptedText, n) {
  if (!encryptedText || n <= 0) {
    return encryptedText;
  }
  const length = encryptedText.length;
  while (n--) {
    const temp = [];
    let index = 0;
    for (let i = 1; i < length; i += 2) {
      temp[i] = encryptedText[index++]
    }
    for (let i = 0; i < length; i += 2) {
      temp[i] = encryptedText[index++]
    }
    encryptedText = temp.join('');
  }
  return encryptedText;
}