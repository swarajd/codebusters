import { 
    matrixMultiply,
    modMatrix,
    transpose,
    generateRandomInvertibleMatrix,
    isInvertible
} from './../../src/util/util.js'

import { hill } from './../../src/util/ciphers.js'

describe('test matrix multiplication', () => {
    test('matrix multiply error', () => {
        const A = [[1, 2, 3]];
        const B = [[1, 2, 3, 4]];
    
        try {
            matrixMultiply(A, B);
        } catch (e) {
            expect(e).toEqual("incompatible matrices")
        }
    });
    
    test('matrix multiply (src: math is fun)', () => {
        const A = [[3, 4, 2]];
        const B = [
            [13, 9, 7, 15],
            [8, 7, 4, 6],
            [6, 4, 0, 3]
        ];
    
        const res = matrixMultiply(A, B);
        
        expect(res).toEqual([
            [83, 63, 37, 75]
        ]);
    });
    
    test('matrix multiply (src: wikipedia)', () => {
        const A = [
            [6, 24, 1],
            [13, 16, 10],
            [20, 17, 15]
        ];
        const B = [
            [0],
            [2],
            [19]
        ];
    
        const res = matrixMultiply(A, B);
        
        expect(res).toEqual([
            [67],
            [222],
            [319]
        ]);
    });
});


test('mod matrix', () => {
    const A = [
        [67],
        [222],
        [319]
    ];

    const res = modMatrix(A, 26);

    expect(res).toEqual([
        [15],
        [14],
        [7]
    ]);
});

test('transpose matrix', () => {
    const A = [
        [67],
        [222],
        [319]
    ];

    const At = transpose(A);

    const Att = transpose(At);

    expect(At).toEqual([[67, 222, 319]]);
    expect(A).toEqual(Att);
})

test('3x3 hill cipher', () => {
    const text = "ACT";
    const matrix = [
        [6, 24, 1],
        [13, 16, 10],
        [20, 17, 15]
    ];

    const result = hill(text, matrix);

    expect(result.ciphertext).toEqual("POH");
});

test("3x3 hill with 4 letter plaintext error", () => {
    const text = "PSAT";
    const matrix = [
        [6, 24, 1],
        [13, 16, 10],
        [20, 17, 15]
    ];

    try {
        hill(text, matrix);
    } catch (e) {
        expect(e).toEqual("please provide a plaintext that can be cleanly divided into " + matrix.length + " parts");
    }
});

test("randomly generated hill cipher 3x3 matrix", () => {
    const size   = 3;
    const matrix = generateRandomInvertibleMatrix(size);

    expect(isInvertible(matrix, size)).toBe(true);
});

test("randomly generated hill cipher 2x2 matrix", () => {
    const size   = 2;
    const matrix = generateRandomInvertibleMatrix(size);

    expect(isInvertible(matrix, size)).toBe(true);
});