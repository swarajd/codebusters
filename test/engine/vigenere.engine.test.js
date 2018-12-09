import engine from "../../src/util/engine.js";

import {
  vigenereEngine,
  vigenereProblemTeX,
  vigenereSolutionTeX
} from "../../src/util/ciphers/vigenere.js";

test("testing the vigenere cipher (encryption) text given, word given", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["encryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "encrypt the following phrase with the given word"
  );
  expect(problem).toEqual(plaintext);
  expect(hint).toEqual(`The word used for encryption is: '${word}'`);
  expect(solution).toEqual("LXFOPVEFRNHR");
});

test("testing the vigenere cipher (encryption) text not given, word not given", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["encryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  const hintWord = hint.substring(hint.indexOf("'") + 1, hint.lastIndexOf("'"));

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "encrypt the following phrase with the given word"
  );
  expect(hintWord.includes(" ")).toBeFalsy();
  expect(solution.length).toEqual(problem.length);
});

test("testing the vigenere cipher (decryption) text given, word given", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["decryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "decrypt the following phrase with the word used to encrypt it"
  );
  expect(problem).toEqual("LXFOPVEFRNHR");
  expect(hint).toEqual(`The word used for decryption is: '${word}'`);
  expect(solution).toEqual(plaintext);
});

test("testing the vigenere cipher (decryption) text not given, word not given", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["decryption"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  const hintWord = hint.substring(hint.indexOf("'") + 1, hint.lastIndexOf("'"));

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "decrypt the following phrase with the word used to encrypt it"
  );
  expect(hintWord.includes(" ")).toBeFalsy();
  expect(solution.length).toEqual(problem.length);
});

test("testing the vigenere cipher (crib) text given, word given", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["crib"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "decrypt the following ciphertext with the given crib"
  );
  expect(problem).toEqual("LXFOPVEFRNHR");
  expect(hint).toHaveProperty("plaintext");
  expect(hint).toHaveProperty("ciphertext");
  expect(solution).toEqual(plaintext);
});

test("testing the vigenere cipher (crib) text not given, word not given", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["crib"]
    }
  };

  const { ciphertype, problemtext, problem, hint, solution } = engine(state);

  expect(ciphertype).toEqual("Vigenere");
  expect(problemtext).toEqual(
    "decrypt the following ciphertext with the given crib"
  );
  expect(hint).toHaveProperty("plaintext");
  expect(hint).toHaveProperty("ciphertext");
  expect(solution.length).toEqual(problem.length);
});

test("testing the vigenere cipher (unknown)", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["unknown"]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual("unknown problem type");
  }
});

test("testing the vigenere TeX problem generator (encryption)", () => {
  const plaintext = "ATTACKATDAWN";
  const state = {
    plaintext,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["encryption"]
    }
  };

  const problemDict = vigenereEngine(state);
  const problemTeX = vigenereProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Vigenere")).toBeTruthy();
  expect(problemTeX.includes("Plaintext:")).toBeTruthy();
  expect(problemTeX.includes("Hint:")).toBeTruthy();
  expect(problemLines[4]).toEqual(plaintext);
});

test("testing the vigenere TeX problem generator (decryption)", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["decryption"]
    }
  };

  const problemDict = vigenereEngine(state);
  const problemTeX = vigenereProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Vigenere")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemTeX.includes("Hint:")).toBeTruthy();
  expect(problemLines[4]).toEqual(problemDict.problem);
});

test("testing the vigenere TeX problem generator (crib)", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["crib"]
    }
  };

  const problemDict = vigenereEngine(state);
  const problemTeX = vigenereProblemTeX(problemDict);
  const problemLines = problemTeX.split("\n").filter(line => line.length > 0);

  expect(problemTeX.includes("Vigenere")).toBeTruthy();
  expect(problemTeX.includes("Ciphertext:")).toBeTruthy();
  expect(problemTeX.includes("Hint:")).toBeTruthy();

  expect(problemLines[4]).toEqual(problemDict.problem);
  expect(problemLines[7].match(/\w{5} \$ \\Rightarrow \$ \w{5}/)).toBeTruthy();
});

test("testing the vigenere TeX problem generator (unknown)", () => {
  const problemDict = {
    solution: "",
    hint: "asdf",
    problem: "",
    problemtext: "what"
  };

  try {
    vigenereProblemTeX(problemDict);
  } catch (e) {
    expect(e).toEqual("unknown problem type");
  }
});

test("testing the vigenere TeX solution generator (encryption)", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["encryption"]
    }
  };

  const problemDict = vigenereEngine(state);
  const solutionTeX = vigenereSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  expect(solutionTeX.includes("Ciphertext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual("LXFOPVEFRNHR");
});

test("testing the vigenere TeX solution generator (decryption)", () => {
  const plaintext = "ATTACKATDAWN";
  const word = "LEMON";
  const state = {
    plaintext,
    word,
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["decryption"]
    }
  };

  const problemDict = vigenereEngine(state);
  const solutionTeX = vigenereSolutionTeX(problemDict);
  const solutionLines = solutionTeX.split("\n").filter(line => line.length > 0);

  console.log(solutionLines);

  expect(solutionTeX.includes("Plaintext:")).toBeTruthy();
  expect(solutionLines[3]).toEqual(plaintext);
});

test("testing the vigenere TeX solution generator (unknown)", () => {
  const problemDict = {
    solution: "",
    problemtext: "what"
  };

  try {
    vigenereSolutionTeX(problemDict);
  } catch (e) {
    expect(e).toEqual("unknown problem type");
  }
});

// test("testing the vigenere cipher (encryption)", () => {
//   const state = {
//     cipherTypes: ["vigenere"],
//     vigenere: {
//       types: ["encryption"]
//     }
//   };

//   for (let i = 0; i < 10; i++) {
//     const generatedProblem = engine(state);

//     const ciphertext = generatedProblem.solution.ciphertext;
//     const plaintext = generatedProblem.problem.plaintext;
//     const hint = generatedProblem.problem.hint;

//     expect(hint.length).toBeGreaterThan(4);
//     expect(ciphertext.length).toEqual(plaintext.length);
//   }
// });

// test("testing the vigenere cipher (decryption)", () => {
//   const state = {
//     cipherTypes: ["vigenere"],
//     vigenere: {
//       types: ["decryption"]
//     }
//   };

//   for (let i = 0; i < 10; i++) {
//     const generatedProblem = engine(state);

//     const solution = generatedProblem.solution;
//     const ciphertext = generatedProblem.problem.ciphertext;
//     const hint = generatedProblem.problem.hint;

//     expect(hint.length).toBeGreaterThan(4);
//     expect(ciphertext.length).toEqual(solution.plaintext.length);
//   }
// });

// test("testing the vigenere cipher (crib)", () => {
//   const state = {
//     cipherTypes: ["vigenere"],
//     vigenere: {
//       types: ["crib"]
//     }
//   };

//   for (let i = 0; i < 10; i++) {
//     const generatedProblem = engine(state);

//     const plaintext = generatedProblem.solution.plaintext;
//     const ciphertext = generatedProblem.problem.ciphertext;
//     const hint = generatedProblem.problem.hint;

//     expect(hint.includes("=>")).toEqual(true);
//     expect(ciphertext.length).toEqual(plaintext.length);
//   }
// });

// test("testing the vigenere cipher (asdf)", () => {
//   const problemType = "asdf";

//   const state = {
//     cipherTypes: ["vigenere"],
//     vigenere: {
//       types: [problemType]
//     }
//   };

//   try {
//     engine(state);
//   } catch (e) {
//     expect(e).toEqual(`option '${problemType}' for vigenere not found`);
//   }
// });
