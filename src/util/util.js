/*
    UTILITY SECTION
*/

const letters = (() => {
  const letters = [];
  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(65 + i));
  }
  return letters;
})();

const letterDict = (() => {
  const res = {};
  for (let i = 0; i < letters.length; i++) {
    res[letters[i]] = i;
  }
  return res;
})();

const isLetter = c => /[A-Z]/.test(c);

const shiftChar = (c, n) => {
  if (isLetter(c)) {
    const shiftedNum = ((c.charCodeAt(0) - 65 + n) % 26) + 65;
    return String.fromCharCode(shiftedNum);
  } else {
    return c;
  }
};

const shiftText = (text, n) => {
  return text
    .toUpperCase()
    .split("")
    .map(c => shiftChar(c, n))
    .join("");
};

const zipToDict = (plaintextArr, ciphertextArr) => {
  const result = {};
  for (let i = 0; i < plaintextArr.length; i++) {
    result[plaintextArr[i]] = ciphertextArr[i];
  }
  return result;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const mod = (n, m) => ((n % m) + m) % m;

const gcd = (a, b) => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};

const condenseStr = str => {
  return str
    .split("")
    .map(l => (isLetter(l) ? l : ""))
    .join("");
};

const invertibleValues = new Set([1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]);

const multiplicativeInverse = (x, n) => {
  if (gcd(x, n) != 1) {
    throw `${x} and ${n} are not coprime!`;
  }

  let a = n;
  let b = x;
  let p0 = 0;
  let p1 = 1;

  while (b != 0) {
    let a_ = b;
    let b_ = a % b;
    let q_ = parseInt(a / b); // integer division
    a = a_;
    b = b_;
    let q = q_;

    let p0_ = p1;
    let p1_ = mod(p0 - p1 * q, n);
    p0 = p0_;
    p1 = p1_;
  }

  return p0;
};

const generateRandomResultFromSet = set => {
  return Array.from(set)[getRandomInt(0, set.length - 1)];
};

const chooseRandomFromArray = arr => {
  if (arr.length == 0) {
    throw "no elements in the array!";
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

const getOrDefault = (dictionary, property, defaultValueFn) => {
  if (dictionary.hasOwnProperty(property)) {
    const value = dictionary[property];

    if (value == null || value == undefined || value == "") {
      return defaultValueFn();
    } else {
      return value;
    }
  } else {
    return defaultValueFn();
  }
};

const detectType = value => {
  const constructor = Object.prototype.toString.call(value);
  if (constructor === "[object String]") {
    return "String";
  } else if (constructor === "[object Array]") {
    if (value.length === 4) {
      return "Pairs";
    } else if (
      (value.length === 2 && value[0].length === 2) ||
      (value.length === 3 && value[0].length === 3)
    ) {
      return "Matrix";
    } else {
      throw "unknown type";
    }
  } else if (constructor === "[object Object]") {
    if (value.hasOwnProperty("a") && value.hasOwnProperty("b")) {
      return "AffineKey";
    } else if (
      value.hasOwnProperty("publickey") &&
      value.hasOwnProperty("privatekey")
    ) {
      return "RSAKeyPair";
    } else if (
      value.hasOwnProperty("plaintext") &&
      value.hasOwnProperty("ciphertext")
    ) {
      return "Crib";
    } else {
      throw "unknown type";
    }
  } else {
    throw "unknown type";
  }
};

module.exports = {
  letters,
  letterDict,
  isLetter,
  shiftText,
  zipToDict,
  getRandomInt,
  gcd,
  invertibleValues,
  mod,
  condenseStr,
  multiplicativeInverse,
  generateRandomResultFromSet,
  chooseRandomFromArray,
  getOrDefault,
  detectType
};
