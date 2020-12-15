import { assert } from '../utils/tools.mjs';
import { input, testInput } from './input.mjs';

const parse = (input) => input.split(',').map(Number);

const part1 = (data, rounds = 2020) => {
    const numbers = data.reverse();
    while (numbers.length < rounds) {
        const lastSpoken = numbers.indexOf(numbers[0], 1);
        if (lastSpoken > 0) {
            numbers.unshift(numbers.length - (numbers.length - lastSpoken));
        } else {
            numbers.unshift(0);
        }
    }
    return numbers[0];
};

const part2 = (data, rounds = 2020) => {
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

assert(part1(parse(testInput)) === 436);
console.log('answer one:', part1(parse(input)));

assert(part2(parse(testInput)) === 436);
assert(part2([0, 3, 6], 30000000) === 175594);
assert(part2([1, 3, 2], 30000000) === 2578);
assert(part2([2, 1, 3], 30000000) === 3544142);
assert(part2([1, 2, 3], 30000000) === 261214);
assert(part2([2, 3, 1], 30000000) === 6895259);
assert(part2([3, 2, 1], 30000000) === 18);
assert(part2([3, 1, 2], 30000000) === 362);
console.log('answer two:', part2(parse(input), 30000000));
