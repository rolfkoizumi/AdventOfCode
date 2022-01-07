import { input, testInput } from './04_input.mjs';
import { parseLinesToArray } from './utils/parser.mjs';
import { transpose2d } from './utils/tools.mjs';

console.log(null ?? 'foo')

const parseInput = (input) => {
    const data = parseLinesToArray(input);

    const numbers = data[0].split(',').map(Number);
    const boards = data.slice(1).reduce((boards, row) => {
        if (row === '') {
            boards.push([]);

            return boards;
        }

        boards[boards.length - 1].push(row.trim().replace(/\s{2,}/g, ' ').split(' ').map(Number));

        return boards;
    }, []);

    return { numbers, boards };
};

const markNumber = (board, number) => {
    return board.map(row => row.map(cell => cell === number ? cell.toString() : cell));
};

const checkBingo = (board) => {
    return board.some(row => row.every(cell => typeof cell === 'string'))
        || transpose2d(board).some(row => row.every(cell => typeof cell === 'string'));
};

const startGame = (boards, numbers) => {
    boards = JSON.parse(JSON.stringify(boards));
    for (const number of numbers) {
        for (let i = 0; i < boards.length; i += 1) {
            boards[i] = markNumber(boards[i], number);
            if (checkBingo(boards[i])) {
                return { winningBoard: boards[i], winningNumber: number };
            }
        }
    }

    return { winningBoard: null, winningNumber: null };
};

const data = parseInput(input);
// const data = parseInput(testInput);

const { winningBoard, winningNumber } = startGame(data.boards, data.numbers);
const answer1 = winningBoard.flat().reduce((sum, number) => typeof number === 'number' ? sum += number : sum, 0) * winningNumber;

console.log('Answer one:', answer1);

const part2 = (boards, numbers) => {
    let winningBoard, winningNumber;
    boards = JSON.parse(JSON.stringify(boards));
    for (const number of numbers) {
        for (let i = 0; i < boards.length; i += 1) {
            boards[i] = markNumber(boards[i], number);
            if (checkBingo(boards[i])) {
                winningBoard = [...boards[i]];
                winningNumber = number;
                boards[i] = [];
            }
        }
    }

    return { winningBoard, winningNumber };
};

const { winningBoard: winningBoard2, winningNumber: winningNumber2 } = part2(data.boards, data.numbers);
const answer2 = winningBoard2.flat().reduce((sum, number) => typeof number === 'number' ? sum += number : sum, 0) * winningNumber2;

console.log('Answer two:', answer2);