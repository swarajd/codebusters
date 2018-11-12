import { atbash } from "./../../src/util/ciphers.js";

/*
    The atbash cipher works as follows:

    P = abcdefghijklmnopqrstuvwxyz
    C = zyxwvutsrqponmlkjihgfedcba
*/
test("atbash cipher", () => {
  let result = atbash("ATBASH cipher");
  expect(result.ciphertext).toEqual("ZGYZHS XRKSVI");
});
