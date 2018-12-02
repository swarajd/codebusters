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
    <div class="card">
      <div class="card-header">
        <div class="card-title h3">Problem</div>
      </div>
      <div class="card-body">
        <div>
          <h5> Plaintext: </h5>
          <p>
            Lisp has jokingly been called "the most intelligent way to misuse a
            computer". I think that description is a great compliment because it
            transmits the full flavor of liberation: it has assisted a number of
            our most gifted fellow humans in thinking previously impossible
            thoughts. -- Edsger Dijkstra, CACM, 15:10
          </p>
        </div>
        <div>
          <h5> Hint: </h5>
          <div align="center">
            <p>The encryption matrix is as follows:</p>
            <table class="matrix">
              <tr>
                <td>1+3i</td>
                <td>2+i</td>
                <td>10</td>
              </tr>
              <tr>
                <td>4-3i</td>
                <td>5</td>
                <td>-2</td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <h5> Hint: </h5>
          <p>
            The plaintext ⇒ ciphertext letter pairs are: a ⇒ b, c ⇒ d, e ⇒ f, g
            ⇒ h
          </p>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary">Show Solution</button>
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
