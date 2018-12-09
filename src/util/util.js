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

const matrixMultiply = (A, B) => {
  if (A[0].length != B.length) {
    throw "incompatible matrices";
  }

  const result = Array(A.length)
    .fill(0)
    .map(x => Array(B[0].length).fill(0));

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
};

const modMatrix = (mtx, n) => {
  return mtx.map(row => row.map(i => mod(i, n)));
};

const invertibleValues = new Set([1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]);

const isInvertible = (mtx, size) => {
  let determinant;

  if (size == 2) {
    determinant = mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0];
  } else if (size == 3) {
    determinant =
      mtx[0][0] * (mtx[1][1] * mtx[2][2] - mtx[1][2] * mtx[2][1]) -
      mtx[0][1] * (mtx[1][0] * mtx[2][2] - mtx[1][2] * mtx[2][0]) +
      mtx[0][2] * (mtx[1][0] * mtx[2][1] - mtx[1][1] * mtx[2][0]);
  } else {
    throw "this size: " + size + " is unsupported";
  }

  determinant = mod(determinant, letters.length);

  return invertibleValues.has(determinant);
};

const generateRandomInvertibleMatrix = size => {
  const result = Array(size)
    .fill(0)
    .map(x => Array(size).fill(0));

  do {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result[i][j] = getRandomInt(0, 25);
      }
    }
  } while (!isInvertible(result, size));

  return result;
};

const getAdjugate = (mtx, p, q) => {
  let i = 0;
  let j = 0;

  let size = mtx.length;

  let result = Array(size - 1)
    .fill(0)
    .map(x => Array(size - 1).fill(0));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (row != p && col != q) {
        result[i][j++] = mtx[row][col];

        if (j == size - 1) {
          j = 0;
          i++;
        }
      }
    }
  }

  return result;
};

const invertMatrix = mtx => {
  const size = mtx[0].length;

  let result = [];

  if (size == 2) {
    let shifted = [
      [mtx[1][1], mod(-1 * mtx[0][1], letters.length)],
      [mod(-1 * mtx[1][0], letters.length), mtx[0][0]]
    ];

    const determinant = mod(
      mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0],
      letters.length
    );
    const detInverse = multiplicativeInverse(determinant, letters.length);

    result = Array(size)
      .fill(0)
      .map(x => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result[i][j] = mod(shifted[i][j] * detInverse, letters.length);
      }
    }
  } else if (size == 3) {
    result = Array(size)
      .fill(0)
      .map(x => Array(size).fill(0));

    mtx = transpose(mtx);

    const determinant =
      mtx[0][0] * (mtx[1][1] * mtx[2][2] - mtx[1][2] * mtx[2][1]) -
      mtx[0][1] * (mtx[1][0] * mtx[2][2] - mtx[1][2] * mtx[2][0]) +
      mtx[0][2] * (mtx[1][0] * mtx[2][1] - mtx[1][1] * mtx[2][0]);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let tempAdjMtx = getAdjugate(mtx, i, j);
        let curVal = mod(
          tempAdjMtx[0][0] * tempAdjMtx[1][1] -
            tempAdjMtx[0][1] * tempAdjMtx[1][0],
          letters.length
        );

        if ((i + j) % 2 == 1) {
          curVal *= -1;
        }

        result[i][j] = mod(curVal * determinant, letters.length);
      }
    }
  } else {
    throw `can't currently find the modular inverse of ${size}x${size} matrices`;
  }

  return result;
};

const transpose = matrix => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array(cols)
    .fill(0)
    .map(x => Array(rows.length).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
};

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

const modPow = (a, b, n) => {
  let res = 1;
  for (let i = 0; i < b; i++) {
    res = mod(res * a, n);
  }
  return res;
};

const chooseRandomFromArray = arr => {
  if (arr.length == 0) {
    throw "no elements in the array!";
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

const matrixToStr = mtx => {
  const rendered = mtx
    .map(row => {
      return `[ ${row.join(", ")} ]`;
    })
    .join(", ");

  return `[ ${rendered} ]`;
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
  isInvertible,
  invertibleValues,
  generateRandomInvertibleMatrix,
  invertMatrix,
  matrixMultiply,
  mod,
  condenseStr,
  modMatrix,
  transpose,
  primesTo20,
  multiplicativeInverse,
  generateRandomResultFromSet,
  generateKeyPair,
  modPow,
  chooseRandomFromArray,
  matrixToStr,
  getOrDefault,
  detectType
};
