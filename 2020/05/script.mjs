import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const calculateRow = (boardingPass) =>
    parseInt(
        boardingPass.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'),
        2
    );

const calculateColumn = (boardingPass) =>
    parseInt(
        boardingPass.substr(7, 3).replace(/L/g, '0').replace(/R/g, '1'),
        2
    );

const calculateSeatId = (boardingPass) =>
    calculateRow(boardingPass) * 8 + calculateColumn(boardingPass);

const data = parseLinesToArray(input);

const highestSeatId = data.reduce(
    (max, boardingPass) => Math.max(calculateSeatId(boardingPass), max),
    0
);

console.log('Answer one:', highestSeatId);

const createBoardingPass = (row, column) => {
    const fillUpLeadingZeros = (string, desiredLength) =>
        '0'.repeat(desiredLength - string.length) + string;
    return (
        fillUpLeadingZeros((row >>> 0).toString(2), 7)
            .replace(/0/g, 'F')
            .replace(/1/g, 'B') +
        fillUpLeadingZeros((column >>> 0).toString(2), 3)
            .replace(/0/g, 'L')
            .replace(/1/g, 'R')
    );
};

const seatIds = {
    taken: [],
    free: [],
};

for (let row = 1; row <= 126; row++) {
    for (let column = 0; column <= 7; column++) {
        const boardingPass = createBoardingPass(row, column);
        seatIds[data.includes(boardingPass) ? 'taken' : 'free'].push(
            calculateSeatId(boardingPass)
        );
    }
}

seatIds.free.forEach((seatId) => {
    if (
        seatIds.taken.includes(seatId - 1) &&
        seatIds.taken.includes(seatId + 1)
    ) {
        console.log('Answer two:', seatId);
    }
});
