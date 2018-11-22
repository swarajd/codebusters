const util = require("../util/util.js");

const overallTemplate = `
\\begin{tabular}{ |c|c|c|c| } 
<REPLACEME>
\\hline
\\end{tabular}
`;

const keyValTemplate = `
\\hline
<FSTKEY> & <FSTVAL> & <SNDKEY> & <SNDVAL> \\\\`;

let templateArray = [];
let keyArray = [];

for (let key in util.baconianDict) {
  keyArray.push(key);
}

for (let i = 0; i < keyArray.length / 2; i++) {
  const fst = i;
  const snd = i + keyArray.length / 2;
  const filledInRow = keyValTemplate
    .replace("<FSTKEY>", keyArray[fst])
    .replace("<FSTVAL>", util.baconianDict[keyArray[fst]])
    .replace("<SNDKEY>", keyArray[snd])
    .replace("<SNDVAL>", util.baconianDict[keyArray[snd]]);
  templateArray.push(filledInRow);
}

let finalTemplate = overallTemplate.replace(
  "<REPLACEME>",
  templateArray.join("")
);

console.log(finalTemplate);
