import ciphers from './../src/util/ciphers.js'

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

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

    /*
        setting: k1
        keyword: no repeated characters
        rotation: none required

        keyword: codebust
        rest of letters are: afghijklmnpqrvwxyz (length 18)
        random = 0.5 so placement is at index 9

        plaintext  = afghijklmcodebustnpqrvwxyz

        random = 0.5 so rotation is 13
        initial letters = abcdefghijklmnopqrstuvwxyz
        rotating yields
        
        ciphertext = nopqrstuvwxyzabcdefghijklm

        P = afghijklmcodebustnpqrvwxyz
        C = nopqrstuvwxyzabcdefghijklm

        asdf -> NCYO
    */
    let result = ciphers.monoalphabetic('asdf', 'k1', 'codebust');
    expect(result).toEqual('NCYO');

    /*
        setting: k1
        keyword: no repeated characters
        rotation: required 

        keyword: wodebust
        rest of letters are: acfghijklmnpqrvxyz (length 18)
        random = 0.5 so placement is at index 9

        plaintext = acfghijklwodebustmnpqrvxyz

        random = 0.5 so rotation is 13
        initial letters = abcdefghijklmnopqrstuvwxyz
        rotating yields
        
        ciphertext = nopqrstuvwxyzabcdefghijklm

        P = acfghijklwodebustmnpqrvxyz
        C = nopqrstuvwxyzabcdefghijklm

        rotation required (w), so we rotate one to the left

        P = acfghijklwodebustmnpqrvxyz
        C = opqrstuvwxyzabcdefghijklmn

        once again rotation required (b), so we rotate one to the left

        P = acfghijklwodebustmnpqrvxyz
        C = pqrstuvwxyzabcdefghijklmno

        asdf -> PEAR
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'wodebust');
    expect(result).toEqual('PEAR');

    /*
        setting: k1
        keyword: repeating characters
        rotation: not required

        keyword: codebusters
        deduped: codebustr
        rest of letters are: acfghijklmnpqvxyz (length 17)
        random = 0.5 so placement is at index 8

        plaintext = afghijklcodebustrmnpqvxyz

        random = 0.5 so rotation is 13
        initial letters = abcdefghijklmnopqrstuvwxyz
        rotating yields
        
        ciphertext = nopqrstuvwxyzabcdefghijklm

        P = afghijklcodebustrmnpqvxyz
        C = nopqrstuvwxyzabcdefghijklm

        asdf -> NBXO
        
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'codebusters');
    expect(result).toEqual('NBXO');
    // const k1ResultNoPlace = ciphers.monoalphabetic('asdf', 'k1', 'codebust')

    // const k2ResultNoRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebust');
    // const k2ResultRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebusters');

    // const randomResultNoRepeat = ciphers.monoalphabetic('asdf');

})