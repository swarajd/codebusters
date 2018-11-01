
/*
    UTILITIES SECTION
*/

import {
    letters,
    zipArray,
    atBashDict,
    shiftText,
    dedupe,
    generateK1Dict,
    flipDict
} from './util.js'

/*
    CIPHER SECTION
*/

const caesar = text => {
    return {
        plaintext: text,
        ciphertext: shiftText(text, 13),
        solution: zipArray(
            letters,
            shiftText(letters.join(''), 13).split('')
        )
    }
}

const atbash = text => {
    return {
        plaintext: text,
        ciphertext: text.toUpperCase()
            .split('')
            .map(c => atBashDict.hasOwnProperty(c) ? atBashDict[c] : c)
            .join(''),
        solution: atBashDict
    };
}

const monoalphabetic = (text, setting='random', keyword='')  => {

    // if the alphabet is a k variant, a word is required
    if (setting === 'k1' || setting === 'k2') {
        if (keyword == '') {
            throw "phrase missing for k1/k2 alphabet";
        } else {
            // remove all the duplicate letters from the keyword
            keyword = dedupe(keyword).toUpperCase();
        }
    }

    // handle the k1 case, where the keyword is in the plaintext alphabet
    if (setting === 'k1') {
        // generate the map from one alphabet to another
        const cipherDict = generateK1Dict(keyword);

        // encrypt the text
        const encrypted = text
            .toUpperCase()
            .split('')
            .map(c => cipherDict[c])
            .join('');

        return {
            plaintext: text,
            ciphertext: encrypted,
            solution: cipherDict
        }
    }

    // handle the k2 case, where the keyword is in the ciphertext alphabet
    if (setting === 'k2') {

        // generate the map from one alphabet to another
        const cipherDict = flipDict(generateK1Dict(keyword));

        // encrypt the text
        const encrypted = text
            .toUpperCase()
            .split('')
            .map(c => cipherDict[c])
            .join('');

        return {
            plaintext: text,
            ciphertext: encrypted,
            solution: cipherDict
        }
    }

    // handle the random monoalphabetic cipher
    if (setting === 'random') {
        return text;
    }

    // we exhausted our ciphers, if it's not one of the above throw an error
    throw "invalid cipher type";
}

/*
    EXPORT SECTION
*/

module.exports = {
    caesar,
    atbash,
    monoalphabetic
}