import {
  monoalphabetic,
  randomDerangementDict
} from "../../../src/util/ciphers/monoalphabetic.js";
import { letters } from "../../../src/util/util.js";

test("all derangements do not map to themselves", () => {
  let derangement;
  for (let i = 0; i < 1000; i++) {
    derangement = randomDerangementDict(letters);
    for (let key in derangement) {
      expect(key).not.toEqual(derangement[key]);
    }
  }
});

test("random encryption disallows letters mapping to themselves", () => {
  let plaintext = "asdf".toUpperCase();
  let result = monoalphabetic(plaintext, "random");
  let ciphertext = result.ciphertext;

  for (let i = 0; i < plaintext.length; i++) {
    expect(plaintext.charAt(i)).not.toEqual(ciphertext.charAt(i));
  }
});

test("random encryption creates ciphertext that preserves punctuation", () => {
  let plaintext = "a s d f".toUpperCase();
  let result = monoalphabetic(plaintext, "random");
  let ciphertext = result.ciphertext;
  const lettersStr = letters.join("");

  for (let i = 0; i < plaintext.length; i++) {
    if (lettersStr.includes(plaintext.charAt(i))) {
      expect(plaintext.charAt(i)).not.toEqual(ciphertext.charAt(i));
    } else {
      expect(plaintext.charAt(i)).toEqual(ciphertext.charAt(i));
    }
  }
});

test("random encryption with keyword has no effect with keyword", () => {
  let plaintext = "asdf".toUpperCase();
  let result = monoalphabetic(plaintext, "random", "qwer");

  expect(result).not.toEqual(null);
});
