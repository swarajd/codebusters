import { vigenere } from './../../src/util/ciphers.js'
import { addLetters, subtractLetters, extendKey } from './../../src/util/util.js'

test('key should be provided', () => {
    try {
        vigenere('some plaintext');
    } catch (e) {
        expect(e).toEqual("key missing for vigenere cipher");
    }
});

describe('addition of letters', () => {

    test('0 + 0 = 0', () => {
        expect(addLetters('A', 'A')).toEqual('A');
    });

    test('0 + 1 = 1', () => {
        expect(addLetters('A', 'B')).toEqual('B');
    });

    test('3 + 5 = 8', () => {
        expect(addLetters('D', 'F')).toEqual('I');
    });

    test('15 + 18 = 33 - 26 = 7', () => {
        expect(addLetters('P', 'S')).toEqual('H');
    });

    test('12 + 14 = 26 - 26 = 0', () => {
        expect(addLetters('M', 'O')).toEqual('A');
    });

});

describe('subtraction of letters', () => {

    test('0 - 0 = 0', () => {
        expect(subtractLetters('A', 'A')).toEqual('A');
    });

    test('1 - 1 = 0', () => {
        expect(subtractLetters('B', 'B')).toEqual('A');
    });

    test('8 - 5 = 3', () => {
        expect(subtractLetters('I', 'F')).toEqual('D');
    });

    test('7 - 18 = -11 + 26 = 15', () => {
        expect(subtractLetters('H', 'S')).toEqual('P');
    });

    test('0 - 14 = -14 + 26 = 12', () => {
        expect(subtractLetters('A', 'O')).toEqual('M');
    });

});

describe('extension of a key', () => {

    test('key is shorter than text', () => {
        const key = 'test';
        const plaintext = 'asd';

        try {
            extendKey(key, plaintext.length);
        } catch (e) {
            expect(e).toEqual("string too short to extend key");
        }
    });

    test('key len matches text len', () => {
        const key = 'test';
        const plaintext = 'asdf';

        const extendedKey = extendKey(key, plaintext.length);

        expect(extendedKey.length).toEqual(plaintext.length);
    });

    test('key len is shorter than text len, there is a remainder', () => {
        const key = 'test';
        const plaintext = 'asdfasd';

        const extendedKey = extendKey(key, plaintext.length);

        expect(extendedKey).toEqual('testtes');
    });

    test('key len is shorter than text len, there is no remainder', () => {
        const key = 'test';
        const plaintext = 'asdfasdf';

        const extendedKey = extendKey(key, plaintext.length);

        expect(extendedKey).toEqual('testtest');
    });
});

test('basic test of plaintext and key', () => {
    let plaintext  = 'ATTACKATDAWN';
    let key        = 'LEMON';
    let ciphertext = 'LXFOPVEFRNHR';

    let result = vigenere(plaintext, key);

    expect(result.ciphertext).toEqual(ciphertext);
})