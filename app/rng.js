function randInt(n){
  return Math.floor(Math.random() * n);
}

function nRandoms(n, len) {
  let result = Array(len).fill('');
  return result.map(randInt.bind(null, n))
}


module.exports = {
  randInt,
  nRandoms
}
