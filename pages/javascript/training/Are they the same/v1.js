function comp(array1, array2) {
  if (array1 === null || array2 === null) return false;
  if (array1.length === 0) return true;
  const result = array2.map((n) => {
    const index = array1.indexOf(Math.sqrt(n));
    if (index > -1) array1.splice(index, 1);
    return index;
  });
  return !result.includes(-1);
}
