import { baconian } from "./../../src/util/ciphers/baconian.js";

test("basic baconian", () => {
  let res = baconian("ABCD");
  expect(res.ciphertext).toEqual("AAAAAAAAABAAABAAAABB");
});
