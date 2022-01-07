import { input, testInput } from './01_input.mjs';
import { parseLinesToNumberArray } from './utils/parser.mjs';

const data = parseLinesToNumberArray(input);
// const data = parseLinesToNumberArray(testInput);

const answer1 = data.slice(0, -1).reduce((count, _, index) => data[index] < data[index + 1] ? count += 1 : count, 0);

console.log('Answer one:', answer1);

const answer2 = data.slice(0, -3).reduce((count, _, index) => {
    const a = data[index] + data[index + 1] + data[index + 2] < data[index + 1] + data[index + 2] + data[index + 3];
    count += a ? 1 : 0;

    return count;
}, 0);

console.log('Answer two:', answer2);
