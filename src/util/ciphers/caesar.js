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
  tagGenerator,
  generateProblemSection,
  generateScoringLegend
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
  let { problemtext, problem, points, ..._ } = problemDict;
  return generateProblemSection(
    tagGenerator("Cipher Type", "Caesar"),
    tagGenerator("Points", points),
    categoryTeXGenerator("Question", problemtext),
    categoryTeXGenerator("Ciphertext", splitText(problem, true)),
    ""
  );
};

const caesarSolutionTeX = problemDict => {
  let { solution, points, ..._ } = problemDict;
  return generateProblemSection(
    categoryTeXGenerator("Plaintext", splitText(solution)),
    generateScoringLegend(points)
  );
};

const caesarEngine = state => {
  let ciphertype = "Caesar";
  let points = getOrDefault(state, "points", () => 9999);
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
    points,
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
