// import { monoalphabetic } from '../../../src/util/ciphers.js'
import { randomDerangementDict } from '../../../src/util/util.js'

test('asdf', () => {
    let derangement;
    for (let i = 0; i < 10000; i++) {
        derangement = randomDerangementDict();
        for (let key in derangement) {
            expect(key).not.toEqual(derangement[key]);
        }
    }
})