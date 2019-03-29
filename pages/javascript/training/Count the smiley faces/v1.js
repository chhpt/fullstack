//return the total number of smiling faces in the array
function countSmileys(arr) {
  let i = 0;
  arr.forEach((element) => {
    if(element.match(/[:;]{1}[-~]?[)D]{1}/g)) i++;
  });
  return i;
}

console.log(countSmileys([':)',':(',':D',':O',':;']));