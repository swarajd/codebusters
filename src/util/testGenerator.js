import { shuffle } from "./util.js";

const generateTest = () => {
  let ciphers = [
    "atbash",
    "caesar",
    "monoalpha",
    "monoalpha",
    "monoalpha",
    "xenocrypt",
    "affine",
    "vigenere",
    "baconian",
    "hill"
  ];

  let shuffledCiphers = shuffle(ciphers.slice());

  console.log(shuffledCiphers);
};

export default generateTest;
