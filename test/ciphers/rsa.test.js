import {
  primesTo100,
  multiplicativeInverse,
  invertibleValues,
  letters,
  generateRandomPrimeFromSet,
  generateKeyPair,
  gcd,
  modPow
} from "./../../src/util/util.js";

import { RSAEncrypt, RSADecrypt } from "./../../src/util/ciphers.js";

test("check what the primes are", () => {
  const primeList = "2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97"
    .split(",")
    .map(x => parseInt(x));

  expect(primesTo100).toEqual(primeList);
});

describe("multiplicative inverse", () => {
  test("should throw error on non co-prime arguments", () => {
    const x = 13;
    const n = 26;
    try {
      multiplicativeInverse(x, n);
    } catch (e) {
      expect(e).toEqual(`${x} and ${n} are not coprime!`);
    }
  });

  test("should find the proper inverse for a regular alphabet", () => {
    const inverses = [
      [1, 1],
      [3, 9],
      [5, 21],
      [7, 15],
      [9, 3],
      [11, 19],
      [15, 7],
      [17, 23],
      [19, 11],
      [21, 5],
      [23, 17],
      [25, 25]
    ];

    for (let i = 0; i < inverses.length; i++) {
      let pair = inverses[i];
      let val = pair[0];
      let inverse = pair[1];

      expect(multiplicativeInverse(val, letters.length)).toEqual(inverse);
    }
  });

  test("should find the inverses for a few irregular cases too", () => {
    let a = 5;
    let b = 3;
    let n = 7;

    expect(multiplicativeInverse(a, n)).toEqual(b);
    expect(multiplicativeInverse(b, n)).toEqual(a);

    a = 10;
    b = 12;
    n = 17;

    expect(multiplicativeInverse(a, n)).toEqual(b);
    expect(multiplicativeInverse(b, n)).toEqual(a);
  });
});

test("keypair generation", () => {
  const p = generateRandomPrimeFromSet(primesTo100);
  const q = generateRandomPrimeFromSet(primesTo100);

  const keypair = generateKeyPair(p, q);
  const e = keypair.publickey.e;
  const d = keypair.privatekey.d;

  const totient = (p - 1) * (q - 1);

  expect(gcd(e, totient)).toEqual(1);
  expect(gcd(d, totient)).toEqual(1);
});

test("testing modpow", () => {
  const a = 11;
  const b = 14;
  const n = letters.length;

  expect(modPow(a, b, n)).toEqual(17);
});

test("encryption/decryption", () => {
  const p = generateRandomPrimeFromSet(primesTo100);
  const q = generateRandomPrimeFromSet(primesTo100);

  const plaintext = "ABCD";

  for (let i = 0; i < 10; i++) {
    const keypair = generateKeyPair(p, q);
    const encrypted = RSAEncrypt(plaintext, keypair);
    const decrypted = RSADecrypt(encrypted.ciphertext, keypair);

    expect(plaintext).toEqual(decrypted.plaintext);
  }
});
