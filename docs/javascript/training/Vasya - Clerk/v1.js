function tickets(peopleInLine) {
  if (peopleInLine[0] !== 25) {
    return 'NO';
  }
  var money = {
    25: 0,
    50: 0,
    100: 0
  };
  var array = peopleInLine.map((v) => {
    money[v]++;
    if (v === 50) {
      if (money['25'] > 0) {
        money['25']--;
        return true;
      } else {
        return false;
      }
    }
    if (v === 100) {
      if (money['25'] && money['50']) {
        money['25']--;
        money['50']--;
        return true;
      } else if (money['25'] >= 3) {
        money['25'] -= 3;
      } else {
        return false;
      }
    }
    return true;
  });
  return array.includes(false) ? 'NO' : 'YES';
}

console.log(tickets([25, 50, 25, 100, 25, 25, 50, 100, 25, 25, 25, 100, 25, 50, 25, 100]));