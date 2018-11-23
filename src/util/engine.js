import { getRandomInt, getOrError, chooseRandomFromArray } from "./util.js";
import { monoalphabetic } from "./ciphers.js";
import {
  hintGenerator,
  valueGenerator,
  ciphertextGenerator
} from "./latexGenerators.js";

import { quotes } from "../data/quotes.json";
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
  const generatedProblem = {
    problem: {
      ciphertext: "",
      hint: ""
    },
    solution: ""
  };

  const cipherType = chooseRandomFromArray(state.cipherTypes);

  switch (cipherType) {
    case "atbash":
      console.log("atbash");
      break;
    case "caesar":
      console.log("caesar");
      break;
    case "monoalphabetic":
      // grab a random plaintext
      let plaintextObj = chooseRandomFromArray(quotes);

      // choose a variant of the monoalphabetic scramble
      const variants = ["k1", "k2", "random"];
      const chosenVariant = chooseRandomFromArray(variants);

      let keyword = "";

      if (chosenVariant == "k1" || chosenVariant == "k2") {
        keyword = chooseRandomFromArray(words);
      }

      // choose a hint word if relevant
      let hintWord = "";

      const quote = plaintextObj.text.split("--")[0];
      if (true /*options.hasOwnProperty("hint") && options.hint */) {
        const words = quote.split(" ");
        let wordIdx;
        do {
          wordIdx = Math.floor(Math.random() * words.length);
        } while (
          !(words[wordIdx].match(/^[A-Z]+$/g) && words[wordIdx].length >= 4)
        );

        hintWord = words[wordIdx];
      }

      // console.log(hintWord);

      // omit spaces, if relevant
      if (false /*options.hasOwnProperty("spaces") && options.spaces */) {
        plaintextObj.text = plaintextObj.text.replace(/\s/g, "");
      }

      // console.log(plaintextObj);

      // execute the actual encryption
      const cipherResult = monoalphabetic(
        plaintextObj.text,
        chosenVariant,
        keyword
      );

      const monoalphabeticOptions = state.monoalphabetic;

      const points = state.hasOwnProperty("points") ? state.points : 0;

      console.log(hintGenerator(hintWord));
      console.log(valueGenerator(points));
      console.log(ciphertextGenerator(cipherResult.ciphertext));
      // console.log(cipherResult);

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
};

export default engine;
