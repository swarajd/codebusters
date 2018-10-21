import ciphers from './../src/util/ciphers.js'

test('caesar cipher', () => {
    const caesarResult = ciphers.caesar('abcxyz');

    expect(caesarResult).toEqual('NOPKLM');
})

test('atbash cipher', () => {
    const atbashResult = ciphers.atbash('ATBASH cipher');

    expect(atbashResult).toEqual('ZGYZHS XRKSVI');
})

test('monoalphabetic cipher', () => {
    try {
        ciphers.monoalphabetic('asdf', 'k1');
    } catch (e) {
        expect(e).toEqual("phrase missing for k1/k2 alphabet");
    }
})