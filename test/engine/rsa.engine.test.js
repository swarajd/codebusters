import engine from "../../src/util/engine.js";

test("testing the RSA cipher", () => {
  const state = {
    cipherTypes: ["RSA"]
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.problem.plaintext;
    const ciphertext = generatedProblem.solution.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint.includes("publickey")).toEqual(true);
    expect(plaintext.length).toEqual(ciphertext.split(" ").length);
  }
});
