import { shiftText, zipToDict, letters } from "../util.js";

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

const caesarHTML = caesarDict => {
  let { ciphertext, plaintext, ..._ } = caesarDict;
  return (
    <div class="question">
      <div class="problem">
        <div class="element">
          <b class="element-title">Ciphertext:</b>
          <p class="element-text"> {ciphertext} </p>
        </div>
      </div>
      <div class="solution">
        <div class="element">
          <b class="element-title">Plaintext:</b>
          <p class="element-text"> {plaintext} </p>
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
