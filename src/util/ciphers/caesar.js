import { shiftText, zipToDict, letters } from "../util.js";

import { h } from "hyperapp";

const caesar = text => {
  return {
    plaintext: text,
    ciphertext: shiftText(text, 13),
    solution: zipToDict(letters, shiftText(letters.join(""), 13).split(""))
  };
};

const caesarHTML = caesarDict => {
  let { ciphertext, plaintext, ..._ } = caesarDict;
  return (
    <div class="question">
      <div class="problem">
        <div class="element">
          <b class="element-title">Ciphertext:</b>
          <p class="element-text"> {ciphertext} </p>
        </div>
      </div>
      <div class="solution">
        <div class="element">
          <b class="element-title">Plaintext:</b>
          <p class="element-text"> {plaintext} </p>
        </div>
      </div>
    </div>
  );
};

const caesarTeX = caesarDict => {
  let { ciphertext, plaintext, ..._ } = caesarDict;
  return ``;
};

module.exports = {
  caesar,
  caesarHTML,
  caesarTeX
};
