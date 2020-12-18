import { assertEqual } from '../utils/tools.mjs';
import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const leftToRight = (expression, advanced = false) => {
    const nums = expression.match(/(\d+)/g).map(Number);
    const ops = expression.match(/([+*]{1})/g);

    if (!advanced) {
        return nums.reduce((res, num, i) =>
            ops[i - 1] === '+' ? res + num : res * num
        );
    }

    let pIndex = ops.findIndex((op) => op === '+');
    while (pIndex > -1) {
        nums[pIndex] = nums[pIndex] + nums[pIndex + 1];
        nums.splice(pIndex + 1, 1);
        ops.splice(pIndex, 1);
        pIndex = ops.findIndex((op) => op === '+');
    }

    return nums.reduce((prod, num) => prod * num);
};

const calculate = (expression, advanced = false) => {
    const paranthesis = expression.match(/\(([^\(]+?)\)/);
    if (paranthesis) {
        expression = expression.replace(
            paranthesis[0],
            leftToRight(paranthesis[1], advanced)
        );
        return calculate(expression, advanced);
    }
    return leftToRight(expression, advanced);
};

const testLines = parseLinesToArray(testInput);
assertEqual(calculate(testLines[0]), 71);
assertEqual(calculate(testLines[1]), 51);
assertEqual(calculate(testLines[2]), 26);
assertEqual(calculate(testLines[3]), 437);
assertEqual(calculate(testLines[4]), 12240);
assertEqual(calculate(testLines[5]), 13632);

const lines = parseLinesToArray(input);
console.log(
    'answer one:',
    lines.reduce((sum, line) => sum + calculate(line), 0)
);

assertEqual(calculate(testLines[0], true), 231);
assertEqual(calculate(testLines[1], true), 51);
assertEqual(calculate(testLines[2], true), 46);
assertEqual(calculate(testLines[3], true), 1445);
assertEqual(calculate(testLines[4], true), 669060);
assertEqual(calculate(testLines[5], true), 23340);

console.log(
    'answer two:',
    lines.reduce((sum, line) => sum + calculate(line, true), 0)
);
