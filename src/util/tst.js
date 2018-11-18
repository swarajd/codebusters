const util = require("./util.js");

const p = util.generateRandomPrimeFromSet(util.primesTo100);
const q = util.generateRandomPrimeFromSet(util.primesTo100);

console.log(p, q);

// const keypair = util.generateKeyPair(p, q);
