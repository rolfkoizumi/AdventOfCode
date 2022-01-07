import { input, testInput } from './03_input.mjs';
import { parseLinesTo2dNumberArray } from './utils/parser.mjs';
import { transpose2d } from './utils/tools.mjs';

const data = parseLinesTo2dNumberArray(input);
// const data = parseLinesTo2dNumberArray(testInput);
const transposedData = transpose2d(data);

const binaryNumbers = transposedData.reduce((binaryNumbers, column) => {
    binaryNumbers[0] += (column.join('').match(/0/g)?.length ?? 0) > (column.join('').match(/1/g)?.length ?? 0) ? '0' : '1';
    binaryNumbers[1] += (column.join('').match(/0/g)?.length ?? 0) < (column.join('').match(/1/g)?.length ?? 0) ? '0' : '1';

    return binaryNumbers;
}, ['', '']);

console.log('Answer one:', parseInt(binaryNumbers[0], 2) * parseInt(binaryNumbers[1], 2));

const getRating = (data, countMajority = false) => {
    let numbers = [...data];
    let i = 0;
    while (numbers.length > 1) {
        const transposed = transpose2d(numbers);
        const moreZeros = (transposed[i].join('').match(/0/g)?.length ?? 0) > (transposed[i].join('').match(/1/g)?.length ?? 0);
        const selectedBit = countMajority === moreZeros ? 0 : 1;
        numbers = numbers.filter(row => row[i] === selectedBit);
        i += 1;
    }


    return parseInt(numbers.flat().join(''), 2);
};

console.log('Answer two:', getRating(data, true) * getRating(data));