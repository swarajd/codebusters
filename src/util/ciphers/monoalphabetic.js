import {
  letters,
  getRandomInt,
  zipToDict,
  chooseRandomFromArray,
  getOrDefault
} from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion,
  generateSolution
} from "../latexGenerators.js";

import { englishQuotes } from "../../data/englishQuotes.json";
import { spanishQuotes } from "../../data/spanishQuotes.json";
import { words } from "../../data/words.json";

const dedupe = keyword => {
  const letterSet = new Set();
  const result = [];
  keyword.split("").forEach(ch => {
    if (!letterSet.has(ch)) {
      letterSet.add(ch);
      result.push(ch);
    }
  });
  return result.join("");
};

const rotateArray = (arr, n) => {
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
};

const hasCollision = (plaintextArr, ciphertextArr) => {
  for (let i = 0; i < plaintextArr.length; i++) {
    if (plaintextArr[i] === ciphertextArr[i]) {
      return true;
    }
  }
  return false;
};

const generateK1Dict = keyword => {
  // generate a list of letters that exclude the letters from the keyword
  const restOfLetters = extractLetters(keyword);

  // generate the plaintext
  const plaintext = letters;

  // generate the ciphertext
  const rotation = getRandomInt(0, 25);
  let ciphertext = keyword.split("").concat(restOfLetters);
  ciphertext = rotateArray(ciphertext, rotation);

  // if a letter maps to itself, rotate until it doesn't
  while (hasCollision(plaintext, ciphertext)) {
    ciphertext = rotateArray(ciphertext, 1);
  }

  // return the dict to map from one letter to the next
  return zipToDict(plaintext, ciphertext);
};

const flipDict = dict => {
  const result = {};
  for (let key in dict) {
    result[dict[key]] = key;
  }
  return result;
};

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

const dValues = (() => {
  const result = new Array(letters.length + 1);
  result[0] = 1;
  result[1] = 0;
  for (let i = 2; i < letters.length + 1; i++) {
    result[i] = (i - 1) * (result[i - 1] + result[i - 2]);
  }
  return result;
})();

const randomDerangement = arr => {
  const A = arr.slice();
  const mark = new Array(A.length);
  mark.fill(false);
  let i = A.length - 1;
  let u = A.length;

  while (u >= 2) {
    if (!mark[i]) {
      let j = getRandomInt(0, i - 1);
      let marked = mark[j];
      while (marked) {
        j = getRandomInt(0, i - 1);
        marked = mark[j];
      }
      swap(A, i, j);
      let p = Math.random();
      let uVal = ((u - 1) * dValues[u - 2]) / dValues[u];
      if (p < uVal) {
        mark[j] = true;
        u = u - 1;
        // console.log(u, i);
      }
      u = u - 1;
      // console.log(u, i);
    }
    i = i - 1;
    // console.log(u, i);
  }
  return A;
};

const randomDerangementDict = alphabetList => {
  return zipToDict(alphabetList, randomDerangement(alphabetList));
};

const extractLetters = keyword => {
  const result = [];
  letters.forEach(l => {
    if (!keyword.includes(l)) {
      result.push(l);
    }
  });
  return result;
};

const monoalphabetic = (text, setting, keyword) => {
  if (!(setting === "k1" || setting === "k2" || setting === "random")) {
    // setting should be k1, k2, or random
    throw "invalid cipher type";
  }

  // if the alphabet is a k variant, a word is required
  if (setting === "k1" || setting === "k2") {
    if (keyword == undefined) {
      throw "phrase missing for k1/k2 alphabet";
    } else {
      // remove all the duplicate letters from the keyword
      keyword = dedupe(keyword).toUpperCase();
    }
  }

  let cipherDict;

  // handle the k1 case, where the keyword is in the plaintext alphabet
  if (setting === "k1") {
    // generate the map from one alphabet to another
    cipherDict = generateK1Dict(keyword);
  }

  // handle the k2 case, where the keyword is in the ciphertext alphabet
  if (setting === "k2") {
    // generate the map from one alphabet to another
    cipherDict = flipDict(generateK1Dict(keyword));
  }

  // handle the random monoalphabetic cipher
  if (setting === "random") {
    // generate the map from one alphabet to another
    cipherDict = randomDerangementDict(letters);
  }

  // encrypt the text
  const encrypted = text
    .toUpperCase()
    .split("")
    .map(c => (cipherDict.hasOwnProperty(c) ? cipherDict[c] : c))
    .join("");

  return {
    plaintext: text,
    ciphertext: encrypted,
    solution: cipherDict
  };
};

const monoalphabeticProblemTeX = problemDict => {
  let { problem, hint, ..._ } = problemDict;

  let hintTeX = hint !== "" ? categoryTeXGenerator("Hint", hint) : "";

  return generateQuestion(
    cipherTypeGenerator("Monoalphabetic"),
    categoryTeXGenerator("Ciphertext", splitText(problem)),
    hintTeX
  );
};

const monoalphabeticSolutionTeX = problemDict => {
  let { solution, ..._ } = problemDict;
  return generateSolution(
    categoryTeXGenerator("Plaintext", splitText(solution))
  );
};

const monoalphabeticEngine = state => {
  let ciphertype = "Monoalphabetic";
  let problemtext = "";
  let problem = "";
  let hint = "";
  let solution = "";

  const options = state.monoalphabetic;

  // pick the plaintext
  if (options.xenocrypt) {
    solution = chooseRandomFromArray(spanishQuotes).text;
  } else {
    solution = getOrDefault(state, "plaintext", () => {
      let result = "";
      do {
        result = chooseRandomFromArray(englishQuotes).text;
      } while (result.length > 250);
      return result;
    });
  }

  // choose a variant of the monoalphabetic scramble
  const variants = ["k1", "k2", "random"];
  const chosenVariant = chooseRandomFromArray(variants);

  // grab a keyword for k1/k2 encryption
  let keyword = "";
  if (chosenVariant == "k1" || chosenVariant == "k2") {
    keyword = getOrDefault(state, "word", () => chooseRandomFromArray(words));
  }

  // choose a hint word if relevant
  let hintWord = "";
  let quote = solution.split("--")[0];
  if (options.hint) {
    const words = quote.split(/\s+/);
    const validWords = words
      .map(w => w.replace(/(^\W)?(\W$)?/g, ""))
      .filter(w => w.match(/^[A-Z]+$/g))
      .filter(w => w.length >= 4);

    hintWord = chooseRandomFromArray(validWords);
  }

  // introduce an error/errors, if relevant
  let plaintext = solution;
  if (options.errors) {
    plaintext = solution.replace(/[^\w\s]/g, "");
  }

  // omit spaces, if relevant
  if (!options.spaces) {
    plaintext = plaintext.replace(/\s/g, "");
  }

  const result = monoalphabetic(plaintext, chosenVariant, keyword);

  problem = result.ciphertext;
  hint = hintWord !== "" ? `The phrase contains the word '${hintWord}'.` : "";

  return {
    ciphertype,
    problemtext,
    problem,
    hint,
    solution
  };
};

module.exports = {
  randomDerangementDict,
  monoalphabetic,
  monoalphabeticProblemTeX,
  monoalphabeticSolutionTeX,
  monoalphabeticEngine
};
