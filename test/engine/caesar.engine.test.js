import engine from "../../src/util/engine.js";

import {
  caesarEngine,
  caesarProblemTeX,
  caesarSolutionTeX
} from "../../src/util/ciphers/caesar.js";

test("testing the overall engine with caesar", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["caesar"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Caesar");
  expect(problemtext).toEqual("Decrypt the given text");
  expect(problem).toEqual("NOPQ");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the caesarian engine given plaintext", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["caesar"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = caesarEngine(
    state
  );

  expect(ciphertype).toEqual("Caesar");
  expect(problemtext).toEqual("Decrypt the given text");
  expect(problem).toEqual("NOPQ");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the caesarian engine without a given plaintext", () => {
  const state = {
    cipherTypes: ["caesar"]
  };

  const { ciphertype, problemtext, problem, hint, solution } = caesarEngine(
    state
  );

  expect(ciphertype).toEqual("Caesar");
  expect(problemtext).toEqual("Decrypt the given text");
  expect(hint).toEqual("");
  expect(problem.length).toEqual(solution.length);
});

test("testing the caesarian TeX problem generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["caesar"]
  };

  const problemDict = caesarEngine(state);
  const problemTeX = caesarProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Caesar")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[10]).toEqual("NOPQ");
});

test("testing the caesarian TeX solution generator", () => {
  const plaintext = "ABCD";
  const state = {
    plaintext,
    cipherTypes: ["caesar"]
  };

  const problemDict = caesarEngine(state);
  const solutionTeX = caesarSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("ABCD");
});
