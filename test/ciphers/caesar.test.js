import { caesar } from './../../src/util/ciphers.js'

/*
    The caesar cipher works as follows:

    P = abcdefghijklmnopqrstuvwxyz
    C = nopqrstuvwxyzabcdefghijklm
*/
test('caesar cipher', () => {

    // no spaces/special characters in the text
    let result = caesar('abcxyz');
    expect(result).toEqual('NOPKLM');

    // there are spaces in the text
    result = caesar('et tu brute');
    expect(result).toEqual('RG GH OEHGR');
})