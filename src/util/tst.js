const util = require("./util.js");

const p = util.generateRandomResultFromSet(util.primesTo20);
const q = util.generateRandomResultFromSet(util.primesTo20);

console.log(p, q);

// const keypair = util.generateKeyPair(p, q);
