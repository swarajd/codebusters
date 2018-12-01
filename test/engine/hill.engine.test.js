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
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(plaintext.match(/^\[ \[ \d+, \d+ \], \[ \d+, \d+ ] ]$/));
    expect(
      ciphertext.match(
        /^\[ \[ \w, \w \], \[ \w, \w \], \[ \w, \w \], \[ \w, \w \] ]$/
      )
    );
    expect(hint).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
  }
});

test("testing the hill cipher (produce, matrix)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["matrix"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(
      plaintext.match(/^\[ \[ \d+, \d+ \], \[ \d+, \d+ ] ]$/)
    ).toBeTruthy();
    expect(
      ciphertext.match(/^\[ \[ \d+, \d+ \], \[ \d+, \d+ ] ]$/)
    ).toBeTruthy();
    expect(hint).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
  }
});

test("testing the hill cipher (encryption, matrix) (no sizes given)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual("must choose at least one matrix size");
  }
});

test("testing the hill cipher (encryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(ciphertext.includes(" ")).toBeFalsy();
    expect(plaintext.includes(" ")).toBeFalsy();
    expect(hint.match(/^\[ \[ \d+, \d+ \], \[ \d+, \d+ ] ]$/)).toBeTruthy();
  }
});

test("testing the hill cipher (encryption, matrix, 3x3)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(ciphertext.includes(" ")).toBeFalsy();
    expect(plaintext.includes(" ")).toBeFalsy();
    expect(
      hint.match(
        /^\[ \[ \d+, \d+, \d+ \], \[ \d+, \d+, \d+ \], \[ \d+, \d+, \d+ \] \]$/
      )
    ).toBeTruthy();
  }
});

test("testing the hill cipher (decryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [2]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(ciphertext.includes(" ")).toBeFalsy();
    expect(plaintext.includes(" ")).toBeFalsy();
    expect(hint.match(/^\[ \[ \d+, \d+ \], \[ \d+, \d+ ] ]$/)).toBeTruthy();
  }
});

test("testing the hill cipher (decryption, matrix, 3x3)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["decryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(ciphertext.includes(" ")).toBeFalsy();
    expect(plaintext.includes(" ")).toBeFalsy();
    expect(
      hint.match(
        /^\[ \[ \d+, \d+, \d+ \], \[ \d+, \d+, \d+ \], \[ \d+, \d+, \d+ \] \]$/
      )
    ).toBeTruthy();
  }
});

test("testing the hill cipher (unknown problem type)", () => {
  const problemType = "asdf";

  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: [problemType],
      methods: ["matrix"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual(`unknown problem type '${problemType}'`);
  }
});
