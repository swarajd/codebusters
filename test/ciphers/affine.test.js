import { affine } from "./../../src/util/ciphers.js";

test("affine cipher with proper a & b", () => {
  let result = affine("defendtheeastwallofthecastle", 5, 7);
  expect(result.ciphertext).toEqual("WBGBUWYQBBHTYNHKKZGYQBRHTYKB");
});

test("affine cipher without proper a", () => {
  try {
    affine("asdf", 13, 8);
  } catch (e) {
    expect(e).toEqual("invalid value for 'a'");
  }
});

test("affine cipher with proper a & b, and ciphertext has spaces", () => {
  let result = affine("defend the east wall of the castle", 5, 7);
  expect(result.ciphertext).toEqual("WBGBUW YQB BHTY NHKK ZG YQB RHTYKB");
});
