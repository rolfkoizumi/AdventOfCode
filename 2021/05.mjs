import { input, testInput } from './05_input.mjs';
import { parseLinesToArray } from './utils/parser.mjs';

const data = parseLinesToArray(input);
// const data = parseLinesToArray(testInput);

const map1 = {};
data.forEach(line => {
    const [x1, y1, x2, y2] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/).slice(1, 5).map(Number);
    if (x1 === x2 || y1 === y2) {
        const [start, end] = x1 === x2 ? [Math.min(y1, y2), Math.max(y1, y2)] : [Math.min(x1, x2), Math.max(x1, x2)];
        for (let a = start; a <= end; a += 1) {
            const pos = `${ x1 === x2 ? x1 : a },${ y1 === y2 ? y1 : a }`;
            map1[pos] = (map1[pos] ?? 0) + 1;
        }
    }
});

console.log('Answer one:', Object.values(map1).filter(lines => lines > 1).length);

const map2 = {};
data.forEach(line => {
    const [x1, y1, x2, y2] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/).slice(1, 5).map(Number);
    if (x1 === x2 || y1 === y2) {
        const [start, end] = x1 === x2 ? [Math.min(y1, y2), Math.max(y1, y2)] : [Math.min(x1, x2), Math.max(x1, x2)];
        for (let a = start; a <= end; a += 1) {
            const pos = `${ x1 === x2 ? x1 : a},${y1 === y2 ? y1 : a }`;
            map2[pos] = (map2[pos] ?? 0) + 1;
        }
    } else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const [startX, endX] = [Math.min(x1, x2), Math.max(x1, x2)];
        const [startY, endY] = x1 < x2 ? [y1, y2] : [y2, y1];
        for (let a = startX, b = startY; a <= endX; a += 1, startY < endY ? b += 1 : b -= 1) {
            const pos = `${ a },${ b }`;
            map2[pos] = (map2[pos] ?? 0) + 1;
        }
    }
});

console.log('Answer two:', Object.values(map2).filter(lines => lines > 1).length);
