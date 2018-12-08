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
  let { problem, ..._ } = atbashDict;
  return generateQuestion(
    cipherTypeGenerator("Atbash"),
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
  let problemtext = "";
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
  atbashProblemTeX,
  atbashSolutionTeX,
  atbashEngine
};