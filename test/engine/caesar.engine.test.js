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

test("testing the caesarian engine", () => {
  const plaintext = "abcd";
  const state = {
    plaintext,
    cipherTypes: ["caesar"]
  };

  const result = caesarEngine(state);

  console.log(result);
});
