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
          errors: false
        },
        {
          spaces: true,
          hint: false,
          errors: false
        },
        {
          spaces: true,
          hint: true,
          errors: true
        },
        {
          spaces: true,
          hint: false,
          errors: true
        },
        {
          spaces: false,
          hint: true,
          errors: false
        },
        {
          spaces: false,
          hint: false,
          errors: false
        }
      ];

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
