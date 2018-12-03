import { monoalphabetic } from "../../../src/util/ciphers/monoalphabetic.js";

describe("validation", () => {
  // if the setting is k1/k2, there must be a phrase
  test("if k1/k2, must have phrase", () => {
    try {
      monoalphabetic("asdf", "k1");
    } catch (e) {
      expect(e).toEqual("phrase missing for k1/k2 alphabet");
    }
  });

  // the cipher type must be either 'k1', 'k2', or 'random'
  test("type must be k1/k2/random", () => {
    try {
      monoalphabetic("asdf", "what");
    } catch (e) {
      expect(e).toEqual("invalid cipher type");
    }
  });
});
