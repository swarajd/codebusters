import engine from "../../src/util/engine.js";

test("testing the hill cipher (produce, pairs)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"]
    }
  };

  for (let i = 0; i < 10; i++) {
    engine(state);

    // const plaintext = generatedProblem.solution.plaintext;
    // const ciphertext = generatedProblem.problem.ciphertext;
    // const hint = generatedProblem.problem.hint;

    // expect(hint).toEqual("");
    // expect(ciphertext.length).toEqual(plaintext.length);
  }
});
