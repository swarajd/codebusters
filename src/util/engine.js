import { getRandomInt } from "./util.js";

import { monoalphabetic } from "./ciphers.js";
import quotes from "../data/quotes.json";

const engine = (cypherType, cypherDirection) => {
  let cipherInformation = {};

  switch (cypherType) {
    case "atbash":
      break;
    case "caesar":
      break;
    case "monoalphabetic":
      const options = [
        {
          spaces: true,
          hint: true,
          errors: false,
          percentile: 10
        },
        {
          spaces: true,
          hint: false,
          errors: false,
          percentile: 40
        },
        {
          spaces: true,
          hint: true,
          errors: true,
          percentile: 50
        },
        {
          spaces: true,
          hint: false,
          errors: true,
          percentile: 60
        },
        {
          spaces: false,
          hint: true,
          errors: false,
          percentile: 80
        },
        {
          spaces: false,
          hint: false,
          errors: false,
          percentile: 100
        }
      ];

      const optionPercentile = getRandomInt(0, 100);
      let chosenOption;

      for (let i = 0; i < options.length; i++) {
        if (optionPercentile <= options[i].percentile) {
          chosenOption = options[i];
          break;
        }
      }

      console.log(chosenOption);

      // grab a random plaintext
      const plaintextIdx = Math.floor(Math.random() * quotes.quotes.length);
      let plaintextObj = quotes.quotes[plaintextIdx];

      let hintWord = "";

      if (chosenOption.hint) {
        const words = plaintextObj.text.split(" ");
        let wordIdx;
        do {
          wordIdx = Math.floor(Math.random() * words.length);
        } while (
          !(words[wordIdx].match(/^[A-Z]+$/g) && words[wordIdx].length >= 4)
        );

        hintWord = words[wordIdx];
      }

      console.log(hintWord);

      if (!chosenOption.spaces) {
        plaintextObj.text = plaintextObj.text.replace(/\s/g, "");
      }

      console.log(plaintextObj);

      break;
    case "affine":
      break;
    case "vigenere":
      break;
    case "baconian":
      break;
    case "hill":
      break;
    case "RSA":
      break;
    default:
      throw "unknown cipher type";
  }
};

export default engine;
