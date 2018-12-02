// const hintGenerator = (hint, cipherType) => {
//   const template = "\\textbf{Hint:} <REPLACEME> \\newline";
//   let replace = "";
//   if (hint == "") {
//     replace = "No hint provided for this question";
//   } else {
//     if (cipherType == "monoalphabetic") {
//       replace = `This phrase contains the word '${hint}'`;
//     } else if (cipherType == "affine") {
//       replace = `The coefficients are: '${hint}'`;
//     } else if (cipherType == "vigenere") {
//       replace = `The word to encrypt/decrypt this phrase is '${hint}'`;
//     } else if (cipherType == "hill") {
//       replace = hint;
//     }
//   }
//   return template.replace("<REPLACEME>", replace);
// };

// const solutionGenerator = solution => {
//   let keys = Object.keys(solution);
//   return `\\textbf{Solution:} ${keys.map(
//     k => `${k}: ${solution[k]}`
//   )} \\newline`;
// };

// =====

const splitText = text => {
  return text
    .replace(/\%/g, "")
    .match(/.{1,60}/g)
    .join("\n");
};

const categoryTeXGenerator = (type, tex) => {
  const template = `
\\textbf{${type}:} \\newline

${tex}

\\hfill`;

  return template;
};

const matrixGenerator = matrix => {
  const matrix_body = matrix.map(row => row.join(" & ") + " \\\\").join("\n");

  const template = `
\\[
\\begin{bmatrix}
${matrix_body}
\\end{bmatrix}
\\]
  `;

  return template;
};

const pairsGenerator = pairs => {
  return pairs
    .map(pair => `$ ${pair[0]} \\Rightarrow ${pair[1]} $ \\newline`)
    .join("\n");
};

const cipherTypeGenerator = type => {
  return `\\textbf{Cipher Type:} ${type} \\newline`;
};

const solutionLines = `
\\textbf{Solution:}  \\newline \\newline 
\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.5pt}} \\newline \\newline
\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.5pt}} \\newline \\newline
\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.5pt}} \\newline \\newline
\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{0.5pt}} \\newline \\newline
`;

module.exports = {
  splitText,
  categoryTeXGenerator,
  matrixGenerator,
  pairsGenerator,
  cipherTypeGenerator,
  solutionLines
};
