import {
  splitText,
  categoryTeXGenerator,
  matrixTeXGenerator,
  pairsGenerator,
  cipherTypeGenerator
} from "../../src/util/latexGenerators.js";

test("testing cipher text category labelling", () => {
  const problemType = "Ciphertext";
  const res = categoryTeXGenerator(problemType, "abc");
  const lines = res.split("\n").filter(line => line !== "");

  const titleLine = lines[0];
  expect(titleLine.includes(problemType)).toBeTruthy();
});

test("testing cipher text generation with short text", () => {
  const problemText = splitText("hello");
  const res = categoryTeXGenerator("", problemText);
  const lines = res.split("\n").filter(line => line !== "");

  const cipherTextLine = lines[1];
  expect(cipherTextLine.includes(problemText)).toBeTruthy();
});

test("testing cipher text generation with long text", () => {
  const problemText =
    'LISP HAS JOKINGLY BEEN CALLED "THE MOST INTELLIGENT WAY TO MISUSE A COMPUTER". I THINK THAT DESCRIPTION IS A GREAT COMPLIMENT BECAUSE IT TRANSMITS THE FULL FLAVOR OF LIBERATION: IT HAS ASSISTED A NUMBER OF OUR MOST GIFTED FELLOW HUMANS IN THINKING PREVIOUSLY IMPOSSIBLE THOUGHTS. -- EDSGER DIJKSTRA, CACM, 15:10';
  const splitProblemText = splitText(problemText);
  const res = categoryTeXGenerator("", splitProblemText);
  const lines = res.split("\n").filter(line => line !== "");

  const rebuiltCipherText = lines.slice(1, -1).join("");
  expect(problemText).toEqual(rebuiltCipherText);
});

test("testing matrix generation with 2x2 matrix", () => {
  const matrix = [[1, 2], [3, 4]];

  const res = matrixTeXGenerator(matrix);
  const lines = res.split("\n").filter(line => line !== "");

  const matrixLines = lines.slice(2, -2);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      expect(matrixLines[i].includes(matrix[i][j])).toBeTruthy();
    }
  }
});

test("testing matrix generation with 3x3 matrix", () => {
  const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const res = matrixTeXGenerator(matrix);
  const lines = res.split("\n").filter(line => line !== "");

  const matrixLines = lines.slice(2, -2);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      expect(matrixLines[i].includes(matrix[i][j])).toBeTruthy();
    }
  }
});

test("testing pairs generation", () => {
  const pairs = [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"]];

  const res = pairsGenerator(pairs);
  const lines = res.split("\n").filter(line => line !== "");

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      expect(lines[i].includes(pairs[i][j])).toBeTruthy();
    }
  }
});

test("testing cipher type generation", () => {
  const type = "asdf";
  const res = cipherTypeGenerator(type);

  expect(res.includes(type)).toBeTruthy();
});
