import engine from "../../src/util/engine.js";

import { detectType } from "../../src/util/util.js";

import {
  hillEngine,
  hillProblemTeX,
  hillSolutionTeX
} from "../../src/util/ciphers/hill.js";

test("testing the hill cipher (produce, pairs)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { ciphertype, problemtext, problem, hint, solution } = engine(state);

    const problemType = detectType(problem);
    const solutionType = detectType(solution);

    expect(ciphertype).toEqual("Hill");
    expect(problemType).toEqual("Pairs");
    expect(solutionType).toEqual("Matrix");
    expect(problemtext).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
    expect(hint).toEqual("");
  }
});

test("testing the hill cipher (produce, matrix)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["matrix"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { ciphertype, problemtext, problem, hint, solution } = engine(state);

    const problemType = detectType(problem);
    const solutionType = detectType(solution);

    expect(ciphertype).toEqual("Hill");
    expect(problemType).toEqual("Matrix");
    expect(solutionType).toEqual("Matrix");
    expect(problemtext).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
    expect(hint).toEqual("");
  }
});

test("testing the hill cipher (encryption, matrix) (no sizes given)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual("must choose at least one matrix size");
  }
});

test("testing the hill cipher (encryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(2);
  }
});

test("testing the hill cipher (encryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(3);
  }
});

test("testing the hill cipher (decryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(2);
  }
});

test("testing the hill cipher (decryption, matrix, 3x3)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(3);
  }
});

test("testing the hill cipher (unknown problem type)", () => {
  const problemType = "asdf";

  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: [problemType],
      methods: ["matrix"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual(`unknown problem type '${problemType}'`);
  }
});

test("testing the hill TeX problem generator (encryption w/ 2x2)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\\\"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Plaintext:")).toBeTruthy();
  expect(problemLines[4]).toEqual(plaintext);
  expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX problem generator (encryption w/ 3x3)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\\\"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Plaintext:")).toBeTruthy();
  expect(problemLines[4]).toEqual(plaintext);
  expect(matrixLines.length).toEqual(3);
});

test("testing the hill TeX problem generator (decryption w/ 2x2)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\\\"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[4].length).toEqual(plaintext.length);
  expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX problem generator (decryption w/ 3x3)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\\\"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[4].length).toEqual(plaintext.length);
  expect(matrixLines.length).toEqual(3);
});

test("testing the hill TeX problem generator (produce w/ matrix)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\\\"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Matrix:")).toBeTruthy();
  expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX problem generator (produce w/ pairs)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const problemTeX = hillProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = problemLines.filter(l => l.includes("\\Rightarrow"));

  expect(problemTeX.includes("Hill")).toBeTruthy();
  expect(problemTeX.includes("Pairs:")).toBeTruthy();
  expect(matrixLines.length).toEqual(4);
});

test("testing the hill TeX solution generator (encryption w/ 2x2)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const solutionTeX = hillSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);
  // const matrixLines = solutionLines.filter(l => l.includes("\\Rightarrow"));

  expect(solutionTeX.includes("Ciphertext:")).toBeTruthy();
  // expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX solution generator (decryption w/ 2x2)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const solutionTeX = hillSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);
  // const matrixLines = solutionLines.filter(l => l.includes("\\Rightarrow"));

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual(plaintext);
  // expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX solution generator (produce w/ 2x2)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const solutionTeX = hillSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = solutionLines.filter(l => l.includes("\\\\"));

  expect(solutionTeX.includes("Matrix:")).toBeTruthy();
  expect(matrixLines.length).toEqual(2);
});

test("testing the hill TeX solution generator (produce w/ pairs)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"],
      matrixSizes: [2]
    }
  };

  const problemDict = hillEngine(state);
  const solutionTeX = hillSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);
  const matrixLines = solutionLines.filter(l => l.includes("\\\\"));

  expect(solutionTeX.includes("Matrix:")).toBeTruthy();
  expect(matrixLines.length).toEqual(2);
});
