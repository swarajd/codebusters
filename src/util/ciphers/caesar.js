import {
  shiftText,
  zipToDict,
  letters,
  getOrDefault,
  chooseRandomFromArray
} from "../util.js";

import { categoryHTMLGenerator, solutionButton } from "../htmlGenerators.js";

import { h } from "hyperapp";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion,
  generateSolution
} from "../latexGenerators.js";

import { englishQuotes } from "../data/englishQuotes.json";

const caesar = text => {
  return {
    plaintext: text,
    ciphertext: shiftText(text, 13),
    solution: zipToDict(letters, shiftText(letters.join(""), 13).split(""))
  };
};

const caesarHTML = (caesarDict, showSolution) => {
  let { ciphertext, plaintext, ..._ } = caesarDict;
  return (
    <div class="problem">
      <div class="card">
        <div class="card-header">
          <div class="card-title h3">Problem</div>
        </div>
        <div class="card-body">
          {categoryHTMLGenerator("Ciphertext", <p>{ciphertext}</p>)}
        </div>
        {solutionButton}
      </div>
      <div class="card" hidden={showSolution}>
        <div class="card-header">
          <div class="card-title h3">Solution</div>
        </div>
        <div class="card-body">
          {categoryHTMLGenerator("Plaintext", <p>{plaintext}</p>)}
        </div>
      </div>
    </div>
  );
};

const caesarProblemTeX = caesarDict => {
  let { ciphertext, ..._ } = caesarDict;
  return generateQuestion(
    cipherTypeGenerator("Caesar"),
    categoryTeXGenerator("Ciphertext", splitText(ciphertext)),
    ""
  );
};

const caesarSolutionTeX = caesarDict => {
  let { plaintext, ..._ } = caesarDict;
  return generateSolution(
    categoryTeXGenerator("Plaintext", splitText(plaintext))
  );
};

const caesarEngine = state => {
  const plaintext = getOrDefault(state, "plaintext", () =>
    chooseRandomFromArray(englishQuotes)
  );

  const result = caesar(plaintext);

  return {
    ciphertext: result.ciphertext,
    plaintext: result.plaintext
  };
};

module.exports = {
  caesar,
  caesarHTML,
  caesarProblemTeX,
  caesarSolutionTeX,
  caesarEngine
};
