import { input, testInput } from './input.mjs';
import { assert } from '../utils/tools.mjs';

const parse = (input) => {
    const parsed = input.split(/\n/);
    return [parsed[0], parsed[1].split(',')];
};

const part1 = (data) => {
    const busIds = data[1].filter((num) => num !== 'x').map(Number);
    for (let time = parseInt(data[0], 10); Number.MAX_SAFE_INTEGER; time++) {
        const busId = busIds.find((busId) => {
            if (time % busId === 0) {
                return true;
            }
        });
        if (busId) {
            return [busId, time];
        }
    }
};

const part2inefficient = (data) => {
    const busIdsIndices = data
        .map((a, i) => [parseInt(a, 10), i])
        .filter((a) => !isNaN(a[0]));
    const product = busIdsIndices.reduce((a, b) => a * b[0], 1);

    const max = busIdsIndices.reduce((max, item) =>
        max[0] >= item[0] ? max : item
    );

    const gcd = data.reduce(
        (gcd, item, index) => {
            if (
                data.length > parseInt(item, 10) + index &&
                data[parseInt(item, 10) + index] !== 'x' &&
                parseInt(item, 10) *
                    parseInt(data[parseInt(item, 10) + index], 10) >
                    gcd.gcd
            ) {
                gcd.index = parseInt(item, 10) + index;
                gcd.gcd =
                    parseInt(item, 10) *
                    parseInt(data[parseInt(item, 10) + index], 10);
            }
            return gcd;
        },
        { index: 0, gcd: 0 }
    );

    const step = Math.max(max[0], gcd.gcd);
    const stepIndex = step === gcd.gcd ? gcd.index : max[1];

    for (let time = 0; time < product; time += step) {
        const validIds = busIdsIndices
            .filter((a) => (time + a[1]) % a[0] === 0)
            .map((a) => a[0]);
        const found = data.every((busId, index) => {
            if (busId === 'x') {
                return true;
            }
            const frac = (time - stepIndex + index) / busId;
            return frac - Math.floor(frac) === 0;
        });
        if (found) {
            return time - stepIndex;
        }
    }
};

const part2 = (data) => {
    const busIdsIndices = data
        .map((a, i) => [parseInt(a, 10), i])
        .filter((a) => !isNaN(a[0]));
    const product = busIdsIndices.reduce((a, b) => a * b[0], 1);
    let step = busIdsIndices[0][0];
    let start = 0;
    let run = true;
    let result = null;

    while (run) {
        for (let time = start; time < product; time += step) {
            const validIds = busIdsIndices
                .filter((a) => (time + a[1]) % a[0] === 0)
                .map((a) => a[0]);

            if (validIds.length === busIdsIndices.length) {
                run = false;
                result = time;
                break;
            }

            if (validIds.length > 1) {
                const gcd = (a, b) => (a ? gcd(b % a, a) : b);
                let lcm = validIds.reduce((a, b) => (a * b) / gcd(a, b));
                start = time + lcm;
                step = lcm;
                break;
            }
        }
    }

    return result;
};

const testData = parse(testInput);
const part1test = part1(testData);
assert((part1test[1] - testData[0]) * part1test[0] === 295);

const data = parse(input);
const part1res = part1(data);
console.log('answer 1:', (part1res[1] - data[0]) * part1res[0]);

assert(part2(testData[1]) === 1068781);
assert(part2(`17,x,13,19`.split(',')) === 3417);
assert(part2(`67,7,59,61`.split(',')) === 754018);
assert(part2(`67,x,7,59,61`.split(',')) === 779210);
assert(part2(`67,7,x,59,61`.split(',')) === 1261476);
assert(part2(`1789,37,47,1889`.split(',')) === 1202161486);

console.log('answer 2:', part2(data[1]));
