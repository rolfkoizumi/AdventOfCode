import { input, testInput, testInput2 } from './input.mjs';
import { parseLinesToIntArray } from '../utils/parser.mjs';

const data = [0, ...parseLinesToIntArray(input)];
data.push(Math.max(...data) + 3);
data.sort((a, b) => a - b);

const differences = {
    1: 0,
    2: 0,
    3: 0,
};

data.reduce((last, current) => {
    differences[current - last] += 1;
    return current;
}, 0);

console.log('answer one:', differences[1] * differences[3]);

const graph = data.reduce((graph, current, index) => {
    graph[`${current}`] = [
        ...data
            .slice(index + 1, index + 4)
            .filter((item) => current + 3 >= item),
    ];
    return graph;
}, {});

const product = [];
let index = 0;
const graphValues = Object.values(graph);
while (index < graphValues.length && graphValues[index].length) {
    if (graphValues[index].length === 2) {
        product.push(
            2 + (graphValues[index + 1] ? graphValues[index + 1].length - 1 : 0)
        );
    } else if (graphValues[index].length === 3) {
        const branches =
            (graphValues[index + 1] ? graphValues[index + 1].length - 1 : 0) +
            (graphValues[index + 2] ? graphValues[index + 2].length - 1 : 0);
        product.push(3 + (branches === 3 ? 4 : branches));
    }
    index += graphValues[index].length;
}

console.log(
    'answer two:',
    product.reduce((product, current) => product * current)
);
