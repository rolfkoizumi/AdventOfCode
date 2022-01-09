import { input, testInput } from './07_input.mjs';

const parseInput = input => input.split(',').map(Number);
// const data = parseInput(testInput);
const data = parseInput(input);

const checkFuelCost = (data, position) => {
    return data.reduce((fuelCost, currentPosition) => fuelCost += Math.abs(position - currentPosition), 0);
};

const findCheapestCost = (data, costFunc) => {
    let currentCost = Infinity;
    for (let pos = 0; pos <= Math.max(...data); pos += 1) {
        const cost = costFunc(data, pos);
        currentCost = Math.min(currentCost, cost);
    }
    return currentCost;
};

console.log('Answer one:', findCheapestCost(data, checkFuelCost));

const checkFuelCost2 = (data, position) => {
    return data.reduce((fuelCost, currentPosition) => {
        const n = Math.abs(position - currentPosition);
        return fuelCost += n * (n + 1) / 2;
    }, 0);
};

console.log('Answer two:', findCheapestCost(data, checkFuelCost2));