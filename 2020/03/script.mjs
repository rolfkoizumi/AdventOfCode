import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const calculateRightPosition = (slopeIndex, right = 3, down = 1) =>
    (slopeIndex / down) * right;

const getTerrainFromPosition = (position, slope) =>
    slope.charAt(position % slope.length);

const getTreesTraverseSlope = (slopes, right = 3, down = 1) => {
    return slopes.reduce((accumulator, slope, index) => {
        if (index % down) {
            return accumulator;
        }
        return (
            accumulator +
            (getTerrainFromPosition(
                calculateRightPosition(index, right, down),
                slope
            ) === '#'
                ? 1
                : 0)
        );
    }, 0);
};

// const slopes = parseLinesToArray(testInput);
const slopes = parseLinesToArray(input);

console.log('Answer one:', getTreesTraverseSlope(slopes, 3, 1));

const treesPerSlope = [
    getTreesTraverseSlope(slopes, 1, 1),
    getTreesTraverseSlope(slopes, 3, 1),
    getTreesTraverseSlope(slopes, 5, 1),
    getTreesTraverseSlope(slopes, 7, 1),
    getTreesTraverseSlope(slopes, 1, 2),
];

console.log(
    'Answer two:',
    treesPerSlope.reduce((acc, trees) => acc * trees)
);
