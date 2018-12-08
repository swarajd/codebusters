import engine from "../../src/util/engine.js";

test("testing the affine cipher (encryption), word given, key given", () => {
  const word = "ABCD";
  const affineKey = {
    a: 7,
    b: 6
  };
  const state = {
    word,
    affineKey,
    cipherTypes: ["affine"],
    affine: {
      types: ["encryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Affine");
  expect(problemtext).toEqual("Encrypt the word using the given key");
  expect(problem).toEqual(word);
  expect(hint).toEqual(affineKey);
  expect(solution).toEqual("GNUB");
});

test("testing the affine cipher (encryption), word given, key not given", () => {
  const word = "ABCD";
  const state = {
    word,
    cipherTypes: ["affine"],
    affine: {
      types: ["encryption"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const { ciphertype, problemtext, problem, hint, solution } = engine(state);

    expect(ciphertype).toEqual("Affine");
    expect(problemtext).toEqual("Encrypt the word using the given key");
    expect(problem).toEqual(word);
    expect(hint).toHaveProperty("a");
    expect(hint).toHaveProperty("b");
    expect(problem.length).toEqual(solution.length);
  }
});

test("testing the affine cipher (encryption), word not given, key not given", () => {
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: ["encryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Affine");
  expect(problemtext).toEqual("Encrypt the word using the given key");
  expect(problem.includes(" ")).toBeFalsy();
  expect(hint).toHaveProperty("a");
  expect(hint).toHaveProperty("b");
  expect(problem.length).toEqual(solution.length);
});

test("testing the affine cipher (analysis), plaintext given, key given", () => {
  const plaintext = "THIS IS TEXT";
  const affineKey = {
    a: 7,
    b: 6
  };
  const state = {
    plaintext,
    affineKey,
    cipherTypes: ["affine"],
    affine: {
      types: ["analysis"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Affine");
  expect(problemtext).toEqual("");
  expect(problem).toEqual("JDKC KC JILJ");
  expect(hint).toEqual("");
  expect(solution).toEqual(plaintext);
});

test("testing the affine cipher (analysis), plaintext not given, key given", () => {
  const affineKey = {
    a: 7,
    b: 6
  };
  const state = {
    affineKey,
    cipherTypes: ["affine"],
    affine: {
      types: ["analysis"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Affine");
  expect(problemtext).toEqual("");
  expect(problem.includes(" ")).toBeTruthy();
  expect(hint).toEqual("");
  expect(solution.length).toEqual(problem.length);
});

test("testing the affine cipher (analysis), plaintext not given, key not given", () => {
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: ["analysis"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Affine");
  expect(problemtext).toEqual("");
  expect(problem.includes(" ")).toBeTruthy();
  expect(hint).toEqual("");
  expect(solution.length).toEqual(problem.length);
});

test("invalid key for affine", () => {
  const plaintext = "THIS IS TEXT";
  const affineKey = {
    a: 6,
    b: 6
  };
  const state = {
    plaintext,
    affineKey,
    cipherTypes: ["affine"],
    affine: {
      types: ["analysis"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual("invalid value for 'a'");
  }
});

test("invalid problem type for affine", () => {
  const state = {
    cipherTypes: ["affine"],
    affine: {
      types: ["what"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual("unknown problem type");
  }
});
