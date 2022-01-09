import { input, testInput } from './06_input.mjs';

const parseInput = input => {
    const inputAsArray = input.split(',').map(Number);
    return [...Array(9).keys()].reduce((fishPerDay, day) => {
        fishPerDay.set(day, inputAsArray.filter(d => day === d).length);
        return fishPerDay;
    }, new Map());
};

// const data = parseInput(testInput);
const data = parseInput(input);

const simulateDays = (data, days) =>  {
    for (let i = 0; i < days; i += 1) {
        data = [...Array(9).keys()].reduce((fishPerDay, day) => {
            const fishCount = data.get(day);
            if (day === 0) {
                fishPerDay.set(6, fishCount);
                fishPerDay.set(8, fishCount);
            } else {
                fishPerDay.set(day - 1, (fishPerDay.get(day - 1) ?? 0) + fishCount);
            }
            return fishPerDay;
        }, new Map());
    }

    return data;
};

const countFish = data => {
    return Array.from(data.values()).reduce((count, fishPerDay) => count += fishPerDay, 0);
};

console.log('Answer one:', countFish(simulateDays(data, 80)));
console.log('Answer two:', countFish(simulateDays(data, 256)));