import { monoalphabetic } from '../../../src/util/ciphers.js'

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

/*
    setting: k2
    keyword: no repeated characters
    rotation: not required 

    inverted map from the k1 test case above

    P = hijklnqsuvwxzcryptogmabdef
    C = abcdefghijklmnopqrstuvwxyz

    asdf -> VHXZ
*/
test('no repeated characters, rotation not required', () => {
    let result = monoalphabetic('asdf', 'k2', 'cryptogm');
    expect(result).toEqual('VHXZ');
})

/*
    setting: k2
    keyword: no repeated characters
    rotation: required 

    inverted map from the k1 test case above

    P = klmnpqrvxyzwodebustacfghij
    C = abcdefghijklmnopqrstuvwxyz

    asdf -> TRNV
*/
test('no repeated characters, rotation required', () => {
    let result = monoalphabetic('asdf', 'k2', 'wodebust');
    expect(result).toEqual('TRNV');
})

/*

    setting: k2
    keyword: repeated characters
    rotation: not required 

    inverted map from the k1 test case above

    P = hijklnqsuvwxzcryptogambdef
    C = abcdefghijklmnopqrstuvwxyz

    asdf -> UHXZ
*/
test('repeated characters, rotation not required', () => {
    let result = monoalphabetic('asdf', 'k2', 'cryptogram');
    expect(result).toEqual('UHXZ');
})


/*

        setting: k2
        keyword: repeated characters
        rotation: required 

        inverted map from the k1 test case above

        P = klmnpqvwxyzcodebustrafghij
        C = abcdefghijklmnopqrstuvwxyz

        asdf -> URNV
    */
test('repeated characters, rotation required', () => {
    let result = monoalphabetic('asdf', 'k2', 'codebusters');
    expect(result).toEqual('URNV');
})

