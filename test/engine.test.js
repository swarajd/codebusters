import engine from "./../src/util/engine.js";

test("testing engine", () => {
  engine({
    cipherTypes: ["monoalphabetic"]
  });
});
