import { assert } from '../utils/tools.mjs';
import { input, testInput } from './input.mjs';

const parse = (input) => input.split(',').map(Number);

const memoryGame = (data, rounds = 2020) => {
    const numbers = data.reduce((numbers, num, index) => {
        numbers.set(num, [index + 1]);
        return numbers;
    }, new Map());
    let number = data[data.length - 1];

    for (let i = data.length + 1; i <= rounds; i += 1) {
        const round = numbers.get(number);
        number = round.length <= 1 ? 0 : round[0] - round[1];
        const newNum = numbers.get(number);
        numbers.set(number, [i, ...(newNum ? [newNum[0]] : [])]);
    }
    return number;
};

assert(memoryGame(parse(testInput)) === 436);
console.log('answer one:', memoryGame(parse(input)));

assert(memoryGame(parse(testInput)) === 436);
assert(memoryGame([0, 3, 6], 30000000) === 175594);
assert(memoryGame([1, 3, 2], 30000000) === 2578);
assert(memoryGame([2, 1, 3], 30000000) === 3544142);
assert(memoryGame([1, 2, 3], 30000000) === 261214);
assert(memoryGame([2, 3, 1], 30000000) === 6895259);
assert(memoryGame([3, 2, 1], 30000000) === 18);
assert(memoryGame([3, 1, 2], 30000000) === 362);
console.log('answer two:', memoryGame(parse(input), 30000000));
