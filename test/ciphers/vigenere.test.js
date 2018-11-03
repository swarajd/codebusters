import { vigenere } from './../../src/util/ciphers.js'

test('key should be provided', () => {
    try {
        let result = vigenere('some plaintext');
    } catch (e) {
        expect(e).toEqual("key missing for vigenere cipher");
    }
})

test('basic test of plaintext and key', () => {
    let plaintext  = 'ATTACKATDAWN';
    let key        = 'LEMON';
    let ciphertext = 'LXFOPVEFRNHR';

    let result = vigenere(plaintext, key);

    expect(result.ciphertext).toEqual(ciphertext);
})