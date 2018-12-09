import engine from "../../src/util/engine.js";

import {
  baconianEngine,
  baconianProblemTeX,
  baconianSolutionTeX
} from "../../src/util/ciphers/baconian.js";

test("testing the overall engine with baconian", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["baconian"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Baconian");
  expect(problemtext).toEqual("");
  expect(problem).toEqual("AAAAAAAAABAAABAAAABB");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the baconian engine given plaintext", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["baconian"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = baconianEngine(
    state
  );

  expect(ciphertype).toEqual("Baconian");
  expect(problemtext).toEqual("");
  expect(problem).toEqual("AAAAAAAAABAAABAAAABB");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the baconian engine without a given plaintext", () => {
  const state = {
    cipherTypes: ["baconian"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = baconianEngine(
    state
  );

  expect(ciphertype).toEqual("Baconian");
  expect(problemtext).toEqual("");
  expect(hint).toEqual("");

  const problemLetters = problem
    .split("")
    .filter(l => l.match(/\w/))
    .join("");
  expect(problemLetters.match(/^[AB]+$/)).toBeTruthy();
});

test("testing the baconian TeX problem generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["baconian"]
  };

  const problemDict = baconianEngine(state);
  const problemTeX = baconianProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Baconian")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[4]).toEqual("AAAAAAAAABAAABAAAABB");
});

test("testing the baconian TeX solution generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["baconian"]
  };

  const problemDict = baconianEngine(state);
  const solutionTeX = baconianSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("ABCD");
});
