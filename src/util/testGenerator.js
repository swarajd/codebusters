const fs = require("fs");

import engine from "./engine.js";

import {
  generateTestHeader,
  generateSolutionsHeader,
  utilitiesPage
} from "./latexGenerators.js";

import { affineProblemTeX, affineSolutionTeX } from "./ciphers/affine";
import { atbashProblemTeX, atbashSolutionTeX } from "./ciphers/atbash";
import { baconianProblemTeX, baconianSolutionTeX } from "./ciphers/baconian";
import { caesarProblemTeX, caesarSolutionTeX } from "./ciphers/caesar";
import { hillProblemTeX, hillSolutionTeX } from "./ciphers/hill";
import {
  monoalphabeticProblemTeX,
  monoalphabeticSolutionTeX
} from "./ciphers/monoalphabetic";
import { vigenereProblemTeX, vigenereSolutionTeX } from "./ciphers/vigenere";
import { RSAProblemTeX, RSASolutionTeX } from "./ciphers/rsa";

import test from "./2019-state-TEST-test.json";

const sanitizeText = title => {
  return title.replace(/[/\-?%*:|"<>. ]/g, "");
};

const { title, author, date, division, questions, redacted } = test;

const testFileName = `${sanitizeText(title)}_Test.tex`;
// console.log(testFileName);
const solutionsFileName = `${sanitizeText(title)}_Solutions.tex`;
// console.log(solutionsFileName);

//TODO: update for States
const processDict = dict => {
  const cipherType = dict.ciphertype;

  if (cipherType === "Affine") {
    return {
      problemTeX: affineProblemTeX(dict),
      solutionTeX: affineSolutionTeX(dict)
    };
  } else if (cipherType === "Atbash") {
    return {
      problemTeX: atbashProblemTeX(dict),
      solutionTeX: atbashSolutionTeX(dict)
    };
  } else if (cipherType === "Baconian") {
    return {
      problemTeX: baconianProblemTeX(dict),
      solutionTeX: baconianSolutionTeX(dict)
    };
  } else if (cipherType === "Caesar") {
    return {
      problemTeX: caesarProblemTeX(dict),
      solutionTeX: caesarSolutionTeX(dict)
    };
  } else if (cipherType === "Hill") {
    return {
      problemTeX: hillProblemTeX(dict),
      solutionTeX: hillSolutionTeX(dict)
    };
  } else if (cipherType === "Monoalphabetic") {
    return {
      problemTeX: monoalphabeticProblemTeX(dict),
      solutionTeX: monoalphabeticSolutionTeX(dict)
    };
  } else if (cipherType === "Vigenere") {
    return {
      problemTeX: vigenereProblemTeX(dict),
      solutionTeX: vigenereSolutionTeX(dict)
    };
  } else if (cipherType === "RSA") {
    return {
      problemTeX: RSAProblemTeX(dict),
      solutionTeX: RSASolutionTeX(dict)
    };
  } else {
    throw "unknown cipher type";
  }
};

const testArray = [];
testArray.push(generateTestHeader(title, author, date));
if (division === "B") {
  testArray.push(utilitiesPage);
}

const solutionsArray = [];
solutionsArray.push(generateSolutionsHeader(title, author, date));
solutionsArray.push(utilitiesPage);

for (let i = 0; i < questions.length; i++) {
  const problemDict = engine(questions[i]);
  let { problemTeX, solutionTeX } = processDict(problemDict);

  if (i === redacted - 1) {
    problemTeX = problemTeX.replace(
      /\\textbf{Cipher Type:} \w+/g,
      "CIPHER TYPE NOT SPECIFIED"
    );
  }

  testArray.push(problemTeX);
  solutionsArray.push(solutionTeX);
}

testArray.push("\\end{document}");
solutionsArray.push("\\end{document}");

fs.writeFileSync(testFileName, testArray.join("\n"));
fs.writeFileSync(solutionsFileName, solutionsArray.join("\n"));
