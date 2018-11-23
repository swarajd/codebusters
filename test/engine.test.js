import engine from "./../src/util/engine.js";

test("testing engine", () => {
  const generatedProblem = engine({
    cipherTypes: ["monoalphabetic"],
    monoalphabetic: {
      spaces: true,
      hint: true,
      errors: false,
      xenocrypt: false
    }
  });

  console.log(generatedProblem);
});
