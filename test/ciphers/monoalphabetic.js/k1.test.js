import { monoalphabetic } from '../../../src/util/ciphers.js'

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;


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
test('no repeated characters, rotation not required', () => {
    let result = monoalphabetic('asdf', 'k1', 'cryptogm');
    expect(result).toEqual('HOKN');
})

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
test('no repeated characters, rotation required', () => {
    let result = monoalphabetic('asdf', 'k1', 'wodebust');
    expect(result).toEqual('KTNQ');
})

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
test('repeated characters, rotation not required', () => {
    let result = monoalphabetic('asdf', 'k1', 'cryptogram');
    expect(result).toEqual('HOKN');
})

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
test('repeated characters, rotation required', () => {
    let result = monoalphabetic('asdf', 'k1', 'codebusters');
    expect(result).toEqual('KTNQ');
})

