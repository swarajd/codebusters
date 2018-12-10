import {
  mod,
  chooseRandomFromArray,
  getOrDefault,
  condenseStr,
  detectType
} from "../util.js";

import { englishQuotes } from "../../data/englishQuotes.json";
import { words } from "../../data/words.json";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion,
  generateSolution,
  generateTeXForTypedValue
} from "../latexGenerators.js";

const addLetters = (a, b) => {
  const aNum = a.charCodeAt(0) - 65;
  const bNum = b.charCodeAt(0) - 65;

  const sum = mod(aNum + bNum, 26);

  return String.fromCharCode(sum + 65);
};

const extendKey = (key, strLen) => {
  if (key.length > strLen) {
    throw "string too short to extend key";
  }
  const keyLen = key.length;
  const quotient = Math.floor(strLen / keyLen);
  const remainder = strLen % keyLen;

  return key.repeat(quotient) + key.substring(0, remainder);
};

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
    problemtext = "decrypt the following ciphertext with the given crib";

    problem = result.ciphertext;
    solution = result.plaintext;

    const offset = Math.floor(word.length / 2);
    let cribPlaintextSlice = solution.slice(offset, offset + word.length);
    let cribCiphertextSlice = problem.slice(offset, offset + word.length);

    hint = {
      plaintext: cribPlaintextSlice,
      ciphertext: cribCiphertextSlice
    };
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

const vigenereProblemTeX = vigenereDict => {
  let { problem, problemtext, hint, ..._ } = vigenereDict;

  const hintType = detectType(hint);
  const hintTeX = generateTeXForTypedValue(hintType, hint);

  // the problem is a standard decryption (decrypt or crib)
  if (problemtext.includes("decrypt")) {
    return generateQuestion(
      cipherTypeGenerator("Vigenere"),
      categoryTeXGenerator("Question", problemtext),
      categoryTeXGenerator("Ciphertext", splitText(problem)),
      categoryTeXGenerator("Word/Crib", hintTeX)
    );
  }

  // the problem is encryption
  else if (problemtext.includes("encrypt")) {
    return generateQuestion(
      cipherTypeGenerator("Vigenere"),
      categoryTeXGenerator("Question", problemtext),
      categoryTeXGenerator("Plaintext", splitText(problem)),
      categoryTeXGenerator("Word", hintTeX)
    );
  }

  // unknown problem type
  else {
    throw "unknown problem type";
  }
};

const vigenereSolutionTeX = vigenereDict => {
  let { solution, problemtext, ..._ } = vigenereDict;

  if (problemtext.includes("decrypt")) {
    return generateSolution(
      `${categoryTeXGenerator("Plaintext", splitText(solution))}`
    );
  }

  // the problem is encryption
  else if (problemtext.includes("encrypt")) {
    return generateSolution(
      `${categoryTeXGenerator("Ciphertext", splitText(solution))}`
    );
  }

  // unknown problem type
  else {
    throw "unknown problem type";
  }
};

module.exports = {
  addLetters,
  extendKey,
  vigenere,
  vigenereEngine,
  vigenereProblemTeX,
  vigenereSolutionTeX
};
