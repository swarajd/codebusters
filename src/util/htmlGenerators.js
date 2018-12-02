import { h } from "hyperapp";

const matrixHTMLGenerator = matrix => {
  return (
    <table class="matrix">
      {matrix.map(row => (
        <tr>
          {" "}
          {row.map(elem => (
            <td>{elem}</td>
          ))}{" "}
        </tr>
      ))}
    </table>
  );
};

module.exports = {
  matrixHTMLGenerator
};
