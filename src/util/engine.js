import {
  chooseRandomFromArray,
  generateRandomResultFromSet,
  generateKeyPair,
  primesTo20
} from "./util.js";
import { RSAEncrypt } from "./ciphers.js";

import { englishQuotes } from "../data/englishQuotes.json";
import { words } from "../data/words.json";

import { caesarEngine } from "./ciphers/caesar.js";
import { atbashEngine } from "./ciphers/atbash.js";
import { monoalphabeticEngine } from "./ciphers/monoalphabetic.js";
import { affineEngine } from "./ciphers/affine.js";
import { vigenereEngine } from "./ciphers/vigenere.js";
import { baconianEngine } from "./ciphers/baconian.js";
import { hillEngine } from "./ciphers/hill.js";

/*

options pop up based on which cipher is picked

options would probably have

- cipher type
- generate latex
- cipher specific options
  - monoalphabetic
    - spaces
    - hint
    - grammar errors
  - affine
    - encryption/analysis
  - vigenere
    - encryption/decryption/crib analysis
  - hill
    - decryption matrix given encryption matrix
    - decryption matrix given 4 plaintext-ciphertext pairs
    - encrypting given matrix
      - matrix size

  return value would probably be
  - cipherType
  - problem
    - ciphertext
    - hint/extra info
  - solution
    - plaintext
*/

const engine = state => {
  let generatedProblem = {
    cipherType: "",
    problem: {},
    solution: {}
  };

  const cipherType = chooseRandomFromArray(state.cipherTypes);
  let plaintextObj;
  do {
    plaintextObj = chooseRandomFromArray(englishQuotes);
  } while (plaintextObj.text.length > 250);
  let res = {};

  switch (cipherType) {
    case "atbash":
      return atbashEngine(state);
    case "caesar":
      return caesarEngine(state);
    case "monoalphabetic":
      return monoalphabeticEngine(state);
    case "affine":
      return affineEngine(state);
    case "vigenere":
      return vigenereEngine(state);
    case "baconian":
      return baconianEngine(state);
    case "hill":
      return hillEngine(state);
    case "RSA":
      let p = generateRandomResultFromSet(primesTo20);
      let q = generateRandomResultFromSet(primesTo20);
      while (p == q || p * q < 26) {
        p = generateRandomResultFromSet(primesTo20);
        q = generateRandomResultFromSet(primesTo20);
      }

      const keypair = generateKeyPair(p, q);
      const publickey = keypair.publickey;
      const RSAword = chooseRandomFromArray(words);
      res = RSAEncrypt(RSAword, keypair);

      generatedProblem = {
        cipherType: cipherType,
        problem: {
          plaintext: res.plaintext,
          hint: `publickey = { e: ${publickey.e}, n: ${publickey.n} }`
        },
        solution: {
          ciphertext: res.ciphertext
        }
      };

      break;
    default:
      throw `unknown cipher type '${cipherType}'`;
  }

  return generatedProblem;
};

export default engine;
