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

const categoryHTMLGenerator = (type, element) => {
  return (
    <div>
      <h5> {type}: </h5>
      {element}
    </div>
  );
};

const solutionButton = (
  <div class="card-footer">
    <button class="btn btn-primary">Show Solution</button>
  </div>
);

module.exports = {
  matrixHTMLGenerator,
  categoryHTMLGenerator
};
