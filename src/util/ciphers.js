/*
    UTILITIES SECTION
*/

import {
  letters,
  letterDict,
  matrixMultiply,
  modMatrix,
  transpose,
  modPow
} from "./util.js";

/*
    CIPHER SECTION
*/

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

/*
    EXPORT SECTION
*/

module.exports = {
  hill,
  RSAEncrypt,
  RSADecrypt
};
