import { input, testInput, testInput2, testInput3 } from './input.mjs';
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

const depthFirstSearchPaths = (graph, path, paths = []) => {
    const node = `${path[path.length - 1]}`;
    if (node in graph && graph[node].length) {
        graph[node].forEach((nextNode) => {
            paths = depthFirstSearchPaths(graph, [...path, nextNode], paths);
        });
    } else {
        paths.push(path);
    }
    return paths;
};

console.log('answer two:', depthFirstSearchPaths(graph, [0]).length);
