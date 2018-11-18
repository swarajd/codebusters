/*
    UTILITIES SECTION
*/

import {
  letters,
  letterDict,
  isLetter,
  zipToDict,
  atBashDict,
  shiftText,
  dedupe,
  generateK1Dict,
  flipDict,
  randomDerangementDict,
  addLetters,
  extendKey,
  baconianDict,
  areCoprime,
  affineLetter,
  matrixMultiply,
  mod,
  modMatrix,
  transpose,
  modPow
} from "./util.js";

/*
    CIPHER SECTION
*/

const caesar = text => {
  return {
    plaintext: text,
    ciphertext: shiftText(text, 13),
    solution: zipToDict(letters, shiftText(letters.join(""), 13).split(""))
  };
};

const atbash = text => {
  return {
    plaintext: text,
    ciphertext: text
      .toUpperCase()
      .split("")
      .map(c => (atBashDict.hasOwnProperty(c) ? atBashDict[c] : c))
      .join(""),
    solution: atBashDict
  };
};

const monoalphabetic = (text, setting, keyword) => {
  if (!(setting === "k1" || setting === "k2" || setting === "random")) {
    // setting should be k1, k2, or random
    throw "invalid cipher type";
  }

  // if the alphabet is a k variant, a word is required
  if (setting === "k1" || setting === "k2") {
    if (keyword == undefined) {
      throw "phrase missing for k1/k2 alphabet";
    } else {
      // remove all the duplicate letters from the keyword
      keyword = dedupe(keyword).toUpperCase();
    }
  }

  let cipherDict;

  // handle the k1 case, where the keyword is in the plaintext alphabet
  if (setting === "k1") {
    // generate the map from one alphabet to another
    cipherDict = generateK1Dict(keyword);
  }

  // handle the k2 case, where the keyword is in the ciphertext alphabet
  if (setting === "k2") {
    // generate the map from one alphabet to another
    cipherDict = flipDict(generateK1Dict(keyword));
  }

  // handle the random monoalphabetic cipher
  if (setting === "random") {
    // generate the map from one alphabet to another
    cipherDict = randomDerangementDict();
  }

  // encrypt the text
  const encrypted = text
    .toUpperCase()
    .split("")
    .map(c => (cipherDict.hasOwnProperty(c) ? cipherDict[c] : c))
    .join("");

  return {
    plaintext: text,
    ciphertext: encrypted,
    solution: cipherDict
  };
};

const vigenere = (text, key) => {
  if (key === undefined) {
    throw "key missing for vigenere cipher";
  }

  const extendedKey = extendKey(key, text.length);

  let ciphertext = text
    .toUpperCase()
    .split("")
    .map((l, i) => addLetters(l, extendedKey[i]))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: key
  };
};

const baconian = text => {
  return {
    plaintext: text,
    ciphertext: text
      .toUpperCase()
      .split("")
      .map(letter => baconianDict[letter])
      .join(""),
    solution: "baconian"
  };
};

const affine = (text, a, b) => {
  if (!areCoprime(a, letters.length)) {
    throw "invalid value for 'a'";
  }

  const ciphertext = text
    .toUpperCase()
    .split("")
    .map(letter => (isLetter(letter) ? affineLetter(letter, a, b) : letter))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: {
      a,
      b
    }
  };
};

const hill = (text, matrix) => {
  if (text.length % matrix.length != 0) {
    throw "please provide a plaintext that can be cleanly divided into " +
      matrix.length +
      " parts";
  }

  const chunks = [];
  for (let i = 0; i < text.length; i += matrix.length) {
    chunks.push(text.substring(i, i + matrix.length));
  }

  const ciphertext = chunks
    .map(chunk => chunk.split(""))
    .map(splitChunk => [splitChunk.map(letter => letterDict[letter])])
    .map(transpose)
    .map(transposedChunk => {
      return modMatrix(matrixMultiply(matrix, transposedChunk), letters.length);
    })
    .map(transpose)
    .map(splitChunk => splitChunk[0].map(num => letters[num]))
    .map(chunk => chunk.join(""))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: matrix
  };
};

const RSAEncrypt = (text, keypair) => {
  let { n, e } = keypair.publickey;

  // console.log(n, e);

  const ciphertext = text
    .split("")
    .map(l => l.charCodeAt(0))
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
    .map(c => modPow(c, d, n))
    .map(num => String.fromCharCode(num))
    .join("");

  return {
    plaintext: plaintext,
    ciphertext: text,
    solution: keypair
  };
};

/*
    EXPORT SECTION
*/

module.exports = {
  caesar,
  atbash,
  monoalphabetic,
  vigenere,
  baconian,
  affine,
  hill,
  RSAEncrypt,
  RSADecrypt
};
