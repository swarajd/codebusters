import engine from "../../src/util/engine.js";

test("testing the baconian cipher", () => {
  const state = {
    cipherTypes: ["baconian"]
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint).toEqual("");
    expect(ciphertext.length).toBeGreaterThan(plaintext.length);
  }
});
