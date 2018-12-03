import engine from "../../src/util/engine.js";

import { caesarEngine } from "../../src/util/ciphers/caesar.js";

test("testing the caesarian cipher", () => {
  const state = {
    cipherTypes: ["caesar"]
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint).toEqual("");
    expect(ciphertext.length).toEqual(plaintext.length);
  }
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
  expect(problemtext).toEqual("");
  expect(problem).toEqual("NOPQ");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the caesarian engine without a given plaintext", () => {
  const state = {
    cipherTypes: ["caesar"]
  };

  const { ciphertype, problemtext, hint, ..._ } = caesarEngine(state);

  expect(ciphertype).toEqual("Caesar");
  expect(problemtext).toEqual("");
  expect(hint).toEqual("");
});
