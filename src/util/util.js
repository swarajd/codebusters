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

const reverseLetters = letters.slice().reverse();

// create a map that goes from A->Z, B->Y, ... Y->B, Z->A
const atBashDict = (() => {
  const result = {};
  letters.forEach((letter, i) => (result[letter] = reverseLetters[i]));
  return result;
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

const dedupe = keyword => {
  const letterSet = new Set();
  const result = [];
  keyword.split("").forEach(ch => {
    if (!letterSet.has(ch)) {
      letterSet.add(ch);
      result.push(ch);
    }
  });
  return result.join("");
};

const extractLetters = keyword => {
  const result = [];
  letters.forEach(l => {
    if (!keyword.includes(l)) {
      result.push(l);
    }
  });
  return result;
};

const rotateArray = (arr, n) => {
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
};

const hasCollision = (plaintextArr, ciphertextArr) => {
  for (let i = 0; i < plaintextArr.length; i++) {
    if (plaintextArr[i] === ciphertextArr[i]) {
      return true;
    }
  }
  return false;
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

const generateK1Dict = keyword => {
  // generate a list of letters that exclude the letters from the keyword
  const restOfLetters = extractLetters(keyword);

  // generate the plaintext
  const plaintext = letters;

  // generate the ciphertext
  const rotation = getRandomInt(0, 25);
  let ciphertext = keyword.split("").concat(restOfLetters);
  ciphertext = rotateArray(ciphertext, rotation);

  // if a letter maps to itself, rotate until it doesn't
  while (hasCollision(plaintext, ciphertext)) {
    ciphertext = rotateArray(ciphertext, 1);
  }

  // return the dict to map from one letter to the next
  return zipToDict(plaintext, ciphertext);
};

const flipDict = dict => {
  const result = {};
  for (let key in dict) {
    result[dict[key]] = key;
  }
  return result;
};

const dValues = (() => {
  const result = new Array(letters.length + 1);
  result[0] = 1;
  result[1] = 0;
  for (let i = 2; i < letters.length + 1; i++) {
    result[i] = (i - 1) * (result[i - 1] + result[i - 2]);
  }
  return result;
})();

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

const randomDerangement = arr => {
  const A = arr.slice();
  const mark = new Array(A.length);
  mark.fill(false);
  let i = A.length - 1;
  let u = A.length;

  while (u >= 2) {
    if (!mark[i]) {
      let j = getRandomInt(0, i - 1);
      let marked = mark[j];
      while (marked) {
        j = getRandomInt(0, i - 1);
        marked = mark[j];
      }
      swap(A, i, j);
      let p = Math.random();
      let uVal = ((u - 1) * dValues[u - 2]) / dValues[u];
      if (p < uVal) {
        mark[j] = true;
        u = u - 1;
        // console.log(u, i);
      }
      u = u - 1;
      // console.log(u, i);
    }
    i = i - 1;
    // console.log(u, i);
  }
  return A;
};

const randomDerangementDict = () => {
  return zipToDict(letters, randomDerangement(letters));
};

const mod = (n, m) => ((n % m) + m) % m;

/*
    assuming both letters are capitalized, 
    adding them and returning the 'sum'
*/
const addLetters = (a, b) => {
  const aNum = a.charCodeAt(0) - 65;
  const bNum = b.charCodeAt(0) - 65;

  const sum = mod(aNum + bNum, 26);

  return String.fromCharCode(sum + 65);
};

const extendKey = (key, strLen) => {
  if (key.length > strLen) {
    throw "string too short to extend key";
  }
  const keyLen = key.length;
  const quotient = Math.floor(strLen / keyLen);
  const remainder = strLen % keyLen;

  return key.repeat(quotient) + key.substring(0, remainder);
};

const baconianDict = (() => {
  const baconianArr = letters
    .map((_, i) => i)
    .map(num => num.toString(2).padStart(5, "0"))
    .map(binStr =>
      binStr
        .split("")
        .map(chr => (chr === "1" ? "B" : "A"))
        .join("")
    );

  const baconianDict = zipToDict(letters, baconianArr);
  return baconianDict;
})();

const gcd = (a, b) => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};

const areCoprime = (a, b) => {
  return gcd(a, b) === 1;
};

const affineLetter = (letter, a, b) => {
  const letterNum = letter.charCodeAt(0) - 65;
  const affined = mod(letterNum * a + b, letters.length);
  return String.fromCharCode(affined + 65);
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

module.exports = {
  letters,
  letterDict,
  isLetter,
  atBashDict,
  shiftText,
  dedupe,
  extractLetters,
  zipToDict,
  generateK1Dict,
  flipDict,
  randomDerangementDict,
  addLetters,
  extendKey,
  baconianDict,
  areCoprime,
  affineLetter,
  isInvertible,
  generateRandomInvertibleMatrix,
  matrixMultiply,
  modMatrix,
  transpose
};
