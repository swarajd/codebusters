
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
    flipDict,
    randomDerangementDict
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

const monoalphabetic = (text, setting, keyword)  => {

    if (!(setting === 'k1' || setting === 'k2' || setting === 'random')) {
        // setting should be k1, k2, or random
        throw "invalid cipher type";
    }

    // if the alphabet is a k variant, a word is required
    if (setting === 'k1' || setting === 'k2') {
        if (keyword == undefined) {
            throw "phrase missing for k1/k2 alphabet";
        } else {
            // remove all the duplicate letters from the keyword
            keyword = dedupe(keyword).toUpperCase();
        }
    }

    let cipherDict;

    // handle the k1 case, where the keyword is in the plaintext alphabet
    if (setting === 'k1') {
        // generate the map from one alphabet to another
        cipherDict = generateK1Dict(keyword);
    }

    // handle the k2 case, where the keyword is in the ciphertext alphabet
    if (setting === 'k2') {
        // generate the map from one alphabet to another
        cipherDict = flipDict(generateK1Dict(keyword));
    }

    // handle the random monoalphabetic cipher
    if (setting === 'random') {
        // generate the map from one alphabet to another
        cipherDict = randomDerangementDict();
    }

    // encrypt the text
    const encrypted = text
        .toUpperCase()
        .split('')
        .map(c => cipherDict.hasOwnProperty(c) ? cipherDict[c] : c)
        .join('');

    return {
        plaintext: text,
        ciphertext: encrypted,
        solution: cipherDict
    }

}

/*
    EXPORT SECTION
*/

module.exports = {
    caesar,
    atbash,
    monoalphabetic
}