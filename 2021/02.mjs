import { input, testInput } from './02_input.mjs';
import { parseLinesToArray } from './utils/parser.mjs';

const part1 = (input) => {
    const posX = input.match(/forward \d+/gi).reduce((posX, command) => posX += parseInt(command.replace('forward ', '')), 0);
    const down = input.match(/down \d+/gi).reduce((down, command) => down += parseInt(command.replace('down ', '')), 0);
    const up = input.match(/up \d+/gi).reduce((up, command) => up -= parseInt(command.replace('up ', '')), 0);

    return posX * (down + up);
};

console.log('Answer one:', part1(input));

const part2 = (data) => {
    let posY = 0;
    let posX = 0;
    let aim = 0;

    data.forEach(command => {
        const [_, move, units] = command.match(/(\w+) (\d+)/);

        if (move === 'down') {
            aim += parseInt(units);
        } else if (move === 'up') {
            aim -= parseInt(units);
        } else {
            posX += parseInt(units);
            posY += aim * parseInt(units);
        }
    });

    return posX * posY;
};

const data = parseLinesToArray(input);
// const data = parseLinesToArray(testInput);

console.log('Answer two:', part2(data));