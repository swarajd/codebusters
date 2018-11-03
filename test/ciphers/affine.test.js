import { affine } from './../../src/util/ciphers.js'

test('affine cipher', () => {
    let result = affine('defendtheeastwallofthecastle', 5, 7);
    expect(result.ciphertext).toEqual('WBGBUWYQBBHTYNHKKZGYQBRHTYKB');
})