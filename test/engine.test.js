import engine from "./../src/util/engine.js";

test("testing monoalphabetic result of engine", () => {
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
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(plaintext.includes(hint)).toEqual(true);
    expect(ciphertext.length).toEqual(plaintext.length);
  }
});
