import { monoalphabetic } from './../../src/util/ciphers.js'

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;


describe('validation', () => {

    // if the setting is k1/k2, there must be a phrase
    test('if k1/k2, must have phrase', () => {
        try {
            monoalphabetic('asdf', 'k1');
        } catch (e) {
            expect(e).toEqual("phrase missing for k1/k2 alphabet");
        }
    })
    

    // the cipher type must be either 'k1', 'k2', or 'random'
    test('type must be k1/k2/random', () => {
        try {
            monoalphabetic('asdf', 'what');
        } catch (e) {
            expect(e).toEqual("invalid cipher type");
        }
    })

})

describe('k1 alphabet', () => {

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


})

describe('k2 alphabet', () => {
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

})

describe('random alphabet', () => {
    // const randomResultNoRepeat = monoalphabetic('asdf');
})