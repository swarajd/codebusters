import engine from "../../src/util/engine.js";

import {
  atbashEngine,
  atbashProblemTeX,
  atbashSolutionTeX
} from "../../src/util/ciphers/atbash.js";

test("testing the overall engine with atbash", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["atbash"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Atbash");
  expect(problemtext).toEqual("");
  expect(problem).toEqual("ZYXW");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the atbash engine given plaintext", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["atbash"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = atbashEngine(
    state
  );

  expect(ciphertype).toEqual("Atbash");
  expect(problemtext).toEqual("");
  expect(problem).toEqual("ZYXW");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the atbash engine without a given plaintext", () => {
  const state = {
    cipherTypes: ["atbash"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = atbashEngine(
    state
  );

  expect(ciphertype).toEqual("Atbash");
  expect(problemtext).toEqual("");
  expect(hint).toEqual("");
  expect(problem.length).toEqual(solution.length);
});

test("testing the atbash TeX problem generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["atbash"]
  };

  const problemDict = atbashEngine(state);
  const problemTeX = atbashProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Atbash")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[4]).toEqual("ZYXW");
});

test("testing the atbash TeX solution generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["atbash"]
  };

  const problemDict = atbashEngine(state);
  const solutionTeX = atbashSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("ABCD");
});
