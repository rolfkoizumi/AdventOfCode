import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const followInstructions = (lines) => {
    let accumulator = 0;
    let currentLine = 0;
    let visitedLines = [];
    while (!visitedLines.includes(currentLine) && currentLine < lines.length) {
        const [operation, argument] = lines[currentLine].split(' ');
        let [, plusMinus, number] = argument.match(/^([+-])(\d*)$/);
        number = parseInt(number, 10);
        visitedLines.push(currentLine);
        switch (operation) {
            case 'acc':
                accumulator =
                    plusMinus === '+'
                        ? accumulator + number
                        : accumulator - number;
                currentLine += 1;
                break;
            case 'jmp':
                currentLine =
                    plusMinus === '+'
                        ? currentLine + number
                        : currentLine - number;
                break;
            case 'nop':
                currentLine += 1;
                break;
        }
    }
    return [accumulator, currentLine >= lines.length];
};

const lines = parseLinesToArray(input);

console.log('Answer one:', followInstructions(lines)[0]);

lines.some((line, index) => {
    if (line.includes('acc')) {
        return;
    }
    const modifiedLines = [...lines];
    modifiedLines[index] = line.includes('jmp')
        ? line.replace('jmp', 'nop')
        : line.replace('nop', 'jmp');
    const [answer, terminatedCorrectly] = followInstructions(modifiedLines);
    if (terminatedCorrectly) {
        console.log('Answer two:', answer);
        return true;
    }
});
