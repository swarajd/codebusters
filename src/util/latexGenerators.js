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
    .replace(/\%/g, "\\%")
    .match(/.{1,60}/g)
    .join("\n\n");
};

const categoryTeXGenerator = (type, tex) => {
  const template = `
\\textbf{${type}:} \\newline

${tex}

\\hfill`;

  return template;
};

const matrixTeXGenerator = matrix => {
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

const affineKeyGenerator = key => {
  return `$ a = ${key.a}, b = ${key.b} $`;
};

const RSAKeyPairGenerator = keypair => {};

const cribGenerator = crib => {
  return `${crib.plaintext} $ \\Rightarrow $ ${crib.ciphertext}`;
};

const generateTeXForTypedValue = (type, value) => {
  if (type === "String") {
    return splitText(value);
  } else if (type === "Matrix") {
    return matrixTeXGenerator(value);
  } else if (type === "Pairs") {
    return pairsGenerator(value);
  } else if (type === "AffineKey") {
    return affineKeyGenerator(value);
  } else if (type === "RSAKeyPair") {
    //TODO: implement
    return "";
  } else if (type === "Crib") {
    return cribGenerator(value);
  } else {
    throw "unknown type";
  }
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

const generateTestHeader = (title, author, date) => {
  return `
\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphics}
\\usepackage{amsmath}

\\title{${title}}
\\author{${author}}
\\date{${date}}

\\begin{document}

\\maketitle

Name of Participants: \\newline \\par
\\underline{\\hspace{6cm}} \\newline \\par
\\underline{\\hspace{6cm}} \\newline \\par
\\underline{\\hspace{6cm}} \\newline  \\par
School Name: \\newline \\par
\\underline{\\hspace{6cm}} \\newline \\par
Team Number: \\newline \\par
\\underline{\\hspace{3cm}} \\newline \\newline \\newline \\par

\\begin{flushleft}
\\textbf{Warning:} Do not open this packet until instructed! \\newline

\\textbf{Note:} Depending on your division, there may be helpful information on the next page. \\newline

\\textbf{Note:} The first question is TIMED, so be ready! \\newline

\\textbf{Note:} Some of the displayed text in this test may have a situation where
one part of a word is one one line, and the second part of a word is on the next line,
due to each line of ciphertext being a maximum of 60 characters long. Be wary of that!.
\\end{flushleft}

\\newpage
`;
};

const generateSolutionsHeader = (title, author, date) => {
  return `
\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphics}
\\usepackage{amsmath}

\\title{${title} - Solutions}
\\author{${author}}
\\date{${date}}

\\begin{document}

\\maketitle  

\\newpage
`;
};

const tabulaRecta = `
\\begin{table}

\\begin{flushleft}
\\textbf{Tabula Recta:}
\\end{flushleft}

\\centering
\\resizebox{\\columnwidth}{!}{%
\\begin{tabular}{ |c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c| } 
\\hline
- & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z \\\\
\\hline
A & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z \\\\
\\hline
B & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A \\\\
\\hline
C & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B \\\\
\\hline
D & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C \\\\
\\hline
E & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D \\\\
\\hline
F & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E \\\\
\\hline
G & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F \\\\
\\hline
H & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G \\\\
\\hline
I & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H \\\\
\\hline
J & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I \\\\
\\hline
K & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J \\\\
\\hline
L & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K \\\\
\\hline
M & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L \\\\
\\hline
N & N & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M \\\\
\\hline
O & O & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N \\\\
\\hline
P & P & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O \\\\
\\hline
Q & Q & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P \\\\
\\hline
R & R & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q \\\\
\\hline
S & S & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R \\\\
\\hline
T & T & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S \\\\
\\hline
U & U & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T \\\\
\\hline
V & V & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U \\\\
\\hline
W & W & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V \\\\
\\hline
X & X & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W \\\\
\\hline
Y & Y & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X \\\\
\\hline
Z & Z & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y \\\\
\\hline
\\end{tabular}%
}
\\end{table}`;

const baconianKey = `
\\begin{flushleft}
\\textbf{Baconian Key:}
\\end{flushleft}

\\begin{tabular}{ |c|c|c|c| } 

\\hline
A & AAAAA & N & ABBAB \\\\
\\hline
B & AAAAB & O & ABBBA \\\\
\\hline
C & AAABA & P & ABBBB \\\\
\\hline
D & AAABB & Q & BAAAA \\\\
\\hline
E & AABAA & R & BAAAB \\\\
\\hline
F & AABAB & S & BAABA \\\\
\\hline
G & AABBA & T & BAABB \\\\
\\hline
H & AABBB & U & BABAA \\\\
\\hline
I & ABAAA & V & BABAB \\\\
\\hline
J & ABAAB & W & BABBA \\\\
\\hline
K & ABABA & X & BABBB \\\\
\\hline
L & ABABB & Y & BBAAA \\\\
\\hline
M & ABBAA & Z & BBAAB \\\\
\\hline
\\end{tabular}`;

const utilitiesPage = `
${tabulaRecta}

${baconianKey}`;

const generateQuestion = (
  cipherTypeTex,
  problemTextTeX,
  problemTeX,
  hintTeX
) => {
  return `
\\section{}
\\begin{flushleft}

${cipherTypeTex}

${problemTextTeX}

${problemTeX}

${hintTeX}

${solutionLines}

\\end{flushleft}
\\newpage`;
};

const generateSolution = solutionTeX => {
  return `
\\section{}
\\begin{flushleft}

${solutionTeX}

\\end{flushleft}
\\newpage`;
};

module.exports = {
  splitText,
  categoryTeXGenerator,
  matrixTeXGenerator,
  pairsGenerator,
  cipherTypeGenerator,
  solutionLines,
  generateTestHeader,
  generateSolutionsHeader,
  utilitiesPage,
  generateQuestion,
  generateSolution,
  generateTeXForTypedValue
};
