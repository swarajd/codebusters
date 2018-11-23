import { getRandomInt, getOrError, chooseRandomFromArray } from "./util.js";
import { monoalphabetic, atbash, caesar } from "./ciphers.js";
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
    solution: ""
  };

  const cipherType = chooseRandomFromArray(state.cipherTypes);
  let plaintextObj = chooseRandomFromArray(englishQuotes);

  switch (cipherType) {
    case "atbash":
      const res = atbash(plaintextObj.text);

      generatedProblem = {
        problem: {
          ciphertext: res.ciphertext,
          hint: ""
        },
        solution: res.plaintext
      };

      break;
    case "caesar":
      const res = caesar(plaintextObj.text);

      generatedProblem = {
        problem: {
          ciphertext: res.ciphertext,
          hint: ""
        },
        solution: res.plaintext
      };
      break;
    case "monoalphabetic":
      // grab the options
      const monoalphabeticOptions = state.monoalphabetic;

      // switch to spanish quote, if relevant
      if (monoalphabeticOptions.xenocrypt) {
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
      if (monoalphabeticOptions.hint) {
        const words = quote.split(/\s+/);
        const validWords = words
          .map(w => w.replace(/(^\W)?(\W$)?/g, ""))
          .filter(w => w.match(/^[A-Z]+$/g))
          .filter(w => w.length >= 4);

        hintWord = chooseRandomFromArray(validWords);
      }

      // introduce an error/errors, if relevant
      let filteredPlaintext = plaintextObj.text;
      if (monoalphabeticOptions.errors) {
        filteredPlaintext = filteredPlaintext.replace(/[^\w\s]/g, "");
      }

      // omit spaces, if relevant
      let plaintext = filteredPlaintext;
      if (!monoalphabeticOptions.spaces) {
        plaintext = plaintext.replace(/\s/g, "");
      }

      // execute the actual encryption
      const cipherResult = monoalphabetic(plaintext, chosenVariant, keyword);

      generatedProblem = {
        problem: {
          ciphertext: cipherResult.ciphertext,
          hint: hintWord
        },
        solution: plaintextObj.text
      };

      break;
    case "affine":
      console.log("affine");
      break;
    case "vigenere":
      console.log("vigenere");
      break;
    case "baconian":
      console.log("baconian");
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
