/*
    UTILITY SECTION
*/

const letters = (() => {
    let letters = [];
    for (let i = 0; i < 26; i++) {
        letters.push(String.fromCharCode(65 + i));
    }
    return letters;
})();

const reverseLetters = letters.slice().reverse();

// create a map that goes from A->Z, B->Y, ... Y->B, Z->A
const atBashMap = (() => {
    let result = {};
    letters.forEach((letter, i) => result[letter] = reverseLetters[i]);
    return result;
})()

const isLetter = c => /[A-Z]/.test(c)

const shiftChar = (c, n=0) => {
    if (isLetter(c)) {
        const shiftedNum = (((c.charCodeAt(0) - 65) + n) % 26) + 65;
        return String.fromCharCode(shiftedNum);
    } else {
        return c;
    }
}

const shiftText = (text, n=0) => {
    return text.toUpperCase().split('').map(c => shiftChar(c, n)).join('')
}

const dedupe = word => {
    const letterSet = new Set();
    const result = [];
    for (character of word) {
        if (!letterSet.has(character)) {
            letterSet.add(character);
            result.push(character);
        }
    }
    return result.join('');
}

/*
    CIPHER SECTION
*/

const caesar = text => {
    return shiftText(text, 13);
}

const atbash = text => {
    return text.toUpperCase().split('').map(c => atBashMap[c]).join('')
}

const monoalphabetic = (text, setting='random', word='')  => {
    if ((setting === 'k1' || setting === 'k2') && word == '') {
        throw "phrase missing for k1/k2 alphabet"
    }
    return text;
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