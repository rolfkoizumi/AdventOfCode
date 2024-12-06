// https://adventofcode.com/2024/day/1

import { readData, splitLines } from './utils';

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

function parser(data: string) {
    const [leftList, rightList]: [number[], number[]] = [[], []];
    splitLines(data).forEach(line => {
        const [, number1, number2] = line.match(/^(\d+)\s+(\d+)$/);
        leftList.push(Number(number1));
        rightList.push(Number(number2));
    });

    return { leftList, rightList };
}

function getTotalDistance(lists: { leftList: number[], rightList: number[] }) {
    const leftList = lists.leftList.sort((a, b) => a - b);
    const rightList = lists.rightList.sort((a, b) => a - b);

    return leftList.reduce((sum, current, index) => (sum + Math.abs(current - rightList[index])), 0);
}

function getSimilarityScore(lists: { leftList: number[], rightList: number[] }) {
    return lists.leftList.reduce((sum, current) => {
        return sum + (current * lists.rightList.filter(item => item === current).length);
    }, 0);
}

const exampleLists = parser(example);
console.log('Example:', getTotalDistance(exampleLists), getSimilarityScore(exampleLists));

const lists = readData('01.txt', parser);
console.log('Answers:', getTotalDistance(lists), getSimilarityScore(lists));
