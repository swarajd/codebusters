import engine from "../../src/util/engine.js";

test("testing monoalphabetic result of engine (*nothing given*)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
      hint: false,
      errors: false,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint).toEqual("");
    expect(ciphertext.length).toBeLessThan(plaintext.length);
    expect(!ciphertext.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (hint)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: false,
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
    expect(ciphertext.length).toBeLessThan(plaintext.length);
    expect(!ciphertext.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (spaces, hint)", () => {
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

test("testing monoalphabetic result of engine (spaces, hint, error)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: true,
      xenocrypt: false
    }
  };
  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(plaintext.includes(hint)).toEqual(true);
    expect(ciphertext.length).toBeLessThan(plaintext.length);
    expect(ciphertext.includes(" ")).toEqual(true);
  }
});

test("testing monoalphabetic result of engine (spaces, hint, error, xenocrypt)", () => {
  const state = {
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: true,
      xenocrypt: true
    }
  };
  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(plaintext.includes(hint)).toEqual(true);
    expect(ciphertext.length).toBeLessThan(plaintext.length);
    expect(ciphertext.includes(" ")).toEqual(true);
  }
});
