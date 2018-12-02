import { shiftText, zipToDict, letters } from "../util.js";

import { categoryHTMLGenerator, solutionButton } from "../htmlGenerators.js";

import { h } from "hyperapp";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  solutionLines
} from "../latexGenerators.js";

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
  return `
${cipherTypeGenerator("Caesar")}
${categoryTeXGenerator("Ciphertext", splitText(ciphertext))}
${solutionLines}
  `;
};

const caesarSolutionTeX = caesarDict => {
  return ``;
};

module.exports = {
  caesar,
  caesarHTML,
  caesarProblemTeX,
  caesarSolutionTeX
};
