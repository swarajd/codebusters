import { chooseRandomFromArray } from "../src/util/util.js";

test("testing if it'll throw if an empty array is given", () => {
  try {
    chooseRandomFromArray([]);
  } catch (e) {
    expect(e).toEqual("no elements in the array!");
  }
});
