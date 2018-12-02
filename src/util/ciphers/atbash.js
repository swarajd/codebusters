import { letters } from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion
} from "../latexGenerators.js";

const reverseLetters = letters.slice().reverse();

const atBashDict = (() => {
  const result = {};
  letters.forEach((letter, i) => (result[letter] = reverseLetters[i]));
  return result;
})();

const atbash = text => {
  return {
    plaintext: text,
    ciphertext: text
      .toUpperCase()
      .split("")
      .map(c => (atBashDict.hasOwnProperty(c) ? atBashDict[c] : c))
      .join(""),
    solution: atBashDict
  };
};

const atbashProblemTeX = atbashDict => {
  let { ciphertext, ..._ } = atbashDict;
  return generateQuestion(
    cipherTypeGenerator("Atbash"),
    categoryTeXGenerator("Ciphertext", splitText(ciphertext)),
    ""
  );
};

const atbashSolutionTeX = atbashDict => {
  let { plaintext, ..._ } = atbashDict;
  return `
${categoryTeXGenerator("Plaintext", splitText(plaintext))}
  `;
};

module.exports = {
  atbash,
  atbashProblemTeX,
  atbashSolutionTeX
};
