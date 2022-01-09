import { input, testInput } from './08_input.mjs';

const parseInput = input => input.split('\n').map(line => line.split(' | ').map(parts => parts.split(' ')));

const data = parseInput(testInput);
// const data = parseInput(input);

console.log(data);