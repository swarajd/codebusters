import ciphers from './../src/util/ciphers.js'

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;


/*
    The caesar cipher works as follows:

    P = abcdefghijklmnopqrstuvwxyz
    C = nopqrstuvwxyzabcdefghijklm
*/
test('caesar cipher', () => {

    // no spaces/special characters in the text
    let result = ciphers.caesar('abcxyz');
    expect(result).toEqual('NOPKLM');

    // there are spaces in the text
    result = ciphers.caesar('et tu brute');
    expect(result).toEqual('RG GH OEHGR');
})

/*
    The atbash cipher works as follows:

    P = abcdefghijklmnopqrstuvwxyz
    C = zyxwvutsrqponmlkjihgfedcba
*/
test('atbash cipher', () => {
    let result = ciphers.atbash('ATBASH cipher');
    expect(result).toEqual('ZGYZHS XRKSVI');
})

test('monoalphabetic cipher', () => {

    // if the setting is k1/k2, there must be a phrase
    try {
        ciphers.monoalphabetic('asdf', 'k1');
    } catch (e) {
        expect(e).toEqual("phrase missing for k1/k2 alphabet");
    }

    // the cipher type must be either 'k1', 'k2', or 'random'
    try {
        ciphers.monoalphabetic('asdf', 'what');
    } catch (e) {
        expect(e).toEqual("invalid cipher type");
    }

    /*
        setting: k1
        keyword: no repeated characters
        rotation: none required

        keyword = codebust
        rest of letters are = afghijklmnpqrvwxyz (length 18)
        random = 0.5 so placement is at index 9

        plaintext = afghijklmcodebustnpqrvwxyz

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

        keyword = wodebust
        rest of letters are = acfghijklmnpqrvxyz (length 18)
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

        keyword = codebusters
        deduped = codebustr
        rest of letters are = afghijklmnpqvwxyz (length 17)
        random = 0.5 so placement is at index 8

        plaintext = afghijklcodebustrmnpqvwxyz

        random = 0.5 so rotation is 13
        initial letters = abcdefghijklmnopqrstuvwxyz
        rotating yields
        
        ciphertext = nopqrstuvwxyzabcdefghijklm

        P = afghijklcodebustrmnpqvwxyz
        C = nopqrstuvwxyzabcdefghijklm

        asdf -> NBXO
        
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'codebusters');
    expect(result).toEqual('NBXO');

    /*
        setting: k1
        keyword: repeated characters
        rotation: required 

        keyword = vodebusters
        deduped = vodebustr
        rest of letters are = acfghijklmnpqwxyz (length 17)
        random = 0.5 so placement is at index 8

        plaintext = acfghijkvodebustrlmnpqwxyz

        random = 0.5 so rotation is 13
        initial letters = abcdefghijklmnopqrstuvwxyz
        rotating yields

        ciphertext = nopqrstuvwxyzabcdefghijklm
        
        P = acfghijkvodebustrlmnpqwxyz
        C = nopqrstuvwxyzabcdefghijklm

        rotation required (v), so we rotate one to the left

        P = acfghijkvodebustrlmnpqwxyz
        C = opqrstuvwxyzabcdefghijklmn

        asdf -> OCYQ
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'vodebusters');
    expect(result).toEqual('OCYQ');


    // const k2ResultNoRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebust');
    // const k2ResultRepeat = ciphers.monoalphabetic('asdf', 'k2', 'codebusters');

    // const randomResultNoRepeat = ciphers.monoalphabetic('asdf');

})