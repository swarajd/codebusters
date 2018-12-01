import engine from "../../src/util/engine.js";

test("testing the affine cipher (encryption)", () => {
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: ["encryption"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const ciphertext = generatedProblem.solution.ciphertext;
    const plaintext = generatedProblem.problem.plaintext;
    const hint = generatedProblem.problem.hint;

    expect(hint.includes("a:")).toEqual(true);
    expect(ciphertext.length).toEqual(plaintext.length);
  }
});

test("testing the affine cipher (analysis)", () => {
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: ["analysis"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const solution = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint).toEqual("");
    expect(ciphertext.length).toEqual(solution.plaintext.length);
    expect(solution.a != undefined).toEqual(true);
    expect(solution.b != undefined).toEqual(true);
  }
});

test("testing the affine cipher (asdf)", () => {
  const problemType = "asdf";
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: [problemType]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual(`option '${problemType}' for affine not found`);
  }
});
