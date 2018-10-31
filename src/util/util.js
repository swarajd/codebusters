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

const zipArray = (plaintextArr, ciphertextArr) => {
    const result = {};
    for (let i = 0; i < plaintextArr.length; i++) {
        result[plaintextArr[i]] = ciphertextArr[i];
    }
    return result;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateK1Dict = (keyword) => {
    // generate a list of letters that exclude the letters from the keyword
    const restOfLetters = extractLetters(keyword);

    // generate the plaintext
    const plaintext = letters;

    // generate the ciphertext
    const rotation = getRandomInt(0, 25);
    let ciphertext = keyword.split('').concat(restOfLetters);
    ciphertext = rotateArray(ciphertext, rotation);

    // if a letter maps to itself, rotate until it doesn't
    while (hasCollision(plaintext, ciphertext)) {
        ciphertext = rotateArray(ciphertext, 1);
    }

    // return the dict to map from one letter to the next
    return zipArray(plaintext, ciphertext);
}

const flipDict = dict => {
    const result = {};
    for (let key in dict) {
        result[dict[key]] = key;
    }
    return result;
}

const dValues = (() => {
    const result = new Array(letters.length + 1);
    result[0] = 1;
    result[1] = 0;
    for (let i = 2; i < letters.length + 1; i++) {
        result[i] = (i - 1) * (result[i - 1] + result[i - 2]);
    }
    return result;
})();

const swap = (arr, i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

const randomDerangement = (arr) => {
    const A = arr.slice();
    const mark = new Array(A.length);
    mark.fill(false);
    let i = A.length - 1;
    let u = A.length;

    while (u >= 2) {
        if (!mark[i]) {
            let j = getRandomInt(0, i - 1);
            let marked = mark[j];
            while (marked) {
                j = getRandomInt(0, i - 1);
                marked = mark[j];
            }
            swap(A, i, j);
            let p = Math.random();
            let uVal = (u - 1) * dValues[u - 2] / dValues[u];
            if (p < uVal) {
                mark[j] = true;
                u = u - 1;
                // console.log(u, i);
            }
            u = u - 1;
            // console.log(u, i);
        }
        i = i - 1;
        // console.log(u, i);
    }
    return A;
}

const randomDerangementDict = () => {
    return zipArray(
        letters,
        randomDerangement(letters)
    );
}


module.exports = {
    atBashMap,
    shiftText,
    dedupe,
    extractLetters,
    zipArray,
    generateK1Dict,
    flipDict,
    randomDerangementDict
}