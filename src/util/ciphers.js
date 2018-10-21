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

const rotateArray = (arr, n) => {
    return arr.slice(n, arr.length).concat(arr.slice(0, n));
}

const hasCollision = (plaintextArr, ciphertextArr) => {
    for (let i = 0; i < plaintextArr.length; i++) {
        if (plaintextArr[i] === ciphertextArr[i]) {
            return true;
        }
    }
    return false;
}

const generateDict = (plaintextArr, ciphertextArr) => {
    const result = {};
    for (let i = 0; i < plaintextArr.length; i++) {
        result[plaintextArr[i]] = ciphertextArr[i];
    }
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
        // generate a list of letters that exclude the letters from the keyword
        const restOfLetters = extractLetters(keyword);

        // instantiate the index at which to insert the keyword
        const place = Math.floor(Math.random() * restOfLetters.length);

        // generate the plaintext
        const plaintext = restOfLetters.slice(0, place)
                .concat(keyword.split(''))
                .concat(restOfLetters.slice(place));

        // generate the ciphertext
        const rotation = Math.floor(Math.random() * 26);
        let ciphertext = rotateArray(letters, rotation);

        // if a letter maps to itself, rotate until it doesn't
        while (hasCollision(plaintext, ciphertext)) {
            ciphertext = rotateArray(ciphertext, 1);
        }

        // generate the dict to map from one letter to the next
        const cipherDict = generateDict(plaintext, ciphertext);

        // encrypt the text
        const encrypted = text.toUpperCase().split('').map(c => cipherDict[c]).join('');

        return encrypted;
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