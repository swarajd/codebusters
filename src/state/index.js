export default {
  ciphertype: "",
  monoalphabetic: {
    spaces: true,
    hint: true,
    errors: false
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
