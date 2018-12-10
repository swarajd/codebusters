import engine from "../../src/util/engine.js";

import {
  monoalphabeticEngine,
  monoalphabeticProblemTeX,
  monoalphabeticSolutionTeX
} from "../../src/util/ciphers/monoalphabetic.js";

test("testing monoalphabetic result of engine (*nothing given*)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
      hint: false,
      errors: false,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    expect(hint).toEqual("");
    expect(problem.length).toBeLessThanOrEqual(solution.length);
    expect(!problem.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (hint)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintWord = hint.substring(
      hint.indexOf("'") + 1,
      hint.lastIndexOf("'")
    );

    expect(solution.includes(hintWord)).toEqual(true);
    expect(problem.length).toBeLessThanOrEqual(solution.length);
    expect(!problem.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (spaces, hint)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintWord = hint.substring(
      hint.indexOf("'") + 1,
      hint.lastIndexOf("'")
    );

    expect(solution.includes(hintWord)).toEqual(true);
    expect(problem.length).toEqual(solution.length);
  }
});

test("testing monoalphabetic result of engine (spaces, hint, error)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: true,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintWord = hint.substring(
      hint.indexOf("'") + 1,
      hint.lastIndexOf("'")
    );

    expect(solution.includes(hintWord)).toEqual(true);
    expect(problem.length).toBeLessThanOrEqual(solution.length);
    expect(problem.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (spaces, hint, error, xenocrypt)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: true,
      xenocrypt: true
    }
  };
  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintWord = hint.substring(
      hint.indexOf("'") + 1,
      hint.lastIndexOf("'")
    );

    expect(solution.includes(hintWord)).toEqual(true);
    expect(problem.length).toBeLessThanOrEqual(solution.length);
    expect(problem.includes(" ")).toEqual(true);
  }
});

test("testing the monoalphabetic TeX problem generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  };

  const problemDict = monoalphabeticEngine(state);
  const problemTeX = monoalphabeticProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Monoalphabetic")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  const ciphertext = problemLines[8];
  expect(ciphertext.length).toEqual(plaintext.length);

  for (let i = 0; i < ciphertext.length; i++) {
    expect(plaintext[i]).not.toBe(ciphertext[i]);
  }
});

test("testing the monoalphabetic TeX solution generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  };

  const problemDict = monoalphabeticEngine(state);
  const solutionTeX = monoalphabeticSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("ABCD");
});
