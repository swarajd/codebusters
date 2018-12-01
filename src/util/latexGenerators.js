const cipherTypeGenerator = type => {
  return `\\textbf{Cipher Type:} ${type} \\newline`;
};

const hintGenerator = (hint, cipherType) => {
  const template = "\\textbf{Hint:} <REPLACEME> \\newline";
  let replace = "";
  if (hint == "") {
    replace = "No hint provided for this question";
  } else {
    if (cipherType == "monoalphabetic") {
      replace = `This phrase contains the word '${hint}'`;
    } else if (cipherType == "affine") {
      replace = `The coefficients are: '${hint}'`;
    } else if (cipherType == "vigenere") {
      replace = `The word to encrypt/decrypt this phrase is '${hint}'`;
    } else if (cipherType == "hill") {
      replace = hint;
    }
  }
  return template.replace("<REPLACEME>", replace);
};

const problemTextGenerator = problemText => {
  const escapedText = problemText.replace(/\%/g, "");

  const splitText = escapedText.match(/.{1,60}/g).join("\n");

  const template = `
\\textbf{Problem:} \\newline

${splitText}

\\hfill`;

  return template;
};

const solutionGenerator = solution => {
  let keys = Object.keys(solution);
  return `\\textbf{Solution:} ${keys.map(
    k => `${k}: ${solution[k]}`
  )} \\newline`;
};

module.exports = {
  cipherTypeGenerator,
  hintGenerator,
  problemTextGenerator,
  solutionGenerator
};
