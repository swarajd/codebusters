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
        rotation: not required

        plaintext = abcdefghijklmnopqrstuvwxyz

        keyword = cryptogm
        rest of letters are = abdefhijklnqsuvwxz
        initial letters = cryptogmabdefhijklnqsuvwxz
        random = 0.5 so rotation is 13
        rotating yields
        
        ciphertext = hijklnqsuvwxzcryptogmabdef

        P = abcdefghijklmnopqrstuvwxyz
        C = hijklnqsuvwxzcryptogmabdef

        asdf -> HOKN
    */
    let result = ciphers.monoalphabetic('asdf', 'k1', 'cryptogm');
    expect(result).toEqual('HOKN');

    /*
        setting: k1
        keyword: no repeated characters
        rotation: required 

        plaintext = abcdefghijklmnopqrstuvwxyz

        keyword = wodebust
        rest of letters are = acfghijklmnpqrvxyz
        random = 0.5 so rotation is 13
        initial letters = wodebustacfghijklmnpqrvxyz
        rotating yields
        
        ciphertext = ijklmnpqrvxyzwodebustacfgh

        P = abcdefghijklmnopqrstuvwxyz
        C = ijklmnpqrvxyzwodebustacfgh

        rotation required (o), rotate one to the left

        P = abcdefghijklmnopqrstuvwxyz
        C = jklmnpqrvxyzwodebustacfghi

        rotation required (t), rotate one to the left

        P = abcdefghijklmnopqrstuvwxyz
        C = klmnpqrvxyzwodebustacfghij

        asdf -> KTNQ
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'wodebust');
    expect(result).toEqual('KTNQ');

    /*
        setting: k1
        keyword: repeating characters
        rotation: not required

        plaintext = abcdefghijklmnopqrstuvwxyz

        keyword = cryptogram
        deduped = cryptogam
        rest of letters are = bdefhijklnqsuvwxz
        random = 0.5 so rotation is 13
        initial letters = cryptogambdefhijklnqsuvwxz
        rotating yields
        
        ciphertext = hijklnqsuvwxzcryptogambdef

        P = abcdefghijklmnopqrstuvwxyz
        C = hijklnqsuvwxzcryptogambdef

        asdf -> HOKN
        
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'cryptogram');
    expect(result).toEqual('HOKN');

    /*
        setting: k1
        keyword: repeated characters
        rotation: required 

        plaintext = abcdefghijklmnopqrstuvwxyz

        keyword = codebusters
        deduped = codebustr
        rest of letters are = afghijklmnpqvwxyz (length 17)
        random = 0.5 so rotation is 13
        initial letters = codebustrafghijklmnpqvwxyz
        rotating yields

        ciphertext = ijklmnpqvwxyzcodebustrafgh
        
        P = abcdefghijklmnopqrstuvwxyz
        C = ijklmnpqvwxyzcodebustrafgh

        rotation required (o), rotate one to the left

        P = abcdefghijklmnopqrstuvwxyz
        C = jklmnpqvwxyzcodebustrafghi

        rotation required (t), rotate one to the left

        P = abcdefghijklmnopqrstuvwxyz
        C = klmnpqvwxyzcodebustrafghij

        asdf -> KTNQ
    */
    result = ciphers.monoalphabetic('asdf', 'k1', 'codebusters');
    expect(result).toEqual('KTNQ');


    /*
        setting: k2
        keyword: no repeated characters
        rotation: not required 

        inverted map from the k1 test case above

        P = hijklnqsuvwxzcryptogmabdef
        C = abcdefghijklmnopqrstuvwxyz

        asdf -> VHXZ
    */
    result = ciphers.monoalphabetic('asdf', 'k2', 'cryptogm');
    expect(result).toEqual('VHXZ');

    /*
        setting: k2
        keyword: no repeated characters
        rotation: required 

        inverted map from the k1 test case above

        P = klmnpqrvxyzwodebustacfghij
        C = abcdefghijklmnopqrstuvwxyz

        asdf -> TRNV
    */
    result = ciphers.monoalphabetic('asdf', 'k2', 'wodebust');
    expect(result).toEqual('TRNV');

    /*

        setting: k2
        keyword: repeated characters
        rotation: not required 

        inverted map from the k1 test case above

        P = hijklnqsuvwxzcryptogambdef
        C = abcdefghijklmnopqrstuvwxyz

        asdf -> UHXZ
    */
   result = ciphers.monoalphabetic('asdf', 'k2', 'cryptogram');
   expect(result).toEqual('UHXZ');

   /*

        setting: k2
        keyword: repeated characters
        rotation: required 

        inverted map from the k1 test case above

        P = klmnpqvwxyzcodebustrafghij
        C = abcdefghijklmnopqrstuvwxyz

        asdf -> URNV
    */
   result = ciphers.monoalphabetic('asdf', 'k2', 'codebusters');
   expect(result).toEqual('URNV');

    // const randomResultNoRepeat = ciphers.monoalphabetic('asdf');

})