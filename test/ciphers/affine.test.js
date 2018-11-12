import { affine } from "./../../src/util/ciphers.js"

test("affine cipher with proper a & b", () => {
    let result = affine("defendtheeastwallofthecastle", 5, 7);
    expect(result.ciphertext).toEqual("WBGBUWYQBBHTYNHKKZGYQBRHTYKB");
})

test("affine cipher without proper a", () => {
    try {
        affine("asdf", 13, 8);
    } catch (e) {
        expect(e).toEqual("invalid value for 'a'");
    }
})