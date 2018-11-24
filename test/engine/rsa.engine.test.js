import engine from "../../src/util/engine.js";

test("testing the RSA cipher", () => {
  const state = {
    cipherTypes: ["RSA"]
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint.includes("publickey")).toEqual(true);
    expect(ciphertext.length).toEqual(plaintext.split(" ").length);
  }
});
