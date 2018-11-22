const hintGenerator = hintWord => {
  const template = "\\textbf{Hint:} <REPLACEME> \\newline";
  let replace = "";
  if (hintWord == "") {
    replace = "No hint provided for this question";
  } else {
    replace = `This phrase contains the word '${hintWord}'`;
  }
  return template.replace("<REPLACEME>", replace);
};

const valueGenerator = value => {
  return `\\textbf{Value:} ${value} points \\newline`;
};

const ciphertextGenerator = ciphertext => {
  const splitCiphertext = ciphertext.split("").join(" ");

  const template = `
\\textbf{Ciphertext:} \\newline

${splitCiphertext}

\\hfill`;

  return template;
};

module.exports = {
  hintGenerator,
  valueGenerator,
  ciphertextGenerator
};
