import { baconian } from './../../src/util/ciphers.js'


test('basic baconian', () => {
    let res = baconian('abcd');
    expect(res.ciphertext).toEqual('AAAAAAAAABAAABAAAABB');
})