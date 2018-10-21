/*
    UTILITY SECTION
*/

const letters = (() => {
    const letters = [];
    for (let i = 0; i < 26; i++) {
        letters.push(String.fromCharCode(65 + i));
    }
    return letters;
})();

const reverseLetters = letters.slice().reverse();

// create a map that goes from A->Z, B->Y, ... Y->B, Z->A
const atBashMap = (() => {
    const result = {};
    letters.forEach((letter, i) => result[letter] = reverseLetters[i]);
    return result;
})();

const isLetter = c => /[A-Z]/.test(c);

const shiftChar = (c, n) => {
    if (isLetter(c)) {
        const shiftedNum = (((c.charCodeAt(0) - 65) + n) % 26) + 65;
        return String.fromCharCode(shiftedNum);
    } else {
        return c;
    }
}

const shiftText = (text, n) => {
    return text.toUpperCase().split('').map(c => shiftChar(c, n)).join('')
}

const dedupe = keyword => {
    const letterSet = new Set();
    const result = [];
    keyword.split('').forEach(ch => {
        if (!letterSet.has(ch)) {
            letterSet.add(ch);
            result.push(ch);
        }
    });
    return result.join('');
}

const extractLetters = keyword => {
    const result = [];
    letters.forEach(l => {
        if (!keyword.includes(l)) {
            result.push(l);
        }
    });
    return result;
}

/*
    CIPHER SECTION
*/

const caesar = text => {
    return shiftText(text, 13);
}

const atbash = text => {
    return text.toUpperCase().split('').map(c => atBashMap.hasOwnProperty(c) ? atBashMap[c] : c).join('');
}

const monoalphabetic = (text, setting='random', keyword='', place, map)  => {
    // if the alphabet is a k variant, a word is required
    if (setting === 'k1' || setting === 'k2') {
        if (keyword == '') {
            throw "phrase missing for k1/k2 alphabet";
        } else {
            keyword = dedupe(keyword).toUpperCase();
        }
    }

    // handle the k1 case, where the keyword is in the plaintext alphabet
    if (setting === 'k1') {
        const restOfLetters = extractLetters(keyword);
        if (place === undefined) {
            place = Math.floor(Math.random() * restOfLetters.length);
        } else {
            if (place < 0 || place >= keyword.length) {
                throw "invalid place for keyword";
            }
        }
        const newLetters = restOfLetters.slice(0, place)
                .concat(keyword.split(''))
                .concat(restOfLetters.slice(place));
        return text;
    }

    // handle the k2 case, where the keyword is in the ciphertext alphabet
    if (setting === 'k2') {
        return text;
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
    dedupe,
    letters,
    caesar,
    atbash,
    monoalphabetic
}