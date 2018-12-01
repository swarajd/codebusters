import engine from "../../src/util/engine.js";

test("testing the vigenere cipher (encryption)", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["encryption"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const ciphertext = generatedProblem.solution.ciphertext;
    const plaintext = generatedProblem.problem.plaintext;
    const hint = generatedProblem.problem.hint;

    expect(hint.length).toBeGreaterThan(4);
    expect(ciphertext.length).toEqual(plaintext.length);
  }
});

test("testing the vigenere cipher (decryption)", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["decryption"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const solution = generatedProblem.solution;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint.length).toBeGreaterThan(4);
    expect(ciphertext.length).toEqual(solution.plaintext.length);
  }
});

test("testing the vigenere cipher (crib)", () => {
  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: ["crib"]
    }
  };

  for (let i = 0; i < 10; i++) {
    const generatedProblem = engine(state);

    const plaintext = generatedProblem.solution.plaintext;
    const ciphertext = generatedProblem.problem.ciphertext;
    const hint = generatedProblem.problem.hint;

    expect(hint.includes("=>")).toEqual(true);
    expect(ciphertext.length).toEqual(plaintext.length);
  }
});

test("testing the vigenere cipher (asdf)", () => {
  const problemType = "asdf";

  const state = {
    cipherTypes: ["vigenere"],
    vigenere: {
      types: [problemType]
    }
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual(`option '${problemType}' for vigenere not found`);
  }
});
