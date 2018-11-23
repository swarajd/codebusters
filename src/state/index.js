export default {
  problem: {
    ciphertext: "",
    hint: ""
  },
  solution: "",
  cypherTypes: [
    "atbash",
    "caesar",
    "monoalphabetic",
    "affine",
    "vigenere",
    "baconian",
    "hill",
    "RSA"
  ],
  monoalphabetic: {
    spaces: true,
    hint: true,
    errors: false,
    xenocrypt: false
  },
  /*
  types are:
  - encryption
  - analysis
  */
  affine: {
    type: "encryption"
  },
  /*
  types are:
  - encryption
  - decryption
  - crib
  */
  vigenere: {
    type: "decryption"
  },
  /*
    types are:
    - encryption
    - decryption
    - produce
    methods are:
    - matrix
    - pairs
  */
  hill: {
    type: "decryption",
    method: "matrix",
    matrixSize: 2
  }
};
