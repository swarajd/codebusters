const util = require("../util/util.js");

const letters = util.letters;

const overallTemplate = `
\\begin{table}
\\centering
\\resizebox{\\columnwidth}{!}{%
\\begin{tabular}{ <COLUMNS> } 
\\hline
<FIRSTROW>
\\hline
<RESTOFROWS>
\\end{tabular}%
}
\\end{table}
`;

const arrayRotate = (arr, count) => {
  let arrCpy = arr.slice();
  count -= arrCpy.length * Math.floor(count / arrCpy.length);
  arrCpy.push.apply(arrCpy, arrCpy.splice(0, count));
  return arrCpy;
};

let columns = "|c".repeat(27) + "|";

let firstRow = ["-"].concat(letters).join(" & ") + " \\\\";

let rowArray = [];

for (let i = 0; i < letters.length; i++) {
  let tmpLetters =
    [letters[i]].concat(arrayRotate(letters, i)).join(" & ") + " \\\\\n\\hline";
  rowArray.push(tmpLetters);
}

const filledInTemplate = overallTemplate
  .replace("<COLUMNS>", columns)
  .replace("<FIRSTROW>", firstRow)
  .replace("<RESTOFROWS>", rowArray.join("\n"));

console.log(filledInTemplate);
