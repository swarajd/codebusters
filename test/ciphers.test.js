import ciphers from './../src/util/ciphers.js'

test('caesar cipher', () => {
    const noSpaceResult = ciphers.caesar('abcxyz');

    expect(noSpaceResult).toEqual('NOPKLM');

    const spaceResult = ciphers.caesar('et tu brute');

    expect(spaceResult).toEqual('RG GH OEHGR');
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

    try {
        ciphers.monoalphabetic('asdf', 'what');
    } catch (e) {
        expect(e).toEqual("invalid cipher type");
    }

    const k1ResultNoRepeat = ciphers.monoalphabetic('asdf', 'k1', 'codebust', 0);
    const k1ResultRepeat = ciphers.monoalphabetic('asdf', 'k1', 'codebusters', 0);
    const k1ResultNoPlace = ciphers.monoalphabetic('asdf', 'k1', 'codebust')

    const k2ResultNoRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebust', 0);
    const k2ResultRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebusters', 0);

    const randomResultNoRepeat = ciphers.monoalphabetic('asdf', 'random', undefined, {});

})