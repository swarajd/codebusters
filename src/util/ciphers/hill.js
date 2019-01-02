import {
  letterDict,
  letters,
  mod,
  getRandomInt,
  invertibleValues,
  multiplicativeInverse,
  getOrDefault,
  chooseRandomFromArray,
  condenseStr,
  isLetter,
  detectType
} from "../util.js";

import {
  splitText,
  categoryTeXGenerator,
  tagGenerator,
  generateProblemSection,
  generateTeXForTypedValue
} from "../latexGenerators.js";

import { englishQuotes } from "../../data/englishQuotes.json";

const matrixMultiply = (A, B) => {
  if (A[0].length != B.length) {
    throw "incompatible matrices";
  }

  const result = Array(A.length)
    .fill(0)
    .map(x => Array(B[0].length).fill(0));

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
};

const modMatrix = (mtx, n) => {
  return mtx.map(row => row.map(i => mod(i, n)));
};

const transpose = matrix => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array(cols)
    .fill(0)
    .map(x => Array(rows.length).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
};

const invertMatrix = mtx => {
  const size = mtx[0].length;

  let result = [];

  if (size == 2) {
    let shifted = [
      [mtx[1][1], mod(-1 * mtx[0][1], letters.length)],
      [mod(-1 * mtx[1][0], letters.length), mtx[0][0]]
    ];

    const determinant = mod(
      mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0],
      letters.length
    );
    const detInverse = multiplicativeInverse(determinant, letters.length);

    result = Array(size)
      .fill(0)
      .map(x => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result[i][j] = mod(shifted[i][j] * detInverse, letters.length);
      }
    }
  } else if (size == 3) {
    result = Array(size)
      .fill(0)
      .map(x => Array(size).fill(0));

    mtx = transpose(mtx);

    const determinant =
      mtx[0][0] * (mtx[1][1] * mtx[2][2] - mtx[1][2] * mtx[2][1]) -
      mtx[0][1] * (mtx[1][0] * mtx[2][2] - mtx[1][2] * mtx[2][0]) +
      mtx[0][2] * (mtx[1][0] * mtx[2][1] - mtx[1][1] * mtx[2][0]);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let tempAdjMtx = getAdjugate(mtx, i, j);
        let curVal = mod(
          tempAdjMtx[0][0] * tempAdjMtx[1][1] -
            tempAdjMtx[0][1] * tempAdjMtx[1][0],
          letters.length
        );

        if ((i + j) % 2 == 1) {
          curVal *= -1;
        }

        result[i][j] = mod(curVal * determinant, letters.length);
      }
    }
  } else {
    throw `can't currently find the modular inverse of ${size}x${size} matrices`;
  }

  return result;
};

const getAdjugate = (mtx, p, q) => {
  let i = 0;
  let j = 0;

  let size = mtx.length;

  let result = Array(size - 1)
    .fill(0)
    .map(x => Array(size - 1).fill(0));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (row != p && col != q) {
        result[i][j++] = mtx[row][col];

        if (j == size - 1) {
          j = 0;
          i++;
        }
      }
    }
  }

  return result;
};

const isInvertible = (mtx, size) => {
  let determinant;

  if (size == 2) {
    determinant = mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0];
  } else if (size == 3) {
    determinant =
      mtx[0][0] * (mtx[1][1] * mtx[2][2] - mtx[1][2] * mtx[2][1]) -
      mtx[0][1] * (mtx[1][0] * mtx[2][2] - mtx[1][2] * mtx[2][0]) +
      mtx[0][2] * (mtx[1][0] * mtx[2][1] - mtx[1][1] * mtx[2][0]);
  } else {
    throw "this size: " + size + " is unsupported";
  }

  determinant = mod(determinant, letters.length);

  return invertibleValues.has(determinant);
};

const generateRandomInvertibleMatrix = size => {
  const result = Array(size)
    .fill(0)
    .map(x => Array(size).fill(0));

  do {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result[i][j] = getRandomInt(0, 25);
      }
    }
  } while (!isInvertible(result, size));

  return result;
};

const hill = (text, matrix) => {
  if (text.length % matrix.length != 0) {
    throw "please provide a plaintext that can be cleanly divided into " +
      matrix.length +
      " parts";
  }

  const chunks = [];
  for (let i = 0; i < text.length; i += matrix.length) {
    chunks.push(text.substring(i, i + matrix.length));
  }

  const ciphertext = chunks
    .map(chunk => chunk.split(""))
    .map(splitChunk => [splitChunk.map(letter => letterDict[letter])])
    .map(transpose)
    .map(transposedChunk => {
      return modMatrix(matrixMultiply(matrix, transposedChunk), letters.length);
    })
    .map(transpose)
    .map(splitChunk => splitChunk[0].map(num => letters[num]))
    .map(chunk => chunk.join(""))
    .join("");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: matrix
  };
};

const hillEngine = state => {
  let ciphertype = "Hill";
  let points = getOrDefault(state, "points", () => 9999);
  let problemtext = "";
  let problem = "";
  let hint = "";
  let solution = "";

  // grab the options
  const options = state.hill;

  // choose a plaintext
  let plaintext = getOrDefault(state, "plaintext", () => {
    let result = "";
    do {
      result = chooseRandomFromArray(englishQuotes).text;
    } while (result.length > 250);
    return result;
  });

  // choose a random problem type
  const problemType = chooseRandomFromArray(options.types);

  // chose a random method type
  const method = chooseRandomFromArray(options.methods);

  // choose a matrix size
  let matrixSize = 0;
  if (problemType === "produce") {
    matrixSize = 2;
  } else if (problemType === "encryption" || problemType === "decryption") {
    try {
      matrixSize = chooseRandomFromArray(options.matrixSizes);
    } catch (e) {
      throw "must choose at least one matrix size";
    }
  } else {
    throw `unknown problem type '${problemType}'`;
  }

  // encrypt some string
  const randomMatrix = getOrDefault(state, "matrix", () => {
    return generateRandomInvertibleMatrix(matrixSize);
  });
  let invertedMatrix = [];
  invertedMatrix = invertMatrix(randomMatrix);
  let condensedPlaintext = condenseStr(plaintext);

  // regenerate matrix while incompatible
  while (
    condensedPlaintext.length % matrixSize != 0 ||
    plaintext.length > 250
  ) {
    plaintext = chooseRandomFromArray(englishQuotes).text;
    condensedPlaintext = condenseStr(plaintext);
  }

  // encrypt the text using the specified matrix size
  const result = hill(condensedPlaintext, randomMatrix);

  // generate pairs if relevant
  let pairs = [];
  if (method == "pairs") {
    // grab a valid plaintext slice
    let startIdx;
    let plaintextSlice;
    let validMatrix;
    do {
      startIdx = getRandomInt(0, condensedPlaintext.length - 4);
      plaintextSlice = condensedPlaintext
        .slice(startIdx, startIdx + 4)
        .split("");

      // validate the slice
      let numArr = plaintextSlice.map(l => letterDict[l.toUpperCase()]);
      let numMatrix = [[numArr[0], numArr[2]], [numArr[1], numArr[3]]];

      validMatrix = isInvertible(numMatrix, 2);
    } while (!validMatrix);

    let ciphertextSlice = result.ciphertext
      .slice(startIdx, startIdx + 4)
      .split("");
    pairs = plaintextSlice.map((c, i) => {
      return [c, ciphertextSlice[i]];
    });
  }

  // encrypting a string given a 2x2 matrix
  if (problemType === "encryption") {
    problemtext = "Encrypt this string using the given encryption matrix";
    problem = result.plaintext;
    hint = randomMatrix;
    solution = result.ciphertext;
  }

  // decrypting a string given a 2x2 matrix
  else if (problemType === "decryption") {
    problemtext = "Decrypt this string using the given decryption matrix";
    problem = result.ciphertext;
    hint = invertedMatrix;
    solution = condensedPlaintext;
  }

  // producing a decryption matrix given either an encryption matrix or pairs
  else {
    if (method === "pairs") {
      problem = pairs;
    } else {
      problem = randomMatrix;
    }

    solution = invertedMatrix;
    problemtext =
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs";
  }

  return {
    ciphertype,
    points,
    problemtext,
    problem,
    hint,
    solution
  };
};

const hillProblemTeX = hillDict => {
  let { problemtext, problem, hint, points, ..._ } = hillDict;

  const problemType = detectType(problem);
  const hintType = detectType(hint);

  const problemTeX = generateTeXForTypedValue(problemType, problem);
  const hintTeX =
    hint !== ""
      ? categoryTeXGenerator("Hint", generateTeXForTypedValue(hintType, hint))
      : "";
  let problemHeader = "";

  if (problemType === "String") {
    if (problemtext.includes("Encrypt")) {
      problemHeader = "Plaintext";
    } else {
      problemHeader = "Ciphertext";
    }
  } else {
    problemHeader = problemType;
  }

  return generateProblemSection(
    tagGenerator("Cipher Type", "Hill"),
    tagGenerator("Points", points),
    categoryTeXGenerator("Question", problemtext),
    categoryTeXGenerator(problemHeader, problemTeX),
    hintTeX
  );
};

const hillSolutionTeX = hillDict => {
  let { problemtext, solution, ..._ } = hillDict;
  const solutionType = detectType(solution);
  const solutionTeX = generateTeXForTypedValue(solutionType, solution);

  let solutionHeader = "";

  if (solutionType === "String") {
    if (problemtext.includes("Encrypt")) {
      solutionHeader = "Ciphertext";
    } else {
      solutionHeader = "Plaintext";
    }
  } else {
    solutionHeader = solutionType;
  }

  return generateProblemSection(
    categoryTeXGenerator(solutionHeader, solutionTeX)
  );
};

module.exports = {
  matrixMultiply,
  modMatrix,
  transpose,
  invertMatrix,
  getAdjugate,
  isInvertible,
  generateRandomInvertibleMatrix,
  hill,
  hillEngine,
  hillProblemTeX,
  hillSolutionTeX
};
