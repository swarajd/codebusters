import {
  hill,
  matrixMultiply,
  modMatrix,
  transpose,
  generateRandomInvertibleMatrix,
  invertMatrix,
  isInvertible
} from "./../../src/util/ciphers/hill.js";

describe("test matrix multiplication", () => {
  test("matrix multiply error", () => {
    const A = [[1, 2, 3]];
    const B = [[1, 2, 3, 4]];

    try {
      matrixMultiply(A, B);
    } catch (e) {
      expect(e).toEqual("incompatible matrices");
    }
  });

  test("matrix multiply (src: math is fun)", () => {
    const A = [[3, 4, 2]];
    const B = [[13, 9, 7, 15], [8, 7, 4, 6], [6, 4, 0, 3]];

    const res = matrixMultiply(A, B);

    expect(res).toEqual([[83, 63, 37, 75]]);
  });

  test("matrix multiply (src: wikipedia)", () => {
    const A = [[6, 24, 1], [13, 16, 10], [20, 17, 15]];
    const B = [[0], [2], [19]];

    const res = matrixMultiply(A, B);

    expect(res).toEqual([[67], [222], [319]]);
  });
});

test("mod matrix", () => {
  const A = [[67], [222], [319]];

  const res = modMatrix(A, 26);

  expect(res).toEqual([[15], [14], [7]]);
});

test("transpose matrix", () => {
  const A = [[67], [222], [319]];

  const At = transpose(A);

  const Att = transpose(At);

  expect(At).toEqual([[67, 222, 319]]);
  expect(A).toEqual(Att);
});

test("3x3 hill cipher", () => {
  const text = "ACT";
  const matrix = [[6, 24, 1], [13, 16, 10], [20, 17, 15]];

  const result = hill(text, matrix);

  expect(result.ciphertext).toEqual("POH");
});

test("3x3 hill with 4 letter plaintext error", () => {
  const text = "PSAT";
  const matrix = [[6, 24, 1], [13, 16, 10], [20, 17, 15]];

  try {
    hill(text, matrix);
  } catch (e) {
    expect(e).toEqual(
      "please provide a plaintext that can be cleanly divided into " +
        matrix.length +
        " parts"
    );
  }
});

test("randomly generated hill cipher 3x3 matrix", () => {
  const size = 3;
  const matrix = generateRandomInvertibleMatrix(size);

  expect(isInvertible(matrix, size)).toBe(true);
});

test("randomly generated hill cipher 2x2 matrix", () => {
  const size = 2;
  const matrix = generateRandomInvertibleMatrix(size);

  expect(isInvertible(matrix, size)).toBe(true);
});

test("checking for invertibility on a 4x4 matrix", () => {
  const size = 4;
  const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  try {
    isInvertible(matrix, size);
  } catch (e) {
    expect(e).toEqual("this size: " + size + " is unsupported");
  }
});

test("checking if matrix inverse calculation works for 2x2", () => {
  const matrix = [[1, 5], [3, 4]];
  const invertedMatrix = invertMatrix(matrix);

  expect(invertedMatrix).toEqual([[2, 17], [5, 7]]);
});

test("checking if matrix inverse calculation works for 3x3", () => {
  const matrix = [[6, 24, 1], [13, 16, 10], [20, 17, 15]];
  const invertedMatrix = invertMatrix(matrix);

  expect(invertedMatrix).toEqual([[8, 5, 10], [21, 8, 21], [21, 12, 8]]);
});

test("crash matrix inverse on anything not 2 or 3", () => {
  const size = 4;
  const matrix = [
    [6, 24, 1, 0],
    [13, 16, 10, 0],
    [20, 17, 15, 0],
    [0, 0, 0, 0]
  ];

  try {
    invertMatrix(matrix);
  } catch (e) {
    expect(e).toEqual(
      `can't currently find the modular inverse of ${size}x${size} matrices`
    );
  }
});
