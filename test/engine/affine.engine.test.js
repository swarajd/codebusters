import engine from "../../src/util/engine.js";

import {
  affineEngine,
  affineProblemTeX,
  affineSolutionTeX
} from "../../src/util/ciphers/affine.js";

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

test("testing affine problem generation (encryption)", () => {
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

  const problemDict = affineEngine(state);
  const problemTeX = affineProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Affine")).toBeTruthy();
  expect(problemTeX.includes("Plaintext:")).toBeTruthy();
  expect(problemTeX.includes("Hint:")).toBeTruthy();
  expect(problemLines[4]).toEqual(word);
  expect(problemLines[7]).toEqual("$ a = 7, b = 6 $");
});

test("testing the affine TeX solution generator (encryption)", () => {
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

  const problemDict = affineEngine(state);
  const solutionTeX = affineSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Ciphertext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("GNUB");
});

test("testing affine problem generation (analysis)", () => {
  const plaintext = "THIS IS PLAINTEXT";
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

  const problemDict = affineEngine(state);
  const problemTeX = affineProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Affine")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemLines[4]).toEqual(problemDict.problem);
});

test("testing the affine TeX problem generator (ERROR)", () => {
  const problemDict = {
    solution: "",
    hint: [[1, 2], [3, 4]],
    etc: ""
  };

  try {
    affineProblemTeX(problemDict);
  } catch (e) {
    expect(e).toEqual("unknown hint type");
  }
});

test("testing the affine TeX solution generator (analysis)", () => {
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

  const problemDict = affineEngine(state);
  const solutionTeX = affineSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual(plaintext);
});

test("testing the affine TeX solution generator (ERROR)", () => {
  const problemDict = {
    solution: "",
    hint: [[1, 2], [3, 4]],
    etc: ""
  };

  try {
    affineSolutionTeX(problemDict);
  } catch (e) {
    expect(e).toEqual("unknown hint type");
  }
});
