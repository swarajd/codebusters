export default {
  problem: {
    ciphertext: "",
    hint: ""
  },
  solution: "",
  cipherTypes: [
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
    types: ["encryption", "analysis"]
  },
  /*
  types are:
  - encryption
  - decryption
  - crib
  */
  vigenere: {
    types: ["encryption", "decryption", "crib"]
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
    types: ["encryption", "decryption", "produce"],
    methods: ["matrix", "pairs"],
    matrixSizes: [2, 3]
  }
};
