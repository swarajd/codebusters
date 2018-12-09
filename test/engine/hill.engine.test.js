import engine from "../../src/util/engine.js";

import { detectType } from "../../src/util/util.js";

test("testing the hill cipher (produce, pairs)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["produce"],
      methods: ["pairs"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { ciphertype, problemtext, problem, hint, solution } = engine(state);

    const problemType = detectType(problem);
    const solutionType = detectType(solution);

    expect(ciphertype).toEqual("Hill");
    expect(problemType).toEqual("Pairs");
    expect(solutionType).toEqual("Matrix");
    expect(problemtext).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
    expect(hint).toEqual("");
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
    const { ciphertype, problemtext, problem, hint, solution } = engine(state);

    const problemType = detectType(problem);
    const solutionType = detectType(solution);

    expect(ciphertype).toEqual("Hill");
    expect(problemType).toEqual("Matrix");
    expect(solutionType).toEqual("Matrix");
    expect(problemtext).toEqual(
      "generate a decryption matrix given either an encryption matrix or four plaintext/ciphertext pairs"
    );
    expect(hint).toEqual("");
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
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(2);
  }
});

test("testing the hill cipher (encryption, matrix, 2x2)", () => {
  const state = {
    cipherTypes: ["hill"],
    hill: {
      types: ["encryption"],
      methods: ["matrix"],
      matrixSizes: [3]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(3);
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
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(2);
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
    const { problem, hint, solution, ..._ } = engine(state);

    const hintType = detectType(hint);

    expect(problem.includes(" ")).toBeFalsy();
    expect(solution.includes(" ")).toBeFalsy();
    expect(hintType).toEqual("Matrix");
    expect(hint.length).toEqual(3);
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
