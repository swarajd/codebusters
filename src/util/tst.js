const util = require("./util.js");

const p = util.generateRandomResultFromSet(util.primesTo100);
const q = util.generateRandomResultFromSet(util.primesTo100);

console.log(p, q);

// const keypair = util.generateKeyPair(p, q);
