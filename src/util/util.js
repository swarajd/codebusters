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
const atBashDict = (() => {
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

const zipToDict = (plaintextArr, ciphertextArr) => {
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
    return zipToDict(plaintext, ciphertext);
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
    return zipToDict(
        letters,
        randomDerangement(letters)
    );
}

const mod = (n, m) => ((n % m) + m) % m;

/*
    assuming both letters are capitalized, 
    adding them and returning the 'sum'
*/
const addLetters = (a, b) => {
    const aNum = a.charCodeAt(0) - 65;
    const bNum = b.charCodeAt(0) - 65;

    const sum = mod(aNum + bNum, 26);

    return String.fromCharCode(sum + 65);
}

const extendKey = (key, strLen) => {
    if (key.length > strLen) {
        throw "string too short to extend key";
    }
    const keyLen = key.length;
    const quotient = Math.floor(strLen/keyLen);
    const remainder = strLen % keyLen;

    return key.repeat(quotient) + key.substring(0, remainder);
}

const baconianDict = (() => {
    const baconianArr = letters
        .map((_, i) => i)
        .map(num => num
            .toString(2)
            .padStart(5, '0'))
        .map(binStr => binStr
            .split('')
            .map(chr => chr === '1' ? 'B' : 'A')
            .join('')
        );
    
    const baconianDict = zipToDict(letters, baconianArr);
    return baconianDict;
})();

const gcd = (a, b) => {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

const areCoprime = (a, b) => {
    return gcd(a, b) === 1;
}

const affineLetter = (letter, a, b) => {
    const letterNum = letter.charCodeAt(0) - 65;
    const affined = mod(letterNum * a + b, letters.length);
    return String.fromCharCode(affined + 65);
}

module.exports = {
    letters,
    isLetter,
    atBashDict,
    shiftText,
    dedupe,
    extractLetters,
    zipToDict,
    generateK1Dict,
    flipDict,
    randomDerangementDict,
    addLetters,
    extendKey,
    baconianDict,
    areCoprime,
    affineLetter
}