import { input, testInput } from './input.mjs';

export const parse = (input) => {
    const parsed = input.split(/\n/);
    return [parsed[0], parsed[1].split(',')];
};

const part1 = (data) => {
    const busIds = data[1].filter((num) => num !== 'x');
    for (let time = parseInt(data[0], 10); true; time++) {
        const busId = busIds.find((busId) => {
            const frac = time / busId;
            if (frac - Math.floor(frac) === 0) {
                return true;
            }
        });
        if (busId) {
            return [busId, time];
        }
    }
};

const part2 = (data) => {
    const maxIndex = data.indexOf(
        `${Math.max(
            ...data.filter((a) => a !== 'x').map((a) => parseInt(a, 10))
        )}`
    );

    for (let i = 0; i < 10000000000; i += 1) {
        const prod = data[maxIndex] * i;
        const found = data.every((busId, index) => {
            if (busId === 'x') {
                return true;
            }
            const frac = (prod - maxIndex + index) / busId;
            return frac - Math.floor(frac) === 0;
        });
        if (found) {
            return prod - maxIndex;
        }
    }
};

const testData = parse(testInput);
const part1test = part1(testData);
console.log(
    'test 1 cleared:',
    (part1test[1] - testData[0]) * part1test[0] === 295
);

const data = parse(input);
const part1res = part1(data);
console.log('answer 1:', (part1res[1] - data[0]) * part1res[0]);

console.log('test 2 cleared:', part2(testData[1]) === 1068781);
console.log('test 2 cleared:', part2(`17,x,13,19`.split(',')) === 3417);
console.log('test 2 cleared:', part2(`67,7,59,61`.split(',')) === 754018);
console.log('test 2 cleared:', part2(`67,x,7,59,61`.split(',')) === 779210);
console.log('test 2 cleared:', part2(`67,7,x,59,61`.split(',')) === 1261476);
console.log(
    'test 2 cleared:',
    part2(`1789,37,47,1889`.split(',')) === 1202161486
);

console.log('answer 2:', part2(data[1]));
