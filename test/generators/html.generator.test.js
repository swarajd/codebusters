import { matrixHTMLGenerator } from "../../src/util/htmlGenerators.js";

import { renderToString } from "hyperapp-render";

test("testing the generation of a 2x2 matrix in html", () => {
  const matrix = [[1, 2], [3, 4]];

  const matrixHTML = renderToString(matrixHTMLGenerator(matrix));
  expect(matrixHTML).toEqual(
    '<table class="matrix"><tr> <td>1</td><td>2</td> </tr><tr> <td>3</td><td>4</td> </tr></table>'
  );
});

test("testing the generation of a 3x3 matrix in html", () => {
  const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const matrixHTML = renderToString(matrixHTMLGenerator(matrix));
  expect(matrixHTML).toEqual(
    '<table class="matrix"><tr> <td>1</td><td>2</td><td>3</td> </tr><tr> <td>4</td><td>5</td><td>6</td> </tr><tr> <td>7</td><td>8</td><td>9</td> </tr></table>'
  );
});
