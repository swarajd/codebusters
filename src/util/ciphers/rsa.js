import {
  mod,
  getRandomInt,
  gcd,
  multiplicativeInverse,
  getOrDefault
} from "../util.js";

const primesTo20 = (() => {
  const primeArray = new Array(20).fill(true);
  let p = 2;
  while (p < primeArray.length / 2) {
    for (let q = 2; q < primeArray.length / p; q++) {
      primeArray[p * q] = false;
    }
    p++;
    while (!primeArray[p]) {
      p++;
    }
  }
  const primes = primeArray
    .map((v, i) => (v ? i : -1))
    .filter((v, i) => i > 1)
    .filter(v => v > 0);
  return primes;
})();

const modPow = (a, b, n) => {
  let res = 1;
  for (let i = 0; i < b; i++) {
    res = mod(res * a, n);
  }
  return res;
};

const generateKeyPair = (p, q) => {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = getRandomInt(1, phi);

  let g = gcd(e, phi);
  while (g != 1) {
    e = getRandomInt(1, phi);
    g = gcd(e, phi);
  }

  let d = multiplicativeInverse(e, phi);

  return {
    publickey: {
      e,
      n
    },
    privatekey: {
      d,
      n
    }
  };
};

const RSAEncrypt = (text, keypair) => {
  let { n, e } = keypair.publickey;

  // console.log(n, e);

  const ciphertext = text
    .toUpperCase()
    .split("")
    .map(l => l.charCodeAt(0) - 64)
    .map(c => modPow(c, e, n))
    .join(" ");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: keypair
  };
};

const RSADecrypt = (text, keypair) => {
  let { n, d } = keypair.privatekey;

  // console.log(n, d);

  const plaintext = text
    .split(" ")
    .map(x => parseInt(x))
    .map(c => modPow(c, d, n) + 64)
    .map(num => String.fromCharCode(num))
    .join("");

  return {
    plaintext: plaintext,
    ciphertext: text,
    solution: keypair
  };
};

const RSAEngine = state => {
  let ciphertype = "RSA";
  let problemtext = "Encrypt the following word using the given key pair";
  let problem = "";
  let hint = "";
  let solution = "";

  // grab the options
  const pq = getOrDefault(state, "RSApq", () => {
    let p = generateRandomResultFromSet(primesTo20);
    let q = generateRandomResultFromSet(primesTo20);
    while (p == q || p * q < 26) {
      p = generateRandomResultFromSet(primesTo20);
      q = generateRandomResultFromSet(primesTo20);
    }
    return { p, q };
  });

  let { p, q } = pq;

  const keypair = getOrDefault(state, "keypair", () => {
    generateKeyPair(p, q);
  });

  const word = getOrDefault(state, "word", () => {
    return chooseRandomFromArray(words);
  });
  res = RSAEncrypt(word, keypair);

  problem = word;
  hint = keypair;
  solution = res.ciphertext;

  return {
    ciphertype,
    problemtext,
    problem,
    hint,
    solution
  };
};

module.exports = {
  modPow,
  generateKeyPair,
  primesTo20,
  RSAEncrypt,
  RSADecrypt,
  RSAEngine
};
