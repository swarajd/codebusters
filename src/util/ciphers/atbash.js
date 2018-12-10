import { letters, getOrDefault, chooseRandomFromArray } from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion,
  generateSolution
} from "../latexGenerators.js";

import { englishQuotes } from "../../data/englishQuotes.json";

const reverseLetters = letters.slice().reverse();

// create a map that goes from A->Z, B->Y, ... Y->B, Z->A
const atbashDict = (() => {
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
      .map(c => (atbashDict.hasOwnProperty(c) ? atbashDict[c] : c))
      .join(""),
    solution: atbashDict
  };
};

const atbashProblemTeX = atbashDict => {
  let { problemtext, problem, ..._ } = atbashDict;
  return generateQuestion(
    cipherTypeGenerator("Atbash"),
    categoryTeXGenerator("Question", problemtext),
    categoryTeXGenerator("Ciphertext", splitText(problem)),
    ""
  );
};

const atbashSolutionTeX = atbashDict => {
  let { solution, ..._ } = atbashDict;
  return generateSolution(
    categoryTeXGenerator("Plaintext", splitText(solution))
  );
};

const atbashEngine = state => {
  let ciphertype = "Atbash";
  let problemtext = "Decrypt the given text";
  let problem = "";
  let hint = "";
  let solution = "";

  const plaintext = getOrDefault(
    state,
    "plaintext",
    () => chooseRandomFromArray(englishQuotes).text
  );

  const result = atbash(plaintext);

  problem = result.ciphertext;
  solution = result.plaintext;

  return {
    ciphertype,
    problemtext,
    problem,
    hint,
    solution
  };
};

module.exports = {
  atbash,
  atbashDict,
  atbashProblemTeX,
  atbashSolutionTeX,
  atbashEngine
};
