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
