import {
  chooseRandomFromArray,
  getRandomInt,
  letters,
  generateRandomResultFromSet,
  generateKeyPair,
  primesTo20,
  invertMatrix,
  generateRandomInvertibleMatrix,
  isLetter,
  condenseStr,
  matrixToStr
} from "./util.js";
import { baconian, RSAEncrypt, hill } from "./ciphers.js";

import { vigenere } from "./ciphers/vigenere.js";

import { englishQuotes } from "../data/englishQuotes.json";
import { spanishQuotes } from "../data/spanishQuotes.json";
import { words } from "../data/words.json";

import { caesarEngine } from "./ciphers/caesar.js";
import { atbashEngine } from "./ciphers/atbash.js";
import { monoalphabeticEngine } from "./ciphers/monoalphabetic.js";
import { affineEngine } from "./ciphers/affine.js";

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
  let options = {};
  let res = {};
  let problemType = "";
  let condensedPlaintext = "";
  let chosenWord;

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
      // grab the options
      options = state.vigenere;

      // choose a random problem type
      problemType = chooseRandomFromArray(options.types);

      // grab a random word
      chosenWord = chooseRandomFromArray(words);

      condensedPlaintext = condenseStr(plaintextObj.text);

      switch (problemType) {
        case "encryption":
          res = vigenere(condensedPlaintext, chosenWord);

          generatedProblem = {
            cipherType: cipherType,
            problem: {
              plaintext: condensedPlaintext,
              hint: chosenWord
            },
            solution: {
              ciphertext: res.ciphertext
            }
          };
          break;
        case "decryption":
          res = vigenere(condensedPlaintext, chosenWord);

          generatedProblem = {
            cipherType: cipherType,
            problem: {
              ciphertext: res.ciphertext,
              hint: chosenWord
            },
            solution: {
              plaintext: condensedPlaintext
            }
          };

          break;
        case "crib":
          const wordOffset = Math.floor(chosenWord.length / 2);

          // there is a slim chance for a collision
          // but for practice purposes it doesn't matter
          let cribPlaintext = chooseRandomFromArray(englishQuotes).text;
          let cribCiphertext = vigenere(cribPlaintext, chosenWord);

          let cribPlaintextSlice = cribPlaintext.slice(
            wordOffset,
            wordOffset + chosenWord.length
          );
          let cribCiphertextSlice = cribCiphertext.ciphertext.slice(
            wordOffset,
            wordOffset + chosenWord.length
          );

          res = vigenere(plaintextObj.text, chosenWord);

          generatedProblem = {
            cipherType: cipherType,
            problem: {
              ciphertext: res.ciphertext,
              hint: `${cribPlaintextSlice} => ${cribCiphertextSlice}`
            },
            solution: {
              plaintext: res.plaintext
            }
          };

          break;
        default:
          throw `option '${problemType}' for vigenere not found`;
      }
      break;
    case "baconian":
      chosenWord = chooseRandomFromArray(words);

      res = baconian(chosenWord);

      generatedProblem = {
        cipherType: cipherType,
        problem: {
          ciphertext: res.ciphertext,
          hint: ""
        },
        solution: {
          plaintext: res.plaintext
        }
      };
      break;
    case "hill":
      // grab the options
      options = state.hill;

      // choose a random problem type
      problemType = chooseRandomFromArray(options.types);

      // chose a random method type
      const method = chooseRandomFromArray(options.methods);

      // choose options based on if it's enc/dec or production
      let matrixSize = 0;
      if (problemType === "produce") {
        matrixSize = 2;
      } else if (problemType === "encryption" || problemType === "decryption") {
        try {
          matrixSize = chooseRandomFromArray(options.matrixSizes);
        } catch (e) {
          throw "must choose at least one matrix size";
        }
      } else {
        throw `unknown problem type '${problemType}'`;
      }

      // encrypt some string
      const randomMatrix = generateRandomInvertibleMatrix(matrixSize);
      let invertedMatrix = [];
      invertedMatrix = invertMatrix(randomMatrix);
      condensedPlaintext = condenseStr(plaintextObj.text);

      while (condensedPlaintext.length % matrixSize != 0) {
        plaintextObj = chooseRandomFromArray(englishQuotes);
        condensedPlaintext = condenseStr(plaintextObj.text);
      }

      // encrypt the text using the specified matrix size
      res = hill(condensedPlaintext, randomMatrix);

      // generate pairs if relevant
      let pairs = [];
      let pairLetterSet = new Set();
      if (method == "pairs") {
        for (let i = 0; i < 4; i++) {
          let randomIdx = getRandomInt(0, condensedPlaintext.length);
          let randomPlaintextChar = condensedPlaintext[randomIdx];
          while (
            pairLetterSet.has(randomPlaintextChar) ||
            !isLetter(randomPlaintextChar)
          ) {
            randomIdx = getRandomInt(0, condensedPlaintext.length);
            randomPlaintextChar = condensedPlaintext[randomIdx];
          }

          let randomCiphertextChar = res.ciphertext[randomIdx];

          pairs.push([randomPlaintextChar, randomCiphertextChar]);
          pairLetterSet.add(randomPlaintextChar);
        }
      }

      let hillCiphertext = "";
      let hillPlaintext = "";
      let hillHint = "";

      if (problemType === "encryption") {
        hillCiphertext = res.ciphertext;
        hillHint = matrixToStr(randomMatrix);
        hillPlaintext = condensedPlaintext;
      } else if (problemType === "decryption") {
        hillCiphertext = condensedPlaintext;
        hillHint = matrixToStr(invertedMatrix);
        hillPlaintext = res.ciphertext;
      } else {
        if (method === "pairs") {
          hillCiphertext = matrixToStr(pairs);
        } else {
          hillCiphertext = matrixToStr(randomMatrix);
        }

        hillPlaintext = matrixToStr(invertedMatrix);
        hillHint =
          "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs";
      }

      generatedProblem = {
        cipherType: cipherType,
        problem: {
          ciphertext: hillCiphertext,
          hint: hillHint
        },
        solution: {
          plaintext: hillPlaintext
        }
      };

      break;
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
