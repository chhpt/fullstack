function countSmileys(arr) {
  return arr.filter(v => v.match(/[:;]{1}[-~]?[)D]{1}/g)).length;
}

console.log(countSmileys([':)',':(',':D',':O',':;']));