/*
    UTILITIES SECTION
*/

import { modPow } from "./util.js";

/*
    CIPHER SECTION
*/

const RSAEncrypt = (text, keypair) => {
  let { n, e } = keypair.publickey;

  // console.log(n, e);

  const ciphertext = text
    .toUpperCase()
    .split("")
    .map(l => l.charCodeAt(0) - 64)
    .map(c => modPow(c, e, n))
    .join(" ");

  return {
    plaintext: text,
    ciphertext: ciphertext,
    solution: keypair
  };
};

const RSADecrypt = (text, keypair) => {
  let { n, d } = keypair.privatekey;

  // console.log(n, d);

  const plaintext = text
    .split(" ")
    .map(x => parseInt(x))
    .map(c => modPow(c, d, n) + 64)
    .map(num => String.fromCharCode(num))
    .join("");

  return {
    plaintext: plaintext,
    ciphertext: text,
    solution: keypair
  };
};

/*
    EXPORT SECTION
*/

module.exports = {
  RSAEncrypt,
  RSADecrypt
};
