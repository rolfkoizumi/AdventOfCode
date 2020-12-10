import { input, testInput } from './input.mjs';
import { parseLinesToIntArray } from '../utils/parser.mjs';

const isNumberAtIndexValid = (index, list, preambleLength = 25) => {
    if (index <= preambleLength - 1) {
        return true;
    }
    const previousNumbers = list.slice(index - preambleLength, index);
    let isValid = false;
    outerloop: for (let i = 0; i < previousNumbers.length; i++) {
        for (let j = 0; j < previousNumbers.length; j++) {
            if (
                i !== j &&
                previousNumbers[i] + previousNumbers[j] === list[index]
            ) {
                isValid = true;
                break outerloop;
            }
        }
    }
    return isValid;
};

const sumIndexToIndex = (startIndex, endIndex, list) =>
    list.slice(startIndex, endIndex + 1).reduce((sum, num) => sum + num, 0);

const numbers = parseLinesToIntArray(input);
const preambleLength = 25;
let answerOne = null;

for (let i = preambleLength; i < numbers.length; i++) {
    if (!isNumberAtIndexValid(i, numbers, preambleLength)) {
        console.log('Answer one:', numbers[i]);
        answerOne = numbers[i];
        break;
    }
}

for (let i = 0; i < numbers.length; i++) {
    let sum = 0;
    let j = 0;
    while (sum < answerOne) {
        j += 1;
        sum = sumIndexToIndex(i, i + j, numbers);
    }
    if (sum === answerOne) {
        const resultList = numbers.slice(i, i + j + 1);
        console.log(
            'Answer two:',
            Math.min(...resultList) + Math.max(...resultList)
        );
        break;
    }
}
