import {
  chooseRandomFromArray,
  getRandomInt,
  areCoprime,
  letters
} from "./util.js";
import {
  monoalphabetic,
  atbash,
  caesar,
  baconian,
  affine,
  vigenere
} from "./ciphers.js";
import {
  hintGenerator,
  valueGenerator,
  ciphertextGenerator
} from "./latexGenerators.js";

import { englishQuotes } from "../data/englishQuotes.json";
import { spanishQuotes } from "../data/spanishQuotes.json";
import { words } from "../data/words.json";

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
  - problem
    - ciphertext
    - hint/extra info
  - solution
    - plaintext
*/

const engine = state => {
  let generatedProblem = {
    problem: {
      ciphertext: "",
      hint: ""
    },
    solution: {}
  };

  const cipherType = chooseRandomFromArray(state.cipherTypes);
  let plaintextObj = chooseRandomFromArray(englishQuotes);
  let options = {};
  let res = {};
  let problemType = "";

  switch (cipherType) {
    case "atbash":
      res = atbash(plaintextObj.text);

      generatedProblem = {
        problem: {
          ciphertext: res.ciphertext,
          hint: ""
        },
        solution: {
          plaintext: res.plaintext
        }
      };

      break;
    case "caesar":
      res = caesar(plaintextObj.text);

      generatedProblem = {
        problem: {
          ciphertext: res.ciphertext,
          hint: ""
        },
        solution: {
          plaintext: res.plaintext
        }
      };
      break;
    case "monoalphabetic":
      // grab the options
      options = state.monoalphabetic;

      // switch to spanish quote, if relevant
      if (options.xenocrypt) {
        plaintextObj = chooseRandomFromArray(spanishQuotes);
      }

      // choose a variant of the monoalphabetic scramble
      const variants = ["k1", "k2", "random"];
      const chosenVariant = chooseRandomFromArray(variants);

      let keyword = "";
      if (chosenVariant == "k1" || chosenVariant == "k2") {
        keyword = chooseRandomFromArray(words);
      }

      // choose a hint word if relevant
      let hintWord = "";
      let quote = plaintextObj.text.split("--")[0];
      if (options.hint) {
        const words = quote.split(/\s+/);
        const validWords = words
          .map(w => w.replace(/(^\W)?(\W$)?/g, ""))
          .filter(w => w.match(/^[A-Z]+$/g))
          .filter(w => w.length >= 4);

        hintWord = chooseRandomFromArray(validWords);
      }

      // introduce an error/errors, if relevant
      let filteredPlaintext = plaintextObj.text;
      if (options.errors) {
        filteredPlaintext = filteredPlaintext.replace(/[^\w\s]/g, "");
      }

      // omit spaces, if relevant
      let plaintext = filteredPlaintext;
      if (!options.spaces) {
        plaintext = plaintext.replace(/\s/g, "");
      }

      // execute the actual encryption
      const cipherResult = monoalphabetic(plaintext, chosenVariant, keyword);

      generatedProblem = {
        problem: {
          ciphertext: cipherResult.ciphertext,
          hint: hintWord
        },
        solution: {
          plaintext: plaintextObj.text
        }
      };

      break;
    case "affine":
      // grab the options
      options = state.affine;

      problemType = chooseRandomFromArray(options.types);

      let a = getRandomInt(1, 26);
      while (!areCoprime(a, letters.length)) {
        a = getRandomInt(1, 26);
      }
      let b = getRandomInt(1, 26);

      switch (problemType) {
        case "encryption":
          res = affine(plaintextObj.text, a, b);

          generatedProblem = {
            problem: {
              ciphertext: res.plaintext,
              hint: `a: ${a}, b: ${b}`
            },
            solution: {
              plaintext: res.ciphertext
            }
          };

          break;
        case "analysis":
          res = affine(plaintextObj.text, a, b);

          generatedProblem = {
            problem: {
              ciphertext: res.ciphertext,
              hint: ""
            },
            solution: {
              plaintext: res.plaintext,
              a: a,
              b: b
            }
          };
          break;
        default:
          throw `option '${problemType}' for affine not found`;
      }
      break;
    case "vigenere":
      // grab the options
      options = state.vigenere;

      // choose a random problem type
      problemType = chooseRandomFromArray(options.types);

      // grab a random word
      const chosenWord = chooseRandomFromArray(words);

      switch (problemType) {
        case "encryption":
          res = vigenere(plaintextObj.text, chosenWord);

          generatedProblem = {
            problem: {
              ciphertext: plaintextObj.text,
              hint: chosenWord
            },
            solution: {
              plaintext: res.ciphertext
            }
          };
          break;
        case "decryption":
          res = vigenere(plaintextObj.text, chosenWord);

          generatedProblem = {
            problem: {
              ciphertext: res.ciphertext,
              hint: chosenWord
            },
            solution: {
              plaintext: plaintextObj.text
            }
          };

          break;
        case "crib":
          break;
        default:
          throw `option '${problemType}' for vigenere not found`;
      }

      // res = vigenere(plaintextObj.text, chosenWord);

      // generatedProblem = {
      //   problem: {
      //     ciphertext: res.ciphertext,
      //     hint: ""
      //   },
      //   solution: {
      //     plaintext: res.plaintext,
      //     key: res.key
      //   }
      // };
      break;
    case "baconian":
      res = baconian(plaintextObj.text);

      generatedProblem = {
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
      console.log("hill");
      break;
    case "RSA":
      console.log("RSA");
      break;
    default:
      throw "unknown cipher type";
  }

  return generatedProblem;
};

export default engine;
