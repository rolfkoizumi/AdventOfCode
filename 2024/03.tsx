// https://adventofcode.com/2024/day/3

import * as utils from './utils';

function parser(data: string) {
    return data.match(/mul\(\d{1,3},\d{1,3}\)/gm);
}

function runProgram(multiplications: string[]) {
    return multiplications.map(mul => {
        const [, num1, num2] = mul.match(/mul\((\d{1,3}),(\d{1,3})\)/)
        return Number(num1) * Number(num2);
    }).reduce((sum, num) => sum + num, 0);
}

const exampleMemory = parser(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`);
utils.assert(runProgram(exampleMemory), 161);

const memory = utils.readData('03.txt', parser);
console.log('Answer:', runProgram(memory));

function parser2(data: string) {
    const instructions = data.match(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gm);
    let allowed = true;
    return instructions.filter(instruction => {
        if (instruction === 'do()') {
            allowed = true;
            return false;
        } else if (instruction === 'don\'t()') {
            allowed = false;
            return false;
        } else if (allowed) {
            return true;
        }
    });
}

const exampleMemory2 = parser2(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`);
utils.assert(runProgram(exampleMemory2), 48);

const memory2 = utils.readData('03.txt', parser2);
console.log('Answer 2:', runProgram(memory2));