import { extendKey, addLetters } from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion
} from "../latexGenerators.js";

const vigenere = (text, key) => {
  if (key === undefined) {
    throw "key missing for vigenere cipher";
  }

  const extendedKey = extendKey(key, text.length);

  let ciphertext = text
    .toUpperCase()
    .split("")
    .map((l, i) => addLetters(l, extendedKey[i]))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: key
  };
};

const vigenereEngine = state => {
  let ciphertype = "Vigenere";
  let problemtext = "";
  let problem = "";
  let hint = "";
  let solution = "";

  // grab the options
  const options = state.vigenere;

  // choose a random problem type
  const problemType = chooseRandomFromArray(options.types);

  // grab a random word
  const word = getOrDefault(state, "word", () => {
    return chooseRandomFromArray(words);
  });

  const plaintext = getOrDefault(state, "plaintext", () => {
    let result = "";
    do {
      result = chooseRandomFromArray(englishQuotes).text;
    } while (result.length > 250);
    return result;
  });

  const condensedPlaintext = condenseStr(plaintext);

  const result = vigenere(condensedPlaintext, word);

  if (problemType === "encryption") {
    problemtext = "encrypt the following phrase with the given word";
    problem = result.plaintext;
    solution = result.ciphertext;
    hint = `The word used for encryption is: '${word}'`;
  } else if (problemType === "decryption") {
    problemtext =
      "decrypt the following phrase with the word used to encrypt it";
    problem = result.ciphertext;
    solution = result.plaintext;
    hint = `The word used for decryption is: '${word}'`;
  } else if (problemType === "crib") {
    problemtext = "Decrypt the following ciphertext with the given crib";

    problem = result.ciphertext;
    solution = result.plaintext;

    const offset = Math.floor(word.length / 2);
    let cribPlaintextSlice = solution.slice(offset, offset + chosenWord.length);
    let cribCiphertextSlice = problem.slice(offset, offset + chosenWord.length);

    hint = {
      plaintext: cribPlaintextSlice,
      ciphertext: cribCiphertextSlice
    };
  } else {
  }
};

const vigenereProblemTeX = vigenereDict => {
  let { ciphertext, ..._ } = vigenereDict;
  return generateQuestion(
    cipherTypeGenerator("Vigenere"),
    categoryTeXGenerator("Ciphertext", splitText(ciphertext)),
    ""
  );
};

const vigenereSolutionTeX = vigenereDict => {
  let { plaintext, ..._ } = vigenereDict;
  return `
${categoryTeXGenerator("Plaintext", splitText(plaintext))}
  `;
};

const vigenereEngine = state => {};

module.exports = {
  vigenere,
  vigenereProblemTeX,
  vigenereSolutionTeX
};
