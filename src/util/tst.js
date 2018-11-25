import engine from "./engine.js";

const state = {
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
    "hill"
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
    types: ["encryption"]
  },
  /*
  types are:
  - encryption
  - decryption
  - crib
  */
  vigenere: {
    types: ["encryption", "decryption"]
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
    types: ["produce"],
    methods: ["matrix", "pairs"],
    matrixSizes: [2]
  }
};

let customProblems = [
  {
    cipherTypes: ["atbash"]
  },
  {
    cipherTypes: ["caesar"]
  },
  {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  },
  {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: false,
      errors: false,
      xenocrypt: false
    }
  },
  {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  },
  {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
      hint: false,
      errors: false,
      xenocrypt: false
    }
  },
  {
    cipherTypes: ["affine"]
  },
  {
    cipherTypes: ["vigenere"]
  },
  {
    cipherTypes: ["baconian"]
  },
  {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["matrix"]
    }
  },
  {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"]
    }
  }
];

for (let i = 0; i < customProblems.length; i++) {
  const newState = Object.assign({}, state, customProblems[i]);
  const generatedProblem = engine(newState);

  console.log(generatedProblem);
  console.log("\n\n\n\n\n\n");
}
