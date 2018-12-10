import {
  shiftText,
  zipToDict,
  letters,
  getOrDefault,
  chooseRandomFromArray
} from "../util.js";

// import { categoryHTMLGenerator, solutionButton } from "../htmlGenerators.js";

// import { h } from "hyperapp";

import {
  splitText,
  categoryTeXGenerator,
  cipherTypeGenerator,
  generateQuestion,
  generateSolution
} from "../latexGenerators.js";

import { englishQuotes } from "../../data/englishQuotes.json";

const caesar = text => {
  return {
    plaintext: text,
    ciphertext: shiftText(text, 13),
    solution: zipToDict(letters, shiftText(letters.join(""), 13).split(""))
  };
};

// const caesarHTML = (problemDict, showSolution) => {
//   let { ciphertext, plaintext, ..._ } = problemDict;
//   return (
//     <div class="problem">
//       <div class="card">
//         <div class="card-header">
//           <div class="card-title h3">Problem</div>
//         </div>
//         <div class="card-body">
//           {categoryHTMLGenerator("Ciphertext", <p>{ciphertext}</p>)}
//         </div>
//         {solutionButton}
//       </div>
//       <div class="card" hidden={showSolution}>
//         <div class="card-header">
//           <div class="card-title h3">Solution</div>
//         </div>
//         <div class="card-body">
//           {categoryHTMLGenerator("Plaintext", <p>{plaintext}</p>)}
//         </div>
//       </div>
//     </div>
//   );
// };

const caesarProblemTeX = problemDict => {
  let { problemtext, problem, ..._ } = problemDict;
  return generateQuestion(
    cipherTypeGenerator("Caesar"),
    categoryTeXGenerator("Question", problemtext),
    categoryTeXGenerator("Ciphertext", splitText(problem)),
    ""
  );
};

const caesarSolutionTeX = problemDict => {
  let { solution, ..._ } = problemDict;
  return generateSolution(
    categoryTeXGenerator("Plaintext", splitText(solution))
  );
};

const caesarEngine = state => {
  let ciphertype = "Caesar";
  let problemtext = "Decrypt the given text";
  let problem = "";
  let hint = "";
  let solution = "";

  const plaintext = getOrDefault(
    state,
    "plaintext",
    () => chooseRandomFromArray(englishQuotes).text
  );

  const result = caesar(plaintext);

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
  caesar,
  // caesarHTML,
  caesarProblemTeX,
  caesarSolutionTeX,
  caesarEngine
};
