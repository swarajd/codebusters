import {
  gcd,
  letters,
  isLetter,
  mod,
  getOrDefault,
  getRandomInt,
  chooseRandomFromArray
} from "../util.js";

import { englishQuotes } from "../../data/englishQuotes.json";
import { words } from "../../data/words.json";

const areCoprime = (a, b) => {
  return gcd(a, b) === 1;
};

const affineLetter = (letter, a, b) => {
  const letterNum = letter.charCodeAt(0) - 65;
  const affined = mod(letterNum * a + b, letters.length);
  return String.fromCharCode(affined + 65);
};

const affine = (text, a, b) => {
  if (!areCoprime(a, letters.length)) {
    throw "invalid value for 'a'";
  }

  const ciphertext = text
    .toUpperCase()
    .split("")
    .map(letter => (isLetter(letter) ? affineLetter(letter, a, b) : letter))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: {
      a,
      b
    }
  };
};

const affineEngine = state => {
  let ciphertype = "Affine";
  let problemtext = "";
  let problem = "";
  let hint = "";
  let solution = "";

  let a, b;

  // grab the options
  const options = state.affine;

  // grab/generate the affine key
  let key = getOrDefault(state, "affineKey", () => {
    a = getRandomInt(1, 26);
    while (!areCoprime(a, letters.length)) {
      a = getRandomInt(1, 26);
    }
    b = getRandomInt(1, 26);
    return { a, b };
  });

  ({ a, b } = key);

  let problemType = chooseRandomFromArray(options.types);

  if (problemType === "encryption") {
    // grab the word to encrypt
    let word = getOrDefault(state, "word", () => {
      return chooseRandomFromArray(words);
    });

    const result = affine(word, a, b);

    problemtext = "Encrypt the word using the given key";
    problem = result.plaintext;
    hint = key;
    solution = result.ciphertext;
  } else if (problemType === "analysis") {
    let text = getOrDefault(state, "plaintext", () => {
      let result = "";
      do {
        result = chooseRandomFromArray(englishQuotes).text;
      } while (result.length > 250);
      return result;
    });

    const result = affine(text, a, b);

    problem = result.ciphertext;
    solution = text;
  } else {
    throw "unknown problem type";
  }

  return {
    ciphertype,
    problemtext,
    problem,
    hint,
    solution
  };
};

module.exports = {
  areCoprime,
  affine,
  affineEngine
};