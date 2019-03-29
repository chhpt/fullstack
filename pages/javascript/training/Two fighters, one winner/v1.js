function declareWinner(fighter1, fighter2, firstAttacker) {
  const oneCount = Math.ceil(fighter2.health / fighter1.damagePerAttack);
  const twoCount = Math.ceil(fighter1.health / fighter2.damagePerAttack);
  if (oneCount === twoCount) {
    return firstAttacker;
  }
  return oneCount < twoCount ? fighter1.name : fighter2.name;
}