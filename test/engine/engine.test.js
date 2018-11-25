import engine from "../../src/util/engine.js";

test("test if engine handles unknown cipher", () => {
  const cipherType = "asdf";
  const state = {
    cipherTypes: [cipherType]
  };

  try {
    engine(state);
  } catch (e) {
    expect(e).toEqual(`unknown cipher type '${cipherType}'`);
  }
});
