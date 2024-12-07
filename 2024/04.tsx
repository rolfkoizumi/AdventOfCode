// https://adventofcode.com/2024/day/4
import ndarray, { type NdArray } from 'ndarray';
import * as utils from './utils';

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function parser(data: string) {
    const lines = utils.splitLines(data);
    return ndarray(new Array(lines.flatMap(line => line.split(''))), [lines[0].length, lines.length]);
}

function findXmas(array2d: NdArray<string[][]>) {
    const y = array2d.hi(3, 3).lo(1, 1);
    console.log(y)

    utils.forEach2d(array2d, (x, y) => {
        const subArray2d = array2d.hi(x + 3, y + 3).lo(x - 3, y - 3);
        // console.log(subArray2d);
        for (var i = 0; i < y.shape[0]; ++i) {
            for (var j = 0; j < y.shape[1]; ++j) {
                y.set(i, j, 1)
            }
        }
    })
}

const exampleArray2d = parser(example);
console.log(findXmas(exampleArray2d));
// utils.assert(exampleMemory, 18);

// const memory = utils.readData('03.txt', parser);
// console.log('Answer:', runProgram(memory));