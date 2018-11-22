import { getRandomInt } from "./util.js";
import { monoalphabetic } from "./ciphers.js";
import {
  hintGenerator,
  valueGenerator,
  ciphertextGenerator
} from "./latexGenerators.js";

import quotes from "../data/quotes.json";
import words from "../data/words.json";

const engine = (cypherType, direction, xenocrypt) => {
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
          percentile: 10,
          points: 125
        },
        {
          spaces: true,
          hint: false,
          errors: false,
          percentile: 40,
          points: 200
        },
        {
          spaces: true,
          hint: true,
          errors: true,
          percentile: 50,
          points: 150
        },
        {
          spaces: true,
          hint: false,
          errors: true,
          percentile: 60,
          points: 225
        },
        {
          spaces: false,
          hint: true,
          errors: false,
          percentile: 80,
          points: 300
        },
        {
          spaces: false,
          hint: false,
          errors: false,
          percentile: 100,
          points: 350
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

      // console.log(chosenOption);

      // grab a random plaintext
      const plaintextIdx = Math.floor(Math.random() * quotes.quotes.length);
      let plaintextObj = quotes.quotes[plaintextIdx];

      // choose a variant of the monoalphabetic scramble
      const variants = ["k1", "k2", "random"];
      const chosenVariantIdx = getRandomInt(0, 2);
      const chosenVariant = variants[chosenVariantIdx];

      let keyword = "";

      if (chosenVariant == "k1" || chosenVariant == "k2") {
        const keywordIdx = Math.floor(Math.random() * words.words.length);
        keyword = words.words[keywordIdx];
      }

      // choose a hint word if relevant
      let hintWord = "";

      const quote = plaintextObj.text.split("--")[0];
      if (chosenOption.hint) {
        const words = quote.split(" ");
        let wordIdx;
        do {
          wordIdx = Math.floor(Math.random() * words.length);
        } while (
          !(words[wordIdx].match(/^[A-Z]+$/g) && words[wordIdx].length >= 4)
        );

        hintWord = words[wordIdx];
      }

      // console.log(hintWord);

      // omit spaces, if relevant
      if (!chosenOption.spaces) {
        plaintextObj.text = plaintextObj.text.replace(/\s/g, "");
      }

      // console.log(plaintextObj);

      // execute the actual encryption
      const cipherResult = monoalphabetic(
        plaintextObj.text,
        chosenVariant,
        keyword
      );

      console.log(hintGenerator(hintWord));
      console.log(valueGenerator(chosenOption.points));
      console.log(ciphertextGenerator(cipherResult.ciphertext));
      // console.log(cipherResult);

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
