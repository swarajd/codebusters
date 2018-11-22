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
