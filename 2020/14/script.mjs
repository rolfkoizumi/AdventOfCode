import { assert } from '../utils/tools.mjs';
import { input, testInput, testInput2 } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const applyMaskToBinary = (maskString, number) => {
    const binaryArray = (number >>> 0).toString(2).split('').reverse();
    const masked = maskString
        .split('')
        .reverse()
        .map((maskVal, index) => {
            if (index >= binaryArray.length) {
                return maskVal;
            } else {
                return maskVal === 'X'
                    ? binaryArray[index]
                    : maskVal || binaryArray[index];
            }
        })
        .reverse();
    return masked.join('').replace(/X/g, '0');
};

const applyMaskToBinary2 = (maskString, number) => {
    const binaryArray = (number >>> 0).toString(2).split('').reverse();
    const masked = maskString
        .split('')
        .reverse()
        .map((maskVal, index) => {
            if (index >= binaryArray.length) {
                return maskVal;
            } else {
                return maskVal === '0' ? binaryArray[index] : maskVal;
            }
        })
        .reverse();
    return masked.join('');
};

const part1 = (lines) => {
    const memory = {};
    let mask = null;
    lines.forEach((line) => {
        if (line.startsWith('mask')) {
            mask = line.match(/^mask = (.*)$/)[1];
        } else {
            const [, mem, value] = line.match(/^mem\[(\d+)\] = (\d+)$/);
            const maskedValue = parseInt(applyMaskToBinary(mask, value), 2);
            memory[mem] = maskedValue;
        }
    });

    return Object.values(memory).reduce((sum, cur) => sum + cur);
};

const part2 = (lines) => {
    const memory = {};
    let mask = null;
    lines.forEach((line) => {
        if (line.startsWith('mask')) {
            mask = line.match(/^mask = (.*)$/)[1];
        } else {
            const [, mem, value] = line.match(/^mem\[(\d+)\] = (\d+)$/);
            const maskedValue = applyMaskToBinary2(mask, mem).match(
                /^[^X1]*(.*)/
            )[1];
            const doRecursive = (binaryArray) =>
                binaryArray.every((el, index) => {
                    if (index === binaryArray.length - 1 && el !== 'X') {
                        memory[parseInt(binaryArray.join(''), 2)] = parseInt(
                            value,
                            10
                        );
                    }
                    if (el === 'X') {
                        const x0 = [...binaryArray];
                        x0[index] = '0';
                        doRecursive(x0);
                        const x1 = [...binaryArray];
                        x1[index] = '1';
                        doRecursive(x1);
                    }
                    return el !== 'X';
                });
            doRecursive(maskedValue.split(''));
        }
    });

    return Object.values(memory).reduce((sum, cur) => sum + cur);
};

const testData = parseLinesToArray(testInput);
assert(part1(testData) === 165);

const data = parseLinesToArray(input);
console.log('answer 1:', part1(data));

const testData2 = parseLinesToArray(testInput2);
assert(part2(testData2) === 208);

console.log('answer 2:', part2(data));
