import {
  letters,
  getOrDefault,
  chooseRandomFromArray,
  zipToDict
} from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  tagGenerator,
  generateProblemSection
} from "../latexGenerators.js";

import { englishQuotes } from "../../data/englishQuotes.json";

const baconianDict = (() => {
  const baconianArr = letters
    .map((_, i) => i)
    .map(num => num.toString(2).padStart(5, "0"))
    .map(binStr =>
      binStr
        .split("")
        .map(chr => (chr === "1" ? "B" : "A"))
        .join("")
    );

  const baconianDict = zipToDict(letters, baconianArr);
  return baconianDict;
})();

const baconian = text => {
  return {
    plaintext: text,
    ciphertext: text
      .toUpperCase()
      .split("")
      .map(c => (baconianDict.hasOwnProperty(c) ? baconianDict[c] : c))
      .join(""),
    solution: baconianDict
  };
};

const baconianProblemTeX = baconianDict => {
  let { problemtext, problem, points, ..._ } = baconianDict;
  return generateProblemSection(
    tagGenerator("Cipher Type", "Baconian"),
    tagGenerator("Points", points),
    categoryTeXGenerator("Question", problemtext),
    categoryTeXGenerator("Ciphertext", splitText(problem)),
    ""
  );
};

const baconianSolutionTeX = baconianDict => {
  let { solution, ..._ } = baconianDict;
  return generateProblemSection(
    categoryTeXGenerator("Plaintext", splitText(solution))
  );
};

const baconianEngine = state => {
  let ciphertype = "Baconian";
  let points = getOrDefault(state, "points", () => 9999);
  let problemtext = "Decrypt the given text";
  let problem = "";
  let hint = "";
  let solution = "";

  const plaintext = getOrDefault(state, "plaintext", () => {
    let result = "";
    do {
      result = chooseRandomFromArray(englishQuotes).text;
    } while (result.length > 250);
    return result;
  });

  const result = baconian(plaintext);

  problem = result.ciphertext;
  solution = result.plaintext;

  return {
    ciphertype,
    points,
    problemtext,
    problem,
    hint,
    solution
  };
};

module.exports = {
  baconian,
  baconianDict,
  baconianProblemTeX,
  baconianSolutionTeX,
  baconianEngine
};
